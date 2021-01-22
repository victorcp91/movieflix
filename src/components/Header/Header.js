import React from 'react';
import './Header.css';

import searchIcon from '../../assets/icons/search.svg';

function Header() {

  return(
    <header className="header">
      <h1 className="title">MOVIEFLIX</h1>
      <div className="searchInputContainer">
        <input type="search"/>
        <img src={searchIcon} alt="search"/>
      </div>
      <div/>
    </header>
  );
}

export default Header;