import React, { useEffect, useState } from 'react';
import '../../css/Reviews/ReviewsGoods.css';
import ButtonPrevNext from '../buttons/ButtonPrevNext';
import Rating from '../ux/Rating';
import Thumbs from '../ux/Thumbs';
import ReviewsGoodsExtend from './ReviewsGoodsExtend';
import { IReviewGoods } from './interfaces/ReviewGoods.interface';
import { yieldToMain } from '../../restAPI/postTaskAdmin';
import { likesTyreReview } from '../../restAPI/restGoodsApi';
import { createStringUrl } from '../../services/stringUrl';
import { useTranslation } from 'react-i18next';

interface IReviewsGoods {
    productFullName: string;
    reviewEntity: IReviewGoods;
    reviewExtend: boolean; 
    btnLeft: any; 
    btnRight: any;
    rating?: [{id_review?: number, rating_overall?: number}];
    setLikeReview?(arg0:any): void;
    setThumbDown?(arg0:any): void;
}

const ReviewsGoods = ({
    productFullName,
    rating,
    reviewEntity,
    reviewExtend,
    btnLeft,
    btnRight}: IReviewsGoods
    ) => {
    const [likeReview, setLikeReview] = useState<number>(reviewEntity.like_count);
    const [dislikeReview, setDislikeReview] = useState<number>(reviewEntity.dislike_count);
    const [likeChoose, setLikeChoose] = useState<number>(0);
    const [dislikeChoose, setDislikeChoose] = useState<number>(0);
    const [thumbUp, setThumbUp] = useState<boolean | null>(null);
    const [thumbDown, setThumbDown] = useState<boolean | null>(null);
    const { t } = useTranslation();

    useEffect(() => {
        let isMounted = false;
        const setThumbs = async () => {
          const taskThumbs: any[] = [
            likesTyreReview,
          ]
        let i: number = 0; 
        while (taskThumbs.length > i) {
          if (!isMounted && taskThumbs[i] === likesTyreReview) {
            if (likeChoose !== 0 || dislikeChoose !== 0) {
                const getLIkes: any = await taskThumbs[i](
                    reviewEntity.id_review,
                    likeChoose,
                    dislikeChoose
                ); 
                setLikeReview(getLIkes.data.like_count);
                setDislikeReview(getLIkes.data.dislike_count);
            }
          }
          const task = taskThumbs.shift();
          task();
          await yieldToMain();
        }
        };
        setThumbs();
        return () => {
          isMounted = true;
        };
      },[dislikeChoose, likeChoose, reviewEntity.id_review]);

    const tumbUpAction = () => {
        setThumbUp(!thumbUp);
        setTimeout(() => {
        if (!thumbUp) {
            setLikeChoose(1);
            setDislikeChoose(0);
        }
        if (thumbUp) {
            setLikeChoose(-1);
            setDislikeChoose(0);
        }
        }, 1500);
    };
    
    const tumbDownAction = () => {
        setThumbDown(!thumbDown);
        setTimeout(() => {
        if (!thumbDown) {
            setDislikeChoose(1);
            setLikeChoose(0);
        }
        if (thumbDown) {
            setDislikeChoose(-1);
            setLikeChoose(0);
        }
        }, 1500);
    };

    return (
        <div className='reviewGoods'>   
            <div className="reviewsGoodsContainer">
                <div className="mySlidesGoodsReview">
                    <div className="authorGoodsReview">
                        <img className='userImg' 
                        loading='lazy'
                        decoding='async'
                        width={35}
                        height={35}
                        src={
                            reviewEntity?.customer_pictures ??
                            '/img_main/customer64.webp'
                            } 
                            alt='avatarUser'
                        /> 
                        {reviewEntity.name}
                    </div>
                    <div className='ratingGoodsReview'>
                        <span>{t('reviewGoods.rating_goods')}</span>
                         <Rating 
                            id={'id_review_' + reviewEntity.id_review}
                            numScore={
                                rating?.find(
                                    rating => 
                                    rating.id_review === reviewEntity.id_review)?.rating_overall
                            }
                            disabled={true}
                        />
                    </div>
                    <div className='reviewUsesCars'>
                        { reviewEntity.car ?
                            <div>{reviewEntity.car}</div> 
                        : null 
                        }
                    </div>
                    <div className='reviewGoodsExpier'>
                        <span>{t('reviewGoods.driver_expirience')} {reviewEntity.driver_experience} років</span>
                    </div>
                    <div className='addedGoodsReview'>
                        <span>{t('reviewGoods.review')} </span> 
                        <a href={createStringUrl(productFullName)}>
                        {productFullName}
                        </a>
                    </div>
                    <div className='contentGoodsReview'>
                        {reviewEntity.description}
                    </div>
                    <div className='reviewPositive'>
                        <span>{t('reviewGoods.review_positive')} </span>
                        {reviewEntity.positive}
                    </div>
                    <div className='reviewNegative'>
                        <span>{t('reviewGoods.review_negative')} </span>
                        {reviewEntity.negative}
                    </div>
                    <div className='dateGoodsReview'>
                        {new Date(reviewEntity?.createdAt).toLocaleDateString()}
                    </div>
                    <div className='thumbGoodsReview'>
                        <Thumbs
                            countPositive={likeReview}
                            countNegative={dislikeReview} 
                            likeState={thumbUp} 
                            dislikeState={thumbDown}
                            likeAction={tumbUpAction}
                            disLikeAction={tumbDownAction} 
                            />
                    </div>
                    { reviewExtend ?
                    <div className='reviewGoodsExtend'>
                        <ReviewsGoodsExtend/>
                    </div>: null}
                </div>
                {btnLeft & btnRight ?
                <ButtonPrevNext prevBtnLeft={btnLeft} nextBtnRight={btnRight} prevTop={20} nextTop={20}/>
                :null} 
            </div>   
        </div>
    );
};

export default ReviewsGoods;