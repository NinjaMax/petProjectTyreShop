import React, {useState} from 'react';
import '../../css/FilterMain/FilterMainBtn.css';
import ContentFilterInfo from './ContentFilterInfo';
import ChipOptions from './ChipOptions';
import { IFilterMainBtn } from './interfaces/FilterMainBtn.interface';

const FilterMainBtn = ({
  children, 
  titleFilter,
  width,
  contentInfo,
  filterState,
  deleteChip,
  chipItem,
}: IFilterMainBtn
) => {
  const [stateClick, setStateClick]=useState(false);
  // const [filterClose, setFilterClose]=useState(filterState);

  const filterClick = () => {
    setStateClick(!stateClick);
    // if (!filterState) {
    //   setStateClick(true);
    // } else {
    //  setStateClick(false);
    // }
    
    // console.log(e.target);
  }
 
  // console.log('FILTERSTATE: ', stateClick);
  // console.log('FILTERSTATE_CLOSE_TO_EMPTY: ', filterState);

  return (
    <div className='dropdownFilterMainBtnBack'>
        <div className="dropdownFilterMainBtn">
            <button onClick={filterClick} 
              className="dropBtnFilterMainBtn" 
              style={{"--widthBtn":width} as React.CSSProperties}
              > 
              {titleFilter} <i className='fa fa-caret-down'/>
              <ChipOptions 
                chipName={titleFilter}
                clearFilter={deleteChip}
                props={chipItem} 
                />
            </button>
            {stateClick ?  
              <div id="myDropdown3" className="dropdownContentFilterMainBtn" 
                onClick={e=>e.stopPropagation()}>
                <input type="text" placeholder=" Пошук.." id="myInput" />
                <div className='contentOptionsFilterMainBtn'>
                  {children}
                </div>
               {contentInfo?
                <ContentFilterInfo 
                  setActive={filterClick}
                  infoMarking={contentInfo} 
                  width={width}/>
                : null}
              </div>
            : null}
        </div>       
    </div>
  );
};

export default FilterMainBtn;