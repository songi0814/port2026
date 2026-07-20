import React, { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger, ScrollSmoother } from "gsap/all";
import { createNoise2D } from "simplex-noise";
import "../css/resumeBackground.css";
import "../css/resumeCard.css";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

export default function ResumeBackground({ children }) {
  useEffect(() => {
    const wrapper = document.querySelector("#wrapper");
    const content = document.querySelector("#content");

    if (!wrapper || !content) return;

    const noise2D = createNoise2D(() => 0.5);
    document.querySelectorAll(".circle").forEach((el) => el.remove());

    const totalCircles = 1200;
    const preVisibleRatio = 0.25;

    const getRibbonRatio = () => {
      if (window.innerWidth <= 767) return 3.5;
      return 2.5;
    };

    const getTotalHeight = () => content.scrollHeight || window.innerHeight * getRibbonRatio();

    let ribbonHeight = getTotalHeight();
    let initialVisibleHeight = window.innerHeight * preVisibleRatio;

    const circles = [];

    for (let i = 0; i < totalCircles; i++) {
      const div = document.createElement("div");
      div.classList.add("circle");

      const n1 = noise2D(i * 0.003, i * 0.0033);
      const n2 = noise2D(i * 0.002, i * 0.001);

      const y = (i / totalCircles) * ribbonHeight;
      const baseX = window.innerWidth / 2;
      const maxWobble = Math.min(window.innerWidth * 0.16, 160);
      const wobbleX = n2 * maxWobble + Math.sin(i * 0.03) * (maxWobble * 0.55);
      const x = baseX + wobbleX;

      const baseSize = 20;
      const size = baseSize + Math.sin(i * 0.1) * 3;
      const scaleX = 3 + n1 * 1.8;
      const scaleY = 3 + n2 * 1.8;

      const hue = 30 + i * 0.25;
      const shadowColor = `hsla(${hue}, 80%, 65%, 0.55)`;

      div.style.width = `${size}px`;
      div.style.height = `${size}px`;
      div.style.borderRadius = "40%";
      div.style.transform = `
        translate(${x}px, ${y}px)
        translate(-50%, -50%)
        rotate(${n2 * 260}deg)
        scale(${scaleX}, ${scaleY})
      `;
      div.style.boxShadow = `0 0 0 0.2px ${shadowColor}`;
      div.style.opacity = y <= initialVisibleHeight ? 1 : 0;
      div.style.position = "absolute";
      div.style.left = "0";
      div.style.top = "0";
      div.style.willChange = "transform, opacity";
      div.style.pointerEvents = "none";

      content.appendChild(div);
      circles.push({ el: div, i, n1, n2, y, scaleX, scaleY });
    }

    const smoother = ScrollSmoother.create({
      wrapper: "#wrapper",
      content: "#content",
      smooth: 0.8,
      effects: false,
    });

    const revealTween = gsap.to(
      {},
      {
        scrollTrigger: {
          trigger: content,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
          onUpdate: (self) => {
            const progress = self.progress;
            const visibleHeight =
              initialVisibleHeight +
              progress * (ribbonHeight - initialVisibleHeight);

            circles.forEach((circle) => {
              circle.el.style.opacity = circle.y <= visibleHeight ? 1 : 0;
            });
          },
        },
      }
    );

    const timer = setTimeout(() => {
      ribbonHeight = getTotalHeight();
      ScrollTrigger.refresh();
    }, 100);

    const updateCirclePositions = () => {
      ribbonHeight = getTotalHeight();
      initialVisibleHeight = window.innerHeight * preVisibleRatio;

      circles.forEach((circle) => {
        const { el, i, n2, scaleX, scaleY } = circle;
        const y = (i / totalCircles) * ribbonHeight;
        const baseX = window.innerWidth / 2;
        const maxWobble = Math.min(window.innerWidth * 0.16, 160);
        const wobbleX = n2 * maxWobble + Math.sin(i * 0.03) * (maxWobble * 0.55);
        const x = baseX + wobbleX;
        circle.y = y;

        el.style.transform = `
          translate(${x}px, ${y}px)
          translate(-50%, -50%)
          rotate(${n2 * 260}deg)
          scale(${scaleX}, ${scaleY})
        `;
      });

      ScrollTrigger.refresh();
    };

    window.addEventListener("resize", updateCirclePositions);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", updateCirclePositions);
      revealTween.kill();
      ScrollTrigger.getAll().forEach((st) => st.kill());
      smoother?.kill();
      document.querySelectorAll(".circle").forEach((el) => el.remove());
    };
  }, []);

  return (
    <div id="wrapper">
      <div id="content">
        <div className="scroll">
          <span>SCROLL</span>
          <svg viewBox="0 0 24 24">
            <line className="st1" x1="12" y1="1" x2="12" y2="22.5" />
            <line className="st1" x1="12.1" y1="22.4" x2="18.9" y2="15.6" />
            <line className="st1" x1="11.9" y1="22.4" x2="5.1" y2="15.6" />
          </svg>
        </div>

        {children}

      </div>
    </div>
  );
}