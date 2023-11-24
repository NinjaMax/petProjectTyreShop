import React, {useEffect, useState} from 'react';
import '../../../css/AdminComponentCss/AdminContentCss/AdminGoodsContent.css';
import ButtonSearch from '../../buttons/ButtonSearch';
import ModalAdmin from '../../modal/ModalAdmin';
import AdminFormOrder from '../adminModalForm/AdminModalFormOrder';
import AdminBatteryContent from './AdminBatteryContent';
import AdminOilContent from './AdminOilContent';
import AdminTyreContent from './AdminTyreContent';
import AdminTyreStockPriceRow from './AdminTyreStockPriceRow';
import AdminWheelContent from './AdminWheelContent';
import AdminWheelStockPriceRow from './AdminWheelStockPriceRow';
import { IGoodsContent } from './interfaces/GoodsContent.interface';
import { TyreContent } from './types/TyreContent.type';
import { IWheelContentItem } from './types/WheelContent.type';
import { getTyresById } from '../../../restAPI/restGoodsApi';
import { getAdminStockTyresByIdtyre, getAdminPriceTyresById, getAdminStockWheelByIdWheel, getAdminPriceWheelsById } from '../../../restAPI/restAdminAPI';
//import { sortTyres } from '../../sortService/sortAdminGoods';

