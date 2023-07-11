import React from 'react';
import '../../css/UXcss/Thumbs.css';

interface IThumbs {
    countPositive: number;
    countNegative: number;
    reviewId?: number;
    likeState?: boolean | null;
    dislikeState?: boolean | null;
    likeAction(arg0:any): void;
    disLikeAction(arg0:any): void;
};

const Thumbs = ({
    countPositive, 
    countNegative,
    likeState,
    dislikeState,
    likeAction,
    disLikeAction, 
    // reviewId
}: IThumbs) => {

    return (
        <div className='thumbs'>
            <span className={countPositive ? 
                'thumbs countThumb' : 'thumbs noCountThumb' }
                onClick={likeAction}
                >
                <i className={likeState ? 
                    'thumbs upThumbChecked' : 
                    'thumbs upThumb'}>
                </i>
                {countPositive ?
                    <span className='thumbsNumber'>
                        {countPositive} 
                    </span>
                : null
                } 
            </span>
            <span className={countNegative ? 
                'thumbs countThumb' :'thumbs noCountThumb'}
                onClick={disLikeAction}
                >
                <i className={dislikeState ? 
                    'thumbs downThumbsChecked' :
                    'thumbs downThumb'}>
                </i>
                {countNegative ?
                    <span className='thumbsNumber'>
                        {countNegative}    
                    </span>
                : null
                }
            </span>
        </div>
    );
};

export default Thumbs;