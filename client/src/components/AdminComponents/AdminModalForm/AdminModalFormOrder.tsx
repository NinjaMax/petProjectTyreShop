import React, { useReducer, Reducer, useState, useCallback, useEffect, useContext} from 'react';
import '../../../css/AdminComponentCss/AdminModalFormCss/AdminFormOrder.css';
import { useForm } from 'react-hook-form';
import ModalAdmin from '../../modal/ModalAdmin';
import {addCommentsToOrder, addGoodsToOrder, createGoodsToOrder, responseForm} from '../../../restAPI/restAdminAPI';
import { yieldToMain } from '../../../restAPI/yieldMain';
import AdminComment from '../adminContent/AdminComment';
import AdminModalCustmCreate from '../adminModalForm/AdminModalCustmCreate';
import AdminModalCustomers from '../adminModalForm/AdminModalCustomers';
import AdminModalGoods from '../adminModalForm/AdminModalGoods';
import { Context } from '../../../context/Context';
import { observer } from 'mobx-react-lite';

interface IFormOrder {
    props: [[] | null, ...any[][]] | [[] | null, ...null[]];
    goodsId?: {};
    comments?: [] | null;
    customer: [] | null;
    setActive(arg0: any):void;
    storages: [any] | null;
    ordersData?: DataGoods | null;
}

type IModalFormOrder = {
    full_name?: string;
    name?: string;
    contract: [{id_contract: number, name: string}];
    id_contract?: number,
    id_customer?: number;
    addCustomer?: {
        full_name: string,
        contract: [],
        id_customer: number
    };
    map(arg0: any, ...arg: any[]): any;
}

// type ICreateInitial ={
//     createInitialState():void;
// }

type CreateGoods = {
    id?: number | string;
    full_name?: string;
    //category?: {category: {category:string}};
    category?: { category: string; };
    order_index?: number;
    //createGoodsToOrder(arg0: {}, id_order: number): void;
    id_supplier?: number;
    // storage_index?: {price: {id_storage?: number}};
    id_order_storage?: number;
    storage_index?: number;
    //id_supplier: number;
    quantity?: number;
    //quantity: number;
    //id: any;
    //id_order: number;

    price?: {
        quantity: number;
        id_storage: number | string;
        id_supplier: number | string; 
        price: number;
    };
    ////////
    //itemGoods:[];
    // i:number;
    //stateData?: [];
    // length: number;
    // state?: [];
    // forEach(arg0: (itemGoods?: {}) => Promise<void | any>): unknown;
    // push(arg0: { price: any; }): unknown;
    // splice(itemIndex: number, arg1: number): unknown;
    // map(arg0: any, ...arg: any[]): any;
    ////////
}

type DataGoods = {
    id_order: number;
    delivery: string;
    delivery_ttn: string;
    id_contract: number | string;
    id_customer: number;
    notes: string;
    order_view: string;
    organisation: string;
    pay_view: string;
    status: string;
    status_delivery: string;
    status_pay: string;
    storage: string;
    createdAt: Date;
    updatedAt: Date;
    id_user: number;
    total: number;
    customer:{full_name: string;}
    [Symbol.iterator](): any;
    order_storage: any[];
    comments: any[];
    // id_order_storage: number;
    // id: number;
    // id_supplier: number;
    // order_index: number;
    // storage_index: number;
    // quantity: number;
    // price: number;
}

enum ActionType {
    ADDTYRE = 'addTyreToOrder',
    ADDWHEEL = 'addWheelToOrder',
    DELETEITEM = 'deleteItemFromOrder',
    EDITITEM = 'editItemFromOrder',
}

interface ICreateInitial {   
    ordersData: DataGoods | undefined;
    goodsId:  {} | undefined | any; 
    //[Symbol.iterator](): any;
}  

type ActionReducer = 
    | { type: ActionType.ADDTYRE, addTyre:any, indexPrice: string}
    | { type: ActionType.ADDWHEEL, addWheel:any, indexPrice: string}
    | { type: ActionType.DELETEITEM, deleteItem: any}
    | { type: ActionType.EDITITEM, editItem: any};

type StateReducer = {
    i?:number;
    //stateData?: any[];
    length: number;
    state?: any[];
    //newStateData?:[];
    forEach(arg0: (itemGoods: {}) => Promise<void |any>): unknown;
    push(arg0: { price: any; }): unknown;
    splice(itemIndex: number, arg1: number): any;
    map(arg0: any, ...arg: any[]): any;
    slice(arg0?: number, arg1?: number): any;
    [Symbol.iterator](): any;
}

function reducer (state: StateReducer, action: ActionReducer) {
    switch (action.type) {
        case 'addTyreToOrder': {
            if (action.addTyre) {
                state?.push({...action.addTyre, 
                    "price":{...(action.addTyre.price[action.indexPrice] as object),
                       "quantity": "4"},  
                });
            }
            return state;
        }

        case 'addWheelToOrder': {
            if (action.addWheel) {
                state.push({...action.addWheel, 
                    "price":{...(action.addWheel.price[action.indexPrice] as object),
                        "quantity": "4"}, 
                }); 
            }
            return state;
        }

        case 'deleteItemFromOrder': {
            if (state.length > 0) {
                state.splice(action.deleteItem, 1); 
            }
            return state;
        }

        case 'editItemFromOrder': { 
            return [...action.editItem];
        }

        default: {
            throw Error('Unknown action: ' + action.type);
        } 
    }
    
}

function createInitialState (goodsId: any | undefined, ordersData?: DataGoods | null) {
            
    let initialState = [];

    if (goodsId) {
        initialState.push({...goodsId, 
            "price":{...goodsId.price[0],
               "quantity": "4"},  
        });
    } 
    
    if (ordersData) {
        initialState.push(...ordersData.order_storage);
    }

    return initialState;    
};

const AdminFormOrder = observer((
    {props, goodsId, comments, setActive, customer, storages, ordersData}:IFormOrder
    ) => {
    const {user} = useContext<any | null>(Context);
    const [tyreDatas, wheelDatas] = props;
    const [orderId, setOrderId] = useState<number | null>(null);
    const [addGoods, setAddGoods] = useState<boolean>(false);
    const [createCustomer, setCreateCustomer] = useState<boolean>(false);
    const [openCustomers, setOpenCustomers] = useState<boolean>(false);
    const [addCustomer, setAddCustomer] = useState<IModalFormOrder | undefined>(undefined);
    const [disableBtn, setDisableBtn] = useState<boolean>(false);
    const [disableBtnOk, setDisableBtnOk] = useState<boolean>(false);
    const [orderStorage, setOrderStorage] = useState<any[]>([]);
    const {register, handleSubmit, setValue, formState: {errors}} = useForm();    
    const [state, dispatch] = useReducer<Reducer<StateReducer, ActionReducer>>(
        reducer, createInitialState(goodsId, ordersData)
        );
    const [newComment, setNewComment] = useState<string>('Пишить коментар..');
    //const [orderData, setOrderData] = useState<{}>();
     
    useEffect(() => {
        register("id_customer", {required: 'Це необхідні дані'});
        setValue("id_customer", addCustomer?.id_customer,
        { shouldValidate: true })
      }, [register, setValue, addCustomer?.id_customer])
    
    useEffect(() => {
        register('id_contract', {required: 'Це необхідні дані'})
        setValue("id_contract", addCustomer?.contract[0]?.id_contract,
        { shouldValidate: true })
      }, [register, setValue, addCustomer?.contract])

      useEffect(() => {
        if (ordersData) {
            setDisableBtn(true);
            setDisableBtnOk(true);
        }
      },[ordersData])
//
    const onChangeInput = useCallback(
        (e: any, id: number, indexItem: number) => {

        let {name, value} = e.target;
        //console.log('INPUT', ref.current)
        // console.log('name', name);
         console.log('valueINPUT', value);
        // console.log('ITEM Id', id);

            dispatch({type: ActionType.EDITITEM, 
                editItem: state.map(
                            (item: {id: number; price:{price: number}}, index: number) => {
                        return (
                            item.id === id && index === indexItem ?
                            {...item, price: {...item.price, [name]: value ?? '0'}}
                            : item
                        )}
                        )
                //indexPrice: indexValue,
            });

    },[state])
    
    const addGoodsForm = () => {
        setAddGoods(!addGoods);
    };

    const activeCustomer = () => {
        setCreateCustomer(!createCustomer);
    };
    const openCustomerForm = () => {
        setOpenCustomers(!openCustomers);
    };    
    //const actions = useMemo(() => ({
        const addCustToOrder = async (valueCust: number) => {
            //console.log(valueCust);
            const findCustomer = customer!.find(
                (items:{id_customer:number}) => items?.id_customer === +valueCust
            );
            if (findCustomer) {
                setAddCustomer(findCustomer);  
            }
        }

        const addGoodsToList = async (value:string) => {
            //let [idValue, indexValue] = value;
            const newArr = value.split(',');
            //console.log('VALUE: ', newArr);
            // console.log('ID', newArr[0]);
            // console.log('INDEX', newArr[1]);
            let [idValue, indexValue] = newArr;
            // console.log('ARR ID', +idValue);
            //console.log('ARR INDX', +indexValue);
            //setPriceIndex(+indexValue); 

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
    
    //GOOD PERFORM
    const onSubmit = async (data:{}, e: any) => {
            e.preventDefault();
            //e.stopPropagation();
            console.log('CREATE ORDER: ', data)
        //try {
            if (!orderId && state.length === 0) {
               let resultForm: any = await responseForm(data);
                setOrderId(+resultForm.data.id_order);
                alert(`Заказ створено, id ${resultForm.data.id_order},
                    але товари не додані.
                `); 
            }

            if(!orderId && state.length > 0) {

                let resultForm: any = await responseForm(data);
                setOrderId(+resultForm.data.id_order);

                state.forEach(async (itemGoods: CreateGoods): Promise<any> => {
                    let resultOrder: any = await createGoodsToOrder(itemGoods, resultForm.data.id_order!);
                    setOrderStorage(oldOrdStor => [...oldOrdStor, resultOrder.data]);
                    await yieldToMain(); 
                console.log('Order_storage', resultOrder.data);
                }) 
                alert(`Заказ створено, id ${resultForm.data.id_order}`);
                setDisableBtn(!disableBtn);
            }

            if(orderId && state.length > 0) {
        
            state.forEach(async (itemGoods: CreateGoods): Promise<any> => {
                let resultOrder: any = await createGoodsToOrder(itemGoods, orderId);
                setOrderStorage(oldOrdStor => [...oldOrdStor, resultOrder.data]);
                await yieldToMain(); 
                console.log('Order_storage', resultOrder.data);
            }) 
                alert(`Заказ створено, id ${orderId}`);
                setDisableBtn(!disableBtn);
            } else if(orderId && state.length === 0){
                alert("Треба добавити товари.");
            }
            e.stopPropagation();
        // } catch {
        //     reset();
        // }    
    }    
    //const onError = (errors:any, e:any) => console.log(errors, e);
    //GOOD PERFORM
    const onSubmitOrder = async () => {

        //if(orderStorage.length !== 0) {
         
        try {
            //let respDone = async () => {
            orderStorage?.forEach(async(itemsOrd): Promise<any> => {
                let resOrd: any = await addGoodsToOrder(itemsOrd);
                await yieldToMain();
                console.log('onSubmOrder', resOrd.data);
            })
            //}
        //alert(`Заказ ${1} проведено`)
        //console.log('Order Done', resp.data)
            alert(`Заказ ${orderId} проведено`)
            setDisableBtnOk(!disableBtnOk);
        } catch (error) {
            alert (
                `Помилка. Не вірні данні, не вистачае залишків,
                або системна помилка: ` + error
            )
        }      
    };
    //)
    console.log('STATE: ', state);
    //console.log('GOODSID', goodsId);
    //console.log('CUSTOMER', customer);
    //console.log('TYRE DATAS: ', tyreDatas);
    console.log(errors);
    console.log('ORDER STORG ARRAY: ', orderStorage);

    const addComment = async() => {
        try {
           await addCommentsToOrder(
            ordersData?.id_order,
            user._user?.sub.id_user, 
            newComment); 
        } catch (error) {
            console.log(error)
        }    
    }

    return (
        <div >
            Замовлення Покупця
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
                            data-value={ordersData ? ordersData?.createdAt : ''}
                            defaultValue=''
                            placeholder="Дата"
                            readOnly={true}
                            //min="2023-01-01" 
                        />  
                    </div>
                    <div>
                        <label htmlFor="fname">id </label>
                        <input className="admFormOrderId"
                            type="text"
                            name="firstname"
                            value={orderId ? orderId : ordersData?.id_order} 
                            defaultValue=''
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
                            {ordersData ?
                                <option data-value={ordersData.organisation}>
                                    {ordersData?.organisation}
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
                            {ordersData ?
                                <option data-value={ordersData.storage}>
                                    {ordersData?.storage}
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
                            {ordersData ?
                                <option data-value={ordersData.order_view}>
                                    {ordersData?.order_view}
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
                            {ordersData ?
                                <option data-value={ordersData.status}>
                                    {ordersData?.status}
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
                            <label htmlFor="lname">Покупець </label>
                            <input  className="admFormOrderName"
                                type="text"
                                name="customer" 
                                maxLength={45}
                                placeholder="Ім'я або назва.."
                                value={addCustomer?.full_name ?? ordersData?.customer.full_name ?? ''}
                                readOnly={true}
                                //onChange={() => setAddCustomer(addCustomer)}
                            />
                            <div onClick={(e)=>e.preventDefault()}>
                                <button onClick={openCustomerForm} className='admFormSearchCustm'>
                                    <i className="fas fa-search"></i>    
                                </button> 
                            </div>
                            <div onClick={(e)=>e.preventDefault()}>
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
                            defaultValue={addCustomer?.contract[0]?.id_contract}
                            >
                           {addCustomer ? addCustomer?.contract?.map(
                            (entity:{name: string; id_contract:number;}, index:number)=> (  
                                <option key={'contract' + index} 
                                value={entity.id_contract}
                                >
                                    {entity.name} {entity.id_contract} 
                                </option>
                                )) : <option data-value={ordersData?.id_contract}>
                                        {ordersData?.id_contract}
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
                            {ordersData ?
                                <option data-value={ordersData.delivery}>
                                    {ordersData?.delivery}
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
                            defaultValue={ordersData?.delivery_ttn ?? ''}
                        />  
                    </div>
                    <div>
                        <label htmlFor="status">Статус дост </label>
                        <select className="admFormOrderStatusDel" 
                            {...register('status_delivery', {required: 'Це необхідні дані'})}
                            name="status_delivery"
                            >
                                {ordersData ?
                                <option data-value={ordersData.status_delivery}>
                                    {ordersData?.status_delivery}
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
                    <div onClick={(e)=>e.preventDefault()}>
                        <button onClick={addGoodsForm} className='admFormOrderBtnAdd'>Додати товар</button>  
                    </div>
                    <div>
                        <label htmlFor="pay_view">Вид оплати </label>
                        <select className="admFormOrderViewPay" 
                            {...register('pay_view', {required: 'Це необхідні дані'})}
                            name="pay_view"
                            >
                            {ordersData ?
                                <option data-value={ordersData.pay_view}>
                                    {ordersData?.pay_view}
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
                        {ordersData ?
                            <option data-value={ordersData.status_pay}>
                                {ordersData?.status_pay}
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
                    //onClick={(e)=>e.preventDefault()}
                    >   
                <table className='admFormOrderTable'>
                    <thead className='admFormOrderTableTh'>
                        <tr>
                            <th>id</th>
                            <th>Товар</th>
                            <th>Категорія</th>
                            <th>Кількість</th>
                            <th>Резерв</th>
                            <th>Ціна</th>
                            <th>Сума</th>
                            <th>склад</th>
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
                                category:{category:string}, 
                                price:{price:number; quantity: number}}, 
                                index:number
                            ) =>(
                        <tr key={item.id + index} 
                            onInput={(e) => e.stopPropagation()}
                            //onClick={(e)=>e.preventDefault()}
                            >
                            <td >{item.id}</td>
                            <td >{item.full_name}</td>
                            <td >{item.category?.category ?? item?.category}</td>
                            <td 
                                onInput={(e) => e.stopPropagation()}
                            >
                                <input 
                                id={'quantity'+ item.id}
                                type="text"
                                name="quantity"
                                value={item.price?.quantity ?? item?.quantity}
                                onInput={(e) => onChangeInput(e, item.id, index)}
                                placeholder="Введіть цифри"
                                />
                            </td>
                            <td >{item?.reserve ?? 0}</td>
                            <td  
                                onInput={(e) => e.stopPropagation()}
                                >
                                <input 
                                id={'price' + item.id}
                                type="text"
                                name="price"
                                value={item.price?.price ?? item?.price}
                                onInput={(e) => onChangeInput(e, item.id, index)}
                                placeholder="Введіть цифри" 
                                />
                           
                            </td>
                            <td >{item?.total ?? item.price.price * item.price.quantity}</td>
                            <td >
                                <select className="admFormOrderStorage" name="storage_index"
                                    //{...register('storage_index', {required: 'Це необхідні дані'})}
                                    >
                                    <option value={1}>Склад Поставщик</option>
                                    <option value={2}>Склад Основний</option>
                                    <option value={3}>Склад Монтаж</option>
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
                        placeholder="Пишить нотатку..">
                    </textarea>  
                </div>
                <div className='admFormOrderCommit'
                    onClick={(e)=>e.preventDefault()}>
                    <div className='admFormOrderAddCommit'>
                    <button className='admFormOrderBtnAdd'
                        onClick={addComment} 
                        >Додати коментар
                    </button>
                        <textarea 
                        className='admOrderCommitText'
                        value={newComment}
                        onChange={e =>setNewComment(e.target.value)}
                        //name="subject" 
                        //</div>placeholder="Пишить коментар.."
                        >        
                        </textarea>
                    </div>
                    <div className='admFormOrderCommitChat'>
                        <AdminComment comments={ordersData?.comments}/>
                    </div>  
                </div>
                <div className='admOrderFormGrp'
                        //onClick={(e) => e.stopPropagation()}
                        //onClickCapture={e=>e.stopPropagation()}
                     >
                    <div onClick={(e) => e.stopPropagation()}>
                        <button className={!disableBtnOk ? 'admFormOrderBtnOk' : 'admFormOrderBtnOkDsb'}
                            disabled={disableBtnOk}
                            onClick={onSubmitOrder}>
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
                            type="submit"
                            //onClick={handleSubmit(onSubmit)}
                            //onClickCapture={e=>e.stopPropagation()}
                            >
                            Зберегти
                        </button>
                    </div>
                    <div onClick={(e) => e.stopPropagation()}>
                        <button className='admFormOrderBtn' onClick={() =>setActive(false)}>Відмінити</button>
                    </div>
                    <span>id: {user._user?.sub.id_user ?? ordersData?.id_user}</span>
                    <span>користувач: {user._user?.sub.name ?? ordersData?.id_user}</span>
                    <span>посада: {user._user?.sub.user?.role ?? ordersData?.id_user}</span>

                </div>
            </form>
        </div>
            {openCustomers ?
                <ModalAdmin active={openCustomers} setActive={setOpenCustomers} >
                    <AdminModalCustomers 
                        allCustomer={customer}
                        addCustomer={addCustToOrder}/>
                </ModalAdmin> : null  
            }
            {createCustomer ?
                <ModalAdmin active={createCustomer} setActive={setCreateCustomer}>
                    <AdminModalCustmCreate />   
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
        </div>
    );
});

export default AdminFormOrder;