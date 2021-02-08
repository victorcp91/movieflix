import React, {useState, useEffect} from 'react';
import {useSelector}  from 'react-redux';
import {useParams} from 'react-router-dom';
import axios from 'axios';
import './Movie.css';

function Movie() {

  const { id } = useParams();

  const movies = useSelector(state => state.movies);
  console.log(movies);

  const [movie, setMovie] = useState();
  const [notFound, setNotFound] = useState(false);

  axios.defaults.baseURL = 'https://mflix-example.herokuapp.com';

  useEffect(() => {
    axios.get(`/movies/${id}`).then(res => {
      setMovie(res.data);
    }).catch(err => {
      setNotFound(true);
      console.error(err);
    });
  },[]);

  if(notFound){
    return(
      <div className="movie">
        <div className="error">Filme não encontrado</div>
      </div>
    )
  }

  return (
    <div className="movie">
      {movie ? (
        <>
          <div className="imageContainer">
            {movie.poster ? <img src={movie.poster} alt="poster"/> : <div className="placeholder"/>}
          </div>
          <div className="info">
            <h2>{movie.title}</h2>
            <span className="genres">Gênero: {movie.genres.toString()}</span>
            <span className="director">Diretor: {movie.directors.toString()}</span>
            {movie.imdb && (
              <>
                <span className="rate">Nota: {movie.imdb.rating}</span>
                <span className="votes">Votos: {movie.imdb.votes}</span>
              </>
            )}
            
            <div>
              {movie.fullplot}
            </div>
          </div>
        </>
      ): <div>CARREGANDO...</div>}
    </div>
  );
}

export default Movie;