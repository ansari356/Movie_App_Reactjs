import React, { useEffect, useState } from "react";
import tmdbApi from "../api/tmdbApi";
import MovieGrid from "../components/movieGrid/MovieGrid";
import Loading from "../components/loading/Loading";
import Input from "./../components/input/Input";
import { category } from "../api/tmdbApi";

const TvShowsPage = () => {
  const [popularTv, setPopularTv] = useState([]);
  const [topRatedTv, setTopRatedTv] = useState([]);
  const [onTheAirTv, setOnTheAirTv] = useState([]);
  const [searchShows, setSearchShows] = useState([]);
  const [activeSection, setActiveSection] = useState("popular");
  const [query, setQuery] = useState("");
  const [popularTvTotalPages, setPopularTvTotalPages] = useState(1);
  const [topRatedTvTotalPages, setTopRatedTvTotalPages] = useState(1);
  const [onTheAirTvTotalPages, setOnTheAirTvTotalPages] = useState(1);
  const [searchShowsTotalPages, setSearchShowsTotalPages] = useState(1);

  const handleSearch = async (query) => {
    try {
      const res = await tmdbApi.search("tv", { params: { query } });
      setSearchShows(res.results);
      if (res.results.length === 0) {
        document.getElementById("no-results").style.display = "block";
      }
    } catch (err) {
      console.error("Error searching TV shows: ", err);
    }
  };

  useEffect(() => {
    if (query.trim() === "") {
      setSearchShows([]);
      document.getElementById("no-results").style.display = "none";
    }
  }, [query]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res1 = await tmdbApi.getTvList("popular", { params: {} });
        setPopularTv(res1.results);
        setPopularTvTotalPages(res1.total_pages);

        const res2 = await tmdbApi.getTvList("top_rated", { params: {} });
        setTopRatedTv(res2.results);
        setTopRatedTvTotalPages(res2.total_pages);

        const res3 = await tmdbApi.getTvList("on_the_air", { params: {} });
        setOnTheAirTv(res3.results);
        setOnTheAirTvTotalPages(res3.total_pages);
      } catch (err) {
        console.error("Error fetching TV shows: ", err);
      }
    };

    fetchData();
  }, []);

  if (!popularTv || !topRatedTv || !onTheAirTv) return <Loading />;

  return (
    <div className="container" style={{ marginTop: "6rem", padding: "2rem" }}>
      <div
        className="search"
        style={{ marginBottom: "2rem", marginTop: "2rem", display: "flex" }}
      >
        <Input
          type="text"
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search TV Shows"
          style={{ width: "80%" }}
        />
        <button
          className="btn-search"
          onClick={() => handleSearch(query)}
          style={{ marginLeft: "1rem" }}
        >
          Search
        </button>
      </div>

      {searchShows.length > 0 && (
        <MovieGrid items={searchShows} category={category.tv} />
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
        No results found
      </h2>

      <div style={{ display: "flex", gap: "1rem", marginBottom: "2rem" }}>
        <button
          onClick={() => setActiveSection("popular")}
          className={`${activeSection === "popular" ? "active" : ""} categ`}
        >
          Popular
        </button>
        <button
          onClick={() => setActiveSection("top_rated")}
          className={`${activeSection === "top_rated" ? "active" : ""} categ`}
        >
          Top Rated
        </button>
        <button
          onClick={() => setActiveSection("on_the_air")}
          className={`${activeSection === "on_the_air" ? "active" : ""} categ`}
        >
          On The Air
        </button>
      </div>

      {activeSection === "popular" && (
        <>
          <h2>Popular TV Shows</h2>
          <br />
          <MovieGrid
            items={popularTv}
            category={category.tv}
            totalPages={popularTvTotalPages}
          />
        </>
      )}

      {activeSection === "top_rated" && (
        <>
          <h2>Top Rated TV Shows</h2>
          <br />
          <MovieGrid
            items={topRatedTv}
            category={category.tv}
            totalPages={topRatedTvTotalPages}
          />
        </>
      )}

      {activeSection === "on_the_air" && (
        <>
          <h2>On The Air</h2>
          <br />
          <MovieGrid
            items={onTheAirTv}
            category={category.tv}
            totalPages={onTheAirTvTotalPages}
          />
        </>
      )}
    </div>
  );
};

export default TvShowsPage;
