import React, {useContext, useEffect, useState} from 'react';
import '../../../css/FilterMain/FilterMainTyres/FilterMainTyre.css';
import imageThorn from '../../../assets/icons/imagesThorn_1.png';
import FilterMainBtn from '../FilterMainBtn';
import ButtonAction from '../../buttons/ButtonAction';
import CheckboxBtn from '../../select/CheckboxBtn';
import SelectFilterList from '../../select/SelectFilterList';
import SelectFilter from '../../select/SelectFilter';
import { Context } from '../../../context/Context';
import { observer } from 'mobx-react-lite';
import { seasonCar } from '../../../services/tyresPropsService';

interface IFilterMainTyres {
    handleChange?(args0: any): void;
    filterOpenCloseAction(args0: any): void;
    filterState: boolean;
}

const FilterMainTyre = observer((
    {filterState, filterOpenCloseAction}: IFilterMainTyres) => {
    const {filter, goodsTyre, page} = useContext<any | null>(Context);
    //const [handleItem, setHandleItem] = useState();

    const [stateWidth, setStateWidth]=useState(false);
    const [stateHeight, setStateHeight]=useState(false);
    const [stateDiameter, setStateDiameter]=useState(false);
    const [stateBrand, setStateBrand]=useState(false);
    const [stateSeason, setStateSeason]=useState(false);

    useEffect(() => {
        if(!filterState) {
            setStateWidth(false);
            setStateSeason(false);
            setStateBrand(false);
            setStateHeight(false);
            setStateDiameter(false);
        }
    },[filterState])

    const handleChange = (e: any) => {
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
        // if (e.target.name === 'Тип авто' && e.target.checked) {
        //     page.setLoadMore(0);
        //     page.setOffset(0);
        //     filter.setChipVehicleType(
        //         Array.from(
        //             new Set([...filter.chipVehicleType, e.target.value]))
        //     );     
        // } else if (e.target.name === 'Тип авто') {
        //     const cancelVehicleType = filter.chipVehicleType.findIndex(
        //         (item: string) => item === e.target.value);
        //     filter.removeChipVehicleTypeItem(cancelVehicleType);
        //     filter.setChipVehicleType(Array.from(
        //         new Set([...filter.chipVehicleType])));
        // }
        // if (e.target.name === 'Шип / Не шип' && e.target.checked) {
        //     page.setLoadMore(0);
        //     page.setOffset(0);
        //     filter.setChipStudded(
        //         Array.from(
        //             new Set([...filter.chipStudded, e.target.value]))
        //     );     
        // } else if (e.target.name === 'Шип / Не шип') {
        //     const cancelStudded = filter.chipStudded.findIndex(
        //         (item: string) => item === e.target.value);
        //     filter.removeChipStuddedItem(cancelStudded);
        //     filter.setChipStudded(Array.from(
        //         new Set([...filter.chipStudded])));
        // }
        // if (e.target.name === 'Індекс швидкості' && e.target.checked) {
        //     page.setLoadMore(0);
        //     page.setOffset(0);
        //     filter.setChipSpeedIndex(
        //         Array.from(
        //             new Set([...filter.chipSpeedIndex, e.target.value]))
        //     );     
        // } else if (e.target.name === 'Індекс швидкості') {
        //     const cancelSpeedIndex = filter.chipSpeedIndex.findIndex(
        //         (item: string) => item === e.target.value);
        //     filter.removeChipSpeedIndexItem(cancelSpeedIndex);
        //     filter.setChipSpeedIndex(Array.from(
        //         new Set([...filter.chipSpeedIndex])));
        // }
        // if (e.target.name === 'Індекс навантаження' && e.target.checked) {
        //     page.setLoadMore(0);
        //     page.setOffset(0);
        //     filter.setChipLoadIndex(
        //         Array.from(
        //             new Set([...filter.chipLoadIndex, e.target.value]))
        //     );     
        // } else if (e.target.name === 'Індекс навантаження') {
        //     const cancelLoadIndex = filter.chipLoadIndex.findIndex(
        //         (item: string) => item === e.target.value);
        //     filter.removeChipLoadIndexItem(cancelLoadIndex);
        //     filter.setChipLoadIndex(Array.from(
        //         new Set([...filter.chipLoadIndex])));
        // }
        // if (e.target.name === 'Омологація' && e.target.checked) {
        //     page.setLoadMore(0);
        //     page.setOffset(0);
        //     filter.setChipHomologation(
        //         Array.from(
        //             new Set([...filter.chipHomologation, e.target.value]))
        //     );     
        // } else if (e.target.name === 'Омологація') {
        //     const cancelHomologation = filter.chipHomologation.findIndex(
        //         (item: string) => item === e.target.value);
        //     filter.removeChipHomologationItem(cancelHomologation);
        //     filter.setChipHomologation(Array.from(
        //         new Set([...filter.chipHomologation])));
        // }
        // if (e.target.name === 'Run Flat' && e.target.checked) {
        //     page.setLoadMore(0);
        //     page.setOffset(0);
        //     filter.setChipRunFlat(
        //         Array.from(
        //             new Set([...filter.chipRunFlat, e.target.value]))
        //     );     
        // } else if (e.target.name === 'Run Flat') {
        //     const cancelRunFlat = filter.chipRunFlat.findIndex(
        //         (item: string) => item === e.target.value);
        //     filter.removeChipRunFlatItem(cancelRunFlat);
        //     filter.setChipRunFlat(Array.from(
        //         new Set([...filter.chipRunFlat])));
        // }
        // if (e.target.name === 'Високонагруженість' && e.target.checked) {
        //     page.setLoadMore(0);
        //     page.setOffset(0);
        //     filter.setChipReinforced(
        //         Array.from(
        //             new Set([...filter.chipReinforced, e.target.value]))
        //     );     
        // } else if (e.target.name === 'Високонагруженість') {
        //     const cancelReinforced = filter.chipReinforced.findIndex(
        //         (item: string) => item === e.target.value);
        //     filter.removeChipReinforcedItem(cancelReinforced);
        //     filter.setChipReinforced(Array.from(
        //         new Set([...filter.chipReinforced])));
        // }
    } 
    
    const handleDeleteChange = (e: any) => {
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
        // if (e.target.getAttribute('data-name') === 'Тип авто') {
        //     page.setLoadMore(0);
        //     page.setOffset(0);
        //     filter.removeChipVehicleTypeItem(e.target.getAttribute('data-index'));
        //     filter.setChipVehicleType(Array.from(
        //         new Set([...filter.chipVehicleType])));
        //     filter.setVehicleType(filter.chipVehicleType.join(','));
        // }
        // if (e.target.getAttribute('data-name') === 'Шип / Не шип') {
        //     page.setLoadMore(0);
        //     page.setOffset(0);
        //     filter.removeChipStuddedItem(e.target.getAttribute('data-index'));
        //     filter.setChipStudded(Array.from(
        //         new Set([...filter.chipStudded])));
        //     filter.setStudded(filter.chipStudded.join(','));
        // }
        // if (e.target.getAttribute('data-name') === 'Індекс швидкості') {
        //     page.setLoadMore(0);
        //     page.setOffset(0);
        //     filter.removeChipSpeedIndexItem(e.target.getAttribute('data-index'));
        //     filter.setChipSpeedIndex(Array.from(
        //         new Set([...filter.chipSpeedIndex])));
        //     filter.setSpeedIndex(filter.chipSpeedIndex.join(','));
        // }
        // if (e.target.getAttribute('data-name') === 'Індекс навантаження') {
        //     page.setLoadMore(0);
        //     page.setOffset(0);
        //     filter.removeChipLoadIndexItem(e.target.getAttribute('data-index'));
        //     filter.setChipLoadIndex(Array.from(
        //         new Set([...filter.chipLoadIndex])));
        //     filter.setLoadIndex(filter.chipLoadIndex.join(','));
        // }
        // if (e.target.getAttribute('data-name') === 'Омологація') {
        //     page.setLoadMore(0);
        //     page.setOffset(0);
        //     filter.removeChipHomologationItem(e.target.getAttribute('data-index'));
        //     filter.setChipHomologation(Array.from(
        //         new Set([...filter.chipHomologation])));
        //     filter.setHomologation(filter.chipHomologation.join(','));
        // }
        // if (e.target.getAttribute('data-name') === 'Run Flat') {
        //     page.setLoadMore(0);
        //     page.setOffset(0);
        //     filter.removeChipRunFlatItem(e.target.getAttribute('data-index'));
        //     filter.setChipRunFlat(Array.from(
        //         new Set([...filter.chipRunFlat])));
        //     filter.setRunFlat(filter.chipRunFlat.join(','));
        // }
        // if (e.target.getAttribute('data-name') === 'Високонагруженість') {
        //     page.setLoadMore(0);
        //     page.setOffset(0);
        //     filter.removeChipReinforcedItem(e.target.getAttribute('data-index'));
        //     filter.setChipReinforced(Array.from(
        //         new Set([...filter.chipReinforced])));
        //     filter.setReinforced(filter.chipReinforced.join(','));
        // }
    }  
    // const filterBrandAdd = () => {
    //     filter.setBrands(filter.chipBrands.join(','));
    //     setStateBrand(!stateBrand);
    // }
    // const filterSeasonAdd = () => {
    //     filter.setSeason(filter.chipSeason.join(','));
    //     setStateSeason(!stateSeason);
    // }

    const filterWidthClick = () => {
        filterOpenCloseAction(!filterState);
        setStateWidth(!stateWidth);
        setStateSeason(false);
        setStateBrand(false);
        setStateHeight(false);
        setStateDiameter(false);
    }
    const filterHeightClick = () => {
        filterOpenCloseAction(!filterState);
        setStateHeight(!stateHeight);
        setStateSeason(false);
        setStateBrand(false);
        setStateWidth(false);
        setStateDiameter(false);
    }
    const filterDiameterClick = () => {
        filterOpenCloseAction(!filterState);
        setStateDiameter(!stateDiameter);
        setStateSeason(false);
        setStateBrand(false);
        setStateWidth(false);
        setStateHeight(false);
    }
    const filterSeasonClick = () => {
        filterOpenCloseAction(!filterState);
        setStateSeason(!stateSeason);
        setStateBrand(false);
        setStateWidth(false);
        setStateHeight(false);
        setStateDiameter(false);
    }

    const filterBrandClick = () => {
        filterOpenCloseAction(!filterState);
        setStateBrand(!stateBrand);
        setStateSeason(false);
        setStateWidth(false);
        setStateHeight(false);
        setStateDiameter(false);
    }

    // const handleChange = (e: any) => {
        
    //     setHandleItem(e.currentTarget.value);
    // } 

    // const filterClose = (e: any) => {
    //     console.log('filter_close')
    // }
    
    return (
        <div className='filterMain'>
            <FilterMainBtn 
                width={150} 
                titleFilter={'Ширина'}
                contentInfo={false}
                filterAction={filterWidthClick}
                filterState={stateWidth}
                chipItem={filter._width}
                deleteChip={handleDeleteChange}
            >
            { goodsTyre._width ? 
                goodsTyre._width.map((widthItem: any) => (
                <SelectFilterList 
                    key={widthItem}
                    nameFilter={'Ширина'}
                    value={widthItem} 
                    items={widthItem} 
                    checked={filter._width} 
                    onChange={handleChange} 
                    width={150}
                /> 
                )) 
            : null
            }
            </FilterMainBtn>
            <FilterMainBtn 
                width={150} 
                titleFilter={'Профіль'}
                contentInfo={false}
                filterAction={filterHeightClick}
                filterState={stateHeight}
                chipItem={filter._height}
                deleteChip={handleDeleteChange}
            >
            {goodsTyre._height ? 
                goodsTyre._height.map((heightItem: any) => (
                <SelectFilterList
                    key={heightItem === '' || 'undefined' ? heightItem + 1 : heightItem}
                    nameFilter={'Профіль'}
                    value={heightItem === '' || undefined ? '0' : heightItem}
                    items={heightItem === '' || undefined ? '0' : heightItem}
                    checked={filter._height}
                    onChange={handleChange}
                    width={150}
                 /> 
                )) 
            : null  
            }
            </FilterMainBtn>
            <FilterMainBtn 
                width={150} 
                titleFilter={'Діаметр'}
                filterAction={filterDiameterClick}
                filterState={stateDiameter}
                chipItem={filter._diameter}
                deleteChip={handleDeleteChange}
                contentInfo={false}
            >
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
                    width={150}
                />  
                )) 
            : null
            }
            </FilterMainBtn> 
            <FilterMainBtn 
                width={150}
                titleFilter={'Сезон'}
                contentInfo={false}
                chipItem={filter.chipSeason}
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
            </FilterMainBtn> 
            <FilterMainBtn 
                width={150} 
                titleFilter={'Бренд'}
                contentInfo={false}
                filterAction={filterBrandClick}
                filterState={stateBrand}
                chipItem={filter.chipBrands}
                deleteChip={handleDeleteChange}
            >
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
                />  
                )) 
            : null
            }
            </FilterMainBtn>
            <div className='btnSelect'>
                <ButtonAction props={'ПІДІБРАТИ'} />
            </div>
            {/* <CheckboxBtn 
                value={"ship"} 
                onChange={handleChange}
                titleCheckbox={"Шип"} 
                imageSrc={imageThorn}
            /> */}
        </div>
    );
});

export default FilterMainTyre;