import React, { Fragment } from 'react';
import '../../css/CardsCss/TyresCard.css';
import FlagsIcon from './FlagsIcon';
import PropsCardIcons from './PropsCardIcons';
import Rating from '../ux/Rating';
import OptionsTyreBox from './OptionsTyreBox';
import tyres from '../../assets/autotyrespilotspotps2.png';
import ButtonAction from '../buttons/ButtonAction';
import { ITyreCard } from './interfaces/tyreCard.interface';
import CyrillicToTranslit from 'cyrillic-to-translit-js';
import { GOODS_ROUTE } from '../../utils/consts';
import { Link, useHistory } from 'react-router-dom';

const TyresCard = ({goods, optionsBox, checkOrders}:ITyreCard) => {
    const history = useHistory();

    const cyrillicToTranslit = new (CyrillicToTranslit as any)();
    const exampleCyr = 
    cyrillicToTranslit.transform(
        'Michelin X-Ice Snow SUV 245/60 R18 105T XL (шип)', '-'
        ).toLowerCase();
        //replace(/[()]/g, "-")
    console.log(exampleCyr);

    return (
        <div className="tyresCard">
            <div >
                <img id='imgTyres' src={tyres} alt="imgCards" /><p/>
                <a id='tyresName'
                    // onClick={ history.push(GOODS_ROUTE +
                    //  goods?.full_name.toLowerCase().replace(/ /g, "-"))} 
                    href={`/${goods?.full_name.toLowerCase().replace(/ /g, "-")}`}
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
                    <Fragment key={item.id}>
                    <div className="tyresCardPrice" >
                        {item.price} &#8372;
                    </div>
                    {item.old_price ?
                    <div className="tyresCardOldPrice" >
                        {item.old_price} &#8372;
                    </div> 
                    : null
                    } 
                    </Fragment>
                  ))
                  : <span> немає в наявності </span>
                }
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