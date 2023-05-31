import React from 'react';
import '../../css/CardsCss/TyresCard.css';
import FlagsIcon from './FlagsIcon';
import PropsCardIcons from './PropsCardIcons';
import Rating from '../ux/Rating';
import OptionsTyreBox from './OptionsTyreBox';
import tyres from '../../assets/autotyrespilotspotps2.png';
import ButtonAction from '../buttons/ButtonAction';
import { ITyreCard } from './interfaces/tyreCard.interface';
import { GOODS_ROUTE } from '../../utils/consts';
import { useHistory } from 'react-router-dom';

const TyresCard = ({goods, optionsBox, checkOrders}:ITyreCard) => {
    const history = useHistory();
    return (
        <div className="tyresCard">
            <div >
                <img id='imgTyres' src={tyres} alt="imgCards" /><p/>
                <a id='tyresName'
                    // onClick={() => history.push(GOODS_ROUTE +
                    // goods?.full_name.toLowerCase().replace(/ /g, "-"))} 
                    href={"/" + 
                    goods?.full_name.toLowerCase().replace(/ /g, "-")}
                >
                    {goods?.full_name}
                </a>
                <div className='ratingTyres'><Rating numScore={4.8}/><a className='reviewCard' href='/#'>0 отзывов</a></div>
                <div className="tyresCardCode">код товара: {goods?.id}</div>
                <div className='propsCard'><PropsCardIcons/></div>
                <div className="tyresCardCountry">
                    <FlagsIcon 
                        country={goods?.country} 
                        year={goods?.year}
                    />
                </div>
                {goods?.price ? goods?.price.map((item: any) => (
                    <div className="tyresCardPrice" key={item.id}>
                        {item.price} UAH
                    </div> 
                  ))
                  : <span>0</span>
                }
                    <div className="tyresCardOldPrice" >
                        5000 UAH
                    </div> 
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