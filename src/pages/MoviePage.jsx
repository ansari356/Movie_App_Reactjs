import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import tmdbApi from "../api/tmdbApi";
import MovieGrid from "../components/movieGrid/MovieGrid";
import Loading from "../components/loading/Loading";
import Input from "./../components/input/Input";
import { category } from "../api/tmdbApi";
import translate from "../utils/translations";

const MoviesPage = () => {
  const [popularMovies, setPopularMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
  const [searchMovies, setSearchMovies] = useState([]);
  const [activeSection, setActiveSection] = useState("popular");
  const [query, setQuery] = useState("");
  const [popularMoviesTotalPages, setPopularMoviesTotalPages] = useState(1);
  const [topRatedMoviesTotalPages, setTopRatedMoviesTotalPages] = useState(1);
  const [upcomingMoviesTotalPages, setUpcomingMoviesTotalPages] = useState(1);
  const [nowPlayingMoviesTotalPages, setNowPlayingMoviesTotalPages] =
    useState(1);
  const [searchMoviesTotalPages, setSearchMoviesTotalPages] = useState(1);

  const selectedLanguage = useSelector(
    (state) => state.language.selectedLanguage
  );
  const lang = translate[selectedLanguage] || translate["en-US"];

  const handleSearch = async (query) => {
    try {
      const res = await tmdbApi.search("movie", { params: { query } });
      setSearchMovies(res.results);
      if (res.results.length === 0) {
        document.getElementById("no-results").style.display = "block";
      }
    } catch (err) {
      console.error("Error searching movies: ", err);
    }
  };

  useEffect(() => {
    if (query.trim() === "") {
      setSearchMovies([]);
      document.getElementById("no-results").style.display = "none";
    }
  }, [query]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const params = {
          language: selectedLanguage,
        };
        const res1 = await tmdbApi.getMoviesList("popular", params);
        setPopularMovies(res1.results);
        setPopularMoviesTotalPages(res1.total_pages);

        const res2 = await tmdbApi.getMoviesList("top_rated", params);
        setTopRatedMovies(res2.results);
        setTopRatedMoviesTotalPages(res2.total_pages);

        const res3 = await tmdbApi.getMoviesList("upcoming", params);
        setUpcomingMovies(res3.results);
        setUpcomingMoviesTotalPages(res3.total_pages);
      } catch (err) {
        console.error("Error fetching movies: ", err);
      }
    };

    fetchData();
  }, [selectedLanguage]);

  if (!popularMovies || !topRatedMovies || !upcomingMovies || !nowPlayingMovies)
    return <Loading />;

  return (
    <div
      className="container"
      dir={selectedLanguage === "ar-SA" ? "rtl" : "ltr"}
      style={{ marginTop: "6rem", padding: "2rem" }}
    >
      <div
        className="search"
        style={{ marginBottom: "2rem", marginTop: "2rem", display: "flex" }}
      >
        <Input
          type="text"
          onChange={(e) => setQuery(e.target.value)}
          placeholder={lang.searchPlaceholderMovies}
          style={{ width: "80%" }}
        />
        <button
          className="btn-search"
          onClick={() => handleSearch(query)}
          style={{
            marginLeft: selectedLanguage === "ar-SA" ? "0" : "1rem",
            marginRight: selectedLanguage === "ar-SA" ? "1rem" : "0",
          }}
        >
          {lang.search}
        </button>
      </div>

      {searchMovies.length > 0 && (
        <MovieGrid items={searchMovies} category={category.movie} />
      )}
      <h2
        id="no-results"
        style={{
          textAlign: "center",
          marginTop: "2rem",
          marginBottom: "2rem",
          display: "none",
        }}
      >
        {lang.noResults}
      </h2>

      <div style={{ display: "flex", gap: "1rem", marginBottom: "2rem" }}>
        <button
          onClick={() => setActiveSection("popular")}
          className={`${activeSection === "popular" ? "active" : ""} categ`}
        >
          {lang.popular}
        </button>
        <button
          onClick={() => setActiveSection("top_rated")}
          className={`${activeSection === "top_rated" ? "active" : ""} categ`}
        >
          {lang.topRated}
        </button>

        <button
          onClick={() => setActiveSection("upcoming")}
          className={`${activeSection === "upcoming" ? "active" : ""} categ`}
        >
          {lang.upcoming}
        </button>

        <button
          onClick={() => setActiveSection("now_playing")}
          className={`${activeSection === "now_playing" ? "active" : ""} categ`}
        >
          {lang.nowPlaying}
        </button>
      </div>

      {activeSection === "popular" && (
        <>
          <h2>{lang.popularMovies}</h2>
          <br />
          <MovieGrid
            items={popularMovies}
            category={category.movie}
            totalPages={popularMoviesTotalPages}
          />
        </>
      )}

      {activeSection === "top_rated" && (
        <>
          <h2>{lang.topRatedMovies}</h2>
          <br />
          <MovieGrid
            items={topRatedMovies}
            category={category.movie}
            totalPages={topRatedMoviesTotalPages}
          />
        </>
      )}

      {activeSection === "upcoming" && (
        <>
          <h2>{lang.upcomingMovies}</h2>
          <br />
          <MovieGrid
            items={upcomingMovies}
            category={category.movie}
            totalPages={upcomingMoviesTotalPages}
          />
        </>
      )}

      {activeSection === "now_playing" && (
        <>
          <h2>{lang.nowPlayingMovies}</h2>
          <br />
          <MovieGrid
            items={nowPlayingMovies}
            category={category.movie}
            totalPages={nowPlayingMoviesTotalPages}
          />
        </>
      )}
    </div>
  );
};

export default MoviesPage;
