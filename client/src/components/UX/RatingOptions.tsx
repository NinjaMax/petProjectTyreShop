import React from 'react';
import '../../css/UXcss/RatingOptions.css';
import Rating from './Rating';

interface IRatingOptions {
    nameRating: string; 
    numScore: number;
}

const RatingOptions = ({nameRating, numScore}: IRatingOptions) => {
    
    return (
        <div className='ratingOptions'>
            <span className='nameRating'>{nameRating}</span>
            <span className='ratingBoxStar'><Rating numScore={numScore}/></span>
        </div>
    );
};

export default RatingOptions;