import React, {useState} from 'react';
import '../../../css/AdminComponentCss/AdminContentCss/AdminOrderContent.css';
import ButtonSearch from '../../buttons/ButtonSearch';
import ModalAdmin from '../../modal/ModalAdmin';
import AdminFormOrder from '../adminModalForm/AdminModalFormOrder';
import AdminModalOrderSup from '../adminModalForm/AdminModalOrderSup';

interface IAdminOrder {
    comments?:[] | null;
    props:[[] | null, ...any[][] | null[]];
    showComment(arg0: any):void;
    orders: [] | null;
    customer: [] | null;
    storage:[any] | null;
    stockByIdTyre?: []; 
    tyreStockData?:[];
    tyrePriceData?:[];
    wheelData?:[]; 
    wheelPriceData?:[];
    wheelStockData?:[];

}

type IOrderComments ={
        id_order: number;
        user: {name:string};
        createdAt: Date;
        comments: string;
}      

type IOrdersItem = {
    id_order: number;
    createdAt: Date;
    updatedAt: Date;
    customer:{full_name: string;}
    storage: string;
    status: string;
    order_view: string;
    delivery: string;
    status_delivery: string;
    pay_view: string;
    status_pay: string;
    id_user: number;
    notes: string;
    total: number;
    quantity?: number;
    delivery_ttn: string;
    id_contract: number | string;
    id_customer: number;
    organisation: string;
    order_storage: any [];
    [Symbol.iterator](): any;
    comments: any[];
}

const AdminOrderContent = (
    {props, orders, customer, comments, showComment, storage}:IAdminOrder
    ) => {
    const [activeOrder, setActiveOrder] = useState(false);
    const [activeOrderSup, setActiveOrderSup] = useState(false);
    const [orderData, setOrderData] = useState<IOrdersItem | null>(null);

    const activeFormOrder = () => {
        if (orderData) {
            setOrderData(null);
        }
        setActiveOrder(!activeOrder);
    }

    const activeFormOrderSup = () => {
        setActiveOrderSup(!activeOrderSup);
    }

    const showOrderData = async (e: any) => {
        const orderInfo = orders?.find(
            (item:{id_order: number}) => 
                item.id_order === e.currentTarget.getAttribute("data-value"));
        if(orderInfo) {
            setOrderData(orderInfo);
            setActiveOrder(!activeOrder);
        }
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
                <ButtonSearch clickSearchBtn={()=> console.log('searchBtn')}/>
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
                    {orders ? orders.map((items: IOrdersItem) => (
                    <tr key={'or' + items.id_order}
                        onDoubleClick={e => showOrderData(e)}
                        onClick={e => showComment(e)}
                        data-value={items.id_order}>
                        <td>{items.id_order}</td>
                        <td>{new Date(items.createdAt).toLocaleString()}</td>
                        <td>{new Date(items.updatedAt).toLocaleString()}</td>
                        <td>{items.customer.full_name}</td>
                        <td>{items?.storage}</td>
                        <td>{items?.total}</td>
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
                    {comments ? comments.map(
                        (value: IOrderComments, index: number) => (
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
                    />
                </ModalAdmin>  
                : null
            }
            {activeOrderSup ? 
                <ModalAdmin active={activeOrderSup} setActive={activeFormOrderSup}>
                    <AdminModalOrderSup storages={storage}/>
                </ModalAdmin>
                : null
            }
            
        </div>
    );
};

export default AdminOrderContent;