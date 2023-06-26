import React, { Fragment } from 'react';
import '../../css/CardsCss/TyresCardList.css';
import FlagsIcon from './FlagsIcon';
import PropsCardIcons from './PropsCardIcons';
import Rating from '../ux/Rating';
import tyres from '../../assets/autotyrespilotspotps2.png';
import ButtonAction from '../buttons/ButtonAction';
import CountBtnOrder from '../ux/CountBtnOrder';
import { ITyreCard } from './interfaces/tyreCard.interface';
import { NavLink } from 'react-router-dom';

// interface ITyreCardList {
//     forOrder?: boolean;
// }

const TyresCardList = ({goods, forOrder}: ITyreCard) => {
    return (
        <div className="tyresCardList">
            <img id='imgTyresList' src={tyres} alt="John" />
            <div className='tyresCardListBox'>    
                <NavLink 
                    id='nameCardList' 
                    to={`${goods?.full_name?.toLowerCase().replace(/ /g, "-")}`}>
                    {goods?.full_name}
                </NavLink>
                <div className='ratingTyresList'><Rating numScore={4.8}/><a className='reviewLink' href='/#'>0 отзывов</a></div>
                <div className="tyresCardCodeList">
                    код товара: {goods?.id}
                </div>
                {!forOrder?
                    <div className='propsCardList'>
                        <PropsCardIcons
                            type={goods?.vehicle_type}
                            season={goods?.season}
                        />
                    </div>
                :null}
                {!forOrder?  
                    <div className="tyresCardCountryList">
                        <FlagsIcon
                            country={goods?.country} 
                            year={goods?.year}
                        />
                    </div>
                :null}
                <div className='priceAndBtnCard'>
                    <div className="tyresCardPriceList">
                    {goods?.price ? goods?.price.map((item: any) => (
                    <Fragment key={item.id}>
                    {item.price ?
                    <div className="tyresCardPriceItem" >
                        {item.price} &#8372;
                    </div> :
                    <div className="tyresCardPriceItem">
                        немає в наявності
                    </div>  
                    }
                    {item.old_price ?
                    <div className="tyresCardOldPriceItem" >
                        {item.old_price} &#8372;
                    </div> 
                    : null
                    } 
                    </Fragment>
                  ))
                  : <div className="tyresCardPriceItem">
                        немає в наявності
                    </div> 
                }
                    </div>
                    {!forOrder?
                     <ButtonAction props={"КУПИТИ"} widthBtn={160} eventItem={undefined}/>   
                    : <CountBtnOrder countGoods={4}/>}         
                </div>      
            </div>
        </div>
       
    );
};

export default TyresCardList;