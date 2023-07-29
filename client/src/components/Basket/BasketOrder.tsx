import React, {Fragment, useCallback, useContext, useEffect, useState} from 'react';
import '../../css/BasketCss/BasketOrder.css';
import ButtonAction from '../buttons/ButtonAction';
import TyresCardList from '../cards/TyresCardList';
import SelectRadio from '../select/SelectRadio';
import InputDataText from '../ux/InputDataText';
import InputDataTel from '../ux/InputDataTel';
import { yieldToMain } from '../../restAPI/postTaskAdmin';
import { getBasketOrder, getSupplierById, removeBasketStorageGoods, updateBasket, updateBasketStorageGoods } from '../../restAPI/restGoodsApi';
import { getCalcPriceNovaPoshta, getCityNovaPoshta, getWareHousesNovaPoshta } from '../../restAPI/restNovaPoshtaAPI';
import { IDapertmentNP } from './types/DepartmentType.type';
import { ICity } from './types/CityNP.type';
import { IDepart } from './types/DaprtNP.type';
import { CalcNovaPoshta } from '../../restAPI/types/CalcNovaPoshta.type';
import { cargoTypesNovaPoshta } from '../../services/cargoTypesNovaPoshta';
import { tyresDiameter } from '../../services/tyresDiameterNovaPoshta';
import { wheelsDiameter } from '../../services/wheelsDiameterNovaPoshta';
import { Context } from '../../context/Context';
import { observer } from 'mobx-react-lite';
import CheckboxBtn from '../select/CheckboxBtn';

// type IQuantity = {
//     quantity: number;
//     id_basket_storage: number; 
// };

// type IRemoveGoods = {
//     id_basket_storage: number; 
// };
type IbasketData = {
    name?: string | null,
    phone?: number | null,
    email?: string | null,
    address?: string | null,
    notes?: string | null,
    storage?: string | null,
    delivery?: string | null,
    city_delivery?: string | null,
    ref_city_delivery?: string,
    pay_view?: string | null,
    dop_garanty?: number | null,
    session_id?: string | null,
    checkedIn?: boolean,
    id_customer?:number | null,
    id_basket: number | null,
    basket_storage?: [],
    createdAt?: string | null,
    updatedAt?: string | null,
    DeliveryCity?: string | null,
    MainDescription: string | null,
};

