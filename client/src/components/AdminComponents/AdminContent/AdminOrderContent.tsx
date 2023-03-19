import React, {useState} from 'react';
import '../../../css/AdminComponentCss/AdminContentCss/AdminOrderContent.css';
import ButtonSearch from '../../Buttons/ButtonSearch';
import ModalAdmin from '../../Modal/ModalAdmin';
import AdminFormOrder from '../AdminModalForm/AdminModalFormOrder';
import AdminModalOrderSup from '../AdminModalForm/AdminModalOrderSup';

const AdminOrderContent = ({props, orders, customer, comments, showComment, storage}) => {
    const [activeOrder, setActiveOrder] = useState(false);
    const [activeOrderSup, setActiveOrderSup] = useState(false);

    const activeFormOrder = () => {
        setActiveOrder(!activeOrder);
    }

    const activeFormOrderSup = () => {
        setActiveOrderSup(!activeOrderSup);
    }

    return (
        <div>
            <div className="admOrderContent">
                <span>Замовлення Покупців:</span>
                <div className='admOrderHeader'>
                    <button className='admOrderHeaderBtn' onClick={activeFormOrder}>
                        Додати замовлення
                    </button>
                </div>
                <input className='inputAdminOrder' type="text" id="myInput" placeholder="Введіть значення для пошуку..."/>
                <ButtonSearch clickSearchBtn={undefined}/>
            </div>
            <div className='admOrdersTable'>
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
                    {orders ? orders.map((items) => (
                    <tr key={'or' + items.id_order}>
                        <td>{items.id_order}</td>
                        <td>{items.createdAt}</td>
                        <td>{items.updatedAt}</td>
                        <td>{items.customer.full_name}</td>
                        <td>{items?.storage}</td>
                        <td>{10200.00}</td>
                        <td>{items.status}</td>
                        <td>{items.order_view}</td>
                        <td>{items.delivery}</td>
                        <td>{items.status_delivery}</td>
                        <td>{items.pay_view}</td>
                        <td>{items.status_pay}</td>
                        <td>{items.id_user}</td>
                        <td>{items.notes}</td>
                        <td>
                            <button className='basketAdmGoods'
                                onClick={activeFormOrderSup}>
                                <i className="fas fa-truck-loading"></i>
                            </button>
                            <button className='editAdmGoods'>
                                <i className="fas fa-edit"></i>
                            </button>
                            <button className='closeAdmGoods'>
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
                    {comments ? comments.map((value) => (
                    <tr>
                        <td>{value.id_order}</td>
                        <td>{value.user}</td>
                        <td>{value.createdAt}</td>
                        <td>{value.comment}</td>
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
                        storage={storage}
                    />
                </ModalAdmin>  
                : null
            }
            {activeOrderSup ? 
                <ModalAdmin active={activeOrderSup} setActive={activeFormOrderSup}>
                    <AdminModalOrderSup/>
                </ModalAdmin>
                : null
            }
            
        </div>
    );
};

export default AdminOrderContent;