import React from 'react';
import '../../css/CardsCss/TyresCard.css';
import FlagsIcon from '../Cards/FlagsIcon';
import PropsCardIcons from '../Cards/PropsCardIcons';
import Rating from '../UX/Rating';
import OptionsTyreBox from '../Cards/OptionsTyreBox';
import tyres from '../../assets/autotyrespilotspotps2.png';

const TyresCard = ({optionsBox}) => {
    return (
        <div className="tyresCard">
            <div >
                <img id='imgTyres' src={tyres} alt="John" />
                <a id='tyresName' href="/#">CONTINENTAL CONTICROSSPREMIUMCONTACT 6 UHPD 5P 195/65 R15 105T XL</a>
                <div className='ratingTyres'><Rating numScore={4.8}/><a href='/#'>0 отзывов</a></div>
                <div className="tyresCardCode">код товара: 0123565447</div>
                <div className='propsCard'><PropsCardIcons/></div>
                <div className="tyresCardCountry"><FlagsIcon/></div>
                <div className="tyresCardPrice">2005 UAH</div>
                <div><button>КУПИТЬ</button></div>
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