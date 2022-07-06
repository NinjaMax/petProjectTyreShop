import React from 'react';
import '../../css/ReviewStore.css'
const ReviewStore = () => {
    return (

    <div className='reviewStore'>
        <div className='reviewShop'>   
            <div className="reviewsContainer">
                <div className="mySlidesReview">
                    <q>I love you the more in that I believe you had liked me for my own sake and for nothing else</q>
                    <p className="authorReview">- John Keats</p>
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

            <div className='reviewGoods'>   
                <div className="reviewsContainer">
                    <div className="mySlidesReview">
                        <q>I love you the more in that I believe you had liked me for my own sake and for nothing else</q>
                        <p className="authorReview">- John Keats</p>
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
    </div>

    );
};

export default ReviewStore;