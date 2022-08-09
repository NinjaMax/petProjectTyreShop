import {React, useState} from 'react';
import '../../../css/FilterMain/FilterMainTyres/FilterMainBtnTyreSeason.css';
//import ChipOptions from '../ChipOptions';

const FilterMainBtnTyreSeason = ({children, titleFilter, width}) => {
  const [stateClick, setStateClick]=useState(false);

  const filterClick = (e) => {

    setStateClick(!stateClick);
    //console.log(e.target);
    //<ChipOptions props={'Continental Group'}/>
  }

    return (
        <div>
            <div className="dropdownFilterMainThree">
                <button onClick={filterClick} 
                className="dropbtnFilterMainThree" style={{"--widthBtn":width}}> 
                  {titleFilter} <i className='fa fa-caret-down'/>
                </button>
                {stateClick?  
                  <div id="myDropdown3" className="dropdownContentFilterMainThree"
                    style={{"--widthBtn":width}}
                    onClick={e=>e.stopPropagation()}>
                    <input type="text" placeholder=" Пошук.." id="myInput" />
                    <div className='dropdownContentOptions'style={{"--widthBtn":width}}>
                    {children}
                    </div>
                    <div className='dropdownContentInfo' style={{"--widthBtn":width}}>
                    Як дізнатися розмір шини?
                    </div>
                  </div>
                : null}
            </div>       
        </div>
    );
};

export default FilterMainBtnTyreSeason;