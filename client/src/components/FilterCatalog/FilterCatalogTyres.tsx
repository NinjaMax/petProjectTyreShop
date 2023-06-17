import React, {useContext, useEffect, useState} from 'react';
//import limitSpeed from '/iconsSigns/speed_limit_64_empty.png';
import '../../css/FilterCatatogCss/FilterCatalogTyres.css';
//import imageThorn from '../../assets/icons/imagesThorn_1.png';
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
import FilterMainBtn from '../mainFilterButton/FilterMainBtn';
import CheckboxBtn from '../select/CheckboxBtn';
import Accordion from './Accordion';
import SelectFilterList from '../select/SelectFilterList';
import PriceRange from './PriceRange';
import { Context } from '../../context/Context';
import { observer } from 'mobx-react-lite';
import { yieldToMain } from '../../restAPI/postTaskAdmin';
import { 
    getTyresBrandPropsAll, 
    getTyresDiameterPropsAll, 
    getTyresHeightPropsAll, 
    getTyresHomologationPropsAll, 
    getTyresLoadIndexPropsAll, 
    getTyresModelPropsAll, 
    getTyresReinforcedPropsAll, 
    getTyresRunFlatPropsAll, 
    getTyresSpeedIndexPropsAll, 
    getTyresStuddedPropsAll, 
    getTyresVehicleTypePropsAll, 
    getTyresWidthPropsAll, 
    getTyresSeasonPropsAll 
} from '../../restAPI/restGoodsApi';

interface IFilterCatTyres {
    handleChange?(args0: any): void;
    setFilterAction(args0: any): void;
    filterState: boolean;
}

