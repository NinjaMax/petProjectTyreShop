import React from 'react';
import '../../css/CardsCss/TyresCardList.css';
import FlagsIcon from './FlagsIcon';
import PropsCardIcons from './PropsCardIcons';
import Rating from '../ux/Rating';
import tyres from '../../assets/autotyrespilotspotps2.png';
import ButtonAction from '../buttons/ButtonAction';
import CountBtnOrder from '../ux/CountBtnOrder';
//import { ITyreCard } from './interfaces/tyreCard.interface';

interface ITyreCardList {
    forOrder?: boolean;
}

const TyresCardList = ({forOrder}: ITyreCardList) => {
    return (
    
        <div className="tyresCardList">
            <img id='imgTyresList' src={tyres} alt="John" />
            <div className='tyresCardListBox'>    
                <a id='nameCardList' href="/goods">CONTINENTAL CONTICROSSPREMIUMCONTACT 6 UHPD 5P 195/65 R15 105T XL</a>
                <div className='ratingTyresList'><Rating numScore={4.8}/><a className='reviewLink' href='/#'>0 отзывов</a></div>
                <div className="tyresCardCodeList">код товара: 0123565447</div>
                {!forOrder?
                    <div className='propsCardList'><PropsCardIcons/></div>
                :null}
                {!forOrder?  
                    <div className="tyresCardCountryList"><FlagsIcon/></div>
                :null}
                <div className='priceAndBtnCard'>
                    <div className="tyresCardPriceList">2005 UAH</div>
                    {!forOrder?
                     <ButtonAction props={"КУПИТИ"} widthBtn={160} eventItem={undefined}/>   
                    : <CountBtnOrder countGoods={4}/>}         
                </div>      
            </div>
        </div>
       
    );
};

export default TyresCardList;