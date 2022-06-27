import React from 'react';
import FilterMainButton from './MainFilterButton/FilterMainButton';
import FilterMainButtonOne from './MainFilterButton/FilterMainButtonOne';
import FilterMainButtonTwo from './MainFilterButton/FilterMainButtonTwo';
import FilterMainButtonThree from './MainFilterButton/FilterMainButtonThree';
import '../css/FilterMain.css'

const FilterMain = () => {
    return (
        <div className='filterMain'>
            <FilterMainButton/>
            <FilterMainButtonOne/>
            <FilterMainButtonTwo/>
            <FilterMainButtonThree/>
        </div>
    );
};

export default FilterMain;