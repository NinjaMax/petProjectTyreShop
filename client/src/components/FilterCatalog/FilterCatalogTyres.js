import {React, useState} from 'react';
import '../../css/FilterCatatogCss/FilterCatalogTyres.css';
import imageThorn from '../../assets/icons/imagesThorn_1.png';
import imageLegkovi from '../../assets/icons/iconsTypeCar/londonCabClear64.png';
import imagePozashljahovik from '../../assets/icons/iconsTypeCar/pickup.png';
import imageMikroavtobus from '../../assets/icons/iconsTypeCar/van.png';
import imageGruzovi from '../../assets/icons/iconsTypeCar/truck.png';
import imageMoto from '../../assets/icons/iconsTypeCar/scooter.png';
import imageSH from '../../assets/icons/iconsTypeCar/tractor.png';
import imageSpectehnika from '../../assets/icons/iconsTypeCar/bulldozer.png';
import imageWinter from '../../assets/icons/iconsSeasons/seasonWinter.png';
import imageSummer from '../../assets/icons/iconsSeasons/seasonSummer.png';
import imageAllSeason from '../../assets/icons/iconsSeasons/seasonAll.png';
import FilterMainBtn from '../MainFilterButton/FilterMainBtn';
import CheckboxBtn from '../Select/CheckboxBtn';
import Accordion from './Accordion';
import SelectFilterList from '../Select/SelectFilterList';
import PriceRange from '../FilterCatalog/PriceRange';

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
                <FilterMainBtn width={247.4} titleFilter={'Ширина'} contentInfo={true}>
                    <SelectFilterList value={"155"} items={"155"} checked={handleItem} onChange={handleChange}/>
                    <SelectFilterList value={"175"} items={"175"} checked={handleItem} onChange={handleChange}/>
                    <SelectFilterList value={"185"} items={"185"} checked={handleItem} onChange={handleChange}/>
                    <SelectFilterList value={"195"} items={"195"} checked={handleItem} onChange={handleChange}/>
                    <SelectFilterList value={"205"} items={"205"} checked={handleItem} onChange={handleChange}/>
                    <SelectFilterList value={"215"}items={"215"} checked={handleItem} onChange={handleChange}/>
                    <SelectFilterList value={"225"} items={"225"} checked={handleItem} onChange={handleChange}/>
                    <SelectFilterList value={"235"} items={"235"} checked={handleItem} onChange={handleChange}/>
                    <SelectFilterList value={"245"} items={"245"} checked={handleItem} onChange={handleChange}/>
                    <SelectFilterList value={"255"} items={"255"} checked={handleItem} onChange={handleChange}/>
                    <SelectFilterList value={"265"} items={"265"} checked={handleItem} onChange={handleChange}/>
                </FilterMainBtn>
                <FilterMainBtn width={247.4} titleFilter={'Профіль'} contentInfo={true}>
                    <SelectFilterList value={"40"} items={"40"} checked={handleItem} onChange={handleChange}/>
                    <SelectFilterList value={"45"} items={"45"} checked={handleItem} onChange={handleChange}/>
                    <SelectFilterList value={"50"} items={"50"} checked={handleItem} onChange={handleChange}/>
                    <SelectFilterList value={"55"} items={"55"} checked={handleItem} onChange={handleChange}/>
                    <SelectFilterList value={"60"} items={"60"} checked={handleItem} onChange={handleChange}/>
                    <SelectFilterList value={"65"}items={"65"} checked={handleItem} onChange={handleChange}/>
                    <SelectFilterList value={"70"} items={"70"} checked={handleItem} onChange={handleChange}/>
                    <SelectFilterList value={"80"} items={"80"} checked={handleItem} onChange={handleChange}/>
                </FilterMainBtn>
                <FilterMainBtn width={247.4} titleFilter={'Діаметр'} contentInfo={true}>
                    <SelectFilterList value={"R13"} items={"R13"} checked={handleItem} onChange={handleChange}/>
                    <SelectFilterList value={"R14"} items={"R14"} checked={handleItem} onChange={handleChange}/>
                    <SelectFilterList value={"R15"} items={"R15"} checked={handleItem} onChange={handleChange}/>
                    <SelectFilterList value={"R16"} items={"R16"} checked={handleItem} onChange={handleChange}/>
                    <SelectFilterList value={"R17"} items={"R17"} checked={handleItem} onChange={handleChange}/>
                    <SelectFilterList value={"R18"} items={"R18"} checked={handleItem} onChange={handleChange}/>
                    <SelectFilterList value={"R19"} items={"R19"} checked={handleItem} onChange={handleChange}/>
                    <SelectFilterList value={"R20"} items={"R20"} checked={handleItem} onChange={handleChange}/>
                </FilterMainBtn> 
                <div>
                    <span>Сезон:</span>
                    <CheckboxBtn value={'Zimnie'} titleCheckbox={'Зимові'} imageSrc={imageWinter}/>
                    <CheckboxBtn value={'Litni'} titleCheckbox={'Літні'} imageSrc={imageSummer}/>
                    <CheckboxBtn value={'Vsesezonni'} titleCheckbox={'Всесезонні'} imageSrc={imageAllSeason}/>
                    <p/>
                    <CheckboxBtn value={"ship"} titleCheckbox={"Шип"} imageSrc={imageThorn}/>
                </div>
                <FilterMainBtn width={247.4} titleFilter={'Бренд'} contentInfo={true}>
                    <CheckboxBtn value={"Continental"} titleCheckbox={"Continental"}/>
                    <CheckboxBtn value={"Michelin"} titleCheckbox={"Michelin"}/>
                    <CheckboxBtn value={"Yokohama"} titleCheckbox={"Yokohama"}/>
                    <CheckboxBtn value={"Bridgestone"} titleCheckbox={"Bridgestone"}/>
                    <CheckboxBtn value={"Hankook"} titleCheckbox={"Hankook"}/>
                    <CheckboxBtn value={"Nokian"} titleCheckbox={"Nokian"}/>
                    <CheckboxBtn value={"Goody-Yaer"} titleCheckbox={"Goody-Yaer"}/>
                    <CheckboxBtn value={"BfGoodrich"} titleCheckbox={"BfGoodrich"}/>
                    <CheckboxBtn value={"Dunlop"} titleCheckbox={"Dunlop"}/>
                </FilterMainBtn>    
                <FilterMainBtn width={247.4} titleFilter={'Виробник'} contentInfo={true}>
                    <SelectFilterList value={"Continental"} items={"Continental"} checked={handleItem} onChange={handleChange}/>
                    <SelectFilterList value={"Michelin"} items={"Michelin"} checked={handleItem} onChange={handleChange}/>
                    <SelectFilterList value={"Bridgestone"} items={"Bridgestone"} checked={handleItem} onChange={handleChange}/>
                    <SelectFilterList value={"Yokohama"} items={"Yokohama"} checked={handleItem} onChange={handleChange}/>
                    <SelectFilterList value={"Good Year"}items={"Good Year"} checked={handleItem} onChange={handleChange}/>
                    <SelectFilterList value={"Nokian"} items={"Nokian"} checked={handleItem} onChange={handleChange}/>
                    <SelectFilterList value={"Hankook"} items={"Hankook"} checked={handleItem} onChange={handleChange}/>
                    <SelectFilterList value={"Fulda"} items={"Fulda"} checked={handleItem} onChange={handleChange}/>
                </FilterMainBtn>    
                <Accordion titleName={"Тип авто"}>
                    <CheckboxBtn value={"legkovi"} titleCheckbox={"Легкові"} imageSrc={imageLegkovi}/>
                    <CheckboxBtn value={"pozashljahovik"} titleCheckbox={"Позашляхлвик"} imageSrc={imagePozashljahovik}/>
                    <CheckboxBtn value={"mikroavtobus"} titleCheckbox={"Мікроавтобус"} imageSrc={imageMikroavtobus}/>
                    <CheckboxBtn value={"gruzovi"} titleCheckbox={"Грузові"} imageSrc={imageGruzovi}/>
                    <CheckboxBtn value={"moto"} titleCheckbox={"Мото"} imageSrc={imageMoto}/>
                    <CheckboxBtn value={"s/h"} titleCheckbox={"С/х"} imageSrc={imageSH}/>
                    <CheckboxBtn value={"specteh"} titleCheckbox={"Спецтехніка"} imageSrc={imageSpectehnika}/>
                </Accordion>
                <Accordion titleName={"Індекс швидкості"}>

                </Accordion>
                <PriceRange/>
            </div>       
        </div>
    );
};

export default FilterCatalogTyres;