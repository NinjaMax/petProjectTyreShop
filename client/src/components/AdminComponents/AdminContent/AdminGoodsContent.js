import {React, useState} from 'react';
import '../../../css/AdminComponentCss/AdminContentCss/AdminGoodsContent.css';
import ButtonSearch from '../../Buttons/ButtonSearch';
import AdminBatteryContent from './AdminBatteryContent';
import AdminOilContent from './AdminOilContent';
import AdminTyreContent from './AdminTyreContent';
import AdminWheelContent from './AdminWheelContent';

const AdminGoodsContent = () => {
    const [chooseCat, setChooseCat] = useState('Шини');

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
                <AdminTyreContent/>
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
            <table className='admStockGoodsTable'>
                <tbody>
                    <tr>
                        <th>Склад</th>
                        <th>Наявність</th>
                        <th>Резерв</th>
                        <th>Залишки</th>
                        <th>Ціна Закупка</th>
                        <th>Ціна Оптова</th>
                        <th>Ціна Роздріб</th>
                    </tr>
                    <tr>
                        <td>Прайс Постачальник</td>
                        <td>8</td>
                        <td>2</td>
                        <td>6</td>
                        <td>2000</td>
                        <td>2100</td>
                        <td>2300</td>
                    </tr>
                    <tr>
                        <td>Склад Основний</td>
                        <td>4</td>
                        <td>0</td>
                        <td>4</td>
                        <td>1950</td>
                        <td>2150</td>
                        <td>2380</td>
                    </tr>
                    
                </tbody>
            </table>    
        </div>
    );
};

export default AdminGoodsContent;