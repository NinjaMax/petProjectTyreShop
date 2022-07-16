import React from 'react';
import Rating from '../Rating';
import customerReview from '../../assets/icons/customer64.png';
import ReviewAnswer from '../Reviews/ReviewAnswer';
import '../../css/Reviews/ReviewStore.css';


const ReviewStore = () => {
    return (

    <div className='reviewStore'>  
        <div className="reviewsStoreContainer">
            <div className="mySlidesStoreReview">
                <div className="authorStoreReview"><img src={customerReview} alt='avatarUser'/> Кирилл Шемендюк</div>
                <div className='ratingStoreReview'>Оценка:<Rating/> </div>
                <div className='contentStoreReview'>
                     I love you the more in that I believe you had liked me for my own sake and for nothing else.
                     I love you the more in that I believe you had liked me for my own sake and for nothing else
                </div>
                <div className='dateStoreReview'>14.07.2022</div>
                <div className='answerStoreReview'>
                    <ReviewAnswer/>
                </div>
            </div>

            <span className="prevReview" onClick={{}}>&#10094;</span>
            <span className="nextReview" onClick={{}}>&#10095;</span>
        </div>

        <div className="dotReviewContainer">
            <span className="dotReview" onClick="currentSlide(1)"></span>
            <span className="dotReview" onClick="currentSlide(2)"></span>
            <span className="dotReview" onClick="currentSlide(3)"></span>
        </div>       
    </div>

    );
};

export default ReviewStore;