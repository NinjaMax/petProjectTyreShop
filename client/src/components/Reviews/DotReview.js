import React from 'react';
import '../../css/Reviews/DotReview.css';

const DotReview = () => {
    return (
        <div>
            <span className="dotReview" onClick="currentSlide(1)"></span>
            <span className="dotReview" onClick="currentSlide(2)"></span>
            <span className="dotReview" onClick="currentSlide(3)"></span>
        </div>
    );
};

export default DotReview;