import React from 'react';
import '../../css/UXcss/Thumbs.css';
import thumbUp from '../../assets/icons/thumbs_up64_1_green.png';
import thumbDown from '../../assets/icons/thumbs_down_64red.png';

const Thumbs = () => {

    const countUp = 5;
    const countDown = 1;

    return (
        <div className='thumbs'>
            <span>
                <i className="fas fa-thumbs-up"></i> {countUp}
                <i className="far fa-thumbs-up"></i> {countUp}
            </span>
            <span>
                <i className="fas fa-thumbs-down"></i> {countDown}
                <i className="far fa-thumbs-down"></i> {countDown} 
            </span>
        </div>
    );
};

export default Thumbs;