import React from 'react';
import Rating from '../UX/Rating';
import customerReview from '../../assets/icons/customer64.png';
import ReviewAnswer from '../Reviews/ReviewAnswer';
import DotSite from '../UX/DotSite';
import '../../css/Reviews/ReviewStore.css';
import ButtonPrevNext from '../Buttons/ButtonPrevNext';


const ReviewStore = () => {
    return (

    <div className='reviewStore'>  
        <div className="reviewsStoreContainer">
            <div className="mySlidesStoreReview">
                <div className="authorStoreReview"><img src={customerReview} alt='avatarUser'/> Кирилл Шемендюк</div>
                <div className='ratingStoreReview'>Оценка:<Rating/> </div>
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
            <a href='/#'>Подивитись всі відгуки</a>
            <DotSite/>
            <button className='btnStoreReview'>Залишити відгук про магазин</button>     
        </div>
               
    </div>

    );
};

export default ReviewStore;