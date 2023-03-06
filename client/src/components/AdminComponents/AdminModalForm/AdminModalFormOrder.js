import React, {useMemo, useReducer, useState, useCallback} from 'react';
import '../../../css/AdminComponentCss/AdminModalFormCss/AdminFormOrder.css';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import ModalAdmin from '../../Modal/ModalAdmin';
import AdminComment from '../AdminContent/AdminComment';
import AdminModalCustmCreate from './AdminModalCustmCreate';
import AdminModalCustomers from './AdminModalCustomers';
import AdminModalGoods from './AdminModalGoods';

function reducer (state = [], action, initialState) {
    switch (action.type) {
      
        case 'addTyreToOrder': {
            if (action.addTyre) {
                state.push({...action.addTyre, 
                    "price":{...action.addTyre.price[action.indexPrice],
                       "quantity": "4"},  
                });
            }
            return state;
        }

        case 'addWheelToOrder': {
            if (action.addWheel) {
                state.push({...action.addWheel, 
                    "price":{...action.addTyre.price[action.indexPrice],
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


const AdminFormOrder = ({props, goodsId, comments, customer, setActive}) => {
    const [tyreDatas, wheelDatas] = props;
    const {register, handleSubmit, formState: {errors}} = useForm();
    const [orderId, setOrderId] = useState(null);
    const [addGoods, setAddGoods] = useState(false);
    const [createCustomer, setCreateCustomer] = useState(false);
    const [openCustomers, setOpenCustomers] = useState(false);
    const [addCustomer, setAddCustomer] = useState(null);
    //const [priceIndex, setPriceIndex] = useState(0);
    //let defaultQuantity = useRef(null);
    //const [quantity, setQuantity] = useState('4');
    //const [priceItem, setPriceItem] = useState(null);
    // const [quantityItem, setQuantytiItem] = useState('4');
    // const [answer, setAnswer] = useState('');
    // const [error, setError] = useState(null);
    // const [status, setStatus] = useState('typing');
    //const [goodsList, setGoodsList] = useState([]);
    //const [addItems, setAddItems] = useState();
    //const [changeCustomer, setChangeCustomer] = useState();
    const [state, dispatch] = useReducer(reducer, goodsId, createInitialState);
    const [stateData, setStateData] = useState(state);
     
    function createInitialState (goodsId) {
            
        let initialState = [];

        if (goodsId) {
            initialState.push(goodsId);
            //setPriceItem(goodsId.price[0].price);
            //console.log(initialState); 
        }
           
        return initialState;
            
    };

    // const onChangeQuantity = () => {

    //     console.log('quantity', defaultQuantity.current);

    //     defaultQuantity = defaultQuantity.current;
        
    // }

    const onChangeInput = useCallback((e, id, indexItem) => {

        let {name, value} = e.target;
        //console.log('INPUT', ref.current)
        // console.log('name', name);
         console.log('valueINPUT', value);
        // console.log('ITEM Id', id);
            setStateData(editStateData => 
                editStateData.map((item, index) => {
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

        addCustToOrder: (valueCust) => {
            //console.log(valueCust);
            const findCustomer = customer.find(
                (items) => items?.id_customer === +valueCust
            );

            if (findCustomer) {
                setAddCustomer(findCustomer);  
            }

        },

        addGoodsToList: (value) => {
            //let [idValue, indexValue] = value;
            const newArr = value.split(',');
            //console.log('VALUE: ', newArr);
            // console.log('ID', newArr[0]);
            // console.log('INDEX', newArr[1]);
            let [idValue, indexValue] = newArr;
            // console.log('ARR ID', +idValue);
             console.log('ARR INDX', +indexValue);
            //setPriceIndex(+indexValue); 
            
            dispatch({type: 'addTyreToOrder', 
                addTyre: tyreDatas.find((item) => item?.id === idValue),
                indexPrice: indexValue,
                
            });
            dispatch({type: 'addWheelToOrder', 
                addWheel: wheelDatas.find((item) => item?.id === idValue),
                indexPrice: indexValue,
            });
            
        }

    }),[tyreDatas, wheelDatas, customer])

    
    //useEffect(() => {
        const deleteItem = (itemIndex) => {
        
           //dispatch({type: 'deleteItemFromOrder', 
           
            stateData.splice(itemIndex, 1);
           
           state.splice(itemIndex, 1);
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
        const onSubmit = async (data) => {
            //e.preventDefault();
            await responseForm(data);

            if (stateData.length !== 0) {
                stateData.map((item) => (
                createGoodsToOrder(item)
                ));
            }
           // console.log('SEND DATA', data);
        };
        
    // useEffect(() => {
        
     const responseForm = async (data) => { 
        await axios.post('http://localhost:4000/orders', data, {
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'Access-Control-Allow-Origin': 'http://localhost:3000'
            },
            withCredentials: true,
            // data: {
            //     order_view: {},
            //     status: 'Новий',
            //     delivery: 'Flintstone',
            //     status_delivery: 'Novij',
            //     delivery_ttn:'',
            //     pay_view: '',
            //     status_pay: '',
            //     notes: '',
            //     id_user:'',
            //     id_customer:'',
            //     id_contract:'',
            //     id_basket:'',
            //     order_storage: state,
            // }
            //photo: document.querySelector('#fileInput').files
            })
            .then(response => {
            //setOrderAllData(response.data);
            setOrderId(+response.data.id_order);
            alert(`Заказ створено, id ${response.data.id_order}`);
            console.log('Order id: ', response.data);
            })
            .catch(error => {
                console.log(error);
            }
        )
    }

    const createGoodsToOrder = async (item) => { 
        await axios.post('http://localhost:4000/orders/creategoods',
            {
                id: +item.id,
                full_name: item.full_name,
                category: item.category.category,
                order_index: +orderId,
                id_supplier: +item.stock[0].id_supplier,
                storage_index: +item.stock[0].id_storage,
                quantity: +item.price.quantity,
                price: +item.price.price,
                // delivery: 'Flintstone',
                // status_delivery: 'Novij',
                // delivery_ttn:'',
                // pay_view: '',
                // status_pay: '',
                // notes: '',
                //id_user:'',
                //id_customer:'',
                //id_contract:'',
                //id_basket:'',
                //order_storage: state,
            },{headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'Access-Control-Allow-Origin': 'http://localhost:3000'
            }
            }, {
                withCredentials: true,  
            },
            )
            .then(response => {
            //setOrderAllData(response.data);
            console.log('Order_storage',response.data);
            })
            .catch(error => {
                console.log(error)
            }
        )
    }
        

    
    
    //)

    console.log('STATE: ', state);
    //console.log('GOODSID', goodsId);
    //console.log('CUSTOMER', customer);
    //console.log('TYRE DATAS: ', tyreDatas);
    console.log(errors);
    //console.log(priceIndex);
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
                        <select className="admFormOrderOrganiz" name="organisation"
                            {...register('organisation',)}>
                            <option value="1">ФОП Гайворонський</option>
                            <option value="2">фл Гайворонський Н. М</option>
                            <option value="3">ТОВ Скай-Партс</option>
                        </select>  
                    </div>
                    <div>
                        <label htmlFor="storage">Склад </label>
                        <select className="admFormOrderStorage" name="storage"
                            {...register('storage', {required: 'Це необхідні дані'})}
                            >
                            <option value="1">Склад Поставщик</option>
                            <option value="2">Склад Основний</option>
                            <option value="3">Склад Монтаж</option>
                        </select>  
                    </div>
                    <div>
                        <label htmlFor="orderView">Вид </label>
                        <select className="admFormOrderView" name="order_view"
                            {...register('order_view', {required: 'Це необхідні дані'})}
                            >
                            <option value="Сайт">Сайт</option>
                            <option value="Роздріб">Роздріб</option>
                            <option value="Опт">Опт</option>
                            <option value="Інше">Інше</option>
                        </select>  
                    </div>
                    <div>
                        <label htmlFor="statusOrder">Статус </label>
                        <select className="admFormOrderStatus" name="status_order"
                            {...register('status', {required: 'Це необхідні дані'})}
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
                                //defaultValue={addCustomer ?? ''}
                                value={addCustomer?.full_name ?? ''}
                                autoFocus={true}
                                //onFocus={e=>e.target.value}
                                //readOnly={true}
                                {...register('customer',)}
                                onChange={() => setAddCustomer(addCustomer)}
                            />
                            <div onClick={(e)=>e.preventDefault({passive: false})}>
                                <button onClick={openCustomerForm} className='admFormSearchCustm'>
                                    <i className="fas fa-search"></i>    
                                </button> 
                            </div>
                            <div onClick={(e)=>e.preventDefault({passive: false})}>
                                <button onClick={activeCustomer}
                                    className='admFormAddCustm'>
                                    <i className="fas fa-plus"></i>    
                                </button>  
                            </div>         
                        </div>    
                    </div>
                    <div>
                        <label htmlFor="fname"> Контракт </label>
                        <select className="admFormOrderContract" name="contract"
                            {...register('id_contract', )}>
                           {addCustomer ? addCustomer.contract.map((entity, index)=>(
                                <option key={'contract' + index} value={+entity.id_contract}>
                                    {entity.name} {entity.id_contract} 
                                </option>
                                
                                )) : <option></option>
                            } 
                        </select>
                    </div>

                    <div>
                        <label htmlFor="pereviznik">Перевізник </label>
                        <select className="admFormOrderDelivery" name="delivery"
                            {...register('delivery', {required: 'Це необхідні дані'})}>
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
                            name="delivery_ttn" 
                            maxLength='45'
                            placeholder="ТТН замовлення.."
                            {...register('delivery_ttn')}
                        />  
                    </div>
                    <div>
                        <label htmlFor="status">Статус дост </label>
                        <select className="admFormOrderStatusDel" name="status_delivery"
                            {...register('status_delivery', {required: 'Це необхідні дані'})}>
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
                    <div onClick={(e)=>e.preventDefault({passive: false})}>
                        <button onClick={addGoodsForm} className='admFormOrderBtnAdd'>Додати товар</button>  
                    </div>
                    <div>
                        <label htmlFor="pay_view">Вид оплати </label>
                        <select className="admFormOrderViewPay" name="pay_view"
                            {...register('pay_view', {required: 'Це необхідні дані'})}>
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
                        <select className="admFormOrderStatusPay" name="status_pay"
                        {...register('status_pay', {required: 'Це необхідні дані'})}>
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
                                {id, full_name, category, price}, index) =>(
                        <tr key={id + index} 
                        //onChange={(e)=>e.preventDefault({passive: false})}
                            >
                            <td >{id}</td>
                            <td >{full_name}</td>
                            <td >{category?.category}</td>
                            <td key={'quantity' + id + index} 
                                //onInput={(e)=>e.preventDefault({passive: false})}
                                onInput={(e) => e.stopPropagation()}
                                >
                                <input 
                                //id="quantiti"
                                id={'quantity'+ id}
                                key={'quantity'+ id + index}
                                //ref={defaultQuantity}
                                type="text"
                                name="quantity"
                                value={price?.quantity}
                                onInput={(e) => onChangeInput(e, id, index)}
                                placeholder="Введіть цифри"
                                //onChange={e => setQuantytiItem(e.target.value)}
                                //{...register('quantity')}
                                />
                            </td>
                            <td >{index}</td>
                            <td 
                                key={'price' + id + index} 
                                onInput={(e) => e.stopPropagation()}
                                >
                                <input 
                                id={id}
                                key={'price' + id + index}
                                type="text"
                                name="price"
                                value={price?.price}
                                onInput={(e) => onChangeInput(e, id, index)}
                                placeholder="Введіть цифри" 
                                //{...register('price')}
                                />
                           
                            </td>
                            <td >
                                <select className="admFormOrderStorage" name="storage_index"
                                    {...register('storage_index', {required: 'Це необхідні дані'})}>
                                    <option value="1">Склад Поставщик</option>
                                    <option value="2">Склад Основний</option>
                                    <option value="3">Склад Монтаж</option>
                                </select>  
                            </td> 
                            <td 
                            //onClick={(e)=>e.preventDefault({passive: false})}
                            onClick={(e) => e.stopPropagation()}
                            >
                                <button className='closeAdmGoods' 
                                    key={'deleteBtn' + id}
                                    value={index}
                                    onClick={e => deleteItem(e.currentTarget.value)}>
                                    <i className="fa fa-remove"></i>
                                </button>
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
                    <textarea className="admFormOrderNotesText" name="notes" 
                        {...register('notes')}
                        placeholder="Пишить нотатку..">
                    </textarea>  
                </div>
                <div className='admFormOrderCommit'
                    onClick={(e)=>e.preventDefault({passive: false})}>
                    <div className='admFormOrderAddCommit'>
                    <button onClick={() => console.log('Add Commit')} 
                        className='admFormOrderBtnAdd'>Додати коментар
                    </button>
                        <textarea  name="subject" className='admOrderCommitText'
                        placeholder="Пишить коментар.."></textarea>
                    </div>
                    <div className='admFormOrderCommitChat'>
                        <AdminComment>

                        </AdminComment>
                    </div>  
                </div>
                <div className='admOrderFormGrp' onClick={(e)=>e.preventDefault({passive: false})}>
                    <button className='admFormOrderBtnOk'>Ok</button>
                    <button className='admFormOrderBtnSave' onClick={handleSubmit(onSubmit)}>Зберегти</button>
                    <button className='admFormOrderBtn' onClick={setActive}>Відмінити</button> 
                </div>
            </form>
        </div>
            {openCustomers ?
                <ModalAdmin active={openCustomers} setActive={setOpenCustomers} >
                    <AdminModalCustomers allCustomer={customer}
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
                    />
                </ModalAdmin> : null
            }
        </div>
    );
};

export default AdminFormOrder;