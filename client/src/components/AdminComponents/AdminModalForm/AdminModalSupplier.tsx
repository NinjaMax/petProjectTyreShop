import React, { useEffect, useState } from 'react';
import '../../../css/AdminComponentCss/AdminModalFormCss/AdminModalSupplier.css';
import { FixedSizeList  as List } from 'react-window';

const AdminModalSupplier = ({allsupplier, addSupplier}:any) => {
    const [filterSupplier, setFilterSupplier] = useState<any[] | null | undefined>(allsupplier);
    const [filterSupplierValue, setFilterSupplierValue] = useState<string>();

    useEffect(() => {
        if (filterSupplierValue) {
            const newSupplierList = allsupplier?.filter(
            (supplier: any) => {
            return supplier.name.toLowerCase().includes(filterSupplierValue.toLowerCase()) || 
            supplier.id_supplier === +filterSupplierValue! 
            });
            setFilterSupplier(newSupplierList); 
        } else {
            setFilterSupplier(allsupplier); 
        }
    },[allsupplier, filterSupplierValue]);

    const findSupplier = (e: any) => {
        setFilterSupplierValue(e.currentTarget.value);
    };

    const tableCustomerRow = ({index, style}: any) => (
        <div className='admSuppliersGridItem' style={style}
            onDoubleClick={addSupplier} 
            data-value={filterSupplier![index].id_supplier}
        >
            <div>{filterSupplier![index]?.id_supplier}</div>
            <div>{filterSupplier![index]?.name}</div>
            <div>{filterSupplier![index]?.phone}</div>
            <div>{filterSupplier![index]?.city}</div>
            <div>{filterSupplier![index]?.address}</div>
            <div>{filterSupplier![index]?.contract[0]?.name ?? ''}</div>
            <div>{filterSupplier![index]?.contract[0]?.id_contract ?? ''}</div>
            <div>{filterSupplier![index]?.contract?.reduce((sum: any, current: any) => sum + current.balance, 0) ?? ''}</div>
        </div>    
    );

    return (
        <div className='admModalSuppliersBox'>
            <input type="text" className="admInpModalSuppliers" placeholder="Пошук клієнта.."
                onChange={findSupplier}
            />
            <table className="admModalSuppliersTable">
                <thead>
                    <tr className="admModalHeaderSuppliers">
                        <th className='headerAdmModalSuppliersBoxId'>
                            id
                        </th>
                        <th className='headerAdmModalSuppliersBoxName'>
                            Ім'я / Назва
                        </th>
                        <th className='headerAdmModalSuppliersBoxPhone'>
                            Телефон
                        </th>
                        <th className='headerAdmModalSuppliersBoxCity'>
                            Місто
                        </th>
                        <th className='headerAdmModalSuppliersBoxSupTel'>
                            Снаб Тел
                        </th>
                        <th className='headerAdmModalSuppliersBoxContract'>
                            Контракт
                        </th>
                        <th className='headerAdmModalSuppliersBoxIdContr'>
                            id кон
                        </th>
                        <th className='headerAdmModalSuppliersBoxBalance'>
                            Баланс
                        </th>
                    </tr>   
                </thead>
                <tbody>
                </tbody>     
            </table>
            {filterSupplier ? 
            <List
                className="admSuppliersTableColmId"
                itemCount={filterSupplier?.length}
                itemSize={85}
                height={295}
                width={895}
            >
                {tableCustomerRow}
            </List>
            : <span>Очікуемо покупців....</span> 
            }
        </div>
    );
};

export default AdminModalSupplier;