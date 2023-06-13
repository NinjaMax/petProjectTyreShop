import React, {useState} from 'react';
import '../../css/FilterMain/FilterMainBtn.css';
import ContentFilterInfo from './ContentFilterInfo';
//import ChipOptions from '../ChipOptions';

interface IFilterMainBtn {
  children: JSX.Element | JSX.Element[] | any;
  titleFilter: string; 
  width: number; 
  contentInfo?: string | boolean; 
}

const FilterMainBtn = (
    {children, titleFilter, width, contentInfo}: IFilterMainBtn
  ) => {
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
              className="dropBtnFilterMainBtn" 
              style={{"--widthBtn":width} as React.CSSProperties}
              > 
              {titleFilter} <i className='fa fa-caret-down'/>
            </button>
            {stateClick ?  
              <div id="myDropdown3" className="dropdownContentFilterMainBtn" 
                onClick={e=>e.stopPropagation()}>
                <input type="text" placeholder=" Пошук.." id="myInput" />
                <div className='contentOptionsFilterMainBtn'>
                  {children}
                </div>
               {contentInfo?
                <ContentFilterInfo infoMarking={contentInfo} width={width}/>
                : null}
              </div>
            : null}
        </div>       
    </div>
  );
};

export default FilterMainBtn;