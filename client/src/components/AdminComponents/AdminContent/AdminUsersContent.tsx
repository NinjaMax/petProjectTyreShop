import React, {useState} from 'react';
import '../../../css/AdminComponentCss/AdminContentCss/AdminUsersContent.css';
import ButtonSearch from '../../Buttons/ButtonSearch';
import ModalAdmin from '../../Modal/ModalAdmin';
import AdminModalUsers from '../AdminModalForm/AdminModalUsers';

const AdminUsersContent = () => {
    const [createUser, setCreateUser] =useState(false);

    const createUserBtn = () => {
        setCreateUser(!createUser);
    };

    return (
        <div className='admUserContentBox'>
        <div className="admUsersContent">
            <span>Користувачі:</span>
            <div className='admUsersHeader'>
                <button className='admUsersAddBtn'
                    onClick={createUserBtn}>Додати користувача
                </button>
            </div>
            <input className='inputAdminUsers' type="text" id="myInput" placeholder="Введіть значення для пошуку..."/>
            <ButtonSearch clickSearchBtn={undefined}/>
        </div>
        <div className='admUsersTable'>
        <table className='admListUsersTable'>
            <thead>
                <tr className='headerUsersTable'>
                    <th>Код</th>
                    <th>Користувачі</th>
                    <th>Посада</th>
                    <th>Телефон</th>
                    <th>Email</th>
                    <th>Ід Контракту</th>
                    <th>Контракт</th>
                    <th>Фото</th>
                    <th>Опції</th>
                </tr>
            </thead>    
            <tbody>
                <tr>
                    <td>26430200</td>
                    <td>Гайворонский Николай</td>
                    <td>Менеджер</td>
                    <td>0957553141</td>
                    <td>fgh5555gggg.tatarbu@gmai.com</td>
                    <td>0125</td>
                    <td>Гайворонский Николай Основний договір</td>
                    <td>/менеджер.jpg</td>
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
                    <td>Менеджер</td>
                    <td>0957553141</td>
                    <td>fgh5555gggg.tatarbu@gmai.com</td>
                    <td>0125</td>
                    <td>Гайворонский Николай Основний договір</td>
                    <td>/менеджер.jpg</td>
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
                    <td>Менеджер</td>
                    <td>0957553141</td>
                    <td>fgh5555gggg.tatarbu@gmai.com</td>
                    <td>0125</td>
                    <td>Гайворонский Николай Основний договір</td>
                    <td>/менеджер.jpg</td>
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
                    <td>Менеджер</td>
                    <td>0957553141</td>
                    <td>fgh5555gggg.tatarbu@gmai.com</td>
                    <td>0125</td>
                    <td>Гайворонский Николай Основний договір</td>
                    <td>/менеджер.jpg</td>
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
                    <td>Менеджер</td>
                    <td>0957553141</td>
                    <td>fgh5555gggg.tatarbu@gmai.com</td>
                    <td>0125</td>
                    <td>Гайворонский Николай Основний договір</td>
                    <td>/менеджер.jpg</td>
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
                    <td>Менеджер</td>
                    <td>0957553141</td>
                    <td>fgh5555gggg.tatarbu@gmai.com</td>
                    <td>0125</td>
                    <td>Гайворонский Николай Основний договір</td>
                    <td>/менеджер.jpg</td>
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
                    <td>Менеджер</td>
                    <td>0957553141</td>
                    <td>fgh5555gggg.tatarbu@gmai.com</td>
                    <td>0125</td>
                    <td>Гайворонский Николай Основний договір</td>
                    <td>/менеджер.jpg</td>
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
                    <td>Менеджер</td>
                    <td>0957553141</td>
                    <td>fgh5555gggg.tatarbu@gmai.com</td>
                    <td>0125</td>
                    <td>Гайворонский Николай Основний договір</td>
                    <td>/менеджер.jpg</td>
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
                    <td>Менеджер</td>
                    <td>0957553141</td>
                    <td>fgh5555gggg.tatarbu@gmai.com</td>
                    <td>0125</td>
                    <td>Гайворонский Николай Основний договір</td>
                    <td>/менеджер.jpg</td>
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
                    <td>Менеджер</td>
                    <td>0957553141</td>
                    <td>fgh5555gggg.tatarbu@gmai.com</td>
                    <td>0125</td>
                    <td>Гайворонский Николай Основний договір</td>
                    <td>/менеджер.jpg</td>
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
                    <td>Менеджер</td>
                    <td>0957553141</td>
                    <td>fgh5555gggg.tatarbu@gmai.com</td>
                    <td>0125</td>
                    <td>Гайворонский Николай Основний договір</td>
                    <td>/менеджер.jpg</td>
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
                    <td>Менеджер</td>
                    <td>0957553141</td>
                    <td>fgh5555gggg.tatarbu@gmai.com</td>
                    <td>0125</td>
                    <td>Гайворонский Николай Основний договір</td>
                    <td>/менеджер.jpg</td>
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
                    <td>Менеджер</td>
                    <td>0957553141</td>
                    <td>fgh5555gggg.tatarbu@gmai.com</td>
                    <td>0125</td>
                    <td>Гайворонский Николай Основний договір</td>
                    <td>/менеджер.jpg</td>
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
                    <td>Менеджер</td>
                    <td>0957553141</td>
                    <td>fgh5555gggg.tatarbu@gmai.com</td>
                    <td>0125</td>
                    <td>Гайворонский Николай Основний договір</td>
                    <td>/менеджер.jpg</td>
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
                    <td>Менеджер</td>
                    <td>0957553141</td>
                    <td>fgh5555gggg.tatarbu@gmai.com</td>
                    <td>0125</td>
                    <td>Гайворонский Николай Основний договір</td>
                    <td>/менеджер.jpg</td>
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
        {createUser?
            <ModalAdmin active={createUser} setActive={setCreateUser}>
                <AdminModalUsers/>
            </ModalAdmin> : null
        } 
    </div>
    );
};

export default AdminUsersContent;