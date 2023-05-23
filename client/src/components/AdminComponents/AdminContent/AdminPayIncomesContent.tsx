import React, {useState} from 'react';
import '../../../css/AdminComponentCss/AdminContentCss/AdminPayIncomesContent.css';
import ButtonSearch from '../../buttons/ButtonSearch';
import ModalAdmin from '../../modal/ModalAdmin';
import AdminModalPayIncome from '../adminModalForm/AdminModalPayIncome';
import { IPaymentItem } from './types/PaymentItem.type';
import { IAdminPayment } from './interfaces/AdminPayment.interface';

const AdminPayIncomesContent = ({payIncomes}: IAdminPayment) => {
    const [incomePay, setIncomePay] = useState(false);
    const [value, setValue] = useState('');
    const [isSearch, setIsSearch] = useState(true);

    const createIncPay = () => {
        setIncomePay(!incomePay);
    };

    const filteredPayIncomesData = payIncomes?.filter((payItem: any) => {
        return payItem.id_paynment === +value.toLowerCase() ||
        payItem.incomes.incomes.toLowerCase().includes(value.toLowerCase())  
    })

    const itemClickHandler = (e: any) => {
        const entity = e.target.textContent.split(':')
        setValue(entity[1]);
        //setValue(e.target.value);
        setIsSearch(!isSearch);
    }

    const inputHandler = () => {
        setIsSearch(true);
    }

    const inputCancelHandler = () => {
        if(isSearch){
           setIsSearch(false); 
        }
    }

    return (
        <div onClick={inputCancelHandler}>
        <div className="admIncomesContent">
            <span>Платежі вхідні:</span>
            <div className='admIncomesHeader'>
                <button className='admIncomesAddBtn'
                    onClick={createIncPay}>Додати платіж
                </button>
            </div>
            <input 
                className='inputAdminIncomes' 
                type="text" 
                id="myInput" 
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onClick={inputHandler} 
                placeholder="Введіть значення для пошуку..."
            />
            <ul className='inputPayExpenseContent'>
                        {value && isSearch ?
                            filteredPayIncomesData?.map(
                                (item: IPaymentItem, index: number) =>{
                            return (
                            <li key={'fullName' + index}
                                className='inputPayExpenseContentItem'
                                onClick={itemClickHandler}
                            >
                            {`${item.id_paynment}: ${item.incomes?.income}`}
                            </li>
                            ) 
                            })  
                        : null  
                        }
                    </ul>
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