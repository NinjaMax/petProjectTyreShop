import React from 'react';
import '../../css/CardsCss/TyresCard.css';
import FlagsIcon from './FlagsIcon';
import PropsCardIcons from './PropsCardIcons';
import Rating from '../ux/Rating';
import OptionsTyreBox from './OptionsTyreBox';
import tyres from '../../assets/autotyrespilotspotps2.png';
import ButtonAction from '../buttons/ButtonAction';
import { ITyreCard } from './interfaces/tyreCard.interface';

const TyresCard = ({optionsBox, checkOrders}:ITyreCard) => {

    return (
        <div className="tyresCard">
            <div >
                <img id='imgTyres' src={tyres} alt="John" />
                <a id='tyresName' href="/goods">CONTINENTAL CONTICROSSPREMIUMCONTACT 6 UHPD 5P 195/65 R15 105T XL</a>
                <div className='ratingTyres'><Rating numScore={4.8}/><a className='reviewCard' href='/#'>0 отзывов</a></div>
                <div className="tyresCardCode">код товара: 0123565447</div>
                <div className='propsCard'><PropsCardIcons/></div>
                <div className="tyresCardCountry"><FlagsIcon/></div>
                <div className="tyresCardPrice">2005 UAH</div>
                <ButtonAction props={"КУПИТИ"} widthBtn={260} eventItem={checkOrders}/>
                <p/>    
            </div>
            { optionsBox ?
                <OptionsTyreBox/>
            :null}
            <p/>     
        </div>
    );
};

export default TyresCard;