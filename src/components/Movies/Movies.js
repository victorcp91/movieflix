import React, {useState, useEffect, useMemo} from 'react';
import axios from 'axios';
import './Movies.css';

import MovieCard from '../MovieCard/MovieCard';
import MovieModal from '../MovieModal/MovieModal';
import NewMovieModal from '../NewMovieModal/NewMovieModal';

function Movies() {
  const [movies, setMovies] = useState([]);
  const [sinopse, setSinopse] = useState(null);
  const [newMovie, setNewMoview] = useState(false);
  const [filters, setFilters] = useState([]);
  const [activeFilters, setActiveFilters] = useState([]);
  const [filtersMenu, setFiltersMenu] = useState(false);


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

  function openNewMovie(){
    setNewMoview(true);
  }  

  function closeNewMovie(){
    setNewMoview(false);
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

  const filteredMovies = useMemo(() => {
    if(activeFilters.length){
      return movies.filter(m => m.genres.some(g => activeFilters.includes(g)));
    } return movies;
  },[activeFilters, movies]);

  // function filteredMovies() {
  //   console.log('teste');
  //   if(activeFilters.length){
  //     return movies.filter(m => m.genres.some(g => activeFilters.includes(g)));
  //   } return movies;
  // };
  

  return (
    <>
      <button className="gender" type="button" onClick={() => setFiltersMenu(true)}>Gêneros</button>
      {<ul className={`filters ${filtersMenu ? 'active' : ''}`}>
        <button type="button" className="close" onClick={() => setFiltersMenu(false)}>x</button>
        {filters.map(filter => (
          <li key={filter}>
            <button className={activeFilters.includes(filter) ? 'active' : ''} type="button" onClick={() => toogleFilter(filter)}>{filter}</button>
          </li>
        ))}
      </ul>}
      <button type="button" onClick={openNewMovie}>Adicionar filme</button>
      <div className="movies">
        {filteredMovies.map(movie => (
          <MovieCard movieInfo={movie} sinopse={movie => openSinopse(movie)}/>
        ))}
      </div>
      {newMovie && <NewMovieModal close={closeNewMovie}/>}
      {sinopse && <MovieModal movie={sinopse} close={closeSinopse}/>}
    </>
  );
}

export default Movies;