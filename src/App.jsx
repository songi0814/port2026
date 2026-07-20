import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Main from "./pages/Main";
import Resume from "./pages/Resume";
import Work from "./pages/Work";
import Contact from "./pages/Contact";

const App = () => {
  const location = useLocation();

  const isMainPage = location.pathname === "/";

  return (
    <>
      {!isMainPage && <Header />}

      <Routes>
        <Route path="/" element={<Main />} /> 
        <Route path="/main" element={<Main />} />
        <Route path="/resume" element={<Resume />} />
        <Route path="/work" element={<Work />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </>
  );
};

export default App;
