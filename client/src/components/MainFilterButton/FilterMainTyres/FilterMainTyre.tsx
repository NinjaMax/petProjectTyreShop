import React, {useContext, useEffect, useState} from 'react';
import '../../../css/FilterMain/FilterMainTyres/FilterMainTyre.css';
import FilterMainBtn from '../FilterMainBtn';
import ButtonAction from '../../buttons/ButtonAction';
import CheckboxBtn from '../../select/CheckboxBtn';
import SelectFilterList from '../../select/SelectFilterList';
import { Context } from '../../../context/Context';
import { observer } from 'mobx-react-lite';
import { seasonCarMainG } from '../../../services/tyresPropsService';
import { useTranslation } from 'react-i18next';

interface IFilterMainTyres {
    handleChange?(args0: any): void;
    filterOpenCloseAction(args0: any): void;
    filterState: boolean;
}

const FilterMainTyre = observer((
    {filterState, filterOpenCloseAction}: IFilterMainTyres) => {
    const {filter, goodsTyre, page} = useContext<any | null>(Context);
    const [stateWidth, setStateWidth]=useState<boolean>(false);
    const [stateHeight, setStateHeight]=useState<boolean>(false);
    const [stateDiameter, setStateDiameter]=useState<boolean>(false);
    const [stateBrand, setStateBrand]=useState<boolean>(false);
    const [stateSeason, setStateSeason]=useState<boolean>(false);
    const { t, i18n } = useTranslation();

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
            //console.log('ID', e.target.id);
            page.setLoadMore(0);
            page.setOffset(0);
            filter.setWidth(e.target.value);
            //filter.setWidth_id(idProperty);
            setStateWidth(!stateWidth);
            filterOpenCloseAction(!filterState);
        }
        if (e.target.name === t('filterMainTyre.filter_height_title')) {
            page.setLoadMore(0);
            page.setOffset(0);
            filter.setHeight(e.target.value);
            setStateHeight(!stateHeight);
            filterOpenCloseAction(!filterState);
        }
        if (e.target.name === t('filterMainTyre.filter_diameter_title')) {
            page.setLoadMore(0);
            page.setOffset(0);
            filter.setDiameter(e.target.value);
            setStateDiameter(!stateDiameter);
            filterOpenCloseAction(!filterState);
        }
        if (e.target.name === 'Бренд' && e.target.checked) {
            page.setLoadMore(0);
            page.setOffset(0);
            filter.setChipBrands(
                Array.from(
                    new Set([...filter.chipBrands, e.target.value]))
            );   
            filter.setBrands(filter.chipBrands.join(','));   
        } else if (e.target.name === 'Бренд') {
            const cancelBrand = filter.chipBrands.findIndex(
                (item: string) => item === e.target.value);
            filter.removeChipBrandsItem(cancelBrand);
            filter.setChipBrands(Array.from(
                //new Set([...filter.brandSearch])));
                new Set([...filter.chipBrands])));
            filter.setBrands(filter.chipBrands.join(','));  
        }
        if (e.target.name === 'Сезон' && e.target.checked) {
            page.setLoadMore(0);
            page.setOffset(0);
            filter.setChipSeason(
                Array.from(
                    new Set([...filter.chipSeason, e.target.value]))
            );  
            filter.setSeason(filter.chipSeason.join(','));
           //setStateSeason(!stateSeason);   
        } else if (e.target.name === 'Сезон') {
            const cancelSeason = filter.chipSeason.findIndex(
                (item: string) => item === e.target.value);
            filter.removeChipSeasonItem(cancelSeason);
            filter.setChipSeason(Array.from(
                //new Set([...goodsTyre._season])));
                new Set([...filter.chipSeason])));
            filter.setSeason(filter.chipSeason.join(','));
        }
    } 
    
    const handleDeleteChange = (e: any) => {
        if (e.target.getAttribute('data-name') === 'Ширина') {
            page.setLoadMore(0);
            page.setOffset(0);
            filter.setWidth(null);
            filter.setWidth_id(null);
        }
        if (e.target.getAttribute('data-name') === t('filterMainTyre.filter_height_title')) {
            page.setLoadMore(0);
            page.setOffset(0);
            filter.setHeight(null);
        }
        if (e.target.getAttribute('data-name') === t('filterMainTyre.filter_diameter_title')) {
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
    }  

    const filterWidthClick = () => {
        filterOpenCloseAction(!filterState);
        setStateWidth(!stateWidth);
    }
    const filterHeightClick = () => {
        filterOpenCloseAction(!filterState);
        setStateHeight(!stateHeight);
    }
    const filterDiameterClick = () => {
        filterOpenCloseAction(!filterState);
        setStateDiameter(!stateDiameter);
    }
    const filterSeasonClick = () => {
        filterOpenCloseAction(!filterState);
        setStateSeason(!stateSeason);
    }

    const filterBrandClick = () => {
        
        filterOpenCloseAction(!filterState);
        setStateBrand(!stateBrand);
    }

    const pickUp = () => {
        //localStorage.removeItem('filterTyreUrl');
        localStorage.setItem('filterTyreUrl', `${filter.season}/${filter.brands}/${filter.width}/${filter.height}/${filter.diameter}`);
        document.location.assign('/tyres');
    };
    
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
                goodsTyre._width.map((widthItem:any) => (
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
                titleFilter={t('filterMainTyre.filter_height_title')}
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
                    nameFilter={t('filterMainTyre.filter_height_title')}
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
                titleFilter={t('filterMainTyre.filter_diameter_title')}
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
                    nameFilter={t('filterMainTyre.filter_diameter_title')}
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
                    imageSrc={seasonCarMainG(seasonItem)}/>
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
                <ButtonAction 
                    props={t('filterMainTyre.filter_btn_name')} 
                    eventItem={pickUp}
                />
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