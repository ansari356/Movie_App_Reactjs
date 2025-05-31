import React from "react";

import "./footer.scss";

import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import bg from "../../assets/footer-bg.jpg";
import logo from "../../assets/logosvg.svg";
import translate from "../../utils/translations";

const Footer = () => {

  const selectedLanguage = useSelector(
    (state) => state.language.selectedLanguage
  );
    const lang = translate[selectedLanguage] || translate["en-US"];

  return (
    <div
      className="footer"
      dir={selectedLanguage === "ar-SA" ? "rtl" : "ltr"}
      style={{ backgroundImage: `url(${bg})` }}
    >
      <div className="footer__content container">
        <div className="footer__content__logo">
          <div className="logo">
            <img src={logo} alt="" />
            <Link to="/">PlayMovies</Link>
          </div>
        </div>
        <div className="footer__content__menus">
          <div className="footer__content__menu">
            <Link to="/">{lang.home}</Link>
            <Link to="/">{lang.contact}</Link>
            <Link to="/">{lang.terms}</Link>
            <Link to="/">{lang.about}</Link>
          </div>
          <div className="footer__content__menu">
            <Link to="/">{lang.live}</Link>
            <Link to="/">{lang.faq}</Link>
            <Link to="/">{lang.premium}</Link>
            <Link to="/">{lang.privacy}</Link>
          </div>
          <div className="footer__content__menu">
            <Link to="/">{lang.mustWatch}</Link>
            <Link to="/">{lang.recent}</Link>
            <Link to="/">{lang.top}</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
