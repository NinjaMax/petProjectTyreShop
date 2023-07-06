import React from 'react';
import '../../css/Reviews/ReviewsGoods.css';
import customerReview from '../../assets/icons/customer64.png';
import ButtonPrevNext from '../buttons/ButtonPrevNext';
import Rating from '../ux/Rating';
import Thumbs from '../ux/Thumbs';
import ReviewsGoodsExtend from './ReviewsGoodsExtend';
import { IReviewGoods } from './interfaces/ReviewGoods.interface';

interface IReviewsGoods {
    reviewEntity: IReviewGoods;
    reviewExtend: boolean; 
    btnLeft: any; 
    btnRight: any;
}

const ReviewsGoods = (
        {reviewEntity, reviewExtend, btnLeft, btnRight}: IReviewsGoods
    ) => {
    return (
       
        <div className='reviewGoods'>   
            <div className="reviewsGoodsContainer">
                <div className="mySlidesGoodsReview">
                    <div className="authorGoodsReview">
                        <img className='userImg' src={customerReview} alt='avatarUser'/> 
                        {reviewEntity.name}
                    </div>
                    <div className='ratingGoodsReview'>
                        Рейтинг товара:
                         <Rating 
                            numScore={4.7}
                            disabled={true}
                        />
                    </div>
                    <div className='reviewUsesCars'>Ездит на: {reviewEntity.car}</div>
                    <div className='reviewGoodsExpier'>Стаж: {reviewEntity.driver_experience}</div>
                    <div className='AddedGoodsReview'>Отзыв о товаре: <a href='/#'>Continental ContiCrossContact All Seasons Verde 195/65 R15 105T XL</a></div>
                    <div className='contentGoodsReview'>
                        {reviewEntity.description}
                    </div>
                    <div className='dateGoodsReview'>{reviewEntity.createdAt?.toString()}</div>
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