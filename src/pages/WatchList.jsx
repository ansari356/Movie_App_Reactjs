import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import MovieGrid from "../components/movieGrid/MovieGrid";
import { category } from "../api/tmdbApi";
import tmdbApi from "../api/tmdbApi";
import translate from "../utils/translations";

export default function WatchList() {
  const selectedLanguage = useSelector((state) => state.language.selectedLanguage);
  const lang = translate[selectedLanguage] || translate["en-US"];
  const wishlist = useSelector((state) => state.wishlist.items);

  const [movies, setMovies] = useState([]);
  const [tvShows, setTvShows] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWishlistItems = async () => {
      setLoading(true);
      const moviesList = [];
      const tvList = [];

      await Promise.all(
        wishlist.map(async (item) => {
          try {
            const res = await tmdbApi.getDetails(item.media_type, item.id, selectedLanguage);
            if (item.media_type === "movie") {
              moviesList.push(res);
            } else if (item.media_type === "tv") {
              tvList.push(res);
            }
          } catch (err) {
            console.error("Error fetching item:", err);
          }
        })
      );

      setMovies(moviesList);
      setTvShows(tvList);
      setLoading(false);
    };

    fetchWishlistItems();
  }, [wishlist, selectedLanguage]);

  return (
    <div
      className="container"
      dir={selectedLanguage === "ar-SA" ? "rtl" : "ltr"}
      style={{
        marginTop: "6rem",
        padding: "2rem",
        textAlign: selectedLanguage === "ar-SA" ? "right" : "left",
      }}
    >
      {loading ? (
        <p>{lang.loading || "Loading..."}</p>
      ) : (
        <>
          {/* Movies Section */}
          <h2 className="mb-4">{lang.moviesTitle}</h2>
          {movies.length > 0 ? (
            <MovieGrid category={category.movie} items={movies} totalPages={1} />
          ) : (
            <p>{lang.noMovies}</p>
          )}

          {/* TV Shows Section */}
          <h2 className="mb-4 mt-5">{lang.tvShowsTitle}</h2>
          {tvShows.length > 0 ? (
            <MovieGrid category={category.tv} items={tvShows} totalPages={1} />
          ) : (
            <p>{lang.noTvShows}</p>
          )}
        </>
      )}
    </div>
  );
}
