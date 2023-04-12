import React from 'react';
import '../../css/SpinnerCss/SpinnerWait.css';

const SpinnerWait = ({children}: any) => {
    return (
        <div className='timer-loader'>
            {children}
        </div>
    );
};

export default SpinnerWait;