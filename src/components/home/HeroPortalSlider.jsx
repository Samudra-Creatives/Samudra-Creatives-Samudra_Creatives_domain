import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { Link } from "react-router-dom";

import Portal from "./Portal";
import { heroSlides } from "../../data/hero";

const AUTOPLAY_DELAY = 4000;
const TRANSITION_DURATION = 1050;

const POSITION_RANGE = 3;

function clampPosition(position) {
  if (position > POSITION_RANGE) {
    return position - heroSlides.length;
  }

  if (position < -POSITION_RANGE) {
    return position + heroSlides.length;
  }

  return position;
}

function calculateOrbit(position) {
  const absolutePosition = Math.abs(position);

  /*
   * The orbit is calculated using actual
   * trigonometric positioning.
   *
   * Position:
   *
   *       -3       -2       -1       0       +1       +2       +3
   *
   * Cards travel through an invisible
   * elliptical 3D orbit.
   */

  const normalized =
    absolutePosition / POSITION_RANGE;

  const direction = Math.sign(position);

  /*
   * Exponentially spread the outer positions.
   * This makes the center area tighter and
   * the portal area wider.
   */
  const orbitProgress = Math.pow(
    normalized,
    0.82,
  );

  const angle =
    direction *
    orbitProgress *
    (Math.PI / 2);

  /*
   * Elliptical orbit.
   */
  const radiusX = 410;
  const radiusZ = 550;

  /*
   * sin() creates the horizontal orbital movement.
   */
  const x =
    Math.sin(angle) *
    radiusX;

  /*
   * cos() creates the depth movement.
   *
   * At position 0:
   * z ≈ +200px
   *
   * Near portals:
   * z becomes strongly negative.
   */
  const z =
    Math.cos(angle) *
      radiusZ -
    350;

  /*
   * Cards near the portals sit slightly
   * lower to strengthen the circular trajectory.
   */
  const y =
    Math.pow(normalized, 1.25) *
    76;

  /*
   * Cards rotate around their Y axis
   * according to the orbital angle.
   */
  const rotateY =
    -direction *
    orbitProgress *
    55;

  /*
   * Small X rotation adds physical depth.
   */
  const rotateX =
    absolutePosition === 0
      ? 0
      : 5 +
        orbitProgress * 10;

  /*
   * Slight Z rotation makes cards feel
   * physically floating instead of mathematically flat.
   */
  const rotateZ =
    direction *
    orbitProgress *
    8;

  /*
   * Main card is slightly larger.
   */
  const scale =
    absolutePosition === 0
      ? 1.08
      : 1 -
        absolutePosition *
          0.15;

  /*
   * Opacity fades toward portals.
   */
  const opacity =
    absolutePosition === 0
      ? 1
      : Math.max(
          0.07,
          1 -
            absolutePosition *
              0.27,
        );

  /*
   * Blur increases with depth.
   */
  const blur =
    absolutePosition === 0
      ? 0
      : Math.min(
          absolutePosition * 2.5,
          9,
        );

  /*
   * Saturation decreases toward portals.
   */
  const saturation =
    absolutePosition === 0
      ? 1
      : Math.max(
          0.55,
          1 -
            absolutePosition *
              0.12,
        );

  return {
    x,
    y,
    z,
    rotateY,
    rotateX,
    rotateZ,
    scale,
    opacity,
    blur,
    saturation,
  };
}

