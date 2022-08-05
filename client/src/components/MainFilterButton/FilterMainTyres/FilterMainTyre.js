import React from 'react';
import FilterMainBtnTyreWidth from '../FilterMainTyres/FilterMainBtnTyreWidth';
import FilterMainBtnTyreHeight from '../FilterMainTyres/FilterMainBtnTyreHeight';
import FilterMainBtnTyreDiametr from '../FilterMainTyres/FilterMainBtnTyreDiametr';
import FilterMainBtnTyreSeason from '../FilterMainTyres/FilterMainBtnTyreSeason';
import FilterMainBtnTyreBrand from '../FilterMainTyres/FilterMainBtnTyreBrand';
import ButtonAction from '../../Buttons/ButtonAction';
import CheckboxThornBtn from '../CheckboxThornBtn';
import '../../../css/FilterMain/FilterMainTyres/FilterMainTyre.css';

const FilterMainTyre = () => {
    //const width = 100;
    return (
        <div className='filterMain'>
            <FilterMainBtnTyreWidth width={130}>Ширина</FilterMainBtnTyreWidth>

            <FilterMainBtnTyreHeight/>
            <FilterMainBtnTyreDiametr/>
            <FilterMainBtnTyreSeason/>
            <FilterMainBtnTyreBrand/>
            <div className='btnSelect'>
                <ButtonAction props={'ПІДІБРАТИ'}/>
            </div>
            <CheckboxThornBtn/>
        </div>
    );
};

export default FilterMainTyre;