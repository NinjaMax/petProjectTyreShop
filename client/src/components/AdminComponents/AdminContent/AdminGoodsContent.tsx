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
//import { sortTyres } from '../../sortService/sortAdminGoods';

const AdminGoodsContent = (
    {showComment, comments, props, customer, storage}:IGoodsContent) => {
    const [tyreData, tyreStockData, tyrePriceData,
        wheelData, wheelPriceData, wheelStockData] = props;
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
    const [stockTyre, setStockTyre] = useState<any[]>();
    const [priceTyre, setPriceTyre] = useState<any[]>();
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

    const showStockPriceTyre = (e: { currentTarget: { getAttribute: (arg0: string) => any; }; }) => {
        let stockByIdTyre: any[] | undefined = tyreStockData?.filter(
            (item:{id_tyre:number}) => item.id_tyre === Number(e.currentTarget.getAttribute("data-value"))
        );
        setStockTyre(stockByIdTyre);

        let priceByIdTyre: any[] | undefined = tyrePriceData?.filter(
            (item:{id_tyre:number}) => item.id_tyre === Number(e.currentTarget.getAttribute("data-value"))
        );
        setPriceTyre(priceByIdTyre);
    };

    const showStockPriceWheel = (e: { currentTarget: { getAttribute: (arg0: string) => any; }; }) => {
        const stockByIdWheel: {}[] | undefined = wheelStockData?.filter(
            (item:{id_wheel:number}) => item.id_wheel === Number(e.currentTarget.getAttribute("data-value"))
        );
        setStockWheel(stockByIdWheel);

        const priceByIdWheel: {}[] | undefined = wheelPriceData?.filter(
            (item:{id_wheel:number}) => item.id_wheel === Number(e.currentTarget.getAttribute("data-value"))
        );
        setPriceWheel(priceByIdWheel);
    };

    const addToOrder = (e: { currentTarget: { value: string; }; }) => {
        setAddGoods(!addGoods);
        let itemTyre = tyreData?.find((item:{id:string}) => item.id === e.currentTarget?.value);
        let itemWheel = wheelData?.find((item:{id:string}) => item.id === e.currentTarget?.value);

        if(itemTyre) {
            setItemId(itemTyre);
        }   
        if(itemWheel) {
            setItemId(itemWheel);    
        }  
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
                    value={valueSort}
                    />
                : null
            }
            { chooseCat === 'Диски' ?
                <AdminWheelContent 
                    props={changedWheelsData} 
                    showRowData={showStockPriceWheel}
                    addWheelToOrder={addToOrder}
                    sortWheels={sortWheelContent}
                    value={valueSort}
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
                        priceTyres={priceTyre}/>
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