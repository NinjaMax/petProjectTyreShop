import {React, useState} from 'react';
import '../../css/FilterMainButtonFour.css';

const FilterMainButtonFour = () => {
    const [stateClick, setStateClick]=useState(false);

    const filterClick = (e) => {
  
      setStateClick(!stateClick);
      console.log(e.target);
      
    }
  
      return (
        <div>
            <div className="dropdownFilterMainFour">
                <button onClick={filterClick} 
                className="dropbtnFilterMainFour">
                Бренд <i className='fa fa-caret-down'/>
                </button>
                {stateClick?  
                <div id="myDropdown4" className="dropdownContentFilterMainFour"
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

export default FilterMainButtonFour;