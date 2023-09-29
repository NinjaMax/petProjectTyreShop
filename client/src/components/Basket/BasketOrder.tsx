import React, {Fragment, useContext, useEffect, useState} from 'react';
import '../../css/BasketCss/BasketOrder.css';
import ButtonAction from '../buttons/ButtonAction';
import TyresCardList from '../cards/CardList';
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
import { createGoodsToOrder, responseForm } from '../../restAPI/restAdminAPI';
import { CreateGoods } from '../adminComponents/adminModalForm/types/CreateGoods.type';
import Modal from '../modal/Modal';
import ErrorsNotif from '../notifications/ErrorsNotif';
import SuccessNotif from '../notifications/SuccessNotif';
import { useHistory } from 'react-router-dom';
import { getCalcPriceDelivery, getCityDelivery, getWareHousesDelivery } from '../../restAPI/restDeliveryAPI';
import { ICityDel } from './types/CityDelivery.type';
import { IDapertmentDelivery } from './types/DepartmentDelivery.type';
import { cargoTypesDelivery } from '../../services/cargoTypesDelivery';
import { tyresCarDiameterDelivery, tyresCargoDiameterDelivery } from '../../services/tyresDiameterDelivery';

type IbasketData = {
    name?: string,
    phone?: number | null,
    email?: string | null,
    address?: string | null,
    notes?: string | null,
    storage?: string | null,
    delivery?: string | null,
    delivery_dep?: string | null,
    delivery_dep_ref?: string | null,
    city_delivery?: string | null,
    ref_city_delivery?: string,
    pay_view?: string | null,
    dop_garanty?: number | null,
    session_id?: string | null,
    checkedIn?: boolean,
    id_customer?:number | null,
    id_basket?: number | null,
    basket_storage?: any[],
    createdAt?: string | null,
    updatedAt?: string | null,
    DeliveryCity?: string | null,
    MainDescription?: string | null,
    commission_cost?: number | null,
    delivery_cost?: number | null,
    bonus_decrease?: number | null,
    total_cost?: number | null,
    id?: string | null,
    regionName?: string | null,
    regionId?: string | null,
};

