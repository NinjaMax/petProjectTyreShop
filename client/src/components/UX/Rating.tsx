import React from 'react';
import '../../css/UXcss/Rating.css';

interface  IRating {
    numScore: number;
}

const Rating = ({numScore}: IRating) => {
    return (
        <div className='ratingStar'>
            <span className="fa fa-star checked"></span>
            <span className="fa fa-star checked"></span>
            <span className="fa fa-star checked"></span>
            <span className="fa fa-star"></span>
            <span className="fa fa-star"></span>
            <div className='ratingNumber'> {numScore}</div>
        </div>
    );
};

export default Rating;