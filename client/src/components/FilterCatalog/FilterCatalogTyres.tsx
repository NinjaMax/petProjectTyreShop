import React, {useContext, useState} from 'react';
import '../../css/FilterCatatogCss/FilterCatalogTyres.css';
import FilterMainBtn from '../mainFilterButton/FilterMainBtn';
import CheckboxBtn from '../select/CheckboxBtn';
import Accordion from './Accordion';
import SelectFilterList from '../select/SelectFilterList';
import PriceRange from './PriceRange';
import { Context } from '../../context/Context';
import { observer } from 'mobx-react-lite';
import { seasonCar, typeCar } from '../../services/tyresPropsService';

interface IFilterCatTyres {
    handleChange?(args0: any): void;
    setFilterAction(args0: any): void;
    filterState: boolean;
}

const FilterCatalogTyres = observer((
    {filterState, setFilterAction}: IFilterCatTyres) => {
    const {filter, goodsTyre, page} = useContext<any | null>(Context);
    const [stateWidth, setStateWidth]=useState(false);
    const [stateHeight, setStateHeight]=useState(false);
    const [stateDiameter, setStateDiameter]=useState(false);
    const [stateBrand, setStateBrand]=useState(false);
    const [stateSeason, setStateSeason]=useState(false);
    const [stateVehicleType, setStateVehicleType]=useState(false);
    const [stateStudded, setStateStudded]=useState(false);
    const [stateSpeedIndex, setStateSpeedIndex]=useState(false);
    const [stateLoadIndex, setStateLoadIndex]=useState(false);
    const [stateHomologation, setStateHomologation]=useState(false);
    const [stateRunFlat, setStateRunFlat]=useState(false);
    const [stateReinforced, setStateReinforced]=useState(false);

    const handleChange  = (e: any) => {
        if (e.target.name === 'Ширина') {
            page.setLoadMore(0);
            page.setOffset(0);
            filter.setWidth(e.target.value);
            setStateWidth(false);
        }
        if (e.target.name === 'Профіль') {
            page.setLoadMore(0);
            page.setOffset(0);
            filter.setHeight(e.target.value);
            setStateHeight(false);
        }
        if (e.target.name === 'Діаметр') {
            page.setLoadMore(0);
            page.setOffset(0);
            filter.setDiameter(e.target.value);
            setStateDiameter(false);
        }
        if (e.target.name === 'Бренд' && e.target.checked) {
            page.setLoadMore(0);
            page.setOffset(0);
            filter.setChipBrands(
                Array.from(
                    new Set([...filter.chipBrands, e.target.value]))
            );     
        } else if (e.target.name === 'Бренд') {
            const cancelBrand = filter.chipBrands.findIndex(
                (item: string) => item === e.target.value);
            filter.removeChipBrandsItem(cancelBrand);
            filter.setChipBrands(Array.from(
                new Set([...filter.chipBrands])));
        }
        if (e.target.name === 'Сезон' && e.target.checked) {
            page.setLoadMore(0);
            page.setOffset(0);
            filter.setChipSeason(
                Array.from(
                    new Set([...filter.chipSeason, e.target.value]))
            );     
        } else if (e.target.name === 'Сезон') {
            const cancelSeason = filter.chipSeason.findIndex(
                (item: string) => item === e.target.value);
            filter.removeChipSeasonItem(cancelSeason);
            filter.setChipBrands(Array.from(
                new Set([...filter.chipSeason])));
        }
        if (e.target.name === 'Тип авто' && e.target.checked) {
            page.setLoadMore(0);
            page.setOffset(0);
            filter.setChipVehicleType(
                Array.from(
                    new Set([...filter.chipVehicleType, e.target.value]))
            );     
        } else if (e.target.name === 'Тип авто') {
            const cancelVehicleType = filter.chipVehicleType.findIndex(
                (item: string) => item === e.target.value);
            filter.removeChipVehicleTypeItem(cancelVehicleType);
            filter.setChipVehicleType(Array.from(
                new Set([...filter.chipVehicleType])));
        }
        if (e.target.name === 'Шип / Не шип' && e.target.checked) {
            page.setLoadMore(0);
            page.setOffset(0);
            filter.setChipStudded(
                Array.from(
                    new Set([...filter.chipStudded, e.target.value]))
            );     
        } else if (e.target.name === 'Шип / Не шип') {
            const cancelStudded = filter.chipStudded.findIndex(
                (item: string) => item === e.target.value);
            filter.removeChipStuddedItem(cancelStudded);
            filter.setChipStudded(Array.from(
                new Set([...filter.chipStudded])));
        }
        if (e.target.name === 'Індекс швидкості' && e.target.checked) {
            page.setLoadMore(0);
            page.setOffset(0);
            filter.setChipSpeedIndex(
                Array.from(
                    new Set([...filter.chipSpeedIndex, e.target.value]))
            );     
        } else if (e.target.name === 'Індекс швидкості') {
            const cancelSpeedIndex = filter.chipSpeedIndex.findIndex(
                (item: string) => item === e.target.value);
            filter.removeChipSpeedIndexItem(cancelSpeedIndex);
            filter.setChipSpeedIndex(Array.from(
                new Set([...filter.chipSpeedIndex])));
        }
        if (e.target.name === 'Індекс навантаження' && e.target.checked) {
            page.setLoadMore(0);
            page.setOffset(0);
            filter.setChipLoadIndex(
                Array.from(
                    new Set([...filter.chipLoadIndex, e.target.value]))
            );     
        } else if (e.target.name === 'Індекс навантаження') {
            const cancelLoadIndex = filter.chipLoadIndex.findIndex(
                (item: string) => item === e.target.value);
            filter.removeChipLoadIndexItem(cancelLoadIndex);
            filter.setChipLoadIndex(Array.from(
                new Set([...filter.chipLoadIndex])));
        }
        if (e.target.name === 'Омологація' && e.target.checked) {
            page.setLoadMore(0);
            page.setOffset(0);
            filter.setChipHomologation(
                Array.from(
                    new Set([...filter.chipHomologation, e.target.value]))
            );     
        } else if (e.target.name === 'Омологація') {
            const cancelHomologation = filter.chipHomologation.findIndex(
                (item: string) => item === e.target.value);
            filter.removeChipHomologationItem(cancelHomologation);
            filter.setChipHomologation(Array.from(
                new Set([...filter.chipHomologation])));
        }
        if (e.target.name === 'Run Flat' && e.target.checked) {
            page.setLoadMore(0);
            page.setOffset(0);
            filter.setChipRunFlat(
                Array.from(
                    new Set([...filter.chipRunFlat, e.target.value]))
            );     
        } else if (e.target.name === 'Run Flat') {
            const cancelRunFlat = filter.chipRunFlat.findIndex(
                (item: string) => item === e.target.value);
            filter.removeChipRunFlatItem(cancelRunFlat);
            filter.setChipRunFlat(Array.from(
                new Set([...filter.chipRunFlat])));
        }
        if (e.target.name === 'Високонагруженість' && e.target.checked) {
            page.setLoadMore(0);
            page.setOffset(0);
            filter.setChipReinforced(
                Array.from(
                    new Set([...filter.chipReinforced, e.target.value]))
            );     
        } else if (e.target.name === 'Високонагруженість') {
            const cancelReinforced = filter.chipReinforced.findIndex(
                (item: string) => item === e.target.value);
            filter.removeChipReinforcedItem(cancelReinforced);
            filter.setChipReinforced(Array.from(
                new Set([...filter.chipReinforced])));
        }
    } 
    
    const handleDeleteChange  = (e: any) => {
        if (e.target.getAttribute('data-name') === 'Ширина') {
            page.setLoadMore(0);
            page.setOffset(0);
            filter.setWidth(null);
        }
        if (e.target.getAttribute('data-name') === 'Профіль') {
            page.setLoadMore(0);
            page.setOffset(0);
            filter.setHeight(null);
        }
        if (e.target.getAttribute('data-name') === 'Діаметр') {
            page.setLoadMore(0);
            page.setOffset(0);
            filter.setDiameter(null);
        }
        if (e.target.getAttribute('data-name') === 'Бренд') {
            page.setLoadMore(0);
            page.setOffset(0);
            filter.removeChipBrandsItem(e.target.getAttribute('data-index'));
            filter.setChipBrands(Array.from(
                new Set([...filter.chipBrands])));
            filter.setBrands(filter.chipBrands.join(','));
        }
        if (e.target.getAttribute('data-name') === 'Сезон') {
            page.setLoadMore(0);
            page.setOffset(0);
            filter.removeChipSeasonItem(e.target.getAttribute('data-index'));
            filter.setChipSeason(Array.from(
                new Set([...filter.chipSeason])));
            filter.setSeason(filter.chipSeason.join(','));
        }
        if (e.target.getAttribute('data-name') === 'Тип авто') {
            page.setLoadMore(0);
            page.setOffset(0);
            filter.removeChipVehicleTypeItem(e.target.getAttribute('data-index'));
            filter.setChipVehicleType(Array.from(
                new Set([...filter.chipVehicleType])));
            filter.setVehicleType(filter.chipVehicleType.join(','));
        }
        if (e.target.getAttribute('data-name') === 'Шип / Не шип') {
            page.setLoadMore(0);
            page.setOffset(0);
            filter.removeChipStuddedItem(e.target.getAttribute('data-index'));
            filter.setChipStudded(Array.from(
                new Set([...filter.chipStudded])));
            filter.setStudded(filter.chipStudded.join(','));
        }
        if (e.target.getAttribute('data-name') === 'Індекс швидкості') {
            page.setLoadMore(0);
            page.setOffset(0);
            filter.removeChipSpeedIndexItem(e.target.getAttribute('data-index'));
            filter.setChipSpeedIndex(Array.from(
                new Set([...filter.chipSpeedIndex])));
            filter.setSpeedIndex(filter.chipSpeedIndex.join(','));
        }
        if (e.target.getAttribute('data-name') === 'Індекс навантаження') {
            page.setLoadMore(0);
            page.setOffset(0);
            filter.removeChipLoadIndexItem(e.target.getAttribute('data-index'));
            filter.setChipLoadIndex(Array.from(
                new Set([...filter.chipLoadIndex])));
            filter.setLoadIndex(filter.chipLoadIndex.join(','));
        }
        if (e.target.getAttribute('data-name') === 'Омологація') {
            page.setLoadMore(0);
            page.setOffset(0);
            filter.removeChipHomologationItem(e.target.getAttribute('data-index'));
            filter.setChipHomologation(Array.from(
                new Set([...filter.chipHomologation])));
            filter.setHomologation(filter.chipHomologation.join(','));
        }
        if (e.target.getAttribute('data-name') === 'Run Flat') {
            page.setLoadMore(0);
            page.setOffset(0);
            filter.removeChipRunFlatItem(e.target.getAttribute('data-index'));
            filter.setChipRunFlat(Array.from(
                new Set([...filter.chipRunFlat])));
            filter.setRunFlat(filter.chipRunFlat.join(','));
        }
        if (e.target.getAttribute('data-name') === 'Високонагруженість') {
            page.setLoadMore(0);
            page.setOffset(0);
            filter.removeChipReinforcedItem(e.target.getAttribute('data-index'));
            filter.setChipReinforced(Array.from(
                new Set([...filter.chipReinforced])));
            filter.setReinforced(filter.chipReinforced.join(','));
        }
    }  
    const filterBrandAdd = () => {
        filter.setBrands(filter.chipBrands.join(','));
        setStateBrand(!stateBrand);
    }
    const filterSeasonAdd = () => {
        filter.setSeason(filter.chipSeason.join(','));
        setStateSeason(!stateSeason);
    }
    const filterVehicleTypeAdd = () => {
        filter.setVehicleType(filter.chipVehicleType.join(','));
        setStateVehicleType(!stateVehicleType);
    }
    const filterStuddedAdd = () => {
        filter.setStudded(filter.chipStudded.join(','));
        setStateStudded(!stateStudded);
    }
    const filterSpeedIndexAdd = () => {
        filter.setSpeedIndex(filter.chipSpeedIndex.join(','));
        setStateSpeedIndex(!stateSpeedIndex);
    }
    const filterLoadIndexAdd = () => {
        filter.setLoadIndex(filter.chipLoadIndex.join(','));
        setStateLoadIndex(!stateLoadIndex);
    }
    const filterHomologationAdd = () => {
        filter.setHomologation(filter.chipHomologation.join(','));
        setStateHomologation(!stateHomologation);
    }
    const filterRunFlatAdd = () => {
        filter.setRunFlat(filter.chipRunFlat.join(','));
        setStateRunFlat(!stateRunFlat);
    }
    const filterReinforcedAdd = () => {
        filter.setReinforced(filter.chipReinforced.join(','));
        setStateReinforced(!stateReinforced);
    }
    const filterPriceAdd = () => {
        filter.setPrice(filter.chipPrice.join(','));
    }

    const filterPriceRange = (e: any) => {
        if (e.target.name === 'vid') {
            filter.addFirstPrice(e.target.value);
            filter.setChipPrice(filter._chipPrice);
        } 
        if (e.target.name === 'do') {
            filter.addLastPrice(e.target.value);
            filter.setChipPrice(filter._chipPrice);
        }
    }

    const filterWidthClick = () => {
        setStateWidth(!stateWidth);
        setStateSeason(false);
        setStateBrand(false);
        setStateHeight(false);
        setStateDiameter(false);
        setStateHomologation(false);
        setStateLoadIndex(false);
        setStateSpeedIndex(false);
        setStateRunFlat(false);
        setStateReinforced(false);
        setStateVehicleType(false);
        setStateStudded(false);
    }
    const filterHeightClick = () => {
        setStateHeight(!stateHeight);
        setStateSeason(false);
        setStateBrand(false);
        setStateWidth(false);
        setStateDiameter(false);
        setStateHomologation(false);
        setStateLoadIndex(false);
        setStateSpeedIndex(false);
        setStateRunFlat(false);
        setStateReinforced(false);
        setStateVehicleType(false);
        setStateStudded(false);
    }
    const filterDiameterClick = () => {
        setStateDiameter(!stateDiameter);
        setStateSeason(false);
        setStateBrand(false);
        setStateWidth(false);
        setStateHeight(false);
        setStateHomologation(false);
        setStateLoadIndex(false);
        setStateSpeedIndex(false);
        setStateRunFlat(false);
        setStateReinforced(false);
        setStateVehicleType(false);
        setStateStudded(false);
    }
    const filterSeasonClick = () => {
        setStateSeason(!stateSeason);
        setStateBrand(false);
        setStateWidth(false);
        setStateHeight(false);
        setStateDiameter(false);
        setStateHomologation(false);
        setStateLoadIndex(false);
        setStateSpeedIndex(false);
        setStateRunFlat(false);
        setStateReinforced(false);
        setStateVehicleType(false);
        //setStateStudded(false);
    }
    const filterStuddedClick = () => {
        setStateStudded(!stateStudded);
        //setStateSeason(false);
        setStateBrand(false);
        setStateWidth(false);
        setStateHeight(false);
        setStateDiameter(false);
        setStateHomologation(false);
        setStateLoadIndex(false);
        setStateSpeedIndex(false);
        setStateRunFlat(false);
        setStateReinforced(false);
        setStateVehicleType(false);
    }
    const filterBrandClick = () => {
        setStateSeason(false);
        setStateBrand(!stateBrand);
        setStateWidth(false);
        setStateHeight(false);
        setStateDiameter(false);
        setStateHomologation(false);
        setStateLoadIndex(false);
        setStateSpeedIndex(false);
        setStateRunFlat(false);
        setStateReinforced(false);
        setStateVehicleType(false);
        setStateStudded(false);;
    }
    const filterVehicleTypeClick = () => {
         setStateVehicleType(!stateVehicleType);
        setStateSeason(false);
        setStateBrand(false);
        setStateWidth(false);
        setStateHeight(false);
        setStateDiameter(false);
        setStateHomologation(false);
        setStateLoadIndex(false);
        setStateSpeedIndex(false);
        setStateRunFlat(false);
        setStateReinforced(false);
        setStateStudded(false);
    }
    const filterSpeedIndexClick = () => {
        setStateSpeedIndex(!stateSpeedIndex);
        setStateSeason(false);
        setStateBrand(false);
        setStateWidth(false);
        setStateHeight(false);
        setStateDiameter(false);
        setStateHomologation(false);
        setStateLoadIndex(false);
        setStateRunFlat(false);
        setStateReinforced(false);
        setStateVehicleType(false);
        setStateStudded(false);
    }
    const filterLoadIndexClick = () => {
        setStateLoadIndex(!stateLoadIndex);
        setStateSeason(false);
        setStateBrand(false);
        setStateWidth(false);
        setStateHeight(false);
        setStateDiameter(false);
        setStateHomologation(false);
        setStateSpeedIndex(false);
        setStateRunFlat(false);
        setStateReinforced(false);
        setStateVehicleType(false);
        setStateStudded(false);
    }
    const filterHomologationClick = () => {
        setStateHomologation(!stateHomologation);
        setStateSeason(false);
        setStateBrand(false);
        setStateWidth(false);
        setStateHeight(false);
        setStateDiameter(false);
        setStateLoadIndex(false);
        setStateSpeedIndex(false);
        setStateRunFlat(false);
        setStateReinforced(false);
        setStateVehicleType(false);
        setStateStudded(false);
    }
    const filterRunFlatClick = () => {
        setStateRunFlat(!stateRunFlat);
        setStateSeason(false);
        setStateBrand(false);
        setStateWidth(false);
        setStateHeight(false);
        setStateDiameter(false);
        setStateHomologation(false);
        setStateLoadIndex(false);
        setStateSpeedIndex(false);
        setStateReinforced(false);
        setStateVehicleType(false);
        setStateStudded(false);
    }
    const filterReinforcedClick = () => {
        setStateReinforced(!stateReinforced);
        setStateSeason(false);
        setStateBrand(false);
        setStateWidth(false);
        setStateHeight(false);
        setStateDiameter(false);
        setStateHomologation(false);
        setStateLoadIndex(false);
        setStateSpeedIndex(false);
        setStateRunFlat(false);
        setStateVehicleType(false);
        setStateStudded(false);
    }

    return (
        <div className='filterCatalogTyres'>
            <div className='filterCatalogTyresHeader'>
                Фильтр Підбір по авто
            </div>
            <div className='filterTyresOption'>
                <FilterMainBtn 
                    filterAction={filterWidthClick}
                    filterState={stateWidth}
                    chipItem={filter._width}
                    deleteChip={handleDeleteChange}
                    width={247.4} 
                    titleFilter={'Ширина'} 
                    contentInfo={'A'}>
                    { goodsTyre._width ? 
                        goodsTyre._width.map((widthItem: any) => (
                       <SelectFilterList 
                        key={widthItem}
                        nameFilter={'Ширина'}
                        value={widthItem} 
                        items={widthItem} 
                        checked={filter._width} 
                        onChange={handleChange} 
                        width={247.4}
                        /> 
                       )) : null
                    }
                </FilterMainBtn>
                <FilterMainBtn 
                    filterAction={filterHeightClick}
                    filterState={stateHeight}
                    chipItem={filter._height}
                    deleteChip={handleDeleteChange}
                    width={247.4} 
                    titleFilter={'Профіль'} 
                    contentInfo={'B'}>
                    {goodsTyre._height ? 
                        goodsTyre._height.map((heightItem: any) => (
                    <SelectFilterList
                        key={heightItem === '' || 'undefined' ? heightItem + 1 : heightItem}
                        nameFilter={'Профіль'}
                        value={heightItem === '' || undefined ? '0' : heightItem}
                        items={heightItem === '' || undefined ? '0' : heightItem}
                        checked={filter._height}
                        onChange={handleChange}
                        width={247.4}
                     /> )) : null  
                    }
                </FilterMainBtn>
                <FilterMainBtn 
                    filterAction={filterDiameterClick}
                    filterState={stateDiameter}
                    chipItem={filter._diameter}
                    deleteChip={handleDeleteChange}
                    width={247.4} 
                    titleFilter={'Діаметр'} 
                    contentInfo={'C'}>
                    { goodsTyre._diameter ? 
                        goodsTyre._diameter.map(
                            (diameterItem: any) => (
                    <SelectFilterList
                        key={diameterItem}
                        nameFilter={'Діаметр'}
                        value={diameterItem} 
                        items={diameterItem} 
                        checked={filter._diameter} 
                        onChange={handleChange} 
                        width={247.4}
                    />  )) : null
                    }
                </FilterMainBtn>
                { filter._chipSeason.length !== 0 && stateSeason ?
                  <button 
                    className='checkBoxBtnOn season'
                    onClick={filterSeasonAdd}
                  >Показати</button> 
                  : null 
                } 
                <Accordion 
                    titleName={'Сезон'}
                    chipItem={filter.season}
                    deleteChip={handleDeleteChange}
                    filterAction={filterSeasonClick}
                    filterState={stateSeason}
                >
                    <span>Сезон:</span>
                    {goodsTyre._season ?
                        goodsTyre._season.map(
                            (seasonItem: any, index: number) => (
                      <CheckboxBtn 
                        key={seasonItem}
                        value={seasonItem} 
                        checked={filter._chipSeason.includes(seasonItem)} 
                        onChange={handleChange} 
                        titleName={'Сезон'}
                        titleCheckbox={seasonItem} 
                        imageSrc={seasonCar(seasonItem)}/>
                        )): null  
                    }
                    <p/>
                </Accordion>
                { filter._chipStudded.length !== 0 && stateStudded ?
                  <button 
                    className='checkBoxBtnOn studded'
                    onClick={filterStuddedAdd}
                  >Показати</button> 
                  : null 
                }
                { filter._chipSeason.includes('зимова') ?
                <Accordion 
                    titleName={'Шип / Не шип'}
                    chipItem={filter.studded}
                    deleteChip={handleDeleteChange}
                    filterAction={filterStuddedClick}
                    filterState={stateStudded}
                >
                    { goodsTyre._studded ? 
                        goodsTyre._studded.map(
                            (studdedItem: any, index: number) => (
                       <CheckboxBtn 
                        key={studdedItem + index}
                        checked={filter._chipStudded.includes(studdedItem)} 
                        onChange={handleChange} 
                        value={studdedItem} 
                        titleName={'Шип / Не шип'}
                        titleCheckbox={studdedItem.length === 0 ?
                            'не шип'
                            : studdedItem} 
                        imageSrc={studdedItem.length === 0 ?
                            './iconsSigns/imagesNoThorn_1_64.png' :
                            './iconsSigns/imagesThorn_1_64.png'
                        }
                        /> 
                       )) : null
                    }
                    <p/>
                </Accordion>
                : null
                }
                { filter._chipBrands.length !== 0 && stateBrand ?
                  <button 
                    className='checkBoxBtnOn brands'
                    onClick={filterBrandAdd}
                  >Показати</button> 
                  : null 
                }
                <FilterMainBtn 
                    filterAction={filterBrandClick}
                    filterState={stateBrand}
                    chipItem={filter._brands}
                    deleteChip={handleDeleteChange}
                    width={247.4} 
                    titleFilter={'Бренд'} 
                    contentInfo={false}>
                    {goodsTyre._brands ? 
                        goodsTyre._brands.map(
                            (brandItem: any, index: number) => (
                     <CheckboxBtn
                        key={brandItem}
                        checked={filter._chipBrands.includes(brandItem)} 
                        onChange={handleChange} 
                        value={brandItem} 
                        titleName={'Бренд'}
                        titleCheckbox={brandItem} 
                        imageSrc={undefined}
                    />  )) : null
                    }
                </FilterMainBtn>
                <PriceRange
                    filterAction={filterPriceRange}
                    filterActionShown={filterPriceAdd}
                /> 
                { filter._chipVehicleType.length !== 0 && stateVehicleType ?
                  <button 
                    className='checkBoxBtnOn vehicleType'
                    onClick={filterVehicleTypeAdd}
                  >Показати</button> 
                  : null 
                }               
                <Accordion 
                    titleName={'Тип авто'}
                    chipItem={filter.vehicle_type}
                    deleteChip={handleDeleteChange}
                    filterAction={filterVehicleTypeClick}
                    filterState={stateVehicleType}
                >
                    { goodsTyre._vehicle_type ? 
                        goodsTyre._vehicle_type.map(
                            (vehicleItem: any, index: number) => (
                    <CheckboxBtn 
                        key={vehicleItem}
                        value={vehicleItem}
                        checked={filter._chipVehicleType.includes(vehicleItem)} 
                        onChange={handleChange}
                        titleName={'Тип авто'}  
                        titleCheckbox={vehicleItem} 
                        imageSrc={typeCar(vehicleItem)}/>
                        )) : null
                    }
                </Accordion>
                { filter._chipSpeedIndex.length !== 0 && stateSpeedIndex ?
                  <button 
                    className='checkBoxBtnOn speedIndex'
                    onClick={filterSpeedIndexAdd}
                  >Показати</button> 
                  : null 
                }
                <Accordion 
                    titleName={'Індекс швидкості'}
                    chipItem={filter.speed_index}
                    deleteChip={handleDeleteChange}
                    filterAction={filterSpeedIndexClick}
                    filterState={stateSpeedIndex}
                >
                    {goodsTyre._speed_index ? 
                        goodsTyre._speed_index.map(
                            (speedIndexItem: any) => (
                    <CheckboxBtn 
                        key={speedIndexItem}
                        checked={filter._chipSpeedIndex.includes(speedIndexItem)} 
                        onChange={handleChange} 
                        value={speedIndexItem} 
                        titleName={'Індекс швидкості'}
                        titleCheckbox={speedIndexItem} 
                        imageSrc={'./iconsSigns/speed_limit_64.png'}
                    />  )) : null
                    }
                    <p/>
                </Accordion>
                { filter._chipLoadIndex.length !== 0 && stateLoadIndex ?
                  <button 
                    className='checkBoxBtnOn loadIndex'
                    onClick={filterLoadIndexAdd}
                  >Показати</button> 
                  : null 
                }    
                <Accordion 
                    titleName={'Індекс навантаження'}
                    chipItem={filter.load_index}
                    deleteChip={handleDeleteChange}
                    filterAction={filterLoadIndexClick}
                    filterState={stateLoadIndex}
                >
                    {goodsTyre._load_index ? 
                        goodsTyre._load_index.map(
                            (loadIndexItem: any) => (
                    <CheckboxBtn 
                        key={loadIndexItem}
                        checked={filter.chipLoadIndex.includes(loadIndexItem)} 
                        onChange={handleChange} 
                        value={loadIndexItem} 
                        titleName={'Індекс навантаження'}
                        titleCheckbox={loadIndexItem} 
                        imageSrc={'./iconsSigns/load_limit_1_64_empty.png'}
                    /> 
                    ))
                     : null
                    }
                    <p/>
                </Accordion>
                { filter._chipHomologation.length !== 0 && stateHomologation ?
                  <button 
                    className='checkBoxBtnOn homologation'
                    onClick={filterHomologationAdd}
                  >Показати</button> 
                  : null 
                }
                <Accordion 
                    titleName={'Омологація'}
                    chipItem={filter.homologation}
                    deleteChip={handleDeleteChange}
                    filterAction={filterHomologationClick}
                    filterState={stateHomologation}
                >
                    {goodsTyre._homologation ? 
                        goodsTyre._homologation.map(
                            (homologationItem: any) => (
                    <CheckboxBtn 
                        key={homologationItem}
                        checked={filter._chipHomologation.includes(homologationItem)} 
                        onChange={handleChange} 
                        value={homologationItem} 
                        titleName={'Омологація'}
                        titleCheckbox={homologationItem} 
                        imageSrc={''}
                    /> 
                    ))
                     : null
                    }
                    <p/>
                </Accordion>
                { filter._chipRunFlat.length !== 0 && stateRunFlat ?
                  <button 
                    className='checkBoxBtnOn runFlat'
                    onClick={filterRunFlatAdd}
                  >Показати</button> 
                  : null 
                }
                <Accordion 
                    titleName={'Run Flat'}
                    chipItem={filter.run_flat}
                    deleteChip={handleDeleteChange}
                    filterAction={filterRunFlatClick}
                    filterState={stateRunFlat}
                >
                    {goodsTyre._run_flat ? 
                        goodsTyre._run_flat.map((runFlatItem: any) => (
                    <CheckboxBtn 
                        key={runFlatItem}
                        checked={filter._chipRunFlat.includes(runFlatItem)} 
                        onChange={handleChange} 
                        value={runFlatItem}
                        titleName={"Run Flat"} 
                        titleCheckbox={runFlatItem} 
                        imageSrc={''}
                    /> 
                    ))
                     : null
                    }
                    <p/>
                </Accordion>
                { filter._chipReinforced.length !== 0 && stateReinforced ?
                  <button 
                    className='checkBoxBtnOn reinforced'
                    onClick={filterReinforcedAdd}
                  >Показати</button> 
                  : null 
                }
                <Accordion 
                    titleName={'Високонагруженість'}
                    chipItem={filter.reinforced}
                    deleteChip={handleDeleteChange}
                    filterAction={filterReinforcedClick}
                    filterState={stateReinforced}
                >
                    {goodsTyre._reinforced ? 
                        goodsTyre._reinforced.map(
                            (reinforceItem: any) => (
                    <CheckboxBtn 
                        key={reinforceItem}
                        checked={filter._chipReinforced.includes(reinforceItem)} 
                        onChange={handleChange} 
                        value={reinforceItem}
                        titleName={'Високонагруженість'} 
                        titleCheckbox={reinforceItem} 
                        imageSrc={''}
                    /> 
                    ))
                     : null
                    }
                    <p/>
                </Accordion>
            </div>       
        </div>
    );
});

export default FilterCatalogTyres;