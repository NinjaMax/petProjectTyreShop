import React, {useState} from 'react';
import '../../../css/AdminComponentCss/AdminContentCss/AdminPayExpenseContent.css';
import ButtonSearch from '../../buttons/ButtonSearch';
import ModalAdmin from '../../modal/ModalAdmin';
import AdminModalPayExpense from '../adminModalForm/AdminModalPayExpense';
import { IPaymentItem } from './types/PaymentItem.type';
import { IAdminPayment } from './interfaces/AdminPayment.interface';

const AdminPayExpensesContent = ({payExpenses}: IAdminPayment) => {
    const [outgoingPay, setOutgoingPay] = useState(false);
    
    const outgoingCreate = () => {
        setOutgoingPay(!outgoingPay);
    };  

    return (
        <div>
        <div className="admExpenseContent">
            <span>Платежі вихідні:</span>
            <div className='admExpenseHeader'>
                <button className='admExpenseAddBtn'
                    onClick={outgoingCreate}>Додати платіж</button>
            </div>
            <input className='inputAdminExpense' type="text" id="myInput" placeholder="Введіть значення для пошуку..."/>
            <ButtonSearch clickSearchBtn={()=> console.log('searchBtn')}/>
        </div>
        <div className='admExpenseTable'>
        <table className='admListExpenseTable'>
            <thead>
                <tr className='headerExpenseTable'>
                    <th>Тип</th>
                    <th>Код</th>
                    <th>Дата</th>
                    <th>Дата оновлення</th>
                    <th>Вид Платежів</th>
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
            {payExpenses ? payExpenses.map((items: IPaymentItem) => (
                    <tr key={'or' + items.id_paynment}
                        //onClick={e => showComment(e)}
                        //onDoubleClick={e => showOrderData(e)}
                        data-value={items.id_paynment}>
                        <td>{items.id_paynment}</td>
                        <td>{new Date(items.createdAt).toLocaleString()}</td>
                        <td>{new Date(items.updatedAt).toLocaleString()}</td>
                        <td>{items.expenses?.expense}</td>
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
        {outgoingPay ?
            <ModalAdmin active={outgoingPay} setActive={setOutgoingPay}>
                <AdminModalPayExpense/>
            </ModalAdmin> : null
        }
    </div>
    );
};

export default AdminPayExpensesContent;