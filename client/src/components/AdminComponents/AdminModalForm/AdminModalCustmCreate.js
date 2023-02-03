import React from 'react';
import '../../../css/AdminComponentCss/AdminModalFormCss/AdminModalCustmCreate.css';

const AdminModalCustmCreate = () => {
    return (
        <div>
            Створити покупця
            <div className="containerAdmCustmCreateForm">
            <form action="">
                <div className='admFormDataCustmCreate'>
                    <div >
                        <div className='admFormCustmCreateCustm'>
                            <label htmlFor="lname">І'мя або Назва </label>
                            <input type="text" 
                                className="admFormCustmCreateName" 
                                name="lastname" 
                                maxLength='45'
                                placeholder="Ім'я або назва.."
                            />        
                        </div>    
                    </div>
                    <div>
                        <label htmlFor="fname">Повне ім'я / назва </label>
                        <input type="text" 
                            className="admFormCustmCreateId" 
                            name="firstname" 
                            maxLength='45'
                            placeholder="Контракт покупця.."
                        />  
                    </div>
                    <div>
                        <label htmlFor="fname">телефон </label>
                        <input type="text" 
                            className="admFormCustmCreateId" 
                            name="firstname" 
                            maxLength='45'
                            placeholder="Контракт покупця.."
                        />  
                    </div>
                    <div>
                        <label htmlFor="fname">email </label>
                        <input type="text" 
                            className="admFormCustmCreateId" 
                            name="firstname" 
                            maxLength='45'
                            placeholder="Контракт покупця.."
                        />  
                    </div>
                    <div>
                        <label htmlFor="fname">Адреса </label>
                        <input type="text" 
                            className="admFormCustmCreateId" 
                            name="firstname" 
                            maxLength='45'
                            placeholder="Контракт покупця.."
                        />  
                    </div>
                    <div>
                        <label htmlFor="sklad">Роль </label>
                            <select className="admFormCustmCreateStorage" name="Pereviznik">
                            <option value="1">Покупець</option>
                            <option value="2">Покупець Оптовий</option>
                        </select>  
                    </div>
                    <div>
                        <label htmlFor="pereviznik">Перевізник </label>
                            <select className="admFormCustmCreateDelivery" name="Pereviznik">
                            <option value="NovaPoshta">Нова Пошта</option>
                            <option value="UkrPoshta">Укр Пошта</option>
                            <option value="Delivary">Делівері</option>
                        </select>    
                    </div>   
                </div>
                <label htmlFor="subject">Нотатки</label>
                <textarea className="admFormCustmCreateNotes" name="subject" 
                    placeholder="Пишить нотатку..">
                </textarea>
                <div className='admFormCustmCreateCommit'
                    onClick={(e)=>e.preventDefault({passive: false})}>
                    <div className='admFormCustmCreateAddCommit'>
                    <button onClick={() => console.log('Add Commit')} 
                        className='admFormCustmCreateBtnAdd'>Додати коментар
                    </button>
                        <textarea  name="subject" className='admCustmCreateCommitText'
                        placeholder="Пишить коментар.."></textarea>
                    </div>
                    <div className='admFormCustmCreateCommitChat'>

                    </div>  
                </div>
                <div className='admCustmCreateFormGrp'>
                    <input type="submit" className='admFormCustmCreateBtnOk' value="Ok"/>
                    <input type="submit" className='admFormCustmCreateBtnSave' value="Зберегти"/>
                    <button className='admFormOrderBtn'>Відмінити</button> 
                </div>
            </form>
            </div>
        </div>
    );
};

export default AdminModalCustmCreate;