import React from 'react';
import '../../../css/AdminComponentCss/AdminModalFormCss/AdminModalCustomers.css';

const AdminModalCustomers = () => {

    return (
        <div>
            <input type="text" className="admInpModalCustm" onKeyUp={''} placeholder="Search for names.."/>
            <table className="admModalCustmTable">
                <thead>
                    <tr className="admModalHeaderCustm">
                        <th>id</th>
                        <th>Ім'я / Назва</th>
                        <th>Контракт</th>
                    </tr>   
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>Тимошенко Миколай Івванович</td>
                        <td>Тимошенко Миколай Івванович Основний договір</td>
                    </tr>
                    <tr>
                        <td>1</td>
                        <td>Тимошенко Миколай Івванович</td>
                        <td>Тимошенко Миколай Івванович Основний договір</td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>Тимошенко Миколай Івванович</td>
                        <td>Тимошенко Миколай Івванович Основний договір</td>
                    </tr>
                    <tr>
                        <td>3</td>
                        <td>Тимошенко Миколай Івванович</td>
                        <td>Тимошенко Миколай Івванович Основний договір</td>
                    </tr>
                </tbody>     
            </table>
        </div>
    );
};

export default AdminModalCustomers;