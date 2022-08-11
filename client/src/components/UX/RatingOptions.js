import React from 'react';
import Rating from './Rating';
import '../../css/UXcss/RatingOptions.css';

const RatingOptions = ({nameRating, numScore}) => {
    return (
        <div className='ratingOptions'>
            <span className='nameRating'>{nameRating}</span>
            <span className='ratingBoxStar'><Rating/></span>
            <span>{numScore}</span>
        </div>
    );
};

export default RatingOptions;