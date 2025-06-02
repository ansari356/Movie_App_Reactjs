
import React, { useEffect, useState } from "react";
import translate from "../utils/translations";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { OutlineButton } from "../components/button/Button";
import HeroSlide from "../components/heroSlide/HeroSlide";
import MovieList from "../components/movieList/MovieList";
import Loading from "../components/loading/Loading";
import { category, movieType, tvType } from "../api/tmdbApi";

export default function Home() {
  const [loading, setLoading] = useState(true);

  const selectedLanguage = useSelector(
    (state) => state.language.selectedLanguage
  );
    const lang = translate[selectedLanguage] || translate["en-US"];

  useEffect(() => {
    // Simulate loading for HeroSlide or other async setup
    setTimeout(() => setLoading(false), 500); // Adjust based on actual async needs
  }, []);

  if (loading) return <Loading />;

  return (
    <div>
      <HeroSlide />
      <div
        className="container"
        dir={selectedLanguage === "ar-SA" ? "rtl" : "ltr"}
      >
        <div className="section mb-3">
          <div className="section__header mb-2">
            <h2>{lang.trendingMovies}</h2>
            <Link to="/movies">
              <OutlineButton className="small">{lang.viewMore}</OutlineButton>
            </Link>
          </div>
          <MovieList categoryInput={category.movie} type={movieType.popular} />
        </div>

        <div className="section mb-3">
          <div className="section__header mb-2">
            <h2>{lang.topRatedMovies}</h2>
            <Link to="/movies">
              <OutlineButton className="small">{lang.viewMore}</OutlineButton>
            </Link>
          </div>
          <MovieList
            categoryInput={category.movie}
            type={movieType.top_rated}
          />
        </div>

        <div className="section mb-3">
          <div className="section__header mb-2">
            <h2>{lang.trendingTV}</h2>
            <Link to="/tvShows">
              <OutlineButton className="small">{lang.viewMore}</OutlineButton>
            </Link>
          </div>
          <MovieList categoryInput={category.tv} type={tvType.popular} />
        </div>

        <div className="section mb-3">
          <div className="section__header mb-2">
            <h2>{lang.topRatedTV}</h2>
            <Link to="/tvShows">
              <OutlineButton className="small">{lang.viewMore}</OutlineButton>
            </Link>
          </div>
          <MovieList categoryInput={category.tv} type={tvType.top_rated} />
        </div>
      </div>
    </div>
  );
}
