import React from 'react';
import thumbUp from '../../assets/icons/thumbs_up64_1_green.png';
import thumbDown from '../../assets/icons/thumbs_down_64red.png';
import '../../css/Reviews/ReviewsGoods.css';
import customerReview from '../../assets/icons/customer64.png';
import Rating from '../Rating';

const ReviewsGoods = () => {
    return (
       
            <div className='reviewGoods'>   
                <div className="reviewsGoodsContainer">
                    <div className="mySlidesGoodsReview">
                        <div className="authorGoodsReview"><img src={customerReview} alt='avatarUser'/> Кирилл Шемендюк</div>
                        <div className='ratingGoodsReview'>Рейтинг товара: <Rating/></div>
                        <div className='reviewUsesCars'>Ездит на: Mercedes benz Gelendwagen GLI 500 </div>
                        <div className='reviewGoodsExpier'>Стаж: 5лет </div>
                        <div className='AddedGoodsReview'>Отзыв о товаре: <a href='/#'>Continental ContiCrossContact All Seasons Verde 195/65 R15 105T XL</a></div>
                        <div className='contentGoodsReview'>
                            I love you the more in that I believe you had liked me for my own sake and for nothing else
                            I love you the more in that I believe you had liked me for my own sake and for nothing else
                        </div>
                        <div className='dateGoodsReview'>12.07.2022</div>
                        <div className='thumbGoodsReview'>
                            <img src={thumbUp} alt='thumbUp'/> 0 
                            <img src={thumbDown} alt='thumbDown'/> 0
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

export default ReviewsGoods;