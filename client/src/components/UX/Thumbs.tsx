import React from 'react';
import '../../css/UXcss/Thumbs.css';
import thumbUp from '../../assets/icons/thumbs_up64_1_green.png';
import thumbDown from '../../assets/icons/thumbs_down_64red.png';

const Thumbs = () => {

    const countUp = 5;
    const countDown = 1;

    return (
        <div className='thumbs'>
            <img src={thumbUp} alt='thumbUp'/> {countUp} 
            <img src={thumbDown} alt='thumbDown'/> {countDown}
        </div>
    );
};

export default Thumbs;