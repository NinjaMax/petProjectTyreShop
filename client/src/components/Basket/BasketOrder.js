import {React, useMemo, useState} from 'react';
import '../../css/BasketCss/BasketOrder.css';
import ButtonAction from '../Buttons/ButtonAction';
import TyresCardList from '../Cards/TyresCardList';
import SelectRadio from '../Select/SelectRadio';
import InputDataText from '../UX/InputDataText';
import InputDataTel from '../UX/InputDataTel';

const BasketOrder = () => {
    const [delivery, setDelivery] = useState("");
    const [valueInput, setValueInput] = useState();
    //const [inputChanged, setInputChanged] = useState(false);
   // const ref = useRef(null);
   // const inputRef = useRef(null);
   
  const inputChange = useMemo(() => valueInput ? true : false, [valueInput]);

 

        const acceptInput = (value, mask) => {
    //setValueInput(mask.value)
    //const inputLength = {items: mask.unmaskedValue.length }
    if(mask.masked.rawInputValue.length !== null) {
       setValueInput(true) 
    } else {
        setValueInput(false)
    }

     
    
    //if (mask.masked.rawInputValue) setValueInput(!valueInput)
    //if (mask.masked.rawInputValue) setValueInput(!valueInput)
    //mask.masked.isComplete ?? setValueInput(!valueInput)
    //mask.unmaskedValue ==="38" ?? setValueInput(!true)
    //mask.unmaskedValue ==="38" ? setValueInput(!true) : setValueInput(!false)
     //   setValueInput(true);
    //if (mask.unmaskedValue ==="38") {
    //    setValueInput(!true);
    //} else setValueInput(false);
    //console.log(value.length);
    //console.log(mask);
    console.log(mask.masked.unmaskedValue.length +":lengthunmasked");
    //console.log(mask.masked.isFilled + ":Filled input");
    //console.log(mask.masked.isComplete + ":Complete input");
    console.log(mask.masked.rawInputValue + ":rawInput");
    //console.log(mask.masked.rawInputValue + ":rawInput");
    //console.log(mask.masked.rawInputValue.length + ":rawInputLength");
    //console.log(mask.masked.unmaskedValue + ":unmaskValue");
    console.log(value)
    
    //return valueInput;
};
     //console.log(acceptInput);   
    console.log(inputChange);
     

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
                    <InputDataText inputItem={{name:'basketOrderName',
                    discr:"введіть прізвище ім'я по батькові",
                    max:"40", size:"30"}}/>   
                </div>
                <div className='basketColmItemLeft'>
                    <span>Номер телефону *</span>
                    <InputDataTel 
                    onAccept={acceptInput}
                    />
                    <label className={inputChange ? 'inputDataTelLabelActive' : 'inputDataTelLabel'}>
                    введіть номер телефону
                    <span className='inputDataTelSpan'> *</span>
            </label>
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