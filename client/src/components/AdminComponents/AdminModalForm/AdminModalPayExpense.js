import React from 'react';
import '../../../css/AdminComponentCss/AdminModalFormCss/AdminModalPayExpense.css';

const AdminModalPayExpense = () => {
    return (
        <div>
            Створити вихідний платіж
            <div className="containerAdmPayExpenseForm">
            <form action="">
                <div className='admFormDataPayExpense'>
                    <div >
                        <div className='admFormPayExpenseCustm'>
                            <label htmlFor="lname">І'мя або Назва </label>
                            <input type="text" 
                                className="admFormPayExpenseName" 
                                name="lastname" 
                                maxLength='45'
                                placeholder="Ім'я або назва.."
                            />        
                        </div>    
                    </div>
                    <div>
                        <label htmlFor="fname">Повне ім'я / назва </label>
                        <input type="text" 
                            className="admFormPayExpenseId" 
                            name="firstname" 
                            maxLength='45'
                            placeholder="Контракт покупця.."
                        />  
                    </div>
                    <div>
                        <label htmlFor="fname">телефон </label>
                        <input type="text" 
                            className="admFormPayExpenseId" 
                            name="firstname" 
                            maxLength='45'
                            placeholder="Контракт покупця.."
                        />  
                    </div>
                    <div>
                        <label htmlFor="fname">email </label>
                        <input type="text" 
                            className="admFormPayExpenseId" 
                            name="firstname" 
                            maxLength='45'
                            placeholder="Контракт покупця.."
                        />  
                    </div>
                    <div>
                        <label htmlFor="fname">Адреса </label>
                        <input type="text" 
                            className="admFormPayExpenseId" 
                            name="firstname" 
                            maxLength='45'
                            placeholder="Контракт покупця.."
                        />  
                    </div>
                    <div>
                        <label htmlFor="sklad">Роль </label>
                            <select className="admFormPayExpenseStorage" name="Pereviznik">
                            <option value="1">Покупець</option>
                            <option value="2">Покупець Оптовий</option>
                        </select>  
                    </div>
                    <div>
                        <label htmlFor="pereviznik">Перевізник </label>
                            <select className="admFormPayExpenseDelivery" name="Pereviznik">
                            <option value="NovaPoshta">Нова Пошта</option>
                            <option value="UkrPoshta">Укр Пошта</option>
                            <option value="Delivary">Делівері</option>
                        </select>    
                    </div>   
                </div>
                <label htmlFor="subject">Нотатки</label>
                <textarea className="admFormPayExpenseNotes" name="subject" 
                    placeholder="Пишить нотатку..">
                </textarea>
                <div className='admFormPayExpenseCommit'
                    onClick={(e)=>e.preventDefault({passive: false})}>
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