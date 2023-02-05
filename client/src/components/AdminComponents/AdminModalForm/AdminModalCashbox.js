import React from 'react';
import '../../../css/AdminComponentCss/AdminModalFormCss/AdminModalCashbox.css';

const AdminModalCashbox = () => {
    return (
        <div>
        Створити касу
        <div className="containerAdmCashBoxForm">
        <form action="">
            <div className='admFormDataCashBox'>
                <div >
                    <div className='admFormCashBoxCustm'>
                        <label htmlFor="lname">І'мя або Назва </label>
                        <input type="text" 
                            className="admFormCashBoxName" 
                            name="lastname" 
                            maxLength='45'
                            placeholder="Ім'я або назва.."
                        />        
                    </div>    
                </div>
                <div>
                    <label htmlFor="fname">Повне ім'я / назва </label>
                    <input type="text" 
                        className="admFormCashBoxId" 
                        name="firstname" 
                        maxLength='45'
                        placeholder="Контракт покупця.."
                    />  
                </div>
                <div>
                    <label htmlFor="fname">телефон </label>
                    <input type="text" 
                        className="admFormCashBoxId" 
                        name="firstname" 
                        maxLength='45'
                        placeholder="Контракт покупця.."
                    />  
                </div>
                <div>
                    <label htmlFor="fname">email </label>
                    <input type="text" 
                        className="admFormCashBoxId" 
                        name="firstname" 
                        maxLength='45'
                        placeholder="Контракт покупця.."
                    />  
                </div>
                <div>
                    <label htmlFor="fname">Адреса </label>
                    <input type="text" 
                        className="admFormCashBoxId" 
                        name="firstname" 
                        maxLength='45'
                        placeholder="Контракт покупця.."
                    />  
                </div>
                <div>
                    <label htmlFor="sklad">Роль </label>
                        <select className="admFormCashBoxStorage" name="Pereviznik">
                        <option value="1">Покупець</option>
                        <option value="2">Покупець Оптовий</option>
                    </select>  
                </div>
                <div>
                    <label htmlFor="pereviznik">Перевізник </label>
                        <select className="admFormCashBoxDelivery" name="Pereviznik">
                        <option value="NovaPoshta">Нова Пошта</option>
                        <option value="UkrPoshta">Укр Пошта</option>
                        <option value="Delivary">Делівері</option>
                    </select>    
                </div>   
            </div>
            <label htmlFor="subject">Нотатки</label>
            <textarea className="admFormCashBoxNotes" name="subject" 
                placeholder="Пишить нотатку..">
            </textarea>
            <div className='admFormCashBoxCommit'
                onClick={(e)=>e.preventDefault({passive: false})}>
                <div className='admFormCashBoxAddCommit'>
                <button onClick={() => console.log('Add Commit')} 
                    className='admFormCashBoxBtnAdd'>Додати коментар
                </button>
                    <textarea  name="subject" className='admCashBoxCommitText'
                    placeholder="Пишить коментар.."></textarea>
                </div>
                <div className='admFormCashBoxCommitChat'>

                </div>  
            </div>
            <div className='admCashBoxFormGrp'>
                <input type="submit" className='admFormCashBoxBtnOk' value="Ok"/>
                <input type="submit" className='admFormCashBoxBtnSave' value="Зберегти"/>
                <button className='admCashBoxBtn'>Відмінити</button> 
            </div>
        </form>
        </div>
    </div>
    );
};

export default AdminModalCashbox;