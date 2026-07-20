import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Draggable } from "gsap/Draggable";
import { InertiaPlugin } from "gsap/InertiaPlugin";
import { Link, useLocation } from "react-router-dom";

import "../css/reset.css";
import "../css/font.css";
import "../css/main.css";

gsap.registerPlugin(Draggable, InertiaPlugin);

const Main = () => {
  const posterRef = useRef(null);
  const circleRef = useRef(null);
  const portfolioRef = useRef(null);
  const location = useLocation();

  const portfolioLetters = [
    { char: "P", className: "P", alt: "P" },
    { char: "o", className: "o", alt: "o" },
    { char: "r", className: "r", alt: "r" },
    { char: "t", className: "t", alt: "t" },
    { char: "f", className: "f", alt: "f" },
    { char: "o", className: "o", alt: "o" },
    { char: "l", className: "l", alt: "l" },
    { char: "i", className: "i", alt: "i" },
    { char: "o", className: "o", alt: "o" },
  ];

  useEffect(() => {
    const poster = posterRef.current;
    const circle = circleRef.current;
    const portfolio = portfolioRef.current;

    if (!poster || !circle || !portfolio) return;

    /* ================= 색상 랜덤 ================= */

    const colorSets = [
      {
        gradient: "--gradient-macha",
        circle: "--color-surface-white",
      },
      {
        gradient: "--gradient-orange-crush",
        circle: "--color-lilac",
      },
      {
        gradient: "--gradient-lipstick",
        circle: "--color-lt-green",
      },
      {
        gradient: "--gradient-purple-haze",
        circle: "--color-orangey",
      },
      {
        gradient: "--gradient-skyfall",
        circle: "--color-shockingly-pink",
      },
      {
        gradient: "--gradient-emerald-city",
        circle: "--color-pink",
      },
      {
        gradient: "--gradient-summer-fair",
        circle: "--color-blue",
      },
    ];

    const getCSSVarValue = (varName) =>
      getComputedStyle(document.documentElement)
        .getPropertyValue(varName)
        .trim();

    const getRandomItem = (array) =>
      array[Math.floor(Math.random() * array.length)];

    const randomizeVisuals = () => {
      const selectedSet = getRandomItem(colorSets);

      poster.style.background = getCSSVarValue(selectedSet.gradient);
      circle.style.backgroundColor = getCSSVarValue(selectedSet.circle);
    };

    /* ================= GSAP ================= */

    const shapes = gsap.utils.toArray(".letter", portfolio);
    const proxy = document.createElement("div");

    const progressWrap = gsap.utils.wrap(0, 1);
    const wrapRotation = gsap.utils.wrap(-90, 90);

    const initialRotationOffset = -44;
    const letterGapAngle = 14.5; // 조금 넓게
    const letterPos = portfolioLetters.map((_, i) => i * letterGapAngle);

    const screenRange = gsap.utils.mapRange(0, 2000, 500, 4500);

    let dragDistancePerRotation = screenRange(window.innerWidth);
    let startProgress = 0;

    const adjustRadius = () => {
      const radius = Math.min(
        window.innerWidth * 0.54,
        720,
        window.innerHeight * 0.46
      );

      gsap.set(shapes, {
        xPercent: -50,
        yPercent: -50,
        transformOrigin: `50% 50% ${-radius}px`,
      });
    };

    gsap.set(shapes, {
      xPercent: -50,
      yPercent: -50,
      force3D: true,
      transformStyle: "preserve-3d",
    });

    adjustRadius();

    const spin = gsap.fromTo(
      shapes,
      {
        rotationY: (i) => letterPos[i] + initialRotationOffset,
      },
      {
        rotationY: "-=360",
        modifiers: {
          rotationY: (value) => wrapRotation(parseFloat(value)) + "deg",
        },
        duration: 10,
        ease: "none",
        repeat: -1,
      }
    );

    const updateRotation = function () {
      const progress =
        startProgress + (this.startX - this.x) / dragDistancePerRotation;

      spin.progress(progressWrap(progress));
    };

    const draggableInstance = Draggable.create(proxy, {
      trigger: portfolio,
      type: "x",
      inertia: true,
      allowNativeTouchScrolling: true,

      onPress() {
        gsap.killTweensOf(spin);
        spin.timeScale(0);
        startProgress = spin.progress();
      },

      onDrag: updateRotation,
      onThrowUpdate: updateRotation,

      onRelease() {
        if (!this.tween || !this.tween.isActive()) {
          gsap.to(spin, {
            timeScale: 1,
            duration: 1,
            ease: "power2.out",
          });
        }
      },

      onThrowComplete() {
        gsap.to(spin, {
          timeScale: 1,
          duration: 1,
          ease: "power2.out",
        });
      },
    });

    randomizeVisuals();

    const handleResize = () => {
      dragDistancePerRotation = screenRange(window.innerWidth);
      adjustRadius();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);

      spin.kill();

      if (draggableInstance && draggableInstance[0]) {
        draggableInstance[0].kill();
      }

      gsap.killTweensOf(proxy);
      gsap.killTweensOf(spin);

      gsap.set(poster, { clearProps: "all" });
      gsap.set(circle, { clearProps: "all" });
      gsap.set(portfolio, { clearProps: "all" });
      gsap.set(shapes, { clearProps: "all" });
    };
  }, [location.pathname]);

  return (
    <div id="poster" ref={posterRef} className="noise">
      <Link className="logo" to="/" rel="noopener noreferrer">
        SONG I SONG
      </Link>

      <div
        className="portfolio-container"
        ref={portfolioRef}
        aria-label="Rotating Portfolio letters"
      >
        <div className="portfolio" aria-hidden="true">
          {portfolioLetters.map((letter, i) => (
            <div
              key={`${letter.char}-${i}`}
              className={`letter letter-${letter.className}`}
              aria-label={letter.alt}
            ></div>
          ))}
        </div>

        <span className="sr-only">portfolio</span>
      </div>

      <div className="circle-home" ref={circleRef} aria-hidden="true"></div>

      <button className="start-btn" type="button">
        <Link to="/resume">START</Link>
      </button>
    </div>
  );
};

export default Main;