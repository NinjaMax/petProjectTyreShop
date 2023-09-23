import React from 'react';
import '../../css/Reviews/ReviewsMain.css';
import '../../css/Reviews/ReviewBox.css';
import ButtonPrevNext from '../buttons/ButtonPrevNext';

interface IReviewMain {
    props: string;
    children?: JSX.Element | JSX.Element [];
    prevBtnAction(arg0:any):void;
    nextBtnAction(arg0:any):void;
}

const ReviewsMain = ({props, children, prevBtnAction, nextBtnAction}: IReviewMain) => {
    return (
        <div className='reviewBox'>
           <div className='textReview'>{props}</div>
           <div className='reviewsMain'>
                {children}
            </div> 
            <ButtonPrevNext 
                prevBtnLeft={250} 
                prevTop={280} 
                nextBtnRight={250} 
                nextTop={280}    
                leftClickActive={prevBtnAction} 
                rightClickActive={nextBtnAction}
            />
            {/* <p/>
            <span>Дивитися всі відгуки про магазин</span> */}
        </div>
        
    );
};

export default ReviewsMain;