const BasketOrder = observer(() => {
    const {customer, page} = useContext<any | null>(Context);
    const [basketData, setBasketData] = useState<IbasketData>();
    const [delivery, setDelivery] = useState<string>();
    const [goodsBasket, setGoodsBasket] = useState<any[]>();
    const [cityList, setCityList] = useState<ICity[]>();
    const [cityListDelivery, setCityListDelivery] = useState<any[]>();
    const [departListNovaPoshta, setDepartListNovaPoshta] = useState<IDepart[]>();
    const [departListDelivery, setDepartListDelivery] = useState<IDepart[]>();
    const [cityListActive, setCityListActive] = useState<boolean>(false);
    const [chooseDepartmentNP, setChooseDepartmentNP] = useState<any>();
    const [chooseDepartmentDelivery, setChooseDepartmentDelivery] = useState<IDapertmentDelivery>();
    const [inputCity, setInputCity] = useState<string>();
    const [chooseCity, setChooseCity] = useState<string>();
    const [dataDepartmentNP, setDataDepartmentNP] = useState<IDapertmentNP>();
    const [dataDepartmentDelivery, setDataDepartmentDelivery] = useState<IDapertmentDelivery>();
    const [takeOut, setTakeOut] = useState<boolean>(false);
    const [costNovaPoshta, setCostNovaPoshta] = useState<any[]| null>([]);
    const [sumGoods, setSumGoods]= useState<number|null>(null);
    const [dopGarantySum, setDopGarantySum] = useState<number|null>(null);
    const [commisionPay, setCommitionPay] = useState<number|null>(0);
    const [newOrder, setNewOrder] = useState<boolean>(false);
    const [getError, setGetError] = useState<boolean>(false);
    const [bonusUser, setBonusUser] = useState<number|null>(null);
    const [sumOverall, setSumOverall] = useState<any[]>();
    const [deliverySum, setDeliverySum] = useState<number | null>(0);
    const [payMethod, setPayMethod] = useState<string | null>();
    const [getIdOrder, setGetIdOrder] = useState<number>();

    useEffect(() => {
        let isMounted = false;
        const basketOrder = async () => {
          const taskBasketSession: any[] = [
            getBasketOrder,
          ];
        let i: number = 0; 
        while (taskBasketSession.length > i) {
            if (!isMounted && taskBasketSession[i] === getBasketOrder && page.basketCount !== 0) {
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
    },[customer.id_customer, page.basketCount]);

    const basketSupplierGoods = async (
        depart?: IbasketData,
        redeliveryCost?: string
        )  => {
        let dataSupplier: CalcNovaPoshta | null = {};
        let taskGetSupplier: any[] | null = [
        ...goodsBasket!
        ];
 
        let i: number = 0; 
        while (taskGetSupplier.length > i) {
        let getCitySup: any = await getSupplierById(
            taskGetSupplier[i]?.id_supplier
        );
    
        let citySupNovaPoshta = await getCityNovaPoshta(getCitySup.city_ua);
        let citySupDelivery = await getCityDelivery(getCitySup.city_ua);//new
        let dataSupByCity = citySupNovaPoshta?.data[0]?.Addresses.find(
        (item: any) => item.MainDescription === getCitySup.city_ua);
        let dataSupByCity0 = citySupDelivery?.data?.find(
            (item: any) => item.name === getCitySup.city_ua
        );//new
    
        dataSupplier.citySender = dataSupByCity?.DeliveryCity ?? dataSupByCity0.id;
        dataSupplier.warehouseSender = depart?.id;
        dataSupplier.goodsQuantity = taskGetSupplier[i].quantity;
        dataSupplier.cityReceiver = depart?.ref_city_delivery;
        dataSupplier.warehouseReceiver = depart?.id; //new

        dataSupplier.goodsCost = String(taskGetSupplier[i].price * taskGetSupplier[i].quantity);

        if (redeliveryCost === 'Зворотній платіж (Післяплата)') {
        dataSupplier.redeliveryCost = 
        String(taskGetSupplier[i].price * taskGetSupplier[i].quantity);  
        } else {
        dataSupplier.redeliveryCost = String(1);
        }
        if (delivery === 'Нова Пошта') {

        }
        let goodsTypeRef = cargoTypesNovaPoshta(taskGetSupplier[i].category);
        dataSupplier.goodsType = goodsTypeRef;
        let goodsTypeRefDelivery = cargoTypesDelivery(taskGetSupplier[i].category);

        if (goodsTypeRef === "Cargo" && delivery === 'Нова Пошта') {
            console.log('CARGO_TYPE');
        }
        if (goodsTypeRef === "TiresWheels" && delivery === 'Нова Пошта') {
            let tyreDiameterRef = tyresDiameter(taskGetSupplier[i].diameter);
            dataSupplier.goodsDescription = tyreDiameterRef;
        }
        if (goodsTypeRef === "TiresWheels" && taskGetSupplier[i].category === "диски"
        && delivery === 'Нова Пошта') {
            let wheelsDiameterRef = wheelsDiameter(taskGetSupplier[i].diameter);
            dataSupplier.goodsDescription = wheelsDiameterRef;
        }

        if (goodsTypeRefDelivery === "Cargo" && delivery === 'Делівері') {
            console.log('CARGO_TYPE');
        }
        if (goodsTypeRefDelivery === "Battery" && delivery === 'Делівері') {
            console.log('Battery_TYPE');
        }
        if (goodsTypeRefDelivery === "TiresWheelsCar" && taskGetSupplier[i].category === "легковые шины" && delivery === 'Делівері') {
            let tyreDiameterRef = tyresCarDiameterDelivery(taskGetSupplier[i].diameter);
            dataSupplier.goodsDescription = tyreDiameterRef;
        }
        if (goodsTypeRefDelivery === "TiresWheelsCargo" && taskGetSupplier[i].category === "грузовые шины" && delivery === 'Делівері') {
            let tyreDiameterRef = tyresCargoDiameterDelivery(taskGetSupplier[i].diameter);
            dataSupplier.goodsDescription = tyreDiameterRef;
        }
        if (goodsTypeRefDelivery === "TiresWheelsCar" && taskGetSupplier[i].category === "диски"
        && delivery === 'Делівері' && taskGetSupplier[i].diameter !== '17.5' && taskGetSupplier[i].diameter !== '19.5' 
        && taskGetSupplier[i].diameter < 21
        ) {
            let wheelsDiameterRef = tyresCarDiameterDelivery(taskGetSupplier[i].diameter);
            dataSupplier.goodsDescription = wheelsDiameterRef;
        }
        if (goodsTypeRefDelivery === "TiresWheelsCar" && taskGetSupplier[i].category === "диски"
        && delivery === 'Делівері' && (taskGetSupplier[i].diameter > 19 || taskGetSupplier[i].diameter !== '17.5')
        ) {
            let wheelsDiameterRef = tyresCargoDiameterDelivery(taskGetSupplier[i].diameter);
            dataSupplier.goodsDescription = wheelsDiameterRef;
        }

        if (taskGetSupplier[i] && dataSupplier) {
            let getCalcNovaPoshta = await getCalcPriceNovaPoshta(dataSupplier);
            let getCalcDelivery = getCalcPriceDelivery(dataSupplier);
            console.log(getCalcDelivery);
            if (getCalcNovaPoshta.success === true) {
                setCostNovaPoshta(oldCalc =>
                    [...oldCalc!,
                        getCalcNovaPoshta.data[0].Cost,
                        getCalcNovaPoshta.data[0].CostRedelivery,
                    ]
                );
            }             
            if (getCitySup.city_ua === 'Харків' && depart?.address?.includes('м. Київ')) {
                setTakeOut(true); 
            } else {
                setTakeOut(false); 
            }
        }
        taskGetSupplier.shift();
        };
        dataSupplier = null;
    }

    useEffect(() => {
        let isMounted = false;
        const delivery = async () => {
          const taskUpdateBasket: any[] = [
                getCityNovaPoshta,
                getCityDelivery,
                getWareHousesNovaPoshta,
                getWareHousesDelivery,
                updateBasket,
            ];
            let i: number = 0; 
            while (taskUpdateBasket.length > i) {
            if (!isMounted && 
                taskUpdateBasket[i] === getCityNovaPoshta && inputCity) {
                const getCity: any = await taskUpdateBasket[i](inputCity);
                if (getCity?.success) {
                    setCityList([...getCity?.data[0].Addresses]); 
                }
            }
            if (!isMounted && 
                taskUpdateBasket[i] === getCityDelivery && inputCity) {
                const getCity: any = await taskUpdateBasket[i](inputCity);
                if (getCity?.data) {
                    setCityListDelivery([...getCity?.data]); 
                }
            }
            if (!isMounted && 
                taskUpdateBasket[i] === getWareHousesNovaPoshta && dataDepartmentNP) {
                const getDapartNP: any = await taskUpdateBasket[i](dataDepartmentNP);
                if (getDapartNP?.success) {
                    setDepartListNovaPoshta([...getDapartNP?.data]);
                }
            }
            if (!isMounted && 
                taskUpdateBasket[i] === getWareHousesDelivery && dataDepartmentDelivery) {
                const getDapartDelivery: any = await taskUpdateBasket[i](dataDepartmentDelivery?.id);
                if (getDapartDelivery?.data) {
                    setDepartListDelivery([...getDapartDelivery?.data]);
                }
            }
            if (!isMounted && 
                taskUpdateBasket[i] === updateBasket) {
                const updateBasket = await taskUpdateBasket[i]({...basketData});
                console.log('UPDATE_BASKET_DATA: ', updateBasket.data);
            }

            const task = taskUpdateBasket.shift();
            task();
            await yieldToMain();
            }
        };
        delivery();
        return () => {
          isMounted = true;
        };
    },[basketData, dataDepartmentNP, dataDepartmentDelivery, inputCity]);

    useEffect(() => {
        let isMounted = false;
        if (!isMounted) {
            setSumGoods(Number(
            goodsBasket?.reduce((sum, current) => ( sum + current.total), 0).toFixed()));
            console.log('sumGoods: ', sumGoods);
        }
        if (!isMounted && costNovaPoshta?.length !== 0) {
            setDeliverySum(Number(
                (25 + ( goodsBasket?.reduce((sum, current) => ( sum + current.total), 0)) * 0.01 +
               costNovaPoshta?.reduce((sum: number, current: number) => ( sum + current), 0)
                ).toFixed())
            );
            setBasketData(prevData => { return {
                ...prevData,
                commission_cost: commisionPay,
                delivery_cost: deliverySum,
                bonus_decrease: bonusUser,
                dop_garanty: dopGarantySum,
            }
            });
        };
        if (!isMounted && delivery === 'Нова Пошта') {
            setSumOverall(
                [Number(sumGoods), Number(deliverySum)]
            );
            setBasketData(prevData => { return {
                ...prevData,
                commission_cost: null,
                delivery_cost: deliverySum,
                bonus_decrease: bonusUser,
                dop_garanty: dopGarantySum,
                total_cost: bonusUser ? (sumGoods! + deliverySum!) - bonusUser :
                        sumGoods! + deliverySum!,
            }
            });
        };
        if (!isMounted && delivery === 'Нова Пошта' && dopGarantySum) {
            setSumOverall(
                [Number(sumGoods), Number(deliverySum), Number(dopGarantySum)]
            );
            setBasketData(prevData => { return {
                ...prevData,
                commission_cost: null,
                delivery_cost: deliverySum,
                bonus_decrease: bonusUser,
                dop_garanty: dopGarantySum,
                total_cost: bonusUser ? (sumGoods! + deliverySum! + dopGarantySum) - bonusUser :
                        sumGoods! + deliverySum! + dopGarantySum,
            }
            });
        };
        if (!isMounted && !delivery) {
            setSumOverall(
                [Number(sumGoods)]
            );
            setBasketData(prevData => { return {
                ...prevData,
                commission_cost: commisionPay,
                delivery_cost: deliverySum,
                bonus_decrease: bonusUser,
                dop_garanty: dopGarantySum,
                total_cost: bonusUser ? sumGoods! - bonusUser :
                        sumGoods!,
            }
            });
        };
        if (!isMounted && !delivery && dopGarantySum) {
            setSumOverall(
                [Number(sumGoods), Number(dopGarantySum)]
            );
            setBasketData(prevData => { return {
                ...prevData,
                commission_cost: commisionPay,
                delivery_cost: deliverySum,
                bonus_decrease: bonusUser,
                dop_garanty: dopGarantySum,
                total_cost: bonusUser ? (sumGoods! + dopGarantySum) - bonusUser :
                        sumGoods! + dopGarantySum,
            }
            });
        };
        if (!isMounted && delivery === 'Нова Пошта' && 
        (payMethod === 'Карткою (VISA / MASTERCARD)' || payMethod === 'Безготівковий розрахунок')) {
            setSumOverall(
                [Number(sumGoods), Number(deliverySum), Number(commisionPay)]
            );
            setBasketData(prevData => { return {
                ...prevData,
                commission_cost: commisionPay,
                delivery_cost: deliverySum,
                bonus_decrease: bonusUser,
                dop_garanty: dopGarantySum,
                total_cost: bonusUser ? (sumGoods! + deliverySum! + commisionPay!) - bonusUser :
                        sumGoods! + deliverySum! + commisionPay!,
            }
            });
        };
        if (!isMounted && !delivery  && (payMethod === 'Карткою (VISA / MASTERCARD)' || payMethod === 'Безготівковий розрахунок')) {
            setSumOverall(
                [Number(sumGoods), Number(deliverySum), Number(commisionPay)]
            );
            setBasketData(prevData => { return {
                ...prevData,
                commission_cost: commisionPay,
                delivery_cost: deliverySum,
                bonus_decrease: bonusUser,
                dop_garanty: dopGarantySum,
                total_cost: bonusUser ? (sumGoods! + deliverySum! + commisionPay!) - bonusUser :
                        sumGoods! + deliverySum! + commisionPay!,
            }
            });
        };
        if (!isMounted && delivery === 'Нова Пошта' && dopGarantySum &&
        (payMethod === 'Карткою (VISA / MASTERCARD)' || payMethod === 'Безготівковий розрахунок')) {
            setSumOverall(
                [Number(sumGoods), Number(deliverySum), Number(commisionPay), Number(dopGarantySum)]
            );
            setBasketData(prevData => { return {
                        ...prevData,
                        commission_cost: commisionPay,
                        delivery_cost: deliverySum,
                        bonus_decrease: bonusUser,
                        dop_garanty: dopGarantySum,
                        total_cost: bonusUser ? (sumGoods! + deliverySum! + commisionPay! + dopGarantySum) - bonusUser :
                        sumGoods! + deliverySum! + commisionPay! + dopGarantySum,
                    }
                }
            );
        };

        return () => {
            isMounted = true;
          };
    },[bonusUser, commisionPay, costNovaPoshta, delivery, deliverySum, dopGarantySum, goodsBasket, payMethod, sumGoods]);

    const acceptInput = async (value: string, mask: {
        masked: any; arg: any
        }) => {
        const updateBasketPhone = await updateBasket(
            {...basketData,
                phone: mask.masked.unmaskedValue,
                id_basket: basketData?.id_basket, 
            }
        );
        if (updateBasketPhone?.status === 200) {
            setBasketData({...updateBasketPhone?.data})  
        }
    };
       
    const checkedRadioDelivery = async (e: any) => {
        setDelivery(e.currentTarget.getAttribute('data-select'));
        const updateBasketDelivery = await updateBasket(
            {...basketData,
                delivery: e.currentTarget.getAttribute('data-select'),
                id_basket: basketData?.id_basket, 
            }
        );
        if (updateBasketDelivery?.status === 200) {
            setBasketData({...updateBasketDelivery?.data})  
        }
    };

    const checkedRadioPayment = async (e: any) => {
        setPayMethod(null);
        setCostNovaPoshta([]);
        setPayMethod(e.currentTarget.getAttribute('data-select'));
        if (e.currentTarget.getAttribute('data-select') !== 'Зворотній платіж (Післяплата)' || 
        e.currentTarget.getAttribute('data-select') !== 'Готівкою') {
            setCommitionPay((Number((sumGoods! * 0.015).toFixed())));
        
            const updateBasketPay = await updateBasket(
                {...basketData,
                    pay_view: e.currentTarget.getAttribute('data-select'),
                    id_basket: basketData?.id_basket, 
                }   
            );
            if (updateBasketPay?.status === 200) {
                setBasketData({...updateBasketPay?.data});  
            }
            basketSupplierGoods(updateBasketPay?.data, updateBasketPay?.data.pay_view);
        } else {
            setCommitionPay(null);
            const updateBasketPay = await updateBasket(
                {...basketData,
                    pay_view: e.currentTarget.getAttribute('data-select'),
                    id_basket: basketData?.id_basket, 
                }
                );
                if (updateBasketPay?.status === 200) {
                    setBasketData({...updateBasketPay?.data});  
                }
                basketSupplierGoods(updateBasketPay?.data, updateBasketPay?.data.pay_view);
        }
    };

    const cityInputActive = (e: any) => {
        setInputCity(e.currentTarget.value);
        setChooseCity(e.currentTarget.value);
        setCityListActive(true);
    };

    const cityChooseActive = async (e: any) => {
        try {
            setCostNovaPoshta([]);
            setChooseCity(e.target.textContent);
            setDataDepartmentNP({
                address: e.target.textContent,
                MainDescription: e.currentTarget.getAttribute('data-city'),
                DeliveryCity: e.currentTarget.getAttribute('data-delivery'),
            });
            setDataDepartmentDelivery({
                address: e.target.textContent,
                name: e.currentTarget.getAttribute('data-city'),
                id: e.currentTarget.getAttribute('data-delivery'),
            });
            setCityListActive(false);
        
            const updateBasketCityDelivery = await updateBasket(
                {...basketData,
                    address: e.target.textContent,
                    city_delivery: e.currentTarget.getAttribute('data-city'),
                    ref_city_delivery: e.currentTarget.getAttribute('data-delivery'),
                    id_basket: basketData?.id_basket, 
                }
            );
            if (updateBasketCityDelivery?.status === 200) {
                setBasketData({...updateBasketCityDelivery?.data});  
            }
            basketSupplierGoods(updateBasketCityDelivery?.data, 'Зворотній платіж (Післяплата)'); 
        } catch (error) {
            console.log('CITY_CHOOSE_ERROR: ', error);
        }
    };

    const cancelCityList = () => {
        setInputCity('');
        setCityListActive(false); 
    };

    const chooseDepartEvent = async (e: any) => {
        const departData = e.target.value.split('//');
        if (delivery === "Нова Пошта") {
            setChooseDepartmentNP({
                Ref: departData[0],
                Description: departData[1],
                CityRef: departData[2],
            });  
        }
        if (delivery === "Делівері")
            setChooseDepartmentDelivery({
                id: departData[0],
                name: departData[1],
                CityId: departData[2],
        });
        
        await updateBasket(
            {...basketData,
                delivery_dep: departData[1],
                delivery_dep_ref: departData[0],
                id_basket: basketData?.id_basket, 
            }
        );
    };

    const useBonusActive = () => {
        if (bonusUser) {
            setBonusUser(null);
        } else {
           setBonusUser(customer.customer?.contract[0].bonus); 
        }
    };

    const useNewBonusActive = (e: any) => {
        if (e.target.value.length === 0) {
           setBonusUser(customer.customer?.contract[0].bonus); 
        } else {
            setBonusUser(e.target.value);  
        }
    };

    const dopGarantyActive = async () => {
        try {
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
        } catch (error) {
            console.log('DOP_GARANTY: ', error);
        }
    };

    const removeGoodsAction = async (e: any) => {
        try {
            await removeBasketStorageGoods(e.target.getAttribute('data-id'));
            const removeBasketGoods: any = await getBasketOrder();

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
    const notesAction = async (e:any) => {
        const updateBasketNotes = await updateBasket(
            {...basketData,
                notes: e.target.value,
                id_basket: basketData?.id_basket, 
            }
        );
        if (updateBasketNotes?.status === 200) {
          setBasketData({...updateBasketNotes?.data})  
        }
    };

    const createOrderAction = async (e:any) => {
        try {
            if (String(basketData?.phone)?.length > 2 && String(basketData?.phone)?.length === 12
            && (basketData?.address?.length !== 0 || basketData?.name?.length !== 0)
            ) {
                const updateBasketData = await updateBasket(
                    {...basketData,
                        checkedIn: true,
                        id_basket: basketData?.id_basket, 
                    } 
                );

                if (updateBasketData?.status === 200) {
                    const createOrder: any = await responseForm({
                        ...updateBasketData?.data,
                        delivery_city_depart: chooseDepartmentNP?.Description,
                        delivery_city_depart_ref: chooseDepartmentNP?.Ref
                    });
                    basketData?.basket_storage?.forEach( async(item: CreateGoods):Promise<any> => {
                        await createGoodsToOrder(item, createOrder?.data?.id_order!); 
                    });
                    if(createOrder?.data?.id_order) {
                        setGetIdOrder(createOrder.data.id_order);
                        setNewOrder(true);
                        page.setBasketCount(0);
                    } else {
                        setGetError(true); 
                    }
                } 
            } else {
                setGetError(true);
                console.log('ERROR, ЗАПОВНІТЬ ПОЛЕ ТЕЛЕФОНУ - ЦЕ ОБОВЯЗКОВЕ ПОЛЕ')
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
        { page.basketCount !== 0 && !getIdOrder ?   
        <div className='basketOrder'
            onClick={cancelCityList}
        >
            <span> Оформлення замовлення</span>
            <ErrorsNotif 
                active={getError} 
                setActive={setGetError}
            >
                {`Треба заповнити усі обов'язкові поля для оформлення замовлення: телефон, ім'я, місто. 
                    Або виникла інша помилка.`
                }
            </ErrorsNotif>
            <div className='basketColmLeft'>
                <span>Данні замовлення</span>
                <div className='basketColmItemLeft'>
                    <span>Прізвище ім'я та по батькові *</span>
                    <InputDataText 
                        dataText={basketData?.name ?? ''}
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
                    />  
                </div>
                <div className='basketColmItemLeft'>
                    <span>Ваш email адрес</span>
                    <InputDataText 
                        dataEmail={basketData?.email ?? ''}
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
                        value={chooseCity ?? basketData?.city_delivery! ?? ''}
                        onChange={cityInputActive}
                    />
                </div> 
                <div 
                    className='basketCityList' 
                    onClick={(e:any) => e.stopPropagation()}       
                > 
                    {cityListActive && delivery !== "Делівері" ?
                        cityListActive && cityList?.map((city: ICity) =>
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
                        : null
                    }
                    {cityListActive && delivery === "Делівері" ?
                        cityListActive && cityListDelivery?.map((city: ICityDel) =>
                        <div className='basketCityListItem'
                            data-delivery={city.id}
                            data-city={city.name}
                            onClick={cityChooseActive}
                            key={city.id}>
                        <label htmlFor={city.name}>
                            <input 
                                id={city.id}
                                value={city.name}
                                type='radio'
                                name='city_list'
                            />
                            {city.name + ', ' + city.districtName + ', ' + city.regionName}
                        </label>    
                        </div>
                        )
                        : null
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
                        addOptions={delivery === "Самовивіз" ?? false}
                        direction={"column"} 
                        activeOptions={checkedRadioDelivery}
                        disabled={chooseCity ? false : true}
                    >
                        { delivery === "Самовивіз" ?    
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
                        addOptions={delivery === "Нова Пошта" ?? false}
                        direction={"column"} 
                        activeOptions={checkedRadioDelivery}
                        disabled={chooseCity ? false : true}
                    > 
                    </SelectRadio>
                    {delivery === "Нова Пошта" && chooseCity?.length !== 0 ?    
                        <div 
                            className='basketDepartList' 
                            onClick={(e:any) => e.stopPropagation()}       
                        > 
                            <select 
                                className='basketSelectDepart'
                                onChange={chooseDepartEvent}
                            >
                                <option value=''>
                                    --віберіть відділення--
                                </option>
                        {chooseCity && departListNovaPoshta?.map((depart: IDepart) =>
                                <option 
                                    key={depart?.SiteKey}
                                    label={depart?.Description}
                                    value={`${depart?.Ref}//${depart?.Description}//${depart?.CityRef}`}
                                >
                                {depart?.Description}
                                </option>
                            )
                        }
                        </select>    
                        </div>
                    : null}
                    <SelectRadio 
                        radioData={{
                            value: "delivery", 
                            radioName: "Делівері",
                            name: "delivery",
                        }} 
                        addOptions={delivery === "Делівері" ?? false}
                        direction={"column"} 
                        activeOptions={checkedRadioDelivery}
                        disabled={chooseCity ? false :true}
                    >
                    {delivery === "Делівері" && chooseCity ?    
                        <div 
                            className='basketDepartList' 
                            onClick={(e:any) => e.stopPropagation()}       
                        > 
                            <select 
                                className='basketSelectDepart'
                                onChange={chooseDepartEvent}
                            >
                                <option value=''>
                                    --віберіть відділення--
                                </option>
                            {chooseCity && departListDelivery?.map(
                                (depart: IDapertmentDelivery) =>
                                <option 
                                    key={depart?.id}
                                    label={depart?.name + ', ' + depart?.address}
                                    value={`${depart?.id}//${depart?.name + ', ' + depart?.address}//${depart?.CityId}`}
                                >
                                {depart?.name + ', ' + depart?.address}
                                </option>
                            )
                            }
                            </select>    
                        </div>
                    : null}
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
                        direction={"row"} 
                        disabled={delivery === "Самовивіз" &&
                            chooseCity ? false :true
                        }
                        activeOptions={checkedRadioPayment}
                    >
                        <img src={payMethod === "Готівкою" ? 
                        './iconPayment/cash_48_b.png' : './iconPayment/cash_48_g.png'} 
                        width={35}
                        height={35}
                        title='Готівка'
                        alt='cash'
                        />
                    </SelectRadio>
                    <SelectRadio 
                        radioData={{
                            value: "cardVisaMaster", 
                            radioName: "Карткою (VISA / MASTERCARD)",
                            name: "pay",
                        }} 
                        addOptions={""}
                        direction={"row"} 
                        disabled={
                            delivery &&
                            chooseCity ? false :true
                        }
                        activeOptions={checkedRadioPayment}
                    >
                        <img src={payMethod === "Карткою (VISA / MASTERCARD)" ? 
                        './iconPayment/credit_card_48_b.png' : './iconPayment/credit_card_48_g.png'} 
                        width={35}
                        height={35}
                        title='кредитна карта'
                        alt='credit_card'
                        />
                    </SelectRadio>
                    <SelectRadio 
                        radioData={{
                            value: "bezgotivka", 
                            radioName: "Безготівковий розрахунок",
                            name: "pay",
                        }} 
                        addOptions={""}
                        direction={"row"} 
                        disabled={
                            delivery &&
                            chooseCity ? false :true
                        }
                        activeOptions={checkedRadioPayment}
                    >
                        <img src={payMethod === "Безготівковий розрахунок" ? 
                            './iconPayment/merchant_48_b.png' : './iconPayment/merchant_48_g.png'} 
                            width={35}
                            height={35}
                            title='Безготівка'
                            alt='merchant'
                        />
                    </SelectRadio>
                    <SelectRadio 
                        radioData={{
                            value: "nalogka", 
                            radioName: "Зворотній платіж (Післяплата)",
                            name: "pay",
                        }} 
                        addOptions={""}
                        direction={"row"} 
                        disabled={
                            delivery === "Нова Пошта" &&
                            chooseCity ? false :true
                        }
                        activeOptions={checkedRadioPayment}
                    >
                        <img src={payMethod === "Зворотній платіж (Післяплата)" ? 
                            './iconPayment/money_back_48_b.png' : './iconPayment/money_back_48_g.png'} 
                            width={35}
                            height={35}
                            title='Післяплата'
                            alt='money_back'
                        />
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
                            className='itemGoodsBasket'
                        >
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
                    { customer.isAuth ? 
                    <>
                    <CheckboxBtn 
                        value={'Використати SKY BONUS'} 
                        titleCheckbox={'Використати SKY BONUS'} 
                        imageSrc={ bonusUser ?
                            'iconBonus/skyBonus_48_b.png' :
                            'iconBonus/skyBonus_48_g.png'
                        }
                        onChange={useBonusActive}
                    />
                    { bonusUser ?
                    <input
                        className='basketOrderInputBonus'
                        placeholder='Вказати інше значення'
                        onChange={useNewBonusActive}
                    />
                    : null
                    }
                    </>
                    : null}
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
                    <span className='basketOrderSkyBonus' >Нараховано SKY BONUS: {}
                            <span className='basketOrderGetBonusText'>{sumGoods! > 20000 ? (sumGoods! * 0.01).toFixed() : (sumGoods! * 0.02).toFixed()} </span>
                        <img 
                            src='iconBonus/skyBonus_48_b.png'
                            width={35}
                            height={35}
                            title='Бонуси'
                            alt='skyBonus'
                        />
                    </span>
                    {dopGarantySum ?
                        <span>Додаткова Гарантія: <span className='basketOrderDopGar'>{dopGarantySum}&#8372;</span></span>
                        : null
                    }
                    {delivery === "Нова Пошта" && chooseCity ?
                        <span>Доставка (Нова Пошта): {}
                            <span className='basketOrderDelPrice'>{deliverySum} &#8372;</span>
                        </span>
                        : null
                    }
                    {commisionPay && (payMethod === "Безготівковий розрахунок" || payMethod === "Карткою (VISA / MASTERCARD)" ) ?
                        <span>Комісія платіжної системи: {} 
                            <span className='basketOrderComissionPrice'>
                            {commisionPay}&#8372;
                            </span>
                        </span>
                        : null
                    }
                    { !bonusUser ?
                        <span>Всього: <span className='basketOrderPriceOver'>
                            {sumOverall?.reduce((sum: number, current: number) => ( sum + current), 0)}&#8372;</span>
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
                    <textarea id="commentsOrder" 
                        name="commentsOrder"
                        placeholder='Залишити коментар для замовлення'
                        rows={5} 
                        cols={80}
                        onChange={notesAction}
                        >
                    </textarea>
                </div>
                <ButtonAction 
                    props={"Оформити замовлення"} 
                    widthBtn={250} 
                    eventItem={createOrderAction}
                />
            </div>
                
                
            </div>
             : 
                <div className='noBasketGoods'> 
                    {getIdOrder ?
                        <span className='basketOrderIsOver'>
                            Ви оформили та підтвердили замовлення,
                            Замовлення № {getIdOrder },
                            Очікуйте інформацію про готовність та статус замовлення.
                            Дякуємо за покупку!
                            <p/>
                            <a href='/'>На головну</a>
                        </span>
                        :
                        <span className='basketOrderIsOver'>НАЖАЛЬ КОРЗИНА ПОРОЖНЯ =\</span>   
                    }
                    <SuccessNotif 
                    active={newOrder} 
                    setActive={setNewOrder}
                >
                {   `Ви оформили та підтвердили, 
                    Ваше замовлення №${getIdOrder}. Очікуйте інформацію про готовність та статус замовлення.
                        Дякуємо за покупку!`
                }   
                </SuccessNotif>   
                </div>
            }    
        
        </div>
    );
});

export default BasketOrder;