import React, {useState} from 'react';
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

    const createCustomer = () => {
        setCreateCustm(!createCustm);
    };

    return (
        <div>
            <div className="admCustomersContent">
                <span>Покупці:</span>
                <div className='admCustomersHeader'>
                    <button className='admCustomersAddBtn'
                        onClick={createCustomer}>Додати покупця
                    </button>
                </div>
                <input className='inputAdminCustomers' type="text" id="myInput" placeholder="Введіть значення для пошуку..."/>
                    <ButtonSearch clickSearchBtn={()=> console.log('searchBtn')}/>
            </div>
            <div className='admCustomersTable'>
                <table className='admListCustomersTable'>
                    <thead>
                        <tr className='headerCustomersTable'>
                            <th>Код</th>
                            <th>Покупець</th>
                            <th>Повне і'мя</th>
                            <th>Місто</th>
                            <th>Телефон</th>
                            <th>Email</th>
                            <th>Ід Контракту</th>
                            <th>Контракт</th>
                            <th>Баланс</th>
                            <th>Опції</th>
                        </tr>
                    </thead>    
                    <tbody>
                    {customers ? customers.map((items: ICustomerItem) => (
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