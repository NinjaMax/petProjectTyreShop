import React, { useEffect, useState } from 'react';
import '../../../css/AdminComponentCss/AdminContentCss/AdminSalesContent.css';
import { ISalesItem } from './types/SalesItem.type';
import { IAdminSales } from './interfaces/AdminSales.interface';
import { FixedSizeList  as List } from 'react-window';
import SpinnerCarRot from '../../spinners/SpinnerCarRot';

const AdminSalesContent = ({sales}: IAdminSales) => {
    const [filteredSales, setFilteredSales] = useState< any[] | null>(sales);
    const [activeSales, setActiveSales] = useState(false);
    const [salesData, setSalesData] = useState(null);
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

    const showSalesData = async (e: any) => {
        let orderSupInfo: any;
        const dataSupName = e.currentTarget.getAttribute("data-name");
        const dataSupValue = e.currentTarget.getAttribute("data-value");
        if (dataSupName === 'salesShow') {
            orderSupInfo = sales?.find(
            (item:{id_sale: number}) => 
                item.id_sale === dataSupValue || 
                e.target.value
            );
        }
        if (e.currentTarget.name === 'editSupOrder') {
            orderSupInfo = sales?.find(
            (item:{id_sale: number}) => 
                item.id_sale === e.currentTarget.value
            );  
        }  
        if(orderSupInfo) {
            setSalesData(orderSupInfo);
            setActiveSales(!activeSales);
        }
    };

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

    const salesRowTable = ({index, style}: any) => (
        <div className='admOrderSupGridItem' style={style}
            onDoubleClick={showSalesData}
            data-name='salesShow'
            data-value={filteredSales![index].id_sale}>
            <div>{filteredSales![index].id_sale}</div>
            <div>{new Date(filteredSales![index].createdAt).toLocaleString()}</div>
            <div>{filteredSales![index]?.customer?.name}</div>
            <div>{filteredSales![index].id_order}</div>
            <div>{filteredSales![index]?.status}</div>
            <div>{filteredSales![index]?.order_view}</div>
            <div>{filteredSales![index]?.delivery}</div>
            <div>{filteredSales![index]?.status_delivery}</div>
            <div>{filteredSales![index]?.pay_view}</div>
            <div>{filteredSales![index]?.status_pay}</div>
            <div>{filteredSales![index]?.user?.name}</div>
            <div>{filteredSales![index]?.notes}</div>
            <div>
                <button className='basketAdmGoods'
                    value={filteredSales![index].id_order_sup}
                    >
                    <i className="fas fa-warehouse"
                        title='Додати на склад'
                    ></i>
                </button>
                <button className='basketAdmGoods'
                    value={filteredSales![index].id_order_sup}
                    onClick={() => console.log('SOME_FUNCTION')}>
                    <i className="fas fa-truck-loading"></i>
                </button>
                <button className='editAdmGoods'
                    name='editSupOrder'
                    value={filteredSales![index].id_order_sup}
                    >
                    <i className="fas fa-edit"
                        title='Редагувати'
                    ></i>
                </button>
                <button className='closeAdmGoods'
                    value={filteredSales![index].id_order_sup}>
                    <i className="fa fa-remove"
                        title='Видалити'
                    ></i>
                </button>                  
            </div>
        </div>    
    );

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
        </div>
        {filteredSales ? 
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
            </tbody>
        </table>
        <List
            className="admOrderSupTableColmId"
            itemCount={filteredSales!.length}
            itemSize={65}
            height={330}
            width={1315}
        >
            {salesRowTable}
        </List>       
        </div> :
        <SpinnerCarRot/>
        }
    </div>
    );
};

export default AdminSalesContent;