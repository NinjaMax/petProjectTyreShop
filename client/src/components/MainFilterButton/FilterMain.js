import React from 'react';
import FilterMainButton from './FilterMainButton';
import FilterMainButtonOne from './FilterMainButtonOne';
import FilterMainButtonTwo from './FilterMainButtonTwo';
import FilterMainButtonThree from './FilterMainButtonThree';
import '../../css/FilterMain.css';

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