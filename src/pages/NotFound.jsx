import React from "react";
import "../scss/_notFound.scss";
import { Link, useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import notfound from "../Animations/NotFound.json";
import { useSelector } from "react-redux";
import translate from "../utils/translations";

export default function NotFound() {
  const navigate = useNavigate();
  const selectedLanguage = useSelector(
    (state) => state.language.selectedLanguage
  );
    const lang = translate[selectedLanguage] || translate["en-US"];
  return (
    <>
      <div className="container1">
        <Lottie animationData={notfound} loop={true} autoplay={true} />

        <button className="bton" onClick={() => navigate("/")}>
          {lang.goBackHome}
        </button>
      </div>
    </>
  );
}
