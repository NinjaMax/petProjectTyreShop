import React from 'react';
import ReviewStore from './ReviewStore';
import ReviewsGoods from './ReviewsGoods';
import '../../css/Reviews/ReviewsMain.css';

const ReviewsMain = () => {
    return (
        <div className='reviewsMain'>
            <ReviewStore/>
            <ReviewsGoods/>
        </div>
    );
};

export default ReviewsMain;