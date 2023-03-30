import React, {useState} from 'react';
import '../../../css/AdminComponentCss/AdminContentCss/AdminCashboxContent.css';
import ButtonSearch from '../../buttons/ButtonSearch';
import ModalAdmin from '../../modal/ModalAdmin';
import AdminModalCashbox from '../adminModalForm/AdminModalCashbox';

const AdminCashBoxContent = () => {
    const [cashbox, setCashbox] = useState(false);
    
    const createCashbox = () => {
        setCashbox(!cashbox);
    };

    return (
        <div>
        <div className="admCashBoxContent">
            <span>Каси:</span>
            <div className='admUsersHeader'>
                <button className='admCashBoxAddBtn'
                    onClick={createCashbox}>Додати касу
                </button>
            </div>
            <input className='inputAdminCashBox' type="text" id="myInput" placeholder="Введіть значення для пошуку..."/>
            <ButtonSearch clickSearchBtn={() => console.log('seaachBTN')}/>
        </div>
        <div className='admCashBoxTable'>
        <table className='admListCashBoxTable'>
            <thead>
                <tr className='headerCashBoxTable'>
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
        {cashbox ?
            <ModalAdmin active={cashbox} setActive={setCashbox}>
                <AdminModalCashbox/>
            </ModalAdmin> : null
        }
    </div>
    );
};

export default AdminCashBoxContent;