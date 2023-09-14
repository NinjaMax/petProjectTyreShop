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
import { seasonCar, typeCar } from '../../../services/tyresPropsService';
import FilterMainBtnWheel from '../FIlterMainBtnWheel';
import { useParams } from 'react-router-dom';

interface IFilterMainWheels {
    handleChange?(args0: any): void;
    filterOpenCloseAction(args0: any): void;
    filterState: boolean;
}

const FilterMainWheel = observer((
    {filterState, filterOpenCloseAction}: IFilterMainWheels) => {

    //const [handleItem, setHandleItem] = useState();
    const {filter, goodsWheel, page} = useContext<any | null>(Context);
    const params = useParams<any>();
    const [stateWidth, setStateWidth]=useState(false);
    const [stateDiameter, setStateDiameter]=useState(false);
    const [stateBoltCount, setStateBoltCount]=useState(false);
    const [stateBrand, setStateBrand]=useState(false);
    const [stateType, setStateType]=useState(false);
    // const [stateColor, setStateColor]=useState(false);
    // const [stateDia, setStateDia]=useState(false);
    // const [stateEt, setStateEt]=useState(false);
    // const [statePcd, setStatePcd]=useState(false);
    // const [statePcd2, setStatePcd2]=useState(false);
    // const [stateBoltCountPcd, setStateBoltCountPcd]=useState(false);
    
    useEffect(() => {
        if(!filterState) {
            setStateWidth(false);
            setStateDiameter(false);
            setStateBrand(false);
            setStateBoltCount(false);
            setStateDiameter(false);
            setStateType(false);
            // setStateColor(false);
            // setStateDia(false);
            // setStateEt(false);
            // setStatePcd(false);
            // setStatePcd2(false);
            // setStateBoltCountPcd(false);
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
        if (e.target.name === 'Діаметр') {
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
        if (e.target.name === 'Кількість болтів' && e.target.checked) {
            page.setLoadMore(0);
            page.setOffset(0);
            filter.setChipBoltCount(
                Array.from(new Set([...filter.chipBoltCount, e.target.value]))
            );
            filter.setBoltCount(filter.chipBoltCount.join(','));     
        } else if (e.target.name === 'Кількість болтів') {
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
        // if (e.target.name === 'Колір' && e.target.checked) {
        //     page.setLoadMore(0);
        //     page.setOffset(0);
        //     filter.setChipColor(
        //         Array.from(
        //             new Set([...filter.chipColor, e.target.value]))
        //     );     
        // } else if (e.target.name === 'Колір') {
        //     const cancelStudded = filter.chipColor.findIndex(
        //         (item: string) => item === e.target.value);
        //     filter.removeChipColorItem(cancelStudded);
        //     filter.setChipColor(Array.from(
        //         new Set([...filter.chipColor])));
        // }
        // if (e.target.name === 'Діаметр ступиці' && e.target.checked) {
        //     page.setLoadMore(0);
        //     page.setOffset(0);
        //     filter.setChipDia(
        //         Array.from(
        //             new Set([...filter.chipDia, e.target.value]))
        //     );     
        // } else if (e.target.name === 'Діаметр ступиці') {
        //     const cancelSpeedIndex = filter.chipDia.findIndex(
        //         (item: string) => item === e.target.value);
        //     filter.removeChipDiaItem(cancelSpeedIndex);
        //     filter.setChipDia(Array.from(
        //         new Set([...filter.chipDia])));
        // }
        // if (e.target.name === 'Виліт ET' && e.target.checked) {
        //     page.setLoadMore(0);
        //     page.setOffset(0);
        //     filter.setChipEt(
        //         Array.from(
        //             new Set([...filter.chipEt, e.target.value]))
        //     );     
        // } else if (e.target.name === 'Виліт ET') {
        //     const cancelLoadIndex = filter.chipEt.findIndex(
        //         (item: string) => item === e.target.value);
        //     filter.removeChipEtItem(cancelLoadIndex);
        //     filter.setChipEt(Array.from(
        //         new Set([...filter.chipEt])));
        // }
        // if (e.target.name === 'Міжболтова відстань' && e.target.checked) {
        //     page.setLoadMore(0);
        //     page.setOffset(0);
        //     filter.setChipPcd(
        //         Array.from(
        //             new Set([...filter.chipPcd, e.target.value]))
        //     );     
        // } else if (e.target.name === 'Міжболтова відстань') {
        //     const cancelHomologation = filter.chipPcd.findIndex(
        //         (item: string) => item === e.target.value);
        //     filter.removeChipPcdItem(cancelHomologation);
        //     filter.setChipPcd(Array.from(
        //         new Set([...filter.chipPcd])));
        // }
        // if (e.target.name === 'Додаткове міжболтове PCD2' && e.target.checked) {
        //     page.setLoadMore(0);
        //     page.setOffset(0);
        //     filter.setChipPcd2(
        //         Array.from(
        //             new Set([...filter.chipPcd2, e.target.value]))
        //     );     
        // } else if (e.target.name === 'Додаткове міжболтове PCD2') {
        //     const cancelRunFlat = filter.chipPcd2.findIndex(
        //         (item: string) => item === e.target.value);
        //     filter.removeChipPcd2Item(cancelRunFlat);
        //     filter.setChipPcd2(Array.from(
        //         new Set([...filter.chipPcd2])));
        // }
        // if (e.target.name === 'Болти і відстань' && e.target.checked) {
        //     page.setLoadMore(0);
        //     page.setOffset(0);
        //     filter.setChipBoltCountPcd(
        //         Array.from(
        //             new Set([...filter.chipBoltCountPcd, e.target.value]))
        //     );     
        // } else if (e.target.name === 'Болти і відстань') {
        //     const cancelReinforced = filter.chipBoltCountPcd.findIndex(
        //         (item: string) => item === e.target.value);
        //     filter.removeChipBoltCountPcdItem(cancelReinforced);
        //     filter.setChipBoltCountPcd(Array.from(
        //         new Set([...filter.chipBoltCountPcd])));
        // }
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
        // if (e.target.getAttribute('data-name') === 'Колір') {
        //     page.setLoadMore(0);
        //     page.setOffset(0);
        //     filter.removechipColorItem(e.target.getAttribute('data-index'));
        //     filter.setChipColor(Array.from(
        //         new Set([...filter.chipColor])));
        //     filter.setColor(filter.chipColor.join(','));
        // }
        // if (e.target.getAttribute('data-name') === 'Діаметр ступиці') {
        //     page.setLoadMore(0);
        //     page.setOffset(0);
        //     filter.removeChipDiaItem(e.target.getAttribute('data-index'));
        //     filter.setChipDia(Array.from(
        //         new Set([...filter.chipDia])));
        //     filter.setDia(filter.chipDia.join(','));
        // }
        // if (e.target.getAttribute('data-name') === 'Виліт ET') {
        //     page.setLoadMore(0);
        //     page.setOffset(0);
        //     filter.removeChipEtItem(e.target.getAttribute('data-index'));
        //     filter.setChipEt(Array.from(
        //         new Set([...filter.chipEt])));
        //     filter.setEt(filter.chipEt.join(','));
        // }
        // if (e.target.getAttribute('data-name') === 'Міжболтова відстань') {
        //     page.setLoadMore(0);
        //     page.setOffset(0);
        //     filter.removeChipPcdItem(e.target.getAttribute('data-index'));
        //     filter.setChipPcd(Array.from(
        //         new Set([...filter.chipPcd])));
        //     filter.setPcd(filter.chipPcd.join(','));
        // }
        // if (e.target.getAttribute('data-name') === 'Додаткове міжболтове') {
        //     page.setLoadMore(0);
        //     page.setOffset(0);
        //     filter.removeChipPcd2Item(e.target.getAttribute('data-index'));
        //     filter.setChipPcd2(Array.from(
        //         new Set([...filter.chipPcd2])));
        //     filter.setPcd2(filter.chipPcd2.join(','));
        // }
        // if (e.target.getAttribute('data-name') === 'Болти і відстань') {
        //     page.setLoadMore(0);
        //     page.setOffset(0);
        //     filter.removeChipBoltCountPcdItem(e.target.getAttribute('data-index'));
        //     filter.setChipBoltCountPcd(Array.from(
        //         new Set([...filter.chipBoltCountPcd])));
        //     filter.setBoltCountPcd(filter.chipBoltCountPcd.join(','));
        // }
    }  
    // const filterBrandAdd = () => {
    //     filter.setBrands(filter.chipBrands.join(','));
    //     setStateBrand(!stateBrand);
    // }
    // const filterBoltCountAdd = () => {
    //     filter.setBoltCount(filter.chipBoltCount.join(','));
    //     setStateBoltCount(!stateBoltCount);
    // }
    // const filterTypeAdd = () => {
    //     filter.setType(filter.chipType.join(','));
    //     setStateType(!stateType);
    // }
    // const filterColorAdd = () => {
    //     filter.setColor(filter.chipColor.join(','));
    //     setStateColor(!stateColor);
    // }
    // const filterDiaAdd = () => {
    //     filter.setDia(filter.chipDia.join(','));
    //     setStateDia(!stateDia);
    // }
    // const filterEtAdd = () => {
    //     filter.setEt(filter.chipEt.join(','));
    //     setStateEt(!stateEt);
    // }
    // const filterPcdAdd = () => {
    //     filter.setPcd(filter.chipPcd.join(','));
    //     setStatePcd(!statePcd);
    // }
    // const filterPcd2Add = () => {
    //     filter.setPcd2(filter.chipPcd2.join(','));
    //     setStatePcd2(!statePcd2);
    // }
    // const filterBoltCountPcddAdd = () => {
    //     filter.setBoltCountPcd(filter.chipBoltCountPcd.join(','));
    //     setStateBoltCountPcd(!stateBoltCountPcd);
    // }
    // const filterPriceAdd = () => {
    //     filter.setPrice(filter.chipPrice.join(','));
    // }

    // const filterPriceRange = (e: any) => {
    //     if (e.target.name === 'vid') {
    //         filter.addFirstPrice(e.target.value);
    //         filter.setChipPrice(filter._chipPrice);
    //     } 
    //     if (e.target.name === 'do') {
    //         filter.addLastPrice(e.target.value);
    //         filter.setChipPrice(filter._chipPrice);
    //     }
    // }

    const filterWidthClick = () => {

        setStateWidth(!stateWidth);
        filterOpenCloseAction(!filterState);
        setStateBoltCount(false);
        setStateBrand(false);
        //setStateHeight(false);
        setStateDiameter(false);
        // setStatePcd(false);
        // setStateEt(false);
        // setStateDia(false);
        // setStatePcd2(false);
        // setStateBoltCountPcd(false);
        setStateType(false);
        // setStateColor(false);
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
        filterOpenCloseAction(!filterState);
        setStateBoltCount(false);
        setStateBrand(false);
        setStateWidth(false);
        //setStateHeight(false);
        // setStatePcd(false);
        // setStateEt(false);
        // setStateDia(false);
        // setStatePcd2(false);
        // setStateBoltCountPcd(false);
        setStateType(false);
        // setStateColor(false);
    }
    // const filterColorClick = () => {
    //     setStateBoltCount(!stateBoltCount);
    //     setStateBrand(false);
    //     setStateWidth(false);
    //     //setStateHeight(false);
    //     setStateDiameter(false);
    //     setStatePcd(false);
    //     setStateEt(false);
    //     setStateDia(false);
    //     setStatePcd2(false);
    //     setStateBoltCountPcd(false);
    //     setStateType(false);
    //     //setStateColor(false);
    // }
    const filterBoltCountClick = () => {
        //setStateColor(!stateColor);
        filterOpenCloseAction(!filterState);
        setStateBoltCount(!stateBoltCount);
        setStateBrand(false);
        setStateWidth(false);
        //setStateHeight(false);
        setStateDiameter(false);
        // setStatePcd(false);
        // setStateEt(false);
        // setStateDia(false);
        // setStatePcd2(false);
        // setStateBoltCountPcd(false);
        setStateType(false);
    }
    const filterBrandClick = () => {
        setStateBoltCount(false);
        setStateBrand(!stateBrand);
        filterOpenCloseAction(!filterState);
        setStateWidth(false);
        //setStateHeight(false);
        setStateDiameter(false);
        // setStatePcd(false);
        // setStateEt(false);
        // setStateDia(false);
        // setStatePcd2(false);
        // setStateBoltCountPcd(false);
        setStateType(false);
        // setStateColor(false);
    }
    const filterTypeClick = () => {
        setStateType(!stateType);
        filterOpenCloseAction(!filterState);
        setStateBoltCount(false);
        setStateBrand(false);
        setStateWidth(false);
        //setStateHeight(false);
        setStateDiameter(false);
        // setStatePcd(false);
        // setStateEt(false);
        // setStateDia(false);
        // setStatePcd2(false);
        // setStateBoltCountPcd(false);
        // setStateColor(false);
    }
    // const filterDiaClick = () => {
    //     setStateDia(!stateDia);
    //     setStateBoltCount(false);
    //     setStateBrand(false);
    //     setStateWidth(false);
    //     //setStateHeight(false);
    //     setStateDiameter(false);
    //     setStatePcd(false);
    //     setStateEt(false);
    //     setStatePcd2(false);
    //     setStateBoltCountPcd(false);
    //     setStateType(false);
    //     setStateColor(false);
    // }
    // const filterEtClick = () => {
    //     setStateEt(!stateEt);
    //     setStateBoltCount(false);
    //     setStateBrand(false);
    //     setStateWidth(false);
    //     //setStateHeight(false);
    //     setStateDiameter(false);
    //     setStatePcd(false);
    //     setStateDia(false);
    //     setStatePcd2(false);
    //     setStateBoltCountPcd(false);
    //     setStateType(false);
    //     setStateColor(false);
    // }
    // const filterPcdClick = () => {
    //     setStatePcd(!statePcd);
    //     setStateBoltCount(false);
    //     setStateBrand(false);
    //     setStateWidth(false);
    //     //setStateHeight(false);
    //     setStateDiameter(false);
    //     setStateEt(false);
    //     setStateDia(false);
    //     setStatePcd2(false);
    //     setStateBoltCountPcd(false);
    //     setStateType(false);
    //     setStateColor(false);
    // }
    // const filterPcd2Click = () => {
    //     setStatePcd2(!statePcd2);
    //     setStateBoltCount(false);
    //     setStateBrand(false);
    //     setStateWidth(false);
    //     //setStateHeight(false);
    //     setStateDiameter(false);
    //     setStatePcd(false);
    //     setStateEt(false);
    //     setStateDia(false);
    //     setStateBoltCountPcd(false);
    //     setStateType(false);
    //     setStateColor(false);
    // }
    // const filterBoltCountPcdClick = () => {
    //     setStateBoltCountPcd(!stateBoltCountPcd);
    //     setStateBoltCount(false);
    //     setStateBrand(false);
    //     setStateWidth(false);
    //     //setStateHeight(false);
    //     setStateDiameter(false);
    //     setStatePcd(false);
    //     setStateEt(false);
    //     setStateDia(false);
    //     setStatePcd2(false);
    //     setStateType(false);
    //     setStateColor(false);
    // }

    const pickUp = () => {
 
        localStorage.setItem('filterWheelUrl', `${filter.type},${filter.brands},${filter.width},${filter.bolt_count},${filter.diameter}`);

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
                titleFilter={'Кількість болтів'}
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
                        titleName={'Кількість болтів'}
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
                titleFilter={'Діаметр'} 
                contentInfo={false}>
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
                    imageSrc={typeCar(vehicleItem)}/>
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
                    props={'ПІДІБРАТИ'}
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