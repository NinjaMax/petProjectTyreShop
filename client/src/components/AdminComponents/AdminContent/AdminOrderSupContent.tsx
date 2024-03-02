import React, {useContext, useEffect, useState} from 'react';
import '../../../css/AdminComponentCss/AdminContentCss/AdminOrderSupContent.css';
import ModalAdmin from '../../modal/ModalAdmin';
import AdminModalOrderSup from '../adminModalForm/AdminModalOrderSup';
import { IOrderSupContent } from './interfaces/AdminOrderSup.interface';
import { IOrdersSupItem } from './types/OrderSupItem.type';
import { IComments } from './types/Comment.type';
import { FixedSizeList  as List } from 'react-window';
import SpinnerCarRot from '../../spinners/SpinnerCarRot';
import { addCommentsToOrder, addGoodsOrderSupToStock, updateOrder, updateOrderSup } from '../../../restAPI/restAdminAPI';
import { Context } from '../../../context/Context';

const AdminOrderSupContent = (
    {
        props,
        storage,
        ordersSup,
        comments,
        supplier,
        showComment
    }: IOrderSupContent) => {
    const {user} = useContext<any | null>(Context);
    const [activeOrderSup, setActiveOrderSup] = useState(false);
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

    const activeFormOrderSup = async (e:any) => {
        if (orderSupData) {
            setOrderSupData(null);
        }
        //showComment(e);
        setActiveOrderSup(!activeOrderSup);
    };

    const addStockOrderSupGoods = async (e: any) => {
        try {
            const orderSupInfo: any = ordersSup?.find(
                (item:{id_order_sup: number}) => 
                    item.id_order_sup === e.currentTarget.value
                );
                //console.log('OrderSupInfo', orderSupInfo);
            if (orderSupInfo) {
                orderSupInfo?.orders_sup_storage?.forEach( async (element: any): Promise<any> => {
                    await addGoodsOrderSupToStock({...element, id_contract: orderSupInfo?.id_contract});
                });
                await updateOrderSup(
                    {
                        status: orderSupInfo?.storage === 'Постачальник' ? 'Відвантажено' : 'На Складі',
                    }, 
                    orderSupInfo?.id_order_sup
                );
                await addCommentsToOrder({
                    id_user: user._user?.sub.id_user, 
                    comments: `Заявка №${orderSupInfo?.id_order_sup}/Замовлення №${orderSupInfo?.id_order}, Переведено в статус -> Відвантажено`,
                    id_order: null,
                    id_order_sup: orderSupInfo?.id_order_sup
                })
                if (orderSupInfo?.id_order && orderSupInfo?.storage === 'Постачальник') {
                    await updateOrder(
                        {
                            status:'Відвантажено',
                        }, 
                        orderSupInfo?.id_order
                    );
                    await addCommentsToOrder({
                        id_user: user._user?.sub.id_user, 
                        comments: `Замовлення №${orderSupInfo?.id_order}/Заявка №${orderSupInfo?.id_order_sup}, Переведено в статус -> Відвантажено`,
                        id_order: orderSupInfo?.id_order,
                        id_order_sup: null
                    })
                }
                alert('Перевірте. Товари добавлені на склад.')
            } else {
                alert('Помилка. Данні не знайдені.')
            }
        } catch (error) {
            console.log('ADDED_GOODS_ERROR: ', error);
        }
    };
    
    const showOrderSupData = async (e: any) => {
        let orderSupInfo: any;
        const dataSupName = e.currentTarget.getAttribute("data-name");
        const dataSupValue = e.currentTarget.getAttribute("data-value");
        if (dataSupName === 'orderSupShow') {
            orderSupInfo = ordersSup?.find(
            (item:{id_order_sup: number}) => 
                item.id_order_sup === dataSupValue || 
                e.target.value
            );
        }
        if (e.currentTarget.name === 'editSupOrder') {
            orderSupInfo = ordersSup?.find(
            (item:{id_order_sup: number}) => 
                item.id_order_sup === e.currentTarget.value
            );  
        }  
        if(orderSupInfo) {
            e.currentTarget.name === 'editSupOrder' ? orderSupInfo.disableBtns = false : orderSupInfo.disableBtns = true;
            setOrderSupData(orderSupInfo);
            setActiveOrderSup(!activeOrderSup);
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
    };

    const orderSupRowTable = ({index, style}: any) => (
        <div className='admOrderSupGridItem' style={style}
            onClick={showComment}
            onDoubleClick={showOrderSupData}
            data-name='orderSupShow'
            data-value={filterOrderSup![index].id_order_sup}>
            <div>{filterOrderSup![index].id_order_sup}</div>
            <div>{new Date(filterOrderSup![index].createdAt).toLocaleString()}</div>
            <div>{filterOrderSup![index]?.supplier?.name}</div>
            <div>{filterOrderSup![index].id_order}</div>
            <div>{filterOrderSup![index]?.storage}</div>
            <div>{filterOrderSup![index]?.total_purchase_cost}</div>
            <div>{filterOrderSup![index]?.status}</div>
            <div>{filterOrderSup![index]?.order_view}</div>
            <div>{filterOrderSup![index]?.delivery}</div>
            <div>{filterOrderSup![index]?.status_delivery}</div>
            <div>{filterOrderSup![index]?.pay_view}</div>
            <div>{filterOrderSup![index]?.status_pay}</div>
            <div>{filterOrderSup![index]?.user?.name}</div>
            <div>{filterOrderSup![index]?.notes}</div>
            <div>
                <button className='basketAdmGoods'
                    value={filterOrderSup![index].id_order_sup}
                    onClick={addStockOrderSupGoods}>
                    <i className="fas fa-warehouse"
                        title='Додати на склад'
                    ></i>
                </button>
                <button className='basketAdmGoods'
                    value={filterOrderSup![index].id_order_sup}
                    onClick={() => console.log('SOME_FUNCTION')}>
                    <i className="fas fa-truck-loading"></i>
                </button>
                <button className='editAdmGoods'
                    name='editSupOrder'
                    value={filterOrderSup![index].id_order_sup}
                    onClick={showOrderSupData}>
                    <i className="fas fa-edit"
                        title='Редагувати'
                    ></i>
                </button>
                <button className='closeAdmGoods'
                    value={filterOrderSup![index].id_order_sup}>
                    <i className="fa fa-remove"
                        title='Видалити'
                    ></i>
                </button>                  
            </div>
        </div>    
    );

    return (
        <div  onClick={inputCancelHandler}>
        <div className="admOrderSupContent">
            <span>Замовлення Постачальника:</span>
            <div className='admOrderSupHeader'>
                <button className='admOrderSupAddOrderBtn'
                    onClick={activeFormOrderSup}
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
        </div>
        {filterOrderSup ? 
        <div className='admOrdersSupTable'>
        <table className='admListOrdersSupTable'>
            <thead>
                <tr className='headerOrderSupTable'>
                    <th className='headerOrderSupTableCode'
                        onClick={sortOrderSup}>Код</th>
                    <th className='headerOrderSupTableDate'
                        onClick={sortOrderSup}>Дата</th>
                    <th className='headerOrderSupTableSupplier'
                        onClick={sortOrderSup}>Поcтачальник</th>
                    <th className='headerOrderSupTableCodeOrder'
                        onClick={sortOrderSup}>Зам пок</th>
                    <th className='headerOrderSupTableStorage'
                        onClick={sortOrderSup}>Склад</th>
                    <th className='headerOrderSupTableCost'
                        >Сума закупу</th>
                    <th className='headerOrderSupTableStatus'
                        onClick={sortOrderSup}>Статус</th>
                    <th className='headerOrderSupTableType'
                        onClick={sortOrderSup}>Тип замовл</th>
                    <th className='headerOrderSupTableDelivery'
                        onClick={sortOrderSup}>Перевізник</th>
                    <th className='headerOrderSupTableStatusDel'
                        onClick={sortOrderSup}>Статус Доставки</th>
                    <th className='headerOrderSupTablePayType'
                        onClick={sortOrderSup}>Тип оплати</th>    
                    <th className='headerOrderSupTablePayStatus'
                        onClick={sortOrderSup}>Статус Оплати</th>
                    <th className='headerOrderSupTableUser'
                        onClick={sortOrderSup}>Користувач</th>
                    <th className='headerOrderSupTableNotes'
                        onClick={sortOrderSup}>Коментар</th>
                    <th className='headerOrderSupTableOption'
                        onClick={sortOrderSup}>Опції</th>
                </tr>
            </thead>    
            <tbody>
            </tbody>
            </table>
            <List
                className="admOrderSupTableColmId"
                itemCount={filterOrderSup!.length}
                itemSize={65}
                height={330}
                width={1315}
            >
                {orderSupRowTable}
            </List>       
            </div> :
            <SpinnerCarRot/>
            }
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
                    setActive={activeFormOrderSup}
                    getOrdersSupData={orderSupData}
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