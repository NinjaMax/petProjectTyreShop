import {React, useState} from 'react';
import '../../css/FilterMainButtonOne.css';

const FilterMainButtonOne = () => {
  const [stateClick, setStateClick]=useState(false);

  const filterClick = (e) => {

    setStateClick(!stateClick);
    console.log(e.target);
    
  }

    return (
        <div>
            <div className="dropdownFilterMainOne">
                <button onClick={filterClick} className="dropbtnFilterMainOne">Профіль</button>
                {stateClick?  
                <div id="myDropdown1" className="dropdownContentFilterMainOne"
                  onClick={e=>e.stopPropagation()}>
                  <input type="text" placeholder="Search.." id="myInput" />
                  <a href="#about">About</a>
                  <a href="/#base">Base</a>
                  <a href="/#blog">Blog</a>
                  <a href="/#contact">Contact</a>
                  <a href="/#custom">Custom</a>
                  <a href="/#support">Support</a>
                  <a href="/#tools">Tools</a>
                </div> : null}
            </div>       
        </div>
    );
};

export default FilterMainButtonOne;