import React, { useEffect } from "react";
import { ScrollSmoother } from "gsap/all"; 
import ContactCircle from "../components/ContactCircle";
import ResumeBackground from "../components/ResumeBackground";
import ResumeCard from "../components/ResumeCard";
import "../css/reset.css";
import "../css/font.css";
import "../css/resume.css";
import "../css/resumeCard.css";

function Resume() {
  useEffect(() => {
    const smoother = ScrollSmoother.get();
    if (smoother) {
      smoother.scrollTo(0, false);
    } else {
      window.scrollTo(0, 0);
    }
  }, []);

  return (
    <div id="resume-page">
      <ResumeBackground>
        <ResumeCard />
        <ContactCircle />
      </ResumeBackground>
    </div>
  );
}

export default Resume;