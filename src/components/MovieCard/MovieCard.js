import React from 'react';
import './MovieCard.css';

function MovieCard({movieInfo,sinopse }) {

  return (
    <div className="movieCard">
      <div className="imageContainer">
        {movieInfo.poster ? <img src={movieInfo.poster} alt="poster"/> : <div className="placeholder"/>}
      </div>
      <div className="info">
        <h2>{movieInfo.title}</h2>
        <span className="genres">Gênero: {movieInfo.genres.toString()}</span>
        <span className="director">Diretor: {movieInfo.directors.toString()}</span>
        <span className="rate">Nota: {movieInfo.imdb.rating}</span>
        <span className="votes">Votos: {movieInfo.imdb.votes}</span>
        <button type="button" onClick={() => sinopse(movieInfo)}>Sinopse</button>
      </div>
    </div>
  );
}

export default MovieCard;