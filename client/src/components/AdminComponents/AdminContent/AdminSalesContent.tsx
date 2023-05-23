import React, { useState } from 'react';
import '../../../css/AdminComponentCss/AdminContentCss/AdminSalesContent.css';
import ButtonSearch from '../../buttons/ButtonSearch';
import { ISalesItem } from './types/SalesItem.type';
import { IAdminSales } from './interfaces/AdminSales.interface';



const AdminSalesContent = ({sales}: IAdminSales) => {
    const [value, setValue] = useState('');
    const [isSearch, setIsSearch] = useState(true);

    const filteredSalesData = sales?.filter((salesItem: any) => {
        return salesItem.id_sales === +value.toLowerCase() ||
        salesItem.customer.full_name.toLowerCase().includes(value.toLowerCase())  
    })

    const itemClickHandler = (e: any) => {
        const entity = e.target.textContent.split(':')
        setValue(entity[1]);
        //setValue(e.target.value);
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

    return (
        <div onClick={inputCancelHandler}>
        <div className="admSalesContent">
            <span>Продажі:</span>
            <div className='admSalesHeader'></div>
            <input 
                id="myInput"
                className='inputAdminSales' 
                type="text" 
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onClick={inputHandler} 
                placeholder="Введіть значення для пошуку..."
            />
                <ul className='inputSalesContent'>
                        {value && isSearch ?
                            filteredSalesData?.map(
                                (item: ISalesItem, index: number) =>{
                            return (
                            <li key={'fullName' + index}
                                className='inputSalesContentItem'
                                onClick={itemClickHandler}
                            >
                            {`${item.id_sales}: ${item.customer.full_name}`}
                            </li>
                            ) 
                            })  
                        : null  
                        }
                    </ul>
            <ButtonSearch clickSearchBtn={()=> console.log('searchBtn')}/>
        </div>
        <div className='admSalesTable'>
        <table className='admListSalesTable'>
            <thead>
                <tr className='headerSalesTable'>
                    <th>Тип</th>
                    <th>Код</th>
                    <th>Дата</th>
                    <th>Дата оновлення</th>
                    <th>Покупець</th>
                    <th>Склад</th>
                    <th>Сума</th>
                    <th>Статус</th>
                    <th>Тип замовлення</th>
                    <th>Перевізник</th>
                    <th>Статус Доставки</th>
                    <th>Тип оплати</th>
                    <th>Статус Оплати</th>
                    <th>Користувач</th>
                    <th>Замітки</th>
                    <th>Опції</th>
                </tr>
            </thead>    
            <tbody>
            {filteredSalesData ? filteredSalesData.map((items: ISalesItem) => (
                    <tr key={'or' + items.id_sales}
                        //onClick={e => showComment(e)}
                        //onDoubleClick={e => showOrderData(e)}
                        data-value={items.id_sales}>
                        <td>{items.id_sales}</td>
                        <td>{new Date(items.createdAt).toLocaleString()}</td>
                        <td>{new Date(items.updatedAt).toLocaleString()}</td>
                        <td>{items.customer.full_name}</td>
                        <td>{items?.storage}</td>
                        <td>{items?.order_storage?.reduce(
                                (sum:any, current:any) => 
                                sum + current.total, 0)}
                        </td>
                        <td>{items.status}</td>
                        <td>{items.order_view}</td>
                        <td>{items.delivery}</td>
                        <td>{items.status_delivery}</td>
                        <td>{items.pay_view}</td>
                        <td>{items.status_pay}</td>
                        <td>{items.user.name}</td>
                        <td>{items.notes}</td>
                        <td>
                        <button className='editAdmGoods'>
                            <i className="fas fa-edit"></i>
                        </button>
                        <button className='closeAdmGoods'>
                            <i className="fa fa-remove"></i>
                        </button>                  
                        </td>
                    </tr>
                    ))
                    : <tr><td>......Очікуемо продажі......</td></tr>
                    }                   
            </tbody>
        </table>
        </div> 
    </div>
    );
};

export default AdminSalesContent;