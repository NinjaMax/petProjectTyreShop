import React, {useEffect, useState} from 'react';
import '../../../css/AdminComponentCss/AdminContentCss/AdminCustomersContent.css';
import ButtonSearch from '../../buttons/ButtonSearch';
import ModalAdmin from '../../modal/ModalAdmin';
import { ICustomerItem } from './types/CustomerItem.type';
import { FixedSizeList  as List } from 'react-window';
import SpinnerCarRot from '../../spinners/SpinnerCarRot';
import AdminModalCustomerCreate from '../adminModalForm/AdminModalCustomerCreate';

interface ICustomer {
    customers: any[] | null;
}

const AdminCustomersContent = ({customers}: ICustomer) => {
    const [activeCustomer, setActiveCustomer] = useState(false);
    const [customerData, setCustomerData] = useState<ICustomerItem | null>(null);
    const [createCustm, setCreateCustm] = useState(false);
    const [filteredCustomer, setFilteredCustomer] = useState< any[] | null>(customers);
    const [value, setValue] = useState('');
    const [isSearch, setIsSearch] = useState(true);

    useEffect(() => {
        if(value.length !== 0) {
            const filteredCustomerData: any = customers?.filter((customerItem: any) => {
                return customerItem?.id_customer.toString().toLowerCase().includes(value.toLowerCase()) ||
                customerItem?.name.toLowerCase().includes(value.toLowerCase()) ||
                customerItem?.phone.toLowerCase().includes(+value.toLowerCase())
            })
            setFilteredCustomer(filteredCustomerData);
        } else {
            setFilteredCustomer(customers);
        }
    },[customers, value])

    const showCustomersData = async (e: any) => {
        let customersInfo = customers?.find(
            (item:{id_customer: number}) => 
                item.id_customer === +e.currentTarget.value
            );
        if(customersInfo) {
            e.currentTarget.name === 'editCustomer' ? customersInfo.disableBtns = true : customersInfo.disableBtns = false;
            if (e.currentTarget.name === 'editCustomer') {
                setCustomerData(customersInfo);
                setCreateCustm(!createCustm);
            }
            if (e.currentTarget.name === 'customerShow') {
                setCustomerData(customersInfo);
                setActiveCustomer(!activeCustomer);
            }
        } else{
            setCustomerData(null);
        }
    };

    const createCustomer = () => {
        setCreateCustm(!createCustm);
        setCustomerData(null);
    };

    const itemClickHandler = (e: any) => {
        const entity = e.target.textContent.split(':')
        setValue(entity[1]);
        setIsSearch(!isSearch);
    }

    const inputHandler = () => {
        setIsSearch(true);
    }

    const inputCancelHandler = () => {
        if(isSearch){
           setIsSearch(false); 
        }
    }

    const sortCustomer = (e: any) => {
        if (e.target.textContent === 'Код') {
            const sortByCode: any = 
            filteredCustomer?.sort(
            (a:any, b:any) => (+a.id_customer) - (+b.id_customer));
            setFilteredCustomer(sortByCode);
        }
        if (e.target.textContent === 'Дата') {
            const sortByDate: any = 
            filteredCustomer?.sort(
            (a:any, b:any) => 
            (+(new Date(a.createdAt).toLocaleString())) - (+(new Date(b.createdAt).toLocaleString())));
            setFilteredCustomer(sortByDate);
        }
        if (e.target.textContent === 'Дата оновлення') {
            const sortByDateUpdate: any = 
            filteredCustomer?.sort(
            (a:any, b:any) => 
            (+(new Date(a.updatedAt).toLocaleString())) - (+(new Date(b.updatedAt).toLocaleString())));
            setFilteredCustomer(sortByDateUpdate);
        }
        if (e.target.textContent === 'Покупець') {
            const sortByCustomer: any = 
            filteredCustomer?.sort(
                    (a:any, b:any) => 
                    a.name.toLowerCase().localeCompare(
                        b.name.toLowerCase()
                    )
            )
            setFilteredCustomer(sortByCustomer);
        }
        if (e.target.textContent === 'Місто') {
            const sortByStorage: any = 
            filteredCustomer?.sort(
                (a:any, b:any) => 
                a.city.toLowerCase().localeCompare(
                    b.city.toLowerCase()
                )
        )
            setFilteredCustomer(sortByStorage)
        }  
        if (e.target.textContent === 'Телефон') { 
            const sortByStatus: any = 
            filteredCustomer?.sort(
                (a:any, b:any) => 
                a.phone.toLowerCase().localeCompare(
                    b.phone.toLowerCase()
                )
            )
            setFilteredCustomer(sortByStatus);
        }
        if (e.target.textContent === 'Email') { 
            const sortByOrderType: any = 
            filteredCustomer?.sort(
                (a:any, b:any) => 
                a.email.toLowerCase().localeCompare(
                    b.email.toLowerCase()
                )
            )
            setFilteredCustomer(sortByOrderType);
        }
        if (e.target.textContent === `Повне і'мя`) { 
            const sortByFullName: any = 
            filteredCustomer?.sort(
                (a:any, b:any) => 
                a.full_name.toLowerCase().localeCompare(
                    b.full_name.toLowerCase()
                )
            )
            setFilteredCustomer(sortByFullName);
        }
    };

    const customersTable = ({index, style}: any) => (
        <div className='admCustomerGridItem' style={style}>
            <div>{filteredCustomer![index].id_customer}</div>
            <div>{filteredCustomer![index]?.name}</div>
            <div>{filteredCustomer![index]?.phone}</div>
            <div>{filteredCustomer![index]?.contract.reduce((sum: any, current:any) => sum + current.balance, 0)}</div>
            <div>{filteredCustomer![index]?.contract.reduce((sum: any, current:any) => sum + current.bonus, 0)}</div>
            <div>{filteredCustomer![index]?.delivery}</div>
            <div>{filteredCustomer![index]?.address}</div>
            <div>{filteredCustomer![index]?.delivery_dep}</div>
            <div>
                <button className='eyeAdmTyre'
                    value={filteredCustomer![index].id_customer}
                    onClick={showCustomersData}
                    name='customerShow'
                >
                    <i className="fas fa-eye"
                        title='Інфо користувача'
                    ></i>
                </button>
                <button className='editAdmGoods'
                    name='editCustomer'
                    value={filteredCustomer![index].id_customer}
                    onClick={showCustomersData}>
                    <i className="fas fa-edit"
                        title='Редагувати'
                    ></i>
                </button>
                <button className='closeAdmGoods'
                    value={filteredCustomer![index].id_customer}>
                    <i className="fa fa-remove"
                        title='Видалити'
                    ></i>
                </button>                  
            </div>
        </div>    
    );
    
    return (
        <div onClick={inputCancelHandler}>
            <div className="admCustomersContent">
                <span>Покупці:</span>
                <div className='admCustomersHeader'>
                    <button className='admCustomersAddBtn'
                        onClick={createCustomer}>Додати покупця
                    </button>
                </div>
                <input 
                    className='inputAdminCustomers' 
                    type="text" 
                    id="myInputCustomer"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    onClick={inputHandler} 
                    placeholder="Введіть значення для пошуку..."
                />
                <ul className='inputCustomerContent'>
                        {value && isSearch ?
                            filteredCustomer?.map(
                                (item: ICustomerItem, index: number) =>{
                            return (
                            <li key={'fullName' + index}
                                className='inputCustomerContentItem'
                                onClick={itemClickHandler}
                            >
                            {`${item.id_customer}:${item.full_name}`}
                            </li>
                            ) 
                            })  
                        : null  
                        }
                    </ul>
                    <ButtonSearch clickSearchBtn={()=> console.log('searchBtn')}/>
            </div>
            {filteredCustomer ? 
            <div className='admCustomersTable'>
                <table className='admListCustomersTable'>
                    <thead>
                        <tr className='headerCustomersTable'>
                            <th onClick={sortCustomer}
                                className='headerCustomerHeadTableCode'
                            >
                                Код
                            </th>
                            <th onClick={sortCustomer}
                                className='headerCustomerHeadTableCust'
                            >
                                Покупець
                            </th>
                            <th onClick={sortCustomer}
                                className='headerCustomerHeadTablePhone'
                            >
                                Телефон
                            </th>
                            <th className='headerCustomerHeadTableBalance'>
                                Баланс
                            </th>
                            <th className='headerCustomerHeadTableBonuse'>
                                Бонуси
                            </th>
                            <th className='headerCustomerHeadTableDelivery'>
                                Первізник
                            </th>
                            <th className='headerCustomerHeadTableAddresss'>
                                Адреса
                            </th>
                            <th className='headerCustomerHeadTableDepart'>
                                Відділення
                            </th>
                            <th className='headerCustomerHeadTableOption'>
                                Опції
                            </th>
                        </tr>
                    </thead>    
                    <tbody>
                    </tbody>
                </table>
                <List
                    className="admCustomerTableColmId"
                    itemCount={filteredCustomer!.length}
                    itemSize={90}
                    height={330}
                    width={1315}
                >
                    {customersTable}
                </List>       
            </div> :
                <SpinnerCarRot/>
            } 
            {createCustm ?
                <ModalAdmin active={createCustm} setActive={setCreateCustm}>
                    <AdminModalCustomerCreate 
                        active={createCustm} 
                        setActive={setCreateCustm}
                        dataCustomer={customerData}
                    />    
                </ModalAdmin>  
                : null
            } 
            <ModalAdmin active={activeCustomer} setActive={setActiveCustomer}>
            <div className='admCustomersModalInfo'>
                <span style={{'textDecoration': 'underline',} as React.CSSProperties}>ІНФОРМАЦІЯ ПРО ПОКУПЦЯ: </span>  
                <div>ID Покупця: {customerData?.id_customer}</div>
                <div>Назва: {customerData?.name}</div>
                <div>Адреса: {customerData?.address}</div>
                <div>Телефон: {customerData?.phone}</div>
                <div>email: {customerData?.email}</div>
                <div>Баланс (Загальний): {customerData?.contract.reduce((sum: any, current:any) => sum + current.balance, 0)}</div>
                <div>Перевізник: {customerData?.delivery}</div>
                <div>Відділення: {customerData?.delivery_dep}</div>
                <div>Відділення Ref: {customerData?.delivery_dep_ref}</div>
                <div>Місто Ref: {customerData?.delivery_city_ref}</div>
                <div>Покупець адреса: {customerData?.address}</div>
                <div>Договора: 
                    {customerData?.contract ? customerData?.contract.map(
                        (item: any) =>
                    <ul key={item.id_contract}>
                        <li>Id Договора (Контракта): {item.id_contract}</li>
                        <li>Назва договора (Контракта): {item.name}</li>
                        <li>Баланс: {item.balance}</li>
                        <li>Бонуси: {item.bonus}</li>
                    </ul>
                    ) :
                    null
                    }
                </div>
                <div>Замовлення: 
                    {customerData?.orders ? customerData?.orders.map(
                        (item: any) =>
                    <ul key={item.id_order}>
                        <li>Дата: {new Date(item.createdAt).toLocaleString()}</li>
                        <li>Id замовлення: {item.id_order}</li>
                        <li>Остаточна сума: {item.total_cost}</li>
                        <li>Сума доставки: {item.delivery_cost ?? 0}</li>
                        <li>Комісія: {item.commission_cost ?? 0}</li>
                        <li>Доп гарантія: {item.dop_garanty ?? 0}</li>
                        <li>Вид замовдення: {item.order_view}</li>
                        <li>Склад: {item.storage}</li>
                        <li>Вид оплати: {item.pay_view}</li>
                        <li>Перевізник: {item.delivery}</li>
                        <li>Місто: {item.delivery_city}</li>
                        <li>Відділення: {item.delivery_city_depart}</li>
                    </ul>
                    ) :
                    null
                    }
                </div>
                {customerData?.reviews.length !== 0 ?
                <div>Відгуки: 
                    {customerData?.reviews ? customerData?.reviews.map(
                        (item: any) =>
                    <ul key={item.id_review}>
                        <li>Відгук: {item.description}</li>
                        <li>Негатив: {item.negative}</li>
                        <li>Позитив: {item.positive}</li>
                        <li>Стаж вод: {item.driver_experience}</li>
                        <li>Авто: {item.car}</li>
                        <li>Ім'я: {item.name}</li>
                        <li>Дата: {new Date(item.createdAt).toLocaleString()}</li>
                    </ul>
                    ) :
                    null
                    }
                </div>
                : null
                }
            </div>
            </ModalAdmin>
        </div>
    );
};

export default AdminCustomersContent;