import React, {useState} from 'react';
import '../../../css/AdminComponentCss/AdminContentCss/AdminPayIncomesContent.css';
import ButtonSearch from '../../buttons/ButtonSearch';
import ModalAdmin from '../../modal/ModalAdmin';
import AdminModalPayIncome from '../adminModalForm/AdminModalPayIncome';
import { IPaymentItem } from './types/PaymentItem.type';
import { IAdminPayment } from './interfaces/AdminPayment.interface';

const AdminPayIncomesContent = ({payIncomes}: IAdminPayment) => {
    const [incomePay, setIncomePay] = useState(false);

    const createIncPay = () => {
        setIncomePay(!incomePay);
    };

    return (
        <div>
        <div className="admIncomesContent">
            <span>Платежі вхідні:</span>
            <div className='admIncomesHeader'>
                <button className='admIncomesAddBtn'
                    onClick={createIncPay}>Додати платіж
                </button>
            </div>
            <input className='inputAdminIncomes' type="text" id="myInput" placeholder="Введіть значення для пошуку..."/>
            <ButtonSearch clickSearchBtn={()=> console.log('searchBtn')}/>
        </div>
        <div className='admIncomesTable'>
        <table className='admListIncomesTable'>
            <thead>
                <tr className='headerIncomesTable'>
                    <th>Тип</th>
                    <th>Код</th>
                    <th>Дата</th>
                    <th>Дата оновлення</th>
                    <th>Вид Платежа</th>
                    <th>Каса</th>
                    <th>Сума</th>
                    <th>Статус</th>
                    <th>Тип платежа</th>
                    <th>Користувач</th>
                    <th>Коментар</th>
                    <th>Опції</th>
                </tr>
            </thead>    
            <tbody>
            {payIncomes ? payIncomes.map((items: IPaymentItem) => (
                    <tr key={'or' + items.id_paynment}
                        //onClick={e => showComment(e)}
                        //onDoubleClick={e => showOrderData(e)}
                        data-value={items.id_paynment}>
                        <td>{items.id_paynment}</td>
                        <td>{new Date(items.createdAt).toLocaleString()}</td>
                        <td>{new Date(items.updatedAt).toLocaleString()}</td>
                        <td>{items.incomes?.income}</td>
                        <td>{items.cashbox.cashbox}</td>
                        <td>{items.price}</td>
                        <td>{items.status}</td>
                        <td>{items.paytype?.paytype}</td>
                        <td>{items.user.name}</td>
                        <td>{items.notes}</td>
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
        {incomePay ?
            <ModalAdmin active={incomePay} setActive={setIncomePay}>
                <AdminModalPayIncome/>
            </ModalAdmin> : null
        } 
    </div>
    );
};

export default AdminPayIncomesContent;