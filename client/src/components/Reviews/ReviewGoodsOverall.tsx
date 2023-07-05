import React from 'react';
import '../../css/Reviews/ReviewGoodsOverall.css';
import Rating from '../ux/Rating';
import RatingOptions from '../ux/RatingOptions';
import { IReviewGoods } from './interfaces/ReviewGoods.interface';
//{reviewItem}: IReviewGoods
const ReviewGoodsOverall = () => {

    return (
        <div className='reviewGoodsOverall'>
            <div className="headingGoodsOverall">
                <span className='headerGoodsOverall'>Рейтинг моделі</span>
                <RatingOptions 
                        nameRating={''}
                >
                    <Rating 
                    numScore={5}
                    disabled={true}
                    />    
                </RatingOptions>
                
                <p> середня оцінка основана на { ''} відгуках.</p>
            </div>
            <div className='ratingList'>
                <div className='ratingListItems'>
                    <RatingOptions 
                        nameRating={'Бренд'}
                    >
                    <Rating 
                    numScore={4}
                    disabled={true}
                />
                </RatingOptions>
                </div>
                <div className='ratingListItems'>
                    <RatingOptions 
                        nameRating={'Керованість на сухій дорозі'}
                    >
                        <Rating 
                        numScore={1}
                        disabled={true}
                    />
                    </RatingOptions>
                </div>
                <div className='ratingListItems'>
                    <RatingOptions 
                        nameRating={'Керованість на мокрій дорозі'} 
                    >
                    <Rating 
                    numScore={1}
                    disabled={true}
                />
                </RatingOptions>
                </div>
                <div className='ratingListItems'>
                    <RatingOptions 
                        nameRating={'Керованість на снігу'} 
                    >
                    <Rating 
                    numScore={1}
                    disabled={true}
                />
                </RatingOptions>
                </div>
            </div>
            <div className='ratingList'>
                <div className='ratingListItems'>
                    <RatingOptions 
                        nameRating={'Керованість на льду'} 
                    >
                    <Rating 
                    numScore={1}
                    disabled={true}
                />
                </RatingOptions>
                </div>
                <div className='ratingListItems'>
                    <RatingOptions 
                        nameRating={'Проходимість'} 
                    >
                    <Rating 
                    numScore={1}
                    disabled={true}
                />
                </RatingOptions>
                </div>
                <div className='ratingListItems'>
                    <RatingOptions 
                        nameRating={'Зносостійкість'}
                    >
                    <Rating 
                    numScore={1}
                    disabled={true}
                />
                </RatingOptions>
                </div>
                <div className='ratingListItems'>
                    <RatingOptions 
                        nameRating={'Ціна/Якість'}
                    >
                    <Rating 
                    numScore={1}
                    disabled={true}
                />
                </RatingOptions>
                </div>
            </div>
        </div>
    );
};

export default ReviewGoodsOverall;