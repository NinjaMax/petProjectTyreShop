import React from 'react';
import '../../css/CardsCss/TyresCardList.css';
import FlagsIcon from '../Cards/FlagsIcon';
import PropsCardIcons from '../Cards/PropsCardIcons';
import Rating from '../UX/Rating';
import tyres from '../../assets/autotyrespilotspotps2.png';
import ButtonAction from '../Buttons/ButtonAction';

const TyresCardList = () => {
    return (
    
        <div className="tyresCardList">
            <img id='imgTyresList' src={tyres} alt="John" />
            <div className='tyresCardListBox'>
                
                <a id='tyresName' href="/#">CONTINENTAL CONTICROSSPREMIUMCONTACT 6 UHPD 5P 195/65 R15 105T XL</a>
                <div className='ratingTyresList'><Rating numScore={4.8}/><a className='reviewLink' href='/#'>0 отзывов</a></div>
                <div className="tyresCardCodeList">код товара: 0123565447</div>
                <div className='propsCardList'><PropsCardIcons/></div>
                <div className="tyresCardCountryList"><FlagsIcon/></div>
                <div>
                    <div className="tyresCardPriceList">2005 UAH</div>
                    <ButtonAction props={"КУПИТИ"} widthBtn={160}/>    
                </div>
                  
            </div>
        </div>
       
    );
};

export default TyresCardList;