import React from 'react';
import '../../css/UXcss/DotSite.css';

const DotSite = () => {
    return (
        <div>
            <span className="dotSite" onClick="currentSlide(1)"></span>
            <span className="dotSite" onClick="currentSlide(2)"></span>
            <span className="dotSite" onClick="currentSlide(3)"></span>
        </div>
    );
};

export default DotSite;