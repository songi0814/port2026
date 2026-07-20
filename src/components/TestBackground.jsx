import React, { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger, ScrollSmoother } from "gsap/all";
import { createNoise2D } from "simplex-noise";
import "../css/test.css";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

export default function TestBackground() {
  useEffect(() => {
    const wrapper = document.querySelector("#wrapper");
    const content = document.querySelector("#content");

    const noise2D = createNoise2D(() => 0.5);

    document.querySelectorAll(".circle").forEach((el) => el.remove());

    // ✅ 밀도 15% 증가
    const totalCircles = 1400;
    const preVisibleRatio = 0.15;
    const circles = [];

    for (let i = 0; i < totalCircles; i++) {
      const div = document.createElement("div");
      div.classList.add("circle");

      const n1 = noise2D(i * 0.003, i * 0.0033);
      const n2 = noise2D(i * 0.002, i * 0.001);

      // 리본 형태 (부드럽게, 일정 곡률)
      const y = (i / totalCircles) * window.innerHeight * 3.2;
      const baseX = window.innerWidth * 0.55;
      const wobbleX = n2 * 150 + Math.sin(i * 0.03) * 80;
      const x = baseX + wobbleX;

      // 원 크기: 일정 + 약간의 변동
      const baseSize = 20;
      const size = baseSize + Math.sin(i * 0.1) * 3;
      const scaleX = 3 + n1 * 1.8;
      const scaleY = 3 + n2 * 1.8;

      // 색상 (노랑~주황 그라데이션)
      const hue = 30 + i * 0.25; // hue 30~250 정도 자연스럽게 순환
      const shadowColor = `hsla(${hue}, 80%, 65%, 0.55)`;

      // 스타일 설정
      div.style.width = `${size}px`;
      div.style.height = `${size}px`;
      div.style.borderRadius = "40%";
      div.style.transform = `translate(${x}px, ${y}px) rotate(${n2 * 260}deg) scale(${scaleX}, ${scaleY})`;
      div.style.boxShadow = `0 0 0 0.2px ${shadowColor}`;
      div.style.opacity = 0;
      div.style.position = "absolute";
      div.style.left = "0";
      div.style.top = "0";
      div.style.willChange = "transform, opacity";
      div.style.pointerEvents = "none";

      content.appendChild(div);
      circles.push(div);
    }

    // ScrollSmoother 설정
    ScrollSmoother.create({
      content: content,
      wrapper: "#wrapper",
      smooth: 1.2,
      effects: false,
    });

    // ✅ 스크롤 시 원 노출 제어
    gsap.to({}, {
      scrollTrigger: {
        trigger: content,
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;

          // 전체 중 몇 %까지 보이는지 계산
          const visibleCount = Math.floor(totalCircles * (preVisibleRatio + progress * (1 - preVisibleRatio)));

          circles.forEach((c, i) => {
            // preVisibleRatio 만큼은 항상 보여야 함
            c.style.opacity = i < visibleCount ? 1 : 0;
          });
        },
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
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
      </div>
    </div>
  );
}
