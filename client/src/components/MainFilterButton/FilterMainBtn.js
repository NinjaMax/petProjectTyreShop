import {React, useState} from 'react';
import '../../css/FilterMain/FilterMainBtn.css';
//import ChipOptions from '../ChipOptions';

const FilterMainBtn = ({children, titleFilter, width, contentInfo}) => {
  const [stateClick, setStateClick]=useState(false);

  const filterClick = () => {

    setStateClick(!stateClick);
    //console.log(e.target);
    //<ChipOptions props={'Continental Group'}/>
  }

    return (
        <div>
            <div className="dropdownFilterMainBtn">
                <button onClick={filterClick} 
                  className="dropBtnFilterMainBtn" style={{"--widthBtn":width}}> 
                  {titleFilter} <i className='fa fa-caret-down'/>
                </button>
                {stateClick?  
                  <div id="myDropdown3" className="dropdownContentFilterMainBtn" 
                    onClick={e=>e.stopPropagation()}>
                    <input type="text" placeholder=" Пошук.." id="myInput" />
                    <div className='contentOptionsFilterMainBtn'>
                      {children}
                    </div>
                   {contentInfo?
                    <div className='dropdownContentInfo' style={{"--widthBtn":width}}>
                      Як дізнатися розмір шини?
                    </div>: null}
                  </div>
                : null}
            </div>       
        </div>
    );
};

export default FilterMainBtn;