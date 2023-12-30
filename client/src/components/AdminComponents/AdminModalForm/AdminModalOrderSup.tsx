import React, { Reducer, useCallback, useContext, useEffect, useReducer, useState } from 'react';
import '../../../css/AdminComponentCss/AdminModalFormCss/AdminModalOrderSup.css';
import { useForm } from 'react-hook-form';
import { Context } from '../../../context/Context';
import { IFormOrder } from './interfaces/FormOrders.interface';
import AdminComment from '../adminContent/AdminComment';
import ModalAdmin from '../../modal/ModalAdmin';
import { reducer } from './reducer/goodsReducer';
import { observer } from 'mobx-react-lite';
import { ActionReducer, ActionType, StateReducer } from './types/OrderReducer.type';
import { createInitialState } from './reducer/initialState';
import AdminModalGoods from './AdminModalGoods';
import AdminModalSupplier from './AdminModalSupplier';
import { addCommentsToOrder, addGoodsToOrderSup, createGoodsToOrderSup, createOrderSupForm, deleteGoodsFromOrderSup, getAdminPriceTyresById, getAdminPriceWheelsById, requestToSupplier, updateOrder, updateOrderSup } from '../../../restAPI/restAdminAPI';
import { CreateGoods } from './types/CreateGoods.type';
import { IModalFormOrder } from './types/FormOrders.type';

