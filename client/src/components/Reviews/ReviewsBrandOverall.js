import React from 'react';
import '../../css/Reviews/ReviewsBrandOverall.css';
import Rating from '../UX/Rating';
import brandImg from '../../assets/img/continental_logo.png';


const ReviewsBrandOverall = () => {
    const avarageReviews = 251;
    const brandName = 'Continental';
    return (
        
        <div className="reviewsBrand">
            <div>
                Рейтинг бренда {brandName}<img src={brandImg} alt='brandImg'/>
                <Rating numScore={4.8}/> 
                <span>середня оцінка основана на {avarageReviews} відгуках.</span>  
            </div>
            <span>середня оцінка Зимових моделей </span> <Rating numScore={4.8}/> <span>основана на {avarageReviews} відгуках.</span>
            <span>середня оцінка Літніх моделей</span> <Rating numScore={4.8}/> <span>основана на {avarageReviews} відгуках.</span>
        </div>
        
    );
};

export default ReviewsBrandOverall;