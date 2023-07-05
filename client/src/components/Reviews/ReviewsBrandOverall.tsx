import React from 'react';
import '../../css/Reviews/ReviewsBrandOverall.css';
import Rating from '../ux/Rating';
import brandImg from '../../assets/img/continental_logo.png';
import RatingOptions from '../ux/RatingOptions';


const ReviewsBrandOverall = () => {
    const avarageReviews = 251;
    const numberScore = 4.8;
    const brandName = 'Continental';
    return (
        
        <div className="reviewsBrand">
            <div className='reviewBrandList'>
                <h5>Рейтинг бренда</h5><h6>{brandName}</h6><img src={brandImg} alt='brandImg'/>
                <Rating 
                    numScore={4.8}
                    disabled={true}
                /> 
                <span>середня оцінка основана на {avarageReviews} відгуках.</span>  
            </div>
            <div className='reviewBrandList'>
                <RatingOptions 
                    nameRating={'середня оцінка Зимових моделей'}
                >
                <Rating 
                    numScore={4.8}
                    disabled={true}
                /> 
                </RatingOptions> 
                <span>основана на {avarageReviews} відгуках.</span>
            </div>
            <div className='reviewBrandList'>
                <RatingOptions 
                    nameRating={'середня оцінка Літніх моделей'}
                    >
                    <Rating 
                        numScore={4.8}
                        disabled={true}
                    /> 
                    </RatingOptions> 
                <span>основана на {avarageReviews} відгуках.</span>
            </div>
        </div>
        
    );
};

export default ReviewsBrandOverall;