const AdminGoodsContent = (
    {showComment, comments, props, customer, storage}:IGoodsContent) => {
    const [tyreData, wheelData] = props;
    const [chooseCat, setChooseCat] = useState<string>('Шини');
    // const [tyreData, setTyreData] = useState(null);
    // const [wheelData, setWheelData] = useState(null);
    // // const [oilData, setOildata] = useState(null);
    // // const [batteryData, setBatteryData] = useState(null);
    //const [customers, setCustomers] = useState(null);
    // const [itemIdTyre, setItemIdTyre] = useState();
    // const [itemIdWheel, setItemIdWheel] = useState();
    // const [itemIdOil, setItemIdOil] = useState();
    // const [itemIdBattery, setItemIdBattery] = useState();
    const [itemId, setItemId] = useState<[]>([]);
    const [addGoods, setAddGoods] = useState<boolean>(false);
    const [stockTyre, setStockTyre] = useState<any>();
    const [priceTyre, setPriceTyre] = useState<any>();
    const [stockWheel, setStockWheel] = useState<{}[]>();
    const [priceWheel, setPriceWheel] = useState<{}[]>();
    // const [stockOil, setStockOil] = useState([]);
    // const [priceOil, setPriceOil] = useState([]);
    // const [stockBattery, setStockBattery] = useState([]);
    // const [priceBattery, setPriceBattery] = useState([]);
    const [valueSort, setValueSort] = useState<string>('')
    const [valueTyre, setValueTyre] = useState('');
    const [valueWheel, setValueWheel] = useState('');
    const [changedTyresData, setChangedTyresData] = useState<any[] | null>(tyreData);
    const [changedWheelsData, setChangedWheelsData] = useState<any[] | null>(wheelData);
    const [isSearch, setIsSearch] = useState(false);
    const [active, setActive] = useState(false);
    const [imageValue, setImageValue] = useState<string[]>();

    
    useEffect(() => {
        if(valueTyre.length !== 0) {
            const filteredTyreData: any = tyreData?.filter((goodsItem: any) => {
            return goodsItem.id.toLowerCase().includes(valueTyre.toLowerCase()) ||
            goodsItem.full_name.toLowerCase().includes(valueTyre.toLowerCase()) 
            })
            setChangedTyresData(filteredTyreData);  
        } else {
            setChangedTyresData(tyreData);
        }
    },[tyreData, valueTyre]);

    useEffect(() => {
        if(valueWheel.length !== 0) {
            const filteredWheelData: any = wheelData?.filter((goodsItem: any) => {
                return goodsItem.id.toLowerCase().includes(valueWheel.toLowerCase()) ||
                goodsItem.full_name_color.toLowerCase().includes(valueWheel.toLowerCase())  
            })
            setChangedWheelsData(filteredWheelData);  
        } else {
            setChangedWheelsData(wheelData);
        }
    },[wheelData, valueWheel]);

    const showStockPriceTyre = async (e: any) => {
        try {
            const getTyreRowId: string = e.currentTarget?.getAttribute("data-value");
            let stockByIdTyre = await getAdminStockTyresByIdtyre(getTyreRowId ?? 0);
            let priceByIdTyre = await getAdminPriceTyresById(getTyreRowId ?? 0);
            //console.log('PRICE_TYRE: ', priceByIdTyre);
            if (priceByIdTyre) {
               setPriceTyre(priceByIdTyre);  
            }
            if (stockByIdTyre) {
              setStockTyre(stockByIdTyre);  
            }
        } catch (error) {
            console.log('GET_TYRE_STOCK_ERROR: ', error);
        }
    };

    const showStockPriceWheel = async (e: { currentTarget: { getAttribute: (arg0: string) => any; }; }) => {
        try {
            const getWheelRowId: string = e.currentTarget?.getAttribute("data-value");
            let stockByIdWheel = await getAdminStockWheelByIdWheel(getWheelRowId ?? 0);
            let priceByIdTWheel = await getAdminPriceWheelsById(getWheelRowId ?? 0);
            if (stockByIdWheel) {
                setStockWheel(stockByIdWheel);  
            }
            if (priceByIdTWheel) {
                setPriceWheel(priceByIdTWheel);
            }
        } catch (error) {
            console.log('WHEEL_STOCK_PRICE_ERROR: ', error);
        }
    };

    const showPicturesTyre =(e: any) => {
        const getTyreImage: string[] = e.currentTarget?.value.split(',');
        if (getTyreImage) {
            setActive(!active);
            setImageValue(getTyreImage);
        }
    };

    const showPicturesWheel =(e: any) => {
        const getTyreImage: string[] = e.currentTarget?.value.split(',');
        if (getTyreImage) {
            setActive(!active);
            setImageValue(getTyreImage);
        }
    };

    const addToOrder = async (e: { currentTarget: { value: string; }; }) => {
        //try {
        let itemTyre: any = tyreData?.find((item:{id:string}) => item.id === e.currentTarget?.value);
        let itemWheel: any = wheelData?.find((item:{id:string}) => item.id === e.currentTarget?.value);
        
        let priceByIdTyre = await getAdminPriceTyresById(e.currentTarget?.value ?? 0);
        let priceByIdTWheel = await getAdminPriceWheelsById(e.currentTarget?.value ?? 0);

        if(itemTyre) {
            itemTyre!.price = priceByIdTyre;
            setItemId(itemTyre);
        }   
        if(itemWheel) {
            itemWheel!.price = priceByIdTWheel;
            setItemId(itemWheel);    
        }  
        setAddGoods(!addGoods);
        // } catch (error) {
            // console.log('ADD_TO_ORDER: ', error);
        //}
    }

    const itemClickHandler = (e: any) => {
        const entity = e.target.textContent.split(':')
        if (chooseCat === 'Шини') {
            setValueTyre(entity[1]);
            setIsSearch(!isSearch);  
        }
        if (chooseCat === 'Диски') {
            setValueWheel(entity[1]);
            setIsSearch(!isSearch);  
        }
    }

    const inputHandler = () => {
        setIsSearch(true);
    }

    const inputCancelHandler = () => {
        if(isSearch){
           setIsSearch(false); 
        }
    }
    const sortTyreContent = (e: any) => { 
        console.log('SORT: ', e.target.textContent)
        if (e.target.textContent === 'Код') {
            const sortByCode: any = 
            changedTyresData?.sort(
            (a:any, b:any) => (+a.id) - (+b.id));
            setChangedTyresData(sortByCode);
        }
        if (e.target.textContent === 'Рік Виробн.') {
            const sortByYear: any = 
            changedTyresData?.sort(
            (a:any, b:any) => 
            (+a.year?.manufacture_year) - (+b.year?.manufacture_year));
            setChangedTyresData(sortByYear);
        }
        if (e.target.textContent === 'Бренд') {
            const sortByBrand: any = 
             changedTyresData?.sort(
                (a:any, b:any) => {
                const brandA = a.tyre_brand?.brand.toLowerCase();
                const brandB = b.tyre_brand?.brand.toLowerCase();
                if(brandA < brandB) return -1;
                if(brandA > brandB) return 1;
                return 0;
            })
           setChangedTyresData(sortByBrand);
        }
        if (e.target.textContent === 'Сезон') {
            const sortBySeason: any = 
            changedTyresData?.sort(
                (a:any, b:any) => {
                const brandA = a.season?.season_ua.toLowerCase();
                const brandB = b.season?.season_ua.toLowerCase();
                if(brandA < brandB) return -1;
                if(brandA > brandB) return 1;
                return 0;
            })
            setChangedTyresData(sortBySeason)
        }  
        if (e.target.textContent === 'Країна поход.') { 
            const sortByCountry: any = 
            changedTyresData?.sort(
                (a:any, b:any) => 
                a.country?.country_manufacturer_ua.toLowerCase().localeCompare(
                    b.country?.country_manufacturer_ua.toLowerCase()
                )
            )
            setChangedTyresData(sortByCountry);
        }
        if (e.target.textContent === 'Категорія') {
            const sortByCategory: any = 
            changedTyresData?.sort(
                (a:any, b:any) => 
                    a.category?.category.toLowerCase().localeCompare(
                        b.category?.category.toLowerCase()
                    )
            )
            setChangedTyresData(sortByCategory);
        }
        setValueSort(e.target.textContent);
    }

    const sortWheelContent =(e: any) => {
        if (e.target.textContent === 'Код') {
            const sortByCode: any = 
            changedWheelsData?.sort(
            (a:any, b:any) => (+a.id) - (+b.id));
            setChangedWheelsData(sortByCode);
        }
        if (e.target.textContent === 'Бренд') {
            const sortByBrand: any = 
            changedWheelsData?.sort(
                (a:any, b:any) => {
                const brandA = a.wheel_brand?.brand.toLowerCase();
                const brandB = b.wheel_brand?.brand.toLowerCase();
                if(brandA < brandB) return -1;
                if(brandA > brandB) return 1;
                return 0;
            })
           setChangedWheelsData(sortByBrand);
        }
        if (e.target.textContent === 'Назва товару') {
            const sortByFullName: any = 
            changedWheelsData?.sort(
                (a:any, b:any) => {
                const brandA = a.full_name_color.toLowerCase();
                const brandB = b.full_name_color.toLowerCase();
                if(brandA < brandB) return -1;
                if(brandA > brandB) return 1;
                return 0;
            })
            setChangedWheelsData(sortByFullName);
        }
        if (e.target.textContent === 'Тип Диску') {
            const sortByType: any = 
            changedWheelsData?.sort(
                (a:any, b:any) => {
                const brandA = a.type?.type.toLowerCase();
                const brandB = b.type?.type.toLowerCase();
                if(brandA < brandB) return -1;
                if(brandA > brandB) return 1;
                return 0;
            })
            setChangedWheelsData(sortByType)
        }  
        if (e.target.textContent === 'Категорія') {
            const sortByCategory: any = 
            changedWheelsData?.sort(
                (a:any, b:any) => 
                    a.category?.category.toLowerCase().localeCompare(
                        b.category?.category.toLowerCase()
                    )
            )
            setChangedWheelsData(sortByCategory);
        }
        setValueSort(e.target.textContent);
    }

    return (
        <div  
            onClick={inputCancelHandler}
        >
            <div id="myDIV" className="headerGoods">
                <span>Каталог товарів: {chooseCat}</span>
                <div className='admHeaderCatalog'>  
                  <label className='admChooseLabel'>
                    <input className='admChooseCat'
                    onChange={(e) => setChooseCat(e.currentTarget.value)}
                    name='chooseGoodsCat' value='Шини'
                    type='radio'/>Шини</label>
                  <label className='admChooseLabel'>
                    <input className='admChooseCat'
                    onChange={(e) => setChooseCat(e.currentTarget.value)}
                    name='chooseGoodsCat' value='Диски'
                    type='radio'/>Диски</label>
                  <label className='admChooseLabel'>
                    <input className='admChooseCat'
                    onChange={(e) => setChooseCat(e.currentTarget.value)}
                    name='chooseGoodsCat' value='АКБ'
                    type='radio'/>АКБ</label>
                  <label className='admChooseLabel'>
                    <input className='admChooseCat'
                    onChange={(e) => setChooseCat(e.currentTarget.value)}
                    name='chooseGoodsCat' value='Масла'
                    type='radio'/>Масла</label> 
                  <label className='admChooseLabel'>
                    <input className='admChooseCat'
                    onChange={(e) => setChooseCat(e.currentTarget.value)}
                    name='chooseGoodsCat'value='Запчастини' 
                    type='radio'/>Запчастини</label>
                    <button className='admGoodsAddBtn'>Створити товар</button>
                </div>
                <div className='admBtnSearch'>
                    { chooseCat === 'Шини' ?
                    <input id="myInput"
                        className='inputAdminGoods' 
                        type="text" 
                        value={valueTyre}
                        onChange={(e) => setValueTyre(e.target.value)}
                        onClick={inputHandler}
                        placeholder="Введіть значення для пошуку..."
                    /> : null
                    }
                    {chooseCat === 'Диски' ?
                    <input id="myInput"
                        className='inputAdminGoods' 
                        type="text" 
                        value={valueWheel}
                        onChange={(e) => setValueWheel(e.target.value)}
                        onClick={inputHandler}
                        placeholder="Введіть значення для пошуку..."
                    /> : null
                    }
                    <ul className='inputGoodsContent'>
                        {valueTyre && isSearch ?
                            changedTyresData?.map(
                                (item: TyreContent, index: number) =>{
                            return (
                            <li key={'fullName' + index}
                                className='inputGoodsContentItem'
                                onClick={(e) => itemClickHandler(e)}
                            >
                            {`${item.id}:${item.full_name}`}
                            </li>
                            ) 
                            })  
                        : null  
                        }
                        {valueWheel && isSearch ?
                            changedWheelsData?.map(
                                (item: IWheelContentItem, index: number) =>{
                            return (
                            <li key={'fullName' + index}
                                className='inputGoodsContentItem'
                                onClick={(e) => itemClickHandler(e)}
                            >
                            {`${item.id}:${item.full_name_color}`}
                            </li>
                            ) 
                            })  
                        : null  
                        }
                    </ul>
                    <ButtonSearch clickSearchBtn={()=> console.log('searchBtn')}/>  
                </div>
            </div>
            <div className='admGoodsTable'>
            { chooseCat === 'Шини' ?
                <AdminTyreContent 
                    props={changedTyresData} 
                    showRowData={showStockPriceTyre}
                    addTyreToOrder={addToOrder}
                    sortTyres={sortTyreContent}
                    showRowImage={showPicturesTyre}
                    value={imageValue}
                    activeShowImage={active}
                    setActiveShowImage={setActive}
                />
                : null
            }
            { chooseCat === 'Диски' ?
                <AdminWheelContent 
                    props={changedWheelsData} 
                    showRowData={showStockPriceWheel}
                    addWheelToOrder={addToOrder}
                    sortWheels={sortWheelContent}
                    showRowImage={showPicturesWheel}
                    activeShowImage={active}
                    setActiveShowImage={setActive}
                    value={imageValue}
                    />
                : null
            }
            { chooseCat === 'АКБ' ?
                <AdminBatteryContent/>
                : null
            }
            { chooseCat === 'Масла' ?
                <AdminOilContent/>
                : null
            }
            {chooseCat === 'Запчастини' ?
                'Печалька =( Нажаль немає зараз товарів' : null
            }
            </div>
            <div className='admStockGoodsGroup'>
               <table className='admStockGoodsTable'>
                <tbody>
                    <tr>
                        <th>Склад</th>
                        <th>Дата оновлення</th>
                        <th>Постачальник</th>
                        <th>Місто</th>
                        <th>Наявність</th>
                        <th>Резерв</th>
                        <th>Залишки</th>
                        <th>Ціна Закупка</th>
                        <th>Ціна Роздріб</th>
                        <th>Ціна Роздріб+Дост</th>
                    </tr>    
                    {chooseCat === 'Шини'? 
                        <AdminTyreStockPriceRow 
                        stockTyres={stockTyre} 
                        priceTyres={priceTyre}
                        />
                    :   null
                    } 
                    {chooseCat === 'Диски'?
                       <AdminWheelStockPriceRow 
                       stockWheels={stockWheel} 
                       priceWheels={priceWheel}/>
                    :   null
                    }                   
                </tbody>
                </table>     
            </div>
            {addGoods ?
                <ModalAdmin active={addGoods} setActive={addToOrder}>
                    <AdminFormOrder 
                        goodsId={itemId}
                        props={props}
                        storages={storage}
                        customer={customer} 
                        comments={null} 
                        setActive={addToOrder}
                        showComment={showComment}
                        />
                </ModalAdmin>
                : null
            }    
        </div>
    );
};

export default AdminGoodsContent;