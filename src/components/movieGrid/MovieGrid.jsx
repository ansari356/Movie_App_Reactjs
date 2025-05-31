import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { useSelector } from "react-redux";
import "./moviegrid.scss";

import Button, { OutlineButton } from "../button/Button";
// import Input from '../input/Input'

import tmdbApi, { category, movieType, tvType } from "../../api/tmdbApi";
import MovieCard from "../movieCard/MovieCard";
import translate from "../../utils/translations";

const MovieGrid = (props) => {
  const selectedLanguage = useSelector(
    (state) => state.language.selectedLanguage
  );
    const lang = translate[selectedLanguage] || translate["en-US"];
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const totalPage = props.totalPages;
  const { keyword } = useParams();

  useEffect(() => {
    const getList = async () => {
      if (props.items && props.items.length > 0) {
        setItems(props.items);
        return;
      }

      let response = null;
      if (keyword === undefined) {
        const params = {language: selectedLanguage};
        switch (props.category) {
          case category.movie:
            response = await tmdbApi.getMoviesList(movieType.upcoming, {
              params,
            });
            break;
          default:
            response = await tmdbApi.getTvList(tvType.popular, { params });
        }
      } else {
        const params = {
          query: keyword,
          language: selectedLanguage,
        };
        response = await tmdbApi.search(props.category, { params });
      }

      setItems(response.results);
    };

    getList();
  }, [props.category, keyword, props.items, selectedLanguage]);

  const loadMore = async () => {
    let response = null;
    if (keyword === undefined) {
      const params = {
        page: page + 1,
        language: selectedLanguage,
      };
      switch (props.category) {
        case category.movie:
          response = await tmdbApi.getMoviesList(movieType.upcoming, {
            params,
          });
          break;
        default:
          response = await tmdbApi.getTvList(tvType.popular, params);
      }
    } else {
      const params = {
        page: page + 1,
        query: keyword,
        language: selectedLanguage,
      };
      response = await tmdbApi.search(props.category, params );
    }
    setItems([...items, ...response.results]);
    setPage(page + 1);
  };

  return (
    <>
      <div className="movie-grid">
        {items.map((item, i) => (
          <MovieCard category={props.category} item={item} key={i} />
        ))}
      </div>
      {page < totalPage ? (
        <div className="movie-grid__loadmore">
          <OutlineButton className="small" onClick={loadMore}>
            {lang.loadMore}
          </OutlineButton>
        </div>
      ) : null}
    </>
  );
};

export default MovieGrid;
