import React from 'react';
import './MovieModal.css';

function MovieModal({movie, close}) {

  return (
    <div className="movieModal">
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
      <button type="button" onClick={close}>X</button>
    </div>
  );
}

export default MovieModal;