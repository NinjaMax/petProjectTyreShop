import React, { useState } from 'react';
import '../../../css/AdminComponentCss/AdminModalFormCss/AdminModalCustmCreate.css';
import { useForm } from 'react-hook-form';
import { CustomerCreate } from './types/CustomerCreate.type';
import { createContract, createCustomer, updateCustomer } from '../../../restAPI/restAdminAPI';

const AdminModalCustomerCreate = ({active, setActive, dataCustomer, setAddCustomer}: CustomerCreate) => {
    const {register, handleSubmit, setValue, formState: {errors}} = useForm<any>(); 
    const [contractData, setContractData] = useState<any | null>();
    
    const onSubmit = async (data: any) => {
        try {
            if (!dataCustomer?.disableBtns) {
                const createCustomerNew = await createCustomer(data);
                if (createCustomerNew?.data) {
                    alert(`Покупця ${createCustomerNew?.data.name} ID ${createCustomerNew?.data.id_customer} створено.`);
                    if (setAddCustomer) {
                       setAddCustomer(createCustomerNew?.data); 
                    }
                    setActive(!active);
                }
            }
            if (dataCustomer?.disableBtns) {
                const customerUpdate = await updateCustomer({
                    ...data,
                    id_customer: dataCustomer?.id_customer,
                });
                if (customerUpdate) {
                    alert(`Данні покупця ${data.name} ID ${data.id_customer} оновлено.`)
                    setActive(!active);
                } else {
                    alert('Помилка при оновлені покупця.')
                }
            }
        } catch (error) {
            alert('Помилка при створені покупця.')
            console.log('ERROR_CREATE_CUSTOMER: ', error);
        }
    };

    const createNewContract = async () => {
        try {
            if (dataCustomer?.disableBtns && contractData) {
                const newContarct = await createContract({
                    ...contractData,
                    id_customer: dataCustomer?.id_customer
                });
                if (newContarct?.data) {
                    alert('Договір додано');
                }
            }
        } catch (error) {
            alert('Помилка при створені контракту.')
            console.log('ERROR_CREATE_CUSTOMER: ',error);
        }
    };

    return (
        <div>
            Створити покупця
            <div className="containerAdmCustmCreateForm">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='admFormDataCustmCreate'>
                    <div>
                        <label htmlFor="customerCreateName">Прізвище та ім'я </label>
                        <input type="text" 
                            id='customerCreateName'
                            className="admFormCustmCreateName" 
                            {...register('name', {required: 'Це необхідні дані'})}
                            name="customerCreateNameForm" 
                            maxLength={45}
                            defaultValue={dataCustomer?.name ?? ''}
                            onChange={(e) => setValue('name', e.target.value)}
                            placeholder="Прізвище ім'я покупця.."
                        />  
                    </div>
                    <div>
                        <label htmlFor="phoneCustomerCreate">телефон </label>
                        <input type="text" 
                            id='phoneCustomerCreate'
                            className="admFormCustmCreatePhone" 
                            {...register('phone', {required: 'Це необхідні дані'})}
                            name="phoneCustomerCreateForm" 
                            maxLength={45}
                            defaultValue={dataCustomer?.phone ?? ''}
                            onChange={(e) => setValue('phone', +e.target.value)}
                            placeholder="приклад 380775552211"
                        />  
                    </div>
                    <div>
                        <label htmlFor="emailCustomer">email </label>
                        <input type="text" 
                            id='emailCustomer'
                            className="admFormCustmCreateEmail" 
                            {...register('email')}
                            name="emailCustomerForm" 
                            maxLength={45}
                            defaultValue={dataCustomer?.email ?? ''}
                            onChange={(e) => setValue('email', e.target.value)}
                            placeholder="електронна пошта.."
                        />  
                    </div>
                    <div>
                        <label htmlFor="passwordCustomer">Пароль </label>
                        <input type="password" 
                            id='passwordCustomer'
                            className="admFormCustmCreateEmail" 
                            {...register('password')}
                            name="passwordCustomerForm" 
                            maxLength={45}
                            defaultValue={''}
                            onChange={(e) => setValue('password', e.target.value)}
                            placeholder="введіть пароль.."
                        />  
                    </div>
                    <div>
                        <label htmlFor="addressCustomerCreate">Адреса </label>
                        <input type="text" 
                            id='addressCustomerCreate'
                            {...register('address')}
                            className="admFormCustmCreateAddress" 
                            name="addressCustomerCreateForm" 
                            maxLength={45}
                            defaultValue={dataCustomer?.address ?? ''}
                            onChange={(e) => setValue('address', e.target.value)}
                            placeholder="Адреса покупця"
                        />  
                    </div>
                    <div>
                        <label htmlFor="pereviznikCustomer">Перевізник </label>
                            <select id='pereviznikCustomer' 
                                {...register('delivery')}
                                className="admFormCustmCreateDelivery" 
                                name="pereviznikCustomerForm"
                                defaultValue={dataCustomer?.delivery ?? ''}
                                onChange={(e) => setValue('delivery', e.target.value)}
                            >
                            <option>----</option>
                            <option value="Нова Пошта">Нова Пошта</option>
                            <option value="Укр Пошта">Укр Пошта</option>
                            <option value="Делівері">Делівері</option>
                        </select>    
                    </div>
                    <div>
                        <label htmlFor="refCityCustomer">Ref міста </label>
                        <input type="text" 
                            id='refCityCustomer'
                            {...register('delivery_city_ref')}
                            className="admFormCustmCreateAddress" 
                            name="refCityCustomerForm" 
                            maxLength={45}
                            defaultValue={dataCustomer?.delivery_city_ref ?? ''}
                            onChange={(e) => setValue('delivery_city_ref', e.target.value)}
                            placeholder="Ref міста"
                        />  
                    </div>
                    <div>
                        <label htmlFor="departCustomer">Відділення </label>
                        <input type="text" 
                            id='departCustomer'
                            {...register('delivery_dep')}
                            className="admFormCustmCreateAddress" 
                            name="departCustomerForm" 
                            maxLength={45}
                            defaultValue={dataCustomer?.delivery_dep ?? ''}
                            onChange={(e) => setValue('delivery_dep', e.target.value)}
                            placeholder="відділення"
                        />  
                    </div>
                    <div>
                        <label htmlFor="departCustomerRef">Ref відділення </label>
                        <input type="text" 
                            id='departCustomerRef'
                            {...register('delivery_dep_ref')}
                            className="admFormCustmCreateAddress" 
                            name="departCustomerFormRef" 
                            maxLength={45}
                            defaultValue={dataCustomer?.delivery_dep_ref ?? ''}
                            onChange={(e) => setValue('delivery_dep_ref', e.target.value)}
                            placeholder="Ref відділення"
                        />  
                    </div>
                    {dataCustomer?.disableBtns ?
                    <div onClick={(e) => e.preventDefault()}>
                        <label htmlFor="contractCustomerName">Назва договору </label>
                        <input type="text" 
                            id='contractCustomerName'
                            className="admFormCustmCreateAddress" 
                            name="contractCustomerFormName" 
                            maxLength={45}
                            //defaultValue={dataCustomer?.delivery_dep_ref ?? ''}
                            onChange={(e) => setContractData({...contractData!, name: e.target.value})}
                            placeholder="Назва договору"
                        />
                        <label htmlFor="contractCustmBalance">Баланс </label>
                        <input type="text" 
                            id='contractCustmBalance'
                            className="admFormCustmCreateAddress" 
                            name="contractCustomerFormBalance" 
                            maxLength={45}
                            onChange={(e) => setContractData({...contractData!, balance: +e.target.value})}
                            placeholder="баланс договору"
                        />
                        <label htmlFor="contractCustBonus">Бонуси </label>
                        <input type="text" 
                            id='contractCustBonus'
                            className="admFormCustmCreateAddress" 
                            name="contractCustomerFormBonus" 
                            maxLength={45}
                            onChange={(e) => setContractData({...contractData!, bonus: +e.target.value})}
                            placeholder="бонуси договору"
                        />    
                        <button className={dataCustomer?.disableBtns ? 
                                'admFormSupplierCreateBtnSaveActive' :
                                'admFormSupplierCreateBtnSave'
                            } 
                            disabled={!dataCustomer?.disableBtns ? true : false}
                            onClick={createNewContract}
                        >Додати договір </button> 
                    </div> : null
                    }  
                </div>
                <div className='admCustmCreateFormGrp'>
                    <div>
                    <button
                        className={dataCustomer?.disableBtns ? 
                            'admFormCustmCreateBtnOk':
                           'admFormCustmCreateBtnOkActive'
                        }
                        disabled={dataCustomer?.disableBtns}
                        onClick={handleSubmit(onSubmit)}
                    >Ok</button>
                    </div>
                    <div 
                        onClick={(e) => e.stopPropagation()}
                    >
                    <button className={dataCustomer?.disableBtns ? 
                            'admFormCustmCreateBtnSaveActive' :
                            'admFormCustmCreateBtnSave'
                        } 
                        disabled={!dataCustomer?.disableBtns ? true : false}
                        onClick={handleSubmit(onSubmit)}
                    >Зберегти </button> 
                    </div>
                    <button className='admFormCustmCreateBtnCancel'
                        onClick={() => setActive(!active)}
                    >Відмінити</button>
                    {
                        errors.id_customer || 
                        errors.address ||
                        errors.name ||
                        errors.phone
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
}

export default AdminModalCustomerCreate