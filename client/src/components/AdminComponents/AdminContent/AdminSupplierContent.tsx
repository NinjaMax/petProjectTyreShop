import React, {useEffect, useState} from 'react';
import '../../../css/AdminComponentCss/AdminContentCss/AdminSuppliersContent.css';
import ButtonSearch from '../../buttons/ButtonSearch';
import ModalAdmin from '../../modal/ModalAdmin';
import AdminModalSupplier from '../adminModalForm/AdminModalSupplier';
import { ISupplierItem } from './types/SupplierItem.type';

const AdminSupplierContent = ({suppliers}:any) => {
    const [createSupplier, setCreateSupplier] = useState(false);
    const [filteredSupplier, setFilteredSupplier] = useState< any[] | null>(suppliers);
    const [value, setValue] = useState('');
    const [isSearch, setIsSearch] = useState(true);

    useEffect(() => {
        if(value.length !== 0) {
            const filteredSupplierData = suppliers?.filter((supplierItem: any) => {
                return supplierItem.id_supplier.toLowerCase().includes(+value.toLowerCase()) ||
                supplierItem.name.toLowerCase().includes(value.toLowerCase())  
            })
            setFilteredSupplier(filteredSupplierData);
        } else {
            setFilteredSupplier(suppliers);
        }
    },[suppliers, value])

    const createSupplierBtn = () => {
        setCreateSupplier(!createSupplier);
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

    const sortSupplier = (e: any) => {
        if (e.target.textContent === 'Код') {
            const sortByCode: any = 
            filteredSupplier?.sort(
            (a:any, b:any) => (+a.id_supplier) - (+b.id_supplier));
            setFilteredSupplier(sortByCode);
        }
        if (e.target.textContent === 'Дата') {
            const sortByDate: any = 
            filteredSupplier?.sort(
            (a:any, b:any) => 
            (+(new Date(a.createdAt).toLocaleString())) - (+(new Date(b.createdAt).toLocaleString())));
            setFilteredSupplier(sortByDate);
        }
        if (e.target.textContent === 'Дата оновлення') {
            const sortByDateUpdate: any = 
            filteredSupplier?.sort(
            (a:any, b:any) => 
            (+(new Date(a.updatedAt).toLocaleString())) - (+(new Date(b.updatedAt).toLocaleString())));
            setFilteredSupplier(sortByDateUpdate);
        }
        if (e.target.textContent === 'Постачальник') {
            const sortByCustomer: any = 
            filteredSupplier?.sort(
                    (a:any, b:any) => 
                    a.name.toLowerCase().localeCompare(
                        b.name.toLowerCase()
                    )
            )
            setFilteredSupplier(sortByCustomer);
        }
        if (e.target.textContent === 'Місто') {
            const sortByStorage: any = 
            filteredSupplier?.sort(
                (a:any, b:any) => 
                a.city.toLowerCase().localeCompare(
                    b.city.toLowerCase()
                )
        )
            setFilteredSupplier(sortByStorage)
        }  
        if (e.target.textContent === 'Телефон') { 
            const sortByStatus: any = 
            filteredSupplier?.sort(
                (a:any, b:any) => 
                a.phone.toLowerCase().localeCompare(
                    b.phone.toLowerCase()
                )
            )
            setFilteredSupplier(sortByStatus);
        }
        if (e.target.textContent === 'Email') { 
            const sortByOrderType: any = 
            filteredSupplier?.sort(
                (a:any, b:any) => 
                a.email.toLowerCase().localeCompare(
                    b.email.toLowerCase()
                )
            )
            setFilteredSupplier(sortByOrderType);
        }
        if (e.target.textContent === 'Перевізник') { 
            const sortByDelivery: any = 
            filteredSupplier?.sort(
                (a:any, b:any) => 
                a.delivery.toLowerCase().localeCompare(
                    b.delivery.toLowerCase()
                )
            )
            setFilteredSupplier(sortByDelivery);
        }
    }

    return (
        <div onClick={inputCancelHandler}>
        <div className="admSupplierContent">
            <span>Постачальники:</span>
            <div className='admSupplierHeader'>
                <button className='admSupplierAddBtn'
                    onClick={createSupplierBtn}>Додати постачальника
                </button>
            </div>
            <input 
                className='inputAdminSupplier' 
                type="text" 
                id="myInputSupplier"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onClick={inputHandler} 
                placeholder="Введіть значення для пошуку..."
            />
                    <ul className='inputSupplierContent'>
                        {value && isSearch ?
                            filteredSupplier?.map(
                                (item: ISupplierItem, index: number) =>{
                            return (
                            <li key={'fullName' + index}
                                className='inputSupplierContentItem'
                                onClick={itemClickHandler}
                            >
                            {`${item.id_supplier}:${item.name}`}
                            </li>
                            ) 
                            })  
                        : null  
                        }
                    </ul>
            <ButtonSearch clickSearchBtn={()=> console.log('searchBtn')}/>
        </div>
        <div className='admSupplierTable'>
        <table className='admListSupplierTable'>
            <thead>
                <tr className='headerSupplierTable'>
                    <th onClick={sortSupplier}>Код</th>
                    <th onClick={sortSupplier}>Постачальник</th>
                    <th onClick={sortSupplier}>Місто</th>
                    <th onClick={sortSupplier}>Телефон</th>
                    <th onClick={sortSupplier}>Email</th>
                    <th>Ід Контракту</th>
                    <th>Контракт</th>
                    <th>Баланс</th>
                    <th onClick={sortSupplier}>Перевізники</th>
                    <th>Опції</th>
                </tr>
            </thead>    
            <tbody>
            {filteredSupplier ? filteredSupplier.map(
                (items: ISupplierItem) => (
                    <tr key={'or' + items.id_supplier}
                        //onClick={e => showComment(e)}
                        //onDoubleClick={e => showOrderData(e)}
                        data-value={items.id_supplier}>
                        <td>{items.id_supplier}</td>
                        <td>{items.name}</td>
                        <td>{items.city}</td>
                        <td>{items?.phone}</td>
                        <td>{items?.email}</td>
                        <td>{items.contract[0].id_contract}</td>
                        <td>{items.contract[0].name}</td>
                        <td>{items.contract[0].balance}</td>
                        <td>{items.delivery}</td>
                        <td>
                            <button className='basketAdmGoods'
                                value={items.id_supplier}
                            >
                                <i className="fa fa-shopping-cart"></i>
                            </button>
                            <button className='editAdmGoods'
                                value={items.id_supplier}
                            >
                                <i className="fas fa-edit"></i>
                            </button>
                            <button className='closeAdmGoods'
                                value={items.id_supplier}
                            >
                                <i className="fa fa-remove"></i>
                            </button>                  
                        </td>
                    </tr>
                    ))
                    : <tr><td>.....Очікуемо постачальників.....</td></tr>
                    }                          
            </tbody>
        </table>
        </div> 
        {createSupplier?
            <ModalAdmin active={createSupplier} setActive={setCreateSupplier}>
                <AdminModalSupplier/>
            </ModalAdmin> : null
        }
    </div>
    );
};

export default AdminSupplierContent;