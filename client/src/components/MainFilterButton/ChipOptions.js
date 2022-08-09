import React from 'react';
import '../../css/FilterMain/ChipOptions.css';

const ChipOptions = ({props}) => {
    return (
        <div className='chipOptions'>
            {props} <span className="closeChipBtn" onClick={""}>&times;</span>
        </div>
    );
};

export default ChipOptions;