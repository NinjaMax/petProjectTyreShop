import React from 'react';
import '../../css/Reviews/ReviewStore.css';
import Rating from '../ux/Rating';
import { useTranslation } from 'react-i18next';

type IReviewStoreData = {
    storeData?:{
        description?:string,
        name?:string,
        email?: string,
        rating?: number,
        createdAt?: any,
        customer_pictures?: string
    }
};

const ReviewStore = ({storeData}: IReviewStoreData) => {
    const { t } = useTranslation();

    return (
    <div className='reviewStore'>  
        <div className="reviewsStoreContainer">
            <div className="mySlidesStoreReview">
                <div className="authorStoreReview">
                    <img className='avatarImgStore' 
                        loading='lazy'
                        decoding='async'
                        src={storeData?.customer_pictures ?? 'img_main/customer64.webp'} 
                        alt='avatarUser'
                    /> 
                    {storeData?.name}
                </div>
                <div className='ratingStoreReview'>
                    {t('reviewStore.grade')}
                    <Rating 
                        numScore={storeData?.rating}
                        disabled={true}
                    /> 
                </div>
                <div className='contentStoreReview'>
                    {storeData?.description}
                </div>
                <div className='dateStoreReview'>{new Date(storeData?.createdAt).toLocaleDateString()}</div>
                <div className='answerStoreReview'>
                </div>
            </div>
        </div>
    </div>

    );
};

export default ReviewStore;