import {React, useState} from 'react';
import '../../css/FilterMainButton.css';

const FilterMainButton = () => {
  const [stateClick, setStateClick]=useState(false);

  const filterClick = (e) => {

    setStateClick(!stateClick);
    console.log(e.target);
    
  }

    return (
        <div>
            <div className="dropdownFilterMain">
                <button onClick={e=>filterClick(e)} className="dropbtnFilterMain">Ширина</button>
                {stateClick?  
                <div id="myDropdown" className="dropdownContentFilterMain"
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

export default FilterMainButton;