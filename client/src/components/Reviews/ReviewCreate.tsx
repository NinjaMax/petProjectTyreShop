import React, { useContext, useEffect, useState } from 'react';
import '../../css/Reviews/ReviewCreateTyre.css';
import RatingOptions from '../ux/RatingOptions';
import ButtonAction from '../buttons/ButtonAction';
import { useForm } from 'react-hook-form';
import { observer } from 'mobx-react-lite';
import { Context } from '../../context/Context';
import Rating from '../ux/Rating';
import { FormValues } from './types/ReviewTyreCreate.type';
import { useTranslation } from 'react-i18next';

interface IReviewTyreCreate {
    onSubmitReviewTyre(arg0: any): void;
}

const ReviewCreate = observer(({
    onSubmitReviewTyre,
}: IReviewTyreCreate) => {
    const {goodsTyre, goodsWheel, customer} = useContext<any | null>(Context);
    const {
        register, 
        handleSubmit,
        setValue,  
        formState: {errors}
      } = useForm<FormValues>({
        criteriaMode: 'all',
    });
    const { t, i18n } = useTranslation();
    
    useEffect(() => {
        register("rating_overall", { required: 'Вкажіть рейтинг / Укажите рейтинг',
            valueAsNumber: true,
        });
        if (goodsTyre.ratingList.rating_overall) {
            setValue('rating_overall', goodsTyre.ratingList.rating_overall)  
        }
        if(goodsWheel.ratingList.rating_overall) {
            setValue('rating_overall', goodsTyre.ratingList.rating_overall)  
        }
    },[
        goodsTyre.ratingList.rating_overall,
        goodsWheel.ratingList.rating_overall, 
        register, 
        setValue
    ]);

    return (
    <div className='reviewTyreCreate'>
        <h4>{t('reviewCreate.review_add')}</h4>
        <span>{t('reviewCreate.avarage_score')}</span>
        <form onSubmit={handleSubmit(onSubmitReviewTyre)}>
        <div className='reviewRatingList'>
            <div className='reviewRatingListItems'>
                <RatingOptions 
                    nameRating={t('reviewCreate.rating_overall')} 
                >
                <Rating 
                    numScore={goodsTyre.ratingList.rating_overall ??
                        goodsWheel.ratingList.rating_overall
                    }
                    disabled={false}
                    nameRating={'rating_overall'}
                />
                </RatingOptions>      
            </div>
            {goodsTyre._product ?
            <div className='reviewRatingListItems'>
                <RatingOptions 
                    nameRating={t('reviewCreate.controll_grip')}
                >
                    <Rating 
                        numScore={goodsTyre.ratingList.rating_dry_road}
                        disabled={false}
                        nameRating={'rating_dry_road'}
                    />
                </RatingOptions>    
            </div>
            : null
            }
            {goodsTyre._product  ?
            <div className='reviewRatingListItems'>
                <RatingOptions 
                    nameRating={t('reviewCreate.controll_wet')} 
                >
                    <Rating 
                        numScore={goodsTyre.ratingList.rating_wet_road}
                        disabled={false}
                        nameRating={'rating_wet_road'}
                    />
                </RatingOptions>    
            </div>
            : null
            }
            {goodsTyre._product  ?
            <div className='reviewRatingListItems'>
                <RatingOptions
                    nameRating={t('reviewCreate.controll_snow')} 
                >
                    <Rating 
                        numScore={goodsTyre.ratingList.rating_snow_road}
                        disabled={false}
                        nameRating={'rating_snow_road'}
                    />
                 </RatingOptions>    
            </div>
            : null
            }
            {goodsTyre._product  ?
            <div className='reviewRatingListItems'>
                <RatingOptions 
                    nameRating={t('reviewCreate.conrtoll_ice')} 
                >
                    <Rating 
                        numScore={goodsTyre.ratingList.rating_ice_road}
                        disabled={false}
                        nameRating={'rating_ice_road'}
                    />
                </RatingOptions>    
            </div>
            : null
            }
            {goodsTyre._product  ?
            <div className='reviewRatingListItems'>
                <RatingOptions 
                    nameRating={t('reviewCreate.traction')} 
                >
                    <Rating 
                        numScore={goodsTyre.ratingList.rating_cross_country}
                        disabled={false}
                        nameRating={'rating_cross_country'}
                    />
                </RatingOptions>    
            </div>
            : null
            }
            {goodsTyre._product  ?
            <div className='reviewRatingListItems'>
                <RatingOptions 
                    nameRating={t('reviewCreate.thearweard')} 
                >
                    <Rating 
                        numScore={goodsTyre.ratingList.rating_treadwear}
                        disabled={false}
                        nameRating={'rating_treadwear'}
                    />
                </RatingOptions>    
            </div>
            : null
            }
            {goodsTyre._product  ?
            <div className='reviewRatingListItems'>
                <RatingOptions 
                    nameRating={t('reviewCreate.price_quality')} 
                >
                    <Rating 
                        numScore={goodsTyre.ratingList.rating_price_quality}
                        disabled={false}
                        nameRating={'rating_price_quality'}
                    />
                </RatingOptions>    
            </div>
            : null
            }
        </div>
        <p/>
        <div className='reviewInputRatingBox'>
        <div className='reviewInputRating'>
            <label htmlFor='reviewTyre'>{t('reviewCreate.review')}</label>
            <textarea 
                id="reviewTyre"
                rows={5}
                cols={30}
                maxLength={200}
                placeholder={t('reviewCreate.write_review')}
                {...register("description", 
                    { required: t('reviewCreate.writte_review_required'), 
                    maxLength: 200 })
                }
            />
            <label htmlFor='negativeReview'>{t('reviewCreate.negative')}</label>
            <textarea 
                id="negativeReview" 
                placeholder={t('reviewCreate.negative')}
                maxLength={120}
                {...register("negative", 
                { required: false, maxLength: 120 })
            }
            />
            <label  htmlFor='positiveReview'>{t('reviewCreate.positive')}</label>
            <textarea 
                id="positiveReview" 
                placeholder={t('reviewCreate.positive')}
                maxLength={120}
                {...register("positive", 
                { required: false, maxLength: 120 })
            }
            />
            <div className='reviewInputRatingCar'>
                <input 
                    type="text" 
                    placeholder={t('reviewCreate.auto_mark')}
                    maxLength={120}
                    {...register("car", 
                    { required: false, maxLength: 120 })
                }
                /> 
                <input 
                    type="text" 
                    placeholder={t('reviewCreate.driver_expirience')}
                    maxLength={3}
                    {...register("driver_experience", 
                    { required: false, maxLength: 3 })
                }
                />
            </div>
            <input 
                type="text" 
                placeholder={t('reviewCreate.name')}
                defaultValue={customer._customer?.name ?? customer._customer?.sub?.name ?? ''}
                {...register("name", 
                    { required: t('reviewCreate.name_required'), maxLength: 50,
                    minLength: 2
                })
                }
            />
            <input 
                type="text" 
                placeholder={t('reviewCreate.email')} 
                {...register("email", 
                    { required: false, maxLength: 100 })
                }
            />
        </div>
        </div>
        <p/>
        <ButtonAction 
            type={"submit"}
            props={t('reviewCreate.save_review')}
        /> 
        <div className='reviewTyreErrorsBox'>
        {errors?.name && 
            <span className='reviewTyreErrors'>
                {errors.name?.message}
            </span>
        }
        {errors?.description && 
            <span className='reviewTyreErrors'>
                {errors.description?.message}
            </span>
        }
        {errors?.rating_overall && 
            <span className='reviewTyreErrors'>
                {errors.rating_overall?.message}
            </span>
        }
        </div>
        </form>
    </div>
  )
});

export default ReviewCreate;