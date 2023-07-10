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

    // const [countUp, setCountUp] = useState<number>();
    // const [countDown, setCountDown] = useState<number>();
    // const [checkedUp, setCheckedUp] = useState<boolean>(false);
    // const [checkedDown, setCheckedDown] = useState<boolean>(false);
    
    // useEffect(() => {
    //     if (countUp && likeState) {
    //         setCountUp(countPositive);
    //     } else {
    //         setCountUp(countPositive);
    //         setCheckedUp(!checkedUp);
    //     }
    //     if (countDown && dislikeState) {
    //         setCountDown(countNegative);
    //     } else {
    //         setCountDown(countNegative);
    //         setCheckedDown(!checkedDown);
    //     }
    // },[
    //     checkedDown,
    //     checkedUp,
    //     countDown,
    //     countUp,
    //     countNegative,
    //     countPositive,
    // ]);

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
                {countPositive ? countPositive : null}
            </span>
            <span className={countNegative ? 
                'thumbs countThumb' :'thumbs noCountThumb'}
                onClick={disLikeAction}
                >
                <i className={dislikeState ? 
                    'thumbs downThumbsChecked' :
                    'thumbs downThumb'}>
                </i>
                {countNegative ? countNegative : null}
            </span>
        </div>
    );
};

export default Thumbs;