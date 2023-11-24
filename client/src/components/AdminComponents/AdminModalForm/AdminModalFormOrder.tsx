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
    updateOrderStorage} from '../../../restAPI/restAdminAPI';
import AdminComment from '../adminContent/AdminComment';
import AdminModalCustmCreate from '../adminModalForm/AdminModalCustmCreate';
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

const AdminFormOrder = observer((
    { props, 
        goodsId, 
        comments, 
        setActive, 
        customer, 
        storages, 
        ordersData,
        showComment,
    }:IFormOrder
    ) => {
    const {user} = useContext<any | null>(Context);
    const [tyreDatas, wheelDatas] = props;
    const [orderId, setOrderId] = useState<number | null>(null);
    const [addGoods, setAddGoods] = useState<boolean>(false);
    const [createCustomer, setCreateCustomer] = useState<boolean>(false);
    const [openCustomers, setOpenCustomers] = useState<boolean>(false);
    const [addCustomer, setAddCustomer] = useState<IModalFormOrder | undefined>(undefined);
    const [disableBtn, setDisableBtn] = useState<boolean>(false);
    const [disableBtnOk, setDisableBtnOk] = useState<boolean>(false);
    const [orderStorage, setOrderStorage] = useState<any[]>([]);
    const {register, handleSubmit, setValue, formState: {errors}} = useForm();    
    const [state, dispatch] = useReducer<Reducer<StateReducer, ActionReducer>>(
        reducer, createInitialState(goodsId, ordersData)
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
        delivery_dep: string, 
        delivery_dep_ref: string,
    }>();

    useEffect(() => {
        register("id_customer", {required: 'Це необхідні дані'});
        register("id_user", {required: 'Це необхідні дані'});
        setValue("id_user", user._user?.sub.id_user);
        setValue("id_customer", addCustomer?.id_customer,
        { shouldValidate: true })
    }, [register, setValue, addCustomer?.id_customer, user]);
    
    useEffect(() => {
        register('id_contract', {required: 'Це необхідні дані'})
        setValue("id_contract", addCustomer?.contract[0]?.id_contract,
        { shouldValidate: true })
    }, [register, setValue, addCustomer?.contract]);

    useEffect(() => {
        if (delivery === "Нова Пошта") {
            register("delivery_city", {required: 'Це необхідні дані'})
            register("delivery_city_ref")
            setValue("delivery_city", dataDepartmentNP?.MainDescription,
            { shouldValidate: true })
            setValue("delivery_city_ref", dataDepartmentNP?.DeliveryCity)
        }
        if (delivery === "Делівері") {
            register("delivery_city", {required: 'Це необхідні дані'})
            register("delivery_city_ref")
            setValue("delivery_city", dataDepartmentDelivery?.name,
            { shouldValidate: true })
            setValue("delivery_city_ref", dataDepartmentDelivery?.id)
        }
    }, [
        register, 
        setValue,
        dataDepartmentDelivery?.id, 
        dataDepartmentDelivery?.name, 
        dataDepartmentNP?.DeliveryCity, 
        dataDepartmentNP?.MainDescription, 
        delivery,
    ]);

    useEffect(() => {
        register("delivery_city_depart")
        register("delivery_city_depart_ref")
        setValue("delivery_city_depart", dataDepartment?.delivery_dep,
        { shouldValidate: true })
        setValue("delivery_city_depart_ref", dataDepartment?.delivery_dep_ref,
        { shouldValidate: true })
    }, [
        dataDepartment?.delivery_dep, 
        dataDepartment?.delivery_dep_ref, 
        register, 
        setValue
    ]);

    useEffect(() => {
        if (ordersData) {
            setDisableBtn(true);
            setDisableBtnOk(true);
        }
    },[ordersData]);

    useEffect(() => {
        let isMounted = false;
        const calcPurchase = async () => {
            if (!isMounted && ordersData?.order_storage) {
            ordersData?.order_storage?.forEach(async (orderData: any) => {
                let priceByIdTyre = await getAdminPriceTyresById(orderData.id ?? 0);
                let priceByIdTWheel = await getAdminPriceWheelsById(orderData.id ?? 0);
                let priceTyreOnSup = priceByIdTyre?.find((tyre: any) => tyre.id_supplier === orderData.id_supplier);
                let priceWheelOnSup = priceByIdTWheel?.find((tyre: any) => tyre.id_supplier === orderData.id_supplier);
                if (priceTyreOnSup) {
                    setPurchaseGoods(oldPurchase => 
                        [...oldPurchase!, priceTyreOnSup.price_wholesale * orderData.quantity]
                    );
                }
                if (priceWheelOnSup) {
                    setPurchaseGoods(oldPurchase => 
                        [...oldPurchase!, priceTyreOnSup.price_wholesale * orderData.quantity]
                    );
                }
            });
            }
        };
        calcPurchase();
        return () => {
            isMounted = true;
        };
    },[ordersData?.order_storage]);

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
        console.log('chooseDelivery', e.currentTarget.value);
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
                (item: {id: number; price:{price: number}}, index: number) => {
                    return (
                        item.id === id && index === indexItem ?
                        {...item, price: {...item.price, [name]: value ?? '0'}}
                        : item
                        )}
            )
        });
    },[state])
    
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
        if (findCustomer) {
            setAddCustomer(findCustomer);  
            setOpenCustomers(!openCustomers);
        }
    }

    const addGoodsToList = async (value:string) => {
        const newArr = value.split(',');
        let [idValue, indexValue] = newArr;

        dispatch({type: ActionType.ADDTYRE, 
            addTyre: tyreDatas?.find((item:{id:string}) => item?.id === idValue),
            indexPrice: indexValue,
        });

        dispatch({type: ActionType.ADDWHEEL, 
            addWheel: wheelDatas?.find((item:{id:string}) => item?.id === idValue),
            indexPrice: indexValue,
        });            
    }
    //}),[tyreDatas, wheelDatas, customer])

    const deleteItem = async (itemIndex: number) => {
            //e.preventDefault();
            //e.stopPropagation();
        dispatch({type: ActionType.DELETEITEM, 
            deleteItem: itemIndex,
        });
    } 
    //GOOD PERFORM
    const onSubmit = async (data:{}, e: any) => {
        e.preventDefault();
        console.log('CREATE ORDER: ', data)
        try {
            if (!orderId && state.length === 0) {
               let resultForm: any = await responseForm(data);
                setOrderId(+resultForm.data.id_order);
                alert(`Замовлення створено, id ${resultForm.data.id_order},
                    але товари не додані.
                `); 
            }
            if(!orderId && state.length > 0) {
                let resultForm: any = await responseForm(data);
                setOrderId(+resultForm.data.id_order);
                state.forEach(async (itemGoods: CreateGoods): Promise<any> => {
                    let resultOrder: any = await createGoodsToOrder(itemGoods, resultForm.data.id_order!);
                    setOrderStorage(oldOrdStor => [...oldOrdStor, resultOrder.data]);
                })
                setUpdateBtn('Оновити');
                alert(`Замовлення створено, id ${resultForm.data.id_order}. 
                    Для підкріплення товарів до замовлення треба натиснути ОК.`);
            }
            if(orderId && state.length > 0 && disableBtnOk === false) {
                orderStorage?.forEach(async(itemsOrd): Promise<any> => {
                    await updateOrderStorage(itemsOrd);
                });
                orderStorage.splice(0, orderStorage.length);
                state.forEach(async (itemGoods: CreateGoods): Promise<any> => {
                    let resultOrder: any = await createGoodsToOrder(itemGoods, orderId);
                    setOrderStorage(oldOrdStor => [...oldOrdStor, resultOrder?.data]);  
                });  
                await updateOrder(data, orderId);    
                alert(`Замовлення збереженно, id ${orderId} товари оновлені.`);
            
            } 
            if(orderId && state.length === 0){
                alert("Товари не додані");
            }
            if (orderId && state.length !== 0 && disableBtnOk === true){
                const newStorage = () => {
                orderStorage.forEach(async(itemsOrd): Promise<any> => {
                    await updateOrderStorage(itemsOrd);
                });
                orderStorage.splice(0, orderStorage.length);
                state.forEach(async (itemGoods: CreateGoods): Promise<any> => {
                    let resultOrder: any = await createGoodsToOrder(itemGoods, orderId);
                    setOrderStorage(oldOrdStor => [...oldOrdStor, resultOrder?.data]);
                });
                }
                newStorage();
                setDisableBtnOk(!disableBtnOk);
                await updateOrder(data, orderId);
                alert(`Товари до замовлення id ${orderId}, оновлено.`);
            }
            e.stopPropagation();
        } catch {
            console.log('ERROR_ORDER: ', e);
        }    
    }    
    //GOOD PERFORM
    const onSubmitOrder = async () => {
        try {
            if(orderId && orderStorage.length !== 0) {
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

    const orderSum = state?.reduce((sum:any, current:any) => 
        sum + (current.price.price * current.price.quantity), 0
    );
    const orderDataSum = ordersData?.order_storage?.reduce(
        (sum:any, current:any) => 
        sum + current.total, 0
    );

    const addComment = async(e: any) => {
        try {
            const addCommit: any = await addCommentsToOrder(
                user._user?.sub.id_user, 
                orderId ?? ordersData?.id_order, 
                newComment
            ); 
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
    console.log('GOODS_ID: ', goodsId);
    //console.log(errors);
    console.log('ORDER_DATA: ', ordersData)
    console.log('PURCHASE_PRICE: ', purchaseGoods);
    return (
        <div >
            Замовлення Покупця
            <div className="containerAdmOrderForm"
                //onSubmit={e => e.stopPropagation()}
                //onSubmit={e => e.preventDefault()}
                onClick={cancelCityList}
            >
            <form 
                onSubmit={handleSubmit(onSubmit)}
            >
                <div className='admFormDataOrder'>
                    <div>
                        <label htmlFor="date">Дата</label>
                        <input className="admFormOrderData" 
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
                        <label htmlFor="fname">id </label>
                        <input className="admFormOrderId"
                            type="text"
                            name="firstname"
                            value={orderId ?? ordersData?.id_order ?? ''} 
                            //defaultValue=''
                            placeholder="id замовлення"
                            readOnly={true}
                        />  
                    </div>
                    <div>
                        <label htmlFor="organization">Організація </label>
                        <select className="admFormOrderOrganiz" 
                            {...register('organisation',)}
                            name="organisation"
                            >
                            {ordersData ?
                                <option data-value={ordersData.organisation}>
                                    {ordersData?.organisation}
                                </option>
                                :
                                <>
                                <option value={"ФОП Шемендюк К.В."}>ФОП Шемендюк К.В.</option>
                                <option value={"фл Гайворонський Н. М"}>фл Гайворонський Н. М</option>
                                <option value={"ТОВ Скай-Партс"}>ТОВ Скай-Партс</option>
                                </>
                            }
                        </select>  
                    </div>
                    <div>
                        <label htmlFor="storage">Склад </label>
                        <select className="admFormOrderStorage" 
                            {...register('storage', {required: 'Це необхідні дані'})}
                            name="storage"
                            >
                            {ordersData ?
                                <option data-value={ordersData?.storage}>
                                    {ordersData?.storage}
                                </option>
                                :
                                <>
                                <option value={'Склад Поставщик'}>Склад Поставщик</option>
                                <option value={'Склад Основний'}>Склад Основний</option>
                                <option value={'Склад Монтаж'}>Склад Монтаж</option>
                                </>
                            }
                        </select>  
                    </div>
                    <div>
                        <label htmlFor="orderView">Вид </label>
                        <select className="admFormOrderView" 
                            {...register('order_view', {required: 'Це необхідні дані'})}
                            name="order_view"
                            >
                            {ordersData ?
                                <option data-value={ordersData?.order_view}>
                                    {ordersData?.order_view}
                                </option>
                                :
                                <>
                                <option value="Сайт">Сайт</option>
                                <option value="Роздріб">Роздріб</option>
                                <option value="Опт">Опт</option>
                                <option value="Інше">Інше</option>
                                </>
                            }
                        </select>  
                    </div>
                    <div>
                        <label htmlFor="statusOrder">Статус </label>
                        <select className="admFormOrderStatus" 
                            {...register('status', {required: 'Це необхідні дані'})}
                            name="status_order"
                            >
                            {ordersData ?
                                <option data-value={ordersData?.status}>
                                    {ordersData?.status}
                                </option>
                                :
                                <>
                                <option value="Новий">Новий</option>
                                <option value="Продаж">Продаж</option>
                                <option value="Обробка">Обробка</option>
                                <option value="Виконання">Виконання</option>
                                <option value="Відміна">Відміна</option>
                                <option value="Повернення">Повернення</option>
                                </>
                            }    
                        </select>    
                    </div>
                    <div>
                        <div className='admFormOrderCustm'>
                            <label htmlFor="lname">Покупець </label>
                            <input  className="admFormOrderName"
                                type="text"
                                name="customer" 
                                maxLength={45}
                                placeholder="Ім'я або назва.."
                                value={addCustomer?.name ?? ordersData?.customer?.name ?? ''}
                                readOnly={true}
                                //onChange={() => setAddCustomer(addCustomer)}
                            />
                            <div 
                            //onClick={(e)=>e.preventDefault()}
                            >
                                <button onClick={openCustomerForm} className='admFormSearchCustm'>
                                    <i className="fas fa-search"></i>    
                                </button> 
                            </div>
                            <div 
                            //onClick={(e)=>e.preventDefault()}
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
                        <select className="admFormOrderContract" name="id_contract"
                            //autoFocus={true}
                            defaultValue={addCustomer?.contract[0]?.id_contract}
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
                        <label htmlFor="pereviznik">Перевізник </label>
                        <select className="admFormOrderDelivery" 
                            {...register('delivery', {required: 'Це необхідні дані'})}
                            name="delivery"
                            onChange={chooseDelivery}
                            >
                            {ordersData ?
                                <option data-value={ordersData.delivery}>
                                    {ordersData?.delivery}
                                </option>
                                :
                                <>
                                    <option value="Самовивіз">Самовивіз</option>
                                    <option value="Своя Доставка">Своя Доставка</option>
                                    <option value="Нова Пошта">Нова Пошта</option>
                                    <option value="Делівері">Делівері</option>
                                </>
                            }    
                        </select>    
                    </div>
                    <div>
                    <label htmlFor="delivery_city">Місто </label>
                        <input className="admFormOrderDeliveryCity"
                            type="search"  
                            maxLength={45}
                            placeholder="Місто.."
                            {...register('delivery_city')}
                            name="delivery_city"
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
                        <div className='orderCityListItem'
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
                    <div>
                    <label htmlFor="delivery_city_depart">віддл </label>
                        <input className="admFormOrderDeliveryCityDep"
                            type="search"  
                            maxLength={45}
                            placeholder="Відділення.."
                            {...register('delivery_city_depart')}
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
                            {ordersData ?   
                                <option data-value={ordersData?.delivery_city}>
                                    {ordersData?.delivery_city}
                                </option> 
                                :
                            <>
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
                            </>
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
                            {ordersData ?   
                                <option data-value={ordersData?.delivery_city_depart}>
                                    {ordersData?.delivery_city_depart}
                                </option> 
                                :
                            <>
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
                            </>
                            }
                            </select>    
                        </div>
                    : null}       
                    <div>
                        <label htmlFor="status">Статус дост </label>
                        <select className="admFormOrderStatusDel" 
                            {...register('status_delivery', {required: 'Це необхідні дані'})}
                            name="status_delivery"
                        >
                            {ordersData ?
                                <option data-value={ordersData.status_delivery}>
                                    {ordersData?.status_delivery}
                                </option>
                                :
                                <>
                                <option value="Новий">Новий</option>
                                <option value="Самовивіз">Самовивіз</option>
                                <option value="Обробляеться">Обробляеться</option>
                                <option value="Очікує ТТН">Очікує ТТН</option>
                                <option value="Доставляеться">Доставляеться</option>
                                <option value="Отримано ТТН">Отримано ТТН</option>
                                <option value="Повернення ТТН">Повернення ТТН</option>
                                <option value="Відміна">Відміна</option>
                                </>
                            }    
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
                            {...register('pay_view', {required: 'Це необхідні дані'})}
                            name="pay_view"
                            >
                            {ordersData ?
                                <option data-value={ordersData.pay_view}>
                                    {ordersData?.pay_view}
                                </option>
                                :
                                <>
                                <option value="Новий">Новий</option>
                                <option value="Готівка">Готівка</option>
                                <option value="Б/г рахунок">Б/г рахунок</option>
                                <option value="Б/г карта">Б/г карта</option>
                                <option value="Наложка">Наложка</option>
                                <option value="Відміна">Відміна</option>
                                <option value="Повернення">Повернення</option>
                                </>
                            }
                        </select>    
                    </div>
                    <div>
                    <label htmlFor="status_pay">Статус оплати </label>
                        <select className="admFormOrderStatusPay" 
                            {...register('status_pay', {required: 'Це необхідні дані'})}
                            name="status_pay"
                        >
                        {ordersData ?
                            <option data-value={ordersData.status_pay}>
                                {ordersData?.status_pay}
                            </option>
                            :
                            <>
                            <option value="Новий">Новий</option>
                            <option value="Очікує Оплату">Очікує Оплату</option>
                            <option value="Оплачено">Оплачено</option>
                            <option value="Виконання">Виконання</option>
                            <option value="Відміна">Відміна</option>
                            <option value="Повернення">Повернення</option>
                            <option value="Наложка Отримана">Наложка Отримана</option>
                            </>
                        }
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
                            defaultValue={ordersData?.delivery_ttn ?? ''}
                        />  
                    </div>
                </div>
                <div className='admFormOrderTableBox'
                    //onInput={(e) => e.stopPropagation()}
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
                                category:{category:string}, 
                                price:{price:number; quantity: number}}, 
                                index:number
                            ) =>(
                        <tr key={item.id + index} 
                            onInput={(e) => e.stopPropagation()}
                            //onClick={(e)=>e.preventDefault()}
                        >
                            <td >{item.id}</td>
                            <td >{item.full_name}</td>
                            <td >{item.category?.category ?? item?.category}</td>
                            <td 
                                onInput={(e) => e.stopPropagation()}
                            >
                                <input 
                                    id={'quantity'+ item.id}
                                    type="text"
                                    name="quantity"
                                    value={item.price?.quantity ?? item?.quantity}
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
                                    value={item.price?.price ?? item?.price}
                                    onInput={(e) => onChangeInput(e, item.id, index)}
                                    placeholder="Введіть цифри" 
                                />
                            </td>
                            <td >{item?.total ?? item?.price?.price * item?.price?.quantity}</td>
                            <td >
                                <select className="admFormOrderStorage" name="storage_index"
                                    //{...register('storage_index', {required: 'Це необхідні дані'})}
                                    >
                                    <option value={1}>Склад Поставщик</option>
                                    <option value={2}>Склад Основний</option>
                                    <option value={3}>Склад Монтаж</option>
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
                        value={ordersData?.notes}
                        placeholder="Пишить нотатку..">
                    </textarea> 
                    <label htmlFor="deliveryOrder">Доставка </label>
                    <input  className="admFormOrderDeliveryCost"
                        type="text"
                        {...register('delivery_cost')}
                        name="deliveryOrder" 
                        maxLength={45}
                        placeholder="Сума доставки.."
                        defaultValue={addCustomer?.name ?? ordersData?.customer?.name ?? ''}
                        //readOnly={true}
                        //onChange={() => setAddCustomer(addCustomer)}
                    />
                    <label htmlFor="dopGaranty">Доп. гар </label>
                    <input  className="admFormOrderDopGarCost"
                        type="text"
                        {...register('dop_garanty')}
                        name="dopGaranty" 
                        maxLength={45}
                        placeholder="Доп гар.."
                        defaultValue={addCustomer?.name ?? ordersData?.customer?.name ?? ''}
                        //readOnly={true}
                        //onChange={() => setAddCustomer(addCustomer)}
                    />
                    <label htmlFor="dopGaranty">Бонуси(-) </label>
                    <input  className="admFormOrderBonus"
                        type="text"
                        {...register('bonus_decrease')}
                        name="dopGaranty" 
                        maxLength={45}
                        placeholder="Бонуси.."
                        defaultValue={addCustomer?.name ?? ordersData?.customer?.name ?? ''}
                        //readOnly={true}
                        //onChange={() => setAddCustomer(addCustomer)}
                    />
                </div>
                <div className='admFormOrderCommit'
                    onClick={(e)=>e.preventDefault()}
                    //onClick={(e) => e.stopPropagation()}
                    >
                    <div className='admFormOrderAddCommit'>
                    <button className='admFormOrderBtnAdd'
                        value={orderId ?? ordersData?.id_order}
                        onClick={(e) => addComment(e)}
                        //onInput={(e) => showComment(e)}
                        //data-order={ordersData?.id_order}
                        >Додати коментар
                    </button>
                        <textarea 
                        className='admOrderCommitText'
                        value={newComment}
                        //data-order={ordersData?.id_order}
                        onChange={e =>setNewComment(e.target.value)}
                        //placeholder="Введіть коментар.."    
                        //name="subject" 
                        placeholder="Напишіть коментар.."
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
                <div className='admOrderFormGrp'>
                    <div onClick={(e) => e.stopPropagation()}>
                        <button className={!disableBtnOk ? 'admFormOrderBtnOk' : 'admFormOrderBtnOkDsb'}
                            disabled={disableBtnOk}
                            onClick={onSubmitOrder}>
                            Ok
                        </button>
                    </div>
                    <div 
                        onClick={(e)=>e.preventDefault()}
                        >
                        <button className={!disableBtn ? 'admFormOrderBtnSave' : 'admFormOrderBtnSaveDsb'}
                            disabled={disableBtn} 
                            onClick={handleSubmit(onSubmit)}
                            >
                            {updateBtn ?? 'Зберегти'}
                        </button>
                    </div>
                    <div onClick={(e) => e.stopPropagation()}>
                        <button className='admFormOrderBtn' onClick={setActive}>Відмінити</button>
                    </div>
                    <span>id: {ordersData?.user?.id_user ?? user._user?.sub?.id_user ?? ''}</span>
                    <span>користувач: {ordersData?.user?.name ?? user?._user?.sub?.name ?? ''}</span>
                    <span>посада: {ordersData?.user?.role ?? user._user?.sub?.role ?? ''}</span>
                    <span>комісія платіж сістеми: {ordersData?.commission_cost ?? orderSum * 0.015 ?? orderDataSum * 0.015 ?? 0}</span>
                    <span>
                        Сума товарів: {orderSum ? orderSum : orderDataSum}
                    </span>
                    <span>
                        Сума замовлення: {ordersData?.total_cost ?? orderSum + (orderSum * 0.015)}
                    </span>
                    {purchaseGoods.length !== 0 && user._user?.sub?.role === 'admin' ?
                    <>
                        <span className='admFormOrderProfit'>
                            сума закупівлі: {purchaseGoods?.reduce((sum:any, current:any) => sum + current)}
                        </span>
                        <span className='admFormOrderProfit'>
                            заробіток: {orderSum ? orderSum : orderDataSum - purchaseGoods?.reduce((sum:any, current:any) => sum + current)}
                        </span>
                        <span className='admFormOrderProfit'>націнка {((orderSum ? orderSum : orderDataSum / purchaseGoods?.reduce(
                            (sum:any, current:any) => sum + current) - 1) * 100).toFixed(1)}%
                        </span>
                        <span className='admFormOrderProfit'>
                            доставка: {ordersData?.delivery_cost}
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
                    <AdminModalCustmCreate />   
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
        </div>
    );
});

export default AdminFormOrder;