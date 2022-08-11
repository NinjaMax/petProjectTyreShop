import React from 'react';
import '../../css/UXcss/Rating.css';

const Rating = () => {
    return (
        <div className='ratingStar'>
            <span className="fa fa-star checked"></span>
            <span className="fa fa-star checked"></span>
            <span className="fa fa-star checked"></span>
            <span className="fa fa-star"></span>
            <span className="fa fa-star"></span>
        </div>
    );
};

export default Rating;