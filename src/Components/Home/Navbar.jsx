import React, { useState, useEffect } from "react";
import { Link as ScrollLink } from "react-scroll";
import { useTranslation } from "react-i18next";
import LanguageSelector from "../Language/languageSelector";
import ThemeToggle from "../Theme/ThemeToggle";
import "./Navbar.css";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("home");

  const handleLinkClick = (linkName) => {
    setMenuOpen(false);
    scrollTo(linkName);
  };

  const scrollTo = (linkName) => {
    const element = document.getElementById(linkName);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("section");
      const scrollPosition = window.scrollY;

      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (
          scrollPosition >= sectionTop - sectionHeight / 3 &&
          scrollPosition < sectionTop + sectionHeight
        ) {
          setActiveLink(section.getAttribute("id"));
        }
      });
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const { t } = useTranslation();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="navbar">
      <a href="#home" className="logo">
        Bahar.
      </a>

      <div className={`menu ${menuOpen ? "open" : ""}`}>
        <ul id="navbar">
          <li>
            <ScrollLink
              to="home"
              smooth={true}
              duration={700}
              className={activeLink === "home" ? "active" : ""}
              onClick={() => handleLinkClick("home")}
            >
              {t("NAVBAR.home")}
            </ScrollLink>
          </li>

          <li>
            <ScrollLink
              to="about"
              smooth={true}
              duration={700}
              className={activeLink === "about" ? "active" : ""}
              onClick={() => handleLinkClick("about")}
            >
              {t("NAVBAR.about")}
            </ScrollLink>
          </li>

          <li>
            <ScrollLink
              to="skills"
              smooth={true}
              duration={700}
              className={activeLink === "skills" ? "active" : ""}
              onClick={() => handleLinkClick("skills")}
            >
              {t("NAVBAR.skills")}
            </ScrollLink>
          </li>

          <li>
            <ScrollLink
              to="projects"
              smooth={true}
              duration={700}
              className={activeLink === "projects" ? "active" : ""}
              onClick={() => handleLinkClick("projects")}
            >
              {t("NAVBAR.projects")}
            </ScrollLink>
          </li>

          <li>
            <ScrollLink
              to="contact"
              smooth={true}
              duration={700}
              className={activeLink === "contact" ? "active" : ""}
              onClick={() => handleLinkClick("contact")}
            >
              {t("NAVBAR.contact")}
            </ScrollLink>
          </li>
        </ul>
      </div>

      <div className="lang-menu">
        <ThemeToggle />
        <LanguageSelector />
        <span className="menu-toggle" onClick={toggleMenu}>
          <i className="bx bx-menu-alt-right menu-icon"></i>
        </span>
      </div>
    </nav>
  );
}
