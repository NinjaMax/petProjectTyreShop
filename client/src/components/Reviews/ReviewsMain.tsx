import React from 'react';
import '../../css/Reviews/ReviewsMain.css';
import '../../css/Reviews/ReviewBox.css';
import ButtonPrevNext from '../buttons/ButtonPrevNext';

interface IReviewMain {
    props: string;
    children?: JSX.Element | JSX.Element [];
    prevBtnAction(arg0:any):void;
    nextBtnAction(arg0:any):void;
    buttonPosition?: {
        prevBtnLeft?: number, 
        prevTop?: number, 
        nextBtnRight?: number,  
        nextTop?: number, 
    };
}

const ReviewsMain = ({
    props, 
    children, 
    prevBtnAction, 
    nextBtnAction,
    buttonPosition
}: IReviewMain) => {
    return (
        <div className='reviewBox'>
           <div className='textReview'>{props}</div>
           <div className='reviewsMain'>
                {children}
            </div> 
            <div className='reviewPrevNextBtn'>
            <ButtonPrevNext 
                prevBtnLeft={buttonPosition?.prevBtnLeft} 
                prevTop={buttonPosition?.prevTop} 
                nextBtnRight={buttonPosition?.nextBtnRight} 
                nextTop={buttonPosition?.prevTop}    
                leftClickActive={prevBtnAction} 
                rightClickActive={nextBtnAction}
            />
            </div>
        </div>
        
    );
};

export default ReviewsMain;