import React from 'react';
import '../../../css/AdminComponentCss/AdminModalFormCss/AdminModalPayIncome.css';

const AdminModalPayIncome = () => {
    return (
        <div>
            Створити вхідний платіж
            <div className="containerAdmPayIncomeForm">
            <form action="">
                <div className='admFormDataPayIncome'>
                    <div>
                        <label htmlFor="fname">id </label>
                        <input type="text" 
                            className="admFormPayIncomeId" 
                            name="firstname" 
                            maxLength='45'
                            placeholder="Контракт покупця.."
                        />  
                    </div>
                    <div>
                        <label htmlFor="sklad">Тип платежу </label>
                            <select className="admFormPayIncomeStorage" name="Pereviznik">
                            <option value="1">Оплата покупця</option>
                            <option value="2">Внесення готівки в касу</option>
                            <option value="2">Внесення безготівки на рахунок</option>
                        </select>  
                    </div>
                    <div>
                        <label htmlFor="pereviznik">Форма платежу </label>
                            <select className="admFormPayIncomeDelivery" name="Pereviznik">
                            <option value="NovaPoshta">Готівкова</option>
                            <option value="UkrPoshta">Безготівкова</option>
                        </select>    
                    </div>
                    <div>
                        <label htmlFor="pereviznik">Організація </label>
                            <select className="admFormPayIncomeDelivery" name="Pereviznik">
                            <option value="NovaPoshta">ЧП Гайворонський Н.Н</option>
                            <option value="UkrPoshta">ТОВ ЮНІТІГРАНД-СОЛЮШН</option>
                        </select>    
                    </div>
                    <label htmlFor="lname">Заказ покупця </label>
                            <input type="text" 
                                className="admPayIncomeName" 
                                name="lastname" 
                                maxLength='45'
                                placeholder="номер заказу покупця"
                            />
                            <div onClick={(e)=>e.preventDefault({passive: false})}>
                                <button  className='admPayIncomeSearchCustm'>
                                    <i className="fas fa-search"></i>    
                                </button> 
                            </div>
                    <div>
                        <label htmlFor="fname">Сума </label>
                        <input type="text" 
                            className="admFormPayIncomeId" 
                            name="firstname" 
                            maxLength='45'
                            placeholder="введіть сумму.."
                        />  
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