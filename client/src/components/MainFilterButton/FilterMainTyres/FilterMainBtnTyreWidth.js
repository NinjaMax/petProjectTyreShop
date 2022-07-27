import {React, useState} from 'react';
import '../../../css/FilterMain/FilterMainTyres/FilterMainBtnTyreWidth.css';

const FilterMainBtnTyreWidth = () => {
  const [stateClick, setStateClick]=useState(false);

  const filterClick = (e) => {

    setStateClick(!stateClick);
    console.log(e.target);
    
  }

    return (
        
      <div className="dropdownFilterWidth">
        <button onClick={e=>filterClick(e)} 
          className="dropbtnFilterWidth">Ширина <i className='fa fa-caret-down'/>
        </button>
          {stateClick?  
          <div id="myDropdown" className="dropdownContentFilterWidth"
            onClick={e=>e.stopPropagation()}>
            <input type="text" placeholder=" Пошук.." id="myInput" />
            <a href="#about">About</a>
            <a href="/#base">Base</a>
            <a href="/#blog">Blog</a>
            <a href="/#contact">Contact</a>
            <a href="/#custom">Custom</a>
            <a href="/#support">Support</a>
            <a href="/#tools">Tools</a>
          </div> : null}
      </div>

    );
};

export default FilterMainBtnTyreWidth;