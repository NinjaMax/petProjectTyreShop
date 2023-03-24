import React from 'react';
import '../../css/UXcss/DotSite.css';

const DotSite = () => {
    return (
        <div>
            <span className="dotSite" 
                onClick={(e) => console.log(e.currentTarget)}>
            </span>
            <span className="dotSite" 
                onClick={(e) => console.log(e.currentTarget)}>
            </span>
            <span className="dotSite" 
                onClick={(e) => console.log(e.currentTarget)}>
            </span>
        </div>
    );
};

export default DotSite;