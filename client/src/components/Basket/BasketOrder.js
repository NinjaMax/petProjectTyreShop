import React from 'react';
import '../../css/BasketCss/BasketOrder.css';
import TyresCardList from '../Cards/TyresCardList';
import SelectRadio from '../Select/SelectRadio';

const BasketOrder = () => {

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
                    minlength="4" maxlength="8" size="30" 
                    required/>    
                </div>
                <div className='basketColmItemLeft'>
                    <span>Номер телефону *</span>
                    <input className='inputBasketOrderPhone' 
                    type='number' 
                    name='basketOrderPhone' 
                    id='phoneOrder' 
                    placeholder="введіть номер телефону"
                    minlength="10" maxlength="20" size="30" 
                    required/>    
                </div>
                <div className='basketColmItemLeft'>
                    <span>Ваш email адрес</span>  
                    <input className='inputBasketOrderEmail' 
                    type='text' 
                    name='basketOrderEmail' 
                    id='emailOrder' 
                    placeholder="введіть ваш email адрес"
                    minlength="4" maxlength="30" size="30" 
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
                    direction={"column"}/>
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
                    <TyresCardList/> 
                      
                </div>
                <span>сумма</span>
                <span>Всьго</span>
                <div className='basketColmItemRight'>
                    <label for="commentsOrder">Залишити комметр до замовлення:</label>
                    <textarea id="commentsOrder" name="commentsOrder"
                        rows="5" cols="100">
                        It was a dark and stormy night...
                    </textarea>
                </div>
            </div>
        </div>
    );
};

export default BasketOrder;