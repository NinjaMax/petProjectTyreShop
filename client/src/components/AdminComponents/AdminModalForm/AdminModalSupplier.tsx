import React from 'react';
import '../../../css/AdminComponentCss/AdminModalFormCss/AdminModalSupplier.css';

const AdminModalSupplier = () => {
    return (
        <div>
            Створити постачальника
            <div className="containerAdmSupplierForm">
            <form action="">
                <div className='admFormDataSupplier'>
                    <div >
                        <div className='admFormSupplierCustm'>
                            <label htmlFor="lname">І'мя або Назва </label>
                            <input type="text" 
                                className="admFormSupplierName" 
                                name="lastname" 
                                maxLength={45}
                                placeholder="Ім'я або назва.."
                            />        
                        </div>    
                    </div>
                    <div>
                        <label htmlFor="fname">Повне ім'я / назва </label>
                        <input type="text" 
                            className="admFormSupplierId" 
                            name="firstname" 
                            maxLength={45}
                            placeholder="Контракт покупця.."
                        />  
                    </div>
                    <div>
                        <label htmlFor="fname">телефон </label>
                        <input type="text" 
                            className="admFormSupplierId" 
                            name="firstname" 
                            maxLength={45}
                            placeholder="Контракт покупця.."
                        />  
                    </div>
                    <div>
                        <label htmlFor="fname">email </label>
                        <input type="text" 
                            className="admFormSupplierId" 
                            name="firstname" 
                            maxLength={45}
                            placeholder="Контракт покупця.."
                        />  
                    </div>
                    <div>
                        <label htmlFor="fname">Адреса </label>
                        <input type="text" 
                            className="admFormSupplierId" 
                            name="firstname" 
                            maxLength={45}
                            placeholder="Контракт покупця.."
                        />  
                    </div>
                    <div>
                        <label htmlFor="sklad">Роль </label>
                            <select className="admFormSupplierStorage" name="Pereviznik">
                            <option value="1">Покупець</option>
                            <option value="2">Покупець Оптовий</option>
                        </select>  
                    </div>
                    <div>
                        <label htmlFor="pereviznik">Перевізник </label>
                            <select className="admFormSupplierDelivery" name="Pereviznik">
                            <option value="NovaPoshta">Нова Пошта</option>
                            <option value="UkrPoshta">Укр Пошта</option>
                            <option value="Delivary">Делівері</option>
                        </select>    
                    </div>   
                </div>
                <label htmlFor="subject">Нотатки</label>
                <textarea className="admFormSupplierNotes" name="subject" 
                    placeholder="Пишить нотатку..">
                </textarea>
                <div className='admFormSupplierCommit'
                    onClick={(e)=>e.preventDefault()}>
                    <div className='admFormSupplierAddCommit'>
                    <button onClick={() => console.log('Add Commit')} 
                        className='admFormSupplierBtnAdd'>Додати коментар
                    </button>
                        <textarea  name="subject" className='admSupplierCommitText'
                        placeholder="Пишить коментар.."></textarea>
                    </div>
                    <div className='admFormSupplierCommitChat'>

                    </div>  
                </div>
                <div className='admSupplierFormGrp'>
                    <input type="submit" className='admFormSupplierBtnOk' value="Ok"/>
                    <input type="submit" className='admFormSupplierBtnSave' value="Зберегти"/>
                    <button className='admSupplierBtn'>Відмінити</button> 
                </div>
            </form>
            </div>
        </div>
    );
};

export default AdminModalSupplier;