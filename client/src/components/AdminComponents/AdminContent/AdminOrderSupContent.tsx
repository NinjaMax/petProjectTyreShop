import React, {useState} from 'react';
import '../../../css/AdminComponentCss/AdminContentCss/AdminOrderSupContent.css';
import ButtonSearch from '../../buttons/ButtonSearch';
import ModalAdmin from '../../modal/ModalAdmin';
import AdminModalOrderSup from '../adminModalForm/AdminModalOrderSup';

interface IOrderSupContent {
    
    props:[[] | null, ...[][] | null[]];
    showComment(arg0: any):void;
    customer?:{} | null;
    storage:[any] | null;
    comments?:[] | null;
    supplier?:[] | null;
    ordersSup?:[] | null;
    stockByIdTyre?:[]; 
    tyreStockData?:[];
    tyrePriceData?:[];
    wheelData?:[]; 
    wheelPriceData?:[];
    wheelStockData?:[]; 
}

type IOrderComments ={
    id_order_sup: number;
    user: {name:string};
    createdAt: Date;
    comments: string;
}  

type IOrdersSupItem = {
    id_order_sup: number;
    createdAt: Date;
    updatedAt: Date;
    supplier:{full_name: string;}
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
    id_supplier: number;
    organisation: string;
    order_storage: any [];
    [Symbol.iterator](): any;
    comments: any[];
    reduce(arg0: any, ...arg: any[]): any;
    user:{name: string; role: string; id_user: number;}
}

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

    return (
        <div>
        <div className="admOrderSupContent">
            <span>Замовлення Постачальника:</span>
            <div className='admOrderSupHeader'>
                <button className='admOrderSupAddOrderBtn'
                    onClick={(e) => activeFormOrderSup(e)}
                    value={'0'} 
                >Додати замовлення постачальника
                </button>
            </div>
            <input className='inputAdminOrderSup' type="text" id="myInput" placeholder="Введіть значення для пошуку..."/>
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
            {ordersSup ? ordersSup.map((items: IOrdersSupItem) => (
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
                        (value: IOrderComments, index: number) => (
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