const FilterCatalogTyres = observer((
    {filterState, setFilterAction}: IFilterCatTyres) => {
    const {filter, goodsTyre, page} = useContext<any | null>(Context);
    const [handleItem, setHandleItem] = useState<string[]>([]);

    // useEffect(() =>{
    //     let isMounted = false;
    //     const loadMaintask = async() => {
    //       const taskLoad: any[] = [
    //         getTyresBrandPropsAll,
    //         getTyresDiameterPropsAll,
    //         getTyresHeightPropsAll,
    //         getTyresHomologationPropsAll,
    //         getTyresLoadIndexPropsAll,
    //         getTyresModelPropsAll,
    //         getTyresReinforcedPropsAll,
    //         getTyresRunFlatPropsAll,
    //         getTyresSpeedIndexPropsAll,
    //         getTyresStuddedPropsAll,
    //         getTyresVehicleTypePropsAll,
    //         //getTyresWidthPropsAll,
    //         getTyresSeasonPropsAll
    //       ];
    
    //       let i:number = 0;
    //       while(taskLoad.length > i) {
    //         // if(!isMounted && taskLoad[i] === getTyresWidthPropsAll) {
    //         //     let tyreWidthList: any = await taskLoad[i]();
    //         //     //goodsTyre?.setWidth(tyreWidthList);
    //         //     // console.log('SET_TYRES_WIDTH_LIST: ', tyreWidthList);
    //         // }
    //         if(!isMounted && taskLoad[i] === getTyresHeightPropsAll) {
    //           let tyreHeightList: any = await taskLoad[i]();
    //           goodsTyre?.setHeight(tyreHeightList);
    //         //   console.log('SET_TYRES_HEIGHT_LIST: ', tyreHeightList);
    //         }  
    //         if(!isMounted && taskLoad[i] === getTyresBrandPropsAll) {
    //           let tyreBrandList: any = await taskLoad[i]();
    //           goodsTyre?.setBrands(tyreBrandList);
    //         //   console.log('SET_TYRES_BRAND_LIST: ', tyreBrandList);
    //         }
    //         if(!isMounted && taskLoad[i] === getTyresDiameterPropsAll) {
    //             let tyreDiameterList: any = await taskLoad[i]();
    //             goodsTyre?.setDiameter(tyreDiameterList);
    //             // console.log('SET_TYRES_DIAMETER_LIST: ', tyreDiameterList);
    //         }
    //         if(!isMounted && taskLoad[i] === getTyresSeasonPropsAll) {
    //           let tyreSeasonList: any = await taskLoad[i]();
    //           goodsTyre?.setSeason(tyreSeasonList);
    //         //   console.log('SET_TYRES_SEASON_LIST: ', tyreSeasonList);
    //         }
    //         if(!isMounted && taskLoad[i] === getTyresVehicleTypePropsAll) {
    //             let tyreVehicleList: any = await taskLoad[i]();
    //             goodsTyre?.setVehicleType(tyreVehicleList);
    //             // console.log('SET_TYRES_VEHICLE_LIST: ', tyreVehicleList);
    //         }
    //         if(!isMounted && taskLoad[i] === getTyresStuddedPropsAll) {
    //             let tyreStuddedList: any = await taskLoad[i]();
    //             goodsTyre?.setStudded(tyreStuddedList);
    //             // console.log('SET_TYRES_STUDDED_LIST: ', tyreStuddedList);
    //         }
    //         if(!isMounted && taskLoad[i] === getTyresSpeedIndexPropsAll) {
    //             let tyreSpeedIndexList: any = await taskLoad[i]();
    //             goodsTyre?.setSpeedIndex(tyreSpeedIndexList);
    //             // console.log('SET_TYRES_SPEEDINDEX_LIST: ', tyreSpeedIndexList);
    //         }  
    //         if(!isMounted && taskLoad[i] === getTyresLoadIndexPropsAll) {
    //             let tyreLoadIndexList: any = await taskLoad[i]();
    //             goodsTyre?.setLoadIndex(tyreLoadIndexList);
    //             // console.log('SET_TYRES_LOADINDEX_LIST: ', tyreLoadIndexList);
    //         }
    //         if(!isMounted && taskLoad[i] === getTyresHomologationPropsAll) {
    //             let tyreHomologationList: any = await taskLoad[i]();
    //             goodsTyre?.setHomologation(tyreHomologationList);
    //             // console.log('SET_TYRES_HOMOLOGATION_LIST: ', tyreHomologationList);
    //         }
    //         if(!isMounted && taskLoad[i] === getTyresReinforcedPropsAll) {
    //             let tyreReinforcedList: any = await taskLoad[i]();
    //             goodsTyre?.setReinforced(tyreReinforcedList);
    //             // console.log('SET_TYRES_REINFORCED_LIST: ', tyreReinforcedList);
    //         }
    //         if(!isMounted && taskLoad[i] === getTyresRunFlatPropsAll) {
    //             let tyreRunFlatList: any = await taskLoad[i]();
    //             goodsTyre?.setRunFlat(tyreRunFlatList);
    //             // console.log('SET_TYRES_RUNFLAT_LIST: ', tyreRunFlatList);
    //         }      
    //         const task = taskLoad.shift();
    //         task();
    //         await yieldToMain(); 
    //     }
    //     }
    //     loadMaintask();
    //     return () => {
    //         isMounted = true;
    //     };
    // },[goodsTyre]);

    const handleChange  = (e: any) => {
        //setHandleItem(e.currentTarget.value);
        console.log(e.currentTarget);
        console.log(e.target.name);
        //let brandList: string[] = [];
        if (e.target.name === 'Ширина') {
            page.setLoadMore(0);
            page.setOffset(0);
            filter.setWidth(e.target.value);
        }
        if (e.target.name === 'Профіль') {
            page.setLoadMore(0);
            page.setOffset(0);
            filter.setHeight(e.target.value);
        }
        if (e.target.name === 'Діаметр') {
            page.setLoadMore(0);
            page.setOffset(0);
            filter.setDiameter(e.target.value);
            
        }
        if (e.target.name === 'Бренд' && e.target.checked) {
            page.setLoadMore(0);
            page.setOffset(0);
            //brandList.push(e.target.value);
            setHandleItem([...handleItem, e.target.value]);
            // if (handleItem.length !== 0) {
            //     console.log('ADD_FILTER_BRAND', handleItem.join(','));
            // }
            //filter.setBrands(addBrand.push(e.target.value + ','));
            //handleItem
            console.log(e.target.checked)
        }
    } 
    
    const handleDeleteChange  = (e: any) => {
        //setHandleItem(e.currentTarget.value);
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
            
            setHandleItem(handleItem.splice(e.target.getAttribute('data-index'), 1));
            //filter.brands.split(',').splice(e.target.getAttribute('data-index'), 1);    
            filter.setBrands(
                handleItem.splice(e.target.getAttribute('data-index'), 1).join(',')
            );
        }
    }  
    const filterBrandAdd = () => {
        filter.setBrands(handleItem.join(','));
    }

    console.log('BRAND_LIST: ', handleItem.join(','));
    console.log('BRAND_FILTER: ', filter._brands);

    return (
        <div className='filterCatalogTyres'>
            <div className='filterCatalogTyresHeader'>
                Фильтр Підбір по авто
            </div>
            <div className='filterTyresOption'>
                <FilterMainBtn 
                    filterState={filterState}
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
                    filterState={filterState}
                    chipItem={filter._height}
                    deleteChip={handleDeleteChange}
                    width={247.4} 
                    titleFilter={'Профіль'} 
                    contentInfo={'B'}>
                    {goodsTyre._height ? 
                        goodsTyre._height.map((heightItem: any) => (
                    <SelectFilterList
                        key={heightItem}
                        nameFilter={'Профіль'}
                        value={heightItem}
                        items={heightItem}
                        checked={filter._height}
                        onChange={handleChange}
                        width={247.4}
                     /> )) : null  
                    }
                </FilterMainBtn>
                <FilterMainBtn 
                    filterState={filterState}
                    chipItem={filter._diameter}
                    deleteChip={handleDeleteChange}
                    width={247.4} 
                    titleFilter={'Діаметр'} 
                    contentInfo={'C'}>
                    { goodsTyre._diameter ? 
                        goodsTyre._diameter.map((diameterItem: any) => (
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
                <Accordion titleName={"Сезон"}>
                    <span>Сезон:</span>
                    <CheckboxBtn 
                        value={'Zimnie'} 
                        checked={filter._diameter} 
                        onChange={handleChange} 
                        titleName={"Сезон"}
                        titleCheckbox={'Зимові'} 
                        imageSrc={imageWinter}/>
                    <CheckboxBtn 
                        value={'Litni'} 
                        checked={filter._diameter} 
                        onChange={handleChange}
                        titleName={"Сезон"} 
                        titleCheckbox={'Літні'} 
                        imageSrc={imageSummer}/>
                    <CheckboxBtn 
                        value={'Vsesezonni'} 
                        checked={filter._diameter} 
                        onChange={handleChange} 
                        titleName={"Сезон"}
                        titleCheckbox={'Всесезонні'} 
                        imageSrc={imageAllSeason}/>
                    <p/>
                </Accordion>
                <Accordion titleName={"Шип / Не шип"}>
                    {goodsTyre._studded && filter._season === 'Зимові' ? 
                        goodsTyre._studded.map(
                            (studdedItem: any, index: number) => (
                       <CheckboxBtn 
                        key={studdedItem + index}
                        checked={filter.studded} 
                        onChange={handleChange} 
                        value={studdedItem} 
                        titleName={"Шип / Не шип"}
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
                { handleItem.length !== 0 && 
                    handleItem.join(',') === filter.brands ?
                  <button 
                    className='checkBoxBtnOn'
                    onClick={filterBrandAdd}
                  >Показати</button> 
                  : null 
                }
                <FilterMainBtn 
                    filterState={filterState}
                    chipItem={filter.brands}
                    deleteChip={handleDeleteChange}
                    width={247.4} 
                    titleFilter={'Бренд'} 
                    contentInfo={false}>
                    {goodsTyre._brands ? 
                        goodsTyre._brands.map((brandItem: any) => (
                     <CheckboxBtn
                        key={brandItem}
                        checked={filter.brands} 
                        onChange={handleChange} 
                        value={brandItem} 
                        titleName={'Бренд'}
                        titleCheckbox={brandItem} 
                        imageSrc={undefined}
                    />  )) : null
                    }
                </FilterMainBtn>
                <PriceRange/>                
                <Accordion titleName={"Тип авто"}>
                    <CheckboxBtn 
                        value={"legkovi"}
                        checked={filter.vehicle_type} 
                        onChange={handleChange}
                        titleName={"Тип авто"}  
                        titleCheckbox={"Легкові"} 
                        imageSrc={imageLegkovi}/>
                    <CheckboxBtn 
                        value={"pozashljahovik"}
                        checked={filter.vehicle_type} 
                        onChange={handleChange} 
                        titleName={"Тип авто"} 
                        titleCheckbox={"Позашляхлвик"} 
                        imageSrc={imagePozashljahovik}/>
                    <CheckboxBtn 
                        value={"mikroavtobus"} 
                        checked={filter.vehicle_type} 
                        onChange={handleChange} 
                        titleName={"Тип авто"}
                        titleCheckbox={"Мікроавтобус"} 
                        imageSrc={imageMikroavtobus}/>
                    <CheckboxBtn 
                        value={"gruzovi"}
                        checked={filter.vehicle_type} 
                        onChange={handleChange} 
                        titleName={"Тип авто"} 
                        titleCheckbox={"Грузові"} 
                        imageSrc={imageGruzovi}/>
                    <CheckboxBtn 
                        value={"moto"} 
                        checked={filter.vehicle_type} 
                        onChange={handleChange}
                        titleName={"Тип авто"}
                        titleCheckbox={"Мото"} 
                        imageSrc={imageMoto}/>
                    <CheckboxBtn 
                        value={"s/h"} 
                        checked={filter.vehicle_type} 
                        onChange={handleChange}
                        titleName={"Тип авто"} 
                        titleCheckbox={"С/х"} 
                        imageSrc={imageSH}/>
                    <CheckboxBtn 
                        value={"specteh"}
                        checked={filter.vehicle_type} 
                        onChange={handleChange}
                        titleName={"Тип авто"}  
                        titleCheckbox={"Спецтехніка"} 
                        imageSrc={imageSpectehnika}/>
                </Accordion>
                <Accordion titleName={"Індекс швидкості"}>
                    {goodsTyre._speed_index ? 
                        goodsTyre._speed_index.map((speedIndexItem: any) => (
                    <CheckboxBtn 
                        key={speedIndexItem}
                        checked={filter.speed_index} 
                        onChange={handleChange} 
                        value={speedIndexItem} 
                        titleName={"Індекс швидкості"}
                        titleCheckbox={speedIndexItem} 
                        imageSrc={'./iconsSigns/speed_limit_64.png'}
                    />  )) : null
                    }
                    <p/>
                </Accordion>    
                <Accordion titleName={"Індекс навантаження"}>
                    {goodsTyre._load_index ? 
                        goodsTyre._load_index.map((loadIndexItem: any) => (
                    <CheckboxBtn 
                        key={loadIndexItem}
                        checked={filter.load_index} 
                        onChange={handleChange} 
                        value={loadIndexItem} 
                        titleName={"Індекс навантаження"}
                        titleCheckbox={loadIndexItem} 
                        imageSrc={'./iconsSigns/load_limit_1_64_empty.png'}
                    /> 
                    ))
                     : null
                    }
                    <p/>
                </Accordion>
                <Accordion titleName={"Омологація"}>
                    {goodsTyre._homologation ? 
                        goodsTyre._homologation.map((homologationItem: any) => (
                    <CheckboxBtn 
                        key={homologationItem}
                        checked={filter.homologation} 
                        onChange={handleChange} 
                        value={homologationItem} 
                        titleName={"Омологація"}
                        titleCheckbox={homologationItem} 
                        imageSrc={''}
                    /> 
                    ))
                     : null
                    }
                    <p/>
                </Accordion>
                <Accordion titleName={"Run Flat"}>
                    {goodsTyre._run_flat ? 
                        goodsTyre._run_flat.map((runFlatItem: any) => (
                    <CheckboxBtn 
                        key={runFlatItem}
                        checked={filter.run_flat} 
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
                <Accordion titleName={"Високонагруженість"}>
                    {goodsTyre._reinforced ? 
                        goodsTyre._reinforced.map((reinforceItem: any) => (
                    <CheckboxBtn 
                        key={reinforceItem}
                        checked={filter.reinforced} 
                        onChange={handleChange} 
                        value={reinforceItem}
                        titleName={"Високонагруженість"} 
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