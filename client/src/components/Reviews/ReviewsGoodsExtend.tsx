import React from 'react';
import '../../css/Reviews/ReviewGoodsExtend.css';
import Rating from '../ux/Rating';
import RatingOptions from '../ux/RatingOptions';
import { IRatingAvg } from '../../pages/types/RatingModelAvg.type';

type IRatingExtend = {
    ratingItem?: IRatingAvg
};

const ReviewsGoodsExtend = ({ratingItem}:IRatingExtend) => {
    
    return (
        <div>
            <div className="heading">Рейтинг
                <Rating 
                    numScore={ratingItem?.avgRatingModel ?? 0}
                    nameRating={'Расширенние'}
                    disabled={true}
                />
            </div>
            <div className='ratingList'>
                <div className='ratingListItems'>
                    <RatingOptions 
                        nameRating={'Керованість на сухій дорозі'} 
                    >
                    <Rating 
                        numScore={ratingItem?.avgRatingDryRoad ?? 0}
                        disabled={true}
                    /> 
                     </RatingOptions> 
                </div>
                <div className='ratingListItems'>
                    <RatingOptions 
                        nameRating={'Керованість на мокрій дорозі'} 
                    >
                    <Rating 
                        numScore={ratingItem?.avgRatingWetRoad ?? 0}
                        disabled={true}
                    /> 
                    </RatingOptions> 
                </div>
                <div className='ratingListItems'>
                    <RatingOptions 
                        nameRating={'Керованість на снігу'}
                    >
                    <Rating 
                        numScore={ratingItem?.avgRatingSnowRoad ?? 0}
                        disabled={true}
                    /> 
                    </RatingOptions> 
                </div>
                <div className='ratingListItems'>
                    <RatingOptions 
                        nameRating={'Керованість на льду'}
                    >
                    <Rating 
                        numScore={ratingItem?.avgRatingIceRoad ?? 0}
                        disabled={true}
                    /> 
                    </RatingOptions> 
                </div>
                <div className='ratingListItems'>
                    <RatingOptions 
                        nameRating={'Проходимість'}
                    >
                    <Rating 
                        numScore={ratingItem?.avgRatingCrossCountry ?? 0}
                        disabled={true}
                    /> 
                    </RatingOptions> 
                </div>
                <div className='ratingListItems'>
                    <RatingOptions 
                        nameRating={'Зносостійкість'}
                    >
                    <Rating 
                        numScore={ratingItem?.avgRatingTreadwear ?? 0}
                        disabled={true}
                    /> 
                    </RatingOptions> 
                </div>
                <div className='ratingListItems'>
                    <RatingOptions 
                        nameRating={'Ціна/Якість'} 
                    >
                    <Rating 
                        numScore={ratingItem?.avgRatingPriceQuality ?? 0}
                        disabled={true}
                    /> 
                    </RatingOptions> 
                </div>
            </div>
        </div>
    );
};

export default ReviewsGoodsExtend;