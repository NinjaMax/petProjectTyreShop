import React from 'react';
import '../../css/FilterMain/ChipOptions.css';
import { observer } from 'mobx-react-lite';

interface IChipOptions {
    props: any | null | undefined;
    //setActive(arg0: any): void;
}

const ChipOptions =({props}: IChipOptions) => {

    return (
        <div className='chipOptions' 
            onClick={(e) => e.stopPropagation()}>
            {props ?
            <>
                {props} 
                <span 
                    className="closeChipBtn" 
                    onClick={() => {console.log('close CHIP')}}>&times;
                </span> 
            </>
             : null  
            }
        </div>
    );
};

export default ChipOptions;