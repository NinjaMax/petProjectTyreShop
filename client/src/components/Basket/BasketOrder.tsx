import React, {useEffect, useState} from 'react';
import '../../css/BasketCss/BasketOrder.css';
import ButtonAction from '../buttons/ButtonAction';
import TyresCardList from '../cards/TyresCardList';
import SelectRadio from '../select/SelectRadio';
import InputDataText from '../ux/InputDataText';
import InputDataTel from '../ux/InputDataTel';
import { yieldToMain } from '../../restAPI/postTaskAdmin';
import { getBasketOrder } from '../../restAPI/restGoodsApi';

const BasketOrder = () => {
    const [delivery, setDelivery] = useState("");
    const [goodsOrder, setGoodsOrder] = useState<any[]>();
    useEffect(() => {
        let isMounted = false;
        const basketOrder = async () => {
          const taskProduct: any[] = [
            getBasketOrder,
          ];
        let i: number = 0; 
        while (taskProduct.length > i) {
          if (!isMounted && taskProduct[i] === getBasketOrder) {
            const getBasket: any = await taskProduct[i]();
            if (getBasket) {
               setGoodsOrder([...getBasket?.basket_storage]); 
            }
          }
          const task = taskProduct.shift();
          task();
          await yieldToMain();
        }
        };
        basketOrder();
        return () => {
          isMounted = true;
        };
      },[]);

    const acceptInput = (value: string, mask: {
        masked: any; arg: any
        }) => {

        console.log(mask.masked.rawInputValue + ":rawInput");
        console.log(mask.masked.rawInputValue.length + ":rawInputLength");
        console.log(mask.masked.unmaskedValue + ":unmaskValue"); // Need it
        console.log(value + " :VALUE")
    };
       
    const checkedRadio = (e: any) => {
        setDelivery(e.currentTarget.value);
    }

    return (
        <div className='basketOrder'>
            <div> Оформлення замовлення</div>
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
                    <SelectRadio 
                        radioData={{
                            value: "samoviviz",
                            radioName: "Самовивіз",
                            name: "delivery",    
                        }} 
                        addOptions={""}
                        direction={"column"} 
                        activeOptions={checkedRadio}
                        >
                    </SelectRadio>
                    <SelectRadio 
                        radioData={{
                            value: "novaPoshta", 
                            radioName: "Нова Пошта",
                            name: "delivery",
                        }} 
                        addOptions={delivery === "novaPoshta" ?? false}
                        direction={"column"} 
                        activeOptions={checkedRadio}
                        >
                        { delivery === "novaPoshta" ?    
                        "Розрахунок НОВА ПОШТА" : null}    
                    </SelectRadio>
                    <SelectRadio 
                        radioData={{
                            value: "urkPoshta", 
                            radioName: "Укр Пошта",
                            name: "delivery",
                        }} 
                        addOptions={""}
                        direction={"column"} 
                        activeOptions={checkedRadio}
                        >
                    </SelectRadio>
                </div>
                <div className='basketColmItemLeft'>
                    <span>Оплата:</span>
                    <SelectRadio 
                        radioData={{
                            value: "gotivka", 
                            radioName: "Готівкою",
                            name: "pay",
                        }} 
                        addOptions={""}
                        direction={"column"} 
                        //checked={checkedRadio}
                        >
                    </SelectRadio>
                    <SelectRadio 
                        radioData={{
                            value: "cardVisaMaster", 
                            radioName: "Карткою (VISA / MASTERCARD)",
                            name: "pay",
                        }} 
                        addOptions={""}
                        direction={"column"} 
                        //checked={checkedRadio}
                        >
                    </SelectRadio>
                    <SelectRadio 
                        radioData={{
                            value: "bezgotivka", 
                            radioName: "Безготівковий розрахунок",
                            name: "pay",
                        }} 
                        addOptions={""}
                        direction={"column"} 
                        //checked={checkedRadio}
                        >
                    </SelectRadio>
                </div> 
            </div>
            <div className='basketColmRight'>
                Товар і ціна 
                остаточна сумма замовлення
                <div className='basketColmRightListGoods'>
                    {goodsOrder?.length !== 0 ? goodsOrder?.map((item: any) =>
                       <div key={item.id + 'cart'}
                        className='itemGoodsBasket'>
                            <TyresCardList 
                            goods={item}
                            forOrder={true}
                            priceItem={item.price}
                            /><span>X</span>  
                        </div> 
                        ) : null
                    }
                </div>
                <div className='totalCount'>
                    <span>{`Сумма за товари у кількості
                    ${goodsOrder?.reduce((sum, current) => ( sum + current.quantity), 0)} од: 
                    ${goodsOrder?.reduce((sum, current) => ( sum + current.price), 0) * 
                        goodsOrder?.reduce((sum, current) => ( sum + current.quantity), 0)}  грн`}</span>
                    <span>Додаткова Гарантія: 350грн</span>
                    <span>Доставка (Нова Пошта): 150грн </span>
                    <span>Комісія платіжної системи: 35грн</span>
                    <span>Всього: 8185грн</span> 
                </div>
                <div className='basketColmItemRight'>
                    <label htmlFor="commentsOrder">Додати коментар до замовлення:</label>
                    <textarea id="commentsOrder" name="commentsOrder"
                        placeholder='Залишити коментар для замовлення'
                        rows={5} cols={80}>
                    </textarea>
                </div>
                <ButtonAction props={"Оформити замовлення"} widthBtn={250} eventItem={undefined}/>
            </div>
        </div>
    );
};

export default BasketOrder;