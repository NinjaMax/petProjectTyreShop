import React, { useEffect, useState } from 'react';
import '../../css/Reviews/ReviewsGoods.css';
import customerReview from '../../assets/icons/customer64.png';
import ButtonPrevNext from '../buttons/ButtonPrevNext';
import Rating from '../ux/Rating';
import Thumbs from '../ux/Thumbs';
import ReviewsGoodsExtend from './ReviewsGoodsExtend';
import { IReviewGoods } from './interfaces/ReviewGoods.interface';
import { yieldToMain } from '../../restAPI/postTaskAdmin';

interface IReviewsGoods {
    productFullName: string;
    reviewEntity: IReviewGoods;
    reviewExtend: boolean; 
    btnLeft: any; 
    btnRight: any;
    rating?: [{id_review?: number, rating_overall?: number}];
    setLikeReview(arg0:any): void;
    setThumbDown?(arg0:any): void;
}

const ReviewsGoods = ({
    productFullName,
    rating,
    reviewEntity,
    reviewExtend,
    setLikeReview,
    // setThumbDown,
    btnLeft,
    btnRight}: IReviewsGoods
    ) => {
    // const [likeReview, setLikeReview] = useState<number>(0);
    // const [dislikeReview, setDislikeReview] = useState<number>(0);
    const [thumbUp, setThumbUp] = useState<boolean | null>(null);
    const [thumbDown, setThumbDown] = useState<boolean | null>(null);
    
    // useEffect(() => {
    //     let isMounted = false;
    //     const setThumbs = async () => {
    //       const taskThumbs: any[] = [
    //         likesTyreReview,
    //       ]
    //     let i: number = 0; 
    //     while  taskThumbs.length > i) {
    //       if (!isMounted && taskThumbs[i] === likesTyreReview && getTyreId) {
    //         const getProduct: any = await taskThumbs[i](
    //             reviewEntity.id_review,
    //             likeReview,
    //             dislikeReview
    //         );
    //       }
    //       const task = taskThumbs.shift();
    //       task();
    //       await yieldToMain();
    //     }
    //     };
    //     setThumbs();
    //     return () => {
    //       isMounted = true;
    //     };
    //   },[]);

    const tumbUpAction = () => {
        setThumbUp(!thumbUp);
        if (!thumbUp) {
            setLikeReview({
            id_review: reviewEntity.id_review,
            likeCount: 1,
            dislikeCount: 0,
            });
            console.log('thumbUp: 1');
        }
        if (thumbUp) {
            setLikeReview({
                id_review: reviewEntity.id_review,
                likeCount: -1,
                dislikeCount: 0,
            });
            console.log('thumbUp: -1');
        }
    };
    
    const tumbDownAction = () => {
        setThumbDown(!thumbDown);
        if (!thumbDown) {
            setLikeReview({
                id_review: reviewEntity.id_review,
                likeCount: 0,
                dislikeCount: 1,
            });
            console.log('thumbDown: 1');
        }
        if (thumbDown) {
            setLikeReview({
                id_review: reviewEntity.id_review,
                likeCount: 0,
                dislikeCount: -1,
            });
            console.log('thumbDown: -1');
        }
    };

    console.log('THUMB_UP: ', thumbUp);
    console.log('THUMB_DOWN: ', thumbDown);
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
                            //reviewId={reviewEntity.id_review}
                            countPositive={reviewEntity.like_count}
                            countNegative={reviewEntity.dislike_count} 
                            likeState={thumbUp} 
                            dislikeState={thumbDown}
                            likeAction={tumbUpAction}
                            disLikeAction={tumbDownAction} 
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