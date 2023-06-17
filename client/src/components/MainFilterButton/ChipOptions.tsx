import React, { Fragment } from 'react';
import '../../css/FilterMain/ChipOptions.css';
//import { observer } from 'mobx-react-lite';

interface IChipOptions {
    props: any | null | undefined;
    chipName?: string
    clearFilter?(arg0: any): void;
}

const ChipOptions =({props, chipName, clearFilter}: IChipOptions) => {

    return (
        <div className='chipOptions' 
            onClick={(e) => e.stopPropagation()}>
            {props ? props.split(',').map(
                (item: string, index: number) =>
            <Fragment key={item}>  
                {item} 
                <span 
                    data-index={index}
                    data-name={chipName}
                    className="closeChipBtn" 
                    onClick={clearFilter}>&times;
                </span> 
            </Fragment>)
             : null  
            }
        </div>
    );
};

export default ChipOptions;