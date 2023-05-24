import React, {useEffect, useState} from 'react';
import '../../../css/AdminComponentCss/AdminContentCss/AdminOrderContent.css';
import ButtonSearch from '../../buttons/ButtonSearch';
import ModalAdmin from '../../modal/ModalAdmin';
import AdminFormOrder from '../adminModalForm/AdminModalFormOrder';
import AdminModalOrderSup from '../adminModalForm/AdminModalOrderSup';
import { IComments } from './types/Comment.type';
import { IAdminOrder } from './interfaces/AdminOrder.interface';
import { IOrdersItem } from './types/OrderItem.type';

const AdminOrderContent = (
    {props, orders, customer, comments, showComment, storage}:IAdminOrder
    ) => {
    const [activeOrder, setActiveOrder] = useState(false);
    const [activeOrderSup, setActiveOrderSup] = useState(false);
    const [orderData, setOrderData] = useState<IOrdersItem | null>(null);
    const [filteredOrder, setFilteredOrder] = useState< any[] | null>(orders);
    const [value, setValue] = useState('');
    const [isSearch, setIsSearch] = useState(true);

    useEffect(() => {
        if(value.length !== 0) {
            const filteredOrderData: any = orders?.filter((orderItem: any) => {
                return orderItem.id_order === +value.toLowerCase() ||
                orderItem.customer.full_name.toLowerCase().includes(value.toLowerCase())  
            })
            setFilteredOrder(filteredOrderData);
        } else {
            setFilteredOrder(orders);
        }
    },[orders, value])

    const activeFormOrder = async(e:any) => {
        if (orderData) {
            setOrderData(null);
        }
        setActiveOrder(!activeOrder);
        showComment(e);
    }

    const activeFormOrderSup = () => {
        setActiveOrderSup(!activeOrderSup);
    }

    const showOrderData = async (e: any) => {
        const orderInfo = orders?.find(
            (item:{id_order: number}) => 
                item.id_order === e.currentTarget.getAttribute("data-value") || 
                e.target.value
            );
        if(orderInfo) {
            setOrderData(orderInfo);
            setActiveOrder(!activeOrder);
            showComment(e);
        }
    }

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

    const sortOrder = (e: any) => {
        if (e.target.textContent === 'Код') {
            const sortByCode: any = 
            filteredOrder?.sort(
            (a:any, b:any) => (+a.id_order) - (+b.id_order));
            setFilteredOrder(sortByCode);
        }
        if (e.target.textContent === 'Дата') {
            const sortByDate: any = 
            filteredOrder?.sort(
            (a:any, b:any) => 
            (+(new Date(a.createdAt).toLocaleString())) - (+(new Date(b.createdAt).toLocaleString())));
            setFilteredOrder(sortByDate);
        }
        if (e.target.textContent === 'Дата оновлення') {
            const sortByDateUpdate: any = 
            filteredOrder?.sort(
            (a:any, b:any) => 
            (+(new Date(a.updatedAt).toLocaleString())) - (+(new Date(b.updatedAt).toLocaleString())));
            setFilteredOrder(sortByDateUpdate);
        }
        if (e.target.textContent === 'Покупець') {
            const sortByCustomer: any = 
            filteredOrder?.sort(
                    (a:any, b:any) => 
                    a.customer.full_name.toLowerCase().localeCompare(
                        b.customer.full_name.toLowerCase()
                    )
            )
            setFilteredOrder(sortByCustomer);
        }
        if (e.target.textContent === 'Склад') {
            const sortByStorage: any = 
            filteredOrder?.sort(
                (a:any, b:any) => 
                a.storage.toLowerCase().localeCompare(
                    b.storage.toLowerCase()
                )
        )
            setFilteredOrder(sortByStorage)
        }  
        if (e.target.textContent === 'Статус') { 
            const sortByStatus: any = 
            filteredOrder?.sort(
                (a:any, b:any) => 
                a.status.toLowerCase().localeCompare(
                    b.status.toLowerCase()
                )
            )
            setFilteredOrder(sortByStatus);
        }
        if (e.target.textContent === 'Тип замовлення') { 
            const sortByOrderType: any = 
            filteredOrder?.sort(
                (a:any, b:any) => 
                a.order_view.toLowerCase().localeCompare(
                    b.order_view.toLowerCase()
                )
            )
            setFilteredOrder(sortByOrderType);
        }
        if (e.target.textContent === 'Перевізник') { 
            const sortByDelivery: any = 
            filteredOrder?.sort(
                (a:any, b:any) => 
                a.delivery.toLowerCase().localeCompare(
                    b.delivery.toLowerCase()
                )
            )
            setFilteredOrder(sortByDelivery);
        }
        if (e.target.textContent === 'Статус Доставки') { 
            const sortByDeliveryStatus: any = 
            filteredOrder?.sort(
                (a:any, b:any) => 
                a.status_delivery.toLowerCase().localeCompare(
                    b.status_delivery.toLowerCase()
                )
            )
            setFilteredOrder(sortByDeliveryStatus);
        }
        if (e.target.textContent === 'Тип оплати') { 
            const sortByPayType: any = 
            filteredOrder?.sort(
                (a:any, b:any) => 
                a.pay_view.toLowerCase().localeCompare(
                    b.pay_view.toLowerCase()
                )
            )
            setFilteredOrder(sortByPayType);
        }
        if (e.target.textContent === 'Статус Оплати') { 
            const sortByPayStatus: any = 
            filteredOrder?.sort(
                (a:any, b:any) => 
                a.status_pay.toLowerCase().localeCompare(
                    b.status_pay.toLowerCase()
                )
            )
            setFilteredOrder(sortByPayStatus);
        }
        if (e.target.textContent === 'Користувач') {
            const sortByUser: any = 
            filteredOrder?.sort(
                (a:any, b:any) => 
                    a.user.name.toLowerCase().localeCompare(
                        b.user.name.toLowerCase()
                    )
            )
            setFilteredOrder(sortByUser);
        }
    }

    return (
        <div  onClick={inputCancelHandler}>
            <div className="admOrderContent">
                <span>Замовлення Покупців:</span>
                <div className='admOrderHeader'
                    onClick={(e) => e.stopPropagation()}
                >
                    <button className='admOrderHeaderBtn'
                        onClick={(e) => activeFormOrder(e)}
                        value={'0'} 
                        >
                        Додати замовлення
                    </button>
                </div>
                <input 
                    className='inputAdminOrder' 
                    type="text" 
                    id="myInput" 
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    onClick={inputHandler}
                    placeholder="Введіть значення для пошуку..."
                />
                    <ul className='inputOrderContent'>
                        {value && isSearch ?
                            filteredOrder?.map(
                                (item: IOrdersItem, index: number) =>{
                            return (
                            <li key={'fullName' + index}
                                className='inputOrderContentItem'
                                onClick={itemClickHandler}
                            >
                            {`${item.id_order}:${item.customer.full_name}`}
                            </li>
                            ) 
                            })  
                        : null  
                        }
                    </ul>
                <ButtonSearch clickSearchBtn={()=> console.log('searchBtn')}/>
            </div>
            <div className='admOrdersTable'
            //onClick={(e) => e.stopPropagation()}
            >
            <table className='admListOrdersTable'>
                <thead>
                    <tr className='headerOrderTable'>
                        <th onClick={sortOrder}>Код</th>
                        <th onClick={sortOrder}>Дата</th>
                        <th onClick={sortOrder}>Дата оновлення</th>
                        <th onClick={sortOrder}>Покупець</th>
                        <th onClick={sortOrder}>Склад</th>
                        <th onClick={sortOrder}>Сума</th>
                        <th onClick={sortOrder}>Статус</th>
                        <th onClick={sortOrder}>Тип замовлення</th>
                        <th onClick={sortOrder}>Перевізник</th>
                        <th onClick={sortOrder}>Статус Доставки</th>
                        <th onClick={sortOrder}>Тип оплати</th>
                        <th onClick={sortOrder}>Статус Оплати</th>
                        <th onClick={sortOrder}>Користувач</th>
                        <th>Нотатки</th>
                        <th>Опції</th>
                    </tr>
                </thead>    
                <tbody>
                    {filteredOrder ? filteredOrder.map((items: IOrdersItem) => (
                    <tr key={'or' + items.id_order}
                        onClick={e => showComment(e)}
                        onDoubleClick={e => showOrderData(e)}
                        data-value={items.id_order}>
                        <td>{items.id_order}</td>
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
                            <button className='basketAdmGoods'
                                value={items.id_order}
                                onClick={activeFormOrderSup}>
                                <i className="fas fa-truck-loading"></i>
                            </button>
                            <button className='editAdmGoods'
                                value={items.id_order}
                                onClick={(e) => showOrderData(e)}>
                                <i className="fas fa-edit"></i>
                            </button>
                            <button className='closeAdmGoods'
                                value={items.id_order}>
                                <i className="fa fa-remove"></i>
                            </button>                  
                        </td>
                    </tr>
                    ))
                    : <tr><td>Очікуемо замовлення......</td></tr>
                    }              
                </tbody>
            </table>
            </div>
            <div className='admOrderCommitGroup'>
                <table className='admOrderCommitTable'>
                <thead>
                    <tr>
                        <th>Замовлення</th>
                        <th>Користувач</th>
                        <th>Дата</th>
                        <th>Коментар</th>
                    </tr>  
                </thead>
                <tbody>
                    {comments ? comments.map(
                        (value: IComments, index: number) => (
                    <tr key={value.user.name + index}>
                        <td>{value.id_order}</td>
                        <td>{value.user.name}</td>
                        <td>{new Date(value.createdAt).toLocaleString()}</td>
                        <td>{value.comments}</td>
                    </tr>
                    ))
                    : <tr><td></td></tr>
                    }
                </tbody>
                </table>       
            </div> 
            {activeOrder ?
                <ModalAdmin active={activeOrder} setActive={activeFormOrder}>
                    <AdminFormOrder 
                        setActive={activeFormOrder}
                        customer={customer} 
                        props={props}
                        storages={storage}
                        ordersData={orderData}
                        comments={comments}
                        showComment={showComment}
                    />
                </ModalAdmin>  
                : null
            }
            {activeOrderSup ? 
                <ModalAdmin active={activeOrderSup} setActive={activeFormOrderSup}>
                    <AdminModalOrderSup 
                    storages={storage}
                    //supplier={supplier}
                    comments={comments}
                    setActive={setActiveOrderSup}
                    //ordersData={orderSupData}
                    showComment={showComment}
                    props={props}
                    />
                </ModalAdmin>
                : null
            }
            
        </div>
    );
};

export default AdminOrderContent;