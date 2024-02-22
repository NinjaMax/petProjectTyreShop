import React, { Fragment } from 'react';
import '../../css/CardsCss/TyreCardSmall.css';
import ButtonAction from '../buttons/ButtonAction';
import Rating from '../ux/Rating';
import { createStringUrl } from '../../services/stringUrl';
import { useHistory } from 'react-router-dom';
import { MAIN_ROUTE } from '../../utils/consts';
import { useTranslation } from 'react-i18next';

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
            id_storage: number,
            id_supplier: number,
        },];
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
    const { t, i18n } = useTranslation();

    const addGoodsId = () => {
        const toStringUrl = createStringUrl(product?.full_name);
        localStorage.setItem('goodsId', JSON.stringify(product?.id));
        history.push(
            MAIN_ROUTE + `${toStringUrl}`
        );
    };
    
    const restStock: number = product?.price ? product?.price?.reduce((sum: any, current: any) => sum + current.price, 0) : null; 
    
    return (
        <div className='tyreCardSmall'>
            <div>
                {product?.tyre_brand ?
                    <a
                        className='tyresSmallLinkProduct'
                        onClick={addGoodsId} 
                        href={i18n.resolvedLanguage === 'uk' ? '/' + createStringUrl(product?.full_name) : '/ru/' + createStringUrl(product?.full_name)}
                    >
                        <img 
                            id='imgTyresSmall' 
                            src={'/tyre/autotyrespilotspotps2.webp'} 
                            loading='lazy'
                            alt="tyreSmall" 
                        />
                    </a>
                    : null
                }
                {product?.wheel_brand ?
                    <a
                        className='tyresSmallLinkProduct'
                        onClick={addGoodsId} 
                        href={i18n.resolvedLanguage === 'uk' ? '/' + createStringUrl(product?.full_name) : '/ru/' + createStringUrl(product?.full_name)}
                    >
                        <img 
                            id='imgTyresSmall' 
                            src={'/tyre/autotyrespilotspotps2.webp'} 
                            loading='lazy'
                            alt="tyreSmall" 
                        />
                    </a>
                    : null
                }

                <p/>
                <div className='tyresNameSmall'>
                <a
                    className='tyresSmallLinkProduct'
                    onClick={addGoodsId} 
                    href={i18n.resolvedLanguage === 'uk' ? '/' + createStringUrl(product?.full_name) : '/ru/' + createStringUrl(product?.full_name)}
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
                {product?.price ?
                <>
                {product?.price && product?.price?.find((entity: any) => entity.id_storage === 2) ? 
                    product?.price?.map((item: any) => (
                    <Fragment key={item.id}>
                    {item?.price && !item?.old_price && item.id_storage === 2 ?
                    <div className="tyresCardPriceSmall">
                        {item.price} &#8372;
                    </div> :
                    null
                    }
                    {item?.price && item?.old_price && item.id_storage === 2 ?
                    <div className="tyresCardPriceSmall">
                    <div className="tyresCardOldPrice">
                        {item.old_price} &#8372;
                    </div> 
                    <div >
                        {item.price} &#8372;
                    </div>
                    </div>
                    : null
                    } 
                    </Fragment>
                  ))
                  : 
                  product?.price.map((item: any) => (
                    <Fragment key={item.id}>
                    {item.price && item.price.id_storage !== 2 ?
                    <div className="tyresCardPriceSmall">
                        {item.price} &#8372;
                    </div> :
                        null
                    }
                    {item.old_price && item.price.id_storage !== 2 ?
                    <div className="tyresCardOldPrice">
                        {item.old_price} &#8372;
                    </div> 
                    : null
                    } 
                    </Fragment>
                  ))
                }
                {restStock === 0 ? 
                    <div className="tyresCardPriceSmall">
                        немає в наявності
                    </div>
                    : null 
                }
                </>
                : null
                }
                {restStock ?
                    <ButtonAction 
                        props={t('card.buy')} 
                        widthBtn={180} 
                        eventItem={() => checkOrders!(
                            product, 
                            rating,
                            product?.price.find((entity: any) => entity.id_storage === 2) ?
                            2 : 1,
                            product?.price.find((entity: any) => entity.id_storage === 2) ?
                            product?.price.findIndex((entity: any) => entity.id_storage === 2) :
                            product?.price.findIndex((entity: any) => entity.id_storage === 1)
                        )}
                    />
                    : 
                    <ButtonAction 
                        props={t('card.no')} 
                        widthBtn={180} 
                        eventItem={checkOrders}
                        active={true}
                    />
                }
                <p/>    
            </div>
            <p/> 
        </div>
    );
};

export default CardSmall;