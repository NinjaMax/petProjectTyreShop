import React, { useContext, useEffect, useState } from 'react';
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
import { addGoodsToOrder, createGoodsToOrderBasket, responseForm } from '../../restAPI/restAdminAPI';
import { CreateGoods } from '../adminComponents/adminModalForm/types/CreateGoods.type';
import ErrorsNotif from '../notifications/ErrorsNotif';
import SuccessNotif from '../notifications/SuccessNotif';
import { getCalcPriceDelivery, getCityDelivery, getWareHousesDelivery } from '../../restAPI/restDeliveryAPI';
import { ICityDel } from './types/CityDelivery.type';
import { IDapertmentDelivery } from './types/DepartmentDelivery.type';
import { cargoTypesDelivery } from '../../services/cargoTypesDelivery';
import { tyresCarDiameterDelivery, tyresCargoDiameterDelivery } from '../../services/tyresDiameterDelivery';
import { IbasketData } from './types/BasketData.type';
import { useMediaQuery } from 'react-responsive';

const BasketOrder = observer(() => {
    const {customer, page} = useContext<any | null>(Context);
    const [basketData, setBasketData] = useState<IbasketData>();
    const [delivery, setDelivery] = useState<string>();
    const [goodsBasket, setGoodsBasket] = useState<any[]>();
    const [cityList, setCityList] = useState<ICity[] | null>();
    const [cityListDelivery, setCityListDelivery] = useState<any[] | null>();
    const [departListNovaPoshta, setDepartListNovaPoshta] = useState<IDepart[]>();
    const [departListDelivery, setDepartListDelivery] = useState<IDepart[]>();
    const [cityListActive, setCityListActive] = useState<boolean>(false);
    const [inputCity, setInputCity] = useState<string>();
    const [chooseCity, setChooseCity] = useState<string>();
    const [dataDepartmentNP, setDataDepartmentNP] = useState<IDapertmentNP>();
    const [dataDepartmentDelivery, setDataDepartmentDelivery] = useState<IDapertmentDelivery>();
    const [takeOut, setTakeOut] = useState<boolean>(false);
    const [costNovaPoshta, setCostNovaPoshta] = useState<any[]| null>([]);
    const [costDelivery, setCostDelivery] = useState<any[]| null>([]);
    const [sumGoods, setSumGoods]= useState<number|null>(null);
    const [dopGarantySum, setDopGarantySum] = useState<number|null>(null);
    const [commisionPay, setCommitionPay] = useState<number|null>(0);
    const [newOrder, setNewOrder] = useState<boolean>(false);
    const [getError, setGetError] = useState<boolean>(false);
    const [bonusUser, setBonusUser] = useState<number|null>(null);
    const [sumOverall, setSumOverall] = useState<any[] | null>();
    const [deliverySum, setDeliverySum] = useState<number | null>(0);
    const [payMethod, setPayMethod] = useState<string | null>();
    const [getIdOrder, setGetIdOrder] = useState<number>();
    const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

    useEffect(() => window.scrollTo(0, 0), []);

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
                    setBasketData({
                        ...getBasket,
                        id_customer: customer.id_customer,
                        //name: '',
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
        let dataSupCity: any[] | null = [];
        let taskGetSupplier: any[] | null = [
        ...goodsBasket!
        ];

        let i: number = 0; 
        while (taskGetSupplier.length > i) {
        let getCitySup: any = await getSupplierById(
            taskGetSupplier[i]?.id_supplier
        );
        dataSupCity.push(getCitySup.city_ua);
        let citySupNovaPoshta = await getCityNovaPoshta(getCitySup.city_ua ?? 'Київ');
        let citySupDelivery = await getCityDelivery(getCitySup.city_ua ?? 'Київ');
        if (depart?.delivery === 'Нова Пошта') {
            let dataSupByCity = citySupNovaPoshta?.data[0]?.Addresses.find(
            (item: any) => item.MainDescription === getCitySup.city_ua);
            dataSupplier.citySender = dataSupByCity?.DeliveryCity;
        }
        if (depart?.delivery === 'Делівері') {
            let dataSupByCity0 = citySupDelivery?.data?.find(
            (item: any) => item.name === getCitySup.city_ua); 
            dataSupplier.citySender = dataSupByCity0?.id ?? '16617df3-a42a-e311-8b0d-00155d037960';
        }
        dataSupplier.warehouseSender = getCitySup?.delivery_dep_ref;
        dataSupplier.goodsQuantity = taskGetSupplier[i].quantity;
        dataSupplier.cityReceiver = depart?.ref_city_delivery;
        dataSupplier.warehouseReceiver = depart?.delivery_dep_ref; //new
        dataSupplier.goodsCost = String(taskGetSupplier[i].price * taskGetSupplier[i].quantity);

        if (redeliveryCost === 'Зворотній платіж (Післяплата)') {
            dataSupplier.redeliveryCost = 
            String(taskGetSupplier[i].price * taskGetSupplier[i].quantity);  
        } else {
            dataSupplier.redeliveryCost = String(1);
        }
        let goodsTypeRef = cargoTypesNovaPoshta(taskGetSupplier[i].category.toLowerCase());
        dataSupplier.goodsType = goodsTypeRef;
        let goodsTypeRefDelivery = cargoTypesDelivery(taskGetSupplier[i].category.toLowerCase());

        if (goodsTypeRef === "Cargo" && depart?.delivery === 'Нова Пошта') {
            console.log('CARGO_TYPE');
        }
        if (goodsTypeRef === "TiresWheels" && depart?.delivery === 'Нова Пошта') {
            let tyreDiameterRef = tyresDiameter(taskGetSupplier[i].diameter);
            dataSupplier.goodsDescription = tyreDiameterRef;
        }
        if (goodsTypeRef === "TiresWheels" && taskGetSupplier[i].category.toLowerCase() === "диски" && depart?.delivery === 'Нова Пошта') {
            let wheelsDiameterRef = wheelsDiameter(taskGetSupplier[i].diameter);
            dataSupplier.goodsDescription = wheelsDiameterRef;
        }
        if (goodsTypeRefDelivery === "Cargo" && depart?.delivery === 'Делівері') {
            console.log('CARGO_TYPE');
        }
        if (goodsTypeRefDelivery === "Battery" && depart?.delivery === 'Делівері') {
            console.log('Battery_TYPE');
        }
        if (goodsTypeRefDelivery === "TiresWheelsCar" && taskGetSupplier[i].category.toLowerCase() === "легковые шины" && depart?.delivery === 'Делівері') {
            let tyreDiameterRef = tyresCarDiameterDelivery(taskGetSupplier[i].diameter);
            dataSupplier.goodsDescription = tyreDiameterRef;
        }
        if (goodsTypeRefDelivery === "TiresWheelsCargo" && taskGetSupplier[i].category.toLowerCase() === "грузовые шины" && depart?.delivery === 'Делівері') {
            let tyreDiameterRefCargo = tyresCargoDiameterDelivery(taskGetSupplier[i].diameter);
            dataSupplier.goodsDescription = tyreDiameterRefCargo;
        }
        if (goodsTypeRefDelivery === "TiresWheelsCar" && taskGetSupplier[i].category.toLowerCase() === "диски"
        && depart?.delivery === 'Делівері' && taskGetSupplier[i].diameter !== '17.5' && taskGetSupplier[i].diameter !== '19.5' 
        && taskGetSupplier[i].diameter < 21
        ) {
            let wheelsDiameterRef = tyresCarDiameterDelivery(taskGetSupplier[i].diameter);
            dataSupplier.goodsDescription = wheelsDiameterRef;
        }
        if (goodsTypeRefDelivery === "TiresWheelsCar" && taskGetSupplier[i].category.toLowerCase() === "диски"
        && depart?.delivery === 'Делівері' && (taskGetSupplier[i].diameter > 19 || taskGetSupplier[i].diameter !== '17.5')
        ) {
            let wheelsDiameterRefCargo = tyresCargoDiameterDelivery(taskGetSupplier[i].diameter);
            dataSupplier.goodsDescription = wheelsDiameterRefCargo;
        }
        await updateBasketStorageGoods({
            ref_diameter: dataSupplier.goodsDescription,
            ref_weight: dataSupplier.goodsDescription,
            id_basket_storage: taskGetSupplier[i].id_basket_storage,
        });
        console.log('DATA_SUP_CITY: ', dataSupCity);
        if (dataSupCity.includes('Харків') && depart?.address?.includes('м. Харків')) {
            setTakeOut(true); 
        } else {
            setTakeOut(false); 
        }
        if (taskGetSupplier[i] && dataSupplier && depart?.delivery === 'Нова Пошта') {
            let getCalcNovaPoshta = await getCalcPriceNovaPoshta(dataSupplier);
            console.log('getCalcNovaPoshta: ', getCalcNovaPoshta.data);
            if (getCalcNovaPoshta.success === true) {
                setCostNovaPoshta(oldCalc => { 
                return [...oldCalc!,
                        getCalcNovaPoshta.data[0].Cost,
                        getCalcNovaPoshta.data[0].CostRedelivery,
                    ]}
                );
            }
        }
        if (taskGetSupplier[i] && dataSupplier && depart?.delivery === 'Делівері') {
            let getCalcDelivery = await getCalcPriceDelivery(dataSupplier);
            if (getCalcDelivery.status === true) {
                setCostDelivery(oldCalc => {
                return [...oldCalc!,
                        getCalcDelivery?.data?.allSumma,
                        0
                    ]
                }
                );
            }             
        }
        taskGetSupplier.shift();
        };
        dataSupplier = null;
    };

    useEffect(() => {
        let isMounted = false;
        const delivery = async () => {
            if (!isMounted && chooseCity) {
                const getCity: any = await getCityNovaPoshta(chooseCity);
                if (getCity?.success) {
                    setCityList([...getCity?.data[0].Addresses]); 
                } 
            }
            if (!isMounted && chooseCity) {
                const getCity: any = await getCityDelivery(chooseCity);
                if (getCity?.data) {
                    setCityListDelivery([...getCity?.data]); 
                } 
            }
            if (!isMounted && dataDepartmentNP?.MainDescription && dataDepartmentNP?.DeliveryCity) {
                const getDapartNP: any = await getWareHousesNovaPoshta(dataDepartmentNP);
                if (getDapartNP?.success) {
                    setDepartListNovaPoshta([...getDapartNP?.data]);
                }
            }
            if (!isMounted && dataDepartmentDelivery?.id) {
                const getDapartDelivery: any = await getWareHousesDelivery(dataDepartmentDelivery.id);
                if (getDapartDelivery?.data) {
                    setDepartListDelivery([...getDapartDelivery?.data]);
                }
            }
            if (!isMounted){
                await updateBasket({...basketData});
            }
        };
        delivery();
        return () => {
          isMounted = true;
        };
    },[basketData, dataDepartmentNP, dataDepartmentDelivery, inputCity, chooseCity]);

    useEffect(() => {
        let isMounted = false;
        if (!isMounted) {
            setSumGoods(Number(
            goodsBasket?.reduce((sum, current) => ( sum + current.total), 0).toFixed()));
        }
        if (!isMounted && !payMethod && delivery === 'Нова Пошта') {
            
            setBasketData(prevData => { return {
                ...prevData,
                pay_view: 'Зворотній платіж (Післяплата)',
            }
            });
            setPayMethod('Зворотній платіж (Післяплата)');
        }
        if (!isMounted && !payMethod && delivery === 'Делівері') {
            
            setBasketData(prevData => { return {
                ...prevData,
                pay_view: 'Карта/Терминал (LiqPay)',
            }
            });
            setPayMethod('Карта/Терминал (LiqPay)');
            //setCommitionPay((Number((sumGoods! * 0.015).toFixed())));
        }
        if (!isMounted && costNovaPoshta && delivery === 'Нова Пошта') {
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
        if (!isMounted && costDelivery && delivery === 'Делівері') {
            setDeliverySum(Number(
                (32 + ( goodsBasket?.reduce((sum, current) => ( sum + current.total), 0)) * 0.00001 +
               (costDelivery?.reduce((sum: number, current: number) => ( sum + current), 0))
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
            setDeliverySum(Number(
                (25 + ( goodsBasket?.reduce((sum, current) => ( sum + current.total), 0)) * 0.01 +
               costNovaPoshta?.reduce((sum: number, current: number) => ( sum + current), 0)
                ).toFixed())
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
        if (!isMounted && delivery === 'Делівері') {
            setSumOverall(
                [Number(sumGoods), Number(deliverySum)]
            );
            setDeliverySum(Number(
                (32 + ( goodsBasket?.reduce((sum, current) => ( sum + current.total), 0)) * 0.00001 +
               (costDelivery?.reduce((sum: number, current: number) => ( sum + current), 0))
                ).toFixed())
            );
            setBasketData(prevData => { return {
                ...prevData,
                commission_cost: commisionPay,
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
                commission_cost: commisionPay,
                delivery_cost: deliverySum,
                bonus_decrease: bonusUser,
                dop_garanty: dopGarantySum,
                total_cost: bonusUser ? (sumGoods! + deliverySum! + dopGarantySum) - bonusUser :
                        sumGoods! + deliverySum! + dopGarantySum,
            }
            });
        };
        if (!isMounted && delivery === 'Делівері' && dopGarantySum) {
            setSumOverall(
                [Number(sumGoods), Number(deliverySum), Number(dopGarantySum)]
            );
            setBasketData(prevData => { return {
                ...prevData,
                commission_cost: commisionPay,
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
        (payMethod === 'Карта/Терминал (LiqPay)' || payMethod === 'Безготівковий розрахунок')) {
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
        if (!isMounted && delivery === 'Делівері' && 
        (payMethod === 'Карта/Терминал (LiqPay)' || payMethod === 'Безготівковий розрахунок')) {
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
        if (!isMounted && !delivery  && (payMethod === 'Карта/Терминал (LiqPay)' || payMethod === 'Безготівковий розрахунок')) {
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
        (payMethod === 'Карта/Терминал (LiqPay)' || payMethod === 'Безготівковий розрахунок')) {
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
        if (!isMounted && delivery === 'Делівері' && dopGarantySum &&
        (payMethod === 'Карта/Терминал (LiqPay)' || payMethod === 'Безготівковий розрахунок')) {
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
    },[
        bonusUser, 
        commisionPay, 
        costNovaPoshta, 
        costDelivery, 
        delivery, 
        deliverySum, 
        dopGarantySum, 
        goodsBasket, 
        payMethod, 
        sumGoods
    ]);

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
        try {
            const deliverySelect = e.currentTarget.getAttribute('data-select');
            setCostNovaPoshta([]);
            setCostDelivery([]);
            if (delivery === 'Делівері' || delivery === 'Нова Пошта') {
                setChooseCity(' ');
                setInputCity(' '); 
                setDataDepartmentDelivery(undefined);
                setDepartListDelivery(undefined);
                setDataDepartmentNP(undefined);
                setDepartListNovaPoshta(undefined);
            }
            setDeliverySum(null);
            setPayMethod(null);
            setDelivery(deliverySelect);
            if (deliverySelect === "Делівері" && !delivery) {
                setChooseCity(' ');
                setInputCity(' ');
            }
            const updateBasketDelivery = await updateBasket(
                {...basketData,
                    pay_view: deliverySelect === "Делівері" ?
                    'Карта/Терминал (LiqPay)'
                    : deliverySelect === "Нова Пошта" ? 
                    'Зворотній платіж (Післяплата)'
                    : null,
                    delivery: deliverySelect,
                    id_basket: basketData?.id_basket, 
                }
            );
            if (updateBasketDelivery?.status === 200) {
                setBasketData({...updateBasketDelivery?.data})  
            }
            console.log('CHOOSE_DELIVERY: ', deliverySelect);
            // if (deliverySelect === "Нова Пошта" || 
            //     deliverySelect === "Делівері") {
            if (deliverySelect === "Нова Пошта" || deliverySelect === "Делівері") {
                console.log('CALCULATE_DELIVERY')
                basketSupplierGoods(updateBasketDelivery?.data, updateBasketDelivery?.data.pay_view);
            }
        } catch (error) {
            console.log('RADIO_DELIVERY_ERROR: ', error);
        }
    };

    const checkedRadioPayment = async (e: any) => {
        try {
            setPayMethod(null);
            setDeliverySum(null);
            setCostNovaPoshta([]);
            setCostDelivery([]);
            setPayMethod(e.currentTarget.getAttribute('data-select'));
            if (e.currentTarget.getAttribute('data-select') !== 'Зворотній платіж (Післяплата)' || 
            e.currentTarget.getAttribute('data-select') !== 'Готівкою') {
                //setCommitionPay((Number((sumGoods! * 0.015).toFixed())));
                const updateBasketPay = await updateBasket(
                {...basketData,
                    pay_view: e.currentTarget.getAttribute('data-select'),
                    id_basket: basketData?.id_basket, 
                }   
                );
                if (updateBasketPay?.status === 200) {
                setBasketData({...updateBasketPay?.data});  
                }
                if (delivery !== "Самовивіз") {
                    basketSupplierGoods(updateBasketPay?.data, updateBasketPay?.data.pay_view);
                }
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
                if (delivery !== "Самовивіз") {
                   basketSupplierGoods(updateBasketPay?.data, updateBasketPay?.data.pay_view); 
                }
            }
        } catch (error) {
            console.log('RADIO_PAYMENT_ERROR: ', error);
        }
    };

    const cityInputActive = (e: any) => {
        setInputCity(e.currentTarget.value);
        setChooseCity(e.currentTarget.value);
        setCityListActive(true);
        setDataDepartmentDelivery(undefined);
        setDepartListDelivery(undefined);
        setDataDepartmentNP(undefined);
        setDepartListNovaPoshta(undefined);
        setDeliverySum(null);
        setCostNovaPoshta([]);
        setCostDelivery([]);
    };

    const cityChooseActive = async (e: any) => {
        try {
            setCostNovaPoshta([]);
            setCostDelivery([]);
            setDeliverySum(null);
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
                    delivery_dep: e.currentTarget.getAttribute('data-city'),
                    id_basket: basketData?.id_basket, 
                }
            );
            if (updateBasketCityDelivery?.status === 200) {
                setBasketData({...updateBasketCityDelivery?.data});  
            }
            basketSupplierGoods(updateBasketCityDelivery?.data, updateBasketCityDelivery?.data.pay_view);
        } catch (error) {
            console.log('CITY_CHOOSE_ERROR: ', error);
        }
    };

    const cancelCityList = () => {
        setInputCity('');
        setCityListActive(false); 
    };

    const chooseDepartEvent = async (e: any) => {
        try {
            let departData = e.target.value.split('//');
            setCostNovaPoshta([]);
            setCostDelivery([]);
            setDeliverySum(null);
            const updateBasketDep = await updateBasket(
                {...basketData,
                    delivery_dep: departData[1],
                    delivery_dep_ref: departData[0],
                    id_basket: basketData?.id_basket, 
                }
            );
            if (updateBasketDep?.status === 200) {
                setBasketData({...updateBasketDep?.data});  
            }
            basketSupplierGoods(updateBasketDep?.data, updateBasketDep?.data.pay_view);
        } catch (error) {
            console.log('SELECT_DEPART_ERROR: ', error);
        }
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
                setDopGarantySum(Number((sumGoods! * 0.1).toFixed()));
                const updateBasketDopGaranty = await updateBasket(
                {...basketData,
                    dop_garanty: Number((sumGoods! * 0.1).toFixed()),
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

    const createOrderAction = async () => {
        try {
            if (String(basketData?.phone)?.length > 2 && String(basketData?.phone)?.length === 12
            && (basketData?.address?.length !== 0 || basketData?.name?.length !== 1) && chooseCity?.length! > 1
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
                        mix_store: goodsBasket?.find(basket => basket.id_storage === 1) &&
                        goodsBasket?.find(basket => basket.id_storage === 2) ? '+' : null,
                    });
                    basketData?.basket_storage?.forEach( async(item: CreateGoods):Promise<any> => {
                        let goodsToOrder = await createGoodsToOrderBasket(item, createOrder?.data?.id_order!); 
                        console.log('ADD_GOODS_TO_ORDER: ', goodsToOrder)
                        await addGoodsToOrder(goodsToOrder);
                    });
                    if(createOrder?.data?.id_order) {
                        setGetIdOrder(createOrder.data.id_order);
                        setNewOrder(true);
                        page.setBasketCount(0);
                    } else {
                        setGetError(true); 
                    }
                } 
                document.documentElement.scrollTo({
                    top: 0,
                    left: 0,
                    behavior: "smooth",
                });
            } else {
                setGetError(true);
                console.log('ERROR, ВСІ ОБОВЯЗКОВІ ПОЛЯ')
            }
        } catch (error) {
            console.log(error);
        }
    };

    console.log('BASKET_DATA: ', basketData);
    console.log('DELIVERY_DATA: ', delivery);
    console.log("DEPARTURE_DATA: ", departListNovaPoshta);

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
                    {cityList?.length === 0 && chooseCity && delivery !== 'Делівері' ?
                    <div className='basketOrderNotes'>
                        {'* недоступна послуга в данному місті'}
                    </div>
                    : null
                    }
                    {cityListDelivery?.length === 0 && chooseCity && !departListDelivery && delivery === 'Делівері' ?
                    <div className='basketOrderNotes'>
                        {'* недоступна послуга в данному місті'}
                    </div>
                    : null
                    }
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
                        disabled={false}
                    > 
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
                                    //style={{'width': '130px'} as React.CSSProperties}
                                    //className='basketSelectDepartOption'
                                    key={depart?.SiteKey}
                                    title={depart?.Description}
                                    //label={depart?.Description}
                                    value={`${depart?.Ref}//${depart?.Description}//${depart?.CityRef}`}
                                >
                                {isMobile ?
                                    `Відділення№${depart?.Number}` :
                                    depart?.Description
                                }
                                </option>
                            )
                        }
                        </select>    
                        </div>
                    : null}
                    </SelectRadio>
                    <SelectRadio 
                        radioData={{
                            value: "delivery", 
                            radioName: "Делівері",
                            name: "delivery",
                        }} 
                        addOptions={delivery === "Делівері" ?? false}
                        direction={"column"} 
                        activeOptions={checkedRadioDelivery}
                        disabled={false}
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
                                    title={depart?.name + ', ' + depart?.address}
                                    //label={depart?.name + ', ' + depart?.address}
                                    value={`${depart?.id}//${depart?.name + ', ' + depart?.address}//${depart?.CityId}`}
                                >
                                {isMobile ?
                                    depart?.name  :
                                    depart?.name + ', ' + depart?.address
                                }
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
                        checked={payMethod === "Готівкою" ? true : false}
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
                            radioName: "Карта/Терминал (LiqPay)",
                            name: "pay",
                        }} 
                        addOptions={""}
                        direction={"row"} 
                        disabled={
                            delivery &&
                            chooseCity ? false :true
                        }
                        checked={payMethod === "Карта/Терминал (LiqPay)" ? true : false}
                        activeOptions={checkedRadioPayment}
                    >
                        <img src={payMethod === "Карта/Терминал (LiqPay)" ? 
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
                        checked={payMethod === "Безготівковий розрахунок" ? true : false}
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
                        checked={payMethod === "Зворотній платіж (Післяплата)" ? true : false}
                        activeOptions={checkedRadioPayment}
                    >
                        <img src={payMethod === "Зворотній платіж (Післяплата)" ? 
                            './iconPayment/money_back_48_b.png' : './iconPayment/money_back_48_g.png'} 
                            width={35}
                            height={35}
                            title='Післяплата'
                            alt='money_back'
                        />
                        <div className='basketOrderNotes'>
                            {delivery !== "Нова Пошта" ? '*послуга недоступна' : null}
                        </div>
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
                    <span className='tooltipBasketOrderDopGar'>Додаткова розширена гарантія на пошкодження, дефекти або збільшення сроку основної гарантіі</span>
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
                            alt='skyBonus'
                        />
                        <span className='tooltipBasketOrderSkyBonus'>Бонуси які будуть нараховані після покупки. 1 бонус дорівнює 1 грн. Бонусами можна скористатися при наступних покупках як знижкою. </span>
                    </span>
                    
                    {dopGarantySum ?
                        <span>Додаткова Гарантія: <span className='basketOrderDopGar'>{dopGarantySum}&#8372;</span></span>
                        : null
                    }
                    {delivery === "Нова Пошта" && chooseCity?.length! > 1 && deliverySum! > 32 ?
                        <span>Доставка (Нова Пошта): {}
                            <span className='basketOrderDelPrice'>{deliverySum} &#8372;</span>
                        </span>
                        : null
                    }
                    {delivery === "Делівері" && chooseCity?.length! > 1 && deliverySum! > 32 ?
                        <span>Доставка (Делівері): {}
                            <span className='basketOrderDelPrice'>{deliverySum} &#8372;</span>
                        </span>
                        : null
                    }
                    {commisionPay && (payMethod === "Безготівковий розрахунок" || payMethod === "Карта/Терминал (LiqPay)" ) ?
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