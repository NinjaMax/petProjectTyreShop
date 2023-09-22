import React, { Fragment } from 'react';
import '../../css/CardsCss/TyreCardSmall.css';
import ButtonAction from '../buttons/ButtonAction';
import tyres from '../../assets/autotyrespilotspotps2.png';
import Rating from '../ux/Rating';
import { createStringUrl } from '../../services/stringUrl';
import { useHistory } from 'react-router-dom';
import { MAIN_ROUTE } from '../../utils/consts';

interface IProductSmall {
    product?: {
        id: string;
        full_name: string;
        full_name_color: string;
        price: [{
            price_wholesale: number;
            price: number;
            delivery_price: number;
            price_plus_delivery: number;
        }];
        tyre_brand: {
            id_brand: number; 
            brand: string;
        };
        wheel_brand: {
            id_brand: number; 
            brand: string;
        };
    };
    rating?: {
        avgRatingModel: number;
    };
    checkOrders?(arg0: any, ...arg:any[]): Promise<void | undefined>;
}

const CardSmall = ({product, rating, checkOrders}:IProductSmall) => {
    const history = useHistory();

    const addGoodsId = () => {
        const toStringUrl = createStringUrl(product?.full_name);
        localStorage.setItem('goodsId', JSON.stringify(product?.id));
        history.push(
            MAIN_ROUTE + `${toStringUrl}`
        );
    };

    return (
        <div className='tyreCardSmall'>
            <div>
                {product?.tyre_brand ?
                    <a
                        className='tyresSmallLinkProduct'
                        onClick={addGoodsId} 
                        href={'/' + createStringUrl(product?.full_name)}
                    >
                        <img id='imgTyresSmall' src={tyres} alt="tyreSmall" />
                    </a>
                    : null
                }
                {product?.wheel_brand ?
                    <a
                        className='tyresSmallLinkProduct'
                        onClick={addGoodsId} 
                        href={'/' + createStringUrl(product?.full_name)}
                    >
                        <img id='imgTyresSmall' src={tyres} alt="tyreSmall" />
                    </a>
                    : null
                }

                <p/>
                <div className='tyresNameSmall'>
                <a
                    className='tyresSmallLinkProduct'
                    onClick={addGoodsId} 
                    href={'/' + createStringUrl(product?.full_name)}
                >
                {product?.tyre_brand ?    
                    product?.full_name
                    : null
                }
                {product?.wheel_brand ?    
                    product?.full_name_color
                    : null
                }
                </a>
                </div>
                <div className='tyresRatingSmall'>
                <Rating 
                    id={product?.id}
                    numScore={rating?.avgRatingModel ?? 0}
                    disabled={true}
                    nameRating='Карта товара'
                />   
                </div>
                {product?.price ? product?.price.map((item: any) => (
                    <Fragment key={item.id}>
                    {item.price ?
                    <div className="tyresCardPriceSmall">
                        {item.price} &#8372;
                    </div> :
                    <div className="tyresCardPriceSmall">
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
                  : <div className="tyresCardPriceSmall">
                        немає в наявності
                    </div> 
                }
                {product?.price ?
                    <ButtonAction 
                        props={"КУПИТИ"} 
                        widthBtn={180} 
                        eventItem={() => checkOrders!(product, rating)}
                    />
                    : 
                    <ButtonAction 
                        props={"КУПИТИ"} 
                        widthBtn={180} 
                        eventItem={checkOrders}
                        active={false}
                    />
                }
                <p/>    
            </div>
            <p/> 
        </div>
    );
};

export default CardSmall;