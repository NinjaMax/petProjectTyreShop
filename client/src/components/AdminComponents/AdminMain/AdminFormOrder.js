import React from 'react';
import '../../../css/AdminComponentCss/AdminFormCss/AdminFormOrder.css';
import Modal from '../../Modal/Modal';

const AdminFormOrder = () => {
    return (
        <div>
            Замовлення Покупця
            <div class="container">
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
                        <label htmlFor="lname">Покупець </label>
                        <div className='admFormOrderCustm'>
                        
                        
                        <input type="text" 
                            className="admFormOrderName" 
                            name="lastname" 
                            maxLength='45'
                            placeholder="Ім'я або назва.."
                        />
                            <button className='admFormSearchCustm'>
                                <i className="fas fa-search"></i>    
                            </button>
                            <button className='admFormAddCustm'>
                                <i className="fas fa-plus"></i>    
                            </button>   
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
                        <label htmlFor="sklad">Склад </label>
                            <select className="admFormOrderStorage" name="Pereviznik">
                            <option value="1">Склад Поставщик</option>
                            <option value="2">Склад Основний</option>
                            <option value="3">Склад Монтаж</option>
                        </select>  
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
                <table className='admFormOrderTable'>
                    <thead>
                        <tr>
                            <th>id</th>
                            <th>товар</th>
                            <th>категорія</th>
                            <th>кількість</th>
                            <th>склад</th>
                        </tr>     
                    </thead>
                    <tbody>
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td> 
                        </tr>
                    </tbody>
                </table>
                <label htmlFor="subject">Нотатки</label>
                <textarea className="admFormOrderNotes" name="subject" 
                    placeholder="Пишить нотатку..">
                </textarea>
                <div className='admOrderFormGrp'>
                    <input type="submit" value="Ok"/>
                    <input type="submit" className='admSubmitCancel' value="Зберегти"/>
                    <button className='admFormOrderBtn'>Відмінити</button> 
                </div>
            
            </form>
            </div>
            <Modal></Modal>
        </div>
    );
};

export default AdminFormOrder;