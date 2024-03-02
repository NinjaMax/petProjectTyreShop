import React, { useContext } from 'react';
import '../../css/AdminComponentCss/AdminProfile.css';
import { Context } from '../../context/Context';
import { observer } from 'mobx-react-lite';

const AdminProfile = observer(() => {
    const {user} = useContext<any | null>(Context);

    return (
        <div className='adminProfile'>
            {user._user?.sub?.picture ? 
                <img src={user._user?.sub?.picture} width={52} height={52} alt='user'/> :
                <i className="fas fa-user-circle"></i>    
            }
            <div className='admProfileItem'>id:{user._user?.sub?.id_user ?? 'немає данних'}</div>
            <div className='admProfileItem'>Ім'я:{user._user?.sub?.name ?? 'немає данних'}</div>
            <div className='admProfileItem'>{user._user?.sub?.role ?? 'немає данних'}</div>
            <div className='admProfileItem'>{user._user?.sub?.email ?? 'не вказано'}</div>
        </div>
    );
});

export default AdminProfile;