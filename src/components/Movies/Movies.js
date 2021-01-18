import React, {useState, useEffect} from 'react';
import axios from 'axios';
import './Movies.css';

import MovieCard from '../MovieCard/MovieCard';
import MovieModal from '../MovieModal/MovieModal';

function Movies() {
  const [movies, setMovies] = useState([]);
  const [sinopse, setSinopse] = useState(null);
  const [filters, setFilters] = useState([]);
  const [activeFilters, setActiveFilters] = useState([]);


  axios.defaults.baseURL = 'https://mflix-example.herokuapp.com';

  useEffect(() => {
    axios.get('/movies').then(res => {
      setMovies(res.data);
    });
  },[]);

  useEffect(() => {
    if(movies.length){
      const currentFilters = [];
      movies.forEach(m => {
        m.genres.forEach(g => {
          if(!currentFilters.includes(g)){
            currentFilters.push(g);
          }
        })
      });
      setFilters(currentFilters);
    }
  }, [movies]);

  function openSinopse(movie){
    setSinopse(movie);
  }

  function closeSinopse(){
    setSinopse(null);
  } 

  function toogleFilter(filter){
    let updatedFilters = [...activeFilters];
    if(updatedFilters.includes(filter)){
      updatedFilters = updatedFilters.filter(f => f !== filter);
    } else {
      updatedFilters.push(filter);
    }
    setActiveFilters(updatedFilters);
  }

  function filteredMovies(){
    if(activeFilters.length){
      return movies.filter(m => {
        m.genres.forEach(g => {
          if(activeFilters.includes(g)){
            return true;
          }
        });
        return false;
      });
    } return movies;
  }

  return (
    <>
      <ul className="filters">
        {filters.map(filter => (
          <li key={filter}>
            <button className={activeFilters.includes(filter) ? 'active' : ''} type="button" onClick={() => toogleFilter(filter)}>{filter}</button>
          </li>
        ))}
      </ul>
      <div className="movies">
        {filteredMovies().map(movie => (
          <MovieCard movieInfo={movie} sinopse={movie => openSinopse(movie)}/>
        ))}
      </div>
      {sinopse && <MovieModal movie={sinopse} close={closeSinopse}/>}
    </>
  );
}

export default Movies;