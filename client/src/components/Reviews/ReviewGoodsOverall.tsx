import React from 'react';
import '../../css/Reviews/ReviewGoodsOverall.css';
import Rating from '../ux/Rating';
import RatingOptions from '../ux/RatingOptions';
import { IReviewGoodsOverall } from './interfaces/ReviewGoodsOverall.interface';
import { useTranslation } from 'react-i18next';

const ReviewGoodsOverall = (
    {ratingsModel, reviewCount, typeGoods}:IReviewGoodsOverall) => {
    const { t, i18n } = useTranslation();
    
    return (
        <div className='reviewGoodsOverall'>
            <div className="headingGoodsOverall">
                <span className='headerGoodsOverall'>{t('reviewGoodsOverall.rating_model')}</span>
                <RatingOptions 
                    nameRating={''}
                >
                    <Rating 
                        numScore={ratingsModel?.avgRatingModel ?? 0}
                        disabled={true}
                    />    
                </RatingOptions>
                <p>{t('reviewGoodsOverall.avarage_score')} { reviewCount ?? 0} {t('reviewGoodsOverall.reviews')}</p>
            </div>
            { typeGoods ?
            <div className='ratingList'>
                <div className='ratingListItems'>
                    <RatingOptions 
                        nameRating={t('reviewGoodsOverall.controll_grip')}
                    >
                        <Rating 
                        numScore={ratingsModel?.avgRatingDryRoad ?? 0}
                        disabled={true}
                    />
                    </RatingOptions>
                </div>
                <div className='ratingListItems'>
                    <RatingOptions 
                        nameRating={t('reviewGoodsOverall.controll_wet')} 
                    >
                    <Rating 
                    numScore={ratingsModel?.avgRatingWetRoad ?? 0}
                    disabled={true}
                />
                </RatingOptions>
                </div>
                <div className='ratingListItems'>
                    <RatingOptions 
                        nameRating={t('reviewGoodsOverall.controll_snow')} 
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
                        nameRating={t('reviewGoodsOverall.conrtoll_ice')} 
                    >
                    <Rating 
                    numScore={ratingsModel?.avgRatingIceRoad ?? 0}
                    disabled={true}
                />
                </RatingOptions>
                </div>
                <div className='ratingListItems'>
                    <RatingOptions 
                        nameRating={t('reviewGoodsOverall.traction')} 
                    >
                    <Rating 
                    numScore={ratingsModel?.avgRatingCrossCountry ?? 0}
                    disabled={true}
                />
                </RatingOptions>
                </div>
                <div className='ratingListItems'>
                    <RatingOptions 
                        nameRating={t('reviewGoodsOverall.thearweard')}
                    >
                    <Rating 
                    numScore={ratingsModel?.avgRatingTreadwear ?? 0}
                    disabled={true}
                />
                </RatingOptions>
                </div>
                <div className='ratingListItems'>
                    <RatingOptions 
                        nameRating={t('reviewGoodsOverall.price_quality')}
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