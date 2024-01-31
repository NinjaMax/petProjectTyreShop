import React from 'react';
import '../../css/Reviews/ReviewsBrandOverall.css';
import Rating from '../ux/Rating';
import brandImg from '../../assets/img/continental_logo.png';
import RatingOptions from '../ux/RatingOptions';
import { tyreBrandLogo } from '../../services/tyreBrandImg.service';
import { useTranslation } from 'react-i18next';

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
    const { t, i18n } = useTranslation();

    return (
        <div className="reviewsBrand">
            <div className='reviewBrandList'>
                <span className='reviewBrandTitle'>{t('reviewBrandOverall.rating_brand')}</span>
                <p/>
                <span className='reviewBrandName'>{brandName}</span>
                <img src={tyreBrandLogo(brandName)} alt='brandImg'/>
                <Rating 
                    numScore={avgBrand ?? 0}
                    disabled={true}
                /> 
                <span>{t('reviewBrandOverall.avarage_score')} {countReviewBrand} {t('reviewBrandOverall.reviews')}</span>  
            </div>
            {typeGoods ?
            <div className='reviewBrandList'>
                <RatingOptions 
                    nameRating={t('reviewBrandOverall.avarage_score_winter')}
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
                    nameRating={t('reviewBrandOverall.avarage_score_summer')}
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
                    nameRating={t('reviewBrandOverall.avarage_score_allseason')}
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