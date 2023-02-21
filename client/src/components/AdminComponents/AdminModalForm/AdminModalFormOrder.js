import React, {useMemo, useReducer, useState} from 'react';
import '../../../css/AdminComponentCss/AdminModalFormCss/AdminFormOrder.css';
import ModalAdmin from '../../Modal/ModalAdmin';
import AdminComment from '../AdminContent/AdminComment';
import AdminModalCustmCreate from './AdminModalCustmCreate';
import AdminModalCustomers from './AdminModalCustomers';
import AdminModalGoods from './AdminModalGoods';

// function createInitialState(goodsId) {
//     const initialState = [];

//       initialState.push(goodsId);
    
//     return initialState;
//   }

function reducer(state = [], action, initialState) {
    switch (action.type) {
      
        case 'addTyreToOrder': {
            if(action.addTyre) {
              state.push(action.addTyre)  
            }

            return state;
            //break;
        }

        case 'addWheelToOrder': {
            if(action.addWheel) {
               state.push(action.addWheel); 
            }
            
            return state;
            //break;
        }

        default: {
            throw Error('Unknown action: ' + action.type);
        } 
    }
    
}

const AdminFormOrder = ({goodsId, tyreDatas, wheelDatas}) => {
    const [active, setActive] = useState(false);
    const [addGoods, setAddGoods] = useState(false);
    const [addCustomer, setAddCustomer] = useState(false);
    //const [goodsList, setGoodsList] = useState([]);
    //const [addItems, setAddItems] = useState();
    const [state, dispatch] = useReducer(reducer, createInitialState(goodsId));
     
    function createInitialState (goodsId) {
            
        let initialState = [];

        if(goodsId) {
            initialState.push(goodsId);
        }
            
        return initialState;
            
    }
     //useMemo(() =>{ 
      
    //   },[goodsId]);
    //     if(goodsId) {
    //     console.log('FORM: ', goodsId);
        
    //     //setGoodsList([goodsId, ...goodsList]);
    //     dispatch({type:'addGoodsToOrder', addGoods: goodsId})
    //     //setAddItems(goodsId);
    //     }
     
    
    const activeForm = () => {
        setActive(!active);
    }

    const addGoodsForm = () => {
        setAddGoods(!addGoods);
    }

    const addCustomerForm = () => {
        setAddCustomer(!addCustomer);
    }

    const actions = useMemo(() => ({

         addGoodsToList: (value) => {

            dispatch({type: 'addTyreToOrder', addTyre: tyreDatas.find((item) => item?.id === value)});
            dispatch({type: 'addWheelToOrder', addWheel: wheelDatas.find((item) => item?.id === value)});
        }

    }),[tyreDatas, wheelDatas])
    console.log('STATE: ', state);

    return (
        <div>
            Замовлення Покупця
            <div className="containerAdmOrderForm">
            <form action="">
                <div className='admFormDataOrder'>
                    <div>
                        <label htmlFor="fname">Дата</label>
                        <input type="date" 
                            className="admFormOrderData" 
                            name="date" 
                            min="2023-01-01"    
                        />  
                    </div>
                    <div>
                        <label htmlFor="fname">id </label>
                        <input type="text" 
                            className="admFormOrderId" 
                            name="firstname" 
                            maxLength='30'
                            placeholder="Ид.."
                        />  
                    </div>
                    <div >
                        <div className='admFormOrderCustm'>
                            <label htmlFor="lname">Покупець </label>
                            <input type="text" 
                                className="admFormOrderName" 
                                name="lastname" 
                                maxLength='45'
                                placeholder="Ім'я або назва.."
                            />
                            <div onClick={(e)=>e.preventDefault({passive: false})}>
                                <button onClick={activeForm} className='admFormSearchCustm'>
                                    <i className="fas fa-search"></i>    
                                </button> 
                            </div>
                            <div onClick={(e)=>e.preventDefault({passive: false})}>
                                <button onClick={addCustomerForm}
                                    className='admFormAddCustm'>
                                    <i className="fas fa-plus"></i>    
                                </button>  
                            </div>         
                        </div>    
                    </div>
                    <div>
                        <label htmlFor="fname">Контракт </label>
                        <input type="text" 
                            className="admFormOrderId" 
                            name="firstname" 
                            maxLength='45'
                            placeholder="Контракт покупця.."
                        />  
                    </div>
                    <div>
                        <label htmlFor="fname">ТТН </label>
                        <input type="text" 
                            className="admFormOrderId" 
                            name="firstname" 
                            maxLength='45'
                            placeholder="Контракт покупця.."
                        />  
                    </div>
                    <div>
                        <label htmlFor="sklad">Склад </label>
                            <select className="admFormOrderStorage" name="Pereviznik">
                            <option value="1">Склад Поставщик</option>
                            <option value="2">Склад Основний</option>
                            <option value="3">Склад Монтаж</option>
                        </select>  
                    </div>
                    <div onClick={(e)=>e.preventDefault({passive: false})}>
                        <button onClick={addGoodsForm} className='admFormOrderBtnAdd'>Додати товар</button>  
                    </div>
                    <div>
                        <label htmlFor="pereviznik">Перевізник </label>
                            <select className="admFormOrderDelivery" name="Pereviznik">
                            <option value="NovaPoshta">Нова Пошта</option>
                            <option value="UkrPoshta">Укр Пошта</option>
                            <option value="Delivary">Делівері</option>
                        </select>    
                    </div>
                    <div>
                        <label htmlFor="status">Статус </label>
                            <select className="admFormOrderStatus" name="Status">
                            <option value="Novi">Новий</option>
                            <option value="Prodaga">Продаж</option>
                            <option value="Oplata">Очік Оплати</option>
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
                            <td key={'gcat'+ item.id}>{item?.category.category}</td>
                            <td key={'gc'+ item.id}>{0}</td>
                            <td key={'gres'+ item.id}>{0}</td>
                            <td key={'gpr'+ item.id}>{item.price?.price}</td>
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
            {active ?
                <ModalAdmin active={active} setActive={setActive} >
                    <AdminModalCustomers/>
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
            {addCustomer ?
                <ModalAdmin active={addCustomer} setActive={setAddCustomer}>
                    <AdminModalCustmCreate/>   
                </ModalAdmin> : null
            }
        </div>
    );
};

export default AdminFormOrder;