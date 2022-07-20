import React from 'react';
import FilterMainButton from './FilterMainButton';
import FilterMainButtonOne from './FilterMainButtonOne';
import FilterMainButtonTwo from './FilterMainButtonTwo';
import FilterMainButtonThree from './FilterMainButtonThree';
import FilterMainButtonFour from './FilterMainButtonFour';
import ButtonAction from '../Buttons/ButtonAction';
import '../../css/FilterMain.css';

const FilterMain = () => {
    return (
        <div className='filterMain'>
            <FilterMainButton/>
            <FilterMainButtonOne/>
            <FilterMainButtonTwo/>
            <FilterMainButtonThree/>
            <FilterMainButtonFour/>
            <div className='btnSelect'>
                <ButtonAction props={'ПІДІБРАТИ'}/>
            </div>
        </div>
    );
};

export default FilterMain;