import React from 'react';
import '../../../css/AdminComponentCss/AdminContentCss/AdminCashboxContent.css';
import ButtonSearch from '../../Buttons/ButtonSearch';

const AdminCashBoxContent = () => {
    return (
        <div>
        <div className="admUsersContent">
            <span>Каси:</span>
            <div className='admUsersHeader'>
                <button>Додати касу</button>
            </div>
            <input className='inputAdminUsers' type="text" id="myInput" placeholder="Введіть значення для пошуку..."/>
            <ButtonSearch/>
        </div>
        <div className='admUsersTable'>
        <table className='admListUsersTable'>
            <thead>
                <tr className='headerUsersTable'>
                    <th>Код</th>
                    <th>Каса</th>
                    <th>Організація</th>
                    <th>Баланс</th>
                    <th>Опції</th>
                </tr>
            </thead>    
            <tbody>
                <tr>
                    <td>26430200</td>
                    <td>Касса Гайворонский</td>
                    <td>ФОП Гайворонский Н</td>
                    <td>25500</td>
                    <td>
                        <button className='basketAdmGoods'>
                            <i className="fa fa-shopping-cart"></i>
                        </button>
                        <button className='editAdmGoods'>
                            <i className="fas fa-edit"></i>
                        </button>
                        <button className='closeAdmGoods'>
                            <i className="fa fa-remove"></i>
                        </button>                  
                    </td>
                </tr>          
                <tr>
                    <td>26430200</td>
                    <td>Касса Директор</td>
                    <td>ФОП Гайворонский Н</td>
                    <td>20500</td>
                    <td>
                        <button className='basketAdmGoods'>
                            <i className="fa fa-shopping-cart"></i>
                        </button>
                        <button className='editAdmGoods'>
                            <i className="fas fa-edit"></i>
                        </button>
                        <button className='closeAdmGoods'>
                            <i className="fa fa-remove"></i>
                        </button>                  
                    </td>
                </tr>          
                <tr>
                    <td>26430200</td>
                    <td>Касса НИКНЕЙМ</td>
                    <td>ТОВ НИКНЕЙМ</td>
                    <td>50500</td>
                    <td>
                        <button className='basketAdmGoods'>
                            <i className="fa fa-shopping-cart"></i>
                        </button>
                        <button className='editAdmGoods'>
                            <i className="fas fa-edit"></i>
                        </button>
                        <button className='closeAdmGoods'>
                            <i className="fa fa-remove"></i>
                        </button>                  
                    </td>
                </tr>          
            </tbody>
        </table>
        </div> 
    </div>
    );
};

export default AdminCashBoxContent;