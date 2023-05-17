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

const AdminModalOrderSup = observer((
    {
        goodsId,
        supplier,
        comments,
        setActive,
        showComment,
        storages,
        ordersData, 
        props
    }: IFormOrder) => {
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
    const [newComment, setNewComment] = useState<string | undefined>();
    const [addNewCommit, setAddNewCommit] = useState();
    const [updateBtn, setUpdateBtn] = useState<string | null>(null); 
    
    useEffect(() => {
        register("id_customer", {required: 'Це необхідні дані'});
        register("id_user", {required: 'Це необхідні дані'});
        setValue("id_user", user._user?.sub.id_user);
        setValue("id_customer", addCustomer?.id_customer,
        { shouldValidate: true })
      }, [register, setValue, addCustomer?.id_customer, user])
    
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

    const onChangeInput = useCallback(
        (e: any, id: number, indexItem: number) => {
        let {name, value} = e.target;
        dispatch({type: ActionType.EDITITEM, 
            editItem: state.map(
                (item: {id: number; price:{price: number}}, index: number) => {
                    return (
                        item.id === id && index === indexItem ?
                        {...item, price: {...item.price, [name]: value ?? '0'}}
                        : item
                        )}
            )
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
            if (!orderId && state.length === 0) {
               let resultForm: any = await responseForm(data);
                setOrderId(+resultForm.data.id_order);
                alert(`Замовлення створено, id ${resultForm.data.id_order},
                    але товари не додані.
                `); 
            }
            if(!orderId && state.length > 0) {
                let resultForm: any = await responseForm(data);
                setOrderId(+resultForm.data.id_order);
                state.forEach(async (itemGoods: CreateGoods): Promise<any> => {
                    let resultOrder: any = await createGoodsToOrder(itemGoods, resultForm.data.id_order!);
                    setOrderStorage(oldOrdStor => [...oldOrdStor, resultOrder.data]);
                })
                setUpdateBtn('Оновити');
                alert(`Замовлення створено, id ${resultForm.data.id_order}. 
                    Для підкріплення товарів до замовлення треба натиснути ОК.`);
            }
            if(orderId && state.length > 0 && disableBtnOk === false) {
                orderStorage?.forEach(async(itemsOrd): Promise<any> => {
                    await updateOrderStorage(itemsOrd);
                });
                orderStorage.splice(0, orderStorage.length);
                state.forEach(async (itemGoods: CreateGoods): Promise<any> => {
                    let resultOrder: any = await createGoodsToOrder(itemGoods, orderId);
                 setOrderStorage(oldOrdStor => [...oldOrdStor, resultOrder?.data]);  
                });  
                await updateOrder(data, orderId);    
                alert(`Замовлення збереженно, id ${orderId} товари оновлені.`);
            
            } 
            if(orderId && state.length === 0){
                alert("Товари не додані");
            }
            if (orderId && state.length !== 0 && disableBtnOk === true){
                const newStorage = () => {
                orderStorage.forEach(async(itemsOrd): Promise<any> => {
                    await updateOrderStorage(itemsOrd);
                });
                orderStorage.splice(0, orderStorage.length);
                state.forEach(async (itemGoods: CreateGoods): Promise<any> => {
                    let resultOrder: any = await createGoodsToOrder(itemGoods, orderId);
                    setOrderStorage(oldOrdStor => [...oldOrdStor, resultOrder?.data]);
                });
                }
                newStorage();
                setDisableBtnOk(!disableBtnOk);
                await updateOrder(data, orderId);
                alert(`Товари до замовлення id ${orderId}, оновлено.`);
            }
            e.stopPropagation();
        } catch {
            console.log('ERROR_ORDER_SUP: ', e);
        }    
    }    
    //GOOD PERFORM
    const onSubmitOrder = async () => {
        try {
            if(orderId && orderStorage.length !== 0) {
                orderStorage?.forEach(async(itemsOrd): Promise<any> => {
                    let resOrd: any = await addGoodsToOrder(itemsOrd);
                    console.log('ON_SUBMIT_GOODS_TO_ORDER: ', resOrd.data);
                })
                alert(`Замовлення id${orderId} проведено, товари до замовлення додані і збережені `)
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
    const orderDataSum = ordersData?.order_storage.reduce(
        (sum:any, current:any) => 
        sum + current.total, 0
    );

    const addComment = async(e: any) => {
        try {
            const addCommit: any = await addCommentsToOrder(
                user._user?.sub.id_user, 
                orderId ?? ordersData?.id_order, 
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
                        data-value={ordersData ? ordersData?.createdAt : ''}
                        defaultValue={ordersData ?
                            new Date(ordersData?.createdAt).toLocaleString() : ''}
                        placeholder="Дата"
                        readOnly={true}
                    />  
                </div>
                <div>
                    <label htmlFor="fname">id </label>
                    <input className="admFormOrderId"
                        type="text"
                        name="firstname"
                        value={orderId ?? ordersData?.id_order ?? ''} 
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
                        <th>Ціна</th>
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
                    value={ordersData?.notes}
                    placeholder="Пишить нотатку..">
                </textarea>  
            </div>
            <div className='admFormOrderCommit'
                onClick={(e)=>e.preventDefault()}
                //onClick={(e) => e.stopPropagation()}
                >
                <div className='admFormOrderAddCommit'>
                <button className='admFormOrderBtnAdd'
                    value={orderId ?? ordersData?.id_order}
                    onClick={(e) => addComment(e)}
                    //onInput={(e) => showComment(e)}
                    //data-order={ordersData?.id_order}
                    >Додати коментар
                </button>
                    <textarea 
                    className='admOrderCommitText'
                    value={newComment}
                    //data-order={ordersData?.id_order}
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
                <span>id: {ordersData?.user.id_user ?? user._user?.sub.id_user}</span>
                <span>користувач: {ordersData?.user.name ?? user._user?.sub.name}</span>
                <span>посада: {ordersData?.user.role ?? user._user?.sub?.role}</span>
                <span>
                    Сума замовлення: {orderSum ? orderSum : orderDataSum}
                </span>
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

export default AdminModalOrderSup;