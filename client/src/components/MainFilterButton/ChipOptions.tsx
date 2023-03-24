import React from 'react';
import '../../css/FilterMain/ChipOptions.css';

interface IChipOptions {
    props: any;
}

const ChipOptions = ({props}: IChipOptions) => {
    return (
        <div className='chipOptions'>
            {props} <span className="closeChipBtn" onClick={(e) => console.log(e.currentTarget)}>&times;</span>
        </div>
    );
};

export default ChipOptions;