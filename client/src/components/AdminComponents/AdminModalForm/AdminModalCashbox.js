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
                        <label htmlFor="lname">Назва каси </label>
                        <input type="text" 
                            className="admFormCashBoxName" 
                            name="lastname" 
                            maxLength='45'
                            placeholder="Ім'я або назва.."
                        />        
                    </div>    
                </div>
                <div>
                    <label htmlFor="pereviznik">Організація </label>
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
            <div className='admCashBoxFormGrp'>
                <input type="submit" className='admFormCashBoxBtnOk' value="Ok"/>
                <input type="submit" className='admFormCashBoxBtnSave' value="Зберегти"/>
                <button className='admFormCashBoxBtnCancel'>Відмінити</button> 
            </div>
        </form>
        </div>
    </div>
    );
};

export default AdminModalCashbox;