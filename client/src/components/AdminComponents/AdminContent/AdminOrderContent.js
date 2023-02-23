import {React, useState} from 'react';
import '../../../css/AdminComponentCss/AdminContentCss/AdminOrderContent.css';
import ButtonSearch from '../../Buttons/ButtonSearch';
import ModalAdmin from '../../Modal/ModalAdmin';
import AdminModalFormOrder from '../AdminModalForm/AdminModalFormOrder';

const AdminOrderContent = ({orders, customer, comments, showComment}) => {
    const [active, setActive] = useState(false);

    const activeForm = () => {
        setActive(!active);
    }

    return (
        <div>
            <div className="admOrderContent">
                <span>Замовлення Покупців:</span>
                <div className='admOrderHeader'>
                    <button className='admOrderHeaderBtn' onClick={activeForm}>
                        Додати замовлення
                    </button>
                </div>
                <input className='inputAdminOrder' type="text" id="myInput" placeholder="Введіть значення для пошуку..."/>
                <ButtonSearch/>
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
                    <tr>
                        <td>{items.id_order}</td>
                        <td>02.01.2023</td>
                        <td>25.01.2023</td>
                        <td>{items.customer}</td>
                        <td>Склад Поставщик</td>
                        <td>10200.00</td>
                        <td>{items.status}</td>
                        <td>{items.order_view}</td>
                        <td>{items.delivery}</td>
                        <td>{items.status_delivery}</td>
                        <td>{items.pay_view}</td>
                        <td>{items.status_pay}</td>
                        <td>{items.order_view}</td>
                        <td>{items.user}</td>
                        <td>{items.notes}</td>
                        <td>
                            <button className='basketAdmGoods'
                                onClick={activeForm}>
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
            {active ?
                <ModalAdmin active={active} setActive={activeForm}>
                    <AdminModalFormOrder/>
                </ModalAdmin>  
                : null
            }
            
        </div>
    );
};

export default AdminOrderContent;