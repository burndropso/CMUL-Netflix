import React, { useEffect } from "react";
import './FeaturedMovie.css';
import video from './video.mp4';

import { backdropvideo, backdrop1_1, backdrop1_2, backdrop2_1, backdrop2_2, backdrop3, backdrop4_1, backdrop4_2, backdrop5_1, backdrop5_2, backdrop5_2_1, backdrop5_2_2, backdrop5_2_3, backdrop5_2_4, backdrop5_3_1, backdrop5_3_2, backdrop5_3_3, backdrop5_3_4, backdrop5_4_1, backdrop5_4_2,backdrop6_1, backdrop6_2 } from '../assets/backdrops/back_images.js';
import { useState } from 'react';

const backdropImages = { backdropvideo, backdrop1_1, backdrop1_2, backdrop2_1, backdrop2_2, backdrop3, backdrop4_1, backdrop4_2, backdrop5_1, backdrop5_2, backdrop5_2_1, backdrop5_2_2, backdrop5_2_3, backdrop5_2_4, backdrop5_3_1, backdrop5_3_2, backdrop5_3_3, backdrop5_3_4, backdrop5_4_1, backdrop5_4_2,backdrop6_1, backdrop6_2 };

export default ({item, isPosterClicked}) => {

    const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
    const [showVideo, setShowVideo] = useState(false);

    useEffect(() => {
        zapping();
    }, [isPosterClicked]);

    const zapping = () =>{
        if (isPosterClicked){
            setIsDescriptionExpanded(false);
        }
    }

    useEffect(() => {
        if (!isPosterClicked && item.original_name !== 'Video de Apresentação') {
            setShowVideo(false);
        }
    }, [isPosterClicked, item.original_name]);
    


    const handleWatchButton = (item) => {
        setIsDescriptionExpanded(!isDescriptionExpanded);

        if (item.original_name == 'Video de Apresentação'){
            setShowVideo(true);
        }
        else{
            setShowVideo(false);
        }

        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    let firstDate = new Date(item.first_air_date);
    let genres = [];
    for(let i in item.genre_ids){
        genres.push(item.genre_ids[i]);
    }    


    let description = item.overview;
    let window_expanded_height = 110;
    
    if(description.length > 500){
        window_expanded_height = description.length * 0.05;
        description = description.substring(0, 500) + '...';
    }

    let backdrop_img = backdropImages[item.backdrop_path];


    return (
        <section className="featured" style={{
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundImage: `url(${backdrop_img})`,
            height: isDescriptionExpanded ? 'auto' : '100vh'
        }}>
            <div className="featured--vertical">
                <div className="featured--horizontal">
                    <div className="featured--name">{item.original_name}</div>
                    {showVideo && (
                                <div>
                                    <video controls className="featured--video">
                                        <source src={video} type="video/mp4" />
                                    </video>
                                </div> 
                            )}
                    <div className="featured--info">
                        <div className="featured--points">{item.vote_average} pontos</div>
                        <div className="featured--year">{firstDate.getFullYear()}</div>
                        <div className="featured--seasons">{item.number_of_seasons} temporada{item.number_of_seasons !== 1 ? 's' : '' }</div>
                    </div>
                    <div className={`featured--description ${isDescriptionExpanded ? 'expanded' : ''}`}>
                        {isDescriptionExpanded ? item.overview : description}</div>    
                    <div className="featured--buttons">
                        <button className="featured--watchbutton" onClick={()=>{handleWatchButton(item)}}>▶ Ver</button>                       
                            
                        <button className="featured--mylistbutton">+ Minha Lista</button> 
                    </div>
                    <div className="featured--genres"><strong>Géneros: </strong>{genres.join(', ')}</div>
                </div>
            </div>
        </section>
    );
}