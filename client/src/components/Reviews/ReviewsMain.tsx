import React from 'react';
import '../../css/Reviews/ReviewsMain.css';
import '../../css/Reviews/ReviewBox.css';

interface IReviewMain {
    props: string;
    children?: JSX.Element | JSX.Element [];
}

const ReviewsMain = ({props, children}: IReviewMain) => {
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