export default function HeroPortalSlider() {
  const [activeIndex, setActiveIndex] =
    useState(0);

  const [isPaused, setIsPaused] =
    useState(false);

  const [isTransitioning, setIsTransitioning] =
    useState(false);

  const touchStartX = useRef(null);

  const touchEndX = useRef(null);

  const transitionTimer =
    useRef(null);

  const totalSlides =
    heroSlides.length;

  /*
   * Every card receives a dynamic orbital
   * position from -3 to +3.
   */
  const visibleSlides = useMemo(() => {
    return heroSlides.map(
      (slide, index) => {
        const rawPosition =
          index - activeIndex;

        let position =
          rawPosition;

        if (
          position >
          totalSlides / 2
        ) {
          position -= totalSlides;
        }

        if (
          position <
          -totalSlides / 2
        ) {
          position += totalSlides;
        }

        position =
          clampPosition(position);

        return {
          ...slide,
          position,
          orbit:
            calculateOrbit(
              position,
            ),
        };
      },
    );
  }, [
    activeIndex,
    totalSlides,
  ]);

  const changeSlide =
    useCallback(
      (direction) => {
        if (isTransitioning) {
          return;
        }

        setIsTransitioning(true);

        setActiveIndex(
          (current) =>
            (current +
              direction +
              totalSlides) %
            totalSlides,
        );

        window.clearTimeout(
          transitionTimer.current,
        );

        transitionTimer.current =
          window.setTimeout(
            () => {
              setIsTransitioning(
                false,
              );
            },
            TRANSITION_DURATION,
          );
      },
      [
        isTransitioning,
        totalSlides,
      ],
    );

  const nextSlide =
    useCallback(() => {
      changeSlide(1);
    }, [changeSlide]);

  const previousSlide =
    useCallback(() => {
      changeSlide(-1);
    }, [changeSlide]);

  /*
   * Autoplay.
   */
  useEffect(() => {
    if (isPaused) {
      return undefined;
    }

    const timer =
      window.setInterval(
        nextSlide,
        AUTOPLAY_DELAY,
      );

    return () => {
      window.clearInterval(timer);
    };
  }, [
    isPaused,
    nextSlide,
  ]);

  /*
   * Keyboard controls.
   */
  useEffect(() => {
    const handleKeyboard =
      (event) => {
        if (
          event.key ===
          "ArrowLeft"
        ) {
          previousSlide();
        }

        if (
          event.key ===
          "ArrowRight"
        ) {
          nextSlide();
        }
      };

    window.addEventListener(
      "keydown",
      handleKeyboard,
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyboard,
      );
    };
  }, [
    nextSlide,
    previousSlide,
  ]);

  /*
   * Cleanup transition timer.
   */
  useEffect(() => {
    return () => {
      window.clearTimeout(
        transitionTimer.current,
      );
    };
  }, []);

  /*
   * Touch start.
   */
  const handleTouchStart =
    (event) => {
      touchStartX.current =
        event.changedTouches[0].clientX;
    };

  /*
   * Touch end.
   */
  const handleTouchEnd =
    (event) => {
      touchEndX.current =
        event.changedTouches[0].clientX;

      if (
        touchStartX.current ===
          null ||
        touchEndX.current ===
          null
      ) {
        return;
      }

      const distance =
        touchStartX.current -
        touchEndX.current;

      if (
        Math.abs(distance) <
        45
      ) {
        return;
      }

      if (distance > 0) {
        nextSlide();
      } else {
        previousSlide();
      }

      touchStartX.current =
        null;

      touchEndX.current =
        null;
    };

  return (
    <div
      className={`portal-slider ${
        isTransitioning
          ? "portal-slider--transitioning"
          : ""
      }`}
      onMouseEnter={() =>
        setIsPaused(true)
      }
      onMouseLeave={() =>
        setIsPaused(false)
      }
      onTouchStart={
        handleTouchStart
      }
      onTouchEnd={handleTouchEnd}
      aria-label="Samudra Creatives featured products"
    >
      {/* Atmospheric background */}
      <div className="portal-slider__ambient" />

      <div className="portal-slider__ambient portal-slider__ambient--blue" />

      {/* Fixed portals */}
      <Portal side="left" />

      <Portal side="right" />

      {/* 3D orbital stage */}
      <div className="portal-slider__stage">
        {visibleSlides.map(
          (slide) => {
            const {
              x,
              y,
              z,
              rotateY,
              rotateX,
              rotateZ,
              scale,
              opacity,
              blur,
              saturation,
            } =
              slide.orbit;

            const isActive =
              slide.position ===
              0;

            const style = {
              "--x": `${x}px`,
              "--y": `${y}px`,
              "--z": `${z}px`,
              "--rotate-y": `${rotateY}deg`,
              "--rotate-x": `${rotateX}deg`,
              "--rotate-z": `${rotateZ}deg`,
              "--scale": scale,
              "--opacity": opacity,
              "--blur": `${blur}px`,
              "--saturation": saturation,
              "--position":
                slide.position,
            };

            return (
              <article
                key={slide.id}
                className={`portal-slide ${
                  isActive
                    ? "portal-slide--active"
                    : ""
                }`}
                style={style}
                data-position={
                  slide.position
                }
                aria-hidden={
                  !isActive
                }
              >
                <Link
                  to={slide.href}
                  className="portal-slide__card"
                  tabIndex={
                    isActive
                      ? 0
                      : -1
                  }
                >
                  <div className="portal-slide__image-wrap">
                    <img
                      src={
                        slide.image
                      }
                      alt={
                        slide.alt ||
                        `${slide.title || slide.category} by Samudra Creatives`
                      }
                      className="portal-slide__image"
                      draggable="false"
                    />
                  </div>

                  <div className="portal-slide__shine" />

                  <div className="portal-slide__content">
                    <span className="portal-slide__category">
                      {slide.category}
                    </span>

                    <h3>
                      {slide.title}
                    </h3>

                    <span className="portal-slide__explore">
                      See more <span aria-hidden="true">→</span>
                    </span>
                  </div>
                </Link>
              </article>
            );
          },
        )}
      </div>

      {/* Simple navigation arrows */}
      <button
        type="button"
        className="portal-slider__arrow portal-slider__arrow--left"
        onClick={
          previousSlide
        }
        aria-label="Previous featured product"
      >
        <span aria-hidden="true">
          ‹
        </span>
      </button>

      <button
        type="button"
        className="portal-slider__arrow portal-slider__arrow--right"
        onClick={
          nextSlide
        }
        aria-label="Next featured product"
      >
        <span aria-hidden="true">
          ›
        </span>
      </button>

    </div>
  );
}