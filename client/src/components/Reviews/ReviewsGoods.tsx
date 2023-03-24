import React from 'react';
import '../../css/Reviews/ReviewsGoods.css';
import customerReview from '../../assets/icons/customer64.png';
import ButtonPrevNext from '../buttons/ButtonPrevNext';
import Rating from '../ux/Rating';
import Thumbs from '../ux/Thumbs';
import ReviewsGoodsExtend from './ReviewsGoodsExtend';

interface IReviewsGoods {
    reviewExtend: boolean; 
    btnLeft: any; 
    btnRight: any;
}

const ReviewsGoods = (
        {reviewExtend, btnLeft, btnRight}: IReviewsGoods
    ) => {
    return (
       
            <div className='reviewGoods'>   
                <div className="reviewsGoodsContainer">
                    <div className="mySlidesGoodsReview">
                        <div className="authorGoodsReview"><img className='userImg' src={customerReview} alt='avatarUser'/> Кирилл Шемендюк</div>
                        <div className='ratingGoodsReview'>Рейтинг товара:<Rating numScore={4.7}/></div>
                        <div className='reviewUsesCars'>Ездит на: Mercedes benz Gelendwagen GLI 500 </div>
                        <div className='reviewGoodsExpier'>Стаж: 5лет </div>
                        <div className='AddedGoodsReview'>Отзыв о товаре: <a href='/#'>Continental ContiCrossContact All Seasons Verde 195/65 R15 105T XL</a></div>
                        <div className='contentGoodsReview'>
                            I love you the more in that I believe you had liked me for my own sake and for nothing else
                            I love you the more in that I believe you had liked me for my own sake and for nothing else
                        </div>
                        <div className='dateGoodsReview'>12.07.2022</div>
                        <div className='thumbGoodsReview'>
                            <Thumbs/>
                        </div>
                        { reviewExtend?
                        <div className='reviewGoodsExtend'>
                            <ReviewsGoodsExtend/>
                        </div>: null}
                    </div>
                    {btnLeft & btnRight ?
                    <ButtonPrevNext prevBtnLeft={btnLeft} nextBtnRight={btnRight}/>
                    :null} 
                </div>   
            </div>
        
    );
};

export default ReviewsGoods;