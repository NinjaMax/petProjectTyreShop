import React, {useEffect, useState} from 'react';
import '../../../css/AdminComponentCss/AdminContentCss/AdminSuppliersContent.css';
import ButtonSearch from '../../buttons/ButtonSearch';
import ModalAdmin from '../../modal/ModalAdmin';
import { ISupplierItem } from './types/SupplierItem.type';
import { FixedSizeList  as List } from 'react-window';
import SpinnerCarRot from '../../spinners/SpinnerCarRot';
import AdminModalSupplierCreate from '../adminModalForm/AdminModalSupplierCreate';

const AdminSupplierContent = ({suppliers}:any) => {
    const [activeSupplier, setActiveSupplier] = useState(false);
    const [supplierData, setSupplierData] = useState<ISupplierItem | null>(null);
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
    },[suppliers, value]);

    const showSuppliersData = async (e: any) => {
        let suppliersInfo = suppliers?.find(
            (item:{id_supplier: number}) => 
                item.id_supplier === e.currentTarget.value
            );
        if(suppliersInfo) {
            e.currentTarget.name === 'editSupplier' ? suppliersInfo.disableBtns = true : suppliersInfo.disableBtns = false;
            if (e.currentTarget.name === 'editSupplier') {
                setSupplierData(suppliersInfo);
                setCreateSupplier(!createSupplier);
            }
            if (e.currentTarget.name === 'supplierShow') {
                setSupplierData(suppliersInfo);
                setActiveSupplier(!activeSupplier);
            }
        } else{
            setSupplierData(null);
        }
    };

    const createSupplierBtn = () => {
        setCreateSupplier(!createSupplier);
        setSupplierData(null);
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
    };

    const suppliersTable = ({index, style}: any) => (
        <div className='admSupplierGridItem' style={style}>
            <div>{filteredSupplier![index].id_supplier}</div>
            <div>{filteredSupplier![index]?.name}</div>
            <div>{filteredSupplier![index].city_ua}</div>
            <div>{filteredSupplier![index]?.phone}</div>
            <div>{filteredSupplier![index]?.email}</div>
            <div>{filteredSupplier![index]?.contract.reduce((sum: any, current:any) => sum + current.balance, 0)}</div>
            <div>{filteredSupplier![index]?.delivery}</div>
            <div>{filteredSupplier![index]?.address}</div>
            <div>
                <button className='eyeAdmTyre'
                    value={filteredSupplier![index].id_supplier}
                    onClick={showSuppliersData}
                    name='supplierShow'
                    >
                    <i className="fas fa-eye"
                        title='Інфо постачальника'
                    ></i>
                </button>
                <button className='editAdmGoods'
                    name='editSupplier'
                    value={filteredSupplier![index].id_supplier}
                    onClick={showSuppliersData}>
                    <i className="fas fa-edit"
                        title='Редагувати'
                    ></i>
                </button>
                <button className='closeAdmGoods'
                    value={filteredSupplier![index].id_supplier}>
                    <i className="fa fa-remove"
                        title='Видалити'
                    ></i>
                </button>                  
            </div>
        </div>    
    );
    
    console.log('SUPPLIERS_DATA: ', suppliers);

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
        {filteredSupplier ?
        <div className='admSupplierTable'>
        <table className='admListSupplierTable'>
            <thead>
                <tr className='headerSupplierTable'>
                    <th className='headerSupplierHeadTableCode'
                        onClick={sortSupplier}>Код</th>
                    <th className='headerSupplierHeadTableSup'
                        onClick={sortSupplier}>Постачальник</th>
                    <th className='headerSupplierHeadTableCity'
                        onClick={sortSupplier}>Місто</th>
                    <th className='headerSupplierHeadTablePhone'
                        onClick={sortSupplier}>Телефон</th>
                    <th className='headerSupplierHeadTableEmail'
                        onClick={sortSupplier}>Email</th>
                    <th className='headerSupplierHeadTableBalance'
                    >Баланс</th>
                    <th className='headerSupplierHeadTableDelivery'
                        onClick={sortSupplier}
                    >Перевізники</th>
                    <th className='headerSupplierHeadTableAddresss'
                    >Address Постач</th>
                    <th className='headerSupplierHeadTableOption'
                    >Опції</th>
                </tr>
            </thead>    
            <tbody>
            </tbody>
        </table>
        <List
            className="admSupplierTableColmId"
            itemCount={filteredSupplier!.length}
            itemSize={65}
            height={330}
            width={1315}
        >
            {suppliersTable}
        </List>       
        </div> :
            <SpinnerCarRot/>
        } 
        <div>
        {createSupplier?
            <ModalAdmin active={createSupplier} setActive={setCreateSupplier}>
                <AdminModalSupplierCreate 
                    active={createSupplier}
                    setActive={setCreateSupplier}
                    dataSupplier={supplierData}
                />
            </ModalAdmin> : null
        }
        <ModalAdmin active={activeSupplier} setActive={setActiveSupplier}>
            <div>
                <span style={{'textDecoration': 'underline',} as React.CSSProperties}>ІНФОРМАЦІЯ ПРО ПОСТАЧАЛЬНИКА: </span>  
                <div>ID Постачальника: {supplierData?.id_supplier}</div>
                <div>Назва: {supplierData?.name}</div>
                <div>Місто: {supplierData?.city_ua}</div>
                <div>Телефон: {supplierData?.phone}</div>
                <div>email: {supplierData?.email}</div>
                <div>Баланс (Загальний): {supplierData?.contract.reduce((sum: any, current:any) => sum + current.balance, 0)}</div>
                <div>Договора: 
                    {supplierData?.contract ? supplierData?.contract.map(
                        (item: any) =>
                    <ul key={item.id_contract}>
                        <li>Id Договора (Контракта): {item.id_contract}</li>
                        <li>Назва договора (Контракта): {item.name}</li>
                        <li>Баланс: {item.balance}</li>
                    </ul>
                    ) :
                    null
                    }
                </div>
                <div>Перевізник: {supplierData?.delivery}</div>
                <div>Відділення: {supplierData?.delivery_dep}</div>
                <div>Відділення Ref: {supplierData?.delivery_dep_ref}</div>
                <div>Місто Ref: {supplierData?.delivery_city_ref}</div>
                <div>Постачання адреса телеграм: {supplierData?.address}</div>
            </div>
        </ModalAdmin>
        </div>
    </div>
    );
};

export default AdminSupplierContent;