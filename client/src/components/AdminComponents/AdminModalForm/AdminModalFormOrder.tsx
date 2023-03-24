import React, {useMemo, useReducer, Reducer, useState, useCallback, useEffect} from 'react';
import '../../../css/AdminComponentCss/AdminModalFormCss/AdminFormOrder.css';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import ModalAdmin from '../../modal/ModalAdmin';
import AdminComment from '../adminContent/AdminComment';
import AdminModalCustmCreate from './AdminModalCustmCreate';
import AdminModalCustomers from './AdminModalCustomers';
import AdminModalGoods from './AdminModalGoods';
//import {addGoodsToOrder, createGoodsToOrder, responseForm} from '../../../RestAPI/restAdminAPI';

interface IFormOrder {
    props: [[] | null, ...any[][]] | [[] | null, ...null[]];
    goodsId?: {};
    comments?: [] | null;
    customer: [] | null;
    setActive(arg0: any):void;
    storages: [any] | null;
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
    id?: number;
    full_name?: string;
    category?: {category: {category:string}};
    order_index?: number;
    // id_supplier?: {price: {id_supplier?: number}};
    // storage_index?: {price: {id_storage?: number}};
    // quantity?: {price?: {quantity?: number}};
    price?: {
        quantity: number;
        id_storage: number;
        id_supplier: number; 
        price: {price: number};
    };
}

type AddGoods = {
    id_order_storage: number;
    id: number;
    id_supplier: number;
    order_index: number;
    storage_index: number;
    quantity: number;
    price: number;
}

enum ActionType {
    ADDTYRE = 'addTyreToOrder',
    ADDWHEEL = 'addWheelToOrder'
}

// interface IReduser {
//     type?: string;
//     addWheel?:{ price:[]};
//     addTyre?:{ price:[]};
//     indexPrice?: number;
// }  

type ActionReducer = 
    | { type: ActionType.ADDTYRE, addTyre:any, indexPrice: string}
    | { type: ActionType.ADDWHEEL, addWheel:any, indexPrice: string};
   //{ type: ActionType.ADDWHEEL, addWheel:{ price:[]}, indexPrice: string, payload?: number};
// interface DispatchType {
//     dispatch(  {arg0}: any) :void; 
// }

type StateReducer = {
    lenght: number;
    state?: [];
    forEach(arg0: (itemGoods: {}) => Promise<void>): unknown;
    push(arg0: { price: any; }): unknown;
    splice(itemIndex: number, arg1: number): unknown;
    map(arg0: any, ...arg: any[]): any;
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

        default: {
            throw Error('Unknown action: ' + action.type);
        } 
    }
    
}

function createInitialState (goodsId: any | undefined): any {
            
    let initialState = [];

    if (goodsId) {
        initialState.push(goodsId);
        //setPriceItem(goodsId.price[0].price);
        //console.log(initialState); 
    }
       
    return initialState;
        
};

