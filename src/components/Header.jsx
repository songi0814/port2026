import React from "react";
import { NavLink } from "react-router-dom";
import "../css/reset.css"
import "../css/header.css";

const Header = () => {
  return (
    <header id="header">
      <span className="title">
        <NavLink to="/">PORTFOLIO</NavLink>
      </span>

      <ul className="dep1">
        <li>
          <NavLink 
            to="/resume"
            className={({ isActive }) => isActive ? "active" : ""}
          >
            RESUME
          </NavLink>
        </li>

        <li>
          <NavLink 
            to="/work"
            className={({ isActive }) => isActive ? "active" : ""}
          >
            PROJECT
          </NavLink>
        </li>

        <li>
          <NavLink 
            to="/contact"
            className={({ isActive }) => isActive ? "active" : ""}
          >
            CONTACT
          </NavLink>
        </li>
      </ul>
    </header>
  );
};

export default Header;