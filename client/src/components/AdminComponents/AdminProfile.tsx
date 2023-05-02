import React, { useContext } from 'react';
import '../../css/AdminComponentCss/AdminProfile.css';
import { Context } from '../../context/Context';
import { observer } from 'mobx-react-lite';

const AdminProfile = observer(() => {
    const {user} = useContext<any | null>(Context);
    console.log('USERPROFILE: ', user);

    return (
        <div className='adminProfile'>
            {user.picture ? 
                <img src={user._user.picture} alt='user'/> :
                <i className="fas fa-user-circle"></i>    
            }
            <div className='admProfileItem'>Ім'я:{user._user?.sub?.name ?? 'немає данних'}</div>
            <div className='admProfileItem'>{user._user?.sub?.role ?? 'немає данних'}</div>
            <div className='admProfileItem'>{user._user?.sub?.email ?? 'не вказано'}</div>
        </div>
    );
});

export default AdminProfile;