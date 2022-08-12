import React from 'react';
import '../../css/Reviews/ReviewsBrandOverall.css';
import Rating from '../UX/Rating';
import brandImg from '../../assets/img/continental_logo.png';


const ReviewsBrandOverall = () => {
    const avarageReviews = 251;
    return (
        
        <div className="reviewsBrand">Рейтинг бренда <img src={brandImg} alt='brandImg'/>
            <Rating numScore={4.8}/>
            <p> середня оцінка основана на {avarageReviews} відгуках.</p>
            <p>середня оцінка Зимових моделей <Rating numScore={4.8}/> основана на {avarageReviews} відгуках.</p>
            <p>середня оцінка Літніх моделей <Rating numScore={4.8}/> основана на {avarageReviews} відгуках.</p>
        </div>
        
    );
};

export default ReviewsBrandOverall;