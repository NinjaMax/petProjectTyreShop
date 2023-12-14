import React, {useEffect, useState} from 'react';
import '../../../css/AdminComponentCss/AdminContentCss/AdminOrderContent.css';
import ButtonSearch from '../../buttons/ButtonSearch';
import ModalAdmin from '../../modal/ModalAdmin';
import AdminFormOrder from '../adminModalForm/AdminModalFormOrder';
import AdminModalOrderSup from '../adminModalForm/AdminModalOrderSup';
import { IComments } from './types/Comment.type';
import { IAdminOrder } from './interfaces/AdminOrder.interface';
import { IOrdersItem } from './types/OrderItem.type';
import { FixedSizeList  as List } from 'react-window';
import SpinnerCarRot from '../../spinners/SpinnerCarRot';

const AdminOrderContent = (
    {props, orders, customer, comments, showComment, storage, suppliers}:IAdminOrder
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

    const activeFormOrder = async (e:any) => {
        if (orderData) {
            setOrderData(null);
        }
        showComment(0);
        setActiveOrder(!activeOrder);
    }

    const activeFormOrderSup = (e: any) => {
        const valueId = e.currentTarget?.value;
        const orderInfoSup = orders?.find(
            (item:{id_order: number}) => 
                item.id_order === valueId
            );
        if(orderInfoSup) {
            setOrderData(orderInfoSup);
            setActiveOrderSup(!activeOrderSup);
        } else {
            setActiveOrderSup(!activeOrderSup);
        }
    }

    const showOrderData = async (e: any) => {
        let orderInfo: any;
        const dataName = e.currentTarget.getAttribute("data-name");
        const dataValue = e.currentTarget.getAttribute("data-value");
        if ( dataName === 'orderShow') {
            orderInfo = orders?.find(
            (item:{id_order: number}) => 
                item.id_order === dataValue
            );  
        }
        if (e.currentTarget.name === 'editOrder') {
            orderInfo = orders?.find(
            (item:{id_order: number}) => 
                item.id_order === e.currentTarget.value
            );  
        }   
        if(orderInfo) {
            e.currentTarget.name === 'editOrder' ? orderInfo.disableBtns = false : orderInfo.disableBtns = true;
            setOrderData(orderInfo);
            setActiveOrder(!activeOrder);
            showComment(e);
        }
    };

    const itemClickHandler = (e: any) => {
        const entity = e.target.textContent.split(':')
        setValue(entity[1]);
        setIsSearch(!isSearch);
    };

    const inputHandler = () => {
        setIsSearch(true);
    };

    const inputCancelHandler = () => {
        if(isSearch){
           setIsSearch(false); 
        }
    };

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
        // if (e.target.textContent === 'Дата оновлення') {
        //     const sortByDateUpdate: any = 
        //     filteredOrder?.sort(
        //     (a:any, b:any) => 
        //     (+(new Date(a.updatedAt).toLocaleString())) - (+(new Date(b.updatedAt).toLocaleString())));
        //     setFilteredOrder(sortByDateUpdate);
        // }
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
        if (e.target.textContent === 'М Скл') {
            const sortByStorageMix: any = 
            filteredOrder?.sort(
                (a:any, b:any) => 
                a.mix_store.toLowerCase().localeCompare(
                    b.mix_store.toLowerCase()
                )
            )
            setFilteredOrder(sortByStorageMix)
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

    const orderRowTable = ({index, style}: any) => (
        <div className='admOrderGridItem' style={style}
            onClick={showComment}
            onDoubleClick={showOrderData}
            data-name='orderShow'
            data-value={filteredOrder![index].id_order}>
            <div>{filteredOrder![index].id_order}</div>
            <div>{new Date(filteredOrder![index].createdAt).toLocaleString()}</div>
            <div>{filteredOrder![index]?.customer.name}</div>
            <div>{filteredOrder![index]?.storage}</div>
            <div>{filteredOrder![index]?.mix_store}</div>
            <div>{filteredOrder![index]?.total_cost}</div>
            <div>{filteredOrder![index]?.status}</div>
            <div>{filteredOrder![index]?.order_view}</div>
            <div>{filteredOrder![index]?.delivery}</div>
            <div>{filteredOrder![index]?.status_delivery}</div>
            <div>{filteredOrder![index]?.pay_view}</div>
            <div>{filteredOrder![index]?.status_pay}</div>
            <div>{filteredOrder![index]?.user?.name}</div>
            <div>{filteredOrder![index]?.notes}</div>
            <div>
                <button className='basketAdmGoods'
                    value={filteredOrder![index].id_order}
                    onClick={activeFormOrderSup}>
                    <i className="fas fa-truck-loading"></i>
                </button>
                <button className='editAdmGoods'
                    name='editOrder'
                    value={filteredOrder![index].id_order}
                    //</div>onClick={showOrderData}
                >
                    <i className="fas fa-clipboard-check"></i>
                </button>
                <button className='editAdmGoods'
                    name='editOrder'
                    value={filteredOrder![index].id_order}
                    onClick={showOrderData}>
                    <i className="fas fa-edit"></i>
                </button>

                <button className='closeAdmGoods'
                    value={filteredOrder![index].id_order}>
                    <i className="fa fa-remove"></i>
                </button>                  
            </div>
        </div>    
    );

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
            {filteredOrder ?
            <div className='admOrdersTable'
            //onClick={(e) => e.stopPropagation()}
            >
            <table className='admListOrdersTable'>
                <thead>
                    <tr className='headerOrderTable'>
                        <th className='headerOrderTableCode' 
                            onClick={sortOrder}>Код</th>
                        <th className='headerOrderTableDate' 
                            onClick={sortOrder}>Дата</th>
                        {/* <th className='headerOrderTableDateUpdate' 
                            onClick={sortOrder}>Дата оновлення</th> */}
                        <th className='headerOrderTableCustm' 
                            onClick={sortOrder}>Покупець</th>
                        <th className='headerOrderTableStorage' 
                            onClick={sortOrder}>Склад</th>
                        <th className='headerOrderTableStorageMix' 
                            onClick={sortOrder}>M Скл</th>
                        <th className='headerOrderTableCost' 
                            onClick={sortOrder}>Сума</th>
                        <th className='headerOrderTableStatus' 
                            onClick={sortOrder}>Статус</th>
                        <th className='headerOrderTableType' 
                            onClick={sortOrder}>Тип замовл</th>
                        <th className='headerOrderTableDelivery' 
                            onClick={sortOrder}>Перевізник</th>
                        <th className='headerOrderTableStatusDel' 
                            onClick={sortOrder}>Статус Доставки</th>
                        <th className='headerOrderTablePayType' 
                            onClick={sortOrder}>Тип оплати</th>
                        <th className='headerOrderTablePayStatus' 
                            onClick={sortOrder}>Статус Оплати</th>
                        <th className='headerOrderTableUser' 
                            onClick={sortOrder}>юзер</th>
                        <th className='headerOrderTableNotes' >Нотатки</th>
                        <th className='headerOrderTableOption' >Опції</th>
                    </tr>
                </thead>    
            </table>
            <List
                className="admOrderTableColmId"
                itemCount={filteredOrder!.length}
                itemSize={65}
                height={330}
                width={1320}
            >
                {orderRowTable}
            </List>
            </div>
            : <SpinnerCarRot/>
            }
            <div className='admOrderCommitGroup'>
                <table className='admOrderCommitTable'>
                <thead>
                    <tr>
                        <th className='admOrderCommitTableId'>Замовлення</th>
                        <th className='admOrderCommitTableUser'>Користувач</th>
                        <th className='admOrderCommitTableDate'>Дата cтворення</th>
                        <th>Коментар</th>
                    </tr>  
                </thead>
                <tbody>
                    {comments ? comments.map(
                        (value: IComments, index: number) => (
                    <tr key={value.user.name + index}>
                        <td>{value.id_order}</td>
                        <td>{value.user.name} ({value.user.role})</td>
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
                        getOrdersData={orderData}
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
                    supplier={suppliers}
                    comments={comments}
                    setActive={activeFormOrderSup}
                    getOrdersSupData={orderData}
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