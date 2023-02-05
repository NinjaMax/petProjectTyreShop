import React from 'react';
import '../../../css/AdminComponentCss/AdminModalFormCss/AdminModalPayIncome.css';

const AdminModalPayIncome = () => {
    return (
        <div>
            Створити вхідний платіж
            <div className="containerAdmPayIncomeForm">
            <form action="">
                <div className='admFormDataPayIncome'>
                    <div >
                        <div className='admFormPayIncomeCustm'>
                            <label htmlFor="lname">І'мя або Назва </label>
                            <input type="text" 
                                className="admFormPayIncomeName" 
                                name="lastname" 
                                maxLength='45'
                                placeholder="Ім'я або назва.."
                            />        
                        </div>    
                    </div>
                    <div>
                        <label htmlFor="fname">Повне ім'я / назва </label>
                        <input type="text" 
                            className="admFormPayIncomeId" 
                            name="firstname" 
                            maxLength='45'
                            placeholder="Контракт покупця.."
                        />  
                    </div>
                    <div>
                        <label htmlFor="fname">телефон </label>
                        <input type="text" 
                            className="admFormPayIncomeId" 
                            name="firstname" 
                            maxLength='45'
                            placeholder="Контракт покупця.."
                        />  
                    </div>
                    <div>
                        <label htmlFor="fname">email </label>
                        <input type="text" 
                            className="admFormPayIncomeId" 
                            name="firstname" 
                            maxLength='45'
                            placeholder="Контракт покупця.."
                        />  
                    </div>
                    <div>
                        <label htmlFor="fname">Адреса </label>
                        <input type="text" 
                            className="admFormPayIncomeId" 
                            name="firstname" 
                            maxLength='45'
                            placeholder="Контракт покупця.."
                        />  
                    </div>
                    <div>
                        <label htmlFor="sklad">Роль </label>
                            <select className="admFormPayIncomeStorage" name="Pereviznik">
                            <option value="1">Покупець</option>
                            <option value="2">Покупець Оптовий</option>
                        </select>  
                    </div>
                    <div>
                        <label htmlFor="pereviznik">Перевізник </label>
                            <select className="admFormPayIncomeDelivery" name="Pereviznik">
                            <option value="NovaPoshta">Нова Пошта</option>
                            <option value="UkrPoshta">Укр Пошта</option>
                            <option value="Delivary">Делівері</option>
                        </select>    
                    </div>   
                </div>
                <label htmlFor="subject">Нотатки</label>
                <textarea className="admFormPayIncomeNotes" name="subject" 
                    placeholder="Пишить нотатку..">
                </textarea>
                <div className='admFormPayIncomeCommit'
                    onClick={(e)=>e.preventDefault({passive: false})}>
                    <div className='admFormPayIncomeAddCommit'>
                    <button onClick={() => console.log('Add Commit')} 
                        className='admFormPayIncomeBtnAdd'>Додати коментар
                    </button>
                        <textarea  name="subject" className='admPayIncomeCommitText'
                        placeholder="Пишить коментар.."></textarea>
                    </div>
                    <div className='admFormPayIncomeCommitChat'>

                    </div>  
                </div>
                <div className='admPayIncomeFormGrp'>
                    <input type="submit" className='admFormPayIncomeBtnOk' value="Ok"/>
                    <input type="submit" className='admFormPayIncomeBtnSave' value="Зберегти"/>
                    <button className='admPayIncomeBtn'>Відмінити</button> 
                </div>
            </form>
            </div>
        </div>
    );
};

export default AdminModalPayIncome;