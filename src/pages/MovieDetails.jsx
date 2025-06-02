import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import tmdbApi, { category } from "../api/tmdbApi";
import DetailsCard from "../components/detailsCard/DetailsCard";
import MovieList from "../components/movieList/MovieList";
import { OutlineButton } from "../components/button/Button";
import axios from "axios";
import ReviewCard from "../components/ReviewCard/ReviewCard";
import translate from "../utils/translations";

export default function MovieDetails() {
  const selectedLanguage = useSelector(
    (state) => state.language.selectedLanguage
  );
  const { id } = useParams();

  const [movie, setMovie] = useState();
  const [recommend, setRecommend] = useState();
  const [reviews, setReviews] = useState();
  // const params = { language: selectedLanguage };
  const apiKey = "49846a5fea90eddee7c5c9e80d5c8cb7";

  const lang = translate[selectedLanguage] || translate["en-US"];

  useEffect(() => {
    (async () => {
      const params = {
        language: selectedLanguage,
      };
      window.scrollTo({ top: 0 });
      const movie_res = await tmdbApi.detail(category.movie, id, params);
      const recommend_res = await tmdbApi.similar(category.movie, id, params);
      // const review_res = await axios.get(
      //   `https://api.themoviedb.org/3/movie/${id}/reviews?api_key=${apiKey}`
      // );
      setMovie(movie_res);
      setRecommend(recommend_res.results);
      // setReviews(review_res.data.results);
      console.log("movie_res", movie_res);
      console.log("recommend_res", recommend_res.results);
      // console.log("review_res", review_res.data.results);
    })();
  }, [id, selectedLanguage]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}/reviews`,
          {
            params: {
              api_key: apiKey,
            },
          }
        );
        setReviews(res.data.results);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    fetchReviews();
  }, [id, selectedLanguage]);

  return (
    <>
      {movie && <DetailsCard data={movie} type="movie" />}
      <div
        className="container"
        dir={selectedLanguage === "ar-SA" ? "rtl" : "ltr"}
      >
        <div className="section">
          <hr style={{ opacity: 0.2 }} />
          <h1 className="header-details"> {lang.recommendations}</h1>
          <div className="section mb-3">
            <MovieList categoryInput={category.movie} type="similar" id={id} />
          </div>
        </div>

        {reviews && reviews.length > 0 && (
          <div className="section">
            <h1 className="header-details">{lang.reviews}</h1>
            <div className="reviews-grid">
              {reviews.map((review) => (
                <ReviewCard key={review.id} data={review} />
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
