import React from 'react';
import '../../css/Reviews/ReviewStore.css';
import Rating from '../ux/Rating';
import { useTranslation } from 'react-i18next';
//import customerReview from '../../assets/icons/customer64.png';
//import ReviewAnswer from '../question/ReviewAnswer';
//import DotSite from '../ux/DotSite';
//import ButtonPrevNext from '../buttons/ButtonPrevNext';

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
    const { t, i18n } = useTranslation();

    return (
    <div className='reviewStore'>  
        <div className="reviewsStoreContainer">
            <div className="mySlidesStoreReview">
                <div className="authorStoreReview">
                    <img className='avatarImgStore' 
                        src={storeData?.customer_pictures ?? './customer64.png'} 
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
                    {/* <ReviewAnswer/> */}
                </div>
            </div>
            {/* <ButtonPrevNext prevBtnLeft={-30} nextBtnRight={-30}/> */}
        </div>

        {/* <div className="dotReviewContainerStore">
            <a className='reviewsAllLink' href='/#'>Подивитись всі відгуки</a>
            <DotSite/>
            <button className='btnStoreReview'>Залишити відгук про магазин</button>     
        </div> */}
               
    </div>

    );
};

export default ReviewStore;