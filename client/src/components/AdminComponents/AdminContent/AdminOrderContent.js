import {React, useState} from 'react';
import '../../../css/AdminComponentCss/AdminContentCss/AdminOrderContent.css';
import ButtonSearch from '../../Buttons/ButtonSearch';
import ModalAdmin from '../../Modal/ModalAdmin';
import AdminFormOrder from '../AdminModalForm/AdminModalFormOrder';
import AdminModalOrderSup from '../AdminModalForm/AdminModalOrderSup';

const AdminOrderContent = ({props, orders, customer, comments, showComment}) => {
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
                    <tr key={'or' + items.id_order}>
                        <td key={'orid' + items.id_order}>{items.id_order}</td>
                        <td key={'orcr' + items.id_order}>{items.createdAt}</td>
                        <td key={'orup' + items.id_order}>{items.updatedAt}</td>
                        <td key={'orcus' + items.id_order}>{items.customer}</td>
                        <td key={'orst' + items.id_order}>{items?.storage}</td>
                        <td key={'ortot' + items.id_order}>10200.00</td>
                        <td key={'orsta' + items.id_order}>{items.status}</td>
                        <td key={'orview' + items.id_order}>{items.order_view}</td>
                        <td key={'ordel' + items.id_order}>{items.delivery}</td>
                        <td key={'orstdel' + items.id_order}>{items.status_delivery}</td>
                        <td key={'orpayv' + items.id_order}>{items.pay_view}</td>
                        <td key={'orpayst' + items.id_order}>{items.status_pay}</td>
                        <td key={'oruser' + items.id_order}>{items.user}</td>
                        <td key={'ornote' + items.id_order}>{items.notes}</td>
                        <td key={'orbtn' + items.id_order}>
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
                        // tyreDatas={tyreData} 
                        // wheelDatas={wheelData}
                        setActive={activeFormOrder}
                        customer={customer} 
                        props={props}
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