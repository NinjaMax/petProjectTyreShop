import React, {useState} from 'react';
import '../../../css/AdminComponentCss/AdminContentCss/AdminCustomersContent.css';
import ButtonSearch from '../../buttons/ButtonSearch';
import ModalAdmin from '../../modal/ModalAdmin';
import AdminModalCustmCreate from '../adminModalForm/AdminModalCustmCreate';

interface ICustomer {
    customer: [] | null;
}

const AdminCustomersContent = ({customer}: ICustomer) => {
    const [createCustm, setCreateCustm] = useState(false);

    const createCustomer = () => {
        setCreateCustm(!createCustm);
    };

    return (
        <div>
            <div className="admCustomersContent">
                <span>Покупці:</span>
                <div className='admCustomersHeader'>
                    <button className='admCustomersAddBtn'
                        onClick={createCustomer}>Додати покупця
                    </button>
                </div>
                <input className='inputAdminCustomers' type="text" id="myInput" placeholder="Введіть значення для пошуку..."/>
                    <ButtonSearch clickSearchBtn={()=> console.log('searchBtn')}/>
            </div>
            <div className='admCustomersTable'>
                <table className='admListCustomersTable'>
                    <thead>
                        <tr className='headerCustomersTable'>
                            <th>Код</th>
                            <th>Покупець</th>
                            <th>Місто</th>
                            <th>Телефон</th>
                            <th>Email</th>
                            <th>Ід Контракту</th>
                            <th>Контракт</th>
                            <th>Баланс</th>
                            <th>Опції</th>
                        </tr>
                    </thead>    
                    <tbody>
                    <tr>
                        <td>26430200</td>
                        <td>Гайворонский Николай</td>
                        <td>Київ</td>
                        <td>0957553141</td>
                        <td>fgh5555gggg.tatarbu@gmai.com</td>
                        <td>0125</td>
                        <td>Гайворонский Николай Основний договір</td>
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
                        <td>Гайворонский Николай</td>
                        <td>Київ</td>
                        <td>0957553141</td>
                        <td>fgh5555gggg.tatarbu@gmai.com</td>
                        <td>0125</td>
                        <td>Гайворонский Николай Основний договір</td>
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
                        <td>Гайворонский Николай</td>
                        <td>Київ</td>
                        <td>0957553141</td>
                        <td>fgh5555gggg.tatarbu@gmai.com</td>
                        <td>0125</td>
                        <td>Гайворонский Николай Основний договір</td>
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
                        <td>Гайворонский Николай</td>
                        <td>Київ</td>
                        <td>0957553141</td>
                        <td>fgh5555gggg.tatarbu@gmai.com</td>
                        <td>0125</td>
                        <td>Гайворонский Николай Основний договір</td>
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
                        <td>Гайворонский Николай</td>
                        <td>Київ</td>
                        <td>0957553141</td>
                        <td>fgh5555gggg.tatarbu@gmai.com</td>
                        <td>0125</td>
                        <td>Гайворонский Николай Основний договір</td>
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
                        <td>Гайворонский Николай</td>
                        <td>Київ</td>
                        <td>0957553141</td>
                        <td>fgh5555gggg.tatarbu@gmai.com</td>
                        <td>0125</td>
                        <td>Гайворонский Николай Основний договір</td>
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
                        <td>Гайворонский Николай</td>
                        <td>Київ</td>
                        <td>0957553141</td>
                        <td>fgh5555gggg.tatarbu@gmai.com</td>
                        <td>0125</td>
                        <td>Гайворонский Николай Основний договір</td>
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
                        <td>Гайворонский Николай</td>
                        <td>Київ</td>
                        <td>0957553141</td>
                        <td>fgh5555gggg.tatarbu@gmai.com</td>
                        <td>0125</td>
                        <td>Гайворонский Николай Основний договір</td>
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
                        <td>Гайворонский Николай</td>
                        <td>Київ</td>
                        <td>0957553141</td>
                        <td>fgh5555gggg.tatarbu@gmai.com</td>
                        <td>0125</td>
                        <td>Гайворонский Николай Основний договір</td>
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
                        <td>Гайворонский Николай</td>
                        <td>Київ</td>
                        <td>0957553141</td>
                        <td>fgh5555gggg.tatarbu@gmai.com</td>
                        <td>0125</td>
                        <td>Гайворонский Николай Основний договір</td>
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
                        <td>Гайворонский Николай</td>
                        <td>Київ</td>
                        <td>0957553141</td>
                        <td>fgh5555gggg.tatarbu@gmai.com</td>
                        <td>0125</td>
                        <td>Гайворонский Николай Основний договір</td>
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
                        <td>Гайворонский Николай</td>
                        <td>Київ</td>
                        <td>0957553141</td>
                        <td>fgh5555gggg.tatarbu@gmai.com</td>
                        <td>0125</td>
                        <td>Гайворонский Николай Основний договір</td>
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
                        <td>Гайворонский Николай</td>
                        <td>Київ</td>
                        <td>0957553141</td>
                        <td>fgh5555gggg.tatarbu@gmai.com</td>
                        <td>0125</td>
                        <td>Гайворонский Николай Основний договір</td>
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
                        <td>Гайворонский Николай</td>
                        <td>Київ</td>
                        <td>0957553141</td>
                        <td>fgh5555gggg.tatarbu@gmai.com</td>
                        <td>0125</td>
                        <td>Гайворонский Николай Основний договір</td>
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
                        <td>Гайворонский Николай</td>
                        <td>Київ</td>
                        <td>0957553141</td>
                        <td>fgh5555gggg.tatarbu@gmai.com</td>
                        <td>0125</td>
                        <td>Гайворонский Николай Основний договір</td>
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
            {createCustm ?
                <ModalAdmin active={createCustm} setActive={setCreateCustm}>
                    <AdminModalCustmCreate/>    
                </ModalAdmin>  
                : null
            } 
        </div>
    );
};

export default AdminCustomersContent;