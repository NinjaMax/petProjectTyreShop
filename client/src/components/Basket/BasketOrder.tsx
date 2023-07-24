import React, {Fragment, useEffect, useState} from 'react';
import '../../css/BasketCss/BasketOrder.css';
import ButtonAction from '../buttons/ButtonAction';
import TyresCardList from '../cards/TyresCardList';
import SelectRadio from '../select/SelectRadio';
import InputDataText from '../ux/InputDataText';
import InputDataTel from '../ux/InputDataTel';
import { yieldToMain } from '../../restAPI/postTaskAdmin';
import { getBasketOrder, getSupplierById } from '../../restAPI/restGoodsApi';
import { getCalcPriceNovaPoshta, getCityNovaPoshta, getWareHousesNovaPoshta } from '../../restAPI/restNovaPoshtaAPI';
import { IDapertmentNP } from './types/DepartmentType.type';
import { ICity } from './types/CityNP.type';
import { IDepart } from './types/DaprtNP.type';
import { CalcNovaPoshta } from '../../restAPI/types/CalcNovaPoshta.type';
import { cargoTypesNovaPoshta } from '../../services/cargoTypesNovaPoshta';
import { tyresDiameter } from '../../services/tyresDiameterNovaPoshta';
import { wheelsDiameter } from '../../services/wheelsDiameterNovaPoshta';

