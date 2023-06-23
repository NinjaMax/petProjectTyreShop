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

const TyresCard = observer(({goods, optionsBox, checkOrders}:ITyreCard) => {
    const {page} = useContext<any>(Context);
    const history = useHistory();
    const goodsItem = useParams();
    const location = useLocation();
    let match = useRouteMatch('/:goodsItem');
    
   
    const addGoodsId = () => {
        //page.setId(goods?.id);
        localStorage.setItem('goodsId', JSON.stringify(goods?.id));
        history.push(MAIN_ROUTE + `${goods?.full_name.toLowerCase().replace(/ /g, "-")}`);
    }
    
    const cyrillicToTranslit = new (CyrillicToTranslit as any)();
    const goodItem = 'Michelin X Force ZL (ZL) MPT (ведущая) 335/80 R20 150K (шип)';
    const createArray = goodItem.split('');
    const indexBraketLeft = goodItem.split('').findIndex(item => item ==='(');
    createArray.splice(indexBraketLeft, 1);
    const indexBraketRight = createArray.findIndex(item => item ===')');
    //console.log(indexBraketRight);
    createArray.splice(indexBraketRight, 1);
    const exampleParam = createArray.join('');
    const exampleCyr = 
    cyrillicToTranslit.transform(
        exampleParam , '-'
        ).toLowerCase().replace(/[/()]/g, "-");
    console.log(exampleCyr);
    // console.log(exampleParam);
    // console.log(location);

    return (
        <div className="tyresCard">
            <div >
                <img id='imgTyres' src={tyres} alt="imgCards" />
                <p/>
                <div className='tyresCardLinkName'>
                <NavLink id='tyresName'
                    onClick={addGoodsId} 
                    to={`${goods?.full_name?.toLowerCase().replace(/ /g, "-")}`}
                >
                    {goods?.full_name}
                </NavLink>
                </div>
                <div className='ratingTyres'><Rating numScore={4.8}/><a className='reviewCard' href='/#'>0 отзывов</a></div>
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
                    <div className="tyresCardPrice" >
                        {item.price} &#8372;
                    </div> :
                    <div className="tyresCardPrice">
                        немає в наявності
                    </div>  
                    }
                    {item.old_price ?
                    <div className="tyresCardOldPrice" >
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