import React from "react";
import "../css/resumeCard.css";

const ResumeCard = () => {
  const base = import.meta.env.BASE_URL;

  const skills = [
    "photoshop",
    "illustrator",
    "figma",
    "premiere-pro",
    "vscode",
    "html",
    "css",
    "javascript",
    "react",
    "github",
  ];

  return (
    <>
      <section className="resume-card-wrap">
        <div
          className="my-p p1"
          style={{
            backgroundImage: `url(${base}img/3dwork.png)`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "right bottom",
            backgroundSize: "50% auto",
          }}
        >
          <div className="card">
            <div className="c-item">
              <p className="card-title">Experience</p>
              <ul className="card-txts">
                <li><strong>하늘공원미술교습소</strong> <br className="mob-txt" />2021.03 - 2022.05</li>
                <li><strong>(주)굿비엠</strong> <br className="mob-txt" />2022.05 - 2024.05</li>
                <li><strong>SIS 신인수 유학원</strong> <br className="mob-txt" />2024.07 - 2024.11</li>
              </ul>
            </div>
          </div>
        </div>

        <div
          className="my-p p2"
          style={{
            backgroundImage: `url(${base}img/3dstudy.png)`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "left bottom",
            backgroundSize: "50% auto",
          }}
        >
          <div className="card">
            <div className="c-item">
              <p className="card-title">Education</p>
              <ul className="card-txts">
                <li><strong>상명대학교 부속여자고등학교</strong> <br className="mob-txt" />2013 (졸업)</li>
                <li><strong>동덕여자대학교 디지털공예과</strong> <br className="mob-txt" />2015 - 2020 (졸업)</li>
                <li><strong>Miami University</strong> <br className="mob-txt" />2018.08 - 2019.01 (어학연수)</li>
                <li><strong>웹•앱개발 AI 서비스 엔지니어 양성</strong> <br className="mob-txt" />2025.04 - 2025.10</li>
              </ul>
            </div>
          </div>
        </div>

        <div
          className="my-p p3"
          style={{
            backgroundImage: `url(${base}img/work2.png)`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "right bottom",
            backgroundSize: "50% auto",
          }}
        >
          <div className="card">
            <div className="c-item">
              <p className="card-title">Skills</p>
              <ul className="card-txts">
                {skills.map((tool) => (
                  <li key={tool}>
                    <img src={`${base}img/${tool}.png`} alt={tool} />
                    <strong>{tool.replace("-", " ").toUpperCase()}</strong>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ResumeCard;