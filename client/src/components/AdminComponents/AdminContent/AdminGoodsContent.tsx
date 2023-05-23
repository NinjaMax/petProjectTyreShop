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
import { sortTyres } from '../../sortService/sortAdminGoods';


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
    const [value, setValue] = useState('');
    const [changedTyresData, setChangedTyresData] = useState<any[] | null>(null);
    const [isSearch, setIsSearch] = useState(false);
    
    
    // useEffect(() => {
    //     if(filteredTyreData) {
    //         setChangedTyresData(filteredTyreData);  
    //     }
    // },[filteredTyreData]);

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

    const filteredTyreData: any = tyreData?.filter((goodsItem: any) => {
        return goodsItem.id.toLowerCase().includes(value.toLowerCase()) ||
        goodsItem.full_name.toLowerCase().includes(value.toLowerCase())  
    })

    const filteredWheelData: any = wheelData?.filter((goodsItem: any) => {
        return goodsItem.id.toLowerCase().includes(value.toLowerCase()) ||
        goodsItem.full_name.toLowerCase().includes(value.toLowerCase())  
    })

    const itemClickHandler = (e: any) => {
        const entity = e.target.textContent.split(':')
        setValue(entity[1]);
        setIsSearch(!isSearch);
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
        console.log(e.target.textContent)
        if (e.target.textContent === 'Код') {
        //const sortTyresByCode = () => {
            //const sortByCode: any = 
            filteredTyreData?.sort(
            (a:any, b:any) => (+a.id) - (+b.id));
            
           // return value;
           console.log('sortCode: ', filteredTyreData);
        //}    
        }
        if (e.target.textContent === 'Рік Виробн.') {
        //const sortTyresByYear = () => {
            //const sortByYear: any = 
            filteredTyreData?.sort(
            (a:any, b:any) => (+a.id) - (+b.id));
            
           // return value;
           console.log('sortYear: ', filteredTyreData);
        //}
        }
        if (e.target.textContent === 'Бренд') {
        //const sortTyresByBrand = () => {
            //const sortByBrand: any = 
             filteredTyreData?.sort(
                (a:any, b:any) => {
                const brandA = a.tyre_brand?.brand.toLowerCase();
                const brandB = b.tyre_brand?.brand.toLowerCase();
                if(brandA < brandB) return -1;
                if(brandA > brandB) return 1;
                return 0;
            })
           // return value;
           console.log('sortBrand: ', filteredTyreData);
        //}
        }
        if (e.target.textContent === 'Сезон') {
        //const sortTyresBySeason = () => {
            //const sortBySeason: any = 
            filteredTyreData?.sort(
                (a:any, b:any) => {
                const brandA = a.season?.season_ua.toLowerCase();
                const brandB = b.season?.season_ua.toLowerCase();
                if(brandA < brandB) return -1;
                if(brandA > brandB) return 1;
                return 0;
            })
            console.log('sortSeason: ', filteredTyreData);
            //return value;
        //}
        }  
        if (e.target.textContent === 'Країна поход.') { 
        //const sortTyresByCountry = () => {
            //const sortByCountry: any = 
            filteredTyreData?.sort(
                (a:any, b:any) => {
                const brandA = a.country?.country_manufacturer_ua.toLowerCase();
                const brandB = b.country?.country_manufacturer_ua.toLowerCase();
                if(brandA < brandB) return -1;
                if(brandA > brandB) return 1;
                return 0;
            })
            console.log('sortCountry: ', filteredTyreData);
            //return value;
        //}
        }
        if (e.target.textContent === 'Категорія') {
        //const sortTyresByCategory = () => {
            //const sortByCategory: any = 
            filteredTyreData?.sort(
                (a:any, b:any) => {
                const brandA = a.category?.category.toLowerCase();
                const brandB = b.category?.category.toLowerCase();
                if(brandA < brandB) return -1;
                if(brandA > brandB) return 1;
                return 0;
            })
            //return value;
            console.log('sortCategory: ', filteredTyreData);
        //}
        }

        //return filteredTyreData;
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
                    <input 
                        id="myInput"
                        className='inputAdminGoods' 
                        type="text" 
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        onClick={inputHandler}
                        placeholder="Введіть значення для пошуку..."
                    />
                    <ul className='inputGoodsContent'>
                        {value && isSearch ?
                            filteredTyreData?.map(
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
                        {value && isSearch ?
                            filteredWheelData?.map(
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
                    </ul>
                    <ButtonSearch clickSearchBtn={()=> console.log('searchBtn')}/>  
                </div>
            </div>
            <div className='admGoodsTable'>
            { chooseCat === 'Шини' ?
                <AdminTyreContent 
                    props={filteredTyreData} 
                    showRowData={showStockPriceTyre}
                    addTyreToOrder={addToOrder}
                    sortTyres={sortTyreContent}
                    />
                : null
            }
            { chooseCat === 'Диски' ?
                <AdminWheelContent 
                    props={filteredWheelData} 
                    showRowData={showStockPriceWheel}
                    addWheelToOrder={addToOrder}/>
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