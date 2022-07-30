import React from 'react';
import ReviewStore from './ReviewStore';
import ReviewsGoods from './ReviewsGoods';
import '../../css/Reviews/ReviewsMain.css';
import '../../css/Reviews/ReviewBox.css';

const ReviewsMain = () => {
    return (
        <div className='reviewBox'>
           <div className='textReview'>Відгуки</div>
           <div className='reviewsMain'>
                <ReviewStore/>
                <ReviewsGoods/>
            </div> 
        </div>
        
    );
};

export default ReviewsMain;