// import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import { OutlineButton } from '../components/button/Button';
// import HeroSlide from '../components/heroSlide/HeroSlide';
// import MovieList from '../components/movieList/MovieList';
// import Loading from '../components/loading/Loading';

// import { category, movieType, tvType } from '../api/tmdbApi';
// import tmdbApi from '../api/tmdbApi';
// import MovieGrid from '../components/movieGrid/MovieGrid';

// export default function Home() {
//     const [loading, setLoading] = useState(true);
//     const [data, setData] = useState({
//         trendingMovies: [],
//         topRatedMovies: [],
//         trendingTv: [],
//         topRatedTv: []
//     });

//     useEffect(() => {
//         const fetchAll = async () => {
//             try {
//                 const [trendingMoviesRes, topRatedMoviesRes, trendingTvRes, topRatedTvRes] = await Promise.all([
//                     tmdbApi.getMoviesList(movieType.popular, { params: {} }),
//                     tmdbApi.getMoviesList(movieType.top_rated, { params: {} }),
//                     tmdbApi.getTvList(tvType.popular, { params: {} }),
//                     tmdbApi.getTvList(tvType.top_rated, { params: {} })
//                 ]);

//                 setData({
//                     trendingMovies: trendingMoviesRes.results,
//                     topRatedMovies: topRatedMoviesRes.results,
//                     trendingTv: trendingTvRes.results,
//                     topRatedTv: topRatedTvRes.results
//                 });
//                 console.log(trendingMoviesRes.results);
//                 setLoading(false);
//             } catch (err) {
//                 console.error('Fetch failed', err);
//             }
//         };

//         fetchAll();
//     }, []);

//     if (loading) return <Loading />;

//     return (
//         <div>
//             <HeroSlide />
//             <div className="container">
//                 <div className="section mb-3">
//                     <div className="section__header mb-2">
//                         <h2>Trending Movies</h2>
//                         <Link to="/movies">
//                             <OutlineButton className="small">View more</OutlineButton>
//                         </Link>
//                     </div>
//                     <MovieList items={data.trendingMovies} category={category.movie} />
//                 </div>

//                 <div className="section mb-3">
//                     <div className="section__header mb-2">
//                         <h2>Top Rated Movies</h2>
//                         <Link to="/movies">
//                             <OutlineButton className="small">View more</OutlineButton>
//                         </Link>
//                     </div>
//                     <MovieList items={data.topRatedMovies} category={category.movie} />
//                 </div>

//                 <div className="section mb-3">
//                     <div className="section__header mb-2">
//                         <h2>Trending TV</h2>
//                         <Link to="/tvShows">
//                             <OutlineButton className="small">View more</OutlineButton>
//                         </Link>
//                     </div>
//                     <MovieList items={data.trendingTv} category={category.tv} />
//                 </div>

//                 <div className="section mb-3">
//                     <div className="section__header mb-2">
//                         <h2>Top Rated TV</h2>
//                         <Link to="/tvShows">
//                             <OutlineButton className="small">View more</OutlineButton>
//                         </Link>
//                     </div>
//                     <MovieList items={data.topRatedTv} category={category.tv} />
//                 </div>
//             </div>
//         </div>
//     );
// }

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { OutlineButton } from '../components/button/Button';
import HeroSlide from '../components/heroSlide/HeroSlide';
import MovieList from '../components/movieList/MovieList';
import Loading from '../components/loading/Loading';
import { category, movieType, tvType } from '../api/tmdbApi';

export default function Home() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate loading for HeroSlide or other async setup
        setTimeout(() => setLoading(false), 500); // Adjust based on actual async needs
    }, []);

    if (loading) return <Loading />;

    return (
        <div>
            <HeroSlide />
            <div className="container">
                <div className="section mb-3">
                    <div className="section__header mb-2">
                        <h2>Trending Movies</h2>
                        <Link to="/movies">
                            <OutlineButton className="small">View more</OutlineButton>
                        </Link>
                    </div>
                    <MovieList categoryInput={category.movie} type={movieType.popular} />
                </div>

                <div className="section mb-3">
                    <div className="section__header mb-2">
                        <h2>Top Rated Movies</h2>
                        <Link to="/movies">
                            <OutlineButton className="small">View more</OutlineButton>
                        </Link>
                    </div>
                    <MovieList categoryInput={category.movie} type={movieType.top_rated} />
                </div>

                <div className="section mb-3">
                    <div className="section__header mb-2">
                        <h2>Trending TV</h2>
                        <Link to="/tvShows">
                            <OutlineButton className="small">View more</OutlineButton>
                        </Link>
                    </div>
                    <MovieList categoryInput={category.tv} type={tvType.popular} />
                </div>

                <div className="section mb-3">
                    <div className="section__header mb-2">
                        <h2>Top Rated TV</h2>
                        <Link to="/tvShows">
                            <OutlineButton className="small">View more</OutlineButton>
                        </Link>
                    </div>
                    <MovieList categoryInput={category.tv} type={tvType.top_rated} />
                </div>
            </div>
        </div>
    );
}