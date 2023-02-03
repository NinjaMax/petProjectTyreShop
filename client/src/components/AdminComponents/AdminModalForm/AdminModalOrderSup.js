import React from 'react';
import '../../../css/AdminComponentCss/AdminModalFormCss/AdminModalOrderSup.css';
import AdminComment from '../AdminContent/AdminComment';

const AdminModalOrderSup = () => {
    return (
        
            <div>
            Замовлення Постачальника
            <div className="containerAdmOrderSupForm">
            <form action="">
                <div className='admFormDataOrderSup'>
                    <div>
                        <label htmlFor="fname">Дата</label>
                        <input type="date" 
                            className="admFormOrderSupData" 
                            name="date" 
                            min="2023-01-01"    
                        />  
                    </div>
                    <div>
                        <label htmlFor="fname">id </label>
                        <input type="text" 
                            className="admFormOrderSupId" 
                            name="firstname" 
                            maxLength='30'
                            placeholder="Ид.."
                        />  
                    </div>
                    <div >
                        <div className='admFormOrderSupCustm'>
                            <label htmlFor="lname">Поcтачальник </label>
                            <input type="text" 
                                className="admFormOrderSupName" 
                                name="lastname" 
                                maxLength='45'
                                placeholder="Ім'я або назва.."
                            />
                            <div onClick={(e)=>e.preventDefault({passive: false})}>
                                <button onClick={'activeForm'} className='admFormSearchCustm'>
                                    <i className="fas fa-search"></i>    
                                </button> 
                            </div>
                            <div onClick={(e)=>e.preventDefault({passive: false})}>
                                <button onClick={'addCustomerForm'}
                                    className='admFormAddCustm'>
                                    <i className="fas fa-plus"></i>    
                                </button>  
                            </div>         
                        </div>    
                    </div>
                    <div>
                        <label htmlFor="fname">Контракт </label>
                        <input type="text" 
                            className="admFormOrderSupId" 
                            name="firstname" 
                            maxLength='45'
                            placeholder="Контракт покупця.."
                        />  
                    </div>
                    <div>
                        <label htmlFor="sklad">Склад </label>
                            <select className="admFormOrderSupStorage" name="Pereviznik">
                            <option value="1">Склад Поставщик</option>
                            <option value="2">Склад Основний</option>
                            <option value="3">Склад Монтаж</option>
                        </select>  
                    </div>
                    <div onClick={(e)=>e.preventDefault({passive: false})}>
                        <button onClick={'addGoodsForm'} className='admFormOrderSupBtnAdd'>Додати товар</button>  
                    </div>
                    <div>
                        <label htmlFor="pereviznik">Перевізник </label>
                            <select className="admFormOrderSupDelivery" name="Pereviznik">
                            <option value="NovaPoshta">Нова Пошта</option>
                            <option value="UkrPoshta">Укр Пошта</option>
                            <option value="Delivary">Делівері</option>
                        </select>    
                    </div>
                    <div>
                        <label htmlFor="status">Статус </label>
                            <select className="admFormOrderSupStatus" name="Status">
                            <option value="Novi">Новий</option>
                            <option value="Prodaga">Продаж</option>
                            <option value="Oplata">Очік Оплати</option>
                        </select>    
                    </div>    
                </div>
                <table className='admFormOrderSupTable'>
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
                <textarea className="admFormOrderSupNotes" name="subject" 
                    placeholder="Пишить нотатку..">
                </textarea>
                <div className='admFormOrderSupCommit'
                    onClick={(e)=>e.preventDefault({passive: false})}>
                    <div className='admFormOrderSupAddCommit'>
                    <button onClick={() => console.log('Add Commit')} 
                        className='admFormOrderSupBtnAdd'>Додати коментар
                    </button>
                        <textarea  name="subject" className='admOrderSupCommitText'
                        placeholder="Пишить коментар.."></textarea>
                    </div>
                    <div className='admFormOrderSupCommitChat'>
                        <AdminComment>

                        </AdminComment>
                    </div>  
                </div>
                <div className='admOrderSupFormGrp'>
                    <input type="submit" className='admFormOrderSupBtnOk' value="Ok"/>
                    <input type="submit" className='admFormOrderSupBtnSave' value="Зберегти"/>
                    <button className='admFormOrderSupBtn'>Відмінити</button> 
                </div>
            </form>
            </div>
        </div>
        
    );
};

export default AdminModalOrderSup;