import React, {useState} from 'react';
import '../../../css/AdminComponentCss/AdminContentCss/AdminUsersContent.css';
import ModalAdmin from '../../modal/ModalAdmin';
import AdminModalUsers from '../adminModalForm/AdminModalUsers';
import { IUserItem } from './types/UsersItem.type';

interface IUser {
    users: [] | null;
}

const AdminUsersContent = ({users}:IUser) => {
    const [createUser, setCreateUser] =useState(false);
    const [value, setValue] = useState('');
    const [isSearch, setIsSearch] = useState(true);

    const createUserBtn = () => {
        setCreateUser(!createUser);
    };

    const filteredUserData = users?.filter((userItem: any) => {
        return userItem.id_user === +value.toLowerCase() ||
        userItem.name.toLowerCase().includes(value.toLowerCase()) 
    })

    const itemClickHandler = (e: any) => {
        const entity = e.target.textContent.split(':')
        setValue(entity[1]);
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

    return (
        <div className='admUserContentBox'
            onClick={inputCancelHandler}
        >
        <div className="admUsersContent">
            <span>Користувачі:</span>
            <div className='admUsersHeader'>
                <button className='admUsersAddBtn'
                    onClick={createUserBtn}>Додати користувача
                </button>
            </div>
            <input 
                className='inputAdminUsers' 
                type="text" 
                id="myInput"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onClick={inputHandler} 
                placeholder="Введіть значення для пошуку..."
            />
                <ul className='inputSupplierContent'>
                    {value && isSearch ?
                            filteredUserData?.map(
                                (item: IUserItem, index: number) =>{
                            return (
                            <li key={'fullName' + index}
                                className='inputSupplierContentItem'
                                onClick={itemClickHandler}
                            >
                            {`${item.id_user}:${item.name}`}
                            </li>
                            ) 
                            })  
                        : null  
                    }
                </ul>
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
            {filteredUserData ? filteredUserData.map(
                (items: IUserItem) => (
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