const AdminModalOrderSup = observer((
    {
        goodsId,
        supplier,
        comments,
        setActive,
        showComment,
        storages,
        getOrdersSupData, 
        props
    }: IFormOrder) => {
    const {user} = useContext<any | null>(Context);
    const [tyreDatas, wheelDatas] = props;
    const [orderSupId, setOrderSupId] = useState<number | null | undefined>(null);
    const [orderSupData, setOrderSupData] = useState<any | null>(getOrdersSupData);
    const [addGoods, setAddGoods] = useState<boolean>(false);
    const [createSupplier, setCreateSupplier] = useState<boolean>(false);
    const [openSupplier, setOpenSupplier] = useState<boolean>(false);
    const [addSupplier, setAddSupplier] = useState<IModalFormOrder | undefined>(undefined);
    const [disableBtn, setDisableBtn] = useState<boolean>(false);
    const [disableBtnOk, setDisableBtnOk] = useState<boolean>(false);
    const [orderSupStorage, setOrderSupStorage] = useState<any[] | undefined>([]);
    const {register, handleSubmit, setValue, getValues, formState: {errors}} = useForm();    
    const [state, dispatch] = useReducer<Reducer<StateReducer, ActionReducer>>(
        reducer, createInitialState(goodsId, getOrdersSupData)
    );
    const [newComment, setNewComment] = useState<string | undefined>();
    const [addNewCommit, setAddNewCommit] = useState();
    const [updateBtn, setUpdateBtn] = useState<string | null>(null); 
    const [purchaseGoods, setPurchaseGoods] = useState<any[]>([]);
    const [requestSupplier, setRequestSupplier] = useState<boolean>(false);

    const orderSum = state?.reduce((sum:any, current:any) => 
        sum + (+current.price * current.quantity), 0
    );

    useEffect(() => {
        if (orderSupData && supplier && !addSupplier) {
            let supplierFound: any;
            setOrderSupId(orderSupData?.id_order_sup);
            setOrderSupStorage(orderSupData?.orders_sup_storage ?? orderSupData?.order_storage);
            if (orderSupData?.id_order_sup) {
               setUpdateBtn('Оновити'); 
            }
            console.log('SUPPLIER: ', supplier);
            if (orderSupData?.order_storage) {
                supplierFound = supplier!.find(
                    (items: any) => 
                    +items?.id_supplier === orderSupData?.order_storage![0]?.id_supplier
                );
            }
            if (orderSupData?.orders_sup_storage) {
                supplierFound = supplier!.find(
                    (items: any) => 
                    +items?.id_supplier === orderSupData?.orders_sup_storage![0]?.id_supplier
                );
            }
            // const supplierFoundOrderSup = supplier!.find(
            //     (items: any) => 
            //     +items?.id_supplier === orderSupData?.order_sup_storage![0]?.id_supplier
            // );
            if (supplierFound) {
                setAddSupplier(supplierFound);
            }
            if (orderSupData.disableBtns) {
                setDisableBtn(true);
                setDisableBtnOk(true); 
            }
        }
    },[addSupplier, orderSupData, supplier])
    
    // useEffect(() => {
    //     if (ordersData) {
    //         setOrderId(ordersData?.id_order);
    //         setOrderStorage(ordersData?.order_storage);
    //         setUpdateBtn('Оновити');
    //         if (ordersData.disableBtns) {
    //             setDisableBtn(true);
    //             setDisableBtnOk(true); 
    //         }
    //     }
    // },[ordersData, state]);

    useEffect(() => {
        register("id_user", {required: 'Це необхідні дані'});
        setValue("id_user", user._user?.sub.id_user);
        if (addSupplier) {
            setValue("id_supplier", addSupplier?.id_supplier,
            { shouldValidate: true });
            setValue("id_contract", addSupplier?.contract[0]?.id_contract,
            { shouldValidate: true })
        }
        
    }, [register, setValue, addSupplier, user])
    
    
    useEffect(() => {
        let isMounted = false;
        let arrPurchase: number[] | null = [];
        const calcPurchase = async () => {  
            if (!isMounted && orderSupStorage) { 
                orderSupStorage?.forEach(async (orderSupData: any, index: number) => {
                let priceByIdTyre = await getAdminPriceTyresById(orderSupData.id ?? 0);
                let priceByIdTWheel = await getAdminPriceWheelsById(orderSupData.id ?? 0);
                let priceTyreOnSup = priceByIdTyre?.find((tyre: any) => tyre?.id_supplier === state[index]?.id_supplier);
                let priceWheelOnSup = priceByIdTWheel?.find((tyre: any) => tyre?.id_supplier === state[index]?.id_supplier);
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
    },[orderSupStorage, state]);

    useEffect(() => {
        register("id_order")
        register("total_cost");
        register('total_purchase_cost');
        setValue("id_order", +orderSupData?.id_order);
        setValue("total_cost", orderSupData?.total_cost ?? Number(getValues('delivery_cost') ?? 0) + orderSum);
        setValue('total_purchase_cost', purchaseGoods.reduce((sum:any, current:any) => sum + current, 0));
    }, [orderSum, purchaseGoods, orderSupData, register, setValue, getValues]);

    const onChangeInput = useCallback(
        (e: any, id: number, indexItem: number) => {
        let {name, value} = e.target;
        dispatch({type: ActionType.EDITITEM, 
            editItem: state.map(
                (item: {id: number; price: number; quantity: number; price_wholesale: number}, 
                    index: number) => {
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
    },[state])
    
    const addGoodsForm = () => {
        setAddGoods(!addGoods);
    };

    const activeCustomer = () => {
        setCreateSupplier(!createSupplier);
    };
    const openSupplierForm = () => {
        setOpenSupplier(!openSupplier);
    };  
    
    const addSupplierToOrderSup = async (e: any) => {
        //console.log(valueCust);
        const findSupplier = supplier!.find(
            (items:{id_supplier:number}) => +items?.id_supplier === +e.currentTarget.getAttribute('data-value')
        );
        if (findSupplier) {
            setAddSupplier(findSupplier);  
            setOpenSupplier(!openSupplier);
        }
    }

    const addGoodsToList = async (value:string) => {
        const newArr = value.split(',');
        let [idValue, indexValue] = newArr;
        const addTyresSup: any = tyreDatas?.find((item:{id:string}) => item?.id === idValue);
        const addWheelSup: any = wheelDatas?.find((item:{id:string}) => item?.id === idValue);
        dispatch({type: ActionType.ADDTYRE, 
            addTyre: addTyresSup,
            indexPrice: indexValue,
        });

        dispatch({type: ActionType.ADDWHEEL, 
            addWheel: addWheelSup,
            indexPrice: indexValue,
        }); 
        if (addTyresSup) {
            setOrderSupStorage(oldOrdStor => [...oldOrdStor!, 
                {...addTyresSup, 
                    "price": addTyresSup.price[indexValue].price,
                    "id_tyre": addTyresSup.price[indexValue].id_tyre,
                    "price_wholesale": addTyresSup.price[indexValue].price_wholesale,
                    "old_price": addTyresSup.price[indexValue].old_price,
                    "id_supplier": addTyresSup.price[indexValue].id_supplier,
                    "id_storage": addTyresSup.price[indexValue].id_storage,
                    "delivery_price": addTyresSup.price[indexValue].delivery_price,
                    "price_plus_delivery": addTyresSup.price[indexValue].price_plus_delivery,
                    "update_date": addTyresSup.price[indexValue].update_date,
                    "category": addTyresSup.category.category,
                    "quantity": "4",
                }
            ]);
        }    
        if (addWheelSup) {
            setOrderSupStorage(oldOrdStor => [...oldOrdStor!, 
                {...addWheelSup, 
                    "price": addWheelSup.price[indexValue].price,
                    "id_wheel": addWheelSup.price[indexValue].id_wheel,
                    "price_wholesale": addWheelSup.price[indexValue].price_wholesale,
                    "old_price": addWheelSup.price[indexValue].old_price,
                    "id_supplier": addWheelSup.price[indexValue].id_supplier,
                    "id_storage": addWheelSup.price[indexValue].id_storage,
                    "delivery_price": addWheelSup.price[indexValue].delivery_price,
                    "price_plus_delivery": addWheelSup.price[indexValue].price_plus_delivery,
                    "update_date": addWheelSup.price[indexValue].update_date,
                    "category": addWheelSup.category.category,
                    "quantity": "4",
                }
            ]);
        }       
    }
//}),[tyreDatas, wheelDatas, customer])

    const deleteItem = async (itemIndex: number) => {
        //e.preventDefault();
        //e.stopPropagation();
        dispatch({type: ActionType.DELETEITEM, 
            deleteItem: itemIndex,
        });
    }

    const onSubmit = async (data: any, e: any) => {
        //e.preventDefault();
        console.log('CREATE_SUP_ORDER: ', data)
        try {
            if (!orderSupId && state.length === 0) {
               let resultForm: any = await createOrderSupForm(data);
                setOrderSupId(+resultForm.data.id_order_sup);
                setOrderSupData(resultForm.data);
                alert(`Замовлення Постачальника створено, id ${resultForm.data.id_order_sup},
                    але товари не додані.
                `); 
            }
            if(!orderSupId && state.length > 0) {
                let resultForm: any = await createOrderSupForm(data);
                orderSupStorage?.splice(0, orderSupStorage.length);
                setOrderSupId(+resultForm.data.id_order_sup);
                setOrderSupData(resultForm.data);
                // if (data.id_order) {
                //     setOrderSupStorage(resultForm?.data?.order_sup_storage)
                // }
                // if (!data.id_order) {
                    state.forEach(async (itemGoods: any): Promise<any> => {
                        let resultOrderSup: any = await createGoodsToOrderSup(itemGoods, resultForm.data.id_order_sup!);
                        setOrderSupStorage(oldOrdStor => [...oldOrdStor!, resultOrderSup.data]);
                    })
                //}
                setUpdateBtn('Оновити');
                alert(`Замовлення створено, id ${resultForm.data.id_order_sup}. 
                    Для підкріплення товарів до замовлення треба натиснути ОК.`);
            }
            if(orderSupId && state.length > 0 && disableBtnOk === false) {
                orderSupStorage?.forEach(async(itemsOrd): Promise<any> => {
                    //await deleteGoodsFromOrderSup(itemsOrd);
                });
                orderSupStorage?.splice(0, orderSupStorage.length);
                state.forEach(async (itemGoods: CreateGoods): Promise<any> => {
                    let resultOrder: any = await createGoodsToOrderSup(itemGoods, orderSupId);
                 setOrderSupStorage(oldOrdStor => [...oldOrdStor!, resultOrder?.data]);  
                });  
                const newOrderSupData = await updateOrderSup(data, orderSupId); 
                if (data.status === 'Уточнення' && orderSupData.id_order) {
                    await updateOrder({status: 'Уточнення'}, orderSupData?.id_order);
                    await addCommentsToOrder({
                        id_user: user._user?.sub.id_user, 
                        comments: `Заявка №${orderSupId}/Замовлення №${orderSupData.id_order}, Переведено в статус -> Уточнення`,
                        id_order: orderSupData.id_order,
                        id_order_sup: null
                    });
                    await addCommentsToOrder({
                        id_user: user._user?.sub.id_user, 
                        comments: `Заявка №${orderSupId}, Переведено в статус -> Уточнення`,
                        id_order: orderSupData.id_order,
                        id_order_sup: null
                    });
                } 
                if (data.status === 'Підтвердження' && orderSupData.id_order) {
                    await updateOrder({status: 'Підтвердження'}, orderSupData?.id_order);
                    await addCommentsToOrder({
                        id_user: user._user?.sub.id_user, 
                        comments: `Заявка №${orderSupId}/Замовлення №${orderSupData.id_order}, Переведено в статус -> Підтвердження`,
                        id_order: orderSupData.id_order,
                        id_order_sup: null
                    });
                    await addCommentsToOrder({
                        id_user: user._user?.sub.id_user, 
                        comments: `Заявка №${orderSupId}, Переведено в статус -> Підтвердження`,
                        id_order: null,
                        id_order_sup: orderSupId
                    });
                }
                if (data.status === 'На Відгрузку' && 
                    (data.delivery !== 'Самовивіз' || data.delivery !== 'Своя Доставка') && 
                    orderSupData.id_order
                    ) {
                    await updateOrder({status: 'На Відгрузку', status_delivery:'Очікує ТТН'}, orderSupData?.id_order);
                    await addCommentsToOrder({
                        id_user: user._user?.sub.id_user, 
                        comments: `Заявка №${orderSupId}/Замовлення №${orderSupData.id_order}, Переведено в статус -> На Відгрузку. Статус доставки -> Очікує ТТН`,
                        id_order: orderSupData.id_order,
                        id_order_sup: null
                    });
                    await addCommentsToOrder({
                        id_user: user._user?.sub.id_user, 
                        comments: `Заявка №${orderSupId}, Переведено в статус -> На Відгрузку. Статус доставки -> Очікує ТТН`,
                        id_order: null,
                        id_order_sup: orderSupId
                    });
                }
                if (data.status === 'На Складі' && 
                    (data.delivery === 'Самовивіз' || data.delivery === 'Своя Доставка') && 
                    orderSupData.id_order
                    ) {
                    await updateOrder({status: 'На Відгрузку'}, orderSupData?.id_order);
                    await addCommentsToOrder({
                        id_user: user._user?.sub.id_user, 
                        comments: `Заявка №${orderSupId}/Замовлення №${orderSupData.id_order}, Переведено в статус -> На Відгрузку`,
                        id_order: orderSupData.id_order,
                        id_order_sup: null
                    });
                    await addCommentsToOrder({
                        id_user: user._user?.sub.id_user, 
                        comments: `Заявка №${orderSupId}, Переведено в статус -> На Відгрузку`,
                        id_order: null,
                        id_order_sup: orderSupId
                    });
                }
                if (data.status === 'Відвантажено' &&
                    (data.delivery !== 'Самовивіз' || data.delivery !== 'Своя Доставка') && 
                    orderSupData.id_order
                ) {
                    await updateOrder({status: 'Відвантажено', status_delivery:'Доставляеться'}, orderSupData?.id_order);
                    await addCommentsToOrder({
                        id_user: user._user?.sub.id_user, 
                        comments: `Заявка №${orderSupId}/Замовлення №${orderSupData.id_order}, Переведено в статус -> Відвантажено`,
                        id_order: orderSupData.id_order,
                        id_order_sup: null
                    });
                    await addCommentsToOrder({
                        id_user: user._user?.sub.id_user, 
                        comments: `Заявка №${orderSupId}, Переведено в статус -> Відвантажено`,
                        id_order: null,
                        id_order_sup: orderSupId
                    });
                }
                console.log('UPDATE_ORDER_SUP: ', newOrderSupData)
                setOrderSupData(newOrderSupData?.data);  
                alert(`Замовлення id ${orderSupId} збереженно,  товари оновлені.`);
            } 
            if(orderSupId && state.length === 0) {
                alert("Товари не додані");
            }
            if (orderSupId && state.length !== 0 && disableBtnOk === true){
                const newStorage = () => {
                orderSupStorage?.forEach(async(itemsOrd): Promise<any> => {
                    //await deleteGoodsFromOrderSup(itemsOrd);
                });
                orderSupStorage?.splice(0, orderSupStorage.length);
                state.forEach(async (itemGoods: CreateGoods): Promise<any> => {
                    let resultOrder: any = await createGoodsToOrderSup(itemGoods, orderSupId);
                    setOrderSupStorage(oldOrdStor => [...oldOrdStor!, resultOrder?.data]);
                });
                }
                newStorage();
                setDisableBtnOk(!disableBtnOk);
                const newOrdersSupData = await updateOrderSup(data, orderSupId);
                if (data.status === 'Уточнення' && orderSupData.id_order) {
                    await updateOrder({status: 'Уточнення'}, orderSupData?.id_order);
                    await addCommentsToOrder({
                        id_user: user._user?.sub.id_user, 
                        comments: `Заявка №${orderSupId}/Замовлення №${orderSupData.id_order}, Переведено в статус -> Уточнення`,
                        id_order: orderSupData.id_order,
                        id_order_sup: null
                    });
                    await addCommentsToOrder({
                        id_user: user._user?.sub.id_user, 
                        comments: `Заявка №${orderSupId}, Переведено в статус -> Уточнення`,
                        id_order: orderSupData.id_order,
                        id_order_sup: null
                    });
                } 
                if (data.status === 'Підтвердження' && orderSupData.id_order) {
                    await updateOrder({status: 'Підтвердження'}, orderSupData?.id_order);
                    await addCommentsToOrder({
                        id_user: user._user?.sub.id_user, 
                        comments: `Заявка №${orderSupId}/Замовлення №${orderSupData.id_order}, Переведено в статус -> Підтвердження`,
                        id_order: orderSupData.id_order,
                        id_order_sup: null
                    });
                    await addCommentsToOrder({
                        id_user: user._user?.sub.id_user, 
                        comments: `Заявка №${orderSupId}, Переведено в статус -> Підтвердження`,
                        id_order: null,
                        id_order_sup: orderSupId
                    });
                }
                if (data.status === 'На Відгрузку' && 
                    (data.delivery !== 'Самовивіз' || data.delivery !== 'Своя Доставка') && 
                    orderSupData.id_order
                    ) {
                    await updateOrder({status: 'На Відгрузку', status_delivery:'Очікує ТТН'}, orderSupData?.id_order);
                    await addCommentsToOrder({
                        id_user: user._user?.sub.id_user, 
                        comments: `Заявка №${orderSupId}/Замовлення №${orderSupData.id_order}, Переведено в статус -> На Відгрузку. Статус доставки -> Очікує ТТН`,
                        id_order: orderSupData.id_order,
                        id_order_sup: null
                    });
                    await addCommentsToOrder({
                        id_user: user._user?.sub.id_user, 
                        comments: `Заявка №${orderSupId}, Переведено в статус -> На Відгрузку. Статус доставки -> Очікує ТТН`,
                        id_order: null,
                        id_order_sup: orderSupId
                    });
                }
                if (data.status === 'На Складі' && 
                    (data.delivery === 'Самовивіз' || data.delivery === 'Своя Доставка') && 
                    orderSupData.id_order
                    ) {
                    await updateOrder({status: 'На Відгрузку'}, orderSupData?.id_order);
                    await addCommentsToOrder({
                        id_user: user._user?.sub.id_user, 
                        comments: `Заявка №${orderSupId}/Замовлення №${orderSupData.id_order}, Переведено в статус -> На Відгрузку`,
                        id_order: orderSupData.id_order,
                        id_order_sup: null
                    });
                    await addCommentsToOrder({
                        id_user: user._user?.sub.id_user, 
                        comments: `Заявка №${orderSupId}, Переведено в статус -> На Відгрузку`,
                        id_order: null,
                        id_order_sup: orderSupId
                    });
                }
                if (data.status === 'Відвантажено' &&
                    (data.delivery !== 'Самовивіз' || data.delivery !== 'Своя Доставка') && 
                    orderSupData.id_order
                ) {
                    await updateOrder({status: 'Відвантажено', status_delivery:'Доставляеться'}, orderSupData?.id_order);
                    await addCommentsToOrder({
                        id_user: user._user?.sub.id_user, 
                        comments: `Заявка №${orderSupId}/Замовлення №${orderSupData.id_order}, Переведено в статус -> Відвантажено`,
                        id_order: orderSupData.id_order,
                        id_order_sup: null
                    });
                    await addCommentsToOrder({
                        id_user: user._user?.sub.id_user, 
                        comments: `Заявка №${orderSupId}, Переведено в статус -> Відвантажено`,
                        id_order: null,
                        id_order_sup: orderSupId
                    });
                }
                console.log('UPDATE_ORDER_SUP: ', newOrdersSupData)
                setOrderSupData(newOrdersSupData?.data);  
                alert(`Товари до замовлення id ${orderSupId}, оновлено.`);
            }
            e.stopPropagation();
        } catch (error) {
            alert('Помилка!! Не вірні данні або інша помилка.')
            console.log('ERROR_ORDER_SUP: ', error);
        }    
    }    
    //GOOD PERFORM
    const onSubmitOrderSup = async () => {
        try {
            if(orderSupId && orderSupStorage?.length !== 0) {
                orderSupStorage?.forEach(async(itemsOrd): Promise<any> => {
                    let resOrd: any = await addGoodsToOrderSup(itemsOrd);
                    console.log('ON_SUBMIT_GOODS_TO_ORDER: ', resOrd?.data);
                })
                alert(`Замовлення id${orderSupId} проведено, товари до замовлення додані і збережені `)
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

    const sendRequestToSupplier = async () => {
        try {
            if (state.length === 1) {
                const getPositionTyre: any = tyreDatas?.find((item:{id:string}) => +item?.id === state[0].id);
                const getPositionWheel: any = wheelDatas?.find((item:{id:string}) => +item?.id === state[0].id);
                if (getPositionTyre) {
                    const sendReqSupTyre = await requestToSupplier({
                        textMesssage: 
                        `Заявка №${orderSupId}, цікавить позиція: ${getPositionTyre.full_name} - ${state[0].quantity}/од., ${getPositionTyre.country.country_manufacturer_ua ?? ''} ${getPositionTyre.year.manufacture_year ?? ''} ціна: ${state[0].price_wholesale} грн. Актуально? Є в наявності?`,
                        userReceiver: addSupplier!.address,
                    });
                    if (sendReqSupTyre) {
                        const newDataSupReq = await updateOrderSup(
                            {...orderSupData,
                                status: 'Уточнення',
                            }, 
                            orderSupId!
                        );
                        await updateOrder({status: 'Уточнення'}, orderSupData?.id_order);
                        setOrderSupData(newDataSupReq?.data); 
                        alert(`Заявка №${orderSupId}, уточнення відправлено постачальнику.`);
                        const addCommitReq: any = await addCommentsToOrder({
                            id_user: user._user?.sub.id_user, 
                            comments: `Заявка №${orderSupId}, позиція: ${getPositionTyre.full_name} - ${state[0].quantity}/од., ${getPositionTyre.country.country_manufacturer_ua ?? ''} ${getPositionTyre.year.manufacture_year ?? ''} ціна(зак): ${state[0].price_wholesale} грн. Уточнення відправлено`,
                            id_order: null,
                            id_order_sup: orderSupId,
                        }); 
                        await addCommentsToOrder({
                            id_user: user._user?.sub.id_user, 
                            comments: `Заявка №${orderSupId}, позиція: ${getPositionTyre.full_name} - ${state[0].quantity}/од., ${getPositionTyre.country.country_manufacturer_ua ?? ''} ${getPositionTyre.year.manufacture_year ?? ''}. Уточнення відправлено`,
                            id_order: orderSupData.id_order,
                            id_order_sup: null
                        });
                        if (addCommitReq?.data.status === '200' || '201') {
                            alert('Коментар додано');
                            //showComment(e);
                            setAddNewCommit(addCommitReq.data);
                        } else {
                            alert('Коментар не додано. Помилка')
                        }
                    } else {
                        alert('Помилка! Запит не відправлено.')
                    }
                }
                if (getPositionWheel) {
                    const sendReqSupWheel = await requestToSupplier({
                        textMesssage: 
                        `Заявка №${orderSupId}, цікавить позиція: ${getPositionTyre.full_name} - ${state[0].quantity}/од., ${getPositionTyre.country.country_manufacturer_ua ?? ''} ${getPositionTyre.year.manufacture_year ?? ''} ціна: ${state[0].price_wholesale} грн. Актуально? Є в наявності?`,
                        userReceiver: addSupplier!.address,
                    });
                    if (sendReqSupWheel) {
                        const newDataSupReqW = await updateOrderSup(
                            {...orderSupData,
                                status: 'Уточнення',
                            }, 
                            orderSupId!
                        );
                        await updateOrder({status: 'Уточнення'}, orderSupData?.id_order);
                        setOrderSupData(newDataSupReqW?.data); 
                        alert(`Заявка №${orderSupId}, Уточнення відправлено.`);

                        const addCommitReqW: any = await addCommentsToOrder({
                            id_user: user._user?.sub.id_user,
                            comments: `Заявка №${orderSupId}, позиція: ${getPositionTyre.full_name} - ${state[0].quantity}/од., ціна(зак): ${state[0].price_wholesale} грн. Уточнення відправлено`,
                            id_order: null,
                            id_order_sup: orderSupId,
                        }); 
                        await addCommentsToOrder({
                            id_user: user._user?.sub.id_user,
                            comments: `Заявка №${orderSupId}, позиція: ${getPositionTyre.full_name} - ${state[0].quantity}/од., ціна: ${state[0].price_wholesale} грн. Уточнення відправлено`,
                            id_order: orderSupData.id_order,
                            id_order_sup: null
                            
                        }); 
                        if (addCommitReqW?.data.status === '200' || '201') {
                            alert('Коментар додано');
                            //showComment(e);
                            setAddNewCommit(addCommitReqW.data);
                        } else {
                            alert('Коментар не додано. Помилка')
                        }
                    } else {
                        alert('Помилка! Запит не відправлено.')
                    }
                }
            } else {

            }
        } catch (error) {
            console.log('ERROR_REQ_SUP: ', error)
        }
    };

    const addComment = async(e: any) => {
        try {
            const addCommit: any = await addCommentsToOrder({
                id_user: user._user?.sub.id_user, 
                comments: newComment,
                id_order: null,
                id_order_sup: orderSupId ?? orderSupData.id_order_sup, 
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
        } catch (error) {
            console.log(error)
        }    
    }

    console.log(errors);
    console.log('GOODSID: ', goodsId);
    console.log('ORDER_SUP_ID: ', orderSupId);
    console.log('ORDER_DATA_FOR: ', orderSupData);
    console.log('STATE_SUP: ', state);
    console.log('ORDER_SUP_SUM: ', orderSum);
    console.log('ORDER_SUP_STORAGE: ', orderSupStorage);
    console.log('PURCHASE_SUP: ', purchaseGoods);
    console.log('SUPPLIERS_SUP: ', addSupplier);
    console.log('COMMENTS_ADD_SUP: ', addNewCommit);

    return (
    <div>
        Замовлення Постачальника
    <div className="containerAdmOrderSupForm"
            //onSubmit={e => e.stopPropagation()}
            //onSubmit={e => e.preventDefault()}
            >
        <form 
            onSubmit={handleSubmit(onSubmit)}
        >
            <div className='admFormDataOrderSup'>
                <div>
                    <label htmlFor="date">Дата</label>
                    <input className="admFormOrderData" 
                        type="text"
                        //type="datetime-local"
                        name="order_date" 
                        data-value={orderSupData ? orderSupData?.createdAt : ''}
                        defaultValue={orderSupData ?
                            new Date(orderSupData?.createdAt).toLocaleString() : ''}
                        placeholder="Дата"
                        readOnly={true}
                    />  
                </div>
                <div>
                    <label htmlFor="fname">id </label>
                    <input className="admFormOrderId"
                        type="text"
                        name="firstname"
                        value={orderSupId ?? orderSupData?.id_order ?? ''} 
                        //defaultValue=''
                        placeholder="id замовлення"
                        readOnly={true}
                    />  
                </div>
                <div>
                    <label htmlFor="organization">Організація </label>
                    <select className="admFormOrderOrganiz" 
                        id='organization_order_sup'
                        {...register('organisation',)}
                        name="organisation"
                        defaultValue={orderSupData?.organisation ?? ''}
                        onChange={(e) => setValue('organisation', e.target.value)} 
                        >
                            <option value={"ФОП Шемендюк К.В."}> ФОП Шемендюк К.В.</option>
                            <option value={"ТОВ Скай-Партс"}>ТОВ Скай-Партс</option>
                    </select>  
                </div>
                <div>
                    <label htmlFor="storage">Склад </label>
                    <select className="admFormOrderStorage" 
                        id='storage_order_sup'
                        {...register('storage', {required: 'Це необхідні дані'})}
                        name="storage"
                        defaultValue={orderSupData?.storage}
                        //onChange={(e) => setValue('storage', e.target.value)}
                        >
                            <option value={'Постачальник'}>Постачальник</option>
                            <option value={'Основний Харків'}>Основний Харків</option>
                            <option value={'Основний Харків-1'}>Основний Харків-1</option>
                            <option value={'Віддалений Дніпро-1'}>Віддалений Дніпро-1</option>
                    </select>  
                </div>
                <div>
                    <label htmlFor="orderView">Вид </label>
                    <select className="admFormOrderView" 
                        id='order_view_order_sup'
                        {...register('order_view', {required: 'Це необхідні дані'})}
                        name="order_view"
                        defaultValue={orderSupData?.order_view}
                        //onChange={(e) => setValue('order_view', e.target.value)}
                        >
                            <option value="Сайт">Сайт</option>
                            <option value="Роздріб">Роздріб</option>
                            <option value="Опт">Опт</option>
                            <option value="Інше">Інше</option>
                    </select>  
                </div>
                <div>
                    <label htmlFor="statusOrder">Статус </label>
                    <select className="admFormOrderStatus" 
                        id='status_order_sup'
                        {...register('status', {required: 'Це необхідні дані'})}
                        name="status_order"
                        defaultValue={orderSupData?.status}
                        onChange={(e) => setValue('status', e.target.value)}
                        >
                            <option value="Новий">Новий</option>
                            <option value="Уточнення">Уточнення</option>
                            <option value="Підтвердження">Підтвердження</option>
                            <option value="На Відгрузку">На Відгрузку</option>
                            <option value="Відвантажено">Відвантажено</option>
                            <option value="Завершено">Завершено</option>
                            <option value="Відміна">Відміна</option>
                            <option value="Повернення">Повернення</option> 
                            <option value="На Складі">На Складі</option>    
                    </select>    
                </div>
                <div>
                    <div className='admFormOrderSupCustm'>
                        <label htmlFor="lname">Постачальник </label>
                        <input  className="admFormOrderName"
                            type="text"
                            {...register("id_supplier", {required: 'Це необхідні дані'})}
                            name="supplier" 
                            maxLength={45}
                            placeholder="Ім'я або назва.."
                            value={addSupplier?.name ?? orderSupData?.supplier?.name ?? ''}
                            readOnly={true}
                            //onChange={() => setAddSupplier(addSupplier)}
                        />
                        <div 
                            //onClick={e => e.stopPropagation()}
                            onClick={(e)=>e.preventDefault()}
                        >
                            <button onClick={openSupplierForm} 
                                className='admFormSearchSupplier'>
                                <i className="fas fa-search"></i>    
                            </button> 
                        </div>
                        <div 
                            //onClick={e => e.stopPropagation()}
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
                    <label htmlFor="fname"> Контракт </label>
                    <select className="admFormOrderContract" 
                        {...register('id_contract', {required: 'Це необхідні дані'})}
                        name="id_contract"
                        defaultValue={addSupplier?.contract[0]?.id_contract}
                        >
                       {addSupplier ? addSupplier?.contract?.map(
                        (entity:{name: string; id_contract:number; balance: number;}, index:number)=> (  
                            <option key={'contract' + index} 
                            value={entity.id_contract}
                            >
                                {entity.name} контр{entity.id_contract} баланс {entity.balance} 
                            </option>
                            )) :
                                <option data-value={orderSupData?.id_contract}>
                                    {orderSupData?.id_contract}
                                </option>
                        } 
                    </select>
                </div>

                <div>
                    <label htmlFor="pereviznik">Перевізник </label>
                    <select className="admFormOrderSupDelivery" 
                        id='pereviznik_order_sup'
                        {...register('delivery', {required: 'Це необхідні дані'})}
                        name="delivery"
                        defaultValue={orderSupData?.delivery ?? ''}
                        >
                            <option value="Самовивіз">Самовивіз</option>
                            <option value="Своя Доставка">Своя Доставка</option>
                            <option value="Нова Пошта">Нова Пошта</option>
                            <option value="Укр Пошта">Укр Пошта</option>
                            <option value="Делівері">Делівері</option>  
                    </select>    
                </div>
                <div>
                    <label htmlFor="order_ttn">ТТН </label>
                    <input className="admFormOrderTtn"
                        type="text"  
                        maxLength={45}
                        placeholder="ТТН замовлення.."
                        {...register('delivery_ttn')}
                        name="delivery_ttn"
                        defaultValue={orderSupData?.delivery_ttn ?? ''}
                    />  
                </div>
                <div>
                    <label htmlFor="status">Статус дост </label>
                    <select className="admFormOrderStatusDel" 
                        id='status_delivery_order_sup'
                        {...register('status_delivery', {required: 'Це необхідні дані'})}
                        name="status_delivery"
                        defaultValue={orderSupData?.status_delivery}
                        onChange={(e) => setValue('status_delivery', e.target.value)}
                        >
                            <option value="Новий">Новий</option>
                            <option value="Очікує ТТН">Очікує ТТН</option>
                            <option value="Доставляеться">Доставляеться</option>
                            <option value="Відміна">Відміна</option>
                    </select>    
                </div>
                <div 
                    onClick={(e)=>e.preventDefault()}
                >
                    <button onClick={addGoodsForm} className='admFormOrderBtnAdd'>Додати товар</button>  
                </div>
                <div>
                    <label htmlFor="pay_view">Вид оплати </label>
                    <select className="admFormOrderViewPay" 
                        id='pay_view_order_sup'
                        {...register('pay_view', {required: 'Це необхідні дані'})}
                        name="pay_view"
                        defaultValue={orderSupData?.pay_view}
                        onChange={(e) => setValue('pay_view', e.target.value)}
                        >
                            <option value="Новий">Новий</option>
                            <option value="Готівка">Готівка</option>
                            <option value="Безготівковий розрахунок">Безготівковий розрахунок</option>
                            <option value="Карта/Терминал (LiqPay)">Карта/Терминал (LiqPay)</option>
                            <option value="Зворотній платіж (Післяплата)">Зворотній платіж (Післяплата)</option>
                            <option value="Відміна">Відміна</option>
                            <option value="Повернення">Повернення</option>
                    </select>    
                </div>
                <div>
                <label htmlFor="status_pay">Статус оплати </label>
                    <select className="admFormOrderStatusPay" 
                        id='status_pay_order_sup'
                        {...register('status_pay', {required: 'Це необхідні дані'})}
                        name="status_pay"
                        defaultValue={orderSupData?.status_pay}
                        onChange={(e) => setValue('status_pay', e.target.value)}
                    >
                        <option value="Новий">Новий</option>
                        <option value="Очікує Оплату">Очікує Оплату</option>
                        <option value="Оплачено">Оплачено</option>
                        <option value="Відміна">Відміна</option>
                        <option value="Повернення">Повернення</option>
                        <option value="Наложка Отримана">Наложка Отримана</option>
                    </select>    
                </div>  
                <div 
                    onClick={(e)=>e.preventDefault()}
                    //onClick={e => e.stopPropagation()}
                >
                    <button onClick={sendRequestToSupplier}
                        disabled={addSupplier?.address && orderSupId ? false : true}
                        className={addSupplier?.address && orderSupId ? 
                            'admFormOrderSupSendReqActive' : 
                            'admFormOrderSupSendReq'}
                    >
                       <i className="fas fa-paper-plane"></i>
                    </button> 
                </div> 
            </div>
            <div className='admFormOrderSupTableBox'
                //onInput={(e) => e.stopPropagation()}
                onClick={(e)=>e.preventDefault()}
                >   
            <table className='admFormOrderSupTable'>
                <thead className='admFormOrderSupTableTh'>
                    <tr>
                        <th>id</th>
                        <th>Товар</th>
                        <th>Категорія</th>
                        <th>Кількість</th>
                        <th>Резерв</th>
                        <th>Ціна Закуп</th>
                        <th>Ціна</th>
                        <th>Сума Закуп</th>
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
                            id_supplier: number, 
                            price: number,
                            price_wholesale: number,
                            id_storage: number,
                            },
                            index:number
                        ) =>(
                    <tr key={item.id + index} 
                        onInput={(e) => e.stopPropagation()}
                        //onClick={(e)=>e.preventDefault()}
                        >
                        <td >{item.id}</td>
                        <td >{item.full_name}</td>
                        <td >{item?.category}</td>
                        <td 
                            onInput={(e) => e.stopPropagation()}
                        >
                            <input 
                            className='admFormOrderSupTableTdQ'
                            id={'quantity'+ item.id}
                            type="text"
                            name="quantity"
                            value={item?.quantity}
                            onInput={(e) => onChangeInput(e, item.id, index)}
                            placeholder="Введіть цифри"
                            />
                        </td>
                        <td >{item?.reserve ?? 0}</td>
                        <td  
                            onInput={(e) => e.stopPropagation()}
                        >
                            <input 
                            className='admFormOrderSupTableTdPw'
                            id={'price_wholesale' + item.id}
                            type="text"
                            name="price_wholesale"
                            value={item?.price_wholesale}
                            onInput={(e) => onChangeInput(e, item.id, index)}
                            placeholder="Введіть цифри" 
                            />
                       
                        </td>
                        <td  
                            onInput={(e) => e.stopPropagation()}
                        >
                            <input 
                            className='admFormOrderSupTableTdP'
                            id={'price' + item.id}
                            type="text"
                            name="price"
                            value={item?.price}
                            onInput={(e) => onChangeInput(e, item.id, index)}
                            placeholder="Введіть цифри" 
                            />
                       
                        </td>
                        <td >{item.price_wholesale * item.quantity}</td>
                        <td >{item.price * item.quantity}</td>
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
                                //{...register('storage_index', {required: 'Це необхідні дані'})}
                                >
                                <option value={'Постачальник'}>Постачальник</option>
                                <option value={'Основний Харків'}>Основний Харків</option>
                                <option value={'Основний Харків-1'}>Основний Харків-1</option>
                                <option value={'Віддалений Дніпро-1'}>Віддалений Дніпро-1</option>
                            </select>  
                        </td> 
                        <td 
                            //onClick={e =>e.stopPropagation()}
                            //onClick={(e)=>e.preventDefault()}
                            //onClickCapture={e => e.preventDefault()}
                        >
                            <div 
                                //onClick={(e) => e.target.addEventListener("click", deleteItem, false)}
                                //onClickCapture={e=>e.stopPropagation()}
                                onClick={e=>e.stopPropagation()}
                                //onClick={(e)=>e.preventDefault()}
                            >
                            <button className='closeAdmGoods' 
                                key={'deleteBtn' + item.id}
                                value={index}
                                disabled={disableBtn}
                                onClick={e => deleteItem(+e.currentTarget.value)}
                                //onClickCapture={e=>e.stopPropagation()}
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
                <label htmlFor="notes">Нотатки</label>
                <textarea className="admFormOrderNotesText"  
                    {...register('notes')}
                    name="notes"
                    value={orderSupData?.notes ?? ''}
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
                    defaultValue={orderSupData?.delivery_cost ?? 0}
                        //onChange={setDeliveryCostOrder}
                />
            </div>
            <div className='admFormOrderCommit'
                onClick={(e)=>e.preventDefault()}
                //onClick={(e) => e.stopPropagation()}
                >
                <div className='admFormOrderAddCommit'>
                <button className='admFormOrderBtnAdd'
                    value={orderSupId ?? orderSupData?.id_order}
                    onClick={(e) => addComment(e)}
                    //onInput={(e) => showComment(e)}
                    //data-order={orderSupData?.id_order}
                    >Додати коментар
                </button>
                    <textarea 
                    className='admOrderCommitText'
                    value={newComment}
                    //data-order={orderSupData?.id_order}
                    onChange={e => setNewComment(e.target.value)}
                    
                    //placeholder="Введіть коментар.."    
                    //name="subject" 
                    placeholder="Пишить коментар.."
                    >        
                    </textarea>
                </div>
                <div className='admFormOrderCommitChat'>
                    {/* {comments?.length !== 0 ? */}
                      <AdminComment 
                        newCommit={addNewCommit}
                        comments={comments}/>
                    {/* //   : <span>... очікуємо коментарі ...</span>  
                    // } */}
                </div>  
            </div>
            <div className='admOrderFormGrp'
                    //onClick={(e) => e.stopPropagation()}
                    //onClickCapture={e=>e.stopPropagation()}
                 >
                <div onClick={(e) => e.stopPropagation()}>
                    <button className={!disableBtnOk ? 'admFormOrderBtnOk' : 'admFormOrderBtnOkDsb'}
                        disabled={disableBtnOk}
                        onClick={onSubmitOrderSup}>
                        Ok
                    </button>
                </div>
                <div 
                    onClick={(e) => e.stopPropagation()}
                    //onClick={(e)=>e.preventDefault()}
                    >
                    <button className={!disableBtn ? 'admFormOrderBtnSave' : 'admFormOrderBtnSaveDsb'}
                        disabled={disableBtn} 
                        //type="button"
                        //type="submit"
                        onClick={handleSubmit(onSubmit)}
                        //onClickCapture={e=>e.stopPropagation()}
                        >
                        {updateBtn ?? 'Зберегти'}
                    </button>
                </div>
                <div onClick={(e) => e.stopPropagation()}>
                    <button className='admFormOrderBtn' onClick={setActive}>Відмінити</button>
                </div>
                <span>id: {orderSupData?.user?.id_user ?? user._user?.sub.id_user ?? ''}</span>
                <span>користувач: {orderSupData?.user?.name ?? user._user?.sub.name ?? ''}</span>
                <span>посада: {orderSupData?.user?.role ?? user._user?.sub?.role ?? ''}</span>
                    <span className='admFormOrderSupEstimate'>
                        доставка (загалом): {orderSupData?.delivery_cost ?? getValues('delivery_cost') ?? 0}
                    </span>
                    <span className='admFormOrderSupEstimate'>
                        комісія банку: {orderSupData?.commission_cost ?? getValues('commission_cost') ?? 0}</span>
                    <span className='admFormOrderSupEstimate'>
                        Сума товарів: {orderSum}
                    </span>
                    <span className='admFormOrderSupEstimateOverall'>
                        Сума замовлення: {getValues('total_cost') ?? orderSupData?.total_cost ?? 0}
                    </span>
                {purchaseGoods.length !== 0 && user._user?.sub?.role === 'admin' ?
                    <>
                        <span className='admFormOrderSupProfit'>
                            сума закупівлі: {purchaseGoods?.reduce((sum:any, current:any) => sum + current)}
                        </span>
                        <span className='admFormOrderSupProfit'>
                            заробіток загалом: {orderSum - purchaseGoods?.reduce((sum:any, current:any) => sum + current)}
                        </span>
                        <span className='admFormOrderSupProfit'>
                            націнка загалом: {((orderSum / purchaseGoods?.reduce(
                            (sum:any, current:any) => sum + current) - 1) * 100).toFixed(1) ?? '0'}%
                        </span>

                    </>
                        : null
                    }
            </div>
        </form>
        </div>
        {/* <div className='admFormOrderSupModalBox'> */}
        {openSupplier ? 
            <ModalAdmin active={openSupplier} setActive={setOpenSupplier}>
                <AdminModalSupplier 
                    allsupplier={supplier}
                    addSupplier={addSupplierToOrderSup}/>
            </ModalAdmin> 
            : null  
        }
        {createSupplier ?
            <ModalAdmin active={createSupplier} setActive={setCreateSupplier}>
                {/* <AdminModalCustmCreate />    */}
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
        {requestSupplier ? 
            <ModalAdmin active={requestSupplier} setActive={setRequestSupplier}>
               <span>Запит постачальнику відправлено</span>
            </ModalAdmin> : null
        }
        {errors.id_contract || errors.id_supplier ?
            <span style={{'color': 'red'}}>Помилка! Не заповнені корректно всі дані.</span> 
            : null
        }
        {/* </div> */}
    </div>
    );
});

export default AdminModalOrderSup;