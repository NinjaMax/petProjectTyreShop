import { IbasketData } from "../components/basket/types/BasketData.type";
import { getCityDelivery, getCalcPriceDelivery } from "../restAPI/restDeliveryAPI";
import { getSupplierById, updateBasketStorageGoods } from "../restAPI/restGoodsApi";
import { getCityNovaPoshta, getCalcPriceNovaPoshta } from "../restAPI/restNovaPoshtaAPI";
import { CalcNovaPoshta } from "../restAPI/types/CalcNovaPoshta.type";
import { cargoTypesDelivery } from "./cargoTypesDelivery";
import { cargoTypesNovaPoshta } from "./cargoTypesNovaPoshta";
import { tyresCarDiameterDelivery, tyresCargoDiameterDelivery } from "./tyresDiameterDelivery";
import { tyresDiameter } from "./tyresDiameterNovaPoshta";
import { wheelsDiameter } from "./wheelsDiameterNovaPoshta";

export const calcCostDeliveryGoods = async (
    depart?: IbasketData,
    redeliveryCost?: string,
    goodsBasket?:any[],
    setCostNovaPoshta?:(arg0: any) => void,
    setCostDelivery?:(arg0: any) => void,
    setTakeOut?:(arg0: any) => void,
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
    if (taskGetSupplier[i] && dataSupplier && depart?.delivery === 'Нова Пошта') {
        let getCalcNovaPoshta = await getCalcPriceNovaPoshta(dataSupplier);
        if (getCalcNovaPoshta.success === true) {
            setCostNovaPoshta!((oldCalc: any) => { 
            return [...oldCalc!,
                    getCalcNovaPoshta.data[0].Cost,
                    getCalcNovaPoshta.data[0].CostRedelivery,
                ]}
            );
        } 
        if (getCitySup.city_ua === 'Харків' && depart?.address?.includes('м. Київ')) {
            setTakeOut!(true); 
        } else {
            setTakeOut!(false); 
        }
    }
    if (taskGetSupplier[i] && dataSupplier && depart?.delivery === 'Делівері') {
        let getCalcDelivery = await getCalcPriceDelivery(dataSupplier);
        if (getCalcDelivery.status === true) {
            setCostDelivery!((oldCalc: any) => {
            return [...oldCalc!,
                    getCalcDelivery?.data?.allSumma,
                    0
                ]
            }
            );
        }             
        if (getCitySup.city_ua === 'Харків' && depart?.address?.includes('м. Київ')) {
            setTakeOut!(true); 
        } else {
            setTakeOut!(false); 
        }
    }
    taskGetSupplier.shift();
    };
    dataSupplier = null;
};