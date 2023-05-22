import React, {useState} from 'react';
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
    const [value, setValue] = useState('');
    const [isSearch, setIsSearch] = useState(true);


    const activeFormOrderSup = async(e:any) => {
        if (orderSupData) {
                setOrderSupData(null);
            //showComment(e);
                //comments=[];
        }
        setActiveOrderSup(!activeOrderSup);
        showComment(e);
    }
    
    // const activeFormOrderSup = () => {
    //     setActiveOrderSup(!activeOrderSup);
    // }

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

    const filteredOrderSupData = ordersSup?.filter((orderSupItem: any) => {
        return orderSupItem.id_order_sup.toLowerCase().includes(+value.toLowerCase()) ||
        orderSupItem.supplier.full_name.toLowerCase().includes(value.toLowerCase())  
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
                            filteredOrderSupData?.map(
                                (item: IOrdersSupItem, index: number) =>{
                            return (
                            <li key={'fullName' + index}
                                className='inputOrderSupContentItem'
                                onClick={itemClickHandler}
                            >
                            {`${item.id_order_sup}: ${item.supplier.full_name}`}
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
                    <th>Тип</th>
                    <th>Код</th>
                    <th>Дата</th>
                    <th>Дата оновлення</th>
                    <th>Поcтачальник</th>
                    <th>Склад</th>
                    <th>Сума</th>
                    <th>Статус</th>
                    <th>Тип замовлення</th>
                    <th>Статус Доставки</th>
                    <th>Перевізник</th>
                    <th>Статус Оплати</th>
                    <th>Тип оплати</th>
                    <th>Користувач</th>
                    <th>Коментар</th>
                    <th>Опції</th>
                </tr>
            </thead>    
            <tbody>
            {filteredOrderSupData ? filteredOrderSupData.map((items: IOrdersSupItem) => (
                    <tr key={'orSup' + items.id_order_sup}
                        onClick={e => showComment(e)}
                        onDoubleClick={e => showOrderSupData(e)}
                        data-value={items.id_order_sup}>
                        <td>{items.id_order_sup}</td>
                        <td>{new Date(items.createdAt).toLocaleString()}</td>
                        <td>{new Date(items.updatedAt).toLocaleString()}</td>
                        <td>{items.supplier.full_name}</td>
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