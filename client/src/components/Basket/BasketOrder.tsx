import React, {useState} from 'react';
import '../../css/BasketCss/BasketOrder.css';
import ButtonAction from '../buttons/ButtonAction';
import TyresCardList from '../cards/TyresCardList';
import SelectRadio from '../select/SelectRadio';
import InputDataText from '../ux/InputDataText';
import InputDataTel from '../ux/InputDataTel';

const BasketOrder = () => {
    const [delivery, setDelivery] = useState("");

   
    const acceptInput = (value: string, mask: {
        masked: any; arg: any
        }) => {

        console.log(mask.masked.rawInputValue + ":rawInput");
        console.log(mask.masked.rawInputValue.length + ":rawInputLength");
        console.log(mask.masked.unmaskedValue + ":unmaskValue"); // Need it
        console.log(value + " :VALUE")
    };
       

    const checkedRadio = (e: { currentTarget: { value: React.SetStateAction<string>; }; }) => {
        setDelivery(e.currentTarget.value);
    }

    return (
        <div className='basketOrder'>
            <div>Оформлення замовлення</div>
            <div className='basketColmLeft'>
                данні замовлення
                <div className='basketColmItemLeft'>
                    <span>Прізвище ім'я та по батькові *</span>
                    <InputDataText inputItem={{name:'basketOrderName',
                    discr:"введіть прізвище ім'я по батькові",
                    max:"40", size:"30"}}/>   
                </div>
                <div className='basketColmItemLeft'>
                    <span>Номер телефону *</span>
                    <InputDataTel 
                        onAccept={acceptInput} 
                        //ref={refComp}
                    />  
                </div>
                <div className='basketColmItemLeft'>
                    <span>Ваш email адрес</span>
                    <InputDataText inputItem={{name:'basketOrderEmail',
                    discr:"введіть ваш email адрес ---@---",
                    max:"40", size:"30"}}/>     
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
                    <label htmlFor="commentsOrder">Додати коментар до замовлення:</label>
                    <textarea id="commentsOrder" name="commentsOrder"
                        placeholder='Залишити коментар для замовлення'
                        rows="5" cols="80">
                    </textarea>
                </div>
                <ButtonAction props={"Оформити замовлення"} widthBtn={250} eventItem={undefined}/>
            </div>
        </div>
    );
};

export default BasketOrder;