import movieDB from './filmes.json';
import movieDB_tech from './filmes_tech.json';
import movieDB_top from './filmes_top_rated.json';
import movieDB_recomm from './filmes_recomm.json';
import movieDB_soc from './filmes_soc.json';

const API_KEY ='bdaac814e1cc0e28630df3770efd6f84';
const API_BASE = 'https://api.themoviedb.org/3';
 

const basicFetch = async (endpoint) => {
    const req = await fetch(`${API_BASE}${endpoint}`);
    const json = await req.json();
    return json;
}

 

export default {
    // await basicFetch(`/discover/tv?with_network=213&language=pt-PT&api_key=${API_KEY}`)
    // await basicFetch(`/trending/all/week?language=pt-PT&api_key=${API_KEY}`)
    // basicFetch(`/movie/top_rated?language=pt-PT&api_key=${API_KEY}`)
    // basicFetch(`/discover/movie?with_genres=28&language=pt-PT&api_key=${API_KEY}`)
    // basicFetch(`/discover/movie?with_genres=35&language=pt-PT&api_key=${API_KEY}`)
    // basicFetch(`/discover/movie?with_genres=27&language=pt-PT&api_key=${API_KEY}`)
    // basicFetch(`/discover/movie?with_genres=10749&language=pt-PT&api_key=${API_KEY}`)
    // basicFetch(`/discover/movie?with_genres=99&language=pt-PT&api_key=${API_KEY}`)
    getHomeList: async () => {
        return [
            {   
                slug: 'originals',
                title: 'Originais do Netflix',
                items: movieDB
            },
            {
                slug: 'trending',
                title: 'Recomendados para você',
                items: movieDB_recomm
            },
            {   
                slug: 'toprated',
                title: 'Em alta',
                items: movieDB_top
            },
            {
                slug: 'action',
                title: 'Tecnologia',
                items: movieDB_tech
            },
            {
                slug: 'comedy',
                title: 'Sociedade',
                items: movieDB_soc
            },
        ];
    },    

    getMovieInfo: async (movieID, type) => {
        let info = {};

        if(movieID){
            switch(type) {
                case 'movie':
                    info = await basicFetch(`/movie/${movieID}?language=pt-PT&api_key=${API_KEY}`);
                break;
                case 'tv':
                    info = await basicFetch(`/tv/${movieID}?language=pt-PT&api_key=${API_KEY}`);
                break;
                default:
                    info = null;
                break;                    
            }
        }

        return info;
    }
}