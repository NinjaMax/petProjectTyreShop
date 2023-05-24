import React, {useEffect, useState} from 'react';
import '../../../css/AdminComponentCss/AdminContentCss/AdminCustomersContent.css';
import ButtonSearch from '../../buttons/ButtonSearch';
import ModalAdmin from '../../modal/ModalAdmin';
import AdminModalCustmCreate from '../adminModalForm/AdminModalCustmCreate';
import { ICustomerItem } from './types/CustomerItem.type';

interface ICustomer {
    customers: [] | null;
}

const AdminCustomersContent = ({customers}: ICustomer) => {
    const [createCustm, setCreateCustm] = useState(false);
    const [filteredCustomer, setFilteredCustomer] = useState< any[] | null>(customers);
    const [value, setValue] = useState('');
    const [isSearch, setIsSearch] = useState(true);

    useEffect(() => {
        if(value.length !== 0) {
            const filteredCustomerData: any = customers?.filter((customerItem: any) => {
                return customerItem.id_customer.toLowerCase().includes(+value.toLowerCase()) ||
                customerItem.full_name.toLowerCase().includes(value.toLowerCase())  
            })
            setFilteredCustomer(filteredCustomerData);
        } else {
            setFilteredCustomer(customers);
        }
    },[customers, value])

    const createCustomer = () => {
        setCreateCustm(!createCustm);
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
    }

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
                    id="myInput"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    onClick={inputHandler} 
                    placeholder="Введіть значення для пошуку..."
                />
                <ul className='inputOrderContent'>
                        {value && isSearch ?
                            filteredCustomer?.map(
                                (item: ICustomerItem, index: number) =>{
                            return (
                            <li key={'fullName' + index}
                                className='inputOrderContentItem'
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
            <div className='admCustomersTable'>
                <table className='admListCustomersTable'>
                    <thead>
                        <tr className='headerCustomersTable'>
                            <th onClick={sortCustomer}>Код</th>
                            <th onClick={sortCustomer}>Покупець</th>
                            <th onClick={sortCustomer}>Повне і'мя</th>
                            <th onClick={sortCustomer}>Місто</th>
                            <th onClick={sortCustomer}>Телефон</th>
                            <th onClick={sortCustomer}>Email</th>
                            <th>Ід Контракту</th>
                            <th>Контракт</th>
                            <th>Баланс</th>
                            <th>Опції</th>
                        </tr>
                    </thead>    
                    <tbody>
                    {filteredCustomer ? filteredCustomer.map(
                        (items: ICustomerItem) => (
                    <tr key={'or' + items.id_customer}
                        //onClick={e => showComment(e)}
                        //onDoubleClick={e => showOrderData(e)}
                        data-value={items.id_customer}>
                        <td>{items.id_customer}</td>
                        <td>{items.name}</td>
                        <td>{items.full_name}</td>
                        <td>{items.city}</td>
                        <td>{items?.phone}</td>
                        <td>{items?.email}</td>
                        <td>{items.contract[0].id_contract}</td>
                        <td>{items.contract[0].name}</td>
                        <td>{items.contract[0].balance}</td>
                        <td>
                            <button className='basketAdmGoods'
                                value={items.id_customer}
                            >
                                <i className="fa fa-shopping-cart"></i>
                            </button>
                            <button className='editAdmGoods'
                                value={items.id_customer}
                            >
                                <i className="fas fa-edit"></i>
                            </button>
                            <button className='closeAdmGoods'
                                value={items.id_customer}
                            >
                                <i className="fa fa-remove"></i>
                            </button>                  
                            </td>
                    </tr>
                    ))
                    : <tr><td>.....Очікуемо покупців.....</td></tr>
                    }              
                    </tbody>
                </table>
            </div>
            {createCustm ?
                <ModalAdmin active={createCustm} setActive={setCreateCustm}>
                    <AdminModalCustmCreate/>    
                </ModalAdmin>  
                : null
            } 
        </div>
    );
};

export default AdminCustomersContent;