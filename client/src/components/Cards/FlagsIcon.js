import React from 'react';
import iconFlag from '../../assets/iconFlags/icons8-ukraine-48.png';
import '../../css/CardsCss/FlagIcon.css';

const FlagsIcon = () => {
    return (
        <div className='flagIcon'>
            <img src={iconFlag} alt="flags"/>Ukraine 2021
        </div>
    );
};

export default FlagsIcon;