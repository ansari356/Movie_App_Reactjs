import React, { useEffect, useState } from 'react';
import tmdbApi, { tvType } from '../api/tmdbApi';
import MovieList from '../components/movieList/MovieList';
import { category } from '../api/tmdbApi';
import Loading from '../components/loading/Loading';
import Input from './../components/input/Input';

const TvShowsPage = () => {
  const [popularTv, setPopularTv] = useState([]);
  const [topRatedTv, setTopRatedTv] = useState([]);
  const [onTheAirTv, setOnTheAirTv] = useState([]);
  const [searchShows, setSearchShows] = useState([]);

  const handleSearch = async (query) => {
    try {
      const res = await tmdbApi.search("tv", {params: {query}});
      console.log(res)
      setSearchShows(res.results);
    } catch (err) {
      console.error("Error searching TV shows: ", err);
    }
  };
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res1 = await tmdbApi.getTvList('popular', { params: {} });
        setPopularTv(res1.results);

        const res2 = await tmdbApi.getTvList('top_rated', { params: {} });
        setTopRatedTv(res2.results);

        const res3 = await tmdbApi.getTvList('on_the_air', { params: {} });
        setOnTheAirTv(res3.results);
      } catch (err) {
        console.error("Error fetching TV shows: ", err);
      }
    };

    fetchData();
  }, []);
  if (!popularTv || !topRatedTv || !onTheAirTv) return <Loading />

  return (
    
    <div className="container" style={{ marginTop: '6rem', padding: '2rem' }}>
      <div className='search'>
        <Input type="text" placeholder="Search TV Shows" onChange={(e) => handleSearch(e.target.value)}></Input>
        {searchShows.length > 0 && (
          <MovieList items={searchShows} category={category.tv} />

        )}
      </div>
      <h2>Popular TV Shows</h2>
      <MovieList items={popularTv} category={category.tv} />

      <h2>Top Rated TV Shows</h2>
      <MovieList items={topRatedTv} category={category.tv} />

      <h2>On The Air</h2>
      <MovieList items={onTheAirTv} category={category.tv} />
    </div>
  );
};

export default TvShowsPage;