const BasketOrder = observer(() => {
    const {customer, page} = useContext<any | null>(Context);
    const [basketData, setBasketData] = useState<IbasketData>(
        // {
        //     name: null,
        //     phone: null,
        //     email: null,
        //     address: null,
        //     notes: null,
        //     storage: null,
        //     delivery: null,
        //     city_delivery: null,
        //     ref_city_delivery: null,
        //     pay_view: null,
        //     dop_garanty: null,
        //     checkedIn: false,
        //     id_customer: null,
        //     id_basket: null
        // }
    );
    const [delivery, setDelivery] = useState<string>();
    const [goodsBasket, setGoodsBasket] = useState<any[]>();
    const [cityList, setCityList] = useState<ICity[]>();
    const [dapartList, setDepartList] = useState<IDepart[]>();
    const [cityListActive, setCityListActive] = useState<boolean>(false);
    const [chooseDepartmentNP, setChooseDepartmentNP] = useState<IDepart>()
    const [inputCity, setInputCity] = useState<string>();
    const [chooseCity, setChooseCity] = useState<string>();
    const [dataDepartmentNP, setDataDepartmentNP] = useState<IDapertmentNP>();
    const [takeOut, setTakeOut] = useState<boolean>(false);
    const [costNovaPoshta, setCostNovaPoshta] = useState<any[]| null>([]);
    const [sumGoods, setSumGoods]= useState<number|null>(null);
    const [dopGarantySum, setDopGarantySum] = useState<number|null>(null);
    const [commisionPay, setCommitionPay] = useState<number|null>(0);
    //const [newQuantity, setNewQuantity] = useState<IQuantity|null>(null);
    //const [removeGoods, setRemoveGoods] = useState<IRemoveGoods | null>(null);
    const [bonusUser, setBonusUser] = useState<number|null>(null);
    const [sumOverall, setSumOverall] = useState<any[]>();
    const [deliverySum, setDeliverySum] = useState<number|null>(0);
    const [payMethod, setPayMethod] = useState<string | null>();


    useEffect(() => {
        let isMounted = false;
        const basketOrder = async () => {
          const taskBasketSession: any[] = [
            getBasketOrder,
          ];
        let i: number = 0; 
        while (taskBasketSession.length > i) {
            if (!isMounted && taskBasketSession[i] === getBasketOrder) {
            const getBasket: any = await taskBasketSession[i]();
                if (getBasket) {
                    console.log('GET_BASKET_SESSION: ', getBasket)
                    setBasketData({
                        ...getBasket,
                        id_customer: customer.id_customer,
                    });
                    setGoodsBasket([...getBasket?.basket_storage.sort(
                        (a: any, b: any) => (+b.id_basket_storage) - (+a.id_basket_storage)
                    )]);
                }
            }
          const task = taskBasketSession.shift();
          task();
          await yieldToMain();
        }
        };
        basketOrder();
        return () => {
          isMounted = true;
        };
    },[customer.id_customer]);

    useEffect(() => {
        let isMounted = false;
        const delivery = async () => {
          const taskUpdateBasket: any[] = [
                getCityNovaPoshta,
                getWareHousesNovaPoshta,
                //updateBasket
            ];
            let i: number = 0; 
            while (taskUpdateBasket.length > i) {
            if (!isMounted && 
                taskUpdateBasket[i] === getCityNovaPoshta && inputCity) {
                const getCity: any = await taskUpdateBasket[i](inputCity);
                if (getCity?.success) {
                setCityList([...getCity?.data[0].Addresses]); 
                console.log('CITY_LIST: ', getCity.data[0].Addresses);
                }
            }
            if (!isMounted && 
                taskUpdateBasket[i] === getWareHousesNovaPoshta && dataDepartmentNP) {
                const getDapartNP: any = await taskUpdateBasket[i](dataDepartmentNP);
                if (getDapartNP?.success) {
                setDepartList([...getDapartNP?.data]); 
                console.log('DAPART_LIST: ', getDapartNP.data);
                }
            }
            
            // if (!isMounted && taskUpdateBasket[i] === updateBasket && 
            // (basketData?.name || basketData?.phone || basketData?.email || 
            //     delivery || chooseCity
            // )) {
            //     console.log('UPDATE_ID_BASKET: ', basketData?.id_basket);
            //     const getUpdateBasket: any = await taskUpdateBasket[i]({
            //         name: basketData?.name,
            //         phone: basketData?.phone,
            //         email: basketData?.email,
            //         address: chooseCity,
            //         notes: basketData?.notes,
            //         storage: basketData?.storage,
            //         delivery: delivery,
            //         city_delivery: dataDepartmentNP?.MainDescription,
            //         ref_city_delivery: dataDepartmentNP?.DeliveryCity,
            //         pay_view: payMethod,
            //         dop_garanty: dopGarantySum,
            //         checkedIn: false,
            //         id_customer: customer.id_customer,
            //         id_basket: basketData?.id_basket,
            //     });
                
            //     console.log('UPDATE_BASKET: ', getUpdateBasket.data);
            // }
            const task = taskUpdateBasket.shift();
            task();
            await yieldToMain();
            }
        };
        delivery();
        return () => {
          isMounted = true;
        };
    },[
        //basketData,
        chooseCity,
        customer.id_customer,
        dataDepartmentNP,
        dopGarantySum,
        inputCity,
    ]);

    useEffect(() => {
        let isMounted = false;
        if (!isMounted) {
            setSumGoods(Number(
            goodsBasket?.reduce((sum, current) => ( sum + current.total), 0).toFixed()));
        }
        if (!isMounted && costNovaPoshta?.length !== 0) {
            setDeliverySum(Number(
                (25 + ( goodsBasket?.reduce((sum, current) => ( sum + current.total), 0)) * 0.01 +
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
        // if (!isMounted && payMethod === "nalogka") {
        //     basketSupplierGoods(basketData?.city_delivery, basketData);
        // }
        return () => {
            isMounted = true;
          };
    },[
        //basketData,
        //basketSupplierGoods, 
        commisionPay,
        costNovaPoshta, 
        delivery,
        deliverySum, 
        dopGarantySum, 
        goodsBasket, 
        payMethod, 
        sumGoods
    ]);

    const basketSupplierGoods = async (city?: string | null, depart?: IDapertmentNP | IbasketData)  => {
        let dataSupplier: CalcNovaPoshta | null = {};
        let taskGetSupplier: any[] | null = [
            ...goodsBasket!
        ];
        // if (costNovaPoshta?.length !== 0) { 
        //     setCostNovaPoshta([]); 
        // }  
        let i: number = 0; 
        while (taskGetSupplier.length > i) {
            console.log(`SUPPLIER_${i}: `, taskGetSupplier[i]?.id_supplier);
            let getCitySup: any = await getSupplierById(
                taskGetSupplier[i]?.id_supplier
            );
            
            let cityNovaPoshta = await getCityNovaPoshta(getCitySup.city_ua);
            let dataSupByCity = cityNovaPoshta?.data[0]?.Addresses.find(
                (item: any) => item.MainDescription === getCitySup.city_ua);
            
            dataSupplier.citySender = dataSupByCity.DeliveryCity;
            dataSupplier.goodsQuantity = taskGetSupplier[i].quantity;
            dataSupplier.cityReceiver = depart?.DeliveryCity ?? depart?.ref_city_delivery;
            dataSupplier.goodsCost = String(taskGetSupplier[i].price * taskGetSupplier[i].quantity);
            if (basketData?.pay_view === "nalogka") {
                dataSupplier.redeliveryCost = 
                String(taskGetSupplier[i].price * taskGetSupplier[i].quantity);  
            } else {
                dataSupplier.redeliveryCost = String(1);
            }
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
            if (getCitySup.city_ua === 'Київ' && city?.includes('м. Київ')) {
                setTakeOut(true); 
                console.log('CITY_KIYV: ', true);
            } else {
                setTakeOut(false); 
            }
            taskGetSupplier.shift();
        };
        dataSupplier = null;
        //taskGetSupplier = null;
    }

    const acceptInput = async (value: string, mask: {
        masked: any; arg: any
        }) => {
        const updateBasketPhone = await updateBasket(
            {...basketData,
                phone: mask.masked.unmaskedValue,
                id_basket: basketData?.id_basket, 
            }
        );
        console.log('UPDATE_BASKET_PHONE: ', updateBasketPhone);
        // console.log(mask.masked.rawInputValue + ":rawInput");
        // console.log(mask.masked.rawInputValue.length + ":rawInputLength");
        if (updateBasketPhone?.status === 200) {
          setBasketData({...updateBasketPhone?.data})  
        }
        
        // console.log(mask.masked.unmaskedValue + ":unmaskValue"); // Need it
        // console.log(value + " :VALUE")
    };
       
    const checkedRadioDelivery = async (e: any) => {
        setDelivery(e.currentTarget.value);
        const updateBasketDelivery = await updateBasket(
            {...basketData,
                delivery: e.target.textContent,
                id_basket: basketData?.id_basket, 
            }
        );
        if (updateBasketDelivery?.status === 200) {
            setBasketData({...updateBasketDelivery?.data})  
        }
    };

    const checkedRadioPayment = async (e: any) => {

        setCostNovaPoshta([]);
        setPayMethod(e.currentTarget.value);
        const updateBasketPay = await updateBasket(
            {...basketData,
                pay_view: e.target.textContent,
                id_basket: basketData?.id_basket, 
            }
        );
        if (updateBasketPay?.status === 200) {
            setBasketData({
                ...updateBasketPay?.data
            })  
        }
        // if (costNovaPoshta?.length !== 0) { 
        //     setCostNovaPoshta(null); 
        // } 
        basketSupplierGoods(basketData?.city_delivery, basketData);
    };

    const cityInputActive = (e: any) => {
        //console.log('CITY_INPUT: ', e.currentTarget.value);
        setInputCity(e.currentTarget.value);
        setChooseCity(e.currentTarget.value);
        setCityListActive(true);
    };

    const cityChooseActive = async (e: any) => {
        //console.log('CITY_CHOOSE: ', e.target.textContent);
        setCostNovaPoshta([]);
        //console.log('CITY_INPUT: ', e.target.textContent);
        //setCostNovaPoshta([]);
        setChooseCity(e.target.textContent);
        setDataDepartmentNP({
            MainDescription: e.currentTarget.getAttribute('data-city'),
            DeliveryCity: e.currentTarget.getAttribute('data-delivery'),
        });
        setCityListActive(false);
        basketSupplierGoods(
            e.target.textContent, 
            {
                MainDescription: e.currentTarget.getAttribute('data-city'),
                DeliveryCity: e.currentTarget.getAttribute('data-delivery'),
            } 
        );
        const updateBasketCityDelivery = await updateBasket(
            {...basketData,
                address: e.target.textContent,
                city_delivery: e.currentTarget.getAttribute('data-city'),
                ref_city_delivery: e.currentTarget.getAttribute('data-delivery'),
                id_basket: basketData?.id_basket, 
            }
        );
        if (updateBasketCityDelivery?.status === 200) {
            setBasketData({...updateBasketCityDelivery?.data})  
        }
    };

    const cancelCityList = () => {
        //setChooseCity('');
        setInputCity('');
        setCityListActive(false); 

        console.log('CANCEL_INPUT');
    };

    const chooseDepartEvent = (e: any) => {
        //console.log('DEPART_CHOOSE: ', e.target.value);
        setChooseDepartmentNP({
            Ref: e.currentTarget.getAttribute('data-depref'),
            Description: e.target.value,
            CityRef: e.currentTarget.getAttribute('data-cityref'),
        });
    };

    const useBonusActive = () => {
        if (bonusUser) {
            setBonusUser(null); 
        } else {
           setBonusUser(350); 
        }
    };

    const dopGarantyActive = async () => {
        if (dopGarantySum) {
            setDopGarantySum(null);
        } else {
            setDopGarantySum(Number((sumGoods! * 0.07).toFixed()));
            const updateBasketDopGaranty = await updateBasket(
                {...basketData,
                    dop_garanty: Number((sumGoods! * 0.07).toFixed()),
                    id_basket: basketData?.id_basket, 
                }
            );
            if (updateBasketDopGaranty?.status === 200) {
                setBasketData({...updateBasketDopGaranty?.data})  
            }
        }
    };
    const removeGoodsAction = async (e: any) => {
        try {
            await removeBasketStorageGoods(e.target.getAttribute('data-id'));
        
            //console.log('REMOVE_ITEM: ', removeItem);
            const removeBasketGoods: any = await getBasketOrder();
            //console.log('REMOVE_GOODS_UPDATE: ', removeBasketGoods)
            if (removeBasketGoods?.basket_storage) {
                setGoodsBasket([...removeBasketGoods?.basket_storage.sort(
                    (a: any, b: any) => (+b.id_basket_storage) - (+a.id_basket_storage)
                )]);
                page.setBasketCount(
                    removeBasketGoods?.basket_storage.reduce(
                        (sum: any, current: any) => (sum + current.quantity),0)
                    );
            } else {
                setGoodsBasket([]);
                page.setBasketCount(0);
            }    
        } catch (error) {
            console.log('REMOVE_ITEM_FROM_BASKER_ERROR: ', error);
        }
    };

    const countQuantytiAction = async (e: any) => {
        try {
            if (e.target.value === 'plus') {
            const updateQuantityPlus = await updateBasketStorageGoods({
                quantity: Number(e.target.getAttribute('data-count')) + 1,
                id_basket_storage: e.target.getAttribute('data-id') 
            })
                if (updateQuantityPlus) {
                    const getUpdateBasketPlus: any = await getBasketOrder();
                    setGoodsBasket([...getUpdateBasketPlus?.basket_storage.sort(
                        (a: any, b: any) => (+b.id_basket_storage) - (+a.id_basket_storage)
                    )]);
                    page.setBasketCount(
                        getUpdateBasketPlus?.basket_storage.reduce(
                            (sum: any, current: any) => (sum + current.quantity),0)
                    );
                }
            }
            if (e.target.value === 'minus') {
                const updateQuantityMinus = await updateBasketStorageGoods({
                    quantity: Number(e.target.getAttribute('data-count')) - 1,
                    id_basket_storage: e.target.getAttribute('data-id') 
                })
                if (updateQuantityMinus) {
                    const getUpdateBasketMinus: any = await getBasketOrder();
                    setGoodsBasket([...getUpdateBasketMinus?.basket_storage.sort(
                        (a: any, b: any) => (+b.id_basket_storage) - (+a.id_basket_storage)
                    )]);
                    page.setBasketCount(
                        getUpdateBasketMinus?.basket_storage.reduce(
                        (sum: any, current: any) => (sum + current.quantity),0)
                    );
                }
            }
        } catch (error) {
            console.log('BASKET_QUANTITY_ITEM_ERROR: ',error);
        }
    };
    const inputNameAction = async (e:any) => {
        const updateBasketName = await updateBasket(
            {...basketData,
                name: e.target.value,
                id_basket: basketData?.id_basket, 
            }
        );
        if (updateBasketName?.status === 200) {
          setBasketData({...updateBasketName?.data})  
        }
    };

    const inputEmailAction = async (e:any) => {
        const updateBasketEmail = await updateBasket(
            {...basketData,
                email: e.target.value,
                id_basket: basketData?.id_basket, 
            }
        );
        if (updateBasketEmail?.status === 200) {
          setBasketData({...updateBasketEmail?.data})  
        }
    };
    console.log('PAY_METOD: ', payMethod);
    //console.log('CITY_CHOOSE: ', chooseCity);
    console.log('DELIVERY_SUM: ', deliverySum);
    console.log('BASKET_DATA:', basketData);
    console.log('COST_NOVA_POSHTA: ', costNovaPoshta);
    console.log('GOODS_BASKET_ARRAY: ', goodsBasket);
    console.log('DELIVERY_DATA: ', dataDepartmentNP);
    console.log('DELIVERY_CHOOSE: ', chooseDepartmentNP);

    return (
        <div>
        {page.basketCount !== 0 ?   
        <div className='basketOrder'
            onClick={cancelCityList}
        >
            <span> Оформлення замовлення</span>
            <div className='basketColmLeft'>
                <span>Данні замовлення</span>
                <div className='basketColmItemLeft'>
                    <span>Прізвище ім'я та по батькові *</span>
                    <InputDataText 
                        inputText={inputNameAction}
                        inputItem={{
                        name:'basketOrderName',
                        discr:"введіть прізвище ім'я по батькові",
                        max:"40", size:"30"
                        }}
                    />   
                </div>
                <div className='basketColmItemLeft'>
                    <span>Номер телефону *</span>
                    <InputDataTel 
                        dataTel={basketData?.phone}
                        onAccept={acceptInput} 
                        //ref={refComp}
                    />  
                </div>
                <div className='basketColmItemLeft'>
                    <span>Ваш email адрес</span>
                    <InputDataText 
                        inputText={inputEmailAction}
                        inputItem={{
                            name:'basketOrderEmail',
                            discr:"введіть ваш email адрес ---@---",
                            max:"40", size:"30"
                            }}
                        />     
                </div>
                <div className='basketColmItemLeft'
                    onClick={(e:any) => e.stopPropagation()}
                >
                    <label className='basketInputSearchCityLabel'>
                        місто *
                    </label>
                    <input 
                        id="city-search"
                        className='basketInputSearchCity'
                        type="search"  
                        name="q"
                        placeholder='Введіть місто'
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
                    <span>Спосіб одержання (доставка):</span>
                    { takeOut ?
                    <SelectRadio 
                        radioData={{
                            value: "samoviviz",
                            radioName: "Самовивіз",
                            name: "delivery",    
                        }} 
                        addOptions={delivery === "samoviviz" ?? false}
                        direction={"column"} 
                        activeOptions={checkedRadioDelivery}
                        disabled={chooseCity ? false : true}
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
                        activeOptions={checkedRadioDelivery}
                        disabled={chooseCity ? false : true}
                    > 
                    </SelectRadio>
                    { delivery === "novaPoshta" && chooseCity ?    
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
                        {chooseCity && dapartList?.map((depart: IDepart) =>
                                <option 
                                    //id={depart.Ref}
                                    key={depart?.SiteKey}
                                    value={depart?.Description}
                                    data-depref={depart?.Ref}
                                    data-cityref={depart?.CityRef}
                                    //type='radio'
                                    //name='city_list'
                                >
                                {depart?.Description}
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
                        activeOptions={checkedRadioDelivery}
                        disabled={chooseCity ? false :true}
                        >
                    </SelectRadio>
                </div>
                <div className='basketColmItemLeft'>
                    <span>Спосіб оплати:</span>
                    <SelectRadio 
                        radioData={{
                            value: "gotivka", 
                            radioName: "Готівкою",
                            name: "pay",
                        }} 
                        addOptions={""}
                        direction={"column"} 
                        disabled={delivery === "samoviviz" &&
                            chooseCity ? false :true
                        }
                        activeOptions={checkedRadioPayment}
                        //checked={checkedRadioDelivery}
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
                        disabled={
                            delivery &&
                            chooseCity ? false :true
                        }
                        activeOptions={checkedRadioPayment}
                        //checked={checkedRadioDelivery}
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
                        disabled={
                            delivery &&
                            chooseCity ? false :true
                        }
                        activeOptions={checkedRadioPayment}
                        //checked={checkedRadioDelivery}
                        >
                    </SelectRadio>
                    <SelectRadio 
                        radioData={{
                            value: "nalogka", 
                            radioName: "Зворотній платіж (Післяплата)",
                            name: "pay",
                        }} 
                        addOptions={""}
                        direction={"column"} 
                        disabled={
                            delivery === "novaPoshta" &&
                            chooseCity ? false :true
                        }
                        activeOptions={checkedRadioPayment}
                        //checked={checkedRadioDelivery}
                        >
                    </SelectRadio>
                </div> 
            </div>
            <div className='basketColmRight'>
                <span>Товар і ціна 
                остаточна сумма замовлення
                </span>
                <div className='basketColmRightListGoods'>
                    {goodsBasket?.length !== 0 ? goodsBasket?.map((item: any) =>
                       <div key={item.id + 'cart'}
                        className='itemGoodsBasket'>
                            <TyresCardList 
                            goods={item}
                            forOrder={true}
                            priceItem={item.price}
                            countEvent={countQuantytiAction}
                            />
                             <div 
                                data-id={item.id_basket_storage} 
                                onClick={removeGoodsAction}
                                className='basketColmRightClose'
                            >
                            </div> 
                        </div>
                        ) : null
                    }
                </div>
                <div className='basketColmRightCheckbox'>
                    <CheckboxBtn 
                        value={'Використати SKY BONUS'} 
                        titleCheckbox={'Використати SKY BONUS'} 
                        imageSrc={ bonusUser ?
                            'iconBonus/referral_bonus_edit_b.png' :
                            'iconBonus/referral_bonus_edit.png'
                        }
                        onChange={useBonusActive}
                    />
                    <CheckboxBtn 
                        value={'Додаткова гарантія SKY SAFE'}
                        imageSrc={ dopGarantySum ? 
                            'iconGuard/guard_64_b.png' :
                            'iconGuard/guard_64_g.png' 
                        } 
                        titleCheckbox={'Додаткова гарантія SKY SAFE'} 
                        onChange={dopGarantyActive}
                    />
                    {dopGarantySum ?
                    <span className='basketOrderDopGar'>{dopGarantySum} &#8372;</span>
                    : null}
                </div>
                
                <div className='totalCount'>
                    { sumGoods && goodsBasket ?
                        <span>
                        <span>Сумма за товари у кількості</span>
                        <span> { goodsBasket?.reduce((sum, current) => ( sum + current.quantity), 0)} од: </span> 
                        <span className='basketOrderSumGoods'> {sumGoods}&#8372;</span> 
                        </span>
                        : null
                    }
                    <span>Нараховано SKY BONUS 
                         {sumGoods! > 20000 ? (sumGoods! * 0.01).toFixed() : (sumGoods! * 0.02).toFixed()} 
                        <img 
                            src='iconBonus/referral_bonus_edit_b.png'
                            width={35}
                            height={35}
                            alt='skyBonus'
                        />
                    </span>
                    {dopGarantySum ?
                        <span>Додаткова Гарантія: <span className='basketOrderDopGar'>{dopGarantySum}&#8372;</span></span>
                        : null
                    }
                    {delivery === "novaPoshta" && chooseCity ?
                        <span>Доставка (Нова Пошта): {}
                            <span className='basketOrderDelPrice'>{deliverySum} &#8372;</span>
                        </span>
                        : null
                    }
                    {commisionPay ?
                        <span>Комісія платіжної системи: {commisionPay}грн</span>
                        : null
                    }
                    { !bonusUser ?
                        <span>Всього: {
                            sumOverall?.reduce((sum: number, current: number) => ( sum + current), 0)
                            }&#8372;
                        </span> :
                        <>
                        <span>Всього:
                        <span className='basketOrderOldPrice'> {
                            sumOverall?.reduce((sum: number, current: number) => ( sum + current), 0)
                            }&#8372;
                        </span>
                            
                        </span>
                        <span className='basketOrderNewPrice'>
                            {sumOverall?.reduce((sum: number, current: number) => ( sum + current), 0) - bonusUser}
                            &#8372;
                        </span>
                        </>
                    }
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
             : 
                <div className='noBasketGoods'> 
                    НАЖАЛЬ КОРЗИНА ПОРОЖНЯ =\ 
                </div>
            }    
        
        </div>
    );
});

export default BasketOrder;