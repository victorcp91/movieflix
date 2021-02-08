import React, { useState, useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import axios from 'axios';

import {setActiveFilters} from '../../store/actions/activeFilters';

import './Filters.css';

function Filters() {

  axios.defaults.baseURL = 'https://mflix-example.herokuapp.com';

  const activeFilters = useSelector(state => state.activeFilters);

  const [filters, setFilters] = useState([]);

  const dispatch = useDispatch();


  useEffect(() => {
    axios.get('/genres').then(res => {
      setFilters(res.data);
    });
  },[]);

  function toogleFilter(filter){
    let updatedFilters = [...activeFilters];
    if(updatedFilters.includes(filter)){
      updatedFilters = updatedFilters.filter(f => f !== filter);
    } else {
      updatedFilters.push(filter);
    }
    dispatch(setActiveFilters(updatedFilters));
  }

  return(
    <ul className={`filters`}>
        {filters.map(filter => (
          <li key={filter}>
            <button className={activeFilters.includes(filter) ? 'active' : ''} type="button" onClick={() => toogleFilter(filter)}>{filter}</button>
          </li>
        ))}
      </ul>
  );
}

export default Filters;