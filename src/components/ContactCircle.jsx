import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { gsap } from "gsap";
import "../css/ContactCircle.css";
import workImg from "/img/work.png";

const ContactCircle = () => {
  const navigate = useNavigate();
  const [size, setSize] = useState(getSize());

  function getSize() {
    const vw = window.innerWidth;
    if (vw < 480) return { btn: 120, img: 74, radius: 52, font: 0.65 };
    if (vw < 768) return { btn: 150, img: 92, radius: 65, font: 0.75 };
    if (vw < 1280) return { btn: 180, img: 110, radius: 80, font: 0.85 };
    return { btn: 220, img: 134, radius: 98, font: 1.0 };
  }

  useEffect(() => {
    const handleResize = () => setSize(getSize());
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      gsap.from(".contact-fixed", {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: "power2.out",
      });
    }, 50);
    return () => clearTimeout(timer);
  }, []);

  const handleClick = () => navigate("/contact");

  const text = ["c", "o", "n", "t", "a", "c", "t", "*", "m", "e", "*"];

  return (
    <div id="contact-circle" className="contact-fixed page-content">
      <button
        className="contact-btn"
        onClick={handleClick}
        style={{ width: size.btn, height: size.btn }}
      >
        <p className="circle-text">
          {text.map((char, i) => {
            const angle = (360 / text.length) * i;
            const transform = `rotate(${angle.toFixed(2)}deg) translate(${size.radius}px) rotate(90deg)`;
            return (
              <span
                key={i}
                style={{ transform, fontSize: `${size.font}rem` }}
              >
                {char}
              </span>
            );
          })}
        </p>

        <div
          className="contact-img-wrap"
          style={{ width: size.img, height: size.img }}
        >
          <div className="contact-img-bg">
            <img src={workImg} alt="contact icon" className="contact-img" />
          </div>
        </div>
      </button>
    </div>
  );
};

export default ContactCircle;