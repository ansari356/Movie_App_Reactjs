import { Link } from "react-router-dom";
import React from "react";
import { useLocation } from "react-router-dom";
import "./header.scss";
import logo from '../../assets/logosvg.svg';


export default function Header() {
    const location = useLocation();
    const currentPath = location.pathname;

  return (
    <div id="header" className="header">
      <div className="header__wrap container">
        <div className="logo">
          <img src={logo} alt="" />
          <Link to="/">PlayMovies</Link>
        </div>
        <ul className="header__nav">
          <li className={currentPath === "/" ? "active" : ""}>
            {/* mean : if (currentPath === '/' ) { active }
                                currentPath is a path of current page */}
            <Link to={"/"}>Home</Link>
          </li>

          <li
            className={currentPath === "/movies" ? "active" : ""}
          >
            <Link to={"/movies"}>Movies</Link>
          </li>

          <li
            className={currentPath === "/tvShows" ? "active" : ""}
          >
            <Link to={"/tvShows"}>TV Shows</Link>
          </li>
          <li
            className={
              currentPath === "/watchlist" ? "active" : ""
            }
          >
            <Link to={"/watchlist"}>Watchlist</Link>
          </li>

          <li className={currentPath === "/login" ? "active" : ""}>
            <Link to={"/login"}>Login</Link>
          </li>

          <li
            className={currentPath === "/register" ? "active" : ""}
          >
            <Link to={"/register"}>Register</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
