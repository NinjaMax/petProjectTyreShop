import {React, useState, useEffect} from 'react';
import '../../../css/AdminComponentCss/AdminContentCss/AdminGoodsContent.css';
import ButtonSearch from '../../Buttons/ButtonSearch';
import AdminBatteryContent from './AdminBatteryContent';
import AdminOilContent from './AdminOilContent';
import AdminTyreContent from './AdminTyreContent';
import AdminWheelContent from './AdminWheelContent';
import axios from 'axios';

const AdminGoodsContent = () => {
    const [chooseCat, setChooseCat] = useState('Шини');
    const [tyreData, setTyreData] = useState(null);
    const [itemId, setItemId] = useState();
    const [stockTyre, setStockTyre] =useState([]);
    const [priceTyre, setPriceTyre] =useState();

    useEffect(()=>{
        axios.get("http://localhost:4000/tyres", {
            headers: { 'Access-Control-Allow-Origin': 'http://localhost:3000'},
            withCredentials: true})
        .then(response => {
            setTyreData(response.data);
            //console.log(response.data);
        })
        .catch(error => {
          console.log(error)
        })
    },[]);

    useEffect(()=>{
        axios.get("http://localhost:4000/stock/tyres/", {
            headers: { 'Access-Control-Allow-Origin': 'http://localhost:3000'},
            withCredentials: true,
            params: {id: itemId}
        })
        .then(response => {
            setStockTyre([response.data]);
        })
        .catch(error => {
          console.log(error)
        });

        axios.get("http://localhost:4000/price/tyres/", {
            headers: { 'Access-Control-Allow-Origin': 'http://localhost:3000'},
            withCredentials: true,
            params: {id: itemId}
        })
        .then(response => {
            setPriceTyre([response.data]);
            //console.log(response.data)
        })
        .catch(error => {
          console.log(error)
        });
    },[itemId]);

    const showStockPrice = (e) => {
        setItemId(e.currentTarget.getAttribute("value"));
    };

    //console.log(itemId);

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
                    <ButtonSearch/>  
                </div>
            </div>
            <div className='admGoodsTable'>
            { chooseCat === 'Шини'?
                <AdminTyreContent props={tyreData} showRowData={showStockPrice}/>
                : null
            }
            { chooseCat === 'Диски' ?
                <AdminWheelContent/>
                : null
            }
            { chooseCat === 'АКБ'?
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
                        <th>Постачальник</th>
                        <th>Місто</th>
                        <th>Наявність</th>
                        <th>Резерв</th>
                        <th>Залишки</th>
                        <th>Ціна Закупка</th>
                        <th>Ціна Роздріб</th>
                        <th>Ціна Роздріб+Дост</th>
                    </tr>
                    
                     <tr>
                     {stockTyre ? stockTyre.map((item) => (
                        <>
                        <td key={'stst' + item.id}>{item.storage?.storage}</td>
                        <td key={'sts' + item.id}>{item.supplier?.name}</td>
                        <td key={'stsc' + item.id}>{item.supplier?.city_ua}</td>
                        <td key={'stsk' + item.id}>{item?.stock}</td>
                        <td key={'strs' + item.id}>{item?.reserve}</td>
                        <td key={'strm' + item.id}>{item?.remainder}</td>
                        </>
                        ))
                    : <td>Покищо немає данних. Очікуємо...</td>
                    }
                    { priceTyre ? priceTyre.map((item) =>(
                    <>
                        <td key={'tpr' + item.id}>{item.price_wholesale}</td>
                        <td key={'tprr' + item.id}>{item.price}</td>
                        <td key={'tprd' + item.id}>{item.price_plus_delivery}</td>
                    </> 
                    ))
                   : <td>Покищо немає данних. Очікуємо...</td>
                    }     
                 </tr>
                 
                </tbody>
                </table>     
            </div>    
        </div>
    );
};

export default AdminGoodsContent;