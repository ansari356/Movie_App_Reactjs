import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import tmdbApi, { category } from "../api/tmdbApi";
import DetailsCard from "../components/detailsCard/DetailsCard";
import MovieList from "../components/movieList/MovieList";
import axios from "axios";
import ReviewCard from "../components/ReviewCard/ReviewCard";
import { useSelector } from "react-redux";
import translate from "../utils/translations";

export default function TvDetails() {
  const selectedLanguage = useSelector(
    (state) => state.language.selectedLanguage
  );
    const lang = translate[selectedLanguage] || translate["en-US"];
  const { id } = useParams();
  const [tv, setTv] = useState();
  const [reviews, setReviews] = useState();
  const params = {};
  const apiKey = "49846a5fea90eddee7c5c9e80d5c8cb7";

  useEffect(() => {
    (async () => {
      window.scrollTo({ top: 0 });
      const tv_res = await tmdbApi.detail(category.tv, id, { params });
      const review_res = await axios.get(
        `https://api.themoviedb.org/3/tv/${id}/reviews?api_key=${apiKey}&language=${selectedLanguage}`
      );
      setTv(tv_res);
      setReviews(review_res.data.results);
      console.log("tv_res", tv_res);
      console.log("review_res", review_res.data.results);
    })();
  }, [id]);

  return (
    <>
      {tv && <DetailsCard data={tv} type="tv" />}
      <div className="container" dir={selectedLanguage === "ar-SA" ? "rtl" : "ltr"}>
        <div className="section">
          <hr style={{ opacity: 0.2 }} />
          <h1 className="header-details">{lang.recommendations}</h1>
          <div className="section mb-3">
            <MovieList categoryInput={category.tv} type="similar" id={id} />
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
