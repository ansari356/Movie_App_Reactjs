import React, { useState, useEffect } from 'react';

import SwiperCore from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
// swipercore is a library to use swiper ( like a plugin ) in react, autoplay is a feature of swiper make it auto play
// swiper is a library to use swiper in react
//swiperSlide is a component to use swiper in react
//autoplay is a feature of swiper make it auto play

import tmdbApi, { movieType } from '../../api/tmdbApi';

import './heroslide.scss';
import HeroSlideItem from './HeroSlideItem';
import TrailerModal from './TrailorModel';
import Loading from '../loading/Loading';

const HeroSlide = () => {

    SwiperCore.use([Autoplay]);

    const [loading, setLoading] = useState(true);
    
    const [movieItems, setMovieItems] = useState([]);

    useEffect(() => {
        const getMovies = async () => {
            const params = {page: 1}

            try {
                const response = await tmdbApi.getMoviesList(movieType.popular, {params});
                setMovieItems(response.results.slice(1, 6));
                
                setLoading(false);
                
            } catch {
                setLoading(false);
                console.log('error');
            }
        }
        getMovies();
    }, []);

    if (loading) return <Loading />;
    
    return (
        <div className="hero-slide">
            <Swiper
                modules={[Autoplay]}
                grabCursor={true}
                spaceBetween={0}
                slidesPerView={1}
                // autoplay={{delay: 3000}}
            >
                {
                    movieItems.map((item, i) => (
                        <SwiperSlide key={i}>
                            {({ isActive }) => (
                                <HeroSlideItem item={item} className={`${isActive ? 'active' : ''}`} />
                            )}
                        </SwiperSlide>
                    ))
                }
            </Swiper>

            
             {
                movieItems.map((item, i) => <TrailerModal key={i} item={item}/>)
            }
        </div>
    );
}


export default HeroSlide;


