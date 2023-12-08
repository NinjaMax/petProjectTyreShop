import React, { Reducer, useCallback, useContext, useEffect, useReducer, useState } from 'react';
import '../../../css/AdminComponentCss/AdminModalFormCss/AdminFormOrder.css';
import { useForm } from 'react-hook-form';
import { Context } from '../../../context/Context';
import { IFormOrder } from './interfaces/FormOrders.interface';
import AdminComment from '../adminContent/AdminComment';
import ModalAdmin from '../../modal/ModalAdmin';
import { reducer } from './reducer/goodsReducer';
import { observer } from 'mobx-react-lite';
import { ActionReducer, ActionType, StateReducer } from './types/OrderReducer.type';
import { createInitialState } from './reducer/initialState';
import AdminModalGoods from './AdminModalGoods';
import AdminModalSupplier from './AdminModalSupplier';
import { addCommentsToOrder, addGoodsToOrderSup, createGoodsToOrderSup, createOrderSupForm, deleteGoodsFromOrderSup, getAdminPriceTyresById, getAdminPriceWheelsById, updateOrderSup } from '../../../restAPI/restAdminAPI';
import { CreateGoods } from './types/CreateGoods.type';
import { IModalFormOrder } from './types/FormOrders.type';

const AdminModalOrderSup = observer((
    {
        goodsId,
        supplier,
        comments,
        setActive,
        showComment,
        storages,
        orderSupData, 
        props
    }: IFormOrder) => {
    const {user} = useContext<any | null>(Context);
    const [tyreDatas, wheelDatas] = props;
    const [orderSupId, setOrderSupId] = useState<number | null>(null);
    const [addGoods, setAddGoods] = useState<boolean>(false);
    const [createSupplier, setCreateSupplier] = useState<boolean>(false);
    const [openSupplier, setOpenSupplier] = useState<boolean>(false);
    const [addSupplier, setAddSupplier] = useState<IModalFormOrder | undefined>(undefined);
    const [disableBtn, setDisableBtn] = useState<boolean>(false);
    const [disableBtnOk, setDisableBtnOk] = useState<boolean>(false);
    const [orderSupStorage, setOrderSupStorage] = useState<any[]>([]);
    const {register, handleSubmit, setValue, getValues, formState: {errors}} = useForm();    
    const [state, dispatch] = useReducer<Reducer<StateReducer, ActionReducer>>(
        reducer, createInitialState(goodsId, orderSupData)
        );
    const [newComment, setNewComment] = useState<string | undefined>();
    const [addNewCommit, setAddNewCommit] = useState();
    const [updateBtn, setUpdateBtn] = useState<string | null>(null); 
    const [purchaseGoods, setPurchaseGoods] = useState<any[]>([]);
    
    useEffect(() => {
        register("id_supplier", {required: 'Це необхідні дані'});
        register("id_user", {required: 'Це необхідні дані'});
        setValue("id_user", user._user?.sub.id_user);
        setValue("id_supplier", addSupplier?.id_supplier,
        { shouldValidate: true })
      }, [register, setValue, addSupplier?.id_supplier, user])
    
    useEffect(() => {
        register('id_contract', {required: 'Це необхідні дані'})
        setValue("id_contract", addSupplier?.contract[0]?.id_contract,
        { shouldValidate: true })
      }, [register, setValue, addSupplier?.contract])
    
    useEffect(() => {
        let isMounted = false;
        let arrPurchase: number[] | null = [];
        const calcPurchase = async () => {  
            if (!isMounted && orderSupStorage) { 
                orderSupStorage?.forEach(async (orderSupData: any, index: number) => {
                let priceByIdTyre = await getAdminPriceTyresById(orderSupData.id ?? 0);
                let priceByIdTWheel = await getAdminPriceWheelsById(orderSupData.id ?? 0);
                let priceTyreOnSup = priceByIdTyre?.find((tyre: any) => tyre.id_supplier === state[index].id_supplier);
                let priceWheelOnSup = priceByIdTWheel?.find((tyre: any) => tyre.id_supplier === state[index].id_supplier);
                if (priceTyreOnSup) {
                    arrPurchase?.push(priceTyreOnSup.price_wholesale * state[index].quantity);
                    setPurchaseGoods([...arrPurchase!]);
                }
                if (priceWheelOnSup) {
                    arrPurchase?.push(priceWheelOnSup.price_wholesale * state[index].quantity);
                    setPurchaseGoods([...arrPurchase!]);
                }
            });
            }
        };
        calcPurchase();
        return () => {
            isMounted = true;
        };
    },[orderSupStorage, state]);

    useEffect(() => {
        if (orderSupData) {
            setDisableBtn(true);
            setDisableBtnOk(true);
        }
    },[orderSupData])

    const onChangeInput = useCallback(
        (e: any, id: number, indexItem: number) => {
        let {name, value} = e.target;
        dispatch({type: ActionType.EDITITEM, 
            editItem: state.map(
                (item: {id: number; price: number; quantity: number; price_wholesale: number}, 
                    index: number) => {
                    return (
                        item.id === id && index === indexItem ?
                        {...item, [name]: value ?? '0',
                        total: name === 'price' ? 
                        value * item?.quantity :                        
                        value * item?.price,
                        }
                        : item
                        )}
            )
        });
    },[state])
    
    const addGoodsForm = () => {
        setAddGoods(!addGoods);
    };

    const activeCustomer = () => {
        setCreateSupplier(!createSupplier);
    };
    const openCustomerForm = () => {
        setOpenSupplier(!openSupplier);
    };  
    
    const addSupplierToOrderSup = async (valueCust: number) => {
        //console.log(valueCust);
        const findSupplier = supplier!.find(
            (items:{id_supplier:number}) => items?.id_supplier === +valueCust
        );
        if (findSupplier) {
            setAddSupplier(findSupplier);  
        }
    }

    const addGoodsToList = async (value:string) => {
        const newArr = value.split(',');
        let [idValue, indexValue] = newArr;

        dispatch({type: ActionType.ADDTYRE, 
            addTyre: tyreDatas?.find((item:{id:string}) => item?.id === idValue),
            indexPrice: indexValue,
        });

        dispatch({type: ActionType.ADDWHEEL, 
            addWheel: wheelDatas?.find((item:{id:string}) => item?.id === idValue),
            indexPrice: indexValue,
        });            
    }
//}),[tyreDatas, wheelDatas, customer])

    const deleteItem = async (itemIndex: number) => {
        //e.preventDefault();
        //e.stopPropagation();
        dispatch({type: ActionType.DELETEITEM, 
            deleteItem: itemIndex,
        });
    }

    const onSubmit = async (data:{}, e: any) => {
        e.preventDefault();
        console.log('CREATE_SUP_ORDER: ', data)
        try {
            if (!orderSupId && state.length === 0) {
               let resultForm: any = await createOrderSupForm(data);
                setOrderSupId(+resultForm.data.id_order_sup);
                alert(`Замовлення Постачальника створено, id ${resultForm.data.id_order_sup},
                    але товари не додані.
                `); 
            }
            if(!orderSupId && state.length > 0) {
                let resultForm: any = await createOrderSupForm(data);
                setOrderSupId(+resultForm.data.id_order_sup);
                state.forEach(async (itemGoods: any): Promise<any> => {
                    let resultOrderSup: any = await createGoodsToOrderSup(itemGoods, resultForm.data.id_order_sup!);
                    setOrderSupStorage(oldOrdStor => [...oldOrdStor, resultOrderSup.data]);
                })
                setUpdateBtn('Оновити');
                alert(`Замовлення створено, id ${resultForm.data.id_order_sup}. 
                    Для підкріплення товарів до замовлення треба натиснути ОК.`);
            }
            if(orderSupId && state.length > 0 && disableBtnOk === false) {
                orderSupStorage?.forEach(async(itemsOrd): Promise<any> => {
                    await deleteGoodsFromOrderSup(itemsOrd);
                });
                orderSupStorage.splice(0, orderSupStorage.length);
                state.forEach(async (itemGoods: CreateGoods): Promise<any> => {
                    let resultOrder: any = await createGoodsToOrderSup(itemGoods, orderSupId);
                 setOrderSupStorage(oldOrdStor => [...oldOrdStor, resultOrder?.data]);  
                });  
                await updateOrderSup(data, orderSupId);    
                alert(`Замовлення збереженно, id ${orderSupId} товари оновлені.`);
            
            } 
            if(orderSupId && state.length === 0){
                alert("Товари не додані");
            }
            if (orderSupId && state.length !== 0 && disableBtnOk === true){
                const newStorage = () => {
                orderSupStorage.forEach(async(itemsOrd): Promise<any> => {
                    await deleteGoodsFromOrderSup(itemsOrd);
                });
                orderSupStorage.splice(0, orderSupStorage.length);
                state.forEach(async (itemGoods: CreateGoods): Promise<any> => {
                    let resultOrder: any = await createGoodsToOrderSup(itemGoods, orderSupId);
                    setOrderSupStorage(oldOrdStor => [...oldOrdStor, resultOrder?.data]);
                });
                }
                newStorage();
                setDisableBtnOk(!disableBtnOk);
                await updateOrderSup(data, orderSupId);
                alert(`Товари до замовлення id ${orderSupId}, оновлено.`);
            }
            e.stopPropagation();
        } catch {
            console.log('ERROR_ORDER_SUP: ', e);
        }    
    }    
    //GOOD PERFORM
    const onSubmitOrderSup = async () => {
        try {
            if(orderSupId && orderSupStorage.length !== 0) {
                orderSupStorage?.forEach(async(itemsOrd): Promise<any> => {
                    let resOrd: any = await addGoodsToOrderSup(itemsOrd);
                    console.log('ON_SUBMIT_GOODS_TO_ORDER: ', resOrd.data);
                })
                alert(`Замовлення id${orderSupId} проведено, товари до замовлення додані і збережені `)
                setDisableBtnOk(!disableBtnOk);
            } else {
                alert("Треба добавити товари. І зберегти замовлення.");
            }
        } catch (error:any) {
            alert (
                `Помилка. Не вірні данні, не вистачае залишків,
                або системна помилка: ` + error.message
            )
        }      
    };

    const orderSum = state?.reduce((sum:any, current:any) => 
        sum + (current.price.price * current.price.quantity), 0
    );
    const orderDataSum = orderSupData?.order_sup_storage?.reduce(
        (sum:any, current:any) => 
        sum + current.total, 0
    );

    const addComment = async(e: any) => {
        try {
            const addCommit: any = await addCommentsToOrder(
                user._user?.sub.id_user, 
                orderSupId ?? orderSupData?.id_order, 
                newComment
            ); 
            if (addCommit.data.status === '200' || '201') {
                alert('Коментар додано');
                showComment(e);
                setAddNewCommit(addCommit.data);
            } else {
                alert(
                    'Коментар не додано, помилка! (можливо ви не зберегли замовлення)'
                );
            }
        } catch (error) {
            console.log(error)
        }    
    }

    console.log(errors);
    console.log('GOODSID: ', goodsId);
    console.log('ORDER_DATA_FOR: ', orderSupData);
    console.log('STATE_SUP: ', state);

    return (
        <div>
        Замовлення Постачальника
        <div className="containerAdmOrderForm"
            //onSubmit={e => e.stopPropagation()}
            //onSubmit={e => e.preventDefault()}
            >
        <form 
            onSubmit={handleSubmit(onSubmit)}
        >
            <div className='admFormDataOrder'>
                <div>
                    <label htmlFor="date">Дата</label>
                    <input className="admFormOrderData" 
                        type="text"
                        //type="datetime-local"
                        name="order_date" 
                        data-value={orderSupData ? orderSupData?.createdAt : ''}
                        defaultValue={orderSupData ?
                            new Date(orderSupData?.createdAt).toLocaleString() : ''}
                        placeholder="Дата"
                        readOnly={true}
                    />  
                </div>
                <div>
                    <label htmlFor="fname">id </label>
                    <input className="admFormOrderId"
                        type="text"
                        name="firstname"
                        value={orderSupId ?? orderSupData?.id_order ?? ''} 
                        //defaultValue=''
                        placeholder="id замовлення"
                        readOnly={true}
                    />  
                </div>
                <div>
                    <label htmlFor="organization">Організація </label>
                    <select className="admFormOrderOrganiz" 
                        {...register('organisation',)}
                        name="organisation"
                        >
                        {orderSupData ?
                            <option data-value={orderSupData.organisation}>
                                {orderSupData?.organisation}
                            </option>
                            :
                            <>
                            <option value={"ФОП Гайворонський"}>ФОП Гайворонський</option>
                            <option value={"фл Гайворонський Н. М"}>фл Гайворонський Н. М</option>
                            <option value={"ТОВ Скай-Партс"}>ТОВ Скай-Партс</option>
                            </>
                        }
                    </select>  
                </div>
                <div>
                    <label htmlFor="storage">Склад </label>
                    <select className="admFormOrderStorage" 
                        {...register('storage', {required: 'Це необхідні дані'})}
                        name="storage"
                        >
                        {orderSupData ?
                            <option data-value={orderSupData.storage}>
                                {orderSupData?.storage}
                            </option>
                            :
                            <>
                            <option value={'Склад Поставщик'}>Склад Поставщик</option>
                            <option value={'Склад Основний'}>Склад Основний</option>
                            <option value={'Склад Монтаж'}>Склад Монтаж</option>
                            </>
                        }
                    </select>  
                </div>
                <div>
                    <label htmlFor="orderView">Вид </label>
                    <select className="admFormOrderView" 
                        {...register('order_view', {required: 'Це необхідні дані'})}
                        name="order_view"
                        >
                        {orderSupData ?
                            <option data-value={orderSupData.order_view}>
                                {orderSupData?.order_view}
                            </option>
                            :
                            <>
                            <option value="Сайт">Сайт</option>
                            <option value="Роздріб">Роздріб</option>
                            <option value="Опт">Опт</option>
                            <option value="Інше">Інше</option>
                            </>
                        }
                    </select>  
                </div>
                <div>
                    <label htmlFor="statusOrder">Статус </label>
                    <select className="admFormOrderStatus" 
                        {...register('status', {required: 'Це необхідні дані'})}
                        name="status_order"
                        >
                        {orderSupData ?
                            <option data-value={orderSupData.status}>
                                {orderSupData?.status}
                            </option>
                            :
                            <>
                            <option value="Новий">Новий</option>
                            <option value="Продаж">Продаж</option>
                            <option value="Обробка">Обробка</option>
                            <option value="Виконання">Виконання</option>
                            <option value="Відміна">Відміна</option>
                            <option value="Повернення">Повернення</option>
                            </>
                        }    
                    </select>    
                </div>
                <div>
                    <div className='admFormOrderCustm'>
                        <label htmlFor="lname">Постачальник </label>
                        <input  className="admFormOrderName"
                            type="text"
                            name="supplier" 
                            maxLength={45}
                            placeholder="Ім'я або назва.."
                            value={addSupplier?.full_name ?? orderSupData?.customer?.full_name ?? ''}
                            readOnly={true}
                            //onChange={() => setAddCustomer(addSupplier)}
                        />
                        <div 
                        //onClick={(e)=>e.preventDefault()}
                        >
                            <button onClick={openCustomerForm} className='admFormSearchCustm'>
                                <i className="fas fa-search"></i>    
                            </button> 
                        </div>
                        <div 
                        //onClick={(e)=>e.preventDefault()}
                        >
                            <button onClick={activeCustomer}
                                className='admFormAddCustm'>
                                <i className="fas fa-plus"></i>    
                            </button>  
                        </div>         
                    </div>    
                </div>
                <div>
                    <label htmlFor="fname"> Контракт </label>
                    <select className="admFormOrderContract" name="id_contract"
                        //autoFocus={true}
                        defaultValue={addSupplier?.contract[0]?.id_contract}
                        >
                       {addSupplier ? addSupplier?.contract?.map(
                        (entity:{name: string; id_contract:number;}, index:number)=> (  
                            <option key={'contract' + index} 
                            value={entity.id_contract}
                            >
                                {entity.name} {entity.id_contract} 
                            </option>
                            )) : <option data-value={orderSupData?.id_contract}>
                                    {orderSupData?.id_contract}
                                </option>
                        } 
                    </select>
                </div>

                <div>
                    <label htmlFor="pereviznik">Перевізник </label>
                    <select className="admFormOrderDelivery" 
                        {...register('delivery', {required: 'Це необхідні дані'})}
                        name="delivery"
                        >
                        {orderSupData ?
                            <option data-value={orderSupData.delivery}>
                                {orderSupData?.delivery}
                            </option>
                            :
                            <>
                                <option value="Самовивіз">Самовивіз</option>
                                <option value="Своя Доставка">Своя Доставка</option>
                                <option value="Нова Пошта">Нова Пошта</option>
                                <option value="Укр Пошта">Укр Пошта</option>
                                <option value="Делівері">Делівері</option>
                            </>
                        }    
                    </select>    
                </div>
                <div>
                    <label htmlFor="order_ttn">ТТН </label>
                    <input className="admFormOrderTtn"
                        type="text"  
                        maxLength={45}
                        placeholder="ТТН замовлення.."
                        {...register('delivery_ttn')}
                        name="delivery_ttn"
                        defaultValue={orderSupData?.delivery_ttn ?? ''}
                    />  
                </div>
                <div>
                    <label htmlFor="status">Статус дост </label>
                    <select className="admFormOrderStatusDel" 
                        {...register('status_delivery', {required: 'Це необхідні дані'})}
                        name="status_delivery"
                        >
                            {orderSupData ?
                            <option data-value={orderSupData.status_delivery}>
                                {orderSupData?.status_delivery}
                            </option>
                            :
                            <>
                            <option value="Новий">Новий</option>
                            <option value="Самовивіз">Самовивіз</option>
                            <option value="Обробляеться">Обробляеться</option>
                            <option value="Очікує ТТН">Очікує ТТН</option>
                            <option value="Доставляеться">Доставляеться</option>
                            <option value="Отримано ТТН">Отримано ТТН</option>
                            <option value="Повернення ТТН">Повернення ТТН</option>
                            <option value="Відміна">Відміна</option>
                            </>
                            }
                        
                    </select>    
                </div>
                <div 
                    onClick={(e)=>e.preventDefault()}
                >
                    <button onClick={addGoodsForm} className='admFormOrderBtnAdd'>Додати товар</button>  
                </div>
                <div>
                    <label htmlFor="pay_view">Вид оплати </label>
                    <select className="admFormOrderViewPay" 
                        {...register('pay_view', {required: 'Це необхідні дані'})}
                        name="pay_view"
                        >
                        {orderSupData ?
                            <option data-value={orderSupData.pay_view}>
                                {orderSupData?.pay_view}
                            </option>
                            :
                            <>
                            <option value="Новий">Новий</option>
                            <option value="Готівка">Готівка</option>
                            <option value="Б/г рахунок">Б/г рахунок</option>
                            <option value="Б/г карта">Б/г карта</option>
                            <option value="Наложка">Наложка</option>
                            <option value="Відміна">Відміна</option>
                            <option value="Повернення">Повернення</option>
                            </>
                        }
                    </select>    
                </div>
                <div>
                <label htmlFor="status_pay">Статус оплати </label>
                    <select className="admFormOrderStatusPay" 
                        {...register('status_pay', {required: 'Це необхідні дані'})}
                        name="status_pay"
                    >
                    {orderSupData ?
                        <option data-value={orderSupData.status_pay}>
                            {orderSupData?.status_pay}
                        </option>
                        :
                        <>
                        <option value="Новий">Новий</option>
                        <option value="Очікує Оплату">Очікує Оплату</option>
                        <option value="Оплачено">Оплачено</option>
                        <option value="Виконання">Виконання</option>
                        <option value="Відміна">Відміна</option>
                        <option value="Повернення">Повернення</option>
                        <option value="Наложка Отримана">Наложка Отримана</option>
                        </>
                    }
                    </select>    
                </div>   
            </div>
            <div className='admFormOrderTableBox'
                //onInput={(e) => e.stopPropagation()}
                onClick={(e)=>e.preventDefault()}
                >   
            <table className='admFormOrderTable'>
                <thead className='admFormOrderTableTh'>
                    <tr>
                        <th>id</th>
                        <th>Товар</th>
                        <th>Категорія</th>
                        <th>Кількість</th>
                        <th>Резерв</th>
                        <th>Ціна Закуп</th>
                        <th>Ціна</th>
                        <th>Сума Закуп</th>
                        <th>Сума</th>
                        <th>Склад</th>
                        <th>Опціі</th>
                    </tr>     
                </thead>
                <tbody>
                    {state?.length !== 0 ? 
                        state?.map((
                            item:{
                            id:number,    
                            quantity: number;
                            total: number; 
                            reserve: number;
                            full_name:string, 
                            category:string, 
                            id_supplier: number, 
                            price: number,
                            price_wholesale: number,
                            id_storage: number,
                            },
                            index:number
                        ) =>(
                    <tr key={item.id + index} 
                        onInput={(e) => e.stopPropagation()}
                        //onClick={(e)=>e.preventDefault()}
                        >
                        <td >{item.id}</td>
                        <td >{item.full_name}</td>
                        <td >{item?.category}</td>
                        <td 
                            onInput={(e) => e.stopPropagation()}
                        >
                            <input 
                            id={'quantity'+ item.id}
                            type="text"
                            name="quantity"
                            value={item?.quantity}
                            onInput={(e) => onChangeInput(e, item.id, index)}
                            placeholder="Введіть цифри"
                            />
                        </td>
                        <td >{item?.reserve ?? 0}</td>
                        <td  
                            onInput={(e) => e.stopPropagation()}
                        >
                            <input 
                            id={'price_wholesale' + item.id}
                            type="text"
                            name="price_wholesale"
                            value={item?.price_wholesale}
                            onInput={(e) => onChangeInput(e, item.id, index)}
                            placeholder="Введіть цифри" 
                            />
                       
                        </td>
                        <td  
                            onInput={(e) => e.stopPropagation()}
                        >
                            <input 
                            id={'price' + item.id}
                            type="text"
                            name="price"
                            value={item?.price}
                            onInput={(e) => onChangeInput(e, item.id, index)}
                            placeholder="Введіть цифри" 
                            />
                       
                        </td>
                        <td >{item?.total ?? item.price_wholesale * item.quantity}</td>
                        <td >{item?.total ?? item.price * item.quantity}</td>
                        <td >
                            <select className="admFormOrderStorage" 
                                name="storage_index"
                                defaultValue={item.id_storage === 1 ? 
                                    'Постачальник' :
                                    item.id_storage === 2 ?
                                    'Основний Харків' :
                                    item.id_storage === 3 ?
                                    'Основний Харків-1' :
                                    item.id_storage === 4 ?
                                    'Віддалений Дніпро-1' : ''
                                }
                                //{...register('storage_index', {required: 'Це необхідні дані'})}
                                >
                                <option value={'Постачальник'}>Постачальник</option>
                                <option value={'Основний Харків'}>Основний Харків</option>
                                <option value={'Основний Харків-1'}>Основний Харків-1</option>
                                <option value={'Віддалений Дніпро-1'}>Віддалений Дніпро-1</option>
                            </select>  
                        </td> 
                        <td 
                            //onClick={e =>e.stopPropagation()}
                            //onClick={(e)=>e.preventDefault()}
                            //onClickCapture={e => e.preventDefault()}
                        >
                            <div 
                                //onClick={(e) => e.target.addEventListener("click", deleteItem, false)}
                                //onClickCapture={e=>e.stopPropagation()}
                                onClick={e=>e.stopPropagation()}
                                //onClick={(e)=>e.preventDefault()}
                            >
                            <button className='closeAdmGoods' 
                                key={'deleteBtn' + item.id}
                                value={index}
                                disabled={disableBtn}
                                onClick={e => deleteItem(+e.currentTarget.value)}
                                //onClickCapture={e=>e.stopPropagation()}
                                >
                                <i className="fa fa-remove"></i>
                            </button>
                            </div>
                        </td>
                        
                    </tr>
                    ))
                    : 
                    <tr>
                        <td>Очікуємо товари......</td>
                    </tr>
                  
                    }   
                </tbody>
            </table>
            </div>
            <div className='admFormOrderNotes'>
                <label htmlFor="notes">Нотатки</label>
                <textarea className="admFormOrderNotesText"  
                    {...register('notes')}
                    name="notes"
                    value={orderSupData?.notes}
                    placeholder="Пишить нотатку..">
                </textarea>  
            </div>
            <div className='admFormOrderCommit'
                onClick={(e)=>e.preventDefault()}
                //onClick={(e) => e.stopPropagation()}
                >
                <div className='admFormOrderAddCommit'>
                <button className='admFormOrderBtnAdd'
                    value={orderSupId ?? orderSupData?.id_order}
                    onClick={(e) => addComment(e)}
                    //onInput={(e) => showComment(e)}
                    //data-order={orderSupData?.id_order}
                    >Додати коментар
                </button>
                    <textarea 
                    className='admOrderCommitText'
                    value={newComment}
                    //data-order={orderSupData?.id_order}
                    onChange={e =>setNewComment(e.target.value)}
                    
                    //placeholder="Введіть коментар.."    
                    //name="subject" 
                    placeholder="Пишить коментар.."
                    >        
                    </textarea>
                </div>
                <div className='admFormOrderCommitChat'>
                    {/* {comments?.length !== 0 ? */}
                      <AdminComment 
                        newCommit={addNewCommit}
                        comments={comments}/>
                    {/* //   : <span>... очікуємо коментарі ...</span>  
                    // } */}
                </div>  
            </div>
            <div className='admOrderFormGrp'
                    //onClick={(e) => e.stopPropagation()}
                    //onClickCapture={e=>e.stopPropagation()}
                 >
                <div onClick={(e) => e.stopPropagation()}>
                    <button className={!disableBtnOk ? 'admFormOrderBtnOk' : 'admFormOrderBtnOkDsb'}
                        disabled={disableBtnOk}
                        onClick={onSubmitOrderSup}>
                        Ok
                    </button>
                </div>
                <div 
                    //onClick={(e) => e.stopPropagation()}
                    onClick={(e)=>e.preventDefault()}
                    >
                    <button className={!disableBtn ? 'admFormOrderBtnSave' : 'admFormOrderBtnSaveDsb'}
                        disabled={disableBtn} 
                        //type="button"
                        //type="submit"
                        onClick={handleSubmit(onSubmit)}
                        //onClickCapture={e=>e.stopPropagation()}
                        >
                        {updateBtn ?? 'Зберегти'}
                    </button>
                </div>
                <div onClick={(e) => e.stopPropagation()}>
                    <button className='admFormOrderBtn' onClick={setActive}>Відмінити</button>
                </div>
                <span>id: {orderSupData?.user?.id_user ?? user._user?.sub.id_user ?? ''}</span>
                <span>користувач: {orderSupData?.user?.name ?? user._user?.sub.name ?? ''}</span>
                <span>посада: {orderSupData?.user?.role ?? user._user?.sub?.role ?? ''}</span>
                    <span className='admFormOrderSupEstimate'>
                        доп гарант: {orderSupData?.dop_garanty ?? getValues('dop_garanty') ?? 0}
                    </span>
                    <span className='admFormOrderSupEstimate'>
                        бонус (мінус): {orderSupData?.bonus_decrease ?? getValues('bonus_decrease') ?? 0}
                    </span>
                    <span className='admFormOrderSupEstimate'>
                        доставка (загалом): {orderSupData?.delivery_cost ?? getValues('delivery_cost') ?? 0}
                    </span>
                    <span className='admFormOrderSupEstimate'>
                        комісія банку: {orderSupData?.commission_cost ?? getValues('commission_cost') ?? 0}</span>
                    <span className='admFormOrderSupEstimate'>
                        Сума товарів: {orderSum}
                    </span>
                    <span className='admFormOrderSupEstimateOverall'>
                        Сума замовлення: {getValues('total_cost') ?? orderSupData?.total_cost ?? 0}
                    </span>
                <span>
                    Сума замовлення: {orderSum ? orderSum : orderDataSum}
                </span>
                {purchaseGoods.length !== 0 && user._user?.sub?.role === 'admin' ?
                    <>
                        <span className='admFormOrderSupProfit'>
                            сума закупівлі: {purchaseGoods?.reduce((sum:any, current:any) => sum + current)}
                        </span>
                        <span className='admFormOrderSupProfit'>
                            заробіток загалом: {orderSum - purchaseGoods?.reduce((sum:any, current:any) => sum + current)}
                        </span>
                        <span className='admFormOrderSupProfit'>
                            націнка загалом: {((orderSum / purchaseGoods?.reduce(
                            (sum:any, current:any) => sum + current) - 1) * 100).toFixed(1) ?? '0'}%
                        </span>

                    </>
                        : null
                    }
            </div>
        </form>
    </div>
        {openSupplier ?
            <ModalAdmin active={openSupplier} setActive={setOpenSupplier} >
                <AdminModalSupplier 
                    allsupplier={supplier}
                    addSupplier={addSupplierToOrderSup}/>
            </ModalAdmin> : null  
        }
        {createSupplier ?
            <ModalAdmin active={createSupplier} setActive={setCreateSupplier}>
                {/* <AdminModalCustmCreate />    */}
            </ModalAdmin> : null
        }
        {addGoods ? 
            <ModalAdmin active={addGoods} setActive={setAddGoods}>
                <AdminModalGoods 
                    showRowModData={addGoodsToList}
                    props={props}
                    storageGoods={storages}
                />
            </ModalAdmin> : null
        }
        {errors.id_contract || errors.id_customer ?
            <span style={{'color': 'red'}}>Помилка! Не заповнені корректно всі дані.</span> 
            : null
        }
    </div>
    );
});

export default AdminModalOrderSup;