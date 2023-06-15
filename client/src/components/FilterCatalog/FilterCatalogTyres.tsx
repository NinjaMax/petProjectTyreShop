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
    const [handleItem, setHandleItem] = useState<string | null>(null);

    useEffect(() =>{
        let isMounted = false;
        const loadMaintask = async() => {
          const taskLoad: any[] = [
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
          ];
    
          let i:number = 0;
          while(taskLoad.length > i) {
            if(!isMounted && taskLoad[i] === getTyresWidthPropsAll) {
                let tyreWidthList: any = await taskLoad[i]();
                goodsTyre?.setWidth(tyreWidthList);
                // console.log('SET_TYRES_WIDTH_LIST: ', tyreWidthList);
            }
            if(!isMounted && taskLoad[i] === getTyresHeightPropsAll) {
              let tyreHeightList: any = await taskLoad[i]();
              goodsTyre?.setHeight(tyreHeightList);
            //   console.log('SET_TYRES_HEIGHT_LIST: ', tyreHeightList);
            }  
            if(!isMounted && taskLoad[i] === getTyresBrandPropsAll) {
              let tyreBrandList: any = await taskLoad[i]();
              goodsTyre?.setBrands(tyreBrandList);
            //   console.log('SET_TYRES_BRAND_LIST: ', tyreBrandList);
            }
            if(!isMounted && taskLoad[i] === getTyresDiameterPropsAll) {
                let tyreDiameterList: any = await taskLoad[i]();
                goodsTyre?.setDiameter(tyreDiameterList);
                // console.log('SET_TYRES_DIAMETER_LIST: ', tyreDiameterList);
            }
            if(!isMounted && taskLoad[i] === getTyresSeasonPropsAll) {
              let tyreSeasonList: any = await taskLoad[i]();
              goodsTyre?.setSeason(tyreSeasonList);
            //   console.log('SET_TYRES_SEASON_LIST: ', tyreSeasonList);
            }
            if(!isMounted && taskLoad[i] === getTyresVehicleTypePropsAll) {
                let tyreVehicleList: any = await taskLoad[i]();
                goodsTyre?.setVehicleType(tyreVehicleList);
                // console.log('SET_TYRES_VEHICLE_LIST: ', tyreVehicleList);
            }
            if(!isMounted && taskLoad[i] === getTyresStuddedPropsAll) {
                let tyreStuddedList: any = await taskLoad[i]();
                goodsTyre?.setStudded(tyreStuddedList);
                // console.log('SET_TYRES_STUDDED_LIST: ', tyreStuddedList);
            }
            if(!isMounted && taskLoad[i] === getTyresSpeedIndexPropsAll) {
                let tyreSpeedIndexList: any = await taskLoad[i]();
                goodsTyre?.setSpeedIndex(tyreSpeedIndexList);
                // console.log('SET_TYRES_SPEEDINDEX_LIST: ', tyreSpeedIndexList);
            }  
            if(!isMounted && taskLoad[i] === getTyresLoadIndexPropsAll) {
                let tyreLoadIndexList: any = await taskLoad[i]();
                goodsTyre?.setLoadIndex(tyreLoadIndexList);
                // console.log('SET_TYRES_LOADINDEX_LIST: ', tyreLoadIndexList);
            }
            if(!isMounted && taskLoad[i] === getTyresHomologationPropsAll) {
                let tyreHomologationList: any = await taskLoad[i]();
                goodsTyre?.setHomologation(tyreHomologationList);
                // console.log('SET_TYRES_HOMOLOGATION_LIST: ', tyreHomologationList);
            }
            if(!isMounted && taskLoad[i] === getTyresReinforcedPropsAll) {
                let tyreReinforcedList: any = await taskLoad[i]();
                goodsTyre?.setReinforced(tyreReinforcedList);
                // console.log('SET_TYRES_REINFORCED_LIST: ', tyreReinforcedList);
            }
            if(!isMounted && taskLoad[i] === getTyresRunFlatPropsAll) {
                let tyreRunFlatList: any = await taskLoad[i]();
                goodsTyre?.setRunFlat(tyreRunFlatList);
                // console.log('SET_TYRES_RUNFLAT_LIST: ', tyreRunFlatList);
            }      
            const task = taskLoad.shift();
            task();
            await yieldToMain(); 
        }
        }
        loadMaintask();
        return () => {
            isMounted = true;
        };
    },[goodsTyre]);

    const handleChange  = (e: any) => {
        setHandleItem(e.currentTarget.value);
        console.log(e.currentTarget);
        console.log(e.target.name);
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
        if (e.target.name === 'Бренд') {
            page.setLoadMore(0);
            page.setOffset(0);
            filter.setBrands(e.target.value);
        }
    }  

    // console.log('WIDTH_FILTER: ', goodsTyre._width);

    return (
        <div className='filterCatalogTyres'>
            <div className='filterCatalogTyresHeader'>
                Фильтр Підбір по авто
            </div>
            <div className='filterTyresOption'>
                <FilterMainBtn 
                    filterState={filterState}
                    chipItem={filter._width}
                    setFilterClick={setFilterAction}
                    width={247.4} 
                    titleFilter={'Ширина'} 
                    contentInfo={'A'}>
                    { goodsTyre._width ? 
                        goodsTyre._width.map((widthItem: any) => (
                       <SelectFilterList 
                        key={widthItem.width}
                        nameFilter={'Ширина'}
                        value={widthItem.width} 
                        items={widthItem.width} 
                        checked={filter._width} 
                        onChange={handleChange} 
                        width={247.4}
                        /> 
                       )) :
                        null
                    }
                </FilterMainBtn>
                <FilterMainBtn 
                    filterState={filterState}
                    chipItem={filter._height}
                    setFilterClick={setFilterAction}
                    width={247.4} 
                    titleFilter={'Профіль'} 
                    contentInfo={'B'}>
                    {goodsTyre._height ? 
                        goodsTyre._height.map((heightItem: any) => (
                    <SelectFilterList
                        key={heightItem.height}
                        nameFilter={'Профіль'}
                        value={heightItem.height}
                        items={heightItem.height}
                        checked={filter._height}
                        onChange={handleChange}
                        width={247.4}
                     /> )) : null  
                    }
                </FilterMainBtn>
                <FilterMainBtn 
                    filterState={filterState}
                    chipItem={filter._diameter}
                    setFilterClick={setFilterAction}
                    width={247.4} 
                    titleFilter={'Діаметр'} 
                    contentInfo={'C'}>
                    { goodsTyre._diameter ? 
                        goodsTyre._diameter.map((diameterItem: any) => (
                    <SelectFilterList
                        key={diameterItem.diameter}
                        nameFilter={'Діаметр'}
                        value={diameterItem.diameter} 
                        items={diameterItem.diameter} 
                        checked={filter._diameter} 
                        onChange={handleChange} 
                        width={247.4}
                    />  )) : null
                    }
                </FilterMainBtn> 
                <Accordion titleName={"Сезон"}>
                    <span>Сезон:</span>
                    <CheckboxBtn value={'Zimnie'} titleCheckbox={'Зимові'} imageSrc={imageWinter}/>
                    <CheckboxBtn value={'Litni'} titleCheckbox={'Літні'} imageSrc={imageSummer}/>
                    <CheckboxBtn value={'Vsesezonni'} titleCheckbox={'Всесезонні'} imageSrc={imageAllSeason}/>
                    <p/>
                </Accordion>
                <Accordion titleName={"Шип / Не шип"}>
                    {goodsTyre._studded ? 
                        goodsTyre._studded.map(
                            (studdedItem: any, index: number) => (
                       <CheckboxBtn 
                        key={studdedItem.studded + index}
                        value={studdedItem.studded} 
                        titleCheckbox={studdedItem.studded.length === 0 ?
                            'не шип'
                            : studdedItem.studded} 
                        imageSrc={studdedItem.studded.length === 0 ?
                            './iconsSigns/imagesNoThorn_1_64.png' :
                            './iconsSigns/imagesThorn_1_64.png'
                        }
                        /> 
                       )) : null
                    }
                </Accordion>
                <FilterMainBtn 
                    filterState={filterState}
                    chipItem={filter._brands}
                    setFilterClick={setFilterAction}
                    width={247.4} 
                    titleFilter={'Бренд'} 
                    contentInfo={false}>
                    {goodsTyre._brands ? 
                        goodsTyre._brands.map((brandItem: any) => (
                     <CheckboxBtn
                        key={brandItem.brand}
                        value={brandItem.brand} 
                        titleCheckbox={brandItem.brand} 
                        imageSrc={undefined}
                    />  )) : null
                    }
                </FilterMainBtn>
                <PriceRange/>                
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
                    {goodsTyre._speed_index ? 
                        goodsTyre._speed_index.map((speedIndexItem: any) => (
                    <CheckboxBtn 
                        key={speedIndexItem.speed_index}
                        value={speedIndexItem.speed_index} 
                        titleCheckbox={speedIndexItem.speed_index_with_desc} 
                        imageSrc={'./iconsSigns/speed_limit_64.png'}
                    />  )) : null
                    }
                </Accordion>    
                <Accordion titleName={"Індекс навантаження"}>
                    {goodsTyre._load_index ? 
                        goodsTyre._load_index.map((loadIndexItem: any) => (
                    <CheckboxBtn 
                        key={loadIndexItem.load_index}
                        value={loadIndexItem.load_index} 
                        titleCheckbox={loadIndexItem.load_index_with_desc} 
                        imageSrc={'./iconsSigns/load_limit_1_64_empty.png'}
                    /> 
                    ))
                     : null
                    }
                </Accordion>
                <Accordion titleName={"Омологація"}>
                    {goodsTyre._homologation ? 
                        goodsTyre._homologation.map((homologationItem: any) => (
                    <CheckboxBtn 
                        key={homologationItem.homologation}
                        value={homologationItem.homologation} 
                        titleCheckbox={homologationItem.homologation} 
                        imageSrc={''}
                    /> 
                    ))
                     : null
                    }
                </Accordion>
                <Accordion titleName={"Run Flat"}>
                    {goodsTyre._run_flat ? 
                        goodsTyre._run_flat.map((runFlatItem: any) => (
                    <CheckboxBtn 
                        key={runFlatItem.run_flat}
                        value={runFlatItem.run_flat} 
                        titleCheckbox={runFlatItem.run_flat} 
                        imageSrc={''}
                    /> 
                    ))
                     : null
                    }
                </Accordion>
                <Accordion titleName={"Високонагруженість"}>
                    {goodsTyre._reinforced ? 
                        goodsTyre._reinforced.map((reinforceItem: any) => (
                    <CheckboxBtn 
                        key={reinforceItem.reinforce}
                        value={reinforceItem.reinforce} 
                        titleCheckbox={reinforceItem.reinforce} 
                        imageSrc={''}
                    /> 
                    ))
                     : null
                    }
                </Accordion>
            </div>       
        </div>
    );
});

export default FilterCatalogTyres;