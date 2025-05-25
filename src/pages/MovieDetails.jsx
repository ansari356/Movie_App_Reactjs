import React, { useEffect, useState } from 'react'
import { useParams,Link } from 'react-router-dom'
import tmdbApi, { category, movieType, tvType } from '../api/tmdbApi';
import DetailsCard from '../components/detailsCard/DetailsCard';
import MovieList from '../components/movieList/MovieList';
import { OutlineButton } from '../components/button/Button';
import axios from 'axios';
import ReviewCard from '../components/reviewCard/ReviewCard';

export default function MovieDetails() {
  const {id}=useParams()
  const [movie,setMovie]=useState()
  const [recommend,setRecommend]=useState()
  const [reviews,setReviews]=useState()
  const params={}
  const apiKey='49846a5fea90eddee7c5c9e80d5c8cb7'
  
  useEffect(() =>{
    (async () =>{
      const movie_res=await tmdbApi.detail(category.movie,id,{params})
      const recommend_res=await tmdbApi.similar(category.movie,id)
      const review_res=await axios.get(`https://api.themoviedb.org/3/movie/${id}/reviews?api_key=${apiKey}`)
      setMovie(movie_res)
      setRecommend(recommend_res.results)
      setReviews(review_res.data.results)
      console.log("movie_res",movie_res)
      console.log("recommend_res",recommend_res.results)
      console.log("review_res",review_res.data.results)
    })()
  },[id])

  return (
    <>
      {movie && <DetailsCard data={movie} type="movie"/>}
      <div className='container'>
        <div className='section'>
            <hr style={{opacity:0.2}}/>
            <h1 style={{marginTop:'1rem'}}><u style={{marginTop:'1rem'}}>Reccomendatios</u></h1>
            <div className="section mb-3">
                    <div className="section__header mb-2">
                        <h2></h2>
                        <Link to="/movies">
                            <OutlineButton className="small">View more</OutlineButton>
                        </Link>
                    </div>
                    <MovieList category={category.movie} type="similar" id={id}/>
            </div>
        </div>
        <div className='section'>
          <h1 style={{margin:'1rem 0'}}><u>Reviews</u></h1>
          
             {reviews && reviews.map((review) => (
              <div key={review.id}>
                <ReviewCard data={review} />
              </div>
             ))}
          
            
        </div>
        

      </div>
      
    
    
    </>
    
  )
}

