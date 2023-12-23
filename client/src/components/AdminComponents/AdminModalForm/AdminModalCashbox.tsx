import React from 'react';
import '../../../css/AdminComponentCss/AdminModalFormCss/AdminModalCashbox.css';
import { useForm } from 'react-hook-form';
import { CashboxCreate } from './types/CashboxCreate.type';
import { createCashbox, updateCashbox } from '../../../restAPI/restAdminAPI';

const AdminModalCashbox = ({active, setActive, dataCashbox}: CashboxCreate) => {
    const {register, handleSubmit, setValue, formState: {errors}} = useForm<any>(); 

    const onSubmit = async (data: any) => {
        try {
            console.log(data);
            if (!dataCashbox?.disableBtns) {
                const createCashboxNew = await createCashbox(data);
                if (createCashboxNew?.data) {
                    alert(`Покупця ${createCashboxNew?.data.cashbox} ID ${createCashboxNew?.data.id_cashbox} створено.`);
                    setActive(!active);
                }
            }
            if (dataCashbox?.disableBtns) {
                const cashboxUpdate = await updateCashbox({
                    ...data,
                    id_cashbox: dataCashbox?.id_cashbox,
                });
                if (cashboxUpdate) {
                    alert(`Данні покупця ${data.cashbox} ID ${dataCashbox?.id_cashbox} оновлено.`)
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

    return (
        <div>
        Створити касу
        <div className="containerAdmCashBoxForm">
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className='admFormDataCashBox'>
                <div >
                    <div className='admFormCashBoxCustm'>
                        <label htmlFor="cashboxName">Назва каси </label>
                        <input type="text" 
                            id='cashboxName'
                            className="admFormCashBoxName" 
                            {...register('cashbox', {required: 'Це необхідні дані'})}
                            defaultValue={dataCashbox?.cashbox ?? ''}
                            onChange={(e) => setValue('cashbox', e.target.value)}
                            name="cashboxNameForm" 
                            maxLength={45}
                            placeholder="Назва каси"
                        />        
                    </div>    
                </div>
                <div>
                    <label htmlFor="organisationCashbox">Організація </label>
                        <select id='organisationCashbox' 
                            className="admFormCashBoxName" 
                            {...register('organisation', {required: 'Це необхідні дані'})}
                            name="organisationCashboxForm"
                            defaultValue={dataCashbox?.organisation ?? ''}
                            onChange={(e) => setValue('organisation', e.target.value)}
                        >
                        <option value="ФОП Шемендюк К.В.">ФОП Шемендюк К.В.</option>
                        <option value="ТОВ Скай-Партс">ТОВ Скай-Партс</option>
                    </select>    
                </div> 
                <div >
                    <div className='admFormCashBoxCustm'>
                        <label htmlFor="cashboxType">Тип каси </label>
                        <select 
                            id='cashboxType'
                            className="admFormCashBoxName" 
                            {...register('cashboxType', {required: 'Це необхідні дані'})}
                            defaultValue={dataCashbox?.cashboxType ?? ''}
                            onChange={(e) => setValue('cashboxType', e.target.value)}
                            name="cashboxTypeForm" 
                        >
                            <option value="Готівка">Готівка</option>
                            <option value="Б/г">Б/г</option>  
                        </select>      
                    </div>    
                </div>  
            </div>
            <div className='admCashBoxFormGrp'>
                <button className={dataCashbox?.disableBtns ?
                        'admFormCashBoxBtnOk' :
                        'admFormCashBoxBtnOkActive'
                    }
                    disabled={dataCashbox?.disableBtns}
                    onClick={handleSubmit(onSubmit)}
                >Ok</button>
                <div  onClick={(e) => e.stopPropagation()}>
                <button className={dataCashbox?.disableBtns ? 
                        'admFormCashBoxBtnSaveActive' :
                        'admFormCashBoxBtnSave'
                    }
                    disabled={!dataCashbox?.disableBtns ? true : false}
                    onClick={handleSubmit(onSubmit)}
                >Зберегти</button>
                </div>
                <button className='admFormCashBoxBtnCancel'
                    onClick={() => setActive(!active)}
                >Відмінити</button> 
            </div>
            {
                errors.id_cashbox || 
                errors.cashbox ||
                errors.organisation ||
                errors.cashboxType
                ? 
                <span style={{'color': 'red'}}>
                    Не вірні данні. Перевірте данні.
                </span>
                : null
            }
        </form>
        </div>
    </div>
    );
};

export default AdminModalCashbox;