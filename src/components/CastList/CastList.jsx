import React, { useState, useEffect } from 'react';
import apiConfig from '../../api/apiConfig'
import tmdbApi from '../../api/tmdbApi';
import './CastList.scss'

function CastList({id,type}){
    const [casts, setCasts] = useState([]);
    useEffect(() => {
        const getCredits = async () => {
            const res = await tmdbApi.credits(type, id);
            setCasts(res.cast.slice(0, 5));
        }
        getCredits();
    }, [id,type]);
    return(
         <div className="casts">
            {
                casts.map((item, i) => (
                    <div key={i} className="casts__item">
                        <div className="casts__item__img" style={{backgroundImage: `url(${apiConfig.w500Image(item.profile_path)})`}}></div>
                        <p className="casts__item__name">{type === "movie" ? item.title : item.name}</p>
                    </div>
                ))
            }
        </div>


    )
}

export default CastList 