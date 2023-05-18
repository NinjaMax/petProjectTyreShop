import React, {useState} from 'react';
import '../../../css/AdminComponentCss/AdminContentCss/AdminUsersContent.css';
import ButtonSearch from '../../buttons/ButtonSearch';
import ModalAdmin from '../../modal/ModalAdmin';
import AdminModalUsers from '../adminModalForm/AdminModalUsers';
import { IUserItem } from './types/UsersItem.type';

interface IUser {
    users: [] | null;
}

const AdminUsersContent = ({users}:IUser) => {
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
            <ButtonSearch clickSearchBtn={()=> console.log('searchBtn')}/>
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
            {users ? users.map((items: IUserItem) => (
                    <tr key={'or' + items.id_user}
                        //onClick={e => showComment(e)}
                        //onDoubleClick={e => showOrderData(e)}
                        data-value={items.id_user}>
                        <td>{items.id_user}</td>
                        <td>{items.name}</td>
                        <td>{items.role}</td>
                        <td>{items?.phone}</td>
                        <td>{items?.email}</td>
                        <td>{items.contract[0]?.id_contract ?? ''}</td>
                        <td>{items.contract[0]?.name ?? ''}</td>
                        <td>{items.pictures ?? ''}</td>
                        <td>
                        <button className='basketAdmGoods'
                            value={items.id_user}
                        >
                            <i className="fa fa-shopping-cart"></i>
                        </button>
                        <button className='editAdmGoods'
                            value={items.id_user}
                        >
                            <i className="fas fa-edit"></i>
                        </button>
                        <button className='closeAdmGoods'
                            value={items.id_user}
                        >
                            <i className="fa fa-remove"></i>
                        </button>                  
                        </td>
                    </tr>
                    ))
                    : <tr><td>.....Очікуемо постачальників.....</td></tr>
                    }              
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