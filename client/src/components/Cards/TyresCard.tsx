import React, { Fragment, useContext } from 'react';
import '../../css/CardsCss/TyresCard.css';
import FlagsIcon from './FlagsIcon';
import PropsCardIcons from './PropsCardIcons';
import Rating from '../ux/Rating';
import OptionsTyreBox from './OptionsTyreBox';
import tyres from '../../assets/autotyrespilotspotps2.png';
import ButtonAction from '../buttons/ButtonAction';
import { ITyreCard } from './interfaces/tyreCard.interface';
import CyrillicToTranslit from 'cyrillic-to-translit-js';
import { GOODS_ROUTE, MAIN_ROUTE } from '../../utils/consts';
import { Link, NavLink, useHistory, useLocation, useParams, useRouteMatch } from 'react-router-dom';
import { Context } from '../../context/Context';
import { observer } from 'mobx-react-lite';
import { createStringUrl } from '../../services/stringUrl';

const TyresCard = observer(({goods, optionsBox, checkOrders}:ITyreCard) => {
    const {page} = useContext<any>(Context);
    const history = useHistory();
    const goodsItem = useParams();
    const location = useLocation();
    let match = useRouteMatch('/:goodsItem');
    
    const addGoodsId = () => {
        const toStringUrl = createStringUrl(goods?.full_name);
        localStorage.setItem('goodsId', JSON.stringify(goods?.id));
        history.push(
            MAIN_ROUTE + `${toStringUrl}`
        );
    }

    return (
        <div className="tyresCard">
            <div >
                <img id='imgTyres' src={tyres} alt="imgCards" />
                <p/>
                <div className='tyresCardLinkName'>
                <a id='tyresName'
                    onClick={addGoodsId} 
                    href={createStringUrl(goods?.full_name)}
                >
                    {goods?.full_name}
                </a>
                </div>
                <div className='ratingTyres'>
                    <Rating 
                        numScore={4.8}
                        disabled={true}
                        nameRating='Карта товара'
                    />
                    <a className='reviewCard' href='/#'>0 отзывов</a></div>
                <div className="tyresCardCode">код товара: {goods?.id}</div>
                <div className='propsCard'>
                    <PropsCardIcons
                        type={goods?.vehicle_type}
                        season={goods?.season}
                    />
                </div>
                <div className="tyresCardCountry">
                    <FlagsIcon 
                        country={goods?.country} 
                        year={goods?.year}
                    />
                </div>
                {goods?.price ? goods?.price.map((item: any) => (
                    <Fragment key={item.id}>
                    {item.price ?
                    <div className="tyresCardPrice">
                        {item.price} &#8372;
                    </div> :
                    <div className="tyresCardPrice">
                        немає в наявності
                    </div>  
                    }
                    {item.old_price ?
                    <div className="tyresCardOldPrice">
                        {item.old_price} &#8372;
                    </div> 
                    : null
                    } 
                    </Fragment>
                  ))
                  : <div className="tyresCardPrice">
                        немає в наявності
                    </div> 
                }
                { goods?.price[0].price ?
                    <ButtonAction 
                        props={"КУПИТИ"} 
                        widthBtn={260} 
                        eventItem={checkOrders}
                    />
                    : 
                    <ButtonAction 
                        props={"КУПИТИ"} 
                        widthBtn={260} 
                        eventItem={checkOrders}
                        active={false}
                    />
                }
                <p/>    
            </div>
            { optionsBox ?
                <OptionsTyreBox character={goods}/>
            :null}
            <p/>     
        </div>
    );
});

export default TyresCard;