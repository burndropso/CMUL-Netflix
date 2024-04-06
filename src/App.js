import React, {useEffect, useState} from "react";
import './App.css';
import tmdb from "./tmdb";
import MovieRow from "./components/MovieRow";
import FeaturedMovie from "./components/FeaturedMovie";
import Header from "./components/Header";
import LoadTime from "./LoadTime.gif"

export default () => {

  const [movieList, setMovieList] = useState([]);
  const [featuredData, setFeaturedData] = useState(null);
  const [blackHeader, setBlackHeader] = useState(false);
  const [isPosterClicked, setIsPosterClicked] = useState(false);

  useEffect(()=>{
    const loadAll = async () => {
      // busca a lista total
      let list = await tmdb.getHomeList();
      setMovieList(list);


      // busca o Featured (filme em destaque)
      let originals = list.filter(i=>i.slug === 'originals');
      let randomChosen = Math.floor(Math.random() * (originals[0].items.results.length - 1));
      let chosen = originals[0].items.results[randomChosen];
      //let chosenInfo = await tmdb.getMovieInfo(chosen.id, 'tv');

      
      //setFeaturedData(chosenInfo);
      //setFeaturedData(chosen);


      let intro_video = originals[0].items.results[0];
      setFeaturedData(intro_video);
    }

    loadAll();
  }, []);

  useEffect(()=>{
    const scrollListener = () => {
      if(window.scrollY > 10){
        setBlackHeader(true);
      } else{
        setBlackHeader(false);
      }
    }
    
    window.addEventListener('scroll', scrollListener);

    return () => {
      window.removeEventListener('scroll', scrollListener);
    }

  }, []);

  const handlePosterClick = (item) => {
    setIsPosterClicked(true);
    setFeaturedData(item);

    setTimeout(() => {
      setIsPosterClicked(false);
    }, 1000);  
  }

  return(
    <div className="page">

      <Header black={blackHeader} />


      {featuredData &&
        <FeaturedMovie item={featuredData} isPosterClicked={isPosterClicked} />
      }

      <section className="lists">
        {movieList.map((item, key)=>(
          <MovieRow key={key} title={item.title} items={item.items} onPosterClick={handlePosterClick} />
        ))}
      </section>


      <footer>
        Feito com <span role="img" aria-label="coração">❤️</span> pelo Rúben Pedroso <br/>
        <br/> Direitos de imagem pertencentes à Netflix <br/>
      </footer>


      {movieList.length <= 0 &&   
        <div className="loading" >
          <img src={LoadTime} alt="carregar"/>
        </div>   
      }


    </div>
  );

}