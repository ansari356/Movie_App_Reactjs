// import React, { useState, useEffect } from 'react';
// import PropTypes from 'prop-types';

// import './movielist.scss';

// import { SwiperSlide, Swiper } from 'swiper/react';


// import tmdbApi, { categoryInput } from '../../api/tmdbApi';

// import MovieCard from '../movieCard/MovieCard';

// const MovieList = props => {

//     const [items, setItems] = useState([]);

//     useEffect(() => {
//         const getList = async () => {
//             let response = null;
//             const params = {};

//             if (props.type !== 'similar') {
//                 switch(props.categoryInput) {
//                     case categoryInput.movie:
//                         response = await tmdbApi.getMoviesList(props.type, {params});
//                         break;
//                     default:
//                         response = await tmdbApi.getTvList(props.type, {params});
//                 }
//             } else {
//                 response = await tmdbApi.similar(props.categoryInput, props.id);
//             }
//             setItems(response.results);
//         }
//         getList();
//     }, []);

//     return (
//         <div className="movie-list">
//             <Swiper
//                 grabCursor={true}
//                 spaceBetween={10}
//                 slidesPerView={'auto'}
//             >
//                 {
//                     items.map((item, i) => (
//                         <SwiperSlide key={i}>
//                             <MovieCard item={item} categoryInput={props.categoryInput}/>
//                         </SwiperSlide>
//                     ))
//                 }
//             </Swiper>
//         </div>
//     );
// }

// MovieList.propTypes = {
//     categoryInput: PropTypes.string.isRequired,
//     type: PropTypes.string.isRequired
// }

// export default MovieList;
// import React from 'react';
// import PropTypes from 'prop-types';
// import './movielist.scss';

// import { SwiperSlide, Swiper } from 'swiper/react';
// import MovieCard from '../movieCard/MovieCard';
// import { useState } from 'react';
// import { useParams } from 'react-router';
// import Button, { OutlineButton } from '../button/Button';

// const MovieList = ({ items = [], categoryInput }) => {
//     const [page, setPage] = useState(1);
//     const [totalPage, setTotalPage] = useState(5);

//     const { keyword } = useParams();
//     const loadMore = async () => {
//         let response = null;
//         if (keyword === undefined) {
//             const params = {
//                 page: page + 1
//             };
//             switch(props.categoryInput) {
//                 case categoryInput.movie:
//                     response = await tmdbApi.getMoviesList(movieType.upcoming, {params});
//                     break;
//                 default:
//                     response = await tmdbApi.getTvList(tvType.popular, {params});
//             }
//         } else {
//             const params = {
//                 page: page + 1,
//                 query: keyword
//             }
//             response = await tmdbApi.search(props.categoryInput, {params});
//         }
//         setItems([...items, ...response.results]);
//         setPage(page + 1);
//     }
//     return (
//         <div className="movie-list">
//             <Swiper grabCursor={true} spaceBetween={10} slidesPerView={'auto'}>
//                 {items.map((item, i) => (
//                     <SwiperSlide key={i}>
//                         <MovieCard item={item} categoryInput={categoryInput} />
//                     </SwiperSlide>
//                 ))}
//             </Swiper>
//             {
//                 page < totalPage ? (
//                     <div className="movie-grid__loadmore">
//                         <OutlineButton className="small" onClick={loadMore}>Load more</OutlineButton>
//                     </div>
//                 ) : null
//             }
//         </div>
//     );
// };

// MovieList.propTypes = {
//     categoryInput: PropTypes.string.isRequired,
//     items: PropTypes.array.isRequired
// };

// export default MovieList;

import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import './movielist.scss';
import { SwiperSlide, Swiper } from 'swiper/react';
import MovieCard from '../movieCard/MovieCard';
import tmdbApi, {category} from '../../api/tmdbApi';
import Button from '../button/Button';

const MovieList = ({ categoryInput, type, id }) => {
    const [items, setItems] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const swiperRef = useRef(null);

    const fetchItems = async (pageNum = 1) => {
        setLoading(true);
        try {
            let response = null;
            const params = { page: pageNum };

            if (type !== 'similar') {
                switch (categoryInput) {
                    case category.movie:
                        response = await tmdbApi.getMoviesList(type, { params });
                        break;
                    default:
                        response = await tmdbApi.getTvList(type, { params });
                }
            } else {
                response = await tmdbApi.similar(categoryInput, id, { params });
            }

            setItems((prevItems) => (pageNum === 1 ? response.results : [...prevItems, ...response.results]));
            setTotalPage(response.total_pages);
            setPage(pageNum);
        } catch (err) {
            console.error('Fetch failed', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchItems(1);
    }, [categoryInput, type, id]);

    const handleLoadMore = async () => {
        if (page < totalPage && !loading) {
            await fetchItems(page + 1);
            if (swiperRef.current && swiperRef.current.swiper) {
                swiperRef.current.swiper.update();
                swiperRef.current.swiper.slideTo(items.length);
            }
        }
    };

    return (
        <div className="movie-list">
            <Swiper
                grabCursor={true}
                spaceBetween={10}
                slidesPerView={'auto'}
                onSwiper={(swiper) => (swiperRef.current = swiper)}
            >
                {items.map((item, i) => (
                    <SwiperSlide key={`${item.id}-${i}`}>
                        <MovieCard item={item} category={categoryInput} />
                    </SwiperSlide>
                ))}
                {page < totalPage && !loading && (
                    <SwiperSlide className="movie-list__loadmore-slide" style={{display: 'flex',justifyContent:'center', alignItems:'center', height:'300px'}}>
                        <Button onClick={handleLoadMore}>< i className='bx  bx-chevron-right'></i> </Button>
                    </SwiperSlide>
                )}
            </Swiper>
        </div>
    );
};

MovieList.propTypes = {
    categoryInput: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    id: PropTypes.number,
};

export default MovieList;