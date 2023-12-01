import React, { useEffect, useState } from 'react';
import '../../../css/AdminComponentCss/AdminModalFormCss/AdminModalCustomers.css';
import { FixedSizeList  as List } from 'react-window';

interface IModalCustomers {
    allCustomer: any[] | null | undefined;
    addCustomer(arg0: any): void;
}

type IAllCustomer = {
    id_customer: number;
    name: string;
    full_name: string;
    contract: [
        {name: string; id_contract: number;}
    ];
}

const AdminModalCustomers = ({allCustomer, addCustomer}: IModalCustomers) => {
    const [filterCustomer, setFilterCustomer] = useState<any[] | null | undefined>(allCustomer);
    const [filterCustmValue, setFilterCustmValue] = useState<string>();

    useEffect(() => {
        if (filterCustmValue) {
            const newCustomerList = allCustomer?.filter(
            (customer: any) => {
            return customer.name.toLowerCase().includes(filterCustmValue.toLowerCase()) || 
            customer.id_customer === +filterCustmValue! || 
            customer.phone.includes(+filterCustmValue)
            });
            setFilterCustomer(newCustomerList); 
        } else {
            setFilterCustomer(allCustomer); 
        }
    },[allCustomer, filterCustmValue]);

    const findCustomer = (e: any) => {
        setFilterCustmValue(e.currentTarget.value);
    };

    const tableCustomerRow = ({index, style}: any) => (
        <div className='admCustomersGridItem' style={style}
            onDoubleClick={addCustomer} 
            data-value={filterCustomer![index].id_customer}
        >
            <div>{filterCustomer![index].id_customer}</div>
            <div>{filterCustomer![index].name}</div>
            <div>{filterCustomer![index].phone}</div>
            <div>{filterCustomer![index].contract[0].name ?? ''}</div>
            <div>{filterCustomer![index].contract[0].id_contract ?? ''}</div>
            <div>{filterCustomer![index].contract[0].bonus ?? ''}</div>
            <div>{filterCustomer![index].contract[0].balance ?? ''}</div>
        </div>    
    );

    return (
        <div className='admModalCustmBox'>
            <input type="text" className="admInpModalCustm" placeholder="Пошук клієнта.."
                onChange={findCustomer}
            />
            <table className="admModalCustmTable">
                <thead>
                    <tr className="admModalHeaderCustm">
                        <th className='headerAdmModalCustmBoxId'>
                            id
                        </th>
                        <th className='headerAdmModalCustmBoxName'>
                            Ім'я / Назва
                        </th>
                        <th className='headerAdmModalCustmBoxPhone'>
                            Телефон
                        </th>
                        <th className='headerAdmModalCustmBoxContract'>
                            Контракт
                        </th>
                        <th className='headerAdmModalCustmBoxIdContr'>
                            id контр
                        </th>
                        <th className='headerAdmModalCustmBoxBonus'>
                            Бонуси
                        </th>
                        <th className='headerAdmModalCustmBoxBalance'>
                            Баланс
                        </th>
                    </tr>   
                </thead>
                <tbody>
                </tbody>     
            </table>
            {filterCustomer ? 
            <List
                className="admCustomerTableColmId"
                itemCount={filterCustomer?.length}
                itemSize={65}
                height={295}
                width={850}
            >
                {tableCustomerRow}
            </List>
            : <span>Очікуемо покупців....</span> 
            }
        </div>
    );
};

export default AdminModalCustomers;