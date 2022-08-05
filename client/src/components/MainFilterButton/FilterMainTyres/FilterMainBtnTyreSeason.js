import {React, useState} from 'react';
import '../../../css/FilterMain/FilterMainTyres/FilterMainBtnTyreSeason.css';

const FilterMainBtnTyreSeason = () => {
  const [stateClick, setStateClick]=useState(false);

  const filterClick = (e) => {

    setStateClick(!stateClick);
    console.log(e.target);
    
  }

    return (
        <div>
            <div className="dropdownFilterMainThree">
                <button onClick={filterClick} 
                className="dropbtnFilterMainThree">
                  Сезон <i className='fa fa-caret-down'/>
                </button>
                {stateClick?  
                <div id="myDropdown3" className="dropdownContentFilterMainThree"
                  onClick={e=>e.stopPropagation()}>
                  <input type="text" placeholder=" Пошук.." id="myInput" />
                  <div className='dropdownContentOptions'>
                    <a href="#about">About</a>
                    <a href="/#base">Base</a>
                    <a href="/#blog">Blog</a>
                    <a href="/#contact">Contact</a>
                    <a href="/#custom">Custom</a>
                    <a href="/#support">Support</a>
                    <a href="/#tools">Tools</a>
                    <a href="/#tools">Tools</a> 
                    <a href="/#tools">Tools</a> 
                    <a href="/#tools">Tools</a>  
                  </div>
                  <div className='dropdownContentInfo'>
                    Як дізнатися розмір шини?
                  </div>
                </div>
                 : null}
            </div>       
        </div>
    );
};

export default FilterMainBtnTyreSeason;