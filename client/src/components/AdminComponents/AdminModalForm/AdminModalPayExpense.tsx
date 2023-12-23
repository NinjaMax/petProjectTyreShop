import React from 'react';
import '../../../css/AdminComponentCss/AdminModalFormCss/AdminModalPayExpense.css';
import { PayModal } from './types/PayModal.types';

const AdminModalPayExpense = ({payViews, payTypes, paynmentData}: PayModal) => {
    return (
        <div>
            Створити вихідний платіж
            <div className="containerAdmPayExpenseForm">
            <form action="">
                <div className='admFormDataPayExpense'>
                    <div>
                        <label htmlFor="fname">id </label>
                        <input type="text" 
                            className="admFormPayExpenseId" 
                            name="firstname" 
                            maxLength={45}
                            placeholder="Контракт покупця.."
                        />  
                    </div>
                    <div>
                        <label htmlFor="sklad">Тип платежу </label>
                            <select className="admFormPayExpenseStorage" name="Pereviznik">
                            <option value="1">Оплата постачальнику</option>
                            <option value="2">Зарплата</option>
                            <option value="3">Витрати по фірмі</option>
                            <option value="4">Повернення коштів покупцю</option>
                            <option value="4">Зарплата</option>
                        </select>  
                    </div>
                    <div>
                        <label htmlFor="sklad">Форма платежу</label>
                            <select className="admFormPayExpenseStorage" name="Pereviznik">
                            <option value="1">Готівковий</option>
                            <option value="2">Безготівковий</option>
                        </select>  
                    </div>
                    <div>
                        <label htmlFor="pereviznik">Організація </label>
                            <select className="admFormPayExpenseDelivery" name="Pereviznik">
                            <option value="NovaPoshta">ЧП Гайворонський Н.Н</option>
                            <option value="UkrPoshta">ТОВ Юітігранд-солюшнз</option>
                        </select>    
                    </div>   
                </div>
                <label htmlFor="lname">Заказ покупця </label>
                            <input type="text" 
                                className="admPayIncomeName" 
                                name="lastname" 
                                maxLength={45}
                                placeholder="номер заказу покупця"
                            />
                            <div onClick={(e)=>e.preventDefault()}>
                                <button  className='admPayIncomeSearchCustm'>
                                    <i className="fas fa-search"></i>    
                                </button> 
                            </div>
                    <div>
                        <label htmlFor="fname">Сума </label>
                        <input type="text" 
                            className="admFormPayExpenseId" 
                            name="firstname" 
                            maxLength={45}
                            placeholder="Контракт покупця.."
                        />  
                    </div>
                <label htmlFor="subject">Нотатки</label>
                <textarea className="admFormPayExpenseNotes" name="subject" 
                    placeholder="Пишить нотатку..">
                </textarea>
                <div className='admFormPayExpenseCommit'
                    onClick={(e)=>e.preventDefault()}>
                    <div className='admFormPayExpenseAddCommit'>
                    <button onClick={() => console.log('Add Commit')} 
                        className='admFormPayExpenseBtnAdd'>Додати коментар
                    </button>
                        <textarea  name="subject" className='admPayExpenseCommitText'
                        placeholder="Пишить коментар.."></textarea>
                    </div>
                    <div className='admFormPayExpenseCommitChat'>

                    </div>  
                </div>
                <div className='admPayExpenseFormGrp'>
                    <input type="submit" className='admFormPayExpenseBtnOk' value="Ok"/>
                    <input type="submit" className='admFormPayExpenseBtnSave' value="Зберегти"/>
                    <button className='admPayExpenseBtn'>Відмінити</button> 
                </div>
            </form>
            </div>
        </div>
    );
};

export default AdminModalPayExpense;