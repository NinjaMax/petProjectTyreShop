import React from 'react';
import '../../css/AdminComponentCss/AdminProfile.css';

const AdminProfile = () => {
    //const userImage = '';

    return (
        <div className='adminProfile'>
            {/*<img src={ userImage ?? null}
                alt='userImage'></img> ?? */}
            <i className="fas fa-user-circle"></i>        
            <div className='admProfileItem'>Ім'я: User Name Sername</div>
            <div className='admProfileItem'>Менеджер</div>
            <div className='admProfileItem'>bistriyyhfhfsdasasci342424@gamil.com</div>
        </div>
    );
};

export default AdminProfile;