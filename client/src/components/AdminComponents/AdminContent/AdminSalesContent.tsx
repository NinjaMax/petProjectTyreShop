import React, { useEffect, useState } from 'react';
import '../../../css/AdminComponentCss/AdminContentCss/AdminSalesContent.css';
import ButtonSearch from '../../buttons/ButtonSearch';
import { ISalesItem } from './types/SalesItem.type';
import { IAdminSales } from './interfaces/AdminSales.interface';

const AdminSalesContent = ({sales}: IAdminSales) => {
    const [filteredSales, setFilteredSales] = useState< any[] | null>(sales);
    const [value, setValue] = useState('');
    const [isSearch, setIsSearch] = useState(true);

    useEffect(() => {
        if(value.length !== 0) {
            const filteredSalesData: any = sales?.filter((salesItem: any) => {
                return salesItem.id_sales === +value.toLowerCase() ||
                salesItem.customer.full_name.toLowerCase().includes(value.toLowerCase())  
            })
            setFilteredSales(filteredSalesData);
        } else {
            setFilteredSales(sales);
        }
    },[sales, value])

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

    const sortSales = (e: any) => {
        if (e.target.textContent === 'Код') {
            const sortByCode: any = 
            filteredSales?.sort(
            (a:any, b:any) => (+a.id_sales) - (+b.id_sales));
            setFilteredSales(sortByCode);
        }
        if (e.target.textContent === 'Дата') {
            const sortByDate: any = 
            filteredSales?.sort(
            (a:any, b:any) => 
            (+(new Date(a.createdAt).toLocaleString())) - (+(new Date(b.createdAt).toLocaleString())));
            setFilteredSales(sortByDate);
        }
        if (e.target.textContent === 'Дата оновлення') {
            const sortByDateUpdate: any = 
            filteredSales?.sort(
            (a:any, b:any) => 
            (+(new Date(a.updatedAt).toLocaleString())) - (+(new Date(b.updatedAt).toLocaleString())));
            setFilteredSales(sortByDateUpdate);
        }
        if (e.target.textContent === 'Покупець') {
            const sortByCustomer: any = 
            filteredSales?.sort(
                    (a:any, b:any) => 
                    a.customer.full_name.toLowerCase().localeCompare(
                        b.customer.full_name.toLowerCase()
                    )
            )
            setFilteredSales(sortByCustomer);
        }
        if (e.target.textContent === 'Склад') {
            const sortByStorage: any = 
            filteredSales?.sort(
                (a:any, b:any) => 
                a.storage.toLowerCase().localeCompare(
                    b.storage.toLowerCase()
                )
        )
            setFilteredSales(sortByStorage)
        }  
        if (e.target.textContent === 'Статус') { 
            const sortByStatus: any = 
            filteredSales?.sort(
                (a:any, b:any) => 
                a.status.toLowerCase().localeCompare(
                    b.status.toLowerCase()
                )
            )
            setFilteredSales(sortByStatus);
        }
        if (e.target.textContent === 'Тип замовлення') { 
            const sortByOrderType: any = 
            filteredSales?.sort(
                (a:any, b:any) => 
                a.order_view.toLowerCase().localeCompare(
                    b.order_view.toLowerCase()
                )
            )
            setFilteredSales(sortByOrderType);
        }
        if (e.target.textContent === 'Перевізник') { 
            const sortByDelivery: any = 
            filteredSales?.sort(
                (a:any, b:any) => 
                a.delivery.toLowerCase().localeCompare(
                    b.delivery.toLowerCase()
                )
            )
            setFilteredSales(sortByDelivery);
        }
        if (e.target.textContent === 'Статус Доставки') { 
            const sortByDeliveryStatus: any = 
            filteredSales?.sort(
                (a:any, b:any) => 
                a.status_delivery.toLowerCase().localeCompare(
                    b.status_delivery.toLowerCase()
                )
            )
            setFilteredSales(sortByDeliveryStatus);
        }
        if (e.target.textContent === 'Тип оплати') { 
            const sortByPayType: any = 
            filteredSales?.sort(
                (a:any, b:any) => 
                a.pay_view.toLowerCase().localeCompare(
                    b.pay_view.toLowerCase()
                )
            )
            setFilteredSales(sortByPayType);
        }
        if (e.target.textContent === 'Статус Оплати') { 
            const sortByPayStatus: any = 
            filteredSales?.sort(
                (a:any, b:any) => 
                a.status_pay.toLowerCase().localeCompare(
                    b.status_pay.toLowerCase()
                )
            )
            setFilteredSales(sortByPayStatus);
        }
        if (e.target.textContent === 'Користувач') {
            const sortByUser: any = 
            filteredSales?.sort(
                (a:any, b:any) => 
                    a.user.name.toLowerCase().localeCompare(
                        b.user.name.toLowerCase()
                    )
            )
            setFilteredSales(sortByUser);
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
                            filteredSales?.map(
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
                    <th onClick={sortSales}>Код</th>
                    <th onClick={sortSales}>Дата</th>
                    <th onClick={sortSales}>Дата оновлення</th>
                    <th onClick={sortSales}>Покупець</th>
                    <th onClick={sortSales}>Склад</th>
                    <th>Сума</th>
                    <th onClick={sortSales}>Статус</th>
                    <th onClick={sortSales}>Тип замовлення</th>
                    <th onClick={sortSales}>Перевізник</th>
                    <th onClick={sortSales}>Статус Доставки</th>
                    <th onClick={sortSales}>Тип оплати</th>
                    <th onClick={sortSales}>Статус Оплати</th>
                    <th onClick={sortSales}>Користувач</th>
                    <th>Замітки</th>
                    <th>Опції</th>
                </tr>
            </thead>    
            <tbody>
            {filteredSales ? filteredSales.map((items: ISalesItem) => (
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