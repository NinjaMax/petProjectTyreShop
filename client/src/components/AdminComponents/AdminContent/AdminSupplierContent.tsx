import React, {useState} from 'react';
import '../../../css/AdminComponentCss/AdminContentCss/AdminSuppliersContent.css';
import ButtonSearch from '../../buttons/ButtonSearch';
import ModalAdmin from '../../modal/ModalAdmin';
import AdminModalSupplier from '../adminModalForm/AdminModalSupplier';
import { ISupplierItem } from './types/SupplierItem.type';

const AdminSupplierContent = ({suppliers}:any) => {
    const [createSupplier, setCreateSupplier] = useState(false);
    const [value, setValue] = useState('');
    const [isSearch, setIsSearch] = useState(true);

    const createSupplierBtn = () => {
        setCreateSupplier(!createSupplier);
    };

    const filteredSupplierData = suppliers?.filter((supplierItem: any) => {
        return supplierItem.id_supplier.toLowerCase().includes(+value.toLowerCase()) ||
        supplierItem.name.toLowerCase().includes(value.toLowerCase())  
    })

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
                id="myInput"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onClick={inputHandler} 
                placeholder="Введіть значення для пошуку..."
            />
                    <ul className='inputSupplierContent'>
                        {value && isSearch ?
                            filteredSupplierData?.map(
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
                    <th>Код</th>
                    <th>Постачальник</th>
                    <th>Місто</th>
                    <th>Телефон</th>
                    <th>Email</th>
                    <th>Ід Контракту</th>
                    <th>Контракт</th>
                    <th>Баланс</th>
                    <th>Перевізники</th>
                    <th>Опції</th>
                </tr>
            </thead>    
            <tbody>
            {filteredSupplierData ? filteredSupplierData.map(
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