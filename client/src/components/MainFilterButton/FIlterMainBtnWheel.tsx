import React, { useContext } from 'react';
import '../../css/FilterMain/FilterMainBtn.css';
import ContentFilterInfo from './ContentFilterInfo';
import ChipOptions from './ChipOptions';
import { IFilterMainBtn } from './interfaces/FilterMainBtn.interface';
import { observer } from 'mobx-react-lite';
import { Context } from '../../context/Context';

const FilterMainBtnWheel = observer(({
  children, 
  titleFilter,
  width,
  contentInfo,
  filterState,
  filterAction,
  deleteChip,
  chipItem,
}: IFilterMainBtn
) => {
  const {filter, goodsWheel} = useContext<any | null>(Context);
  const filterClick = () => {
    filterAction!(false)
  }
  const inputSearch = (e: any) => {
    console.log(e.target.value.length);
    console.log(e.target.name);
    if (e.target.name === 'Ширина') {
      if (e.target.value.length !==0) {
        const newGoodsTyreWidth = goodsWheel._width.filter(
          (itemSearch: any) => (
          itemSearch.toLowerCase().includes(e.target.value)));
        goodsWheel.setWidth(newGoodsTyreWidth);
      } else {
        goodsWheel.setWidth(filter.widthSearch);
      }
    }
    // if (e.target.name === 'Профіль') {
    //   if (e.target.value.length !==0) {
    //     const newGoodsTyreHeight = goodsWheel._height.filter(
    //       (itemSearch: any) => (
    //       itemSearch.toLowerCase().includes(e.target.value)));
    //     goodsWheel.setHeight(newGoodsTyreHeight);
    //   } else {
    //     goodsWheel.setHeight(filter.heightSearch);
    //   }
    // }
    if (e.target.name === 'Діаметр') {
      if (e.target.value.length !==0) {
        const newGoodsTyreDiameter = goodsWheel._diameter.filter(
          (itemSearch: any) => (
          itemSearch.toLowerCase().includes(e.target.value)));
        goodsWheel.setDiameter(newGoodsTyreDiameter);
      } else {
        goodsWheel.setDiameter(filter.diameterSearch);
      }
    }
    if (e.target.name === 'Бренд') {
      if (e.target.value.length !==0) {
        const newGoodsTyreBrand = goodsWheel._brands.filter(
          (itemSearch: any) => (
          itemSearch.toLowerCase().includes(e.target.value)));
        goodsWheel.setBrands(newGoodsTyreBrand);
      } else {
        goodsWheel.setBrands(filter.brandSearch);
      }
    }
  }

  return (
    <div className='dropdownFilterMainBtnBack'>
        <div className="dropdownFilterMainBtn">
            <button onClick={filterAction} 
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
            {filterState ?  
              <div id="myDropdown3" 
                className={
                  contentInfo ?
                  "dropdownContentFilterMainBtn" :
                  "dropdownContentFilterMainBtnRound"
                } 
                onClick={e=>e.stopPropagation()}>
                <input 
                  id="myInput"
                  name={titleFilter}
                  onChange={inputSearch}
                  type="text" placeholder=" Пошук.."  />
                <div className='contentOptionsFilterMainBtn'>
                  {children}
                </div>
               {contentInfo ? 
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
});

export default FilterMainBtnWheel;