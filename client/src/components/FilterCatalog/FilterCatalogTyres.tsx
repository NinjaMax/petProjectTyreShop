import {useContext, useEffect, useState} from 'react';
import '../../css/FilterCatatogCss/FilterCatalogTyres.css';
import FilterMainBtn from '../mainFilterButton/FilterMainBtn';
import CheckboxBtn from '../select/CheckboxBtn';
import Accordion from './Accordion';
import SelectFilterList from '../select/SelectFilterList';
import PriceRange from './PriceRange';
import { Context } from '../../context/Context';
import { observer } from 'mobx-react-lite';
import { seasonCar, typeCar } from '../../services/tyresPropsService';
import { useHistory, useParams } from 'react-router-dom';
import { createStringUrl } from '../../services/stringUrl';
import { homologationByCar } from '../../services/homologation';
import { CATALOG_TYRES_ROUTE } from '../../utils/consts';
import { useMediaQuery } from 'react-responsive';
import { useTranslation } from 'react-i18next';

interface IFilterCatTyres {
    handleChange?(args0: any): void;
    setFilterAction(args0: any): void;
    filterState: boolean;
}

const FilterCatalogTyres = observer((
    {filterState, setFilterAction}: IFilterCatTyres) => {
    const {filter, goodsTyre, page} = useContext<any | null>(Context);
    const [stateWidth, setStateWidth]=useState<boolean>(false);
    const [stateHeight, setStateHeight]=useState<boolean>(false);
    const [stateDiameter, setStateDiameter]=useState<boolean>(false);
    const [stateBrand, setStateBrand]=useState<boolean>(false);
    const [stateSeason, setStateSeason]=useState<boolean>(false);
    const [stateVehicleType, setStateVehicleType]=useState<boolean>(false);
    const [stateStudded, setStateStudded]=useState<boolean>(false);
    const [stateSpeedIndex, setStateSpeedIndex]=useState<boolean>(false);
    const [stateLoadIndex, setStateLoadIndex]=useState<boolean>(false);
    const [stateHomologation, setStateHomologation]=useState<boolean>(false);
    const [stateRunFlat, setStateRunFlat]=useState<boolean>(false);
    const [stateReinforced, setStateReinforced]=useState<boolean>(false);
    const [isOpenFilter, setIsOpenFilter]=useState<boolean>(false);
    const isMobileFilterTyre = useMediaQuery({ query: '(max-width: 1075px)' });
    const { t } = useTranslation();
    const params = useParams<any>();
    const history = useHistory();

    useEffect(() => {
        if(!filterState) {
            setStateWidth(false);
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
    },[filterState])

    const handleChange = (e: any) => {
        if (e.target.name === 'Ширина') {
            filter.setWidth(e.target.value);
            filter.setChipWidth(
                Array.from(
                    new Set([...filter.chipWidth, e.target.value]))
            );
            setStateWidth(!stateWidth);
            setFilterAction(!filterState);
            page.setLoadMore(0);
            page.setOffset(0);
        }
        if (e.target.name === t('filterCatalogTyre.filter_height_title')) {
            filter.setHeight(e.target.value);
            filter.setChipHeight(
                Array.from(
                    new Set([...filter.chipHeight, e.target.value]))
            );
            setStateHeight(!stateHeight);
            setFilterAction(!filterState);
            page.setLoadMore(0);
            page.setOffset(0);
        }
        if (e.target.name === t('filterCatalogTyre.filter_diameter_title')) {
            filter.setDiameter(e.target.value);
            filter.setChipDiameter(
                Array.from(
                    new Set([...filter.chipDiameter, e.target.value]))
            );
            setStateDiameter(!stateDiameter);
            setFilterAction(!filterState);
            page.setLoadMore(0);
            page.setOffset(0);
        }
        if (e.target.name === 'Бренд' && e.target.checked) {
            filter.setChipBrands(
                Array.from(
                    new Set([...filter.chipBrands, e.target.value]))
            );
            page.setLoadMore(0);
            page.setOffset(0);        
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
            filter.setChipSeason(Array.from(
                new Set([...filter.chipSeason])));
        }
        if (e.target.name === t('filterCatalogTyre.filter_vehicle_type_title') && e.target.checked) {
            page.setLoadMore(0);
            page.setOffset(0);
            if (e.target.value === 'вантажні шини') {
                filter.setChipVehicleType(
                    Array.from(
                        new Set([...filter.chipVehicleType, 
                            'вантажні шини','універсальна','рульова','ведуча','причіпна'
                        ])
                    )
                ); 
            } else if (e.target.value === 'грузовые шины') {
                filter.setChipVehicleType(
                    Array.from(
                        new Set([...filter.chipVehicleType, 
                            'грузовые шины','универсальная','рулевая','ведущая','прицепная'
                        ])
                    )
                ); 
            } else if (filter.chipVehicleType.includes('вантажні шини')) {
                filter.setChipVehicleType(
                    Array.from(
                        new Set([...filter.chipVehicleType, 
                            e.target.value, 'вантажні шини'
                        ])
                    )
                );
            } else if (filter.chipVehicleType.includes('грузовые шины')) {
                    filter.setChipVehicleType(
                            Array.from(
                                new Set([...filter.chipVehicleType, 
                                    e.target.value, 'грузовые шины'
                                ])
                            )
                        ); 
            } else {
                filter.setChipVehicleType(
                    Array.from(
                        new Set([...filter.chipVehicleType, e.target.value]))
                ); 
            }
             
        } else if (e.target.name === t('filterCatalogTyre.filter_vehicle_type_title')) {
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
        if (e.target.name === t('filterCatalogTyre.filter_speed_index_title') && e.target.checked) {
            page.setLoadMore(0);
            page.setOffset(0);
            filter.setChipSpeedIndex(
                Array.from(
                    new Set([...filter.chipSpeedIndex, e.target.value]))
            );     
        } else if (e.target.name === t('filterCatalogTyre.filter_speed_index_title')) {
            const cancelSpeedIndex = filter.chipSpeedIndex.findIndex(
                (item: string) => item === e.target.value);
            filter.removeChipSpeedIndexItem(cancelSpeedIndex);
            filter.setChipSpeedIndex(Array.from(
                new Set([...filter.chipSpeedIndex])));
        }
        if (e.target.name === t('filterCatalogTyre.filter_load_index_title') && e.target.checked) {
            page.setLoadMore(0);
            page.setOffset(0);
            filter.setChipLoadIndex(
                Array.from(
                    new Set([...filter.chipLoadIndex, e.target.value]))
            );     
        } else if (e.target.name === t('filterCatalogTyre.filter_load_index_title')) {
            const cancelLoadIndex = filter.chipLoadIndex.findIndex(
                (item: string) => item === e.target.value);
            filter.removeChipLoadIndexItem(cancelLoadIndex);
            filter.setChipLoadIndex(Array.from(
                new Set([...filter.chipLoadIndex])));
        }
        if (e.target.name === t('filterCatalogTyre.filter_homologation_title') && e.target.checked) {
            page.setLoadMore(0);
            page.setOffset(0);
            filter.setChipHomologation(
                Array.from(
                    new Set([...filter.chipHomologation, e.target.value]))
            );     
        } else if (e.target.name === t('filterCatalogTyre.filter_homologation_title')) {
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
        if (e.target.name === t('filterCatalogTyre.filter_reinforced_title') && e.target.checked) {
            page.setLoadMore(0);
            page.setOffset(0);
            filter.setChipReinforced(
                Array.from(
                    new Set([...filter.chipReinforced, e.target.value]))
            );     
        } else if (e.target.name === t('filterCatalogTyre.filter_reinforced_title')) {
            const cancelReinforced = filter.chipReinforced.findIndex(
                (item: string) => item === e.target.value);
            filter.removeChipReinforcedItem(cancelReinforced);
            filter.setChipReinforced(Array.from(
                new Set([...filter.chipReinforced])));
        }
        const tyreCatalogPath: string | undefined = 
          `${CATALOG_TYRES_ROUTE}${filter.season && !filter.season.includes(',') ? `/${createStringUrl(filter.season)}` : '' }${filter.studded && !filter.studded.includes(',') ? `/${createStringUrl(filter.studded)}` : '' }${filter.vehicle_type && !filter.vehicle_type.includes(',') ? `/${createStringUrl(filter.vehicle_type)}` : ''}${filter.brands && !filter.brands.includes(',') ? `/${createStringUrl(filter.brands)}` : ''}${filter.width ? `/w${filter.width }` : ''}${filter.height ? `/h${filter.height}` : ''}${filter.diameter ? `/r${filter.diameter}` : ''}${filter.load_index && !filter.load_index.includes(',') ? `/li-${createStringUrl(filter.load_index)}` : '' }${filter.speed_index && !filter.speed_index.includes(',') ? `/si-${createStringUrl(filter.speed_index)}` : '' }${filter.reinforced && !filter.reinforced.includes(',') ? `/xl-${createStringUrl(filter.reinforced)}` : '' }${filter.homologation && !filter.homologation.includes(',') ? `/om-${createStringUrl(filter.homologation)}` : '' }`;
          history.push(
            tyreCatalogPath, 
          );
    } 
    
    const handleDeleteChange = (e: any) => {
        if (e.target.getAttribute('data-name') === 'Ширина') {
            page.setLoadMore(0);
            page.setOffset(0);
            for( let key in params) {
                if('w' + filter.width === params[key]) {
                    params[key] = undefined;
                }
            }
            filter.setWidth(null);
            filter.removeChipWidthItem();
        }
        if (e.target.getAttribute('data-name') === t('filterCatalogTyre.filter_height_title')) {
            page.setLoadMore(0);
            page.setOffset(0);
            for( let key in params) {
                if('h' + filter.height === params[key]) {
                    params[key] = undefined;
                }
            }
            filter.setHeight(null);
            filter.removeChipHeightItem();
            params.height = undefined;
        }
        if (e.target.getAttribute('data-name') === t('filterCatalogTyre.filter_diameter_title')) {
            page.setLoadMore(0);
            page.setOffset(0);
            for( let key in params) {
                if('r' + filter.diameter === params[key]) {
                    params[key] = undefined;
                }
            }
            filter.setDiameter(null);
            filter.removeChipDiameterItem();
        }
        if (e.target.getAttribute('data-name') === 'Бренд') {
            page.setLoadMore(0);
            page.setOffset(0);
            for( let key in params) {
                if(createStringUrl(filter.brands) === params[key]) {
                    params[key] = undefined;
                }
            }
            filter.removeChipBrandsItem(e.target.getAttribute('data-index'));
            filter.setChipBrands(Array.from(
                new Set([...filter.chipBrands])));
            filter.setBrands(filter.chipBrands.join(','));
        }
        if (e.target.getAttribute('data-name') === 'Сезон') {
            page.setLoadMore(0);
            page.setOffset(0);
            for( let key in params) {
                if(createStringUrl(filter.season) === params[key]) {
                    params[key] = undefined;
                }
            }
            filter.removeChipSeasonItem(e.target.getAttribute('data-index'));
            filter.setChipSeason(Array.from(
                new Set([...filter.chipSeason])));
            filter.setSeason(filter.chipSeason.join(','));
        }
        if (e.target.getAttribute('data-name') === t('filterCatalogTyre.filter_vehicle_type_title')) {
            page.setLoadMore(0);
            page.setOffset(0);
            if (e.target.getAttribute('data-chipname') === ('вантажні шини' || 'грузовые шины')) {
                let getChipIndexUniver = filter.chipVehicleType.indexOf('універсальна' || 'универсальная');
                if(getChipIndexUniver) { filter.removeChipVehicleTypeItem(getChipIndexUniver) };
                let getChipIndexDriver = filter.chipVehicleType.indexOf('ведуча' || 'ведущая');
                if(getChipIndexDriver) { filter.removeChipVehicleTypeItem(getChipIndexDriver) };
                let getChipIndexTrailer = filter.chipVehicleType.indexOf('причіпна' || 'прицепная');
                if(getChipIndexTrailer) { filter.removeChipVehicleTypeItem(getChipIndexTrailer) };
                let getChipIndexSteer = filter.chipVehicleType.indexOf('рульова' || 'рулевая'); 
                if(getChipIndexSteer) { filter.removeChipVehicleTypeItem(getChipIndexSteer) };
            }
            for( let key in params) {
                if(createStringUrl(filter.vehicle_type) === params[key]) {
                    params[key] = undefined;
                }
            }
            const getChipIndex = filter.chipVehicleType.indexOf(e.target.getAttribute('data-chipname'));
            filter.removeChipVehicleTypeItem(getChipIndex);
            filter.setChipVehicleType(Array.from(
                new Set([...filter.chipVehicleType])));
            filter.setVehicleType(filter.chipVehicleType.join(','));
        }
        if (e.target.getAttribute('data-name') === ('Вид вісі' || 'Вид оси')) {
            page.setLoadMore(0);
            page.setOffset(0);
            const getChipIndex = filter.chipVehicleType.indexOf(e.target.getAttribute('data-chipname'));
            filter.removeChipVehicleTypeItem(getChipIndex);
            const noChipTruck = filter.chipVehicleType.find(
                (item: string) => 
                item === ('універсальна' || 'универсальная') ||
                item === ('ведуча' || 'ведущая') || 
                item === ('причіпна' || 'прицепная') ||
                item === ('рульова' || 'рулевая')
            );
            if (!noChipTruck) {
                let getChipIndexNoTruck = filter.chipVehicleType.indexOf('вантажні шини');
                if(getChipIndexNoTruck !== -1) { filter.removeChipVehicleTypeItem(getChipIndexNoTruck) };
                filter.setChipVehicleType(Array.from(
                    new Set([...filter.chipVehicleType])));
                filter.setVehicleType(filter.chipVehicleType.join(','));
            } else {
                filter.setChipVehicleType(Array.from(
                    new Set([...filter.chipVehicleType])));
                filter.setVehicleType(filter.chipVehicleType.join(','));
            }
            
        }
        if (e.target.getAttribute('data-name') === 'Шип / Не шип') {
            page.setLoadMore(0);
            page.setOffset(0);
            for( let key in params) {
                if(createStringUrl(filter.studded) === params[key]) {
                    params[key] = undefined;
                }
            }
            filter.removeChipStuddedItem(e.target.getAttribute('data-index'));
            filter.setChipStudded(Array.from(
                new Set([...filter.chipStudded])));
            filter.setStudded(filter.chipStudded.join(','));
        }
        if (e.target.getAttribute('data-name') === t('filterCatalogTyre.filter_speed_index_title')) {
            page.setLoadMore(0);
            page.setOffset(0);
            for( let key in params) {
                if('si-' + createStringUrl(filter.speed_index) === params[key]) {
                    params[key] = undefined;
                }
            }
            filter.removeChipSpeedIndexItem(e.target.getAttribute('data-index'));
            filter.setChipSpeedIndex(Array.from(
                new Set([...filter.chipSpeedIndex])));
            filter.setSpeedIndex(filter.chipSpeedIndex.join(','));
        }
        if (e.target.getAttribute('data-name') === t('filterCatalogTyre.filter_load_index_title')) {
            page.setLoadMore(0);
            page.setOffset(0);
            for( let key in params) {
                if('li-' + createStringUrl(filter.load_index) === params[key]) {
                    params[key] = undefined;
                }
            }
            filter.removeChipLoadIndexItem(e.target.getAttribute('data-index'));
            filter.setChipLoadIndex(Array.from(
                new Set([...filter.chipLoadIndex])));
            filter.setLoadIndex(filter.chipLoadIndex.join(','));
        }
        if (e.target.getAttribute('data-name') === t('filterCatalogTyre.filter_homologation_title')) {
            page.setLoadMore(0);
            page.setOffset(0);
            for( let key in params) {
                if('om-' + createStringUrl(filter.homologation) === params[key]) {
                    params[key] = undefined;
                }
            }
            filter.removeChipHomologationItem(e.target.getAttribute('data-index'));
            filter.setChipHomologation(Array.from(
                new Set([...filter.chipHomologation])));
            filter.setHomologation(filter.chipHomologation.join(','));
        }
        if (e.target.getAttribute('data-name') === 'Run Flat') {
            page.setLoadMore(0);
            page.setOffset(0);
            for( let key in params) {
                if(filter.run_flat === params[key]) {
                    params[key] = undefined;
                }
            }
            filter.removeChipRunFlatItem(e.target.getAttribute('data-index'));
            filter.setChipRunFlat(Array.from(
                new Set([...filter.chipRunFlat])));
            filter.setRunFlat(filter.chipRunFlat.join(','));
        }
        if (e.target.getAttribute('data-name') === t('filterCatalogTyre.filter_reinforced_title')) {
            page.setLoadMore(0);
            page.setOffset(0);
            for( let key in params) {
                if('xl-' + createStringUrl(filter.reinforced) === params[key]) {
                    params[key] = undefined;
                }
            }
            filter.removeChipReinforcedItem(e.target.getAttribute('data-index'));
            filter.setChipReinforced(Array.from(
                new Set([...filter.chipReinforced])));
            filter.setReinforced(filter.chipReinforced.join(','));
        }
        const tyreCatalogPathType: string | undefined = 
        `${CATALOG_TYRES_ROUTE}${filter.season && !filter.season.includes(',') ? `/${createStringUrl(filter.season)}` : '' }${filter.studded && !filter.studded.includes(',') ? `/${createStringUrl(filter.studded)}` : '' }${filter.vehicle_type && !filter.vehicle_type.includes(',') && !filter.vehicle_type.includes(`кар'єрна`) ? `/${createStringUrl(filter.vehicle_type)}` : filter._chipVehicleType.includes('вантажні шини' || 'універсальна' || 'рульова' || 'ведуча'|| 'причіпна') ? `/${createStringUrl('вантажні шини')}`: !filter.vehicle_type.includes(',') && filter.vehicle_type.includes(`кар'єрна`) ? `/${createStringUrl('карерна')}` : ''}${filter.brands && !filter.brands.includes(',') ? `/${createStringUrl(filter.brands)}` : ''}${filter.width ? `/w${filter.width }` : ''}${filter.height ? `/h${filter.height}` : ''}${filter.diameter ? `/r${filter.diameter}` : ''}${filter.load_index && !filter.load_index.includes(',') ? `/li-${createStringUrl(filter.load_index)}` : '' }${filter.speed_index && !filter.speed_index.includes(',') ? `/si-${createStringUrl(filter.speed_index)}` : '' }${filter.reinforced && !filter.reinforced.includes(',') ? `/xl-${createStringUrl(filter.reinforced)}` : '' }${filter.homologation && !filter.homologation.includes(',') ? `/om-${createStringUrl(filter.homologation)}` : '' }`;
        history.push(
          tyreCatalogPathType, 
        );
    };  
    const filterBrandAdd = () => {
        filter.setBrands(filter.chipBrands.join(','));
        setStateBrand(!stateBrand);
        const tyreCatalogPathBrand: string | undefined = 
          `${CATALOG_TYRES_ROUTE}${filter.season && !filter.season.includes(',') ? `/${createStringUrl(filter.season)}` : '' }${filter.studded && !filter.studded.includes(',') ? `/${createStringUrl(filter.studded)}` : '' }${filter.vehicle_type && !filter.vehicle_type.includes(',') ? `/${createStringUrl(filter.vehicle_type)}` : ''}${filter.brands && !filter.brands.includes(',') ? `/${createStringUrl(filter.brands)}` : ''}${filter.width ? `/w${filter.width }` : ''}${filter.height ? `/h${filter.height}` : ''}${filter.diameter ? `/r${filter.diameter}` : ''}${filter.load_index && !filter.load_index.includes(',') ? `/li-${createStringUrl(filter.load_index)}` : '' }${filter.speed_index && !filter.speed_index.includes(',') ? `/si-${createStringUrl(filter.speed_index)}` : '' }${filter.reinforced && !filter.reinforced.includes(',') ? `/xl-${createStringUrl(filter.reinforced)}` : '' }${filter.homologation && !filter.homologation.includes(',') ? `/om-${createStringUrl(filter.homologation)}` : '' }`;
          history.push(
            tyreCatalogPathBrand, 
          );
    };
    const filterSeasonAdd = () => {
        filter.setSeason(filter.chipSeason.join(','));
        setStateSeason(!stateSeason);
        const tyreCatalogPathSeason: string | undefined = 
          `${CATALOG_TYRES_ROUTE}${filter.season && !filter.season.includes(',') ? `/${createStringUrl(filter.season)}` : '' }${filter.studded && !filter.studded.includes(',') ? `/${createStringUrl(filter.studded)}` : '' }${filter.vehicle_type && !filter.vehicle_type.includes(',') ? `/${createStringUrl(filter.vehicle_type)}` : ''}${filter.brands && !filter.brands.includes(',') ? `/${createStringUrl(filter.brands)}` : ''}${filter.width ? `/w${filter.width }` : ''}${filter.height ? `/h${filter.height}` : ''}${filter.diameter ? `/r${filter.diameter}` : ''}${filter.load_index && !filter.load_index.includes(',') ? `/li-${createStringUrl(filter.load_index)}` : '' }${filter.speed_index && !filter.speed_index.includes(',') ? `/si-${createStringUrl(filter.speed_index)}` : '' }${filter.reinforced && !filter.reinforced.includes(',') ? `/xl-${createStringUrl(filter.reinforced)}` : '' }${filter.homologation && !filter.homologation.includes(',') ? `/om-${createStringUrl(filter.homologation)}` : '' }`;
          history.push(
            tyreCatalogPathSeason, 
          );
    };
    const filterVehicleTypeAdd = () => {
        filter.setVehicleType(filter.chipVehicleType.join(','));
        setStateVehicleType(!stateVehicleType);
        const tyreCatalogPathType: string | undefined = 
          `${CATALOG_TYRES_ROUTE}${filter.season && !filter.season.includes(',') ? `/${createStringUrl(filter.season)}` : '' }${filter.studded && !filter.studded.includes(',') ? `/${createStringUrl(filter.studded)}` : '' }${filter.vehicle_type && !filter.vehicle_type.includes(',') && !filter.vehicle_type.includes(`кар'єрна`) ? `/${createStringUrl(filter.vehicle_type)}` : filter._chipVehicleType.includes('вантажні шини' || 'універсальна' || 'рульова' || 'ведуча'|| 'причіпна') ? `/${createStringUrl('вантажні шини')}`: !filter.vehicle_type.includes(',') && filter.vehicle_type.includes(`кар'єрна`) ? `/${createStringUrl('карерна')}` : ''}${filter.brands && !filter.brands.includes(',') ? `/${createStringUrl(filter.brands)}` : ''}${filter.width ? `/w${filter.width }` : ''}${filter.height ? `/h${filter.height}` : ''}${filter.diameter ? `/r${filter.diameter}` : ''}${filter.load_index && !filter.load_index.includes(',') ? `/li-${createStringUrl(filter.load_index)}` : '' }${filter.speed_index && !filter.speed_index.includes(',') ? `/si-${createStringUrl(filter.speed_index)}` : '' }${filter.reinforced && !filter.reinforced.includes(',') ? `/xl-${createStringUrl(filter.reinforced)}` : '' }${filter.homologation && !filter.homologation.includes(',') ? `/om-${createStringUrl(filter.homologation)}` : '' }`;
          history.push(
            tyreCatalogPathType, 
          );
    };
    const filterStuddedAdd = () => {
        filter.setStudded(filter.chipStudded.join(','));
        setStateStudded(!stateStudded);
        const tyreCatalogPathStud: string | undefined = 
          `${CATALOG_TYRES_ROUTE}${filter.season && !filter.season.includes(',') ? `/${createStringUrl(filter.season)}` : '' }${filter.studded && !filter.studded.includes(',') ? `/${createStringUrl(filter.studded)}` : '' }${filter.vehicle_type && !filter.vehicle_type.includes(',') ? `/${createStringUrl(filter.vehicle_type)}` : ''}${filter.brands && !filter.brands.includes(',') ? `/${createStringUrl(filter.brands)}` : ''}${filter.width ? `/w${filter.width }` : ''}${filter.height ? `/h${filter.height}` : ''}${filter.diameter ? `/r${filter.diameter}` : ''}${filter.load_index && !filter.load_index.includes(',') ? `/li-${createStringUrl(filter.load_index)}` : '' }${filter.speed_index && !filter.speed_index.includes(',') ? `/si-${createStringUrl(filter.speed_index)}` : '' }${filter.reinforced && !filter.reinforced.includes(',') ? `/xl-${createStringUrl(filter.reinforced)}` : '' }${filter.homologation && !filter.homologation.includes(',') ? `/om-${createStringUrl(filter.homologation)}` : '' }`;
          history.push(
            tyreCatalogPathStud, 
          );
    };
    const filterSpeedIndexAdd = () => {
        filter.setSpeedIndex(filter.chipSpeedIndex.join(','));
        setStateSpeedIndex(!stateSpeedIndex);
        const tyreCatalogPathSi: string | undefined = 
          `${CATALOG_TYRES_ROUTE}${filter.season && !filter.season.includes(',') ? `/${createStringUrl(filter.season)}` : '' }${filter.studded && !filter.studded.includes(',') ? `/${createStringUrl(filter.studded)}` : '' }${filter.vehicle_type && !filter.vehicle_type.includes(',') ? `/${createStringUrl(filter.vehicle_type)}` : ''}${filter.brands && !filter.brands.includes(',') ? `/${createStringUrl(filter.brands)}` : ''}${filter.width ? `/w${filter.width }` : ''}${filter.height ? `/h${filter.height}` : ''}${filter.diameter ? `/r${filter.diameter}` : ''}${filter.load_index && !filter.load_index.includes(',') ? `/li-${createStringUrl(filter.load_index)}` : '' }${filter.speed_index && !filter.speed_index.includes(',') ? `/si-${createStringUrl(filter.speed_index)}` : '' }${filter.reinforced && !filter.reinforced.includes(',') ? `/xl-${createStringUrl(filter.reinforced)}` : '' }${filter.homologation && !filter.homologation.includes(',') ? `/om-${createStringUrl(filter.homologation)}` : '' }`;
          history.push(
            tyreCatalogPathSi, 
          );
    };
    const filterLoadIndexAdd = () => {
        filter.setLoadIndex(filter.chipLoadIndex.join(','));
        setStateLoadIndex(!stateLoadIndex);
        const tyreCatalogPathLi: string | undefined = 
          `${CATALOG_TYRES_ROUTE}${filter.season && !filter.season.includes(',') ? `/${createStringUrl(filter.season)}` : '' }${filter.studded && !filter.studded.includes(',') ? `/${createStringUrl(filter.studded)}` : '' }${filter.vehicle_type && !filter.vehicle_type.includes(',') ? `/${createStringUrl(filter.vehicle_type)}` : ''}${filter.brands && !filter.brands.includes(',') ? `/${createStringUrl(filter.brands)}` : ''}${filter.width ? `/w${filter.width }` : ''}${filter.height ? `/h${filter.height}` : ''}${filter.diameter ? `/r${filter.diameter}` : ''}${filter.load_index && !filter.load_index.includes(',') ? `/li-${createStringUrl(filter.load_index)}` : '' }${filter.speed_index && !filter.speed_index.includes(',') ? `/si-${createStringUrl(filter.speed_index)}` : '' }${filter.reinforced && !filter.reinforced.includes(',') ? `/xl-${createStringUrl(filter.reinforced)}` : '' }${filter.homologation && !filter.homologation.includes(',') ? `/om-${createStringUrl(filter.homologation)}` : '' }`;
          history.push(
            tyreCatalogPathLi, 
          );
    };
    const filterHomologationAdd = () => {
        filter.setHomologation(filter.chipHomologation.join(','));
        setStateHomologation(!stateHomologation);
        const tyreCatalogPathOm: string | undefined = 
          `${CATALOG_TYRES_ROUTE}${filter.season && !filter.season.includes(',') ? `/${createStringUrl(filter.season)}` : '' }${filter.studded && !filter.studded.includes(',') ? `/${createStringUrl(filter.studded)}` : '' }${filter.vehicle_type && !filter.vehicle_type.includes(',') ? `/${createStringUrl(filter.vehicle_type)}` : ''}${filter.brands && !filter.brands.includes(',') ? `/${createStringUrl(filter.brands)}` : ''}${filter.width ? `/w${filter.width }` : ''}${filter.height ? `/h${filter.height}` : ''}${filter.diameter ? `/r${filter.diameter}` : ''}${filter.load_index && !filter.load_index.includes(',') ? `/li-${createStringUrl(filter.load_index)}` : '' }${filter.speed_index && !filter.speed_index.includes(',') ? `/si-${createStringUrl(filter.speed_index)}` : '' }${filter.reinforced && !filter.reinforced.includes(',') ? `/xl-${createStringUrl(filter.reinforced)}` : '' }${filter.homologation && !filter.homologation.includes(',') ? `/om-${createStringUrl(filter.homologation)}` : '' }`;
          history.push(
            tyreCatalogPathOm, 
          );
    };
    const filterRunFlatAdd = () => {
        filter.setRunFlat(filter.chipRunFlat.join(','));
        setStateRunFlat(!stateRunFlat);
        const tyreCatalogPathRf: string | undefined = 
          `${CATALOG_TYRES_ROUTE}${filter.season && !filter.season.includes(',') ? `/${createStringUrl(filter.season)}` : '' }${filter.studded && !filter.studded.includes(',') ? `/${createStringUrl(filter.studded)}` : '' }${filter.vehicle_type && !filter.vehicle_type.includes(',') ? `/${createStringUrl(filter.vehicle_type)}` : ''}${filter.brands && !filter.brands.includes(',') ? `/${createStringUrl(filter.brands)}` : ''}${filter.width ? `/w${filter.width }` : ''}${filter.height ? `/h${filter.height}` : ''}${filter.diameter ? `/r${filter.diameter}` : ''}${filter.load_index && !filter.load_index.includes(',') ? `/li-${createStringUrl(filter.load_index)}` : '' }${filter.speed_index && !filter.speed_index.includes(',') ? `/si-${createStringUrl(filter.speed_index)}` : '' }${filter.reinforced && !filter.reinforced.includes(',') ? `/xl-${createStringUrl(filter.reinforced)}` : '' }${filter.homologation && !filter.homologation.includes(',') ? `/om-${createStringUrl(filter.homologation)}` : '' }`;
          history.push(
            tyreCatalogPathRf, 
          );
    };
    const filterReinforcedAdd = () => {
        filter.setReinforced(filter.chipReinforced.join(','));
        setStateReinforced(!stateReinforced);
        const tyreCatalogPathXl: string | undefined = 
          `${CATALOG_TYRES_ROUTE}${filter.season && !filter.season.includes(',') ? `/${createStringUrl(filter.season)}` : '' }${filter.studded && !filter.studded.includes(',') ? `/${createStringUrl(filter.studded)}` : '' }${filter.vehicle_type && !filter.vehicle_type.includes(',') ? `/${createStringUrl(filter.vehicle_type)}` : ''}${filter.brands && !filter.brands.includes(',') ? `/${createStringUrl(filter.brands)}` : ''}${filter.width ? `/w${filter.width }` : ''}${filter.height ? `/h${filter.height}` : ''}${filter.diameter ? `/r${filter.diameter}` : ''}${filter.load_index && !filter.load_index.includes(',') ? `/li-${createStringUrl(filter.load_index)}` : '' }${filter.speed_index && !filter.speed_index.includes(',') ? `/si-${createStringUrl(filter.speed_index)}` : '' }${filter.reinforced && !filter.reinforced.includes(',') ? `/xl-${createStringUrl(filter.reinforced)}` : '' }${filter.homologation && !filter.homologation.includes(',') ? `/om-${createStringUrl(filter.homologation)}` : '' }`;
          history.push(
            tyreCatalogPathXl, 
          );
    };
    const filterPriceAdd = () => {
        filter.setPrice(filter.chipPrice.join(','));
    };

    const filterPriceRange = (e: any) => {
        if (e.target.name === 'vid') {
            filter.addFirstPrice(e.target.value);
            filter.setChipPrice(filter._chipPrice);
        } 
        if (e.target.name === 'do') {
            filter.addLastPrice(e.target.value);
            filter.setChipPrice(filter._chipPrice);
        }
    };

    const filterWidthClick = () => {
        setStateWidth(!stateWidth);
        setFilterAction(!filterState);
    };
    const filterHeightClick = () => {
        setStateHeight(!stateHeight);
        setFilterAction(!filterState);
    };
    const filterDiameterClick = () => {
        setStateDiameter(!stateDiameter);
        setFilterAction(!filterState);
    };
    const filterSeasonClick = () => {
        setStateSeason(!stateSeason);
        setFilterAction(!filterState);
    };
    const filterStuddedClick = () => {
        setFilterAction(!filterState);
        setStateStudded(!stateStudded);
    };
    const filterBrandClick = () => {
        setFilterAction(!filterState);
        setStateBrand(!stateBrand);
    };
    const filterVehicleTypeClick = () => {
        setFilterAction(!filterState);
        setStateVehicleType(!stateVehicleType);
    };
    const filterSpeedIndexClick = () => {
        setFilterAction(!filterState);
        setStateSpeedIndex(!stateSpeedIndex);
    };
    const filterLoadIndexClick = () => {
        setFilterAction(!filterState);
        setStateLoadIndex(!stateLoadIndex);
    };
    const filterHomologationClick = () => {
        setFilterAction(!filterState);
        setStateHomologation(!stateHomologation);
    };
    const filterRunFlatClick = () => {
        setFilterAction(!filterState);
        setStateRunFlat(!stateRunFlat);
    };
    const filterReinforcedClick = () => {
        setFilterAction(!filterState);
        setStateReinforced(!stateReinforced);
    };
    const openFilterInMobile = () => {
        setIsOpenFilter(!isOpenFilter);
    };

    return (
        <div className='filterCatalogTyres'>
            <div className='filterCatalogTyresHeader'>
            {isMobileFilterTyre ? 
                <div className='filterCatalogTyresMobile'>
                    <i className={isOpenFilter ? 
                        "fas fa-times fa-2x"
                        : "fas fa-bars fa-2x"}
                        onClick={openFilterInMobile}
                    ></i> 
                </div>
            : null
            }
                <span>
                    {t('filterCatalogTyre.filter_title')}
                </span>
            </div>
            {!isMobileFilterTyre || (isMobileFilterTyre && isOpenFilter) ?
            <div className='filterTyresOption'>
                <FilterMainBtn 
                    filterAction={filterWidthClick}
                    filterState={stateWidth}
                    chipItem={filter._width}
                    deleteChip={handleDeleteChange}
                    width={247.4} 
                    titleFilter={'Ширина'} 
                    contentInfo={isMobileFilterTyre ? false : 'A'}>
                    {goodsTyre._width ? 
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
                    titleFilter={t('filterCatalogTyre.filter_height_title')} 
                    contentInfo={isMobileFilterTyre ? false : 'B' }>
                    {goodsTyre._height ? 
                        goodsTyre._height.map((heightItem: any) => (
                    <SelectFilterList
                        key={heightItem === '' || 'undefined' ? heightItem + 1 : heightItem}
                        nameFilter={t('filterCatalogTyre.filter_height_title')}
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
                    titleFilter={t('filterCatalogTyre.filter_diameter_title')} 
                    contentInfo={isMobileFilterTyre ? false : 'C'}>
                    { goodsTyre._diameter ? 
                        goodsTyre._diameter.map(
                            (diameterItem: any) => (
                    <SelectFilterList
                        key={diameterItem}
                        nameFilter={t('filterCatalogTyre.filter_diameter_title')}
                        value={diameterItem} 
                        items={diameterItem} 
                        checked={filter._diameter} 
                        onChange={handleChange} 
                        width={247.4}
                    />  )) : null
                    }
                </FilterMainBtn>

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
                        imageSrc={seasonCar(seasonItem)}
                    />
                        )): null  
                    }
  
                    <p/>
                </Accordion>
                {filter._chipSeason.length !== 0 && stateSeason ?
                    <button 
                        className='checkBoxBtnOn season'
                        onClick={filterSeasonAdd}
                    >{t('filterCatalogTyre.filter_show_btn')}</button> 
                    : null 
                } 
                { filter._chipStudded.length !== 0 && stateStudded ?
                  <button 
                    className='checkBoxBtnOn studded'
                    onClick={filterStuddedAdd}
                  >{t('filterCatalogTyre.filter_show_btn')}</button> 
                  : null 
                }
                { filter._chipSeason.includes('зимова' || 'зимняя') ?
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
                            '/iconsSigns/imagesNoThorn_1_64.webp' :
                            '/iconsSigns/imagesThorn_1_64.webp'
                        }
                        /> 
                       )) : null
                    }
                    <p/>
                </Accordion>
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
                { filter._chipBrands.length !== 0 && stateBrand ?
                  <button 
                    className='checkBoxBtnOn brands'
                    onClick={filterBrandAdd}
                  >{t('filterCatalogTyre.filter_show_btn')}</button> 
                  : null 
                }
                <PriceRange
                    filterAction={filterPriceRange}
                    filterActionShown={filterPriceAdd}
                />               
                <Accordion 
                    titleName={t('filterCatalogTyre.filter_vehicle_type_title')}
                    chipItem={filter.vehicle_type.split(',').filter(
                        (items: string) =>
                        items !== ('рульова' || 'рулевая') && 
                        items !== ('ведуча' || 'ведущая') &&
                        items !== ('причіпна' || 'прицепная') && 
                        items !== ('універсальна' || 'универсальная')
                        ).join(',')
                    }
                    deleteChip={handleDeleteChange}
                    filterAction={filterVehicleTypeClick}
                    filterState={stateVehicleType}
                >
                    { goodsTyre._vehicle_type ? 
                        goodsTyre._vehicle_type.filter((typeItem: string) =>
                            typeItem !== ('рульова' || 'рулевая') && 
                            typeItem !== ('ведуча' || 'ведущая') && 
                            typeItem !== ('причіпна' || 'прицепная') && 
                            typeItem !== ('універсальна' || 'универсальная'))  
                            .map(
                            (vehicleItem: string) => (
                                
                    <CheckboxBtn 
                        key={vehicleItem}
                        value={vehicleItem}
                        checked={filter._chipVehicleType.includes(vehicleItem)} 
                        onChange={handleChange}
                        titleName={t('filterCatalogTyre.filter_vehicle_type_title')}  
                        titleCheckbox={ vehicleItem} 
                        imageSrc={typeCar(vehicleItem)}/>
                        )) : null
                    }
                </Accordion>
                { filter._chipVehicleType.length !== 0 && stateVehicleType ?
                  <button 
                    className='checkBoxBtnOn vehicleType'
                    onClick={filterVehicleTypeAdd}
                  >{t('filterCatalogTyre.filter_show_btn')}</button> 
                  : null 
                } 
                {filter._chipVehicleType.includes('вантажні шини' || 'грузовые шины') ?
                <Accordion 
                    titleName={t('filterCatalogTyre.filter_axis_view_title')}
                    chipItem={
                        filter.vehicle_type.split(',').filter(
                            (entity: string) => 
                            entity !== ('вантажні шини' || 'грузовые шины') && 
                            entity !== 'мото' &&
                            entity !== ('легковий' || 'легковой') &&
                            entity !== ('позашляховик' || 'внедорожник') &&
                            entity !== ('с/г' || 'с/х') &&
                            entity !== ('індустріальна' || 'индустриальная') &&
                            entity !== ('легковантажний' || 'легкогрузовой') &&
                            entity !== 'вело' &&
                            entity !== ("кар'єрна" || 'карьерная') 
                        ).join(',')
                    }
                    deleteChip={handleDeleteChange}
                    filterAction={filterVehicleTypeClick}
                    filterState={stateVehicleType}
                >
                    { goodsTyre._vehicle_type ? 
                        goodsTyre._vehicle_type.filter( (typeItem: string) =>
                            typeItem === ('рульова' || 'рулевая') || 
                            typeItem === ('ведуча' || 'ведущая') ||
                            typeItem === ('причіпна' || 'прицепная') || 
                            typeItem === ('універсальна' || 'универсальная'))  
                            .map(
                            (vehicleItem: string) => (
                                
                    <CheckboxBtn 
                        key={vehicleItem}
                        value={vehicleItem}
                        checked={filter._chipVehicleType.includes(vehicleItem)} 
                        onChange={handleChange}
                        titleName={t('filterCatalogTyre.filter_vehicle_type_title')}  
                        titleCheckbox={ vehicleItem}
                        imageSrc={typeCar(vehicleItem)}/>
                        )) : null
                    }
                </Accordion>
                : null
                }
                <Accordion 
                    titleName={t('filterCatalogTyre.filter_speed_index_title')}
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
                        titleName={t('filterCatalogTyre.filter_speed_index_title')}
                        titleCheckbox={speedIndexItem} 
                        imageSrc={'/iconsSigns/speed_limit_64.webp'}
                    />  )) : null
                    }
                    <p/>
                </Accordion>
                { filter._chipSpeedIndex.length !== 0 && stateSpeedIndex ?
                  <button 
                    className='checkBoxBtnOn speedIndex'
                    onClick={filterSpeedIndexAdd}
                  >{t('filterCatalogTyre.filter_show_btn')}</button> 
                  : null 
                }
                <Accordion 
                    titleName={t('filterCatalogTyre.filter_load_index_title')}
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
                        checked={filter._chipLoadIndex.includes(loadIndexItem)} 
                        onChange={handleChange} 
                        value={loadIndexItem} 
                        titleName={t('filterCatalogTyre.filter_load_index_title')}
                        titleCheckbox={loadIndexItem} 
                        imageSrc={'/iconsSigns/load_limit_1_64_empty.webp'}
                    /> 
                    ))
                     : null
                    }
                    <p/>
                </Accordion>
                { filter._chipLoadIndex.length !== 0 && stateLoadIndex ?
                  <button 
                    className='checkBoxBtnOn loadIndex'
                    onClick={filterLoadIndexAdd}
                  >{t('filterCatalogTyre.filter_show_btn')}</button> 
                  : null 
                }    
                <Accordion 
                    titleName={t('filterCatalogTyre.filter_homologation_title')}
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
                        titleName={t('filterCatalogTyre.filter_homologation_title')}
                        titleCheckbox={homologationItem} 
                        imageSrc={homologationByCar(homologationItem) ?? ''}
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
                  >{t('filterCatalogTyre.filter_show_btn')}</button> 
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
                { filter._chipRunFlat.length !== 0 && stateRunFlat ?
                  <button 
                    className='checkBoxBtnOn runFlat'
                    onClick={filterRunFlatAdd}
                  >{t('filterCatalogTyre.filter_show_btn')}</button> 
                  : null 
                }
                <Accordion 
                    titleName={t('filterCatalogTyre.filter_reinforced_title')}
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
                        titleName={t('filterCatalogTyre.filter_reinforced_title')} 
                        titleCheckbox={reinforceItem} 
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
                  >{t('filterCatalogTyre.filter_show_btn')}</button> 
                  : null 
                }
            </div>  
            : null
            }     
        </div>
    );
});

export default FilterCatalogTyres;