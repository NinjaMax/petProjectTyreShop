import React, {useEffect, useState} from 'react';
import '../../../css/AdminComponentCss/AdminContentCss/AdminPayExpenseContent.css';
import ButtonSearch from '../../buttons/ButtonSearch';
import ModalAdmin from '../../modal/ModalAdmin';
import AdminModalPayExpense from '../adminModalForm/AdminModalPayExpense';
import { IPaymentItem } from './types/PaymentItem.type';
import { IAdminPayment } from './interfaces/AdminPayment.interface';

const AdminPayExpensesContent = ({payExpenses, payTypes, payViews}: IAdminPayment) => {
    const [outgoingPay, setOutgoingPay] = useState(false);
    const [filteredPay, setFilteredPay] = useState< any[] | null | undefined>(payExpenses);
    const [value, setValue] = useState('');
    const [isSearch, setIsSearch] = useState(true);
    
    useEffect(() => {
        if(value.length !== 0) {
            const filteredPayExpensesData = payExpenses?.filter((payItem: any) => {
                return payItem.id_paynment === +value.toLowerCase() ||
                payItem.expenses.expenses.toLowerCase().includes(value.toLowerCase())  
            })
            setFilteredPay(filteredPayExpensesData);
        } else {
            setFilteredPay(payExpenses);
        }
    },[payExpenses, value]);

    const outgoingCreate = () => {
        setOutgoingPay(!outgoingPay);
    };  

    

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

    const sortPayExpense = (e: any) => {
        if (e.target.textContent === 'Код') {
            const sortByCode: any = 
            filteredPay?.sort(
            (a:any, b:any) => (+a.id_paynment) - (+b.id_paynment));
            setFilteredPay(sortByCode);
        }
        if (e.target.textContent === 'Дата') {
            const sortByDate: any = 
            filteredPay?.sort(
            (a:any, b:any) => 
            (+(new Date(a.createdAt).toLocaleString())) - (+(new Date(b.createdAt).toLocaleString())));
            setFilteredPay(sortByDate);
        }
        if (e.target.textContent === 'Дата оновлення') {
            const sortByDateUpdate: any = 
            filteredPay?.sort(
            (a:any, b:any) => 
            (+(new Date(a.updatedAt).toLocaleString())) - (+(new Date(b.updatedAt).toLocaleString())));
            setFilteredPay(sortByDateUpdate);
        }
        if (e.target.textContent === 'Статус') { 
            const sortByStatus: any = 
            filteredPay?.sort(
                (a:any, b:any) => 
                a.status.toLowerCase().localeCompare(
                    b.status.toLowerCase()
                )
            )
            setFilteredPay(sortByStatus);
        }
        if (e.target.textContent === 'Вид Платежів') { 
            const sortByOrderType: any = 
            filteredPay?.sort(
                (a:any, b:any) => 
                a.expenses?.expense.toLowerCase().localeCompare(
                    b.expenses?.expense.toLowerCase()
                )
            )
            setFilteredPay(sortByOrderType);
        }
        if (e.target.textContent === 'Каса') { 
            const sortByDelivery: any = 
            filteredPay?.sort(
                (a:any, b:any) => 
                a.cashbox.cashbox.toLowerCase().localeCompare(
                    b.cashbox.cashbox.toLowerCase()
                )
            )
            setFilteredPay(sortByDelivery);
        }
        if (e.target.textContent === 'Сума') { 
            const sortByDeliveryStatus: any = 
            filteredPay?.sort(
                (a:any, b:any) => 
                +a.price - +b.price
            )
            setFilteredPay(sortByDeliveryStatus);
        }
        if (e.target.textContent === 'Тип платежа') { 
            const sortByPayType: any = 
            filteredPay?.sort(
                (a:any, b:any) => 
                a.paytype?.paytype.toLowerCase().localeCompare(
                    b.paytype?.paytype.toLowerCase()
                )
            )
            setFilteredPay(sortByPayType);
        }
        if (e.target.textContent === 'Користувач') {
            const sortByUser: any = 
            filteredPay?.sort(
                (a:any, b:any) => 
                    a.user.name.toLowerCase().localeCompare(
                        b.user.name.toLowerCase()
                    )
            )
            setFilteredPay(sortByUser);
        }
    }


    return (
        <div onClick={inputCancelHandler}>
        <div className="admExpenseContent">
            <span>Платежі вихідні:</span>
            <div className='admExpenseHeader'>
                <button className='admExpenseAddBtn'
                    onClick={outgoingCreate}>Додати платіж</button>
            </div>
            <input 
                className='inputAdminExpense' 
                type="text" 
                id="myInput" 
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onClick={inputHandler} 
                placeholder="Введіть значення для пошуку..."/>
                <ul className='inputPayExpenseContent'>
                        {value && isSearch ?
                            filteredPay?.map(
                                (item: IPaymentItem, index: number) =>{
                            return (
                            <li key={'fullName' + index}
                                className='inputPayExpenseContentItem'
                                onClick={itemClickHandler}
                            >
                            {`${item.id_paynment}: ${item.expenses?.expense}`}
                            </li>
                            ) 
                            })  
                        : null  
                        }
                    </ul>
            <ButtonSearch clickSearchBtn={()=> console.log('searchBtn')}/>
        </div>
        <div className='admExpenseTable'>
        <table className='admListExpenseTable'>
            <thead>
                <tr className='headerExpenseTable'>
                    <th>Тип</th>
                    <th onClick={sortPayExpense}>Код</th>
                    <th onClick={sortPayExpense}>Дата</th>
                    <th onClick={sortPayExpense}>Дата оновлення</th>
                    <th onClick={sortPayExpense}>Вид Платежів</th>
                    <th onClick={sortPayExpense}>Каса</th>
                    <th onClick={sortPayExpense}>Сума</th>
                    <th onClick={sortPayExpense}>Статус</th>
                    <th onClick={sortPayExpense}>Тип платежа</th>
                    <th onClick={sortPayExpense}>Користувач</th>
                    <th>Коментар</th>
                    <th>Опції</th>
                </tr>
            </thead>    
            <tbody>
            {filteredPay ? filteredPay.map(
                (items: IPaymentItem) => (
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