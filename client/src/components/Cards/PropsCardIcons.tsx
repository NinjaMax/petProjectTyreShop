import React from 'react';
import '../../css/CardsCss/PropsCardIcon.css';
import seasonSummer from '../../assets/icons/iconsSeasons/seasonSummer.png';
import passCar from '../../assets/icons/iconsTypeCar/londonCabClear64.png';
import pickup from '../../assets/icons/iconsTypeCar/pickup.png';

const PropsCardIcons = () => {
    return (
        <div className='propsCardIcons'>
            <img src={passCar} alt='typesCar'/>
            <img src={seasonSummer} alt='seasons'/>
            <img src={pickup} alt='typesCar'/>
        </div>
    );
};

export default PropsCardIcons;