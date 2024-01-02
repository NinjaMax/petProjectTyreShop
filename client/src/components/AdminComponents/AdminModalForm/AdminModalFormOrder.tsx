import React, { 
    useReducer, 
    Reducer, 
    useState, 
    useCallback, 
    useEffect, 
    useContext
} from 'react';
import '../../../css/AdminComponentCss/AdminModalFormCss/AdminFormOrder.css';
import { useForm } from 'react-hook-form';
import ModalAdmin from '../../modal/ModalAdmin';
import {
    addCommentsToOrder,
    addGoodsToOrder, 
    createGoodsToOrder, 
    getAdminPriceTyresById, 
    getAdminPriceWheelsById, 
    responseForm,
    updateOrder,
    updateOrderStorage,
    updateOrderSup} from '../../../restAPI/restAdminAPI';
import AdminComment from '../adminContent/AdminComment';
import AdminModalCustomers from '../adminModalForm/AdminModalCustomers';
import AdminModalGoods from '../adminModalForm/AdminModalGoods';
import { Context } from '../../../context/Context';
import { observer } from 'mobx-react-lite';
import { IFormOrder } from './interfaces/FormOrders.interface';
import { CreateGoods } from './types/CreateGoods.type';
//import { DataGoods } from './types/DataGoods.type';
import { IModalFormOrder } from './types/FormOrders.type';
import { StateReducer, ActionReducer, ActionType } from './types/OrderReducer.type';
import { reducer } from './reducer/goodsReducer';
import { createInitialState } from './reducer/initialState';
import { IDapertmentDelivery } from '../../basket/types/DepartmentDelivery.type';
import { IDepart } from '../../basket/types/DaprtNP.type';
import { ICityDel } from '../../basket/types/CityDelivery.type';
import { ICity } from '../../basket/types/CityNP.type';
import { getCityNovaPoshta, getWareHousesNovaPoshta } from '../../../restAPI/restNovaPoshtaAPI';
import { getCityDelivery, getWareHousesDelivery } from '../../../restAPI/restDeliveryAPI';
import { IDapertmentNP } from '../../basket/types/DepartmentType.type';
import AdminModalCustomerCreate from './AdminModalCustomerCreate';