const BasketOrder = () => {
    const [delivery, setDelivery] = useState("");
    const [goodsOrder, setGoodsOrder] = useState<any[]>();
    const [cityList, setCityList] = useState<ICity[]>();
    const [dapartList, setDepartList] = useState<IDepart[]>();
    const [cityListActive, setCityListActive] = useState<boolean>(false);
    const [chooseDepartmentNP, setChooseDepartmentNP] = useState<IDepart>()
    const [inputCity, setInputCity] = useState<string>('');
    const [chooseCity, setChooseCity] = useState<string>('');
    const [dataDepartmentNP, setDataDepartmentNP] = useState<IDapertmentNP>();
    const [takeOut, setTakeOut] = useState<boolean>(false);
    const [costNovaPoshta, setCostNovaPoshta] = useState<any[]| null>([]);
    const [sumGoods, setSumGoods]= useState<number|null>(null);
    const [dopGarantySum, setDopGarantySum] = useState<number|null>(0);
    const [commisionPay, setCommitionPay] = useState<number|null>(0);
    const [newSumGoods, setNewSumGoods] = useState<number|null>(null);
    const [bonusUser, setBonusUser] = useState();
    const [sumOverall, setSumOverall] = useState<any[]>();
    const [deliverySum, setDeliverySum] = useState<number|null>(0);
    const [payMethod, setPayMethod] = useState("");


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

    useEffect(() => {
        let isMounted = false;
        const basketOrder = async () => {
          const taskNovaPoshta: any[] = [
            getCityNovaPoshta,
            getWareHousesNovaPoshta,
            ];
            let i: number = 0; 
            while (taskNovaPoshta.length > i) {
            if (!isMounted && 
                taskNovaPoshta[i] === getCityNovaPoshta && inputCity) {
                const getCity: any = await taskNovaPoshta[i](inputCity);
                if (getCity?.success) {
                setCityList([...getCity?.data[0].Addresses]); 
                console.log('CITY_LIST: ', getCity.data[0].Addresses);
                }
            }
            if (!isMounted && 
                taskNovaPoshta[i] === getWareHousesNovaPoshta && dataDepartmentNP) {
                const getDapartNP: any = await taskNovaPoshta[i](dataDepartmentNP);
                if (getDapartNP?.success) {
                setDepartList([...getDapartNP?.data]); 
                console.log('DAPART_LIST: ', getDapartNP.data);
                }
            }
            const task = taskNovaPoshta.shift();
            task();
            await yieldToMain();
            }
        };
        basketOrder();
        return () => {
          isMounted = true;
        };
    },[dataDepartmentNP, inputCity]);

    useEffect(() => {
        let isMounted = false;
        if (!isMounted) {
            setSumGoods(Number(
              goodsOrder?.reduce((sum, current) => ( sum + current.price), 0) * 
                        goodsOrder?.reduce((sum, current) => ( sum + current.quantity), 0) 
                        ) 
            ); 
        }
        if (!isMounted && costNovaPoshta?.length !== 0) {
            setDeliverySum(Number(
                (25 + ( goodsOrder?.reduce((sum, current) => ( sum + current.price), 0) * 
                                goodsOrder?.reduce((sum, current) => ( sum + current.quantity), 0)
                ) * 0.01 +
               costNovaPoshta?.reduce((sum: number, current: number) => ( sum + current), 0)
                ).toFixed())
            );
        }
        if (!isMounted && delivery === "novaPoshta") {
            setSumOverall(
                [Number(sumGoods), Number(deliverySum)]
            );
        }
        if (!isMounted && !delivery) {
            setSumOverall(
                [Number(sumGoods)]
            );
        }
        return () => {
            isMounted = true;
          };
    },[
        commisionPay, 
        costNovaPoshta, 
        delivery, 
        deliverySum, 
        dopGarantySum, 
        goodsOrder, 
        sumGoods
    ]);


        const basketSupplierGoods = async (city: string, depart:IDapertmentNP) => {
            let dataSupplier: CalcNovaPoshta = {};
            let taskGetSupplier: any[] | null = [
                ...goodsOrder!
            ];
            let i: number = 0; 
            while (taskGetSupplier.length > i) {
                let getCitySup: any = await getSupplierById(
                    taskGetSupplier[i].id_supplier
                );
                let cityNovaPoshta = await getCityNovaPoshta(getCitySup.city_ua);
                let dataSupByCity = cityNovaPoshta?.data[0]?.Addresses.find(
                    (item: any) => item.MainDescription === getCitySup.city_ua);
                
                dataSupplier.citySender = dataSupByCity.DeliveryCity;
                dataSupplier.goodsQuantity = taskGetSupplier[i].quantity;
                dataSupplier.cityReceiver = depart.DeliveryCity;
                dataSupplier.goodsCost = String(taskGetSupplier[i].price * taskGetSupplier[i].quantity);
                dataSupplier.redeliveryCost = String(taskGetSupplier[i].price * taskGetSupplier[i].quantity);

                let goodsTypeRef = cargoTypesNovaPoshta(taskGetSupplier[i].category);
                dataSupplier.goodsType = goodsTypeRef;

                if (goodsTypeRef === "Cargo") {
                   console.log('CARGO_TYPE');
                }
                if (goodsTypeRef === "TiresWheels") {
                    let tyreDiameterRef = tyresDiameter(taskGetSupplier[i].diameter);
                    dataSupplier.goodsDescription = tyreDiameterRef;
                }
                if (goodsTypeRef === "TiresWheels" && taskGetSupplier[i].category === "диски") {
                    let wheelsDiameterRef = wheelsDiameter(taskGetSupplier[i].diameter);
                    dataSupplier.goodsDescription = wheelsDiameterRef;
                }

                console.log("dataSupplier", dataSupplier);
                if (taskGetSupplier[i] && dataSupplier) {
                    let getCalcDelivery = await getCalcPriceNovaPoshta(dataSupplier);
                    console.log(`CALC_DELIVERY ${i}: `, getCalcDelivery.data[0]);
                    if (getCalcDelivery.success === true) {
                        setCostNovaPoshta(oldCalc =>
                            [...oldCalc!,
                                getCalcDelivery.data[0].Cost,
                                getCalcDelivery.data[0].CostRedelivery,
                            ]
                        );
                        console.log('COST_SET_NOVA_POSHTA: ', costNovaPoshta);
                    } 
                
                }
                console.log(`CITY_SUP_${i}: `,  getCitySup.city_ua);
                if (getCitySup.city_ua === 'Київ' && city.includes('м. Київ')) {
                    setTakeOut(true); 
                    console.log('CITY_KIYV: ', true);
                } else {
                    setTakeOut(false); 
                }
                taskGetSupplier.shift();
            };
            //taskGetSupplier = null;
        }

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
    };

    const cityInputActive = (e: any) => {
        //console.log('CITY_INPUT: ', e.currentTarget.value);
        setInputCity(e.currentTarget.value);
        setChooseCity(e.currentTarget.value);
        setCityListActive(true);
    };

    const cityChooseActive = (e: any) => {
        //console.log('CITY_CHOOSE: ', e.target.textContent);
        setCostNovaPoshta([]);
        console.log('CITY_INPUT: ', e.target.textContent);
        //setCostNovaPoshta([]);
        setChooseCity(e.target.textContent);
        setDataDepartmentNP({
            MainDescription: e.currentTarget.getAttribute('data-city'),
            DeliveryCity: e.currentTarget.getAttribute('data-delivery'),
        });
        setCityListActive(false);
        console.log('CITY_CHOOSE_SET: ', e.target.textContent);
        console.log('CITY_CHOOSE: ', chooseCity);
        // if (e.target.textContent !== chooseCity) {
        //     setCostNovaPoshta(null);
        // }
        console.log('SET_DEPART_DATA: ', dataDepartmentNP);
        basketSupplierGoods(
            e.target.textContent, 
            {
                MainDescription: e.currentTarget.getAttribute('data-city'),
                DeliveryCity: e.currentTarget.getAttribute('data-delivery'),
            } 
        );
    };

    const cancelCityList = () => {
        //setChooseCity('');
        setInputCity('');
        setCityListActive(false); 

        console.log('CANCEL_INPUT');
    };

    const chooseDepartEvent = (e: any) => {
        console.log('DEPART_CHOOSE: ', e.target.value);
        //console.log('DEPART_CHOOSE_REF: ', e.target.id);
        setChooseDepartmentNP({
            Ref: e.currentTarget.getAttribute('data-depref'),
            Description: e.target.value,
            CityRef: e.currentTarget.getAttribute('data-cityref'),
        });
    };

    //console.log('CITY_CHOOSE: ', chooseCity);
    // console.log('CITY_LIST_ARR: ', cityList);
    console.log('COST_NOVA_POSHTA: ', costNovaPoshta);
    console.log('GOODS_LIST: ', goodsOrder);
    console.log('DELIVERY_DATA: ', dataDepartmentNP);
    console.log('DELIVERY_CHOOSE: ', chooseDepartmentNP);

    return (
        <div className='basketOrder'
            onClick={cancelCityList}
        >
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
                <div className='basketColmItemLeft'
                    onClick={(e:any) => e.stopPropagation()}
                >
                    <label>місто *</label>
                    <input 
                        id="city-search"
                        type="search"  
                        name="q"
                        value={chooseCity}
                        onChange={cityInputActive}
                    />
                </div> 
                <div 
                    className='basketCityList' 
                    onClick={(e:any) => e.stopPropagation()}       
                > 
                    {cityListActive && cityList?.map((city: ICity) =>
                        <div className='basketCityListItem'
                            data-delivery={city.DeliveryCity}
                            data-city={city.MainDescription}
                            onClick={cityChooseActive}
                            key={city.Present}>
                        <label htmlFor={city.Present}>
                            <input 
                                id={city.Present}
                                value={city.Present}
                                type='radio'
                                name='city_list'
                            />
                            {city.Present}
                        </label>    
                        </div>
                        )
                    }
                </div>     
                <div className='basketColmItemLeft'>
                    <span>Доставка:</span>
                    { takeOut ?
                    <SelectRadio 
                        radioData={{
                            value: "samoviviz",
                            radioName: "Самовивіз",
                            name: "delivery",    
                        }} 
                        addOptions={delivery === "samoviviz" ?? false}
                        direction={"column"} 
                        activeOptions={checkedRadio}
                        >
                        { delivery === "samoviviz" ?    
                        "Доступно для самовивізу в м. Харків. Деталі повідомить менеджер" 
                        : null} 
                    </SelectRadio> 
                    : null 
                    }
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
                    </SelectRadio>
                    { delivery === "novaPoshta" ?    
                        <div 
                            className='basketDepartList' 
                            onClick={(e:any) => e.stopPropagation()}       
                        > 
                            <select 
                            //htmlFor={depart.SiteKey}

                                
                                id='select-depart'
                                onChange={chooseDepartEvent}
                            >
                                <option value=''>
                                    --віберіть відділення--
                                </option>
                        {dapartList?.map((depart: IDepart) =>
                                <option 
                                    //id={depart.Ref}
                                    value={depart.Description}
                                    data-depref={depart.Ref}
                                    data-cityref={depart.CityRef}
                                    //type='radio'
                                    //name='city_list'
                                    
                                    key={depart.SiteKey}
                                    
                                >
                                {depart.Description}
                                </option>
                            )
                        }
                        </select>    
                        </div>
                        // </div>      
                    : null}
                    <SelectRadio 
                        radioData={{
                            value: "delivery", 
                            radioName: "Делівері",
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
                    { sumGoods && goodsOrder ?
                       <span>{`Сумма за товари у кількості
                        ${goodsOrder?.reduce((sum, current) => ( sum + current.quantity), 0)} од: 
                        ${sumGoods}  грн`
                        }
                        </span> 
                        : null
                    }
                    {dopGarantySum ?
                        <span>Додаткова Гарантія: {dopGarantySum}грн</span>
                        : null
                    }
                    {delivery === "novaPoshta" && chooseCity ?
                        <span>Доставка (Нова Пошта): {}
                        {deliverySum}
                        грн </span>
                        : null
                    }
                    {commisionPay ?
                        <span>Комісія платіжної системи: {commisionPay}грн</span>
                        : null
                    }
                    <span>Всього: {
                        sumOverall?.reduce((sum: number, current: number) => ( sum + current), 0)
                    }грн
                    </span> 
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