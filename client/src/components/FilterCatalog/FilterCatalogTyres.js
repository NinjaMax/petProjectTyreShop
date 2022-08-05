import React from 'react';
import '../../css/FilterCatatogCss/FilterCatalogTyres.css';
import FilterMainBtnTyreWidth from '../MainFilterButton/FilterMainTyres/FilterMainBtnTyreWidth';
import FilterMainBtnTyreSeason from '../MainFilterButton/FilterMainTyres/FilterMainBtnTyreSeason';
import SelectFilter from '../Select/SelectFilter';
import CheckboxThornBtn from '../MainFilterButton/CheckboxThornBtn';

const FilterCatalogTyres = () => {
    return (
        <div className='filterCatalogTyres'>
            <div className='filterCatalogTyresHeader'>
                Фильтр Підбір по авто
            </div>
            <div className='filterTyresOption'>
                <FilterMainBtnTyreWidth width={247.4} children={'Ширина'}/>
                <FilterMainBtnTyreSeason/>
                <FilterMainBtnTyreWidth width={247.4} children={'Діаметр'}/> 
            </div>    
            <div>
                <span>Сезон:</span>
                <SelectFilter value={'Zimnie'} children={'Зимові'}/>
                <SelectFilter value={'Litni'} children={'Літні'}/>
                <SelectFilter value={'Vsesezonni'} children={'Всесезонні'}/>
            </div>
            <div>
                <CheckboxThornBtn/>
            </div>
            <div>
                <FilterMainBtnTyreWidth width={247.4} children={'Бренд'}/>
            </div>  
            <div>
                <span>Тип авто:</span>
                <SelectFilter value={'Legkovi'} children={'Легкові'}/>
                <SelectFilter value={'Pozashliahovik'} children={'Позашляховик'}/>
                <SelectFilter value={'Mikroavtobus'} children={'Мікроавтобус'}/>
                <SelectFilter value={'Gruzovi'} children={'Грузові'}/>
                <SelectFilter value={'Moto'} children={'Мото'}/>
                <SelectFilter value={'c/x'} children={'с/х'}/>
                <SelectFilter value={'Spectehnika'} children={'Спецтехніка'}/>
            </div>
            
        </div>
    );
};

export default FilterCatalogTyres;