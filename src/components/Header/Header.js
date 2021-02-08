import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import {useDispatch} from 'react-redux';

import {setSearchQuery} from '../../store/actions/searchQuery';

import './Header.css';

import searchIcon from '../../assets/icons/search.svg';

function Header() {

  const dispatch = useDispatch();

  const [query, setQuery] = useState('');

  return(
    <header className="header">
      <Link to="/">
        <h1 className="title">MOVIEFLIX</h1>
      </Link>
      <div className="searchInputContainer">
        <input type="search" value={query} onChange={e => setQuery(e.currentTarget.value)}/>
        <button type="button" onClick={() => dispatch(setSearchQuery(query))}><img src={searchIcon} alt="search"/></button>
      </div>
      <button type="button">Adicionar filme</button>
      <div/>
    </header>
  );
}

export default Header;