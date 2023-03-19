import React from 'react';
import '../../css/Reviews/ReviewGoodsOverall.css';
import Rating from '../UX/Rating';
import RatingOptions from '../UX/RatingOptions';

const ReviewGoodsOverall = () => {
    const overAllRating = 4.7;
    const avarageReviews = 254;
    const numberScore = 4.6;

    return (
        <div className='reviewGoodsOverall'>
            <div className="headingGoodsOverall">
                <span className='headerGoodsOverall'>Рейтинг моделі</span>
                <Rating numScore={overAllRating}/>
                <p> середня оцінка основана на {avarageReviews} відгуках.</p>
            </div>
            <div className='ratingList'>
                <div className='ratingListItems'>
                    <RatingOptions nameRating={'Бренд'} numScore={numberScore}/>
                </div>
                <div className='ratingListItems'>
                    <RatingOptions nameRating={'Керованість на сухій дорозі'} numScore={numberScore}/>
                </div>
                <div className='ratingListItems'>
                    <RatingOptions nameRating={'Керованість на мокрій дорозі'} numScore={numberScore}/>
                </div>
                <div className='ratingListItems'>
                    <RatingOptions nameRating={'Керованість на снігу'} numScore={numberScore}/>
                </div>
            </div>
            <div className='ratingList'>
                <div className='ratingListItems'>
                    <RatingOptions nameRating={'Керованість на льду'} numScore={numberScore}/>
                </div>
                <div className='ratingListItems'>
                    <RatingOptions nameRating={'Проходимість'} numScore={numberScore}/>
                </div>
                <div className='ratingListItems'>
                    <RatingOptions nameRating={'Зносостійкість'} numScore={numberScore}/>
                </div>
                <div className='ratingListItems'>
                    <RatingOptions nameRating={'Ціна/Якість'} numScore={numberScore}/>
                </div>
            </div>
        </div>
    );
};

export default ReviewGoodsOverall;