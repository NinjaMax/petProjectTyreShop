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
            {typeof props === 'string' && props.length !== 0 ? props?.split(',').map(
                (item: string, index: number) =>
            <Fragment key={item}> 
                <div className='chipOptionsList'>
                    <div className='chipOptionsItem'>
                    {item} 
                     <span 
                        data-index={index}
                         data-name={chipName}
                        className="closeChipBtn" 
                        onClick={clearFilter}>&times;
                    </span> 
                    </div>
                </div> 
            </Fragment>)
             : null  
            }
            {Array.isArray(props) && props.length !== 0 ? 
            props.length.toString().split(',').map(
                (item: string, index: number) =>
            <Fragment key={item + index}>  
                {item} 
                <span 
                    data-index={index}
                    data-name={chipName}
                    className="closeChipBtn" 
                    onClick={clearFilter}>&times;
                </span> 
            </Fragment>
            )
             : null  
            }
        </div>
    );
};

export default ChipOptions;