import React from 'react';
import '../../css/Reviews/ReviewGoodsOverall.css';
import Rating from '../ux/Rating';
import RatingOptions from '../ux/RatingOptions';
import { IReviewGoodsOverall } from './interfaces/ReviewGoodsOverall.interface';

const ReviewGoodsOverall = (
    {ratingsModel, reviewCount, typeGoods}:IReviewGoodsOverall) => {
    return (
        <div className='reviewGoodsOverall'>
            <div className="headingGoodsOverall">
                <span className='headerGoodsOverall'>Рейтинг моделі</span>
                <RatingOptions 
                        nameRating={''}
                >
                    <Rating 
                    numScore={ratingsModel?.avgRatingModel ?? 0}
                    disabled={true}
                    />    
                </RatingOptions>
                <p> середня оцінка на основі { reviewCount ?? 0} відгуків.</p>
            </div>
            { typeGoods ?
            <div className='ratingList'>
                <div className='ratingListItems'>
                    <RatingOptions 
                        nameRating={'Керованість на сухій дорозі'}
                    >
                        <Rating 
                        numScore={ratingsModel?.avgRatingDryRoad ?? 0}
                        disabled={true}
                    />
                    </RatingOptions>
                </div>
                <div className='ratingListItems'>
                    <RatingOptions 
                        nameRating={'Керованість на мокрій дорозі'} 
                    >
                    <Rating 
                    numScore={ratingsModel?.avgRatingWetRoad ?? 0}
                    disabled={true}
                />
                </RatingOptions>
                </div>
                <div className='ratingListItems'>
                    <RatingOptions 
                        nameRating={'Керованість на снігу'} 
                    >
                    <Rating 
                    numScore={ratingsModel?.avgRatingSnowRoad ?? 0}
                    disabled={true}
                />
                </RatingOptions>
                </div>
            </div>
            : null
            }
            { typeGoods ?
            <div className='ratingList'>
                <div className='ratingListItems'>
                    <RatingOptions 
                        nameRating={'Керованість на льду'} 
                    >
                    <Rating 
                    numScore={ratingsModel?.avgRatingIceRoad ?? 0}
                    disabled={true}
                />
                </RatingOptions>
                </div>
                <div className='ratingListItems'>
                    <RatingOptions 
                        nameRating={'Проходимість'} 
                    >
                    <Rating 
                    numScore={ratingsModel?.avgRatingCrossCountry ?? 0}
                    disabled={true}
                />
                </RatingOptions>
                </div>
                <div className='ratingListItems'>
                    <RatingOptions 
                        nameRating={'Зносостійкість'}
                    >
                    <Rating 
                    numScore={ratingsModel?.avgRatingTreadwear ?? 0}
                    disabled={true}
                />
                </RatingOptions>
                </div>
                <div className='ratingListItems'>
                    <RatingOptions 
                        nameRating={'Ціна/Якість'}
                    >
                    <Rating 
                    numScore={ratingsModel?.avgRatingPriceQuality ?? 0}
                    disabled={true}
                />
                </RatingOptions>
                </div>
            </div>
            : null
            }
        </div>
    );
};

export default ReviewGoodsOverall;