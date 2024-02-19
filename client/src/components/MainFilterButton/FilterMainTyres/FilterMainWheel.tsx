import {useContext, useEffect, useState} from 'react';
import '../../../css/FilterMain/FilterMainTyres/FilterMainTyre.css';
import FilterMainBtn from '../FilterMainBtn';
import ButtonAction from '../../buttons/ButtonAction';
import CheckboxBtn from '../../select/CheckboxBtn';
import SelectFilterList from '../../select/SelectFilterList';
import { Context } from '../../../context/Context';
import { observer } from 'mobx-react-lite';
import FilterMainBtnWheel from '../FIlterMainBtnWheel';
import { useTranslation } from 'react-i18next';
import { typeWheelsMainG } from '../../../services/wheelsProps.service';

interface IFilterMainWheels {
    handleChange?(args0: any): void;
    filterOpenCloseAction(args0: any): void;
    filterState: boolean;
}

const FilterMainWheel = observer((
    {filterState, filterOpenCloseAction}: IFilterMainWheels) => {
    const {filter, goodsWheel, page} = useContext<any | null>(Context);
    const [stateWidth, setStateWidth]=useState(false);
    const [stateDiameter, setStateDiameter]=useState(false);
    const [stateBoltCount, setStateBoltCount]=useState(false);
    const [stateBrand, setStateBrand]=useState(false);
    const [stateType, setStateType]=useState(false);
    const { t } = useTranslation();
    
    useEffect(() => {
        if(!filterState) {
            setStateWidth(false);
            setStateDiameter(false);
            setStateBrand(false);
            setStateBoltCount(false);
            setStateDiameter(false);
            setStateType(false);
        }
    },[filterState])

    const handleChange  = (e: any) => {
        if (e.target.name === 'Ширина') {
            page.setLoadMore(0);
            page.setOffset(0);
            filter.setWidth(e.target.value);
            setStateWidth(!stateWidth);
            filterOpenCloseAction(!filterState);
        }
        if (e.target.name === t('filterMainWheel.filter_diameter_title')) {
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
                new Set([...filter.chipBrands]))
            );
            filter.setBrands(filter.chipBrands.join(',')); 
        }
        if (e.target.name === t('filterMainWheel.filter_boltCount_title') && e.target.checked) {
            page.setLoadMore(0);
            page.setOffset(0);
            filter.setChipBoltCount(
                Array.from(new Set([...filter.chipBoltCount, e.target.value]))
            );
            filter.setBoltCount(filter.chipBoltCount.join(','));     
        } else if (e.target.name === t('filterMainWheel.filter_boltCount_title')) {
            const cancelSeason = filter.chipBoltCount.findIndex(
                (item: string) => item === e.target.value);
            filter.removeChipBoltCountdItem(cancelSeason);
            filter.setChipBoltCount(Array.from(new Set([...filter.chipBoltCount]))
            );
            filter.setBoltCount(filter.chipBoltCount.join(','));
        }
        if (e.target.name === 'Тип диска' && e.target.checked) {
            page.setLoadMore(0);
            page.setOffset(0);
            filter.setChipType(
                Array.from(new Set([...filter.chipType, e.target.value]))
            ); 
            filter.setType(filter.chipType.join(','));    
        } else if (e.target.name === 'Тип диска') {
            const cancelVehicleType = filter.chipType.findIndex(
                (item: string) => item === e.target.value);
            filter.removeChipTypeItem(cancelVehicleType);
            filter.setChipType(Array.from(new Set([...filter.chipType]))
            );
            filter.setType(filter.chipType.join(','));
        }
    } 
    
    const handleDeleteChange  = (e: any) => {
        if (e.target.getAttribute('data-name') === 'Ширина') {
            page.setLoadMore(0);
            page.setOffset(0);
            filter.setWidth(null);
        }
        if (e.target.getAttribute('data-name') === t('filterMainWheel.filter_diameter_title')) {
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
        if (e.target.getAttribute('data-name') === t('filterMainWheel.filter_boltCount_title')) {
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
    }  

    const filterWidthClick = () => {

        setStateWidth(!stateWidth);
        filterOpenCloseAction(!filterState);
        setStateBoltCount(false);
        setStateBrand(false);
        setStateDiameter(false);
        setStateType(false);
    }
    const filterDiameterClick = () => {
        setStateDiameter(!stateDiameter);
        filterOpenCloseAction(!filterState);
        setStateBoltCount(false);
        setStateBrand(false);
        setStateWidth(false);
        setStateType(false);
    }

    const filterBoltCountClick = () => {
        filterOpenCloseAction(!filterState);
        setStateBoltCount(!stateBoltCount);
        setStateBrand(false);
        setStateWidth(false);
        setStateDiameter(false);
        setStateType(false);
    }
    const filterBrandClick = () => {
        setStateBoltCount(false);
        setStateBrand(!stateBrand);
        filterOpenCloseAction(!filterState);
        setStateWidth(false);
        setStateDiameter(false);
        setStateType(false);
    }
    const filterTypeClick = () => {
        setStateType(!stateType);
        filterOpenCloseAction(!filterState);
        setStateBoltCount(false);
        setStateBrand(false);
        setStateWidth(false);
        setStateDiameter(false);
    }

    const pickUp = () => {
 
        localStorage.setItem('filterWheelUrl', `${filter.type}/${filter.brands}/${filter.width}/${filter.bolt_count}/${filter.diameter}`);
        document.location.assign('/wheels');
    };
    
    return (
        <div className='filterMain'>
            <FilterMainBtnWheel 
                filterAction={filterWidthClick}
                filterState={stateWidth}
                chipItem={filter._width}
                deleteChip={handleDeleteChange}
                width={180} 
                titleFilter={'Ширина'} 
                contentInfo={false}
            >
                { goodsWheel._width ? 
                    goodsWheel._width.map((widthItem: any) => (
                <SelectFilterList 
                    key={widthItem}
                    nameFilter={'Ширина'}
                    value={widthItem} 
                    items={widthItem} 
                    checked={filter._width} 
                    onChange={handleChange} 
                    width={180}
                /> 
                )) : null
                }
            </FilterMainBtnWheel>
            <FilterMainBtn 
                width={180} 
                titleFilter={t('filterMainWheel.filter_boltCount_title')}
                contentInfo={false}
                filterAction={filterBoltCountClick}
                filterState={stateBoltCount}
                chipItem={filter.chipBoltCount}
                deleteChip={handleDeleteChange}
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
                        titleName={t('filterMainWheel.filter_boltCount_title')}
                        titleCheckbox={color} 
                        //imageSrc={seasonCar(color)}
                    />
                    )): null  
                }
                <p/>
            </FilterMainBtn>
            <FilterMainBtnWheel 
                filterAction={filterDiameterClick}
                filterState={stateDiameter}
                chipItem={filter._diameter}
                deleteChip={handleDeleteChange}
                width={180} 
                titleFilter={t('filterMainWheel.filter_diameter_title')} 
                contentInfo={false}>
                { goodsWheel._diameter ? 
                    goodsWheel._diameter.map(
                    (diameterItem: any) => (
                    <SelectFilterList
                        key={diameterItem}
                        nameFilter={t('filterMainWheel.filter_diameter_title')}
                        value={diameterItem} 
                        items={diameterItem} 
                        checked={filter._diameter} 
                        onChange={handleChange} 
                        width={180}
                    />  
                    )) : null
                }
                </FilterMainBtnWheel>
            <FilterMainBtnWheel 
                width={180}
                titleFilter={'Тип диска'}
                contentInfo={false}
                chipItem={filter.chipType}
                deleteChip={handleDeleteChange}
                filterAction={filterTypeClick}
                filterState={stateType}
            >
            <span>Тип диска:</span>
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
                    imageSrc={typeWheelsMainG(vehicleItem)}/>
                    )) : null
                }
            <p/>
            </FilterMainBtnWheel> 
            <FilterMainBtnWheel 
                filterAction={filterBrandClick}
                filterState={stateBrand}
                chipItem={filter.chipBrands}
                deleteChip={handleDeleteChange}
                width={180} 
                titleFilter={'Бренд'} 
                contentInfo={false}
            >
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
                />  )) 
            : null
            }
            </FilterMainBtnWheel>
            <div className='btnSelect'>
                <ButtonAction 
                    props={t('filterMainWheel.filter_btn_name')}
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

export default FilterMainWheel;