import React from 'react';
import '../../css/Reviews/ReviewStore.css';
import Rating from '../ux/Rating';
import customerReview from '../../assets/icons/customer64.png';
import ReviewAnswer from './ReviewAnswer';
import DotSite from '../ux/DotSite';
import ButtonPrevNext from '../buttons/ButtonPrevNext';


const ReviewStore = () => {
    return (

    <div className='reviewStore'>  
        <div className="reviewsStoreContainer">
            <div className="mySlidesStoreReview">
                <div className="authorStoreReview"><img className='avatarImg' src={customerReview} alt='avatarUser'/> Кирилл Шемендюк</div>
                <div className='ratingStoreReview'>Оценка:<Rating numScore={4.5}/> </div>
                <div className='contentStoreReview'>
                     I love you the more in that I believe you had liked me for my own sake and for nothing else.
                     I love you the more in that I believe you had liked me for my own sake and for nothing else
                </div>
                <div className='dateStoreReview'>14.07.2022</div>
                <div className='answerStoreReview'>
                    <ReviewAnswer/>
                </div>
            </div>
            <ButtonPrevNext prevBtnLeft={-30} nextBtnRight={-30}/>
        </div>

        <div className="dotReviewContainerStore">
            <a className='reviewsAllLink' href='/#'>Подивитись всі відгуки</a>
            <DotSite/>
            <button className='btnStoreReview'>Залишити відгук про магазин</button>     
        </div>
               
    </div>

    );
};

export default ReviewStore;