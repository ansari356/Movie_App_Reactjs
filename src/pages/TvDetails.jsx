import React, { useEffect, useState } from 'react';
import tmdbApi, { category } from '../api/tmdbApi';
import { useNavigate, useParams } from 'react-router-dom';
import apiConfig from '../api/apiConfig';
import '../scss/tvdetails.scss';
import Loading from '../components/loading/Loading';
import Button, { OutlineButton } from '../components/button/Button';

export default function TvDetails() {
    let navigate = useNavigate();

  const params = useParams();
  const [tvData, setTvData] = useState(null);
  const [isWishlisted, setIsWishlisted] = useState(false);

  

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await tmdbApi.detail(category.tv, params.id, { params: {} });
        setTvData(response);
        console.log(response)
      } catch (error) {
        console.log(error);
      }
    };

    fetchDetails();
  }, []);

      if (!tvData) return <Loading />;
  

  return (
    <>
      {tvData && (
        <div
          className="tv-details"
          style={{
            backgroundImage: `url(${apiConfig.originalImage(tvData.backdrop_path || tvData.poster_path)})`,
          }}
        >
          <div className="tv-details__overlay">
            <div className="tv-details__content container">
              <div className="tv-details__poster">
                <img
                  
                  src={apiConfig.w500Image(tvData.poster_path || tvData.backdrop_path)}
                  alt={tvData.name}
                />
              </div>
              <div className="tv-details__info">
                <h2>{tvData.name}</h2>
                <div className="tv-details__genres">
                <div className='tv-details__genres__labels'>
                <span>{tvData.type}</span>
                <span>{tvData.seasons.length} seasons</span>
                <span>{tvData.first_air_date}</span>
                </div>
                <pre
              style={{ cursor: 'pointer', color: isWishlisted ? 'gold' : 'gray', transition: 'color 0.2s' }}
              onClick={() => setIsWishlisted((prev) => !prev)}
              title={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
              id='add-to-wishlist'
              
            >
              {isWishlisted ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="gold" viewBox="0 0 24 24">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="none" stroke="gray" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                </svg>
              )}
                </pre>
                </div>
                <p>{tvData.overview}</p>
              <div className='tv-details__info__buttons'>
                <Button > <i className="bx bx-play"></i> Watch Now</Button>
                <OutlineButton >
                              Watch trailer
                            </OutlineButton>
              </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
