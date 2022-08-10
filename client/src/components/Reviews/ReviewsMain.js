import React from 'react';
import '../../css/Reviews/ReviewsMain.css';
import '../../css/Reviews/ReviewBox.css';

const ReviewsMain = ({props, children}) => {
    return (
        <div className='reviewBox'>
           <div className='textReview'>{props}</div>
           <div className='reviewsMain'>
                {children}
            </div> 
        </div>
        
    );
};

export default ReviewsMain;