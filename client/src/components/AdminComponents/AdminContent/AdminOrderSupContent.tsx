import React, {useEffect, useState} from 'react';
import '../../../css/AdminComponentCss/AdminContentCss/AdminOrderSupContent.css';
import ButtonSearch from '../../buttons/ButtonSearch';
import ModalAdmin from '../../modal/ModalAdmin';
import AdminModalOrderSup from '../adminModalForm/AdminModalOrderSup';
import { IOrderSupContent } from './interfaces/AdminOrderSup.interface';
import { IOrdersSupItem } from './types/OrderSupItem.type';
import { IComments } from './types/Comment.type';

const AdminOrderSupContent = (
    {
        props,
        storage,
        ordersSup,
        comments,
        supplier,
        showComment
    }: IOrderSupContent) => {
    const [activeOrderSup, setActiveOrderSup] = useState(false);
    //const [activeOrderSup, setActiveOrderSup] = useState(false);
    const [orderSupData, setOrderSupData] = useState(null);
    const [filterOrderSup, setFilterOrderSup] = useState<any[] | null>(ordersSup);
    const [value, setValue] = useState('');
    const [isSearch, setIsSearch] = useState(true);

    useEffect(() => {
        if (value.length !== 0) {
            const filteredOrderSupData: any = ordersSup?.filter((orderSupItem: any) => {
                return orderSupItem.id_order_sup === +value.toLowerCase() ||
                orderSupItem.supplier.full_name.toLowerCase().includes(value.toLowerCase())  
            })
            setFilterOrderSup(filteredOrderSupData);
        } else {
            setFilterOrderSup(ordersSup);
        }
    },[ordersSup, value]);

    const activeFormOrderSup = async(e:any) => {
        if (orderSupData) {
            setOrderSupData(null);
        }
        setActiveOrderSup(!activeOrderSup);
        showComment(e);
    }
    
    const showOrderSupData = async (e: any) => {
        const orderSupInfo = ordersSup?.find(
            (item:{id_order: number}) => 
                item.id_order === e.currentTarget.getAttribute("data-value") || 
                e.target.value);
        if(orderSupInfo) {
            setOrderSupData(orderSupInfo);
            setActiveOrderSup(!activeOrderSup);
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

    const sortOrderSup = (e: any) => {
        if (e.target.textContent === 'Код') {
            const sortByCode: any = 
            filterOrderSup?.sort(
            (a:any, b:any) => (+a.id_order_sup) - (+b.id_order_sup));
            setFilterOrderSup(sortByCode);
        }
        if (e.target.textContent === 'Дата') {
            const sortByDate: any = 
            filterOrderSup?.sort(
            (a:any, b:any) => 
            (+(new Date(a.createdAt).toLocaleString())) - (+(new Date(b.createdAt).toLocaleString())));
            setFilterOrderSup(sortByDate);
        }
        if (e.target.textContent === 'Дата оновлення') {
            const sortByDateUpdate: any = 
            filterOrderSup?.sort(
            (a:any, b:any) => 
            (+(new Date(a.updatedAt).toLocaleString())) - (+(new Date(b.updatedAt).toLocaleString())));
            setFilterOrderSup(sortByDateUpdate);
        }
        if (e.target.textContent === 'Поcтачальник') {
            const sortBySupplier: any = 
            filterOrderSup?.sort(
                    (a:any, b:any) => 
                    a.supplier.full_name.toLowerCase().localeCompare(
                        b.supplier.full_name.toLowerCase()
                    )
            )
            setFilterOrderSup(sortBySupplier);
        }
        if (e.target.textContent === 'Склад') {
            const sortByStorage: any = 
            filterOrderSup?.sort(
                (a:any, b:any) => 
                a.storage.toLowerCase().localeCompare(
                    b.storage.toLowerCase()
                )
        )
            setFilterOrderSup(sortByStorage)
        }  
        if (e.target.textContent === 'Статус') { 
            const sortByStatus: any = 
            filterOrderSup?.sort(
                (a:any, b:any) => 
                a.status.toLowerCase().localeCompare(
                    b.status.toLowerCase()
                )
            )
            setFilterOrderSup(sortByStatus);
        }
        if (e.target.textContent === 'Тип замовлення') { 
            const sortByOrderType: any = 
            filterOrderSup?.sort(
                (a:any, b:any) => 
                a.order_view.toLowerCase().localeCompare(
                    b.order_view.toLowerCase()
                )
            )
            setFilterOrderSup(sortByOrderType);
        }
        if (e.target.textContent === 'Перевізник') { 
            const sortByDelivery: any = 
            filterOrderSup?.sort(
                (a:any, b:any) => 
                a.delivery.toLowerCase().localeCompare(
                    b.delivery.toLowerCase()
                )
            )
            setFilterOrderSup(sortByDelivery);
        }
        if (e.target.textContent === 'Статус Доставки') { 
            const sortByDeliveryStatus: any = 
            filterOrderSup?.sort(
                (a:any, b:any) => 
                a.status_delivery.toLowerCase().localeCompare(
                    b.status_delivery.toLowerCase()
                )
            )
            setFilterOrderSup(sortByDeliveryStatus);
        }
        if (e.target.textContent === 'Тип оплати') { 
            const sortByPayType: any = 
            filterOrderSup?.sort(
                (a:any, b:any) => 
                a.pay_view.toLowerCase().localeCompare(
                    b.pay_view.toLowerCase()
                )
            )
            setFilterOrderSup(sortByPayType);
        }
        if (e.target.textContent === 'Статус Оплати') { 
            const sortByPayStatus: any = 
            filterOrderSup?.sort(
                (a:any, b:any) => 
                a.status_pay.toLowerCase().localeCompare(
                    b.status_pay.toLowerCase()
                )
            )
            setFilterOrderSup(sortByPayStatus);
        }
        if (e.target.textContent === 'Користувач') {
            const sortByUser: any = 
            filterOrderSup?.sort(
                (a:any, b:any) => 
                    a.user.name.toLowerCase().localeCompare(
                        b.user.name.toLowerCase()
                    )
            )
            setFilterOrderSup(sortByUser);
        }
    }

    return (
        <div  onClick={inputCancelHandler}>
        <div className="admOrderSupContent">
            <span>Замовлення Постачальника:</span>
            <div className='admOrderSupHeader'>
                <button className='admOrderSupAddOrderBtn'
                    onClick={(e) => activeFormOrderSup(e)}
                    value={'0'} 
                >Додати замовлення постачальника
                </button>
            </div>
            <input
                id="myInput" 
                className='inputAdminOrderSup' 
                type="text"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onClick={inputHandler} 
                placeholder="Введіть значення для пошуку..."
            />
            <ul className='inputOrderSupContent'>
                        {value && isSearch ?
                            filterOrderSup?.map(
                                (item: IOrdersSupItem, index: number) =>{
                            return (
                            <li key={'fullName' + index}
                                className='inputOrderSupContentItem'
                                onClick={itemClickHandler}
                            >
                            {`${item.id_order_sup}: ${item.supplier.name}`}
                            </li>
                            ) 
                            })  
                        : null  
                        }
                    </ul>
            <ButtonSearch clickSearchBtn={()=> console.log('searchBtn')}/>
        </div>
        <div className='admOrdersSupTable'>
        <table className='admListOrdersSupTable'>
            <thead>
                <tr className='headerOrderSupTable'>
                    <th onClick={sortOrderSup}>Тип</th>
                    <th onClick={sortOrderSup}>Код</th>
                    <th onClick={sortOrderSup}>Дата</th>
                    <th onClick={sortOrderSup}>Дата оновлення</th>
                    <th onClick={sortOrderSup}>Поcтачальник</th>
                    <th onClick={sortOrderSup}>Склад</th>
                    <th>Сума</th>
                    <th onClick={sortOrderSup}>Статус</th>
                    <th onClick={sortOrderSup}>Тип замовлення</th>
                    <th onClick={sortOrderSup}>Статус Доставки</th>
                    <th onClick={sortOrderSup}>Перевізник</th>
                    <th onClick={sortOrderSup}>Статус Оплати</th>
                    <th onClick={sortOrderSup}>Тип оплати</th>
                    <th onClick={sortOrderSup}>Користувач</th>
                    <th onClick={sortOrderSup}>Коментар</th>
                    <th onClick={sortOrderSup}>Опції</th>
                </tr>
            </thead>    
            <tbody>
            {filterOrderSup ? filterOrderSup.map((items: IOrdersSupItem) => (
                    <tr key={'orSup' + items.id_order_sup}
                        onClick={e => showComment(e)}
                        onDoubleClick={e => showOrderSupData(e)}
                        data-value={items.id_order_sup}>
                        <td>{items.id_order_sup}</td>
                        <td>{new Date(items.createdAt).toLocaleString()}</td>
                        <td>{new Date(items.updatedAt).toLocaleString()}</td>
                        <td>{items.supplier.name}</td>
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
                                value={items.id_order_sup}
                                onClick={activeFormOrderSup}>
                                <i className="fas fa-truck-loading"></i>
                            </button>
                            <button className='editAdmGoods'
                                value={items.id_order_sup}
                                onClick={(e) => showOrderSupData(e)}>
                                <i className="fas fa-edit"></i>
                            </button>
                            <button className='closeAdmGoods'
                                value={items.id_order_sup}>
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
                        <td>{value.id_order_sup}</td>
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
            {activeOrderSup ? 
            <ModalAdmin active={activeOrderSup} setActive={activeFormOrderSup}>
                <AdminModalOrderSup 
                    storages={storage}
                    supplier={supplier}
                    comments={comments}
                    setActive={setActiveOrderSup}
                    orderSupData={orderSupData}
                    showComment={showComment}
                    props={props}
                />
            </ModalAdmin>
            : null
        }
    </div>
    );
};

export default AdminOrderSupContent;