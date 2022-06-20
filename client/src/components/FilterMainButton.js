import React from 'react';
import '../css/FilterMainButton.css';

const FilterMainButton = () => {
    return (
        <div>
            <div className="dropdown">
                <button onclick="myFunction()" className="dropbtn">Dropdown</button>
                <div id="myDropdown" className="dropdown-content">
                  <input type="text" placeholder="Search.." id="myInput" onkeyup="filterFunction()"/>
                  <a href="#about">About</a>
                  <a href="/#base">Base</a>
                  <a href="/#blog">Blog</a>
                  <a href="/#contact">Contact</a>
                  <a href="/#custom">Custom</a>
                  <a href="/#support">Support</a>
                  <a href="/#tools">Tools</a>
                </div>
            </div>
        </div>
    );
};

export default FilterMainButton;