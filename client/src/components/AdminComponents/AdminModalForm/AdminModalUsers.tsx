import React from 'react';
import '../../../css/AdminComponentCss/AdminModalFormCss/AdminModalUsersCreate.css';

const AdminModalUsers = () => {
    return (
        <div>
        Створити користувача
        <div className="containerAdmUsersForm">
        <form action="">
            <div className='admFormDataUsers'>
                <div >
                    <div className='admFormUsersCustm'>
                        <label htmlFor="lname">І'мя або Назва </label>
                        <input type="text" 
                            className="admFormUsersName" 
                            name="lastname" 
                            maxLength='45'
                            placeholder="Ім'я або назва.."
                        />        
                    </div>    
                </div>
                <div>
                    <label htmlFor="fname">Повне ім'я / назва </label>
                    <input type="text" 
                        className="admFormUsersId" 
                        name="firstname" 
                        maxLength='45'
                        placeholder="Контракт покупця.."
                    />  
                </div>
                <div>
                    <label htmlFor="fname">телефон </label>
                    <input type="text" 
                        className="admFormUsersId" 
                        name="firstname" 
                        maxLength='45'
                        placeholder="Контракт покупця.."
                    />  
                </div>
                <div>
                    <label htmlFor="fname">email </label>
                    <input type="text" 
                        className="admFormUsersId" 
                        name="firstname" 
                        maxLength='45'
                        placeholder="Контракт покупця.."
                    />  
                </div>
                <div>
                    <label htmlFor="fname">Адреса </label>
                    <input type="text" 
                        className="admFormUsersId" 
                        name="firstname" 
                        maxLength='45'
                        placeholder="Контракт покупця.."
                    />  
                </div>
                <div>
                    <label htmlFor="sklad">Роль </label>
                        <select className="admFormUsersStorage" name="Pereviznik">
                        <option value="1">Менеджер продаж</option>
                        <option value="2">Менеджер постачання</option>
                        <option value="2">Директор</option>
                        <option value="2">Админ</option>
                    </select>  
                </div>  
            </div>
            <label htmlFor="subject">Нотатки</label>
            <textarea className="admFormUsersNotes" name="subject" 
                placeholder="Пишить нотатку..">
            </textarea>
            <div className='admFormUsersCommit'
                onClick={(e)=>e.preventDefault()}>
                <div className='admFormUsersAddCommit'>
                <button onClick={() => console.log('Add Commit')} 
                    className='admFormUsersBtnAdd'>Додати коментар
                </button>
                    <textarea  name="subject" className='admUsersCommitText'
                    placeholder="Пишить коментар.."></textarea>
                </div>
                <div className='admFormUsersCommitChat'>

                </div>  
            </div>
            <div className='admUsersFormGrp'>
                <input type="submit" className='admFormUsersBtnOk' value="Ok"/>
                <input type="submit" className='admFormUsersBtnSave' value="Зберегти"/>
                <button className='admFormOrderBtn'>Відмінити</button> 
            </div>
        </form>
        </div>
    </div>
    );
};

export default AdminModalUsers;