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
    //const [filteredOrder, setFilteredOrder] = useState(null);
    const [value, setValue] = useState('');
    const [isSearch, setIsSearch] = useState(true);

    const activeFormOrder = async(e:any) => {
        if (orderData) {
            setOrderData(null);
            //showComment(e);
            //comments=[];
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

    const filteredOrderData = orders?.filter((orderItem: any) => {
        return orderItem.id_order.toLowerCase().includes(+value.toLowerCase()) ||
        orderItem.customer.full_name.toLowerCase().includes(value.toLowerCase())  
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
    // const orderTotal = order_storage?.reduce((sum:any, current:any) => 
    //     sum + (current.price.price * current.price.quantity), 0
    // ) ?? 0;

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
                            filteredOrderData?.map(
                                (item: IOrdersItem, index: number) =>{
                            return (
                            <li key={'fullName' + index}
                                className='inputOrderContentItem'
                                onClick={itemClickHandler}
                            >
                            {`${item.id_order}: ${item.customer.full_name}`}
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
                        <th>Нотатки</th>
                        <th>Опції</th>
                    </tr>
                </thead>    
                <tbody>
                    {filteredOrderData ? filteredOrderData.map((items: IOrdersItem) => (
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