import React from 'react';
import '../../css/Reviews/ReviewsGoods.css';
import customerReview from '../../assets/icons/customer64.png';
import ButtonPrevNext from '../buttons/ButtonPrevNext';
import Rating from '../ux/Rating';
import Thumbs from '../ux/Thumbs';
import ReviewsGoodsExtend from './ReviewsGoodsExtend';
import { IReviewGoods } from './interfaces/ReviewGoods.interface';

interface IReviewsGoods {
    productFullName: string;
    reviewEntity: IReviewGoods;
    reviewExtend: boolean; 
    btnLeft: any; 
    btnRight: any;
    rating?: [{id_review?: number, rating_overall?: number}];
}

const ReviewsGoods = ({
    productFullName,
    rating,
    reviewEntity,
    reviewExtend,
    btnLeft,
    btnRight}: IReviewsGoods
    ) => {

    const tumbUpAction = () => {
        
    };
    
    const tumbDownAction = () => {

    };

    return (
        <div className='reviewGoods'>   
            <div className="reviewsGoodsContainer">
                <div className="mySlidesGoodsReview">
                    <div className="authorGoodsReview">
                        <img className='userImg' src={customerReview} alt='avatarUser'/> 
                        {reviewEntity.name}
                    </div>
                    <div className='ratingGoodsReview'>
                        <span>Рейтинг товара:</span>
                         <Rating 
                            numScore={
                                rating?.find(
                                    rating => 
                                    rating.id_review === reviewEntity.id_review)?.rating_overall
                            }
                            disabled={true}
                        />
                    </div>
                    <div className='reviewUsesCars'>
                        <span>Їздить на: </span> {reviewEntity.car}</div>
                    <div className='reviewGoodsExpier'>
                        <span>Водійський досвід: </span> {reviewEntity.driver_experience}</div>
                    <div className='addedGoodsReview'>
                        <span>Відгук о товарі: </span> 
                        <a href='/#'>
                        {productFullName}
                        </a>
                    </div>
                    <div className='contentGoodsReview'>
                        {reviewEntity.description}
                    </div>
                    <div className='reviewPositive'>
                        <span>Переваги: </span>
                        {reviewEntity.positive}
                    </div>
                    <div className='reviewNegative'>
                        <span>Недоліки: </span>
                        {reviewEntity.negative}
                    </div>
                    <div className='dateGoodsReview'>
                        {new Date(reviewEntity?.createdAt).toLocaleDateString()}
                    </div>
                    <div className='thumbGoodsReview'>
                        <Thumbs
                            countPositive={5}
                            countNegative={1}
                        />
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