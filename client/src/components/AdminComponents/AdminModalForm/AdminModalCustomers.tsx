import React from 'react';
import '../../../css/AdminComponentCss/AdminModalFormCss/AdminModalCustomers.css';

const AdminModalCustomers = ({allCustomer, addCustomer}) => {

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
                        allCustomer.map((entity) => (
                        <tr key={'cus' + entity.id_customer} 
                            onDoubleClick={e => addCustomer(e.currentTarget.getAttribute("value"))} 
                            value={entity.id_customer}>
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