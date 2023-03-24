import React from 'react';
import '../../css/CardsCss/FlagIcon.css';
import iconFlag from '../../assets/iconFlags/icons8-ukraine-48.png';


const FlagsIcon = () => {
    return (
        <div className='flagIcon'>
            <img className='imgFlag' src={iconFlag} alt="flags"/> Ukraine 2021
        </div>
    );
};

export default FlagsIcon;