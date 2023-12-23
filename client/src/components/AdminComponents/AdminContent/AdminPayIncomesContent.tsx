import React, {useEffect, useState} from 'react';
import '../../../css/AdminComponentCss/AdminContentCss/AdminPayIncomesContent.css';
import ButtonSearch from '../../buttons/ButtonSearch';
import ModalAdmin from '../../modal/ModalAdmin';
import AdminModalPayIncome from '../adminModalForm/AdminModalPayIncome';
import { IPaymentItem } from './types/PaymentItem.type';
import { IAdminPayment } from './interfaces/AdminPayment.interface';
import { FixedSizeList  as List } from 'react-window';

const AdminPayIncomesContent = ({payIncomes, payTypes, payViews}: IAdminPayment) => {
    const [incomePay, setIncomePay] = useState(false);
    const [payIncomeData, setPayIncomeData] = useState<{} | null>(null);
    const [filteredPay, setFilteredPay] = useState< any[] | null | undefined>(payIncomes);
    const [value, setValue] = useState('');
    const [isSearch, setIsSearch] = useState(true);

    useEffect(() => {
        if(value.length !== 0) {
            const filteredPayIncomesData = payIncomes?.filter((payItem: any) => {
                return payItem.id_paynment === +value.toLowerCase() ||
                payItem.incomes.incomes.toLowerCase().includes(value.toLowerCase())  
            })
            setFilteredPay(filteredPayIncomesData);
        } else {
            setFilteredPay(payIncomes);
        }
    },[payIncomes, value]);

    //createPayment,
    //updatePayment,
    const showPayIncomesData = async (e: any) => {
        let customersInfo = payIncomes?.find(
            (item:{id_paynment: number}) => 
                item.id_paynment === +e.currentTarget.value
            );
        if(customersInfo) {
            e.currentTarget.name === 'editCustomer' ? customersInfo.disableBtns = true : customersInfo.disableBtns = false;
            if (e.currentTarget.name === 'editCustomer') {
                setPayIncomeData(customersInfo);
                setCreateCustm(!createCustm);
            }
            if (e.currentTarget.name === 'customerShow') {
                setPayIncomeData(customersInfo);
                setActiveCustomer(!activeCustomer);
            }
        } else{
            setPayIncomeData(null);
        }
    };

    const createIncPay = () => {
        setIncomePay(!incomePay);
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
                a.incomes?.income.toLowerCase().localeCompare(
                    b.incomes?.income.toLowerCase()
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
    };

    const payIncomeTable = ({index, style}: any) => (
        <div className='admOrderGridItem' style={style}
            //onClick={showComment}
            //onDoubleClick={showOrderData}
            data-name='orderShow'
            data-value={filteredPay![index].id_paynment}>
            <div>{filteredPay![index].id_paynment}</div>
            <div>{new Date(filteredPay![index].createdAt).toLocaleString()}</div>
            
            <div>{filteredPay![index].price}</div>
            <div>{filteredPay![index]?.customer?.name}</div>
            <div>{filteredPay![index]?.paytype.paytype}</div>
            <div>{filteredPay![index]?.cashbox.cashbox}</div>
            <div>{filteredPay![index]?.status_delivery}</div>
            <div>{filteredPay![index]?.pay_view}</div>
            <div>{filteredPay![index]?.status_pay}</div>
            <div>{filteredPay![index]?.user?.name}</div>
            <div>{filteredPay![index]?.notes}</div>
            <div>
                <button className='basketAdmGoods'
                    value={filteredPay![index].id_order}
                    //</div>onClick={activeFormOrderSup}
                    >
                    <i className="fas fa-truck-loading"
                        title='Створити Замовлення Постачальника'
                    ></i>
                </button>
                <button className='editAdmGoods'
                    name='editOrder'
                    value={filteredPay![index].id_order}
                    //onClick={createSaleOrder}
                >
                    <i className="fas fa-clipboard-check"
                        title='Створити продажу'
                    ></i>
                </button>
                <button className='editAdmGoods'
                    name='editOrder'
                    value={filteredPay![index].id_order}
                    //onClick={showOrderData}
                    >
                    <i className="fas fa-edit"
                        title='Редагувати'
                    ></i>
                </button>

                <button className='closeAdmGoods'
                    value={filteredPay![index].id_order}>
                    <i className="fa fa-remove"
                        title='Видалити'
                    ></i>
                </button>                  
            </div>
        </div>    
    );

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
                            filteredPay?.map(
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
                    <th onClick={sortPayExpense}>Код</th>
                    <th onClick={sortPayExpense}>Дата</th>
                    <th>Тип платежа</th>
                    <th onClick={sortPayExpense}>Вид Платежа</th>
                    <th onClick={sortPayExpense}>Каса</th>
                    <th onClick={sortPayExpense}>Сума</th>
                    <th onClick={sortPayExpense}>Користувач</th>
                    <th>Коментар</th>
                    <th>Опції</th>
                </tr>
            </thead>    
            <tbody>
            {filteredPay ? filteredPay.map((items: IPaymentItem) => (
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