import React from 'react';
import '../../css/UXcss/RatingOptions.css';
import { IRatingOptions } from '../reviews/interfaces/RatingOptions.interface';

const RatingOptions = ({nameRating, children}: IRatingOptions) => {

    return (
        <div className='ratingOptions'>
            {nameRating.length !== 0?
            <span className='nameRating'>
                {nameRating}
            </span>
            : null
            }
            <span className='ratingBoxStar'>
                {children}
            </span>
        </div>
    );
};

export default RatingOptions;