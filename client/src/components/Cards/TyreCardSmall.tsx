import React, { Fragment } from 'react';
import '../../css/CardsCss/TyreCardSmall.css';
import ButtonAction from '../buttons/ButtonAction';
import tyres from '../../assets/autotyrespilotspotps2.png';

interface IProductSmall {
    product?: {
        full_name: string;
        price: [{
            price_wholesale: number;
            price: number;
            delivery_price: number;
            price_plus_delivery: number;
        }];
    };
}

const TyreCardSmall = ({product}:IProductSmall) => {

    return (
        <div className='tyreCardSmall'>
            <div>
                <img id='imgTyresSmall' src={tyres} alt="tyreSmall" />
                <p/>
                <div className='tyresNameSmall'>{product?.full_name}</div>
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
                        eventItem={undefined}
                    />
                    : 
                    <ButtonAction 
                        props={"КУПИТИ"} 
                        widthBtn={180} 
                        eventItem={undefined}
                        active={false}
                    />
                }
                <p/>    
            </div>
            <p/> 
        </div>
    );
};

export default TyreCardSmall;