import { useEffect, useRef } from "react";

const NEAR = 160;
const EASE = 0.14;
const MAX_STEPS = 40;

function sunAt(date) {
  const hours = date.getHours() + date.getMinutes() / 60;
  const t = (hours - 6) / 14;

  if (t < 0 || t > 1) {
    return { x: 0.5, height: 0.7, strength: 0.35 };
  }

  return { x: t, height: Math.sin(Math.PI * t), strength: 1 };
}

function cast(dx, dy, strength) {
  const length = Math.hypot(dx, dy);

  if (length < 0.5 || strength < 0.01) {
    return "none";
  }

  const steps = Math.round(
    Math.min(MAX_STEPS, Math.max(6, length / 2.5)),
  );
  const spacing = length / steps;
  const parts = [];

  for (let i = 1; i <= steps; i += 1) {
    const progress = i / steps;
    const blur = Math.max(
      spacing * 1.15,
      0.3 + progress * length * 0.08,
    );
    const alpha =
      strength * (3.6 / steps) * (1 - progress) ** 1.6;

    parts.push(
      `${(dx * progress).toFixed(1)}px ${(dy * progress).toFixed(1)}px ${blur.toFixed(1)}px rgb(var(--shadow) / calc(var(--shadow-strength) * ${alpha.toFixed(3)}))`,
    );
  }

  return parts.join(",");
}

export default function ShadowText({
  children,
  className = "",
  clock = true,
  interactive = true,
  reach = 1.1,
}) {
  const rootRef = useRef(null);
  const words = children.split(" ");

  useEffect(() => {
    const root = rootRef.current;

    if (!root) {
      return undefined;
    }

    const letters = [
      ...root.querySelectorAll("[data-shadow-letter]"),
    ];
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    let centers = [];
    let size = 16;
    const now = letters.map(() => ({ x: 0, y: 0, s: 0 }));
    const goal = letters.map(() => ({ x: 0, y: 0, s: 0 }));
    let pointer = null;
    let raf = 0;

    const measure = () => {
      const box = root.getBoundingClientRect();
      size = Number.parseFloat(getComputedStyle(root).fontSize) || 16;
      centers = letters.map((element) => {
        const letterBox = element.getBoundingClientRect();

        return {
          x: letterBox.left - box.left + letterBox.width / 2,
          y: letterBox.top - box.top + letterBox.height * 0.6,
        };
      });
    };

    const aim = () => {
      const box = root.getBoundingClientRect();
      const longest = reach * size;
      const sun = clock
        ? sunAt(new Date())
        : { x: 0.55, height: 0.85, strength: 1 };

      for (let i = 0; i < letters.length; i += 1) {
        const center = centers[i];

        if (!center) {
          continue;
        }

        if (pointer) {
          const dx = center.x - pointer.x;
          const dy = center.y - pointer.y;
          const distance = Math.max(1, Math.hypot(dx, dy));
          const length = Math.min(longest, distance * 0.22);

          goal[i] = {
            x: (dx / distance) * length,
            y: (dy / distance) * length,
            s: 1,
          };
        } else {
          const lightX = box.width * (sun.x * 1.6 - 0.3);
          const lightY = -box.height * 3;
          const dx = center.x - lightX;
          const dy = center.y - lightY;
          const distance = Math.hypot(dx, dy);
          const length =
            longest * (0.18 + (1 - sun.height) * 0.82);

          goal[i] = {
            x: (dx / distance) * length,
            y: (dy / distance) * length,
            s: sun.strength,
          };
        }
      }
    };

    const paint = () => {
      for (let i = 0; i < letters.length; i += 1) {
        letters[i].style.textShadow = cast(
          now[i].x,
          now[i].y,
          now[i].s,
        );
      }
    };

    const frame = () => {
      raf = 0;
      let moving = false;

      for (let i = 0; i < letters.length; i += 1) {
        const current = now[i];
        const target = goal[i];

        current.x += (target.x - current.x) * EASE;
        current.y += (target.y - current.y) * EASE;
        current.s += (target.s - current.s) * EASE;

        if (
          Math.abs(target.x - current.x) > 0.05 ||
          Math.abs(target.y - current.y) > 0.05 ||
          Math.abs(target.s - current.s) > 0.002
        ) {
          moving = true;
        }
      }

      paint();

      if (moving) {
        raf = requestAnimationFrame(frame);
      }
    };

    const update = () => {
      aim();

      if (reduceMotion) {
        for (let i = 0; i < letters.length; i += 1) {
          now[i] = { ...goal[i] };
        }
        paint();
      } else if (!raf) {
        raf = requestAnimationFrame(frame);
      }
    };

    measure();
    update();

    const resizeObserver = new ResizeObserver(() => {
      measure();
      update();
    });
    resizeObserver.observe(root);
    document.fonts?.ready.then(() => {
      measure();
      update();
    });

    const tick = window.setInterval(update, 30000);

    const onMove = (event) => {
      const box = root.getBoundingClientRect();
      const x = event.clientX - box.left;
      const y = event.clientY - box.top;
      const near =
        x > -NEAR &&
        y > -NEAR &&
        x < box.width + NEAR &&
        y < box.height + NEAR;

      if (near) {
        pointer = { x, y };
        update();
      } else if (pointer) {
        pointer = null;
        update();
      }
    };

    const onLeave = () => {
      if (pointer) {
        pointer = null;
        update();
      }
    };

    if (interactive) {
      window.addEventListener("pointermove", onMove);
      document.documentElement.addEventListener(
        "pointerleave",
        onLeave,
      );
    }

    return () => {
      cancelAnimationFrame(raf);
      window.clearInterval(tick);
      resizeObserver.disconnect();
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener(
        "pointerleave",
        onLeave,
      );
    };
  }, [children, clock, interactive, reach]);

  return (
    <span
      className={`shadow-text ${className}`.trim()}
      ref={rootRef}
    >
      <span className="sr-only">{children}</span>
      <span aria-hidden="true">
        {words.map((word, wordIndex) => (
          <span key={`${word}-${wordIndex}`}>
            <span className="shadow-text__word">
              {[...word].map((character, characterIndex) => (
                <span
                  className="shadow-text__letter"
                  data-shadow-letter=""
                  key={`${character}-${characterIndex}`}
                >
                  {character}
                </span>
              ))}
            </span>
            {wordIndex < words.length - 1 ? " " : null}
          </span>
        ))}
      </span>
    </span>
  );
}
