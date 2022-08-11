import React from 'react';
import '../../css/Reviews/ReviewGoodsExtend.css';
import Rating from '../UX/Rating';
import RatingOptions from '../UX/RatingOptions';

const ReviewsGoodsExtend = () => {
    const avarageRating = 4.5;
    const avarageReviews = 254;

    return (
        <div >
            <div className="heading">Рейтинг <span>{avarageRating}</span>
                <Rating/>
                <p> середня оцінка основана на {avarageReviews} відгуках.</p>
            </div>
            <div className='ratingList'>
                <div className='ratingListItems'>
                    <RatingOptions nameRating={'Бренд'} numScore={4.5}/>
                </div>
                <div className='ratingListItems'>
                    <RatingOptions nameRating={'Керованість на сухій дорозі'} numScore={4.5}/>
                </div>
                <div className='ratingListItems'>
                    <RatingOptions nameRating={'Керованість на мокрій дорозі'} numScore={4.5}/>
                </div>
                <div className='ratingListItems'>
                    <RatingOptions nameRating={'Керованість на снігу'} numScore={4.5}/>
                </div>
                <div className='ratingListItems'>
                    <RatingOptions nameRating={'Керованість на льду'} numScore={4.5}/>
                </div>
                <div className='ratingListItems'>
                    <RatingOptions nameRating={'Проходимість'} numScore={4.5}/>
                </div>
                <div className='ratingListItems'>
                    <RatingOptions nameRating={'Зносостійкість'} numScore={4.5}/>
                </div>
                <div className='ratingListItems'>
                    <RatingOptions nameRating={'Ціна/Якість'} numScore={4.5}/>
                </div>
            </div>
        </div>
    );
};

export default ReviewsGoodsExtend;