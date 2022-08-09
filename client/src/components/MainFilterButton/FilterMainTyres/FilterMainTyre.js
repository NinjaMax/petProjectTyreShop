import React from 'react';
import '../../../css/FilterMain/FilterMainTyres/FilterMainTyre.css';
import imageThorn from '../../../assets/icons/imagesThorn_1.png';
import FilterMainBtnTyreWidth from '../FilterMainTyres/FilterMainBtnTyreWidth';
import FilterMainBtnTyreHeight from '../FilterMainTyres/FilterMainBtnTyreHeight';
import FilterMainBtnTyreDiametr from '../FilterMainTyres/FilterMainBtnTyreDiametr';
import FilterMainBtnTyreSeason from '../FilterMainTyres/FilterMainBtnTyreSeason';
import FilterMainBtnTyreBrand from '../FilterMainTyres/FilterMainBtnTyreBrand';
import ButtonAction from '../../Buttons/ButtonAction';
import CheckboxBtn from '../../Select/CheckboxBtn';


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
            <CheckboxBtn value={"ship"} titleCheckbox={"Шип"} imageSrc={imageThorn}/>
        </div>
    );
};

export default FilterMainTyre;