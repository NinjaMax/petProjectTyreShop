import React from 'react';
import '../../css/CardsCss/TyreCardSmall.css';
import ButtonAction from '../Buttons/ButtonAction';
import tyres from '../../assets/autotyrespilotspotps2.png';

const TyreCardSmall = () => {
    return (
        <div className='tyreCardSmall'>
            <div>
                <img id='imgTyresSmall' src={tyres} alt="tyreSmall" />
                <p/>
                <div className='tyresNameSmall'>CONTINENTAL CONTICROSSPREMIUMCONTACT 6 UHPD 5P 195/65 R15 105T XL</div>
                <div className="tyresCardPriceSmall">2005 UAH</div>
                <div><ButtonAction props={"КУПИТИ"} widthBtn={180}/></div>
                <p/>    
            </div>
            <p/> 
        </div>
    );
};

export default TyreCardSmall;