const AdminFormOrder = observer((
    { props, 
        goodsId, 
        comments, 
        setActive, 
        customer, 
        storages, 
        getOrdersData,
        showComment,
    }:IFormOrder
    ) => {
    const {user} = useContext<any | null>(Context);
    const [tyreDatas, wheelDatas] = props;
    const [ordersData, setOrdersData ] = useState<any | null>(getOrdersData);
    const [orderId, setOrderId] = useState<number | null | undefined>(null);
    const [addGoods, setAddGoods] = useState<boolean>(false);
    const [createCustomer, setCreateCustomer] = useState<boolean>(false);
    const [openCustomers, setOpenCustomers] = useState<boolean>(false);
    const [addCustomer, setAddCustomer] = useState<IModalFormOrder | undefined>(undefined);
    const [disableBtn, setDisableBtn] = useState<boolean>(false);
    const [disableBtnOk, setDisableBtnOk] = useState<boolean>(true);
    const [orderStorage, setOrderStorage] = useState<any[] | undefined>([]);
    const {register, handleSubmit, setValue, getValues, setError, formState: {errors}} = useForm();    
    const [state, dispatch] = useReducer<Reducer<StateReducer, ActionReducer>>(
        reducer, createInitialState(goodsId, getOrdersData)
    );
    const [newComment, setNewComment] = useState<string | undefined>();
    const [addNewCommit, setAddNewCommit] = useState();
    const [updateBtn, setUpdateBtn] = useState<string | null>(null); 
    const [cityList, setCityList] = useState<ICity[] | null>();
    const [cityListDelivery, setCityListDelivery] = useState<any[] | null>();
    const [departListNovaPoshta, setDepartListNovaPoshta] = useState<IDepart[]>();
    const [departListDelivery, setDepartListDelivery] = useState<IDepart[]>();
    const [cityListActive, setCityListActive] = useState<boolean>(false);
    const [inputCity, setInputCity] = useState<string>();
    const [chooseCity, setChooseCity] = useState<string>();
    const [dataDepartmentNP, setDataDepartmentNP] = useState<IDapertmentNP>();
    const [dataDepartmentDelivery, setDataDepartmentDelivery] = useState<IDapertmentDelivery>();
    const [delivery, setDelivery] = useState<string>();
    const [purchaseGoods, setPurchaseGoods] = useState<any[]>([]);
    const [dataDepartment, setDataDepartment] = useState<{
        delivery_dep?: string, 
        delivery_dep_ref?: string,
    }>();

    const orderSum = state?.reduce((sum:any, current:any) => 
        sum + (current.price * current.quantity), 0
    );

    useEffect(() => {
        if (ordersData) {
            setOrderId(ordersData?.id_order);
            setOrderStorage(ordersData?.order_storage);
            setUpdateBtn('Оновити');
            if (ordersData.disableBtns) {
                setDisableBtn(true);
                setDisableBtnOk(true); 
            }
        }
    },[ordersData]);

    useEffect(() => {
        register("total_cost")
        setValue("total_cost", (Number(ordersData?.delivery_cost ?? 0) + Number(ordersData?.commission_cost ?? 0) + Number(ordersData?.dop_garanty ?? 0) + orderSum) - Number(ordersData?.bonus_decrease ?? 0));
        setValue("dop_garanty", ordersData?.dop_garanty ?? 0);
    }, [
        orderSum,
        ordersData,
        register, 
        setValue
    ]);

    useEffect(() => {
        register("id_user", {required: 'Це необхідні дані'});
        setValue("id_user", user._user?.sub.id_user);
        if (addCustomer) {
            setValue("id_customer", addCustomer?.id_customer!,
            { shouldValidate: true }) 
            setValue("id_contract", addCustomer?.contract[0]?.id_contract!,
            { shouldValidate: true })
        } else {
            setValue("id_customer", ordersData?.id_customer,
            { shouldValidate: true }) 
            setValue("id_contract", ordersData?.id_contract,
            { shouldValidate: true })
        }
    }, [
        register, 
        setValue, 
        getValues,
        addCustomer, 
        user, 
        ordersData?.id_customer, 
        ordersData?.id_contract
    ]);
    
    useEffect(() => {
        register("mix_store");
        setValue("mix_store", state.find((item: any) => item.id_storage === 1) &&
        state.find((item: any) => item.id_storage === 2) ? '+' : null
        );
        if (delivery === "Нова Пошта") {
            register("delivery_city", {required: 'Це необхідні дані'});
            register("delivery_city_ref");
            setValue("delivery_city", dataDepartmentNP!.MainDescription,
            { shouldValidate: true });
            setValue("delivery_city_ref", dataDepartmentNP!.DeliveryCity);
            const payMethod = getValues('pay_view');
            if (payMethod === "Безготівковий розрахунок" || "Карта/Терминал (LiqPay)") {
                register("commission_cost");
                setValue("commission_cost", state?.reduce((sum:any, current:any) => 
                sum + (current.price.price * current.price.quantity), 0) * 0.015);
            }
        }
        if (delivery === "Делівері") {
            register("delivery_city", {required: 'Це необхідні дані'});
            register("delivery_city_ref");
            setValue("delivery_city", dataDepartmentDelivery?.name!,
            { shouldValidate: true });
            setValue("delivery_city_ref", dataDepartmentDelivery?.id!);
            register("commission_cost");
                setValue("commission_cost", state?.reduce((sum:any, current:any) => 
                sum + (current.price.price * current.price.quantity), 0) * 0.015);
        }
        if (!delivery) {
            register("delivery_city");
            register("delivery_city_ref");
            setValue("delivery_city", ordersData?.delivery_city ?? null,
            { shouldValidate: true });
            setValue("delivery_city_ref", ordersData?.delivery_city_ref ?? null);
        }
    }, [
        register, 
        setValue, 
        getValues,
        state, 
        dataDepartmentDelivery?.id, 
        dataDepartmentDelivery?.name, 
        dataDepartmentNP, 
        delivery,
        ordersData
    ]);

    useEffect(() => {
        register("delivery_city_depart")
        register("delivery_city_depart_ref")
        setValue("delivery_city_depart", dataDepartment?.delivery_dep! ?? ordersData?.delivery_city_depart ?? null,
        { shouldValidate: true })
        setValue("delivery_city_depart_ref", dataDepartment?.delivery_dep_ref! ?? ordersData?.delivery_city_depart_ref ?? null,
        { shouldValidate: true })
    }, [ 
        dataDepartment, 
        ordersData?.delivery_city_depart, 
        ordersData?.delivery_city_depart_ref, 
        register, 
        setValue
    ]);

    useEffect(() => {
        let isMounted = false;
        let arrPurchase: number[] | null = [];
        const calcPurchase = async () => {  
            if (!isMounted && orderStorage) { 
                orderStorage?.forEach(async (orderData: any, index: number) => {
                let priceByIdTyre = await getAdminPriceTyresById(orderData.id ?? 0);
                let priceByIdTWheel = await getAdminPriceWheelsById(orderData.id ?? 0);
                let priceTyreOnSup = priceByIdTyre?.find((tyre: any) => tyre.id_supplier === state[index].id_supplier);
                let priceWheelOnSup = priceByIdTWheel?.find((tyre: any) => tyre.id_supplier === state[index].id_supplier);
                if (priceTyreOnSup) {
                    arrPurchase?.push(priceTyreOnSup.price_wholesale * state[index].quantity);
                    setPurchaseGoods([...arrPurchase!]);
                }
                if (priceWheelOnSup) {
                    arrPurchase?.push(priceWheelOnSup.price_wholesale * state[index].quantity);
                    setPurchaseGoods([...arrPurchase!]);
                }
            });
            }
        };
        calcPurchase();
        return () => {
            isMounted = true;
        };
    },[orderStorage, state]);

    useEffect(() => {
        let isMounted = false;
        const deliveryOrder = async () => {
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
        };
        deliveryOrder();
        return () => {
          isMounted = true;
        };
    },[dataDepartmentNP, dataDepartmentDelivery, inputCity, chooseCity]);

    const cityChooseActive = async (e: any) => {
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
    };

    const cityInputActive = (e: any) => {
        setInputCity(e.currentTarget.value);
        setChooseCity(e.currentTarget.value);
        setCityListActive(true);
        setDataDepartmentDelivery(undefined);
        setDepartListDelivery(undefined);
        setDataDepartmentNP(undefined);
        setDepartListNovaPoshta(undefined);
        setDataDepartment(undefined);
    };

    const chooseDelivery = (e: any) => {
        setDelivery(e.currentTarget.value);
    };

    const chooseDepartEvent = async (e: any) => {
        let departData = e.target.value.split('//');
        setDataDepartment(
            {
                delivery_dep: departData[1],
                delivery_dep_ref: departData[0], 
            }
        );
    };

    const cancelCityList = () => {
        setInputCity('');
        setCityListActive(false); 
    };

    const onChangeInput = useCallback(
        (e: any, id: number, indexItem: number) => {
        let {name, value} = e.target;
        dispatch({type: ActionType.EDITITEM, 
            editItem: state.map(
                (item: any, index: number) => {
                    return (
                        item.id === id && index === indexItem ?
                        {...item, [name]: value ?? '0',
                        total: name === 'price' ? 
                        value * item?.quantity :                        
                        value * item?.price,
                        }
                        : item
                    )}
            )
        }); 
    },[state]);

    const addGoodsForm = () => {
        setAddGoods(!addGoods);
    };

    const activeCustomer = () => {
        setCreateCustomer(!createCustomer);
    };
    const openCustomerForm = () => {
        setOpenCustomers(!openCustomers);
    };    
    //const actions = useMemo(() => ({
    const addCustToOrder = async (e: any) => {
        const findCustomer = customer!.find(
                (items:{id_customer:number}) => items?.id_customer === +e.currentTarget.getAttribute('data-value')
        );
        //getCustomersById
        if (findCustomer) {
            setAddCustomer(findCustomer);  
            setOpenCustomers(!openCustomers);
            //if (!getValues("id_customer")) {
                // setValue("id_customer", addCustomer?.id_customer! ?? ordersData?.id_customer,
                //  { shouldValidate: true }) 
             //}
             //if (!getValues("id_contract")) {
                //  setValue("id_contract", addCustomer?.contract[0]?.id_contract! ?? ordersData?.id_contract,
                //  { shouldValidate: true })
             //}
            
        }
    };

    const addGoodsToList = async (value:string) => {
        const newArr = value.split(',');
        let [idValue, indexValue] = newArr;
        const addTyres: any = tyreDatas?.find((item:{id:string}) => item?.id === idValue);
        const addWheels: any = wheelDatas?.find((item:{id:string}) => item?.id === idValue);
        dispatch({type: ActionType.ADDTYRE, 
            addTyre: tyreDatas?.find((item:{id:string}) => item?.id === idValue),
            indexPrice: indexValue,
        });

        dispatch({type: ActionType.ADDWHEEL, 
            addWheel: wheelDatas?.find((item:{id:string}) => item?.id === idValue),
            indexPrice: indexValue,
        });
        if (addTyres) {
            setOrderStorage(oldOrdStor => [...oldOrdStor!, 
                {...addTyres, 
                    "price": addTyres.price[indexValue].price,
                    "id_tyre": addTyres.price[indexValue].id_tyre,
                    "price_wholesale": addTyres.price[indexValue].price_wholesale,
                    "old_price": addTyres.price[indexValue].old_price,
                    "id_supplier": addTyres.price[indexValue].id_supplier,
                    "id_storage": addTyres.price[indexValue].id_storage,
                    "delivery_price": addTyres.price[indexValue].delivery_price,
                    "price_plus_delivery": addTyres.price[indexValue].price_plus_delivery,
                    "update_date": addTyres.price[indexValue].update_date,
                    "category": addTyres.category.category,
                    "quantity": "4",
                }
            ]);
        }
        if (addWheels) {
            setOrderStorage(oldOrdStor => [...oldOrdStor!, 
                {...addWheels, 
                    "price": addWheels.price[indexValue].price,
                    "id_wheel": addWheels.price[indexValue].id_wheel,
                    "price_wholesale": addWheels.price[indexValue].price_wholesale,
                    "old_price": addWheels.price[indexValue].old_price,
                    "id_supplier": addWheels.price[indexValue].id_supplier,
                    "id_storage": addWheels.price[indexValue].id_storage,
                    "delivery_price": addWheels.price[indexValue].delivery_price,
                    "price_plus_delivery": addWheels.price[indexValue].price_plus_delivery,
                    "update_date": addWheels.price[indexValue].update_date,
                    "category": addWheels.category.category,
                    "quantity": "4",
                }
            ]);
        }

        setAddGoods(!addGoods);         
    };

    const deleteItem = async (itemIndex: number) => {
        dispatch({type: ActionType.DELETEITEM, 
            deleteItem: itemIndex,
        });
    }; 
    //GOOD PERFORM
    const onSubmit = async (data: any, e: any) => {
        //e.preventDefault();
        console.log('CREATE ORDER: ', data);
        try {
            //if (!errors.id_contract || !errors.id_customer) {
            if (!orderId && state.length === 0) {
               let resultForm: any = await responseForm(data);
                setOrderId(+resultForm.data.id_order);
                setOrdersData(resultForm.data);
                console.log('GET_ORDER_DATA: ', resultForm);
                alert(`Замовлення створено, id ${resultForm.data.id_order},
                    але товари не додані.`
                ); 
            }
            if(!orderId && state.length > 0) {
                let orderStorageArr: any[] | null= [];
                let resultForm: any = await responseForm(data);
                orderStorage?.forEach(async(itemsOrd: any, index: any): Promise<any> => {
                    //await updateOrderStorage(itemsOrd);
                    if (itemsOrd.id && state[index].id && itemsOrd.price !== state[index].price) {
                        const addCommitTo: any = await addCommentsToOrder({
                            id_user: user._user?.sub.id_user,
                            comments: `Змінено ціну поз (${index + 1}): ${itemsOrd.price} => ${state[index].price}`,
                            id_order: +resultForm.data.id_order,
                            id_order_sup: null
                        });
                        setAddNewCommit(addCommitTo?.data); 
                    }
                });
                orderStorage?.splice(0, orderStorage.length);
                setOrderId(+resultForm.data.id_order);
                setOrdersData(resultForm.data);
                console.log('GET_ORDER_DATA: ', resultForm);
                state.forEach(async (itemGoods: CreateGoods): Promise<any> => {
                    let resultOrder: any = await createGoodsToOrder(itemGoods, +resultForm.data.id_order!);
                    //setOrderStorage([...resultOrder?.data?.order_storage]);
                    orderStorageArr?.push(resultOrder.data);
                    console.log('PUT_ORDER_DATA: ', resultOrder.data)
                });
                setUpdateBtn('Оновити');
                setOrderStorage([...orderStorageArr]);
                setDisableBtnOk(!disableBtnOk);
                orderStorageArr = null;
                alert(`Замовлення створено, id ${resultForm.data.id_order}. 
                    Для підкріплення товарів до замовлення треба натиснути ОК.`);
            }
            if(orderId && state.length > 0 && disableBtnOk === false) {
                orderStorage?.forEach(async(itemsOrd: any, index: any): Promise<any> => {
                    //await updateOrderStorage(itemsOrd);
                    if (itemsOrd.id && state[index].id && itemsOrd.price !== state[index].price) {
                        const addCommitTo: any = await addCommentsToOrder({
                            id_user: user._user?.sub.id_user,
                            comments: `Змінено ціну поз (${index + 1}): ${itemsOrd.price} => ${state[index].price}`,
                            id_order: orderId,
                            id_order_sup: null 
                        });
                        setAddNewCommit(addCommitTo?.data); 
                    }
                });
                orderStorage?.splice(0, orderStorage.length);
                state.forEach(async (itemGoods: CreateGoods): Promise<any> => {
                    let resultOrder: any = await createGoodsToOrder(itemGoods, orderId);
                    console.log('UPDATE_ORDER_STORAGE: ', resultOrder.data);
                    
                });  
                const newOrderDatas = await updateOrder(data, orderId);  
                setOrdersData(newOrderDatas?.data);
                setOrderStorage([...newOrderDatas?.data?.order_storage]);  
                console.log('NEW_ORDER_DATA_ORDER: ', newOrderDatas?.data)  
                alert(`Замовлення id ${orderId} збереженно,  товари оновлені.`);
            
            } 
            if(orderId && state.length === 0){
                alert("Товари не додані");
            }
            if (orderId && state.length !== 0 && disableBtnOk === true){
                //const newStorage = () => {
                orderStorage?.forEach(async(itemsOrd: any, index: any): Promise<any> => {
                    //await updateOrderStorage(itemsOrd);
                    if (itemsOrd.id && state[index].id && itemsOrd.price !== state[index].price) {
                        const addCommitTo: any = await addCommentsToOrder({
                            id_user: user._user?.sub.id_user,
                            comments: `Змінено ціну поз (${index + 1}): ${itemsOrd.price} => ${state[index].price}`,
                            id_order: orderId,
                            id_order_sup: null
                        });
                        setAddNewCommit(addCommitTo?.data); 
                    }
                });
                orderStorage?.splice(0, orderStorage.length);
                state.forEach(async (itemGoods: CreateGoods): Promise<any> => {
                    let resultOrder: any = await createGoodsToOrder(itemGoods, orderId);
                    console.log('UPDATE_ORDER_STORAGE: ', resultOrder.data);
                   
                });
                //}
                //newStorage();
                setDisableBtnOk(true);
                console.log('UDATE_DATA_ORDER: ', data);
                const newOrderData = await updateOrder(data, orderId);
                if (data.status === 'Відвантажено' &&
                    (data.delivery === 'Самовивіз' || data.delivery === 'Своя Доставка') && 
                    ordersData.id_order
                ) {
                    await addCommentsToOrder({
                        id_user: user._user?.sub.id_user, 
                        comments: `Замовлення №${ordersData.id_order}, Переведено в статус -> Відвантажено`,
                        id_order: ordersData.id_order,
                        id_order_sup: null
                    });
                    newOrderData?.data?.order_sup?.forEach(async (supData: any): Promise<any> => {
                        await updateOrderSup({status: 'Відвантажено'}, +supData.id_order_sup);
                        await addCommentsToOrder({
                            id_user: user._user?.sub.id_user, 
                            comments: `Замовлення №${ordersData.id_order}/Заявка №${+supData.id_order_sup}, Переведено в статус -> Відвантажено`,
                            id_order: null,
                            id_order_sup: +supData.id_order_sup
                        })
                    });
                }
                setOrdersData(newOrderData?.data);
                setOrderStorage([...newOrderData?.data?.order_storage]);
                console.log('NEW_ORDER_DATA_ORDER: ', newOrderData?.data)
                alert(`Товари до замовлення id ${orderId}, оновлено.`);
            } 

            // } else {
            //     alert('Помилка! Перевірте всі необхідні данні або оновіть сторінку') 
            // }
            //e.stopPropagation();
        } catch (error){
            alert('Помилка! Перевірте данні або оновіть сторінку');
            console.log('ERROR_ORDER: ', error);
        }    
    }    

    const onSubmitOrder = async () => {
        try {
            if(orderId && orderStorage?.length !== 0) {
                orderStorage?.forEach(async(itemsOrd): Promise<any> => {
                    let resOrd: any = await addGoodsToOrder(itemsOrd);
                    console.log('ON_SUBMIT_GOODS_TO_ORDER: ', resOrd.data);
                })
                alert(`Замовлення id${orderId} проведено, товари до замовлення додані і збережені `)
                setDisableBtnOk(!disableBtnOk);
            } else {
                alert("Треба добавити товари. І зберегти замовлення.");
            }
        } catch (error:any) {
            alert (
                `Помилка. Не вірні данні, не вистачае залишків,
                або системна помилка: ` + error.message
            )
        }      
    };

    const setDopGarantyOrder = () => {
        if (!getValues('dop_garanty')) {
            setValue('dop_garanty', (orderSum * 0.1).toFixed() ?? 0);
            setValue('total_cost', (Number(ordersData?.delivery_cost ?? 0) + Number(ordersData?.commission_cost ?? 0) + orderSum * 0.1 + orderSum ?? 0).toFixed() - Number(ordersData?.bonus_decrease ?? 0));
            setOrdersData({
                ...ordersData, 
                dop_garanty: (orderSum * 0.1).toFixed(),
                total_cost: 
                (ordersData?.delivery_cost + ordersData?.commission_cost + orderSum * 0.1 + orderSum).toFixed() - ordersData?.bonus_decrease,
            });
            console.log('GET_DOP_GAR: ', getValues('dop_garanty')) 
        } else {
            setValue('dop_garanty', null); 
            setValue('total_cost', (Number(ordersData?.delivery_cost ?? 0) + Number(ordersData?.commission_cost ?? 0) + 0 + orderSum ?? 0) - Number(ordersData?.bonus_decrease ?? 0));
            setOrdersData({...ordersData, dop_garanty: null,
                total_cost: 
                (ordersData?.delivery_cost + ordersData?.commission_cost + 0 + orderSum) - ordersData?.bonus_decrease,
            });
            console.log('GET_DOP_GAR: ', getValues('dop_garanty'))
        }
    };

    const setBonusDecreaseOrder = (e: any) => {
        if (+e.target.value <= addCustomer?.contract[0]?.bonus!) {
            setValue('bonus_decrease', +e.target.value); 
            setValue('total_cost', (Number(ordersData?.delivery_cost ?? 0) + Number(ordersData?.commission_cost ?? 0) + Number(ordersData?.dop_garanty ?? 0) + orderSum ?? 0) - +e.target.value);
            setOrdersData({...ordersData, bonus_decrease: +e.target.value,
                total_cost: 
                (Number(ordersData?.delivery_cost ?? 0) + Number(ordersData?.commission_cost ?? 0) + Number(ordersData?.dop_garanty ?? 0) + orderSum ?? 0) - +e.target.value,
            });
        }
        if (+e.target.value > addCustomer?.contract[0]?.bonus!) {
            setValue('bonus_decrease', +e.target.value - (+e.target.value - addCustomer?.contract[0]?.bonus!));
            setValue('total_cost', (Number(ordersData?.delivery_cost ?? 0) + Number(ordersData?.commission_cost ?? 0) + Number(ordersData?.dop_garanty ?? 0) + orderSum) - +e.target.value - (+e.target.value - addCustomer?.contract[0]?.bonus!)); 
            setOrdersData({...ordersData, bonus_decrease: +e.target.value - (+e.target.value - addCustomer?.contract[0]?.bonus!),
                total_cost: 
                (Number(ordersData?.delivery_cost ?? 0) + Number(ordersData?.commission_cost ?? 0) + Number(ordersData?.dop_garanty ?? 0) + orderSum) - +e.target.value - (+e.target.value - addCustomer?.contract[0]?.bonus!),
            }); 
        }
        if (!addCustomer?.contract[0]?.bonus! && !ordersData?.bonus_decrease) {
            setValue('bonus_decrease', 0); 
            setValue('total_cost', (Number(ordersData?.delivery_cost ?? 0) + Number(ordersData?.commission_cost ?? 0) + Number(ordersData?.dop_garanty ?? 0) + orderSum) - 0);
            setOrdersData({...ordersData, bonus_decrease: 0,
                total_cost: 
                (Number(ordersData?.delivery_cost ?? 0) + Number(ordersData?.commission_cost ?? 0) + Number(ordersData?.dop_garanty ?? 0) + orderSum) - 0,
            });
        }
    };

    const setDeliveryCostOrder = (e: any) => {
        setValue('delivery_cost', +e.target.value);
        setValue('total_cost', (+e.target.value + Number(ordersData?.commission_cost ?? 0) + Number(ordersData?.dop_garanty ?? 0) + orderSum) - Number(ordersData?.bonus_decrease ?? 0));
        setOrdersData({...ordersData, delivery_cost: +e.target.value,
            total_cost: 
            (+e.target.value + Number(ordersData?.commission_cost ?? 0) + Number(ordersData?.dop_garanty ?? 0) + orderSum) - Number(ordersData?.bonus_decrease ?? 0),
        });
    };

    const addComment = async(e: any) => {
        try {
            if (newComment) {
                const addCommit: any = await addCommentsToOrder({
                    id_user: user._user?.sub.id_user, 
                    comments: newComment,
                    id_order: orderId ?? ordersData?.id_order,
                    id_order_sup: null
                }); 
                if (addCommit.data.status === '200' || '201') {
                    alert('Коментар додано');
                    showComment(e);
                    setAddNewCommit(addCommit.data);
                } else {
                    alert(
                        'Коментар не додано, помилка! (можливо ви не зберегли замовлення)'
                    );
                }
            } else {alert('Треба написати коментар')}
        } catch (error) {
            console.log(error)
        }    
    };
    //console.log('COMMENT: ', newComment);
    //console.log('GOODS_ID: ', goodsId);
    //console.log('ORDER_ID: ', orderId);
    //console.log('GET_DOP_GAR: ', getValues('dop_garanty'));
    // console.log('TOTAL_COST: ', getValues('delivery_cost'));
    // console.log('STATE: ', state);
    // console.log('ERRORS_FORM: ', errors);
    // console.log('ORDERS_STORAGE : ', orderStorage);
     //console.log('ORDER_DATA: ', ordersData);
    // console.log('PURCHASE_PRICE: ', purchaseGoods);

    return (
        <div >
            Замовлення Покупця
            <div className="containerAdmOrderForm"
                onClick={cancelCityList}
            >
            <form 
                onSubmit={handleSubmit(onSubmit)}
            >
                <div className='admFormDataOrder'>
                    <div>
                        <label htmlFor="order_date">Дата</label>
                        <input className="admFormOrderData" 
                            id='order_date'
                            type="text"
                            //type="datetime-local"
                            name="order_date" 
                            data-value={ordersData ? ordersData?.createdAt : ''}
                            defaultValue={ordersData ?
                                new Date(ordersData?.createdAt).toLocaleString() : ''}
                            placeholder="Дата"
                            readOnly={true}
                        />  
                    </div>
                    <div>
                        <label htmlFor="id_order">id </label>
                        <input className="admFormOrderId"
                            id='id_order'
                            type="text"
                            name="id_order"
                            value={orderId ?? ordersData?.id_order ?? ''}
                            placeholder="id замовлення"
                            readOnly={true}
                        />  
                    </div>
                    <div>
                        <label htmlFor="organisationOrder">Організація </label>
                        <select className="admFormOrderOrganiz" 
                            id='organisationOrder'
                            {...register('organisation',)}
                            name="organisationOrder"
                            defaultValue={ordersData?.organisation ?? ''}
                            onChange={(e) => setValue('organisation', e.target.value)} 
                        >
                            <option value={"ФОП Шемендюк К.В."}>
                                ФОП Шемендюк К.В.
                            </option>
                            <option value={"ТОВ Скай-Партс"}>
                                ТОВ Скай-Партс</option>
                        </select>  
                    </div>
                    <div>
                        <label htmlFor="storageOrder">Склад </label>
                        <select className="admFormOrderStorage" 
                            {...register('storage', {required: 'Це необхідні дані'})}
                            id='storageOrder'
                            name="storageOrder"
                            defaultValue={ordersData?.storage ?? ''}
                            onChange={(e) => setValue('storage', e.target.value)}
                        >
                            <option value={'Постачальник'}>
                                Постачальник
                            </option>
                            <option value={'Основний Харків'}>
                                Основний Харків
                            </option>
                            <option value={'Основний Харків-1'}>
                                Основний Харків-1
                            </option>
                            <option value={'Віддалений Дніпро-1'}>
                                Віддалений Дніпро-1
                            </option>
                        </select>  
                    </div>
                    <div>
                        <label htmlFor="order_view">Вид </label>
                        <select className="admFormOrderView" 
                            {...register('order_view', {required: 'Це необхідні дані'})}
                            id='order_view'
                            name="order_view"
                            defaultValue={ordersData?.order_view ?? ''}
                            onChange={(e) => setValue('order_view', e.target.value)}
                            >
                                <option value="Сайт">
                                    Сайт
                                </option>
                                <option value="Роздріб">
                                    Роздріб
                                </option>
                                <option value="Опт">
                                    Опт
                                </option>
                                <option value="Інше">
                                    Інше
                                </option>
                        </select>  
                    </div>
                    <div>
                        <label htmlFor="status_order">Статус </label>
                        <select className="admFormOrderStatus" 
                            {...register('status', {required: 'Це необхідні дані'})}
                            id='status_order'
                            name="status_order"
                            defaultValue={ordersData?.status ?? ''}
                            onChange={(e) => setValue('status', e.target.value)}
                        >   
                            <option value="Новий">
                                Новий
                            </option>
                            <option value="Уточнення">
                                Уточнення 
                            </option>
                            <option value="Підтвердження">
                                Підтвердження
                            </option>
                            <option value="На Відгрузку">
                                На Відгрузку
                            </option>
                            <option value="Відвантажено">
                                Відвантажено
                            </option>
                            <option value="Завершено">
                                Завершено
                            </option> 
                            <option value="Повернення">
                                Повернення
                            </option> 
                            <option value="Відміна">
                                Відміна
                            </option> 
                        </select>    
                    </div>
                    <div>
                        <div className='admFormOrderCustm'>
                            <label htmlFor="customerOrder">Покупець </label>
                            <input  className="admFormOrderName"
                                id='customerOrder'
                                type="text"
                                {...register("id_customer", {required: 'Це необхідні дані'})}
                                name="customerOrder" 
                                maxLength={45}
                                placeholder="Ім'я або назва.."
                                value={addCustomer?.name ?? ordersData?.customer?.name ?? ''}
                                readOnly={true}
                                //onChange={() => setAddCustomer(addCustomer)}
                            />
                            <div
                                onClick={(e)=>e.preventDefault()}
                            >
                                <button onClick={openCustomerForm} className='admFormSearchCustm'>
                                    <i className="fas fa-search"></i>    
                                </button> 
                            </div>
                            <div
                                onClick={(e)=>e.preventDefault()}
                            >
                                <button onClick={activeCustomer}
                                    className='admFormAddCustm'>
                                    <i className="fas fa-plus"></i>    
                                </button>  
                            </div>         
                        </div>    
                    </div>
                    <div>
                        <label htmlFor="id_contractOrder"> Контракт </label>
                        <select className="admFormOrderContract" 
                            {...register('id_contract', {required: 'Це необхідні дані'})}
                            id='id_contractOrder'
                            name="id_contractOrder"
                            defaultValue={addCustomer?.contract[0]?.id_contract ?? ordersData?.id_contract}
                            >
                           {addCustomer ? addCustomer?.contract?.map(
                            (entity:{name: string; id_contract:number;}, index:number)=> (  
                                <option key={'contract' + index} 
                                value={entity.id_contract}
                                >
                                    {entity.name} {entity.id_contract} 
                                </option>
                                )) 
                                : 
                                <option data-value={ordersData?.id_contract}>
                                    {ordersData?.id_contract}
                                </option>
                            } 
                        </select>
                    </div>
                    <div>
                        <label htmlFor="deliveryOrder">Перевізник </label>
                        <select className="admFormOrderDelivery" 
                            {...register('delivery', {required: 'Це необхідні дані'})}
                            id='deliveryOrder'
                            name="deliveryOrder"
                            defaultValue={ordersData?.delivery ?? ''}
                            onChange={chooseDelivery}
                        >
                            <option value="Самовивіз">
                                Самовивіз
                            </option>
                            <option value="Своя Доставка">
                                Своя Доставка
                            </option>
                            <option value="Нова Пошта">
                                Нова Пошта
                            </option>
                            <option value="Делівері">
                                Делівері
                            </option>
                        </select>    
                    </div>
                    <div>
                    <label htmlFor="deliveryCityOrder">Місто </label>
                        <input className="admFormOrderDeliveryCity"
                            id='deliveryCityOrder'
                            type="search"  
                            maxLength={45}
                            placeholder="Місто.."
                            //{...register('delivery_city')}
                            name="deliveryCityOrder"
                            onChange={cityInputActive}
                            defaultValue={ordersData?.delivery_city ?? ''}
                        />  
                    </div>
                    <div 
                        className='orderCityList' 
                        onClick={(e:any) => e.stopPropagation()}       
                    > 
                    {cityListActive && delivery !== "Делівері" ?
                        cityListActive && cityList?.map((city: ICity) =>
                        <div className='orderCityListItem'
                            data-delivery={city.DeliveryCity}
                            data-city={city.MainDescription}
                            onClick={cityChooseActive}
                            key={city.Present}>
                        <label htmlFor={city.Present}>
                            <input 
                                id={city.Present}
                                value={city.Present}
                                type='radio'
                                name={city.Present}
                                readOnly={true}
                            />
                            {city.Present}
                        </label>    
                        </div>
                        )
                        : null
                    }
                    {cityListActive && delivery === "Делівері" ?
                        cityListActive && cityListDelivery?.map((city: ICityDel) =>
                        <div className='orderCityListItem'
                            data-delivery={city.id}
                            data-city={city.name}
                            onClick={cityChooseActive}
                            key={city.id}>
                        <label htmlFor={city.id}>
                            <input 
                                id={city.id}
                                value={city.name}
                                type='radio'
                                name={city.name}
                                readOnly={true}
                            />
                            {city.name + ', ' + city.districtName + ', ' + city.regionName}
                        </label>    
                        </div>
                        )
                        : null
                    }
                    </div>   
                    <div>
                    <label htmlFor="delivery_city_depart">віддл </label>
                        <input className="admFormOrderDeliveryCityDep"
                            id='delivery_city_depart'
                            type="search"  
                            maxLength={45}
                            placeholder="Відділення.."
                            //{...register('delivery_city_depart')}
                            name="delivery_city_depart"
                            defaultValue={ordersData?.delivery_city_depart ?? ''}
                        />  
                    </div> 
                    {delivery === "Нова Пошта" && chooseCity && !cityListActive && !dataDepartment ?    
                        <div 
                            className='orderDepartList' 
                            onClick={(e:any) => e.stopPropagation()}       
                        > 
                            <select 
                                id='delivery_city_dep'
                                className='orderSelectDepart'
                                onChange={chooseDepartEvent}
                            >
                            <option value=''>
                                --віберіть відділення--
                            </option>
                            {chooseCity && departListNovaPoshta?.map((depart: IDepart) =>
                            <option 
                                style={{"width": "400px"}}
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
                    {delivery === "Делівері" && chooseCity && !cityListActive && !dataDepartment?    
                        <div 
                            className='orderDepartList' 
                            onClick={(e:any) => e.stopPropagation()}       
                        > 
                            <select 
                                id='delivery_city_dep'
                                className='orderSelectDepart'
                                onChange={chooseDepartEvent}
                            >
                            <option value=''>
                                --віберіть відділення--
                            </option>
                            {chooseCity && departListDelivery?.map(
                                (depart: IDapertmentDelivery) =>
                                <option 
                                    className='orderSelectDepartItem'
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
                    <div>
                        <label htmlFor="status_delivery">Статус дост </label>
                        <select className="admFormOrderStatusDel" 
                            {...register('status_delivery', {required: 'Це необхідні дані'})}
                            id='status_delivery'
                            name="status_delivery"
                            defaultValue={ordersData?.status_delivery ?? ''}
                            onChange={(e) => setValue('status_delivery', e.target.value)}
                        >
                            <option value="Новий">
                                Новий
                            </option>
                            <option value="Очікує ТТН">
                                Очікує ТТН
                            </option>
                            <option value="Доставляеться">
                                Доставляеться
                            </option>
                            <option value="Відміна">
                                Відміна
                            </option> 
                        </select>    
                    </div>
                    <div 
                        onClick={(e)=>e.preventDefault()}
                    >
                        <button onClick={addGoodsForm} className='admFormOrderBtnAdd'>Додати товар</button>  
                    </div>
                    <div>
                        <label htmlFor="pay_viewOrder">Вид оплати </label>
                        <select className="admFormOrderViewPay" 
                            {...register('pay_view', {required: 'Це необхідні дані'})}
                            id='pay_viewOrder'
                            name="pay_viewOrder"
                            defaultValue={ordersData?.pay_view ?? ''}
                            onChange={(e) => setValue('pay_view', e.target.value)}
                        >
                            <option value="Новий">
                                Новий
                            </option>
                            <option value="Готівка">
                                Готівка
                            </option>
                            <option value="Безготівковий розрахунок">
                                Безготівковий розрахунок
                            </option>
                            <option value="Карта/Терминал (LiqPay)">
                                Карта/Терминал (LiqPay)
                            </option>
                            <option value="Зворотній платіж (Післяплата)">
                                Зворотній платіж (Післяплата)
                            </option>
                            <option value="Відміна">
                                Відміна
                            </option>
                            <option value="Повернення">
                                Повернення
                            </option>
                        </select>    
                    </div>
                    <div>
                    <label htmlFor="status_pay_order">Статус оплати </label>
                        <select className="admFormOrderStatusPay" 
                            {...register('status_pay', {required: 'Це необхідні дані'})}
                            id='status_pay_order'
                            name="status_pay_order"
                            defaultValue={ordersData?.status_pay ?? ''}
                            onChange={(e) => setValue('status_pay', e.target.value)}
                        >
                            <option value="Новий">
                                Новий
                            </option>
                            <option value="Очікує Оплату">
                                Очікує Оплату
                            </option>
                            <option value="Оплачено">
                                Оплачено
                            </option>
                            <option value="Відміна">
                                Відміна
                            </option>
                            <option value="Повернення">
                                Повернення</option>
                            <option value="Наложка Отримана">
                                Наложка Отримана
                            </option>
                        </select>    
                    </div> 
                    <div>
                        <label htmlFor="delivery_ttn_order">ТТН </label>
                        <input className="admFormOrderTtn"
                            id='delivery_ttn_order'
                            type="text"  
                            maxLength={45}
                            placeholder="ТТН замовлення.."
                            {...register('delivery_ttn')}
                            name="delivery_ttn_order"
                            defaultValue={ordersData?.delivery_ttn ?? ''}
                        />  
                    </div>
                </div>
                <div className='admFormOrderTableBox'
                    onClick={(e)=>e.preventDefault()}
                >   
                <table className='admFormOrderTable'>
                    <thead className='admFormOrderTableTh'>
                        <tr>
                            <th>id</th>
                            <th>Товар</th>
                            <th>Категорія</th>
                            <th>Кількість</th>
                            <th>Резерв</th>
                            <th>Ціна</th>
                            <th>Сума</th>
                            <th>Склад</th>
                            <th>Опціі</th>
                        </tr>     
                    </thead>
                    <tbody>
                        {state?.length !== 0 ? 
                            state?.map((
                                item:{
                                id:number,    
                                quantity: number;
                                total: number; 
                                reserve: number;
                                full_name:string, 
                                category:string, 
                                price:number,
                                id_storage: number,
                                }, 
                                index:number
                            ) =>(
                        <tr key={item.id + index} 
                            onInput={(e) => e.stopPropagation()}
                        >
                            <td >{item.id}</td>
                            <td >{item.full_name}</td>
                            <td >{item?.category}</td>
                            <td 
                                onInput={(e) => e.stopPropagation()}
                            >
                                <input 
                                    id={'quantity'+ item.id}
                                    type="text"
                                    name="quantity"
                                    value={item?.quantity ?? 0}
                                    onInput={(e) => onChangeInput(e, item.id, index)}
                                    placeholder="Введіть цифри"
                                />
                            </td>
                            <td >{item?.reserve ?? 0}</td>
                            <td  
                                onInput={(e) => e.stopPropagation()}
                            >
                                <input 
                                    id={'price' + item.id}
                                    type="text"
                                    name="price"
                                    value={item?.price ?? 0}
                                    onInput={(e) => onChangeInput(e, item.id, index)}
                                    placeholder="Введіть цифри" 
                                />
                            </td>
                            <td >{item?.price * item?.quantity}</td>
                            <td >
                                <select className="admFormOrderStorage" 
                                    name="storage_index"
                                    defaultValue={item.id_storage === 1 ? 
                                        'Постачальник' :
                                        item.id_storage === 2 ?
                                        'Основний Харків' :
                                        item.id_storage === 3 ?
                                        'Основний Харків-1' :
                                        item.id_storage === 4 ?
                                        'Віддалений Дніпро-1' : ''
                                    }
                                >
                                    <option value={'Постачальник'}>Постачальник</option>
                                    <option value={'Основний Харків'}>Основний Харків</option>
                                    <option value={'Основний Харків-1'}>Основний Харків-1</option>
                                    <option value={'Віддалений Дніпро-1'}>Віддалений Дніпро-1</option>
                                </select>  
                            </td> 
                            <td>
                                <div 
                                    onClick={e=>e.stopPropagation()}
                                >
                                <button className='closeAdmGoods' 
                                    key={'deleteBtn' + item.id}
                                    value={index}
                                    disabled={disableBtn}
                                    onClick={e => deleteItem(+e.currentTarget.value)}
                                    >
                                    <i className="fa fa-remove"></i>
                                </button>
                                </div>
                            </td>
                            
                        </tr>
                        ))
                        : 
                        <tr>
                            <td>Очікуємо товари......</td>
                        </tr>
                        }   
                    </tbody>
                </table>
                </div>
                <div className='admFormOrderNotes'>
                    <label htmlFor="notesOrder">Нотатки</label>
                    <textarea className="admFormOrderNotesText"  
                        {...register('notes')}
                        id="notesOrder"
                        name="notesOrder"
                        value={ordersData?.notes ?? ''}
                        placeholder="Пишить нотатку..">
                    </textarea> 
                    <label htmlFor="deliveryOrderCost">Доставка </label>
                    <input  className="admFormOrderDeliveryCost"
                        id='deliveryOrderCost'
                        type="text"
                        {...register('delivery_cost')}
                        name="deliveryOrderCost" 
                        maxLength={45}
                        placeholder="Сума доставки.."
                        defaultValue={ordersData?.delivery_cost}
                        onChange={setDeliveryCostOrder}
                    />
                    <label htmlFor="bonusOrder">Бонуси(-) </label>
                    <input  className="admFormOrderBonus"
                        id='bonusOrder'
                        type="text"
                        {...register('bonus_decrease')}
                        name="bonusOrder" 
                        maxLength={45}
                        placeholder="Бонуси.."
                        defaultValue={ordersData?.bonus_decrease ?? 0}
                        onChange={setBonusDecreaseOrder}
                    />
                    <div className='admFormOrderNotesDopGar'>
                    <label htmlFor="dopGaranty">Доп. гар </label>
                    <input  className="admFormOrderDopGarCost"
                        id='dopGaranty'
                        type="checkbox"
                        {...register('dop_garanty')}
                        name="dopGaranty" 
                        maxLength={45}
                        placeholder="Доп гар.."
                        //defaultValue={ordersData?.dop_garanty ?? 0}
                        defaultChecked={ordersData?.dop_garanty}
                        onChange={setDopGarantyOrder}
                    />
                    </div>
                </div>
                <div className='admFormOrderCommit'
                    onClick={(e)=>e.preventDefault()}
                    >
                    <div className='admFormOrderAddCommit'>
                    <button className='admFormOrderBtnAdd'
                        value={orderId ?? ordersData?.id_order}
                        onClick={addComment}
                        >Додати коментар
                    </button>
                        <textarea 
                        name='commentsOrder'
                        className='admOrderCommitText'
                        value={newComment}
                        onChange={e =>setNewComment(e.target.value)}
                        placeholder="Напишіть коментар.."
                        >        
                        </textarea>
                    </div>
                    <div className='admFormOrderCommitChat'>
                        {/* {comments?.length !== 0 ? */}
                          <AdminComment 
                            main={false}
                            newCommit={addNewCommit}
                            comments={comments}/>
                        {/* //   : <span>... очікуємо коментарі ...</span>  
                        // } */}
                    </div>  
                </div>
                <div className='admOrderFormGrp'>
                    <div>
                        <button className={!disableBtnOk ? 'admFormOrderBtnOk' : 'admFormOrderBtnOkDsb'}
                            disabled={disableBtnOk}
                            onClick={onSubmitOrder}>
                            Ok
                        </button>
                    </div>
                    <div>
                        <button className={!disableBtn ? 'admFormOrderBtnSave' : 'admFormOrderBtnSaveDsb'}
                            disabled={disableBtn} 
                            onClick={handleSubmit(onSubmit)}
                        >
                            {updateBtn ?? 'Зберегти'}
                        </button>
                    </div>
                    <div 
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button className='admFormOrderBtn' onClick={setActive}>Відмінити</button>
                    </div>
                    <span className='admFormOrderUserInfo'>id: {ordersData?.user?.id_user ?? user._user?.sub?.id_user ?? ''}</span>
                    <span className='admFormOrderUserInfo'>користувач: {ordersData?.user?.name ?? user?._user?.sub?.name ?? ''}</span>
                    <span className='admFormOrderUserInfo'>посада: {ordersData?.user?.role ?? user._user?.sub?.role ?? ''}</span>
                    <span className='admFormOrderEstimate'>
                        доп гарант: {ordersData?.dop_garanty ?? getValues('dop_garanty') ?? 0}
                    </span>
                    <span className='admFormOrderEstimate'>
                        бонус (мінус): {ordersData?.bonus_decrease ?? getValues('bonus_decrease') ?? 0}
                    </span>
                    <span className='admFormOrderEstimate'>
                        доставка (загалом): {ordersData?.delivery_cost ?? getValues('delivery_cost') ?? 0}
                    </span>
                    <span className='admFormOrderEstimate'>
                        комісія банку: {ordersData?.commission_cost ?? getValues('commission_cost') ?? 0}</span>
                    <span className='admFormOrderEstimate'>
                        Сума товарів: {orderSum}
                    </span>
                    <span className='admFormOrderEstimateOverall'>
                        Сума замовлення: {getValues('total_cost') ?? ordersData?.total_cost ?? 0}
                    </span>
                    {purchaseGoods.length !== 0 && user._user?.sub?.role === 'admin' ?
                    <>
                        <span className='admFormOrderProfit'>
                            сума закупівлі: {purchaseGoods?.reduce((sum:any, current:any) => sum + current)}
                        </span>
                        <span className='admFormOrderProfit'>
                            заробіток загалом: {orderSum - purchaseGoods?.reduce((sum:any, current:any) => sum + current)}
                        </span>
                        <span className='admFormOrderProfit'>
                            націнка загалом: {((orderSum / purchaseGoods?.reduce(
                            (sum:any, current:any) => sum + current) - 1) * 100).toFixed(1) ?? '0'}%
                        </span>

                    </>
                        : null
                    }
                </div>
            </form>
        </div>
            {openCustomers ?
                <ModalAdmin active={openCustomers} setActive={setOpenCustomers} >
                    <AdminModalCustomers 
                        allCustomer={customer}
                        addCustomer={addCustToOrder}/>
                </ModalAdmin> : null  
            }
            {createCustomer ?
                <ModalAdmin active={createCustomer} setActive={setCreateCustomer}>
                    <AdminModalCustomerCreate 
                        active={createCustomer} 
                        setActive={setCreateCustomer}
                        setAddCustomer={setAddCustomer}
                    />    
                </ModalAdmin> : null
            }
            {addGoods ? 
                <ModalAdmin active={addGoods} setActive={setAddGoods}>
                    <AdminModalGoods 
                        showRowModData={addGoodsToList}
                        props={props}
                        storageGoods={storages}
                    />
                </ModalAdmin> : null
            }
            {errors.id_contract || errors.id_customer ?
                <span style={{'color': 'red'}}>Помилка! Не заповнені всі дані (покупця).</span> 
                : null
            }
        </div>
    );
});

export default AdminFormOrder;