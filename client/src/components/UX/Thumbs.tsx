import React, { useEffect, useState } from 'react';
import '../../css/UXcss/Thumbs.css';

interface IThumbs {
    countPositive: number;
    countNegative: number;
};

const Thumbs = ({countPositive, countNegative}: IThumbs) => {

    const [countUp, setCountUp] = useState<number>();
    const [countDown, setCountDown] = useState<number>();
    const [checkedUp, setCheckedUp] = useState<boolean>(false);
    const [checkedDown, setCheckedDown] = useState<boolean>(false);
    
    useEffect(() => {
        if (countUp === countPositive) {
            setCountUp(countPositive);
        } else {
            setCountUp(countPositive);
            setCheckedUp(!checkedUp);
        }
        if (countDown === countNegative) {
            setCountDown(countNegative);
        } else {
            setCountDown(countNegative);
            setCheckedDown(!checkedDown);
        }
    },[
        checkedDown,
        checkedUp,
        countDown,
        countUp,
        countNegative,
        countPositive,
    ]);

    return (
        <div className='thumbs'>
            <span className={countUp === 0 ? 
                'thumbs noCountThumb' : 'thumbs countThumb'}>
                <i className={checkedUp ? 
                    'thumbs upThumbChecked' : 
                    'thumbs upThumb'}>
                </i>
                {countUp}
            </span>
            <span className={countDown === 0 ? 
                'thumbs noCountThumb' : 'thumbs countThumb'}>
                <i className={checkedDown ? 
                    'thumbs downThumbsChecked' :
                    'thumbs downThumb'}>
                </i>
                {countDown}
            </span>
        </div>
    );
};

export default Thumbs;