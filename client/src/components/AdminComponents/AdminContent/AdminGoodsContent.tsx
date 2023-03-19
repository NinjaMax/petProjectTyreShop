import React, {useState} from 'react';
import '../../../css/AdminComponentCss/AdminContentCss/AdminGoodsContent.css';
import ButtonSearch from '../../Buttons/ButtonSearch';
import AdminBatteryContent from './AdminBatteryContent';
import AdminOilContent from './AdminOilContent';
import AdminTyreContent from './AdminTyreContent';
import AdminWheelContent from './AdminWheelContent';
//import axios from 'axios';
import AdminTyreStockPriceRow from './AdminTyreStockPriceRow';
import AdminWheelStockPriceRow from './AdminWheelStockPriceRow';
import ModalAdmin from '../../Modal/ModalAdmin';
import AdminFormOrder from '../AdminModalForm/AdminModalFormOrder';

const AdminGoodsContent = ({comments, props, customer, storage}) => {
    const [tyreData, tyreStockData, tyrePriceData,
        wheelData, wheelPriceData, wheelStockData] = props;
    const [chooseCat, setChooseCat] = useState('Шини');
    // const [tyreData, setTyreData] = useState(null);
    // const [wheelData, setWheelData] = useState(null);
    // // const [oilData, setOildata] = useState(null);
    // // const [batteryData, setBatteryData] = useState(null);
    //const [customers, setCustomers] = useState(null);
    // const [itemIdTyre, setItemIdTyre] = useState();
    // const [itemIdWheel, setItemIdWheel] = useState();
    // const [itemIdOil, setItemIdOil] = useState();
    // const [itemIdBattery, setItemIdBattery] = useState();
    const [itemId, setItemId] = useState([]);
    const [addGoods, setAddGoods] = useState(false);
    const [stockTyre, setStockTyre] = useState();
    const [priceTyre, setPriceTyre] = useState();
    const [stockWheel, setStockWheel] = useState();
    const [priceWheel, setPriceWheel] = useState();
    // const [stockOil, setStockOil] = useState([]);
    // const [priceOil, setPriceOil] = useState([]);
    // const [stockBattery, setStockBattery] = useState([]);
    // const [priceBattery, setPriceBattery] = useState([]);

    // useEffect(()=>{
    //     axios.get("http://localhost:4000/stock/tyres/", {
    //         headers: { 'Access-Control-Allow-Origin': 'http://localhost:3000'},
    //         withCredentials: true,
    //         params: {id_tyre: itemIdTyre}
    //     })
    //     .then(response => {
    //         setStockTyre([response.data]);
    //         console.log('STOCK TYRE: ',response.data)
    //     })
    //     .catch(error => {
    //       console.log(error)
    //     });

    //     axios.get("http://localhost:4000/price/tyres/", {
    //         headers: { 'Access-Control-Allow-Origin': 'http://localhost:3000'},
    //         withCredentials: true,
    //         params: {id_tyre: itemIdTyre}
    //     })
    //     .then(response => {
    //         setPriceTyre([response.data]);
    //         console.log('PRICE TYRE: ',response.data)
    //     })
    //     .catch(error => {
    //       console.log(error)
    //     });
    // },[itemIdTyre]);

    // useEffect(()=>{
    //     axios.get("http://localhost:4000/stock/wheels/", {
    //         headers: { 'Access-Control-Allow-Origin': 'http://localhost:3000'},
    //         withCredentials: true,
    //         params: {id_wheel: itemIdWheel}
    //     })
    //     .then(response => {
    //         setStockWheel([response.data]);
    //     })
    //     .catch(error => {
    //       console.log(error)
    //     });

    //     axios.get("http://localhost:4000/price/wheels/", {
    //         headers: { 'Access-Control-Allow-Origin': 'http://localhost:3000'},
    //         withCredentials: true,
    //         params: {id_wheel: itemIdWheel}
    //     })
    //     .then(response => {
    //         setPriceWheel([response.data]);
    //         //console.log(response.data)
    //     })
    //     .catch(error => {
    //       console.log(error)
    //     });
    // },[itemIdWheel]);

    const showStockPriceTyre = (e) => {
        //console.log(typeof(e.currentTarget.getAttribute("value")));
        
        let stockByIdTyre = tyreStockData.filter(
            //item => item.id_tyre === Number(308282)
            item => item.id_tyre === Number(e.currentTarget.getAttribute("value"))
        );
        setStockTyre(stockByIdTyre);
        //console.log('STOCK TYRE: ',stockByIdTyre);
        let priceByIdTyre = tyrePriceData.filter(
            item => item.id_tyre === Number(e.currentTarget.getAttribute("value"))
        );
        setPriceTyre(priceByIdTyre);
        //console.log('PRICE TYRE: ',priceByIdTyre);
    };

    const showStockPriceWheel = (e) => {
        const stockByIdWheel = wheelStockData.filter(
            item => item.id_wheel === Number(e.currentTarget.getAttribute("value"))
        );
        setStockWheel(stockByIdWheel);

        const pricekByIdWheel = wheelPriceData.filter(
            item => item.id_wheel === Number(e.currentTarget.getAttribute("value"))
        );
        setPriceWheel(pricekByIdWheel);
    };

    // const showStockPriceOil = (e) => {
    //     setItemIdO(e.currentTarget.getAttribute("value"));
    // };

    // const showStockPriceBattery = (e) => {
    //     setItemIdB(e.currentTarget.getAttribute("value"));
    // };

    const addToOrder = (e) => {
        setAddGoods(!addGoods);
        //console.log(e.currentTarget.value)
        let itemTyre = tyreData?.find(item => item.id === e.currentTarget.value);
        let itemWheel = wheelData?.find(item => item.id === e.currentTarget.value);
        //const itemTyre = tyreData.find(item => item ==e.currentTarget.value);
        //const itemTyre = tyreData.find(item => item ==e.currentTarget.value);
        
        //console.log('GOODS: ', itemTyre);

        if(itemTyre) {
            setItemId(itemTyre);
            //setAddGoods(!addGoods);
        }
            
        if(itemWheel) {
             setItemId(itemWheel);
            
        }  
    }

    //console.log('ITEMID',itemId);
    //console.log(tyreStockData);
    //console.log(tyreData);
    // console.log(stockTyre);
    // console.log(priceTyre);

    return (
        <div>
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
                    <input className='inputAdminGoods' type="text" id="myInput" placeholder="Введіть значення для пошуку..."/>
                    <ButtonSearch clickSearchBtn={undefined}/>  
                </div>
            </div>
            <div className='admGoodsTable'>
            { chooseCat === 'Шини' ?
                <AdminTyreContent props={tyreData} showRowData={showStockPriceTyre}
                addTyreToOrder={addToOrder}/>
                : null
            }
            { chooseCat === 'Диски' ?
                <AdminWheelContent props={wheelData} showRowData={showStockPriceWheel}
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
                        <AdminTyreStockPriceRow stockTyres={stockTyre} priceTyres={priceTyre}/>
                    :   null
                    } 
                    {chooseCat === 'Диски'?
                       <AdminWheelStockPriceRow stockWheels={stockWheel} priceWheels={priceWheel}/>
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
                        storage={storage}
                        customer={customer}/>
                </ModalAdmin>
                : null
            }    
        </div>
    );
};

export default AdminGoodsContent;