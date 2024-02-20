import React, { useContext } from 'react';
import '../../css/FilterMain/FilterMainBtn.css';
import ContentFilterInfo from './ContentFilterInfo';
import ChipOptions from './ChipOptions';
import { IFilterMainBtn } from './interfaces/FilterMainBtn.interface';
import { observer } from 'mobx-react-lite';
import { Context } from '../../context/Context';
import { useTranslation } from 'react-i18next';

const FilterMainBtn = observer(({
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
  const {filter, goodsTyre} = useContext<any | null>(Context);
  const { t } = useTranslation();

  const filterClick = () => {
    if (filterState) {
      filterAction!(false);
    } 
  }
  const inputSearch = (e: any) => {
    if (e.target.name === 'Ширина') {
      if (e.target.value.length !==0) {
        const newGoodsTyreWidth = goodsTyre._width.filter(
          (itemSearch: any) => (
          itemSearch.toLowerCase().includes(e.target.value)));
        goodsTyre.setWidth(newGoodsTyreWidth);
      } else {
        goodsTyre.setWidth(filter.widthSearch);
      }
    }
    if (e.target.name === t('filterMainTyre.filter_height_title')) {
      if (e.target.value.length !==0) {
        const newGoodsTyreHeight = goodsTyre._height.filter(
          (itemSearch: any) => (
          itemSearch.toLowerCase().includes(e.target.value)));
        goodsTyre.setHeight(newGoodsTyreHeight);
      } else {
        goodsTyre.setHeight(filter.heightSearch);
      }
    }
    if (e.target.name === t('filterMainTyre.filter_diameter_title')) {
      if (e.target.value.length !==0) {
        const newGoodsTyreDiameter = goodsTyre._diameter.filter(
          (itemSearch: any) => (
          itemSearch.toLowerCase().includes(e.target.value)));
        goodsTyre.setDiameter(newGoodsTyreDiameter);
      } else {
        goodsTyre.setDiameter(filter.diameterSearch);
      }
    }
    if (e.target.name === 'Бренд') {
      if (e.target.value.length !==0) {
        const newGoodsTyreBrand = goodsTyre._brands.filter(
          (itemSearch: any) => (
          itemSearch.toLowerCase().includes(e.target.value)));
        goodsTyre.setBrands(newGoodsTyreBrand);
      } else {
        goodsTyre.setBrands(filter.brandSearch);
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
        <div 
          id="myDropdown3" 
          className={contentInfo ?
            "dropdownContentFilterMainBtn" :
            "dropdownContentFilterMainBtnRound"
            } 
          onClick={ e => e.stopPropagation()}
        >
          <input 
            id="myInputFilterBtn"
            name={titleFilter}
            onChange={inputSearch}
            type="text" placeholder=" Пошук.."  
          />
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
});

export default FilterMainBtn;