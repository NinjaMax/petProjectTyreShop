import React, {useState} from 'react';
import '../../../css/AdminComponentCss/AdminContentCss/AdminSuppliersContent.css';
import ButtonSearch from '../../Buttons/ButtonSearch';
import ModalAdmin from '../../Modal/ModalAdmin';
import AdminModalSupplier from '../AdminModalForm/AdminModalSupplier';

const AdminSupplierContent = () => {

    const [createSupplier, setCreateSupplier] = useState(false);

    const createSupplierBtn = () => {
        setCreateSupplier(!createSupplier);
    };
    
    return (
        <div>
        <div className="admSupplierContent">
            <span>Постачальники:</span>
            <div className='admSupplierHeader'>
                <button className='admSupplierAddBtn'
                    onClick={createSupplierBtn}>Додати постачальника
                </button>
            </div>
            <input className='inputAdminSupplier' type="text" id="myInput" placeholder="Введіть значення для пошуку..."/>
            <ButtonSearch clickSearchBtn={undefined}/>
        </div>
        <div className='admSupplierTable'>
        <table className='admListSupplierTable'>
            <thead>
                <tr className='headerSupplierTable'>
                    <th>Код</th>
                    <th>Постачальник</th>
                    <th>Місто</th>
                    <th>Телефон</th>
                    <th>Email</th>
                    <th>Ід Контракту</th>
                    <th>Контракт</th>
                    <th>Баланс</th>
                    <th>Перевізники</th>
                    <th>Опції</th>
                </tr>
            </thead>    
            <tbody>
                <tr>
                    <td>26430200</td>
                    <td>ФОП Гайворонский</td>
                    <td>Київ</td>
                    <td>0957553141</td>
                    <td>fgh5555gggg.tatarbu@gmai.com</td>
                    <td>0125</td>
                    <td>ФОП Гайворонский Основний договір</td>
                    <td>10000</td>
                    <th>Делівері, Нова Пошта, УкрПошта, Глово</th>
                    <td>
                        <button className='basketAdmGoods'>
                            <i className="fa fa-shopping-cart"></i>
                        </button>
                        <button className='editAdmGoods'>
                            <i className="fas fa-edit"></i>
                        </button>
                        <button className='closeAdmGoods'>
                            <i className="fa fa-remove"></i>
                        </button>                  
                    </td>
                </tr>          
                <tr>
                    <td>26430200</td>
                    <td>ФОП Гайворонский</td>
                    <td>Київ</td>
                    <td>0957553141</td>
                    <td>fgh5555gggg.tatarbu@gmai.com</td>
                    <td>0125</td>
                    <td>ФОП Гайворонский Основний договір</td>
                    <td>10000</td>
                    <td>
                        <button className='basketAdmGoods'>
                            <i className="fa fa-shopping-cart"></i>
                        </button>
                        <button className='editAdmGoods'>
                            <i className="fas fa-edit"></i>
                        </button>
                        <button className='closeAdmGoods'>
                            <i className="fa fa-remove"></i>
                        </button>                  
                    </td>
                </tr>          
                <tr>
                    <td>26430200</td>
                    <td>ФОП Гайворонский</td>
                    <td>Київ</td>
                    <td>0957553141</td>
                    <td>fgh5555gggg.tatarbu@gmai.com</td>
                    <td>0125</td>
                    <td>ФОП Гайворонский Основний договір</td>
                    <td>10000</td>
                    <td>
                        <button className='basketAdmGoods'>
                            <i className="fa fa-shopping-cart"></i>
                        </button>
                        <button className='editAdmGoods'>
                            <i className="fas fa-edit"></i>
                        </button>
                        <button className='closeAdmGoods'>
                            <i className="fa fa-remove"></i>
                        </button>                  
                    </td>
                </tr>             
                <tr>
                    <td>26430200</td>
                    <td>ФОП Гайворонский</td>
                    <td>Київ</td>
                    <td>0957553141</td>
                    <td>fgh5555gggg.tatarbu@gmai.com</td>
                    <td>0125</td>
                    <td>ФОП Гайворонский Основний договір</td>
                    <td>10000</td>
                    <td>
                        <button className='basketAdmGoods'>
                            <i className="fa fa-shopping-cart"></i>
                        </button>
                        <button className='editAdmGoods'>
                            <i className="fas fa-edit"></i>
                        </button>
                        <button className='closeAdmGoods'>
                            <i className="fa fa-remove"></i>
                        </button>                  
                    </td>
                </tr>          
                <tr>
                    <td>26430200</td>
                    <td>ФОП Гайворонский</td>
                    <td>Київ</td>
                    <td>0957553141</td>
                    <td>fgh5555gggg.tatarbu@gmai.com</td>
                    <td>0125</td>
                    <td>ФОП Гайворонский Основний договір</td>
                    <td>10000</td>
                    <td>
                        <button className='basketAdmGoods'>
                            <i className="fa fa-shopping-cart"></i>
                        </button>
                        <button className='editAdmGoods'>
                            <i className="fas fa-edit"></i>
                        </button>
                        <button className='closeAdmGoods'>
                            <i className="fa fa-remove"></i>
                        </button>                  
                    </td>
                </tr>          
                <tr>
                    <td>26430200</td>
                    <td>ФОП Гайворонский</td>
                    <td>Київ</td>
                    <td>0957553141</td>
                    <td>fgh5555gggg.tatarbu@gmai.com</td>
                    <td>0125</td>
                    <td>ФОП Гайворонский Основний договір</td>
                    <td>10000</td>
                    <td>
                        <button className='basketAdmGoods'>
                            <i className="fa fa-shopping-cart"></i>
                        </button>
                        <button className='editAdmGoods'>
                            <i className="fas fa-edit"></i>
                        </button>
                        <button className='closeAdmGoods'>
                            <i className="fa fa-remove"></i>
                        </button>                  
                    </td>
                </tr>          
                <tr>
                    <td>26430200</td>
                    <td>ФОП Гайворонский</td>
                    <td>Київ</td>
                    <td>0957553141</td>
                    <td>fgh5555gggg.tatarbu@gmai.com</td>
                    <td>0125</td>
                    <td>ФОП Гайворонский Основний договір</td>
                    <td>10000</td>
                    <td>
                        <button className='basketAdmGoods'>
                            <i className="fa fa-shopping-cart"></i>
                        </button>
                        <button className='editAdmGoods'>
                            <i className="fas fa-edit"></i>
                        </button>
                        <button className='closeAdmGoods'>
                            <i className="fa fa-remove"></i>
                        </button>                  
                    </td>
                </tr>          
                <tr>
                    <td>26430200</td>
                    <td>ФОП Гайворонский</td>
                    <td>Київ</td>
                    <td>0957553141</td>
                    <td>fgh5555gggg.tatarbu@gmai.com</td>
                    <td>0125</td>
                    <td>ФОП Гайворонский Основний договір</td>
                    <td>10000</td>
                    <td>
                        <button className='basketAdmGoods'>
                            <i className="fa fa-shopping-cart"></i>
                        </button>
                        <button className='editAdmGoods'>
                            <i className="fas fa-edit"></i>
                        </button>
                        <button className='closeAdmGoods'>
                            <i className="fa fa-remove"></i>
                        </button>                  
                    </td>
                </tr>          
                <tr>
                    <td>26430200</td>
                    <td>ФОП Гайворонский</td>
                    <td>Київ</td>
                    <td>0957553141</td>
                    <td>fgh5555gggg.tatarbu@gmai.com</td>
                    <td>0125</td>
                    <td>ФОП Гайворонский Основний договір</td>
                    <td>10000</td>
                    <td>
                        <button className='basketAdmGoods'>
                            <i className="fa fa-shopping-cart"></i>
                        </button>
                        <button className='editAdmGoods'>
                            <i className="fas fa-edit"></i>
                        </button>
                        <button className='closeAdmGoods'>
                            <i className="fa fa-remove"></i>
                        </button>                  
                    </td>
                </tr>          
                <tr>
                    <td>26430200</td>
                    <td>ФОП Гайворонский</td>
                    <td>Київ</td>
                    <td>0957553141</td>
                    <td>fgh5555gggg.tatarbu@gmai.com</td>
                    <td>0125</td>
                    <td>ФОП Гайворонский Основний договір</td>
                    <td>10000</td>
                    <td>
                        <button className='basketAdmGoods'>
                            <i className="fa fa-shopping-cart"></i>
                        </button>
                        <button className='editAdmGoods'>
                            <i className="fas fa-edit"></i>
                        </button>
                        <button className='closeAdmGoods'>
                            <i className="fa fa-remove"></i>
                        </button>                  
                    </td>
                </tr>          
                <tr>
                    <td>26430200</td>
                    <td>ФОП Гайворонский</td>
                    <td>Київ</td>
                    <td>0957553141</td>
                    <td>fgh5555gggg.tatarbu@gmai.com</td>
                    <td>0125</td>
                    <td>ФОП Гайворонский Основний договір</td>
                    <td>10000</td>
                    <td>
                        <button className='basketAdmGoods'>
                            <i className="fa fa-shopping-cart"></i>
                        </button>
                        <button className='editAdmGoods'>
                            <i className="fas fa-edit"></i>
                        </button>
                        <button className='closeAdmGoods'>
                            <i className="fa fa-remove"></i>
                        </button>                  
                    </td>
                </tr>          
                <tr>
                    <td>26430200</td>
                    <td>ФОП Гайворонский</td>
                    <td>Київ</td>
                    <td>0957553141</td>
                    <td>fgh5555gggg.tatarbu@gmai.com</td>
                    <td>0125</td>
                    <td>ФОП Гайворонский Основний договір</td>
                    <td>10000</td>
                    <td>
                        <button className='basketAdmGoods'>
                            <i className="fa fa-shopping-cart"></i>
                        </button>
                        <button className='editAdmGoods'>
                            <i className="fas fa-edit"></i>
                        </button>
                        <button className='closeAdmGoods'>
                            <i className="fa fa-remove"></i>
                        </button>                  
                    </td>
                </tr>          
                <tr>
                    <td>26430200</td>
                    <td>ФОП Гайворонский</td>
                    <td>Київ</td>
                    <td>0957553141</td>
                    <td>fgh5555gggg.tatarbu@gmai.com</td>
                    <td>0125</td>
                    <td>ФОП Гайворонский Основний договір</td>
                    <td>10000</td>
                    <td>
                        <button className='basketAdmGoods'>
                            <i className="fa fa-shopping-cart"></i>
                        </button>
                        <button className='editAdmGoods'>
                            <i className="fas fa-edit"></i>
                        </button>
                        <button className='closeAdmGoods'>
                            <i className="fa fa-remove"></i>
                        </button>                  
                    </td>
                </tr>          
                <tr>
                    <td>26430200</td>
                    <td>ФОП Гайворонский</td>
                    <td>Київ</td>
                    <td>0957553141</td>
                    <td>fgh5555gggg.tatarbu@gmai.com</td>
                    <td>0125</td>
                    <td>ФОП Гайворонский Основний договір</td>
                    <td>10000</td>
                    <td>
                        <button className='basketAdmGoods'>
                            <i className="fa fa-shopping-cart"></i>
                        </button>
                        <button className='editAdmGoods'>
                            <i className="fas fa-edit"></i>
                        </button>
                        <button className='closeAdmGoods'>
                            <i className="fa fa-remove"></i>
                        </button>                  
                    </td>
                </tr>          
                <tr>
                    <td>26430200</td>
                    <td>ФОП Гайворонский</td>
                    <td>Київ</td>
                    <td>0957553141</td>
                    <td>fgh5555gggg.tatarbu@gmai.com</td>
                    <td>0125</td>
                    <td>ФОП Гайворонский Основний договір</td>
                    <td>10000</td>
                    <td>
                        <button className='basketAdmGoods'>
                            <i className="fa fa-shopping-cart"></i>
                        </button>
                        <button className='editAdmGoods'>
                            <i className="fas fa-edit"></i>
                        </button>
                        <button className='closeAdmGoods'>
                            <i className="fa fa-remove"></i>
                        </button>                  
                    </td>
                </tr>          
            </tbody>
        </table>
        </div> 
        {createSupplier?
            <ModalAdmin active={createSupplier} setActive={setCreateSupplier}>
                <AdminModalSupplier/>
            </ModalAdmin> : null
        }
    </div>
    );
};

export default AdminSupplierContent;