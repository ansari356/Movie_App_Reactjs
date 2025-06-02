import React from "react";
import "./moviecard.scss";
import { Link } from "react-router-dom";
import Button from "../button/Button";
import { category } from "../../api/tmdbApi";
import apiConfig from "../../api/apiConfig";

import { useDispatch, useSelector } from "react-redux";
import { addToWishList, removeFromWishList } from "../../redux/slices/wishlist";
import translate from "../../utils/translations";

const MovieCard = (props) => {
  const selectedLanguage = useSelector(
    (state) => state.language.selectedLanguage
  );
  const lang = translate[selectedLanguage] || translate["en-US"];
  const item = props.item;
  const type = props.category;

  const dispatch = useDispatch();
  const wishlist = useSelector((state) => state.wishlist.items);

  const link = "/" + category[type] + "/" + item.id;
  const bg = apiConfig.w500Image(item.poster_path || item.backdrop_path);
  const title = item.title || item.name;

  const isInWishlist = wishlist.some(
    (w) => w.id === item.id && w.media_type === type
  );

  const toggleWishlist = (e) => {
    e.preventDefault(); // Prevent Link navigation on heart click
    const payload = { ...item, media_type: type };
    isInWishlist
      ? dispatch(removeFromWishList(payload))
      : dispatch(addToWishList(payload));
  };

  return (
    <Link to={link}>
      <div className="movie-card" style={{ backgroundImage: `url(${bg})` }}>
        <i
          className={`bi ${
            isInWishlist ? "bi-heart-fill text-danger" : "bi-heart text-white"
          } heart-icon`}
          title={isInWishlist ? lang.removeFromWishlist : lang.addToWishlist}
          onClick={toggleWishlist}
        ></i>
        <Button>
          <i className="bx bx-play"></i>
        </Button>
      </div>
      <h3>{title}</h3>
    </Link>
  );
};

export default MovieCard;
