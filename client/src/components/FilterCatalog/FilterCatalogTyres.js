import {React, useState} from 'react';
import '../../css/FilterCatatogCss/FilterCatalogTyres.css';
import imageThorn from '../../assets/icons/imagesThorn_1.png';
import FilterMainBtnTyreWidth from '../MainFilterButton/FilterMainTyres/FilterMainBtnTyreWidth';
import FilterMainBtnTyreSeason from '../MainFilterButton/FilterMainTyres/FilterMainBtnTyreSeason';
import SelectFilter from '../Select/SelectFilter';
import CheckboxBtn from '../Select/CheckboxBtn';
import Accordion from './Accordion';
import SelectFilterList from '../Select/SelectFilterList';

const FilterCatalogTyres = () => {
    const [handleItem, setHandleItem] = useState();

    const handleChange = (e) => {
        
        setHandleItem(e.currentTarget.value);
    }    

    return (
        <div className='filterCatalogTyres'>
            <div className='filterCatalogTyresHeader'>
                Фильтр Підбір по авто
            </div>
            <div className='filterTyresOption'>
                <FilterMainBtnTyreWidth width={247.4} titleFilter={'Ширина'}/>
                <FilterMainBtnTyreSeason width={247.4} titleFilter={'Профіль'}>
                    <a href="#about">About</a>
                    <a href="/#base">Base</a>
                    <a href="/#blog">Blog</a>
                    <a href="/#contact">Contact</a>
                    <a href="/#custom">Custom</a>
                    <a href="/#support">Support</a>
                    <a href="/#tools">Tools</a>
                    <a href="/#tools">Tools</a> 
                    <a href="/#tools">Tools</a> 
                    <a href="/#tools">Tools</a> 
                    <a href="/#tools">Tools</a> 
                    <a href="/#tools">Tools</a> 
                    <a href="/#tools">Tools</a> 
                    <a href="/#tools">Tools</a> 
                    <a href="/#tools">Tools</a> 
                    <a href="/#tools">Tools</a> 
                    <a href="/#tools">Tools</a>   
                </FilterMainBtnTyreSeason>
                <FilterMainBtnTyreWidth width={247.4} titleFilter={'Діаметр'}/> 
            </div>    
            <div>
                <span>Сезон:</span>
                <SelectFilter value={'Zimnie'} children={'Зимові'}/>
                <SelectFilter value={'Litni'} children={'Літні'}/>
                <SelectFilter value={'Vsesezonni'} children={'Всесезонні'}/>
            </div>
            <div>
                <CheckboxBtn value={"ship"} titleCheckbox={"Шип"} imageSrc={imageThorn}/>
            </div>
            <div>
                <FilterMainBtnTyreSeason width={247.4} titleFilter={'Бренд'}>
                    <CheckboxBtn value={"Continental"} titleCheckbox={"Continental"}/>
                    <CheckboxBtn value={"Michelin"} titleCheckbox={"Michelin"}/>
                    <CheckboxBtn value={"Yokohama"} titleCheckbox={"Yokohama"}/>
                    <CheckboxBtn value={"Bridgestone"} titleCheckbox={"Bridgestone"}/>
                    <CheckboxBtn value={"Hankook"} titleCheckbox={"Hankook"}/>
                    <CheckboxBtn value={"Nokian"} titleCheckbox={"Nokian"}/>
                    <CheckboxBtn value={"Goody-Yaer"} titleCheckbox={"Goody-Yaer"}/>
                    <CheckboxBtn value={"BfGoodrich"} titleCheckbox={"BfGoodrich"}/>
                    <CheckboxBtn value={"Dunlop"} titleCheckbox={"Dunlop"}/>
                </FilterMainBtnTyreSeason>    
            </div>  
            <div>
                <FilterMainBtnTyreSeason width={247.4} titleFilter={'Виробник'}>
                    <SelectFilterList value={"Continental"} items={"Continental"} checked={handleItem} onChange={handleChange}/>
                    <SelectFilterList value={"Michelin"} items={"Michelin"} checked={handleItem} onChange={handleChange}/>
                    <SelectFilterList value={"Bridgestone"} items={"Bridgestone"} checked={handleItem} onChange={handleChange}/>
                    <SelectFilterList value={"Yokohama"} items={"Yokohama"} checked={handleItem} onChange={handleChange}/>
                    <SelectFilterList value={"Good Year"}items={"Good Year"} checked={handleItem} onChange={handleChange}/>
                    <SelectFilterList value={"Nokian"} items={"Nokian"} checked={handleItem} onChange={handleChange}/>
                    <SelectFilterList value={"Hankook"} items={"Hankook"} checked={handleItem} onChange={handleChange}/>
                    <SelectFilterList value={"Fulda"} items={"Fulda"} checked={handleItem} onChange={handleChange}/>
                </FilterMainBtnTyreSeason>                
            </div>
            <Accordion/>
            
        </div>
    );
};

export default FilterCatalogTyres;