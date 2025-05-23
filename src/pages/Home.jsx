import React from 'react'
import { Link } from 'react-router-dom';
import { OutlineButton } from '../components/button/Button';
import HeroSlide from '../components/heroSlide/HeroSlide';
import MovieList from '../components/movieList/MovieList';
import { category, movieType, tvType } from '../api/tmdbApi';
export default function Home() {
  return (
    <div>

       <HeroSlide/>
            <div className="container">
               
                <div className="section mb-3">
                    <div className="section__header mb-2">
                        <h2>Trending Movies</h2>
                        <Link to="/movies">
                            <OutlineButton className="small">View more</OutlineButton>
                        </Link>
                    </div>
                    <MovieList category={category.movie} type={movieType.popular}/>
                </div>

               
                <div className="section mb-3">
                    <div className="section__header mb-2">
                        <h2>Top Rated Movies</h2>
                        <Link to="/movies">
                            <OutlineButton className="small">View more</OutlineButton>
                        </Link>
                    </div>
                    <MovieList category={category.movie} type={movieType.top_rated}/>
                </div>

               
                <div className="section mb-3">
                    <div className="section__header mb-2">
                        <h2>Trending TV</h2>
                        <Link to="/tvShows">
                            <OutlineButton className="small">View more</OutlineButton>
                        </Link>
                    </div>
                    <MovieList category={category.tv} type={tvType.popular}/>
                </div>

               
                <div className="section mb-3">
                    <div className="section__header mb-2">
                        <h2>Top Rated TV</h2>
                        <Link to="/tvShows">
                            <OutlineButton className="small">View more</OutlineButton>
                        </Link>
                    </div>
                    <MovieList category={category.tv} type={tvType.top_rated}/>
                </div>
            
            </div>
    </div>
  )
}
