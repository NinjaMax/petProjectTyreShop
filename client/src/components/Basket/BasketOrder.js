import {React, useState} from 'react';
import '../../css/BasketCss/BasketOrder.css';
import ButtonAction from '../Buttons/ButtonAction';
import TyresCardList from '../Cards/TyresCardList';
import SelectRadio from '../Select/SelectRadio';

const BasketOrder = () => {
    const [delivery, setDelivery] = useState("");

const checkedRadio = (e) => {
    setDelivery(e.currentTarget.value);
}

const payData =[{value: "gotivka", radioName: "Готівкою"},
                {value: "cardVisaMaster", radioName: "Карткою (VISA / MASTERCARD)"},
                {value: "bezgotivka", radioName: "Безготівковий розрахунок"}];

const deliveryData = [{value: "samoviviz", radioName: "Самовивіз"},
                      {value: "novaPoshta", radioName: "Нова Пошта"},
                      {value: "urkPoshta", radioName: "Укр Пошта"}

];

    return (
        <div className='basketOrder'>
            <div>Оформлення замовлення</div>
            <div className='basketColmLeft'>
                данні замовлення
                <div className='basketColmItemLeft'>
                    <span>Прізвище ім'я та по батькові *</span>
                    <input className='inputBasketOrderName' 
                    type='text' 
                    name='basketOrderName' 
                    id='nameOrder' 
                    placeholder="введіть прізвище ім'я по батькові"
                    minLength="4" maxLength="8" size="30" 
                    required/>    
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
                    
                     <SelectRadio radioData={deliveryData} 
                    titleRadio={"Доставка:"}
                    direction={"column"} 
                    checked={checkedRadio}/>
                    { delivery === "novaPoshta" ?    
                     "Розрахунок НОВА ПОШТА" : null}
    
                </div>
                <div className='basketColmItemLeft'>
                    <SelectRadio radioData={payData} 
                    titleRadio={"Оплата:"}
                    direction={"column"}/> 
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