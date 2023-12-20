import React from 'react';
import '../../../css/AdminComponentCss/AdminModalFormCss/AdminModalSupplierCreate.css';
import { useForm } from 'react-hook-form';
import { createSupplier } from '../../../restAPI/restAdminAPI';
import { SupplierCreate } from '../../../restAPI/types/createSupplier.type';
import { SupplierModalCreate } from './types/SupplierModalCreate.type';

const AdminModalSupplierCreate = ({active, setActive, dataSupplier}: SupplierModalCreate) => {
    const {register, handleSubmit, setValue, getValues, setError, formState: {errors}} = useForm<SupplierCreate, any>(); 
    
    const onSubmit = async (data: SupplierCreate) => {
        try {
            const createSupplierNew = await createSupplier(data);
            console.log('CREATE_SUPPLIER: ', createSupplierNew);
            if (createSupplierNew?.data) {
                alert(`Постчальника ${createSupplierNew?.data.name} ID ${createSupplierNew?.data.id_supplier} створено.`)
                setActive(!active);
            }
        } catch (error) {
            alert('Помилка при створені постачальника.')
            console.log('ERROR_CREATE_CUSTOMER: ',error);
        }
    };
    console.log('ERRORS_FORM: ', errors);
    return (
        <div>
            Створити поcтачальника
            <div className="containerAdmSupplierCreateForm">
            <form onSubmit={handleSubmit(onSubmit)}
            >
                <div className='admFormDataSupplierCreate'>
                    <div >
                        <div className='admFormSupplierCreateSupplier'>
                            <label htmlFor="idSupplier">Id </label>
                            <input 
                               //type="text"
                                id='idSupplier' 
                                className="admFormSupplierCreateId" 
                                {...register('id_supplier', {required: 'Це необхідні дані'})}
                                name="idSupplier" 
                                maxLength={45}
                                defaultValue={dataSupplier?.id_supplier ?? ''}
                                onChange={(e) => setValue('id_supplier', +e.target.value)}
                                placeholder="id постачальника.."
                            />        
                        </div>    
                    </div>
                    <div>
                        <label htmlFor="supplierName">Назва </label>
                        <input type="text" 
                            id='supplierName'
                            className="admFormSupplierCreateName" 
                            {...register('name', {required: 'Це необхідні дані'})}
                            name="supplierNameForm" 
                            maxLength={45}
                            defaultValue={dataSupplier?.name ?? ''}
                            onChange={(e) => setValue('name', e.target.value)}
                            placeholder="Назва постачальника.."
                        />  
                    </div>
                    <div>
                        <label htmlFor="supplierCity">Місто(Рос) </label>
                        <input type="text" 
                            id='supplierCity'
                            className="admFormSupplierCreateCity" 
                            {...register('city', {required: 'Це необхідні дані'})}
                            name="supplierCityForm" 
                            maxLength={45}
                            defaultValue={dataSupplier?.city ?? ''}
                            onChange={(e) => setValue('city', e.target.value)}
                            placeholder="місто.."
                        />  
                    </div>
                    <div>
                        <label htmlFor="supplierCityUa">Місто(Укр) </label>
                        <input type="text" 
                            id='supplierCityUa'
                            className="admFormSupplierCreateCity" 
                            {...register('city_ua', {required: 'Це необхідні дані'})}
                            name="supplierCityFormUa" 
                            maxLength={45}
                            defaultValue={dataSupplier?.city_ua ?? ''}
                            onChange={(e) => setValue('city_ua', e.target.value)}
                            placeholder="місто.."
                        />  
                    </div>
                    <div>
                        <label htmlFor="phoneSupplier">телефон </label>
                        <input type="text" 
                            id='phoneSupplier'
                            className="admFormSupplierCreatePhone" 
                            {...register('phone', {required: 'Це необхідні дані'})}
                            name="phoneSupplierForm" 
                            maxLength={45}
                            defaultValue={dataSupplier?.phone ?? ''}
                            onChange={(e) => setValue('phone', +e.target.value)}
                            placeholder="приклад 050225663"
                        />  
                    </div>
                    <div>
                        <label htmlFor="emailSupplier">email </label>
                        <input type="text" 
                            id='emailSupplier'
                            className="admFormSupplierCreateEmail" 
                            {...register('email')}
                            name="emailSupplierForm" 
                            maxLength={45}
                            defaultValue={dataSupplier?.email ?? ''}
                            onChange={(e) => setValue('email', e.target.value)}
                            placeholder="електронна пошта.."
                        />  
                    </div>
                    <div>
                        <label htmlFor="addressSupplier">телеграм пост </label>
                        <input type="text" 
                            id='addressSupplier'
                            {...register('address')}
                            className="admFormSupplierCreateAddress" 
                            name="addressSupplierForm" 
                            maxLength={45}
                            defaultValue={dataSupplier?.address ?? ''}
                            onChange={(e) => setValue('address', e.target.value)}
                            placeholder="Телеграм постачальника.."
                        />  
                    </div>
                    <div>
                        <label htmlFor="pereviznikSupplier">Перевізник </label>
                            <select id='pereviznikSupplier' 
                                {...register('delivery')}
                                className="admFormSupplierCreateDelivery" 
                                name="pereviznikSupplierForm"
                                defaultValue={dataSupplier?.delivery ?? ''}
                                onChange={(e) => setValue('delivery', [e.target.value])}
                            >
                            <option value="Нова Пошта">Нова Пошта</option>
                            <option value="Укр Пошта">Укр Пошта</option>
                            <option value="Делівері">Делівері</option>
                        </select>    
                    </div>
                    <div>
                        <label htmlFor="refCitySupplier">Ref міста </label>
                        <input type="text" 
                            id='refCitySupplier'
                            {...register('delivery_city_ref')}
                            className="admFormSupplierCreateAddress" 
                            name="refCitySupplierForm" 
                            maxLength={45}
                            defaultValue={dataSupplier?.delivery_city_ref ?? ''}
                            onChange={(e) => setValue('delivery_city_ref', [e.target.value])}
                            placeholder="Телеграм постачальника.."
                        />  
                    </div>
                    <div>
                        <label htmlFor="departSupplier">відділення </label>
                        <input type="text" 
                            id='departSupplier'
                            {...register('delivery_dep')}
                            className="admFormSupplierCreateAddress" 
                            name="departSupplierForm" 
                            maxLength={45}
                            defaultValue={dataSupplier?.delivery_dep ?? ''}
                            onChange={(e) => setValue('delivery_dep', [e.target.value])}
                            placeholder="Телеграм постачальника.."
                        />  
                    </div>
                    <div>
                        <label htmlFor="departSupplierRef">Ref відділення </label>
                        <input type="text" 
                            id='departSupplierRef'
                            {...register('delivery_dep_ref')}
                            className="admFormSupplierCreateAddress" 
                            name="departSupplierFormRef" 
                            maxLength={45}
                            defaultValue={dataSupplier?.delivery_dep_ref ?? ''}
                            onChange={(e) => setValue('delivery_dep_ref', [e.target.value])}
                            placeholder="Телеграм постачальника.."
                        />  
                    </div>   
                </div>
                <div className='admSupplierCreateFormGrp'
                    onClick={(e:any) => e.stopPropagation()}
                >
                    <button type="submit" className='admFormSupplierCreateBtnOk'>Ok</button>
                    <button className='admFormSupplierCreateBtnSave' 
                        disabled={dataSupplier ? false : true}
                        onClick={(e:any) => console.log('UPDATE_SUPPLIER')}
                    >Зберегти </button> 
                    <button className='admFormSupplierCreateBtnCancel'
                        onClick={() => setActive(!active)}
                    >Відмінити</button>
                    {
                        errors.id_supplier || 
                        errors.city || 
                        errors.city_ua ||
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

export default AdminModalSupplierCreate