import React from 'react';
import '../../css/Reviews/ReviewsBrandOverall.css';
import Rating from '../ux/Rating';
import brandImg from '../../assets/img/continental_logo.png';
import RatingOptions from '../ux/RatingOptions';
import { tyreBrandLogo } from '../../services/tyreBrandImg.service';

interface IReviewBrand {
    avgBrand?:number; 
    countReviewBrand?:number;
    ratingSummer?:number;
    ratingWinter?:number;
    ratingAllseason?:number;
    brandName?:string;
    typeGoods?:string | boolean;
}

const ReviewsBrandOverall = ({
    avgBrand, 
    countReviewBrand,
    ratingSummer,
    ratingWinter,
    ratingAllseason,
    brandName,
    typeGoods
}: IReviewBrand) => {
    return (
        <div className="reviewsBrand">
            <div className='reviewBrandList'>
                <span className='reviewBrandTitle'>Рейтинг бренда</span>
                <p/>
                <span className='reviewBrandName'>{brandName}</span>
                <img src={tyreBrandLogo(brandName)} alt='brandImg'/>
                <Rating 
                    numScore={avgBrand ?? 0}
                    disabled={true}
                /> 
                <span>середня оцінка основана на {countReviewBrand} відгуках.</span>  
            </div>
            {typeGoods ?
            <div className='reviewBrandList'>
                <RatingOptions 
                    nameRating={'середня оцінка Зимових моделей'}
                >
                    <Rating 
                        numScore={ratingWinter ?? 0}
                        disabled={true}
                    /> 
                </RatingOptions> 
            </div>
            : null
            }
            {typeGoods ?
            <div className='reviewBrandList'>
                <RatingOptions 
                    nameRating={'середня оцінка Літніх моделей'}
                >
                    <Rating 
                        numScore={ratingSummer ?? 0}
                        disabled={true}
                    /> 
                </RatingOptions> 
            </div>
            : null
            }
            {typeGoods ?
            <div className='reviewBrandList'>
                <RatingOptions 
                    nameRating={'середня оцінка Всесезонних моделей'}
                >
                    <Rating 
                        numScore={ratingAllseason ?? 0}
                        disabled={true}
                    /> 
                </RatingOptions>
            </div>
            : null
            }
        </div>
        
    );
};

export default ReviewsBrandOverall;