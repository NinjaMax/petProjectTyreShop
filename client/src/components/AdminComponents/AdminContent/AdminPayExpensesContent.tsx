import React, {useEffect, useState} from 'react';
import '../../../css/AdminComponentCss/AdminContentCss/AdminPayExpenseContent.css';
import ButtonSearch from '../../buttons/ButtonSearch';
import ModalAdmin from '../../modal/ModalAdmin';
import AdminModalPay from '../adminModalForm/AdminModalPay';
import { IPaymentItem } from './types/PaymentItem.type';
import { IAdminPayment } from './interfaces/AdminPayment.interface';
import SpinnerCarRot from '../../spinners/SpinnerCarRot';
import { FixedSizeList  as List } from 'react-window';

const AdminPayExpensesContent = ({payExpenses, payTypes, payViews, cashBoxes}: IAdminPayment) => {
    const [outgoingPay, setOutgoingPay] = useState(false);
    const [createPayIncome, setCreatePayIncome] = useState<boolean>(false);
    const [payExpenseData, setExpensePayData] = useState<{} | null>(null);
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

    const showPayExpensesData = async (e: any) => {
        let payExpensesInfo: any = payExpenses?.find(
            (item:{id_paynment: number}) => 
                item.id_paynment === +e.currentTarget.value
            );
        if(payExpensesInfo) {
            e.currentTarget.name === 'editPayExpenses' ? payExpensesInfo.disableBtns = true : payExpensesInfo.disableBtns = false;
            if (e.currentTarget.name === 'editPayExpenses') {
                setExpensePayData(payExpensesInfo);
                setCreatePayIncome(!createPayIncome);
            }
            if (e.currentTarget.name === 'payExpensesShow') {
                setExpensePayData(payExpensesInfo);
                setOutgoingPay(!outgoingPay);
            }
        } else{
            setExpensePayData(null);
        }
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

    const payExpensesTable = ({index, style}: any) => (
        <div className='admPayIncomesGridItem' style={style}
            //onClick={showComment}
            //onDoubleClick={showOrderData}
            data-name='payIncomesShow'
            data-value={filteredPay![index].id_paynment}>
            <div>{filteredPay![index].id_paynment}</div>
            <div>{new Date(filteredPay![index].createdAt).toLocaleString()}</div>
            <div>{filteredPay![index]?.paytype?.paytype}</div>
            <div>{filteredPay![index]?.payview?.payviews}</div>
            <div>{filteredPay![index]?.cashbox?.cashbox}</div>
            <div>{filteredPay![index].price}</div>
            <div>{filteredPay![index].id_order}</div>
            <div>{filteredPay![index].id_order_sup}</div>
            <div>{filteredPay![index]?.contract?.id_contract}</div>
            <div>{filteredPay![index]?.contract?.name}</div>
            <div>{filteredPay![index]?.user?.name}</div>
            <div>{filteredPay![index]?.notes}</div>
            <div>
                <button className='editAdmGoods'
                    name='payIncomesShow'
                    value={filteredPay![index].id_paynment}
                    onClick={showPayExpensesData}
                >
                    <i className="fas fa-list"
                        title="пов'язані документи"
                    ></i>
                </button>
                <button className='editAdmGoods'
                    name='editPayIncomes'
                    value={filteredPay![index].id_paynment}
                    onClick={showPayExpensesData}
                    >
                    <i className="fas fa-edit"
                        title='Редагувати'
                    ></i>
                </button>

                <button className='closeAdmGoods'
                    value={filteredPay![index].id_paynment}>
                    <i className="fa fa-remove"
                        title='Видалити'
                    ></i>
                </button>                  
            </div>
        </div>    
    );

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
        {filteredPay ?
        <div className='admExpenseTable'>
        <table className='admListExpenseTable'>
            <thead>
                <tr className='headerExpenseTable'>
                <th className='headerPayIncomesHeadTableCode'
                        onClick={sortPayExpense}>Код</th>
                    <th className='headerPayIncomesHeadTableDate'
                        onClick={sortPayExpense}>Дата</th>
                    <th className='headerPayIncomesHeadTableType'
                        >Тип платежа</th>
                    <th className='headerPayIncomesHeadTableView'
                        onClick={sortPayExpense}>Вид Платежа</th>
                    <th className='headerPayIncomesHeadTableCashbox'
                        onClick={sortPayExpense}>Каса</th>
                    <th className='headerPayIncomesHeadTableSum'
                        onClick={sortPayExpense}>Сума</th>
                    <th className='headerPAyIncomesHeadTableIdOrder'
                        onClick={sortPayExpense}>id Зам пок</th>
                    <th className='headerPayIncomesHeadTableIdOrderSup'
                        onClick={sortPayExpense}>id Зам пост</th>
                    <th className='headerPayIncomesHeadTableIdContract'
                        onClick={sortPayExpense}>id контр</th>
                    <th className='headerPayIncomesHeadTableContract'
                        onClick={sortPayExpense}>договір</th>
                    <th className='headerPayIncomesHeadTableUser'
                        onClick={sortPayExpense}>Користувач</th>
                    <th className='headerPayIncomesHeadTableNotes'
                        >Коментар</th>
                    <th className='headerPayIncomesHeadTableOption'
                        >Опції</th>
                </tr>
            </thead>    
            <tbody>
            </tbody>
        </table>
        <List
            className="admPayIncomesTableColmId"
            itemCount={filteredPay!.length}
            itemSize={90}
            height={330}
            width={1315}
        >
            {payExpensesTable}
        </List>   
        </div> :
            <SpinnerCarRot/>
        }  
        {outgoingPay ?
            <ModalAdmin active={outgoingPay} setActive={setOutgoingPay}>
                <AdminModalPay
                    active={outgoingPay}
                    setActive={setOutgoingPay}
                    payViews={payViews} 
                    payTypes={[payTypes![1].id_paytype, payTypes![1].paytype]} 
                    cashBoxes={cashBoxes}
                    paynmentData={payExpenseData}
                    title={"Створити вихідний платіж"}
                />
            </ModalAdmin> : null
        }
    </div>
    );
};

export default AdminPayExpensesContent;