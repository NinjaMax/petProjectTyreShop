import React from 'react';
import '../../../css/AdminComponentCss/AdminContentCss/AdminSalesContent.css';
import ButtonSearch from '../../buttons/ButtonSearch';
import { ISalesItem } from './types/SalesItem.type';

interface IAdminSales {
    sales: [] | null;
//     comments?:[] | null;
//     props:[[] | null, ...any[][] | null[]];
//     showComment(arg0: any):void;
//     orders: [] | null;
//     customer: [] | null;
//     storage:[any] | null;
//     stockByIdTyre?: []; 
//     tyreStockData?:[];
//     tyrePriceData?:[];
//     wheelData?:[]; 
//     wheelPriceData?:[];
//     wheelStockData?:[];
}

const AdminSalesContent = ({sales}: IAdminSales) => {
    return (
        <div>
        <div className="admSalesContent">
            <span>Продажі:</span>
            <div className='admSalesHeader'></div>
            <input className='inputAdminSales' type="text" id="myInput" placeholder="Введіть значення для пошуку..."/>
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
            {sales ? sales.map((items: ISalesItem) => (
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