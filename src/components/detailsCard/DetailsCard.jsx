import './DetailsCard.scss';
import apiConfig from '../../api/apiConfig'
import { useState ,useEffect} from 'react';
import CastList from '../CastList/CastList';
import VideoList from '../VideoList/VideoList';
import { Link } from 'react-router-dom';
import { IoArrowBackCircleSharp } from "react-icons/io5";

function DetailsCard({ data, type }) {
  // const IMAGE_PATH = "https://image.tmdb.org/t/p/w500";
  const [item, setItem] = useState(null);
   useEffect(() => {
    setItem(data);
    console.log("data in details movie", item);
  }, [data,type]);
  return (
    <>
  {item && (
    <>
      <div
        className="banner"
        style={{
          backgroundImage: `url(${apiConfig.originalImage(item.backdrop_path || item.poster_path)})`,
        }}
      ></div>
      <div>
        <Link to=".." className="back-to-home"><span className='icon'><IoArrowBackCircleSharp /></span>Back to Home</Link>
      </div>

      <div className="mb-3 movie-content container">
        <div className="movie-content__poster">
          <div
            className="movie-content__poster__img"
            style={{
              backgroundImage: `url(${apiConfig.originalImage(item.poster_path || item.backdrop_path)})`,
            }}
          ></div>
        </div>

        <div className="movie-content__info">
          <h1 className="title">
            {type === "movie" ? item.title : item.name}
          </h1>

          <div className="genres">
            {item.genres &&
              item.genres.slice(0, 5).map((genre, i) => (
                <span key={i} className="genres__item">
                  {genre.name}
                </span>
              ))}
          </div>

          <p className="overview">{item.overview}</p>
          <div className="cast">
              <div className="section__header">
                  <h2>Casts</h2>
                  </div>
                  <CastList id={item.id} type={type}/>
              </div>
        </div>
      </div>
      <div className="container">
            <div className="section mb-3">
                <VideoList id={item.id} type={type}/>
            </div>
      </div>
    </>
  )}
</>
  );
}

export default DetailsCard;


{/* <div className="details-container">
      <div className="details-card">
        <div className="details-grid">
          <div className="poster">
            <img
              src={IMAGE_PATH + data.poster_path}
              alt={type === "movie" ? data.title : data.name}
            />
          </div>
          <div className="details-content">
            <h2>{type === "movie" ? data.title : data.name}</h2>
            <p className="tagline">{data.tagline}</p>
            <p className="release-date">
              {type === "movie" ? data.release_date : data.first_air_date}
            </p>
            <p className="rating">⭐ {data.vote_average} ({data.vote_count} votes)</p>
            <p className="overview">{data.overview}</p>

            <div className="info-row">
              <p><strong>Duration:</strong> {type === "movie" ? data.runtime : data.episode_run_time[0]} min</p>
              <p><strong>Language:</strong> {data.original_language.toUpperCase()}</p>
            </div>

            <div className="genres">
              {data.genres.map((g, i) => (
                <span key={i} className="genre">{g.name}</span>
              ))}
            </div>

            {data.homepage && (
              <a href={data.homepage} target="_blank" rel="noreferrer" className="official-link">
                Visit Official Website
              </a>
            )}
          </div>
        </div>
      </div>
    </div> */}