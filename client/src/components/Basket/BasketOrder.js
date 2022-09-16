import {React, useState} from 'react';
import '../../css/BasketCss/BasketOrder.css';
import ButtonAction from '../Buttons/ButtonAction';
import TyresCardList from '../Cards/TyresCardList';
import SelectRadio from '../Select/SelectRadio';
import UserDataInput from './UserDataInput';

const BasketOrder = () => {
    const [delivery, setDelivery] = useState("");

const checkedRadio = (e) => {
    setDelivery(e.currentTarget.value);
}

    return (
        <div className='basketOrder'>
            <div>Оформлення замовлення</div>
            <div className='basketColmLeft'>
                данні замовлення
                <div className='basketColmItemLeft'>
                    <span>Прізвище ім'я та по батькові *</span>
                    <UserDataInput inputItem={{name:'basketOrderName',
                    discr:"введіть прізвище ім'я по батькові", min:"4",
                    max:"8", size:"30"}}/>   
                </div>
                <div className='basketColmItemLeft'>
                    <span>Номер телефону *</span>
                    <input className='inputBasketOrderPhone' 
                    type='number' 
                    name='basketOrderPhone' 
                    id='phoneOrder' 
                    placeholder="введіть номер телефону"
                    minLength="10" maxLength="20" size="30" 
                    required/>    
                </div>
                <div className='basketColmItemLeft'>
                    <span>Ваш email адрес</span>  
                    <input className='inputBasketOrderEmail' 
                    type='text' 
                    name='basketOrderEmail' 
                    id='emailOrder' 
                    placeholder="введіть ваш email адрес"
                    minLength="4" maxLength="30" size="30" 
                    />    
                </div>
                <div className='basketColmItemLeft'>
                    <label>місто *</label>
                    <select name='chooseCity' id='citySelect'>
                    <option value="">--виберіть місто--</option>
                    <option value="kharkiv">Харків</option>
                    <option value="kiyv">Київ</option>
                    <option value="dneps">Дніпро</option>
                    <option value="lvov">Львів</option>
                    <option value="poltava">Полтава</option>
                    <option value="odesa">Одеса</option>
                    </select>
                </div>
                <div className='basketColmItemLeft'>
                    <span>Доставка:</span>
                    <SelectRadio radioData={{value: "samoviviz", radioName: "Самовивіз"}} 
                        addOptions={""}
                        direction={"column"} 
                        checked={checkedRadio}>
                    </SelectRadio>
                    <SelectRadio radioData={{value: "novaPoshta", radioName: "Нова Пошта"}} 
                        addOptions={delivery === "novaPoshta" ?? false}
                        direction={"column"} 
                        checked={checkedRadio}>
                        { delivery === "novaPoshta" ?    
                        "Розрахунок НОВА ПОШТА" : null}    
                    </SelectRadio>
                    <SelectRadio radioData={{value: "urkPoshta", radioName: "Укр Пошта"}} 
                        addOptions={""}
                        direction={"column"} 
                        checked={checkedRadio}>
                    </SelectRadio>
                </div>
                <div className='basketColmItemLeft'>
                    <span>Оплата:</span>
                    <SelectRadio radioData={{value: "gotivka", radioName: "Готівкою"}} 
                        addOptions={""}
                        direction={"column"} 
                        checked={checkedRadio}>
                    </SelectRadio>
                    <SelectRadio radioData={{value: "cardVisaMaster", radioName: "Карткою (VISA / MASTERCARD)"}} 
                        addOptions={""}
                        direction={"column"} 
                        checked={checkedRadio}>
                    </SelectRadio>
                    <SelectRadio radioData={{value: "bezgotivka", radioName: "Безготівковий розрахунок"}} 
                        addOptions={""}
                        direction={"column"} 
                        checked={checkedRadio}>
                    </SelectRadio>
                </div> 
            </div>
            <div className='basketColmRight'>
                Товар і ціна 
                остаточна сумма замовлення
                <div>
                    <TyresCardList forOrder={true}/>       
                </div>
                <div className='totalCount'>
                    <span>сумма за товар у кількості 4од: 8020 </span>
                    <span>Додаткова Гарантія: 350грн</span>
                    <span>Доставка (Нова Пошта): 150грн </span>
                    <span>Комісія платіжної системи: 35грн</span>
                    
                    <span>Всього: 8185грн</span>   
                </div>
                <div className='basketColmItemRight'>
                    <label htmfor="commentsOrder">Додати коментар до замовлення:</label>
                    <textarea id="commentsOrder" name="commentsOrder"
                        placeholder='Залишити коментар для замовлення'
                        rows="5" cols="80">
                    </textarea>
                </div>
                <ButtonAction props={"Оформити замовлення"} widthBtn={250}/>
            </div>
        </div>
    );
};

export default BasketOrder;