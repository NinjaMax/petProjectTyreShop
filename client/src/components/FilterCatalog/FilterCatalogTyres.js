import React from 'react';
import FilterMainBtnTyreWidth from '../MainFilterButton/FilterMainTyres/FilterMainBtnTyreWidth';
import FilterMainBtnTyreHeight from '../MainFilterButton/FilterMainTyres/FilterMainBtnTyreHeight';
import FilterMainBtnTyreDiametr from '../MainFilterButton/FilterMainTyres/FilterMainBtnTyreDiametr';
import SelectSeasonTyre from '../Select/SelectSeasonTyre';
import SelectTypeTyre from '../Select/SelectTypeTyre';
import '../../css/FilterCatatogCss/FilterCatalogTyres.css';

const FilterCatalogTyres = () => {
    return (
        <div className='filterCatalogTyres'>
            <div className='filterCatalogTyresItem'>
                Фильтр Підбір по авто
            </div>
            <FilterMainBtnTyreWidth/>
            <FilterMainBtnTyreHeight/>
            <FilterMainBtnTyreDiametr/>
            <div>
                <SelectSeasonTyre/>
            </div>
            <SelectTypeTyre/>
        </div>
    );
};

export default FilterCatalogTyres;