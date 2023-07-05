import React from 'react';
import '../../css/Reviews/ReviewGoodsExtend.css';
import Rating from '../ux/Rating';
import RatingOptions from '../ux/RatingOptions';

const ReviewsGoodsExtend = () => {
    
    return (
        <div>
            <div className="heading">Рейтинг
                <Rating 
                    numScore={4.8}
                    nameRating={'Расширенние'}
                    disabled={true}
                />
            </div>
            <div className='ratingList'>
                <div className='ratingListItems'>
                    <RatingOptions 
                        nameRating={'Бренд'}
                    >
                    <Rating 
                        numScore={4.8}
                        disabled={true}
                    /> 
                    </RatingOptions> 
                </div>
                <div className='ratingListItems'>
                    <RatingOptions 
                        nameRating={'Керованість на сухій дорозі'} 
                    >
                    <Rating 
                        numScore={4.8}
                        disabled={true}
                    /> 
                     </RatingOptions> 
                </div>
                <div className='ratingListItems'>
                    <RatingOptions 
                        nameRating={'Керованість на мокрій дорозі'} 
                    >
                    <Rating 
                        numScore={4.8}
                        disabled={true}
                    /> 
                    </RatingOptions> 
                </div>
                <div className='ratingListItems'>
                    <RatingOptions 
                        nameRating={'Керованість на снігу'}
                    >
                    <Rating 
                        numScore={4.8}
                        disabled={true}
                    /> 
                    </RatingOptions> 
                </div>
                <div className='ratingListItems'>
                    <RatingOptions 
                        nameRating={'Керованість на льду'}
                    >
                    <Rating 
                        numScore={4.8}
                        disabled={true}
                    /> 
                    </RatingOptions> 
                </div>
                <div className='ratingListItems'>
                    <RatingOptions 
                        nameRating={'Проходимість'}
                    >
                    <Rating 
                        numScore={4.8}
                        disabled={true}
                    /> 
                    </RatingOptions> 
                </div>
                <div className='ratingListItems'>
                    <RatingOptions 
                        nameRating={'Зносостійкість'}
                    >
                    <Rating 
                        numScore={4.8}
                        disabled={true}
                    /> 
                    </RatingOptions> 
                </div>
                <div className='ratingListItems'>
                    <RatingOptions 
                        nameRating={'Ціна/Якість'} 
                    >
                    <Rating 
                        numScore={4.8}
                        disabled={true}
                    /> 
                    </RatingOptions> 
                </div>
            </div>
        </div>
    );
};

export default ReviewsGoodsExtend;