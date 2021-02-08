import React, {useState, useEffect, useMemo} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import axios from 'axios';
import './Home.css';

import {setMovies} from '../../store/actions/movies';
import Filters from '../../components/Filters/Filters';
import MovieCard from '../../components/MovieCard/MovieCard';
import MovieModal from '../../components/MovieModal/MovieModal';
import NewMovieModal from '../../components/NewMovieModal/NewMovieModal';

function Home() {

  const dispatch = useDispatch();
  const movies = useSelector(state => state.movies);
  const activeFilters =  useSelector(state => state.activeFilters);
  const searchQuery = useSelector(state => state.searchQuery);

  const [sinopse, setSinopse] = useState(null);
  const [newMovie, setNewMoview] = useState(false);
  // const [filters, setFilters] = useState([]);

  axios.defaults.baseURL = 'https://mflix-example.herokuapp.com';

  useEffect(() => {
    if(searchQuery){
      axios.get(`/movies?search=${searchQuery}`).then(res => {
        dispatch(setMovies(res.data));
      });
    } else {
      axios.get(`/movies?genres=${activeFilters.toString()}`).then(res => {
        dispatch(setMovies(res.data));
      });
    }
  },[activeFilters, dispatch, searchQuery]);

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

  const filteredMovies = useMemo(() => {
    if(activeFilters.length){
      return movies.filter(m => m.genres.some(g => activeFilters.includes(g)));
    } return movies;
  },[activeFilters, movies]);


  function addNewMovie(movie){
    const updatedMovies = [movie, ...movies];
    dispatch(setMovies(updatedMovies));
  }
  

  return (
    <div className="home">
      <div className="movies">
        {filteredMovies.map(movie => (
          <MovieCard movieInfo={movie} sinopse={movie => openSinopse(movie)}/>
        ))}
      </div>
      <Filters />
      {/* {newMovie && <NewMovieModal close={closeNewMovie} addMovie={addNewMovie} categories={filters}/>} */}
      {sinopse && <MovieModal movie={sinopse} close={closeSinopse}/>}
    </div>
  );
}

export default Home;