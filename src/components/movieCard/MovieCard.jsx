import React from 'react';

import './moviecard.scss';

import { Link } from 'react-router-dom';

import Button from '../button/Button';

import { category } from '../../api/tmdbApi';
import apiConfig from '../../api/apiConfig';

const MovieCard = props => {

    const item  = props.item;

    const link = '/' + category[props.category] + '/' + item.id;

    const bg = apiConfig.w500Image(item.poster_path || item.backdrop_path);
    // item.poster_path is a poster of movie, item.backdrop_path is a backdrop of movie
    // item.backdrop_path is a backdrop of movie.

    return (
        <Link to={link}>
            <div className="movie-card" style={{backgroundImage: `url(${bg})`}}>
                <Button>
                    <i className="bx bx-play"></i>

                </Button>
            </div>
            <h3>{item.title || item.name}</h3>
        </Link>
    );
}

export default MovieCard;
