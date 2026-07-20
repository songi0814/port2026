import React, { useState, useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, EffectFade, Navigation } from "swiper/modules";
import { gsap } from "gsap";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "../css/work.css";

const slidesData = [
  {
    title: "우담소",
    colors: ["#E4DBD5", "#9E7965", "#530501"],
    keyword: "모던 | 고급 | 깔끔함 | 베이직",
    detail: "패키지 디자인 / SNS 콘텐츠 제작 및 관리",
    img: "/26port_v1/img/imgwds.png",
  },
  {
    title: "우미블링",
    colors: ["#FFF6E8", "#DF7645", "#160A0B"],
    keyword: "모던 | 위트 | 전통 | 고급",
    detail: "브랜드 제작 참여 / 패키지 디자인 / 로고 / 제품 촬영 / 상세페이지",
    img: "/26port_v1/img/imgwmbling.png",
  },
  {
    title: "애나의 정원",
    colors: ["#C7C493", "#C34242", "#7E799F", "#160A0B"],
    keyword: "캐주얼 | 위트",
    detail: "패키지 디자인 / 상세페이지",
    img: "/26port_v1/img/imganna.png",
  },
  {
    title: "청기와타운",
    colors: ["#C05B16", "#841816", "#695635", "#4B266C"],
    keyword: "심플함 | 가독성 | 정보전달",
    detail: "상세페이지 / 제품촬영",
    img: "/26port_v1/img/imgckwtown.png",
  },
  {
    title: "선데이버거클럽",
    colors: ["#F0DAA1", "#E9B68C", "#E4862D", "#BE0000"],
    keyword: "캐주얼 | 위트",
    detail: "패키지디자인 / 상세페이지",
    img: "/26port_v1/img/imgsunday.png",
  },
  {
    title: "삼표갈비",
    colors: ["#FAF3DD", "#84845C", "#8C041C"],
    keyword: "전통 | 모던 | 심플",
    detail: "패키지 디자인 / 상세페이지 / 제품촬영",
    img: "/26port_v1/img/imgsampyo.png",
  },
  {
    title: "VIDEO",
    colors: [],
    keyword: "정보전달 | 홍보 | 마케팅",
    detail: "박람회 및 회사 홍보성 영상 제작",
    img: "/26port_v1/img/imgvideo.png",
  },
  {
    title: "익산박물관",
    colors: ["#987150", "#2156A4", "#DB6923", "#365E3C"],
    keyword: "단순화 | 흥미유발 | 정보전달",
    detail: "웹디자인 / 퍼블리싱",
    img: "/26port_v1/img/imgiksan.png",
  },
];

const WorkSwiper = () => {
  const [active, setActive] = useState(slidesData[0]);

  const titleRef = useRef(null);
  const keywordRef = useRef(null);
  const detailRef = useRef(null);
  const chipsRef = useRef(null);

  const handleSlideChange = (swiper) => {
    const current = slidesData[swiper.realIndex];
    setActive(current);

    requestAnimationFrame(() => {
      const targets = [
        titleRef.current,
        keywordRef.current,
        detailRef.current,
        chipsRef.current,
      ].filter(Boolean);

      if (targets.length > 0) {
        gsap.fromTo(
          targets,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            stagger: 0.1,
          }
        );
      }
    });
  };

  useEffect(() => {
    gsap.from(".text-box", {
      opacity: 0,
      y: 40,
      duration: 1,
      ease: "power3.out",
    });
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      gsap.from(".page-content", {
        opacity: 0,
        y: 50,
        duration: 1,
      });
    }, 50);

    return () => clearTimeout(timer);
  }, []);

  return (
    <main id="container" className="page-content">
      <section className="swiper-area">
        <Swiper
          modules={[Pagination, EffectFade, Navigation]}
          slidesPerView={1}
          loop={true}
          centeredSlides={true}
          speed={900}
          effect="fade"
          fadeEffect={{ crossFade: true }}
          navigation={true}
          pagination={{
            clickable: true,
          }}
          onSlideChange={handleSlideChange}
          className="mySwiper"
        >
          {slidesData.map((slide, i) => (
            <SwiperSlide key={i}>
              <img src={slide.img} alt={slide.title} />
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      <section className="text-box">
        <h2 id="brand-title" ref={titleRef}>
          {active.title}
        </h2>

        {active.title === "VIDEO" ? (
          <div className="video-buttons-inline" ref={chipsRef}>
            <button
              type="button"
              onClick={() =>
                window.open("https://youtu.be/wFsmd1jOVrs", "_blank")
              }
            >
              01
            </button>

            <button
              type="button"
              onClick={() =>
                window.open("https://youtu.be/qYRsoO6QHO4", "_blank")
              }
            >
              02
            </button>

            <button
              type="button"
              onClick={() =>
                window.open(
                  "https://www.youtube.com/watch?v=ZZZZZZZZZ",
                  "_blank"
                )
              }
            >
              03
            </button>
          </div>
        ) : (
          <div className="color-chips" ref={chipsRef}>
            {active.colors.map((color, idx) => (
              <div
                key={idx}
                className="chip"
                style={{ background: color }}
              ></div>
            ))}
          </div>
        )}

        <div className="keyword" id="keyword" ref={keywordRef}>
          {active.keyword}
        </div>

        <div className="detail" id="detail" ref={detailRef}>
          {active.detail}
        </div>
      </section>
    </main>
  );
};

export default WorkSwiper;