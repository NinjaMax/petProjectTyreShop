import React from 'react';
import storeLogo from '../../assets/logoShop/logoSkyshina151_50clear.png';
import '../../css/Reviews/ReviewAnswer.css';

const ReviewAnswer = () => {
    return (
        <div className='answerBox'>
            
            
            <div className='answerShopName'>
                <img id='answerStoreLogo' src={storeLogo} alt='storeLogo'/>
                SKYSHINA
            </div> 
            <div className='answerDate'>14.07.2022</div>
            <div className='answerContent'>
                Дякуємо за відгук і що вибрали наш магазин!
                Дякуємо за відгук і що вибрали наш магазин!               
            </div>               
        </div>

    );
};

export default ReviewAnswer;