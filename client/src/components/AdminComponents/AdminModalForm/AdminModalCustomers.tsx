import React from 'react';
import '../../../css/AdminComponentCss/AdminModalFormCss/AdminModalCustomers.css';

interface IModalCustomers {
    allCustomer: [] | null;
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

    return (
        <div>
            <input type="text" className="admInpModalCustm" placeholder="Search for names.."/>
            <table className="admModalCustmTable">
                <thead>
                    <tr className="admModalHeaderCustm">
                        <th>id</th>
                        <th>Ім'я / Назва</th>
                        <th>Контракт</th>
                        <th>id контракту</th>
                    </tr>   
                </thead>
                <tbody>
                    {allCustomer ? 
                        allCustomer?.map((entity:IAllCustomer) => (
                        <tr key={'cus' + entity.id_customer} 
                            onDoubleClick={e => addCustomer(e.currentTarget.getAttribute("data-value"))} 
                            data-value={entity.id_customer}>
                            <td >{entity.id_customer}</td>
                            <td >{entity.full_name}</td>
                            <td >{entity.contract[0].name}</td>
                            <td >{entity.contract[0].id_contract}</td>
                        </tr>
                        )) 
                        : <tr><td>Очікуемо покупців....</td></tr> 
                    }
                </tbody>     
            </table>
        </div>
    );
};

export default AdminModalCustomers;