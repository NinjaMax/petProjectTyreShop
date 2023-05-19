import React, {useState} from 'react';
import '../../../css/AdminComponentCss/AdminContentCss/AdminCashboxContent.css';
import ButtonSearch from '../../buttons/ButtonSearch';
import ModalAdmin from '../../modal/ModalAdmin';
import AdminModalCashbox from '../adminModalForm/AdminModalCashbox';
import { ICashboxItem } from './types/CashboxItem.type';

interface ICashbox {
    cashboxData?: [] | null;  
}

const AdminCashBoxContent = ({cashboxData}: ICashbox) => {
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
                    <th>Вид Касси</th>
                    <th>Опції</th>
                </tr>
            </thead>    
            <tbody>
            {cashboxData ? cashboxData.map((items: ICashboxItem) => (
                    <tr key={'or' + items.id_cashbox}
                        //onClick={e => showComment(e)}
                        //onDoubleClick={e => showOrderData(e)}
                        data-value={items.id_cashbox}>
                        <td>{items.id_cashbox}</td>
                        <td>{items.cashbox}</td>
                        <td>{items.organisation}</td>
                        <td>{items.cashboxType}</td>
                        <td>{items.funds}</td>
                        <td>
                        <button className='editAdmGoods'>
                            <i className="fas fa-edit"></i>
                        </button>
                        <button className='closeAdmGoods'>
                            <i className="fa fa-remove"></i>
                        </button>
                        </td>
                        </tr>
                    ))
                    : <tr><td>......Очікуемо ордери......</td></tr>
                    }            
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