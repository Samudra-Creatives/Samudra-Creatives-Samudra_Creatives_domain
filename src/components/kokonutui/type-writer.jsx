import { useEffect, useRef, useState } from "react";

const CARET_IDLE_MS = 500;
const SELECT_SWEEP_MS = 120;
const SELECT_HOLD_MS = 220;
const DEFAULT_SEQUENCES = [
  { text: "Your Ideas.", deleteAfter: true },
  { text: "Our Creativity.", deleteAfter: false },
];

function neighbours(character) {
  const rows = ["qwertyuiop", "asdfghjkl", "zxcvbnm"];
  const lower = character.toLowerCase();
  const row = rows.findIndex((keys) => keys.includes(lower));

  if (row === -1) {
    return "";
  }

  const column = rows[row].indexOf(lower);
  const keys = [
    rows[row][column - 1],
    rows[row][column + 1],
    rows[row - 1]?.[column],
    rows[row + 1]?.[column],
  ]
    .filter(Boolean)
    .join("");

  return character === lower ? keys : keys.toUpperCase();
}

function seededRandom(seed) {
  let state = (Math.abs(Math.floor(seed)) % 2147483646) + 1;

  return () => {
    state = (state * 16807) % 2147483647;
    return (state - 1) / 2147483646;
  };
}

export default function TypewriterTitle({
  sequences = DEFAULT_SEQUENCES,
  typingSpeed = 50,
  startDelay = 200,
  autoLoop = true,
  loopDelay = 1000,
  deleteSpeed = 30,
  pauseBeforeDelete = 1000,
  naturalVariance = true,
  deleteMode = "backspace",
  typos = false,
  seed = 7,
  className = "",
  textClassName = "",
}) {
  const [screen, setScreen] = useState({ text: "", selected: 0 });
  const rootRef = useRef(null);
  const caretRef = useRef(null);
  const [isInView, setIsInView] = useState(true);

  useEffect(() => {
    const root = rootRef.current;

    if (!root || !("IntersectionObserver" in window)) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold: 0.1 },
    );
    observer.observe(root);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setScreen({
        text: sequences[sequences.length - 1]?.text || "",
        selected: 0,
      });
      return undefined;
    }

    if (!isInView || sequences.length === 0) {
      return undefined;
    }

    const random = seededRandom(seed);
    const timers = new Set();
    let stopped = false;
    let idleTimer;
    let sequenceIndex = 0;
    let characterIndex = 0;

    const wait = (duration) =>
      new Promise((resolve) => {
        const timer = window.setTimeout(() => {
          timers.delete(timer);
          resolve();
        }, duration);
        timers.add(timer);
      });

    const show = (text, selected = 0) =>
      setScreen({ text, selected });

    const keystroke = () => {
      if (!caretRef.current) {
        return;
      }

      caretRef.current.dataset.idle = "false";
      window.clearTimeout(idleTimer);
      idleTimer = window.setTimeout(() => {
        if (caretRef.current) {
          caretRef.current.dataset.idle = "true";
        }
      }, CARET_IDLE_MS);
    };

    const typingDelay = () => {
      if (!naturalVariance) {
        return typingSpeed;
      }

      const roll = random();
      if (roll < 0.1) {
        return typingSpeed * 2;
      }
      if (roll > 0.9) {
        return typingSpeed * 0.5;
      }
      return typingSpeed * (0.6 + random() * 0.8);
    };

    const typeCharacter = async (text) => {
      const wrongKeys = neighbours(text[characterIndex]);
      const typoRate = typeof typos === "number" ? typos : typos ? 0.04 : 0;

      if (wrongKeys && random() < typoRate) {
        const wrong =
          wrongKeys[Math.floor(random() * wrongKeys.length)];
        show(text.slice(0, characterIndex) + wrong);
        keystroke();
        await wait(typingSpeed + 250);
        show(text.slice(0, characterIndex));
        keystroke();
        await wait(typingSpeed * 1.5);
      }

      characterIndex += 1;
      show(text.slice(0, characterIndex));
      keystroke();
      await wait(typingDelay());
    };

    const erase = async (text) => {
      if (deleteMode === "select") {
        const step = SELECT_SWEEP_MS / Math.max(characterIndex, 1);

        for (let selected = 1; selected <= characterIndex; selected += 1) {
          show(text.slice(0, characterIndex), selected);
          keystroke();
          await wait(step);
        }

        await wait(SELECT_HOLD_MS);
        characterIndex = 0;
        show("");
        keystroke();
        return;
      }

      while (characterIndex > 0) {
        characterIndex -= 1;
        show(text.slice(0, characterIndex));
        keystroke();
        await wait(deleteSpeed);
      }
    };

    const run = async () => {
      await wait(startDelay);

      while (!stopped) {
        const sequence = sequences[sequenceIndex];
        characterIndex = 0;
        show("");

        while (characterIndex < sequence.text.length && !stopped) {
          await typeCharacter(sequence.text);
        }

        await wait(sequence.pauseAfter ?? pauseBeforeDelete);
        const isLast = sequenceIndex === sequences.length - 1;
        const shouldDelete = sequence.deleteAfter || (isLast && autoLoop);

        if (shouldDelete) {
          await erase(sequence.text);
        }

        if (isLast && !autoLoop) {
          break;
        }

        sequenceIndex = isLast ? 0 : sequenceIndex + 1;
        await wait(isLast ? loopDelay : 100);
      }
    };

    run();

    return () => {
      stopped = true;
      timers.forEach((timer) => window.clearTimeout(timer));
      window.clearTimeout(idleTimer);
    };
  }, [
    autoLoop,
    deleteMode,
    deleteSpeed,
    isInView,
    loopDelay,
    naturalVariance,
    pauseBeforeDelete,
    seed,
    sequences,
    startDelay,
    typos,
    typingSpeed,
  ]);

  const kept = screen.text.slice(
    0,
    screen.text.length - screen.selected,
  );
  const selected = screen.text.slice(kept.length);

  return (
    <span
      className={`typewriter ${className}`.trim()}
      ref={rootRef}
    >
      <span className="typewriter__sr-only">
        {sequences.map((sequence) => sequence.text).join(", ")}
      </span>
      <span
        aria-hidden="true"
        className={`typewriter__text ${textClassName}`.trim()}
      >
        <span className="typewriter__measure" aria-hidden="true">
          {sequences.reduce(
            (longest, sequence) =>
              sequence.text.length > longest.length
                ? sequence.text
                : longest,
            "",
          )}
        </span>
        <span className="typewriter__visible">
          {kept}
          <span className="typewriter__caret">
            <span ref={caretRef} data-idle="true" />
          </span>
          {selected ? (
            <span className="typewriter__selected">{selected}</span>
          ) : null}
        </span>
      </span>
    </span>
  );
}
