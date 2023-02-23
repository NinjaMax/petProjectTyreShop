import React, {useMemo, useReducer, useState} from 'react';
import '../../../css/AdminComponentCss/AdminModalFormCss/AdminFormOrder.css';
import ModalAdmin from '../../Modal/ModalAdmin';
import AdminComment from '../AdminContent/AdminComment';
import AdminModalCustmCreate from './AdminModalCustmCreate';
import AdminModalCustomers from './AdminModalCustomers';
import AdminModalGoods from './AdminModalGoods';

function reducer(state = [], action, initialState) {
    switch (action.type) {
      
        case 'addTyreToOrder': {
            if(action.addTyre) {
              state.push(action.addTyre)  
            }

            return state;
        }

        case 'addWheelToOrder': {
            if(action.addWheel) {
               state.push(action.addWheel); 
            }
            
            return state;
        }

        default: {
            throw Error('Unknown action: ' + action.type);
        } 
    }
    
}

const AdminFormOrder = ({goodsId, tyreDatas, wheelDatas, comments, customer}) => {
    
    const [addGoods, setAddGoods] = useState(false);
    const [createCustomer, setCreateCustomer] = useState(false);
    const [openCustomers, setOpenCustomers] = useState(false);
    const [addCustomer, setAddCustomer] = useState(null);
    //const [goodsList, setGoodsList] = useState([]);
    //const [addItems, setAddItems] = useState();
    //const [changeCustomer, setChangeCustomer] = useState();
    const [state, dispatch] = useReducer(reducer, goodsId, createInitialState);
     
    function createInitialState (goodsId) {
            
        let initialState = [];

        if(goodsId) {
            initialState.push(goodsId);
            //console.log(initialState); 
        }
           
        return initialState;
            
    };
    
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
            const findCustomer = customer.find((items) => items?.id_customer === +valueCust);

            if(findCustomer) {
                setAddCustomer(findCustomer);  
            }

        },

        addGoodsToList: (value) => {

            dispatch({type: 'addTyreToOrder', addTyre: tyreDatas.find((item) => item?.id === value)});
            dispatch({type: 'addWheelToOrder', addWheel: wheelDatas.find((item) => item?.id === value)});
        }

    }),[tyreDatas, wheelDatas, customer])
    //console.log('STATE: ', state);
    //console.log('GOODSID', goodsId);
    //console.log('CUSTOMER', customer);

    return (
        <div>
            Замовлення Покупця
            <div className="containerAdmOrderForm">
            <form action="">
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
                        <input type="text" 
                            className="admFormOrderId" 
                            name="firstname"
                            value={'12345678910' ?? ''} 
                            //maxLength='30'
                            placeholder="id замовлення"
                            readOnly={true}
                        />  
                    </div>
                    <div>
                        <label htmlFor="sklad">Організація </label>
                            <select className="admFormOrderOrganiz" name="Organization">
                            <option value="1">ФОП Гайворонський</option>
                            <option value="2">фл Гайворонський Н. М</option>
                            <option value="3">ТОВ Скай-Партс</option>
                        </select>  
                    </div>
                    <div>
                        <label htmlFor="sklad">Склад </label>
                            <select className="admFormOrderStorage" name="Storage">
                            <option value="1">Склад Поставщик</option>
                            <option value="2">Склад Основний</option>
                            <option value="3">Склад Монтаж</option>
                        </select>  
                    </div>
                    <div>
                        <label htmlFor="OrderView">Вид </label>
                            <select className="admFormOrderView" name="OrderView">
                            <option value="1">Сайт</option>
                            <option value="2">Роздріб</option>
                            <option value="2">Опт</option>
                            <option value="3">Інше</option>
                        </select>  
                    </div>
                    <div>
                        <label htmlFor="status">Статус </label>
                            <select className="admFormOrderStatus" name="Status Order">
                            <option value="Novi">Новий</option>
                            <option value="Prodaga">Продаж</option>
                            <option value="Oplata">Обробка</option>
                            <option value="Oplata">Виконання</option>
                            <option value="Oplata">Відміна</option>
                            <option value="Oplata">Повернення</option>
                        </select>    
                    </div>
                    <div>
                        <div className='admFormOrderCustm'>
                            <label htmlFor="lname">Покупець </label>
                            <input type="text" 
                                className="admFormOrderName" 
                                name="lastname" 
                                maxLength='45'
                                placeholder="Ім'я або назва.."
                                //defaultValue={addCustomer ?? ''}
                                value={addCustomer?.full_name ?? ''}
                                //readOnly={true}
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
                        <select className="admFormOrderContract" name="Contract">
                           {addCustomer ? addCustomer.contract.map((entity, index)=>(
                                <option key={'contr' + index} value={'id '+ entity.id}>
                                     {entity.name} {entity.id_contract} 
                                </option>
                                
                                )) : <option></option>
                            } 
                        </select>
                    </div>

                    <div>
                        <label htmlFor="pereviznik">Перевізник </label>
                            <select className="admFormOrderDelivery" name="Delivery">
                            <option value="Samoviviz">Самовивіз</option>
                            <option value="SvoiDostavka">Своя Доставка</option>
                            <option value="NovaPoshta">Нова Пошта</option>
                            <option value="UkrPoshta">Укр Пошта</option>
                            <option value="Delivary">Делівері</option>
                        </select>    
                    </div>
                    <div>
                        <label htmlFor="fname">ТТН </label>
                        <input type="text" 
                            className="admFormOrderTtn" 
                            name="firstname" 
                            maxLength='45'
                            placeholder="ТТН замовлення.."
                        />  
                    </div>
                    <div>
                        <label htmlFor="status">Статус дост </label>
                        <select className="admFormOrderStatusDel" name="StatusDel">
                            <option value="Novi">Новий</option>
                            <option value="Samoviviz">Самовивіз</option>
                            <option value="Obrobka">Обробляеться</option>
                            <option value="OchikueTtn">Очікує ТТН</option>
                            <option value="Dostavka">Доставляеться</option>
                            <option value="Ttn">Отримано ТТН</option>
                            <option value="PoverneiaTtn">Повернення ТТН</option>
                            <option value="CancelDelivery">Відміна</option>
                        </select>    
                    </div>
                    <div onClick={(e)=>e.preventDefault({passive: false})}>
                        <button onClick={addGoodsForm} className='admFormOrderBtnAdd'>Додати товар</button>  
                    </div>
                    <div>
                        <label htmlFor="viewPay">Вид оплати </label>
                        <select className="admFormOrderViewPay" name="viewPay">
                            <option value="Novi">Новий</option>
                            <option value="cashPay">Готівка</option>
                            <option value="billPay">Б/г рахунок</option>
                            <option value="billPayCard">Б/г карта</option>
                            <option value="nalogka">Наложка</option>
                            <option value="Oplata">Відміна</option>
                            <option value="OplataPov">Повернення</option>
                        </select>    
                    </div>
                    <div>
                    <label htmlFor="statusPay">Статус оплати </label>
                        <select className="admFormOrderStatusPay" name="statusPay">
                        <option value="Novi">Новий</option>
                        <option value="WaitPay">Очікує Оплату</option>
                        <option value="Oplata">Оплачено</option>
                        <option value="Oplata">Виконання</option>
                        <option value="Oplata">Відміна</option>
                        <option value="OplataPov">Повернення</option>
                        <option value="NalogPay">Наложка Отримана</option>
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
                        </tr>     
                    </thead>
                    <tbody>
                        {state?.lenght !== 0 ? 
                            state.map((item) =>(
                        <tr key={'g'+ item.id}>
                            <td key={'gid'+ item.id}>{item?.id}</td>
                            <td key={'gg'+ item.id}>{item?.full_name}</td>
                            <td key={'gcat'+ item.id}>{item.category?.category}</td>
                            <td key={'gc'+ item.id}>{0}</td>
                            <td key={'gres'+ item.id}>{0}</td>
                            <td key={'gpr'+ item.id}>{item.price[0]?.price}</td>
                            <td key={'gst'+ item.id}>{item?.storage}</td> 
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
                    <label htmlFor="subject">Нотатки</label>
                    <textarea className="admFormOrderNotesText" name="subject" 
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
                    <input type="submit" className='admFormOrderBtnOk' value="Ok"/>
                    <input type="submit" className='admFormOrderBtnSave' value="Зберегти"/>
                    <button className='admFormOrderBtn'>Відмінити</button> 
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
                        tyreModData={tyreDatas} 
                        wheelModData={wheelDatas}/>
                </ModalAdmin> : null
            }
        </div>
    );
};

export default AdminFormOrder;