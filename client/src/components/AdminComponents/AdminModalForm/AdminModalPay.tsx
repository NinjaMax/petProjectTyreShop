import React, { Fragment, useContext, useEffect } from 'react';
import '../../../css/AdminComponentCss/AdminModalFormCss/AdminModalPay.css';
import { PayModal } from './types/PayModal.types';
import { useForm } from 'react-hook-form';
import { addCommentsToOrder, createPayment, updateOrder, updateOrderSup, updatePayment } from '../../../restAPI/restAdminAPI';
import { Context } from '../../../context/Context';

const AdminModalPay = ({
    payViews, 
    payTypes, 
    paynmentData, 
    cashBoxes, 
    title, 
    active, 
    setActive
}: PayModal) => {
    const {user} = useContext<any | null>(Context);
    const {register, handleSubmit, setValue, formState: {errors}} = useForm<any>(); 

    useEffect(() => {
        if (user) {
            register('id_user', {required: 'Це необхідні дані'});
            setValue('id_user', user._user?.sub.id_user);
        }
    },[register, setValue, user]);

    const onSubmit = async (data: any) => {
        try {
            console.log('DATA_ORDER: ', data);
            console.log('DATA_ID_ORDER: ', data.id_order === '' ? 0 : data.id_order);
            if (!paynmentData?.disableBtns) {
                const createPaynmentNew = await createPayment({
                    ...data,
                    id_order: data.id_order === '' ? null : +data.id_order,
                    id_order_sup: data.id_order_sup === '' ? null : +data.id_order_sup,
                    id_contract: data.id_contract === '' ? null : +data.id_contract,
                });
                if (createPaynmentNew?.data) {
                    if (data.id_order) {
                        await updateOrder({status_pay: 'Оплачено'}, data.id_order);
                        await addCommentsToOrder({
                            id_user: user._user?.sub?.id_user,
                            comments: `Оплачено, Замовлення №${data.id_order} сума${data.price}.`,
                            id_order: data.id_order,
                            id_order_sup:null, 
                        });
                    }
                    if (data.id_order_sup) {
                        await updateOrderSup({status_pay: 'Оплачено'}, data.id_order_sup);
                        await addCommentsToOrder({
                            id_user: user._user?.sub?.id_user,
                            comments: `Оплачено, Замовлення пост №${data.id_order_sup} сума${data.price}.`,
                            id_order: null,
                            id_order_sup: data.id_order_sup, 
                        });
                    }
                    alert(`Платіж ID ${createPaynmentNew?.data.id_paynment} створено.`);
                    setActive(!active);
                } else {
                    alert('Помилка, не вірні дані')
                }
            }
            if (paynmentData?.disableBtns) {
                const paynmentUpdate = await updatePayment({
                    ...data,
                    id_order: data.id_order === '' ? null : +data.id_order,
                    id_order_sup: data.id_order_sup === '' ? null : +data.id_order_sup,
                    id_contract: data.id_contract === '' ? null : +data.id_contract,
                    id_paynment: paynmentData?.id_paynment,
                });
                if (paynmentUpdate) {
                    alert(`Данні платежу ID ${paynmentData.id_paynment} оновлено.`)
                    setActive(!active);
                } else {
                    alert('Помилка при оновлені платежу.')
                }
            }
        } catch (error) {
            alert('Помилка при створені платежу.')
            console.log('ERROR_CREATE_CUSTOMER: ', error);
        }
    };

    //console.log('CASBOX: ', cashBoxes);
    console.log('PAY_TYPE: ', payTypes);
    console.log('PAY_VIEWS: ', payViews);
    console.log('PAYNMENT_DATA: ', paynmentData);
    return (
        <div>
            {title}
            <div className="containerAdmPayIncomeForm">
            <form action="">
                <div className='admFormDataPayIncome'>
                    {paynmentData ?
                    <div>
                        <label htmlFor="idPaynment">id </label>
                        <input type="text" 
                            id='idPaynment'
                            className="admFormPayIncomeId" 
                            name="firstname" 
                            maxLength={45}
                            readOnly={true}
                            defaultValue={paynmentData?.id_paynment ?? ''}
                            placeholder="id платежу.."
                        />  
                    </div>
                        : null
                    }
                    <div>
                        <label htmlFor="payCashbox">Каса </label>
                            <select 
                                id="payCashbox" 
                                className="admFormPayIncomeCashbox" 
                                {...register('id_cashbox', {required: 'Це необхідні дані', valueAsNumber: true,})}
                                name="payCashboxForm"
                                defaultValue={paynmentData?.id_cashbox}
                                onChange={(e) => setValue('id_cashbox', e.target.value)}
                            >
                            <option value=''>Виберіть касу</option>
                            {cashBoxes ? cashBoxes.map((cashBoxItem) =>
                                <Fragment key={cashBoxItem.id_cashbox}>
                                    <option value={cashBoxItem.id_cashbox}>{cashBoxItem.cashbox}</option>
                                </Fragment>
                            )
                               : null
                              
                            }
                        </select>  
                    </div>
                    <div>
                        <label htmlFor="payTypes">Тип платежу </label>
                            <select id="payTypes" 
                                className="admFormPayIncomeType" 
                                {...register('id_paytype', {required: 'Це необхідні дані', valueAsNumber: true})}
                                name="payTypesForm"
                                defaultValue={payTypes![1]}
                                onChange={(e) => setValue('id_paytype', e.target.value)}
                            > 
                            <option value={payTypes![0]}>{payTypes![1]}</option>
                        </select>  
                    </div>
                    <div>
                        <label htmlFor="payViews">Вид платежу </label>
                            <select id="payViews" 
                                className="admFormPayIncomeViews" 
                                {...register('id_payviews', {required: 'Це необхідні дані', valueAsNumber: true,})}
                                name="payViewsFrom"
                                defaultValue={paynmentData?.id_payviews}
                                onChange={(e) => setValue('id_payviews', e.target.value)}
                            >
                            <option value=''>Виберіть вид</option>
                            {payViews ? payViews.map((payItem) =>
                                <Fragment key={payItem.id_payviews}>
                                    <option value={payItem.id_payviews}>{payItem.payviews}</option>
                                </Fragment>
                            )
                               : null
                            }
                        </select>  
                    </div>
                    <div>
                        <label htmlFor="payOrderId">Заказ покупця </label>
                        <input type="text" 
                            id="payOrderId"
                            className="admFormPayIncomeIds" 
                            {...register('id_order')}
                            name="payOrderIdForm" 
                            defaultValue={paynmentData?.id_order}
                            onChange={(e) => setValue('id_order', +e.target.value)}
                            maxLength={45}
                            placeholder="id заказу покупця"
                        />
                        {/* <div onClick={(e)=>e.preventDefault()}>
                            <button  className='admPayIncomeSearchCustm'>
                                <i className="fas fa-search"></i>    
                            </button> 
                        </div>  */}
                    </div>
                    <div>
                        <label htmlFor="payOrderSupId">Заказ постачальника </label>
                        <input type="text" 
                            id="payOrderSupId"
                            className="admFormPayIncomeIds" 
                            {...register('id_order_sup')}
                            name="payOrderSupIdForm" 
                            defaultValue={paynmentData?.id_order_sup}
                            onChange={(e) => setValue('id_order_sup', +e.target.value)}
                            maxLength={45}
                            placeholder="id заказу постачальника"
                        />
                        {/* <div onClick={(e)=>e.preventDefault()}>
                            <button  className='admPayIncomeSearchCustm'>
                                <i className="fas fa-search"></i>    
                            </button> 
                        </div>  */}
                    </div>
                    <div>
                        <label htmlFor="payIdcontract">Контрагент (id контракту) </label>
                        <input type="text" 
                            id="payIdcontract"
                            className="admFormPayIncomeIds" 
                            {...register('id_contract')}
                            name="payIdcontractForm" 
                            defaultValue={paynmentData?.id_contract}
                            onChange={(e) => setValue('id_contract', +e.target.value)}
                            maxLength={45}
                            placeholder="id контракту"
                        />
                        {/* <div onClick={(e)=>e.preventDefault()}>
                            <button  className='admPayIncomeSearchCustm'>
                                <i className="fas fa-search"></i>    
                            </button> 
                        </div>  */}
                    </div>
                    <div>
                        <label htmlFor="paySum">Сума </label>
                        <input type="text" 
                            id="paySum"
                            className="admFormPayIncomeSum" 
                            {...register('price', {required: 'Це необхідні дані', valueAsNumber: true})}
                            name="paySumForm" 
                            defaultValue={paynmentData?.price}
                            onChange={(e) => setValue('price', e.target.value)}
                            maxLength={45}
                            placeholder="сума платежа"
                        />  
                    </div>
                </div>
                <div className='admPayIncomeFormGrp'>
                <label htmlFor="notesPay">Нотатки</label>
                <textarea id='notesPay' className="admFormPayIncomeNotes" 
                    defaultValue={paynmentData?.notes}
                    {...register('notes')}
                    name="subjectPay" 
                    onChange={(e) => setValue('notes', e.target.value)}
                    placeholder="Пишить нотатку..">
                </textarea>
                </div>
                <div className='admPayIncomeFormGrp'>
                    <button className={paynmentData ? 
                        'admFormPayIncomeBtnOk' :
                        'admFormPayIncomeBtnAddActive'
                        }
                        disabled={paynmentData}
                        onClick={handleSubmit(onSubmit)}
                    >Ok</button>
                    <button className={!paynmentData ?
                            'admFormPayIncomeBtnSave' :
                            'admFormPayIncomeBtnSaveActive'
                        } 
                        disabled={!paynmentData?.disableBtns ? true : false}
                        onClick={handleSubmit(onSubmit)}
                    >
                    Зберегти
                    </button>
                    <button className='admFormPayIncomeBtn'
                        onClick={() => setActive(!active)}
                    >Відмінити</button> 
                    {
                        errors.id_cashbox || 
                        errors.id_paytype ||
                        errors.id_payviews ||
                        errors.price
                    ? 
                    <span style={{'color': 'red'}}>
                        Не вірні данні. Перевірте данні.
                    </span>
                    : null
                    }
                </div>
            </form>
            </div>
        </div>
    );
};

export default AdminModalPay;