const AdminFormOrder = (
    {props, goodsId, comments, setActive, customer, storages}:IFormOrder
    ) => {
    const [tyreDatas, wheelDatas] = props;
    const [orderId, setOrderId] = useState<number | null>(null);
    const [addGoods, setAddGoods] = useState<boolean>(false);
    const [createCustomer, setCreateCustomer] = useState<boolean>(false);
    const [openCustomers, setOpenCustomers] = useState<boolean>(false);
    const [addCustomer, setAddCustomer] = useState<IModalFormOrder | null>(null);
    const [disableBtn, setDisableBtn] = useState<boolean>(false);
    const [orderStorage, setOrderStorage] = useState<any[]>([]);
    const {register, handleSubmit, setValue, formState: {errors}} = useForm();    
    const [state, dispatch] = useReducer<Reducer<StateReducer, ActionReducer>>(reducer, createInitialState(goodsId));
    const [stateData, setStateData] = useState(state);
     
    useEffect(() => {
        register("id_customer");
        setValue("id_customer", addCustomer?.id_customer)
      }, [addCustomer?.id_customer, register, setValue])
    
    useEffect(() => {
        register('id_contract')
        setValue("id_contract", addCustomer?.contract[0]?.id_contract)
      }, [register, setValue, addCustomer?.contract])
  
    // const onChangeQuantity = () => {

    //     console.log('quantity', defaultQuantity.current);

    //     defaultQuantity = defaultQuantity.current;
        
    // }

    const onChangeInput = useCallback(
        (e: any, id: number, indexItem: number) => {

        let {name, value} = e.target;
        //console.log('INPUT', ref.current)
        // console.log('name', name);
         console.log('valueINPUT', value);
        // console.log('ITEM Id', id);
            setStateData(editStateData => 
                editStateData.map(
                    (item: {id: number; price:{price: number}}, index: number) => {
                return (
                    item.id === id && index === indexItem ?
                    {...item, price: {...item.price, [name]: value ?? '0'}}
                    : item
                )}
                )
            )
    },[])

    console.log('editData', stateData)
    
    const addGoodsForm = () => {
        setAddGoods(!addGoods);
    };

    const activeCustomer = () => {
        setCreateCustomer(!createCustomer);
    };
    const openCustomerForm = () => {
        setOpenCustomers(!openCustomers);
    };
    
    const actions = useMemo(() => ({

        addCustToOrder: (valueCust: number) => {
            //console.log(valueCust);
            const findCustomer = customer!.find(
                (items:{id_customer:number}) => items?.id_customer === +valueCust
            );

            if (findCustomer) {
                setAddCustomer(findCustomer);  
            }

        },

        addGoodsToList: (value:string) => {
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

    }),[tyreDatas, wheelDatas, customer])

    
    //useEffect(() => {
        const deleteItem = (itemIndex: number) => {
        
           //dispatch({type: 'deleteItemFromOrder', 
            state.splice(itemIndex, 1);
            stateData.splice(itemIndex, 1);
           
            //deleteItem: itemIndex});
        } 
//},[state, stateData])
    
    

    // async function handleSubmit(e) {
    //     e.preventDefault();
    //     setStatus('submitting');
    //     try {
    //       await submitForm(answer);
    //       setStatus('success');
    //     } catch (err) {
    //       setStatus('typing');
    //       setError(err);
    //     }
    // }
    //useEffect(() => {  
  
        const responseForm = async (data:{}) => { 
           await axios.post(`http://${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/orders`, data, {
               headers: {
                   'Content-Type': 'application/json; charset=utf-8',
                   'Access-Control-Allow-Origin': `${process.env.CORS}`
               }, withCredentials: true,
               })
               .then(response => {
               //setOrderAllData(response.data);
               
               alert(`Заказ створено, id ${response.data.id_order}`);
               console.log('Order id: ', response.data.id_order);
               setOrderId(+response.data.id_order);
   
               //if (stateData.length !== 0) {
                // for (let i =0; i < stateData.length; i++) {
                //     createGoodsToOrder(stateData[i], response.data.id_order)
                    
                // }
                   stateData.forEach((itemGoods) => (
                     createGoodsToOrder(itemGoods, response.data.id_order)
                   ));
               //}
   
               console.log('ORDER ID', response.data.id_order);
                //   return response.data;
               })
               .catch(error => {
                   console.log(error);
               }
          )
   
       }
     //   return () => responseForm();      
    // },[]) 

    // useEffect(() =>{
    //     createGoodsToOrder();
        const createGoodsToOrder = async (item: CreateGoods, id_order:number) => { 
        const resPost =  await axios.post(`http://${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/orders/creategoods`,
                {
                    id: +item?.id!,
                    full_name: item.full_name,
                    category: item.category?.category,
                    order_index: id_order,
                    id_supplier: +item.price?.id_supplier!,
                    storage_index: +item.price?.id_storage!,
                    quantity: +item.price?.quantity!,
                    price: +item.price?.price!,
                    // delivery: 'Flintstone',
                },{headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                    'Access-Control-Allow-Origin': `${process.env.CORS}`
                }, withCredentials: true,
                })
                .then(response => {
                    
                    setOrderStorage(oldOrdStor => [...oldOrdStor, response.data]);
                    console.log('Order_storage', response.data);
                //return response
                })
                .catch(error => {
                    console.log(error)
                }
            )

            return resPost;
        }
    //     return () => createGoodsToOrder();
    // },[])
    
    const addGoodsToOrder = async (value: AddGoods) => {
        await axios.post(`http://${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/orders/add`,
            {
                // id: +item.id,
                // full_name: item.full_name,
                // category: item.category.category,
                // order_index: +orderId,
                // id_supplier: +item.stock[0].id_supplier,
                // storage_index: +item.stock[0].id_storage,
                // quantity: +item.price.quantity,
                // price: +item.price.price,
                id_order_storage: value?.id_order_storage,
                id: value.id,
                id_supplier: value.id_supplier,
                id_order: value.order_index,
                id_storage: value.storage_index,
                quantity: value.quantity,
                price: value.price
                // delivery: 'Flintstone',
            },{headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'Access-Control-Allow-Origin': `${process.env.CORS}`
            },withCredentials: true,
            })
            .then(response => {
            //setOrderAllData(response.data);
            alert(`Заказ ${response.data.id_order} проведено`)

            console.log('Order Done', response.data);
            })
            .catch(error => {
                console.log(
                    'Не вистачає залишків, або не вірно вказані дані',
                     error)
            }
        )
    }

        
    const onSubmit = async (data:{}) => {
                //e.preventDefault();
                console.log('CREATE ORDER: ', data)
                //if(data) {
    
                await responseForm(data); 

                setDisableBtn(!disableBtn);
            //};
    
            // return () => onSubmit();
    }    
    
        
    const onSubmitOrder = async () => {

        //if(orderStorage.length !== 0) {
         
        try {
            //let respDone = async () => {
            orderStorage?.forEach((itemsOrd) => {
             addGoodsToOrder(itemsOrd)
           
            })
            //}
        //alert(`Заказ ${1} проведено`)
        //console.log('Order Done', resp.data)

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
    console.log('ORDER STOR ARRAY: ', orderStorage);

    return (
        <div>
            Замовлення Покупця
            <div className="containerAdmOrderForm">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='admFormDataOrder'>
                    <div>
                        <label htmlFor="fname">Дата</label>
                        <input type="datetime-local" 
                            className="admFormOrderData" 
                            name="date" 
                            min="2023-01-01"
                            //value="2023-02-22"    
                        />  
                    </div>
                    <div>
                        <label htmlFor="fname">id </label>
                        <input className="admFormOrderId"
                            type="text"
                            name="firstname"
                            value={orderId ?? ''} 
                            //maxLength='30'
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
                            <option value={"ФОП Гайворонський"}>ФОП Гайворонський</option>
                            <option value={"фл Гайворонський Н. М"}>фл Гайворонський Н. М</option>
                            <option value={"ТОВ Скай-Партс"}>ТОВ Скай-Партс</option>
                        </select>  
                    </div>
                    <div>
                        <label htmlFor="storage">Склад </label>
                        <select className="admFormOrderStorage" 
                            {...register('storage', {required: 'Це необхідні дані'})}
                            name="storage"
                            >
                            <option value={'Склад Поставщик'}>Склад Поставщик</option>
                            <option value={'Склад Основний'}>Склад Основний</option>
                            <option value={'Склад Монтаж'}>Склад Монтаж</option>
                        </select>  
                    </div>
                    <div>
                        <label htmlFor="orderView">Вид </label>
                        <select className="admFormOrderView" 
                            {...register('order_view', {required: 'Це необхідні дані'})}
                            name="order_view"
                            >
                            <option value="Сайт">Сайт</option>
                            <option value="Роздріб">Роздріб</option>
                            <option value="Опт">Опт</option>
                            <option value="Інше">Інше</option>
                        </select>  
                    </div>
                    <div>
                        <label htmlFor="statusOrder">Статус </label>
                        <select className="admFormOrderStatus" 
                            {...register('status', {required: 'Це необхідні дані'})}
                            name="status_order"
                            >
                            <option value="Новий">Новий</option>
                            <option value="Продаж">Продаж</option>
                            <option value="Обробка">Обробка</option>
                            <option value="Виконання">Виконання</option>
                            <option value="Відміна">Відміна</option>
                            <option value="Повернення">Повернення</option>
                        </select>    
                    </div>
                    <div>
                        <div className='admFormOrderCustm'>
                            <label htmlFor="lname">Покупець </label>
                            <input  className="admFormOrderName"
                                type="text"
                                name="customer" 
                                maxLength='45'
                                placeholder="Ім'я або назва.."
                                value={addCustomer?.full_name ?? ''}
                                onChange={() => setAddCustomer(addCustomer)}
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
                                )) : <option></option>
                            } 
                        </select>
                    </div>

                    <div>
                        <label htmlFor="pereviznik">Перевізник </label>
                        <select className="admFormOrderDelivery" 
                            {...register('delivery', {required: 'Це необхідні дані'})}
                            name="delivery"
                            >
                            <option value="Самовивіз">Самовивіз</option>
                            <option value="Своя Доставка">Своя Доставка</option>
                            <option value="Нова Пошта">Нова Пошта</option>
                            <option value="Укр Пошта">Укр Пошта</option>
                            <option value="Делівері">Делівері</option>
                        </select>    
                    </div>
                    <div>
                        <label htmlFor="fname">ТТН </label>
                        <input type="text" 
                            className="admFormOrderTtn" 
                            maxLength='45'
                            placeholder="ТТН замовлення.."
                            {...register('delivery_ttn')}
                            name="delivery_ttn"
                        />  
                    </div>
                    <div>
                        <label htmlFor="status">Статус дост </label>
                        <select className="admFormOrderStatusDel" 
                            {...register('status_delivery', {required: 'Це необхідні дані'})}
                            name="status_delivery"
                            >
                            <option value="Новий">Новий</option>
                            <option value="Самовивіз">Самовивіз</option>
                            <option value="Обробляеться">Обробляеться</option>
                            <option value="Очікує ТТН">Очікує ТТН</option>
                            <option value="Доставляеться">Доставляеться</option>
                            <option value="Отримано ТТН">Отримано ТТН</option>
                            <option value="Повернення ТТН">Повернення ТТН</option>
                            <option value="Відміна">Відміна</option>
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
                            <option value="Новий">Новий</option>
                            <option value="Готівка">Готівка</option>
                            <option value="Б/г рахунок">Б/г рахунок</option>
                            <option value="Б/г карта">Б/г карта</option>
                            <option value="Наложка">Наложка</option>
                            <option value="Відміна">Відміна</option>
                            <option value="Повернення">Повернення</option>
                        </select>    
                    </div>
                    <div>
                    <label htmlFor="status_pay">Статус оплати </label>
                        <select className="admFormOrderStatusPay" 
                            {...register('status_pay', {required: 'Це необхідні дані'})}
                            name="status_pay"
                        >
                        <option value="Новий">Новий</option>
                        <option value="Очікує Оплату">Очікує Оплату</option>
                        <option value="Оплачено">Оплачено</option>
                        <option value="Виконання">Виконання</option>
                        <option value="Відміна">Відміна</option>
                        <option value="Повернення">Повернення</option>
                        <option value="Наложка Отримана">Наложка Отримана</option>
                        </select>    
                    </div>   
                </div>
                <div className='admFormOrderTableBox'>   
                <table className='admFormOrderTable'>
                    <thead className='admFormOrderTableTh'>
                        <tr>
                            <th>id</th>
                            <th>Товар</th>
                            <th>Категорія</th>
                            <th>Кількість</th>
                            <th>Резерв</th>
                            <th>Ціна</th>
                            <th>склад</th>
                            <th>Опціі</th>
                        </tr>     
                    </thead>
                    <tbody>
                        {stateData?.lenght !== 0 ? 
                            stateData?.map((
                                item:{id:number, 
                                full_name:string, 
                                category:{category:string}, 
                                price:{price:number; quantity: number}}, 
                                index:number
                            ) =>(
                        <tr key={item.id + index} 
                        //onChange={(e)=>e.preventDefault({passive: false})}
                            >
                            <td >{item.id}</td>
                            <td >{item.full_name}</td>
                            <td >{item.category?.category}</td>
                            <td key={'quantity' + item.id + index} 
                                onInput={(e) => e.stopPropagation()}
                                >
                                <input 
                                id={'quantity'+ item.id}
                                key={'quantity'+ item.id + index}
                                type="text"
                                name="quantity"
                                value={item.price?.quantity}
                                onInput={(e) => onChangeInput(e, item.id, index)}
                                placeholder="Введіть цифри"
                                />
                            </td>
                            <td >{0}</td>
                            <td 
                                key={'price' + item.id + index} 
                                onInput={(e) => e.stopPropagation()}
                                >
                                <input 
                                id={'price' + item.id}
                                key={'price' + item.id + index}
                                type="text"
                                name="price"
                                value={item.price?.price}
                                onInput={(e) => onChangeInput(e, item.id, index)}
                                placeholder="Введіть цифри" 
                                />
                           
                            </td>
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
                                //onClick={(e)=>e.preventDefault({passive: false})}
                                onClick={(e) => e.stopPropagation()}
                            >
                                <div 
                                    onClick={(e) => e.stopPropagation()}
                                //onClick={(e)=>e.preventDefault({passive: false})}
                                >
                                <button className='closeAdmGoods' 
                                    key={'deleteBtn' + item.id}
                                    value={index}
                                    onClick={e => deleteItem(+e.currentTarget.value)}>
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
                    <button onClick={() => console.log('Add Commit')} 
                        className='admFormOrderBtnAdd'>Додати коментар
                    </button>
                        <textarea  name="subject" className='admOrderCommitText'
                        placeholder="Пишить коментар.."></textarea>
                    </div>
                    <div className='admFormOrderCommitChat'>
                        <AdminComment/>
                    </div>  
                </div>
                <div className='admOrderFormGrp'
                    onClick={(e) => e.stopPropagation()}
                     //onClick={(e)=>e.preventDefault({passive: false})}
                     >
                    <div onClick={(e)=>e.preventDefault()}>
                        <button className='admFormOrderBtnOk'
                            onClick={onSubmitOrder}>
                            Ok
                        </button>
                    </div>
                    <div 
                        onClick={(e) => e.stopPropagation()}
                        //onClick={(e)=>e.preventDefault({passive: false})}
                        >
                        <button className={!disableBtn ? 'admFormOrderBtnSave' : 'admFormOrderBtnSaveDsb'}
                            disabled={disableBtn} 
                            onClick={handleSubmit(onSubmit)}>
                            Зберегти
                        </button>
                    </div>
                    <div onClick={(e) => e.stopPropagation()}>
                        <button className='admFormOrderBtn' onClick={() =>setActive(false)}>Відмінити</button>
                    </div>
                </div>
            </form>
        </div>
            {openCustomers ?
                <ModalAdmin active={openCustomers} setActive={setOpenCustomers} >
                    <AdminModalCustomers 
                        allCustomer={customer}
                        addCustomer={actions.addCustToOrder}/>
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
                        showRowModData={actions.addGoodsToList}
                        props={props}
                        storageGoods={storages}
                    />
                </ModalAdmin> : null
            }
        </div>
    );
};

export default AdminFormOrder;