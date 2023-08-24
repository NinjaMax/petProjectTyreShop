import React, {useContext, useEffect, useState} from 'react';
import '../../css/FilterCatatogCss/FilterCatalogTyres.css';
import CheckboxBtn from '../select/CheckboxBtn';
import Accordion from './Accordion';
import SelectFilterList from '../select/SelectFilterList';
import PriceRange from './PriceRange';
import { Context } from '../../context/Context';
import { observer } from 'mobx-react-lite';
import { seasonCar, typeCar } from '../../services/tyresPropsService';
import FilterMainBtnWheel from '../mainFilterButton/FIlterMainBtnWheel';

interface IFilterCatTyres {
    handleChange?(args0: any): void;
    setFilterAction(args0: any): void;
    filterState: boolean;
}

const FilterCatalogWheels = observer((
    {filterState, setFilterAction}: IFilterCatTyres) => {
    const {filter, goodsWheel, page} = useContext<any | null>(Context);
    const [stateWidth, setStateWidth]=useState(false);
    const [stateDiameter, setStateDiameter]=useState(false);
    const [stateBoltCount, setStateBoltCount]=useState(false);
    const [stateBrand, setStateBrand]=useState(false);
    const [stateType, setStateType]=useState(false);
    const [stateColor, setStateColor]=useState(false);
    const [stateDia, setStateDia]=useState(false);
    const [stateEt, setStateEt]=useState(false);
    const [statePcd, setStatePcd]=useState(false);
    const [statePcd2, setStatePcd2]=useState(false);
    const [stateBoltCountPcd, setStateBoltCountPcd]=useState(false);
    
    useEffect(() => {
        if(!filterState) {
            setStateWidth(false);
            setStateDiameter(false);
            setStateBrand(false);
            setStateBoltCount(false);
            setStateDiameter(false);
            setStateType(false);
            setStateColor(false);
            setStateDia(false);
            setStateEt(false);
            setStatePcd(false);
            setStatePcd2(false);
            setStateBoltCountPcd(false);
        }
    },[filterState])

    const handleChange  = (e: any) => {
        if (e.target.name === 'Ширина') {
            page.setLoadMore(0);
            page.setOffset(0);
            filter.setWidth(e.target.value);
            setStateWidth(false);
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
        if (e.target.name === 'Кількість болтів' && e.target.checked) {
            page.setLoadMore(0);
            page.setOffset(0);
            filter.setChipBoltCount(
                Array.from(
                    new Set([...filter.chipBoltCount, e.target.value]))
            );     
        } else if (e.target.name === 'Кількість болтів') {
            const cancelSeason = filter.chipBoltCount.findIndex(
                (item: string) => item === e.target.value);
            filter.removeChipBoltCountdItem(cancelSeason);
            filter.setChipBoltCount(Array.from(
                new Set([...filter.chipBoltCount])));
        }
        if (e.target.name === 'Тип диска' && e.target.checked) {
            page.setLoadMore(0);
            page.setOffset(0);
            filter.setChipType(
                Array.from(
                    new Set([...filter.chipType, e.target.value]))
            );     
        } else if (e.target.name === 'Тип диска') {
            const cancelVehicleType = filter.chipType.findIndex(
                (item: string) => item === e.target.value);
            filter.removeChipTypeItem(cancelVehicleType);
            filter.setChipType(Array.from(
                new Set([...filter.chipType])));
        }
        if (e.target.name === 'Колір' && e.target.checked) {
            page.setLoadMore(0);
            page.setOffset(0);
            filter.setChipColor(
                Array.from(
                    new Set([...filter.chipColor, e.target.value]))
            );     
        } else if (e.target.name === 'Колір') {
            const cancelStudded = filter.chipColor.findIndex(
                (item: string) => item === e.target.value);
            filter.removeChipColorItem(cancelStudded);
            filter.setChipColor(Array.from(
                new Set([...filter.chipColor])));
        }
        if (e.target.name === 'Діаметр ступиці' && e.target.checked) {
            page.setLoadMore(0);
            page.setOffset(0);
            filter.setChipDia(
                Array.from(
                    new Set([...filter.chipDia, e.target.value]))
            );     
        } else if (e.target.name === 'Діаметр ступиці') {
            const cancelSpeedIndex = filter.chipDia.findIndex(
                (item: string) => item === e.target.value);
            filter.removeChipDiaItem(cancelSpeedIndex);
            filter.setChipDia(Array.from(
                new Set([...filter.chipDia])));
        }
        if (e.target.name === 'Виліт ET' && e.target.checked) {
            page.setLoadMore(0);
            page.setOffset(0);
            filter.setChipEt(
                Array.from(
                    new Set([...filter.chipEt, e.target.value]))
            );     
        } else if (e.target.name === 'Виліт ET') {
            const cancelLoadIndex = filter.chipEt.findIndex(
                (item: string) => item === e.target.value);
            filter.removeChipEtItem(cancelLoadIndex);
            filter.setChipEt(Array.from(
                new Set([...filter.chipEt])));
        }
        if (e.target.name === 'Міжболтова відстань' && e.target.checked) {
            page.setLoadMore(0);
            page.setOffset(0);
            filter.setChipPcd(
                Array.from(
                    new Set([...filter.chipPcd, e.target.value]))
            );     
        } else if (e.target.name === 'Міжболтова відстань') {
            const cancelHomologation = filter.chipPcd.findIndex(
                (item: string) => item === e.target.value);
            filter.removeChipPcdItem(cancelHomologation);
            filter.setChipPcd(Array.from(
                new Set([...filter.chipPcd])));
        }
        if (e.target.name === 'Додаткове міжболтове PCD2' && e.target.checked) {
            page.setLoadMore(0);
            page.setOffset(0);
            filter.setChipPcd2(
                Array.from(
                    new Set([...filter.chipPcd2, e.target.value]))
            );     
        } else if (e.target.name === 'Додаткове міжболтове PCD2') {
            const cancelRunFlat = filter.chipPcd2.findIndex(
                (item: string) => item === e.target.value);
            filter.removeChipPcd2Item(cancelRunFlat);
            filter.setChipPcd2(Array.from(
                new Set([...filter.chipPcd2])));
        }
        if (e.target.name === 'Болти і відстань' && e.target.checked) {
            page.setLoadMore(0);
            page.setOffset(0);
            filter.setChipBoltCountPcd(
                Array.from(
                    new Set([...filter.chipBoltCountPcd, e.target.value]))
            );     
        } else if (e.target.name === 'Болти і відстань') {
            const cancelReinforced = filter.chipBoltCountPcd.findIndex(
                (item: string) => item === e.target.value);
            filter.removeChipBoltCountPcdItem(cancelReinforced);
            filter.setChipBoltCountPcd(Array.from(
                new Set([...filter.chipBoltCountPcd])));
        }
    } 
    
    const handleDeleteChange  = (e: any) => {
        if (e.target.getAttribute('data-name') === 'Ширина') {
            page.setLoadMore(0);
            page.setOffset(0);
            filter.setWidth(null);
        }
        // if (e.target.getAttribute('data-name') === 'Профіль') {
        //     page.setLoadMore(0);
        //     page.setOffset(0);
        //     filter.setHeight(null);
        // }
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
        if (e.target.getAttribute('data-name') === 'Кількість болтів') {
            page.setLoadMore(0);
            page.setOffset(0);
            filter.removeChipBoltCountdItem(e.target.getAttribute('data-index'));
            filter.setChipBoltCount(Array.from(
                new Set([...filter.chipBoltCount])));
            filter.setBoltCount(filter.chipBoltCount.join(','));
        }
        if (e.target.getAttribute('data-name') === 'Тип диска') {
            page.setLoadMore(0);
            page.setOffset(0);
            filter.removeChipTypeItem(e.target.getAttribute('data-index'));
            filter.setChipType(Array.from(
                new Set([...filter.chipType])));
            filter.setType(filter.chipType.join(','));
        }
        if (e.target.getAttribute('data-name') === 'Колір') {
            page.setLoadMore(0);
            page.setOffset(0);
            filter.removechipColorItem(e.target.getAttribute('data-index'));
            filter.setChipColor(Array.from(
                new Set([...filter.chipColor])));
            filter.setColor(filter.chipColor.join(','));
        }
        if (e.target.getAttribute('data-name') === 'Діаметр ступиці') {
            page.setLoadMore(0);
            page.setOffset(0);
            filter.removeChipDiaItem(e.target.getAttribute('data-index'));
            filter.setChipDia(Array.from(
                new Set([...filter.chipDia])));
            filter.setDia(filter.chipDia.join(','));
        }
        if (e.target.getAttribute('data-name') === 'Виліт ET') {
            page.setLoadMore(0);
            page.setOffset(0);
            filter.removeChipEtItem(e.target.getAttribute('data-index'));
            filter.setChipEt(Array.from(
                new Set([...filter.chipEt])));
            filter.setEt(filter.chipEt.join(','));
        }
        if (e.target.getAttribute('data-name') === 'Міжболтова відстань') {
            page.setLoadMore(0);
            page.setOffset(0);
            filter.removeChipPcdItem(e.target.getAttribute('data-index'));
            filter.setChipPcd(Array.from(
                new Set([...filter.chipPcd])));
            filter.setPcd(filter.chipPcd.join(','));
        }
        if (e.target.getAttribute('data-name') === 'Додаткове міжболтове') {
            page.setLoadMore(0);
            page.setOffset(0);
            filter.removeChipPcd2Item(e.target.getAttribute('data-index'));
            filter.setChipPcd2(Array.from(
                new Set([...filter.chipPcd2])));
            filter.setPcd2(filter.chipPcd2.join(','));
        }
        if (e.target.getAttribute('data-name') === 'Болти і відстань') {
            page.setLoadMore(0);
            page.setOffset(0);
            filter.removeChipBoltCountPcdItem(e.target.getAttribute('data-index'));
            filter.setChipBoltCountPcd(Array.from(
                new Set([...filter.chipBoltCountPcd])));
            filter.setBoltCountPcd(filter.chipBoltCountPcd.join(','));
        }
    }  
    const filterBrandAdd = () => {
        filter.setBrands(filter.chipBrands.join(','));
        setStateBrand(!stateBrand);
    }
    const filterBoltCountAdd = () => {
        filter.setBoltCount(filter.chipBoltCount.join(','));
        setStateBoltCount(!stateBoltCount);
    }
    const filterTypeAdd = () => {
        filter.setType(filter.chipType.join(','));
        setStateType(!stateType);
    }
    const filterColorAdd = () => {
        filter.setColor(filter.chipColor.join(','));
        setStateColor(!stateColor);
    }
    const filterDiaAdd = () => {
        filter.setDia(filter.chipDia.join(','));
        setStateDia(!stateDia);
    }
    const filterEtAdd = () => {
        filter.setEt(filter.chipEt.join(','));
        setStateEt(!stateEt);
    }
    const filterPcdAdd = () => {
        filter.setPcd(filter.chipPcd.join(','));
        setStatePcd(!statePcd);
    }
    const filterPcd2Add = () => {
        filter.setPcd2(filter.chipPcd2.join(','));
        setStatePcd2(!statePcd2);
    }
    const filterBoltCountPcddAdd = () => {
        filter.setBoltCountPcd(filter.chipBoltCountPcd.join(','));
        setStateBoltCountPcd(!stateBoltCountPcd);
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
        setStateBoltCount(false);
        setStateBrand(false);
        //setStateHeight(false);
        setStateDiameter(false);
        setStatePcd(false);
        setStateEt(false);
        setStateDia(false);
        setStatePcd2(false);
        setStateBoltCountPcd(false);
        setStateType(false);
        setStateColor(false);
    }
    // const filterHeightClick = () => {
    //     //setStateHeight(!stateHeight);
    //     setStateBoltCount(false);
    //     setStateBrand(false);
    //     setStateWidth(false);
    //     setStateDiameter(false);
    //     setStatePcd(false);
    //     setStateEt(false);
    //     setStateDia(false);
    //     setStatePcd2(false);
    //     setStateBoltCountPcd(false);
    //     setStateType(false);
    //     setStateColor(false);
    // }
    const filterDiameterClick = () => {
        setStateDiameter(!stateDiameter);
        setStateBoltCount(false);
        setStateBrand(false);
        setStateWidth(false);
        //setStateHeight(false);
        setStatePcd(false);
        setStateEt(false);
        setStateDia(false);
        setStatePcd2(false);
        setStateBoltCountPcd(false);
        setStateType(false);
        setStateColor(false);
    }
    const filterColorClick = () => {
        setStateBoltCount(!stateBoltCount);
        setStateBrand(false);
        setStateWidth(false);
        //setStateHeight(false);
        setStateDiameter(false);
        setStatePcd(false);
        setStateEt(false);
        setStateDia(false);
        setStatePcd2(false);
        setStateBoltCountPcd(false);
        setStateType(false);
        //setStateColor(false);
    }
    const filterBoltCountClick = () => {
        setStateColor(!stateColor);
        //setStateBoltCount(false);
        setStateBrand(false);
        setStateWidth(false);
        //setStateHeight(false);
        setStateDiameter(false);
        setStatePcd(false);
        setStateEt(false);
        setStateDia(false);
        setStatePcd2(false);
        setStateBoltCountPcd(false);
        setStateType(false);
    }
    const filterBrandClick = () => {
        setStateBoltCount(false);
        setStateBrand(!stateBrand);
        setStateWidth(false);
        //setStateHeight(false);
        setStateDiameter(false);
        setStatePcd(false);
        setStateEt(false);
        setStateDia(false);
        setStatePcd2(false);
        setStateBoltCountPcd(false);
        setStateType(false);
        setStateColor(false);;
    }
    const filterTypeClick = () => {
        setStateType(!stateType);
        setStateBoltCount(false);
        setStateBrand(false);
        setStateWidth(false);
        //setStateHeight(false);
        setStateDiameter(false);
        setStatePcd(false);
        setStateEt(false);
        setStateDia(false);
        setStatePcd2(false);
        setStateBoltCountPcd(false);
        setStateColor(false);
    }
    const filterDiaClick = () => {
        setStateDia(!stateDia);
        setStateBoltCount(false);
        setStateBrand(false);
        setStateWidth(false);
        //setStateHeight(false);
        setStateDiameter(false);
        setStatePcd(false);
        setStateEt(false);
        setStatePcd2(false);
        setStateBoltCountPcd(false);
        setStateType(false);
        setStateColor(false);
    }
    const filterEtClick = () => {
        setStateEt(!stateEt);
        setStateBoltCount(false);
        setStateBrand(false);
        setStateWidth(false);
        //setStateHeight(false);
        setStateDiameter(false);
        setStatePcd(false);
        setStateDia(false);
        setStatePcd2(false);
        setStateBoltCountPcd(false);
        setStateType(false);
        setStateColor(false);
    }
    const filterPcdClick = () => {
        setStatePcd(!statePcd);
        setStateBoltCount(false);
        setStateBrand(false);
        setStateWidth(false);
        //setStateHeight(false);
        setStateDiameter(false);
        setStateEt(false);
        setStateDia(false);
        setStatePcd2(false);
        setStateBoltCountPcd(false);
        setStateType(false);
        setStateColor(false);
    }
    const filterPcd2Click = () => {
        setStatePcd2(!statePcd2);
        setStateBoltCount(false);
        setStateBrand(false);
        setStateWidth(false);
        //setStateHeight(false);
        setStateDiameter(false);
        setStatePcd(false);
        setStateEt(false);
        setStateDia(false);
        setStateBoltCountPcd(false);
        setStateType(false);
        setStateColor(false);
    }
    const filterBoltCountPcdClick = () => {
        setStateBoltCountPcd(!stateBoltCountPcd);
        setStateBoltCount(false);
        setStateBrand(false);
        setStateWidth(false);
        //setStateHeight(false);
        setStateDiameter(false);
        setStatePcd(false);
        setStateEt(false);
        setStateDia(false);
        setStatePcd2(false);
        setStateType(false);
        setStateColor(false);
    }

    return (
        <div className='filterCatalogTyres'>
            <div className='filterCatalogTyresHeader'>
                Фильтр Дисків
            </div>
            <div className='filterTyresOption'>
                <FilterMainBtnWheel 
                    filterAction={filterWidthClick}
                    filterState={stateWidth}
                    chipItem={filter._width}
                    deleteChip={handleDeleteChange}
                    width={247.4} 
                    titleFilter={'Ширина'} 
                    contentInfo={'A'}>
                    { goodsWheel._width ? 
                        goodsWheel._width.map((widthItem: any) => (
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
                </FilterMainBtnWheel>
                {/* <FilterMainBtn 
                    filterAction={filterHeightClick}
                    filterState={stateHeight}
                    chipItem={filter._height}
                    deleteChip={handleDeleteChange}
                    width={247.4} 
                    titleFilter={'Профіль'} 
                    contentInfo={'B'}>
                    {goodsWheel._height ? 
                        goodsWheel._height.map((heightItem: any) => (
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
                </FilterMainBtn> */}
                <FilterMainBtnWheel 
                    filterAction={filterDiameterClick}
                    filterState={stateDiameter}
                    chipItem={filter._diameter}
                    deleteChip={handleDeleteChange}
                    width={247.4} 
                    titleFilter={'Діаметр'} 
                    contentInfo={'C'}>
                    { goodsWheel._diameter ? 
                        goodsWheel._diameter.map(
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
                </FilterMainBtnWheel>
                { filter._bolt_count.length !== 0 && stateBoltCount ?
                  <button 
                    className='checkBoxBtnOn season'
                    onClick={filterBoltCountAdd}
                  >Показати</button> 
                  : null 
                } 
                <Accordion 
                    titleName={'Кількість болтів'}
                    chipItem={filter.bolt_count}
                    deleteChip={handleDeleteChange}
                    filterAction={filterColorClick}
                    filterState={stateBoltCount}
                >
                    <span>Кількість:</span>
                    {goodsWheel._bolt_count ?
                        goodsWheel._bolt_count.map(
                            (color: any, index: number) => (
                      <CheckboxBtn 
                        key={color}
                        value={color} 
                        checked={filter._chipBoltCount.includes(color)} 
                        onChange={handleChange} 
                        titleName={'Кількість болтів'}
                        titleCheckbox={color} 
                        //imageSrc={seasonCar(color)}
                        />
                        )): null  
                    }
                    <p/>
                </Accordion>
                { filter._color.length !== 0 && stateColor ?
                  <button 
                    className='checkBoxBtnOn studded'
                    onClick={filterColorAdd}
                  >Показати</button> 
                  : null 
                }
                <Accordion 
                    titleName={'Колір'}
                    chipItem={filter.color}
                    deleteChip={handleDeleteChange}
                    filterAction={filterBoltCountClick}
                    filterState={stateColor}
                >
                    { goodsWheel._color ? 
                        goodsWheel._color.map(
                            (color: any, index: number) => (
                       <CheckboxBtn 
                        key={color + index}
                        checked={filter._chipColor.includes(color)} 
                        onChange={handleChange} 
                        value={color} 
                        titleName={'Колір'}
                        titleCheckbox={color} 
                        // imageSrc={color.length === 0 ?
                        //     './iconsSigns/imagesNoThorn_1_64.png' :
                        //     './iconsSigns/imagesThorn_1_64.png'
                        // }
                        /> 
                       )) : null
                    }
                    <p/>
                </Accordion>
                { filter._chipBrands.length !== 0 && stateBrand ?
                  <button 
                    className='checkBoxBtnOn brands'
                    onClick={filterBrandAdd}
                  >Показати</button> 
                  : null 
                }
                <FilterMainBtnWheel 
                    filterAction={filterBrandClick}
                    filterState={stateBrand}
                    chipItem={filter._brands}
                    deleteChip={handleDeleteChange}
                    width={247.4} 
                    titleFilter={'Бренд'} 
                    contentInfo={false}>
                    {goodsWheel._brands ? 
                        goodsWheel._brands.map(
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
                </FilterMainBtnWheel>
                <PriceRange
                    filterAction={filterPriceRange}
                    filterActionShown={filterPriceAdd}
                /> 
                { filter._chipType.length !== 0 && stateType ?
                  <button 
                    className='checkBoxBtnOn vehicleType'
                    onClick={filterTypeAdd}
                  >Показати</button> 
                  : null 
                }               
                <Accordion 
                    titleName={'Тип диска'}
                    chipItem={filter._type}
                    deleteChip={handleDeleteChange}
                    filterAction={filterTypeClick}
                    filterState={stateType}
                >
                    { goodsWheel._type ? 
                        goodsWheel._type.map(
                            (vehicleItem: any, index: number) => (
                    <CheckboxBtn 
                        key={vehicleItem}
                        value={vehicleItem}
                        checked={filter._chipType.includes(vehicleItem)} 
                        onChange={handleChange}
                        titleName={'Тип диска'}  
                        titleCheckbox={vehicleItem} 
                        imageSrc={typeCar(vehicleItem)}/>
                        )) : null
                    }
                </Accordion>
                { filter._chipDia.length !== 0 && stateDia ?
                  <button 
                    className='checkBoxBtnOn speedIndex'
                    onClick={filterDiaAdd}
                  >Показати</button> 
                  : null 
                }
                <Accordion 
                    titleName={'Діаметр ступиці'}
                    chipItem={filter.dia}
                    deleteChip={handleDeleteChange}
                    filterAction={filterDiaClick}
                    filterState={stateDia}
                >
                    {goodsWheel._dia ? 
                        goodsWheel._dia.map(
                            (dia: any) => (
                    <CheckboxBtn 
                        key={dia}
                        checked={filter._chipDia.includes(dia)} 
                        onChange={handleChange} 
                        value={dia} 
                        titleName={'Діаметр ступиці'}
                        titleCheckbox={dia} 
                        imageSrc={'./iconsSigns/speed_limit_64.png'}
                    />  )) : null
                    }
                    <p/>
                </Accordion>
                { filter._chipEt.length !== 0 && stateEt ?
                  <button 
                    className='checkBoxBtnOn loadIndex'
                    onClick={filterEtAdd}
                  >Показати</button> 
                  : null 
                }    
                <Accordion 
                    titleName={'Виліт ET'}
                    chipItem={filter.et}
                    deleteChip={handleDeleteChange}
                    filterAction={filterEtClick}
                    filterState={stateEt}
                >
                    {goodsWheel._et ? 
                        goodsWheel._et.map(
                            (et: any) => (
                    <CheckboxBtn 
                        key={et}
                        checked={filter.chipEt.includes(et)} 
                        onChange={handleChange} 
                        value={et} 
                        titleName={'Виліт ET'}
                        titleCheckbox={et} 
                        imageSrc={'./iconsSigns/load_limit_1_64_empty.png'}
                    /> 
                    ))
                     : null
                    }
                    <p/>
                </Accordion>
                { filter._chipPcd.length !== 0 && statePcd ?
                  <button 
                    className='checkBoxBtnOn homologation'
                    onClick={filterPcdAdd}
                  >Показати</button> 
                  : null 
                }
                <Accordion 
                    titleName={'Міжболтова відстань'}
                    chipItem={filter.pcd}
                    deleteChip={handleDeleteChange}
                    filterAction={filterPcdClick}
                    filterState={statePcd}
                >
                    {goodsWheel._pcd ? 
                        goodsWheel._pcd.map(
                            (pcd: any) => (
                    <CheckboxBtn 
                        key={pcd}
                        checked={filter._chipPcd.includes(pcd)} 
                        onChange={handleChange} 
                        value={pcd} 
                        titleName={'Міжболтова відстань'}
                        titleCheckbox={pcd} 
                        imageSrc={''}
                    /> 
                    ))
                     : null
                    }
                    <p/>
                </Accordion>
                { filter._chipPcd2.length !== 0 && statePcd2 ?
                  <button 
                    className='checkBoxBtnOn runFlat'
                    onClick={filterPcd2Add}
                  >Показати</button> 
                  : null 
                }
                <Accordion 
                    titleName={'Додаткове міжболтове PCD2'}
                    chipItem={filter.pcd2}
                    deleteChip={handleDeleteChange}
                    filterAction={filterPcd2Click}
                    filterState={statePcd2}
                >
                    {goodsWheel._pcd2 ? 
                        goodsWheel._pcd2.map((pcd2: any) => (
                    <CheckboxBtn 
                        key={pcd2}
                        checked={filter._chipPcd2.includes(pcd2)} 
                        onChange={handleChange} 
                        value={pcd2}
                        titleName={"Додаткове міжболтове PCD2"} 
                        titleCheckbox={pcd2} 
                        imageSrc={''}
                    /> 
                    ))
                     : null
                    }
                    <p/>
                </Accordion>
                { filter._chipBoltCountPcd.length !== 0 && stateBoltCountPcd ?
                  <button 
                    className='checkBoxBtnOn reinforced'
                    onClick={filterBoltCountPcddAdd}
                  >Показати</button> 
                  : null 
                }
                <Accordion 
                    titleName={'Болти і відстань'}
                    chipItem={filter.bolt_count_pcd}
                    deleteChip={handleDeleteChange}
                    filterAction={filterBoltCountPcdClick}
                    filterState={stateBoltCountPcd}
                >
                    {goodsWheel._bolt_count_pcd ? 
                        goodsWheel._bolt_count_pcd.map(
                            (bolt_count_pcd: any) => (
                    <CheckboxBtn 
                        key={bolt_count_pcd}
                        checked={filter._chipBoltCountPcd.includes(bolt_count_pcd)} 
                        onChange={handleChange} 
                        value={bolt_count_pcd}
                        titleName={'Болти і відстань'} 
                        titleCheckbox={bolt_count_pcd} 
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

export default FilterCatalogWheels;