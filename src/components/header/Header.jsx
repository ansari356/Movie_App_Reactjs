import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLanguage } from "../../redux/slices/language";
import "./header.scss";

import logo from "../../assets/logosvg.svg";
import translate from "../../utils/translations";

export default function Header() {
  const location = useLocation();
  const currentPath = location.pathname;
  const dispatch = useDispatch();
  const [scroll, setScroll] = useState(false);

  const counterVal = useSelector((state) => state.wishlist.count);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPath]);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      setScroll(window.scrollY);
    });
  }, [window.scrollY]);

  const handleLanguageChange = (e) => {
    dispatch(setLanguage(e.target.value));
  };

  const selectedLanguage = useSelector(
    (state) => state.language.selectedLanguage
  );

    const lang = translate[selectedLanguage] || translate["en-US"];

  const headerStyle = {
    backdropFilter: scroll === 0 ? "unset" : "blur(10px)",
    direction: selectedLanguage === "ar-SA" ? "rtl" : "ltr",
  };
  const navLinks = [
    { path: "/", label: lang.home },
    { path: "/movies", label: lang.movies },
    { path: "/tvShows", label: lang.tvShows },
    { key: "watchlist", path: "/watchlist", label: lang.watchlist },
    // { path: "/login", label: "Login" },
    // { path: "/register", label: "Register" },
  ];

  return (
    <div id="header" className="header" style={headerStyle}>
      <div className="header__wrap container">
        <div className="logo">
          <img src={logo} alt="" />
          <Link to="/">PlayMovies</Link>
        </div>

        <ul className="header__nav">
          {navLinks.map((link, index) => (
            <li
              key={index}
              className={currentPath === link.path ? "active" : ""}
            >
              <Link to={link.path}>
                {link.label} {link.key === "watchlist" && `( ${counterVal} )`}
              </Link>
            </li>
          ))}

          <li className="ms-3">
            <select
              value={selectedLanguage}
              onChange={handleLanguageChange}
              className="form-select"
            >
              <option value="en-US">EN</option>
              <option value="ar-SA">العربية</option>
              <option value="fr-FR">FR</option>
              <option value="zh-CN">中文</option>
            </select>
          </li>
        </ul>
      </div>
    </div>
  );
}
// return (
//   <div id="header" className="header">
//     <div className="header__wrap container">
//       <div className="logo">
//         <img src={logo} alt="" />
//         <Link to="/">PlayMovies</Link>
//       </div>
//       <ul className="header__nav">
//         <li className={currentPath === "/" ? "active" : ""}>
//           {/* mean : if (currentPath === '/' ) { active }
//                               currentPath is a path of current page */}
//           <Link to={"/"}>Home</Link>
//         </li>

//         <li
//           className={currentPath === "/movies" ? "active" : ""}
//         >
//           <Link to={"/movies"}>Movies</Link>
//         </li>

//         <li
//           className={currentPath === "/tvShows" ? "active" : ""}
//         >
//           <Link to={"/tvShows"}>TV Shows</Link>
//         </li>
//         <li
//           className={
//             currentPath === "/watchlist" ? "active" : ""
//           }
//         >
//           <Link to={"/watchlist"}>Watchlist</Link>
//         </li>

//         <li className={currentPath === "/login" ? "active" : ""}>
//           <Link to={"/login"}>Login</Link>
//         </li>

//         <li
//           className={currentPath === "/register" ? "active" : ""}
//         >
//           <Link to={"/register"}>Register</Link>
//         </li>
//       </ul>
//     </div>
//   </div>

// );
// }
