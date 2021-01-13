import React, {useState, useEffect} from 'react';
import axios from 'axios';
import './Movies.css';

function Movies() {
  const [movies, setMovies] = useState([]);

  axios.defaults.baseURL = 'https://mflix-example.herokuapp.com';

  useEffect(() => {
    axios.get('/movies').then(res => {
      setMovies(res.data);
    });
  },[]);

  return (
    <div>
      {movies.map(movie => (
        <div key={movie._id}>{movie.title}</div>
      ))}
    </div>
  );
}

export default Movies;