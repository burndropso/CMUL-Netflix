import React, {useState} from "react";
import './MovieRow.css';
import NavBeforeIcon from './NavBeforeIcon.svg';
import NavNextIcon from './NavNextIcon.svg';
import { postervideo, poster1_1, poster1_2, poster2_1, poster2_2, poster3, poster4_1, poster4_2,poster5_1,poster5_2,poster5_2_1, poster5_2_2,poster5_2_3, poster5_2_4, poster5_3_1, poster5_3_2, poster5_3_3, poster5_3_4, poster5_4_1,poster5_4_2,poster6_1,poster6_2 } from '../assets/posters/posters.js';

const posterImages = { postervideo, poster1_1, poster1_2, poster2_1, poster2_2, poster3, poster4_1, poster4_2,poster5_1,poster5_2,poster5_2_1, poster5_2_2,poster5_2_3, poster5_2_4, poster5_3_1, poster5_3_2, poster5_3_3, poster5_3_4, poster5_4_1,poster5_4_2,poster6_1,poster6_2 };

export default ({title, items, onPosterClick}) =>{

    const [scrollX, setScrollX] = useState(-400);
    //const [showFeaturedMovie, setShowFeaturedMovie] = useState(null);


    const handleLeftArrow = () => {
        let x = scrollX + Math.round(window.innerWidth / 2);
        if(x > 0){
            x = 0;
        }
        setScrollX(x);
    }


    const handleRightArrow = () => {
        let x = scrollX - Math.round(window.innerWidth / 2);
        let listW = items.results.length * 150;
        if ((window.innerWidth - listW) > x){
            x = (window.innerWidth - listW) - 60;
        }
        setScrollX(x);

    }


    const handlePosterClick = (item) => {
        onPosterClick(item);
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });        
    }

    const knowEachPoster = (item) => {
        let poster_img = posterImages[item.poster_path];
        return poster_img;
    }
    

    return (
        <div className="movieRow">
            <h2>{title}</h2>
            <div className="movieRow--left" onClick={handleLeftArrow}>
                <img src={NavBeforeIcon} alt="Icon" style={{ width: '60px', height: '60px', filter: 'invert(100%)' }} />
            </div>

            <div className="movieRow--right" onClick={handleRightArrow}>
                <img src={NavNextIcon} alt="Icon" style={{ width: '60px', height: '60px', filter: 'invert(100%)' }} />
            </div>

            <div className="movieRow--listarea" >
                <div className="movieRow--list" style={{
                    marginLeft: scrollX,
                    width: items.results?.length * 150
                }}>
                    {items.results?.length > 0 && items.results?.map((item, key)=>(
                        <div key={key} className="movieRow--item" onClick={()=>{handlePosterClick(item)}}>
                            <img src={knowEachPoster(item)} alt={item.original_title} />
                        </div>                        
                        
                    ))}
                </div>

            </div>

    

        </div>
    );
}