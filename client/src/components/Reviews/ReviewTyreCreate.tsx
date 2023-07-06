import React, { useContext, useEffect, useState } from 'react';
import '../../css/Reviews/ReviewCreateTyre.css';
import RatingOptions from '../ux/RatingOptions';
import ButtonAction from '../buttons/ButtonAction';
import { useForm } from 'react-hook-form';
import { observer } from 'mobx-react-lite';
import { Context } from '../../context/Context';
import Rating from '../ux/Rating';
import { FormValues } from './types/ReviewTyreCreate.type';
import { createTyreReview } from '../../restAPI/restGoodsApi';

interface IReviewTyreCreate {
    active: boolean;
    setActive(arg0: any): void;
}

const ReviewTyreCreate = observer(({active, setActive}: IReviewTyreCreate) => {
    const {goodsTyre, customer} = useContext<any | null>(Context);
    const [successReview, setSuccessReview] = useState();
    const {register, handleSubmit, formState: {errors}
      } = useForm<FormValues>({
        criteriaMode: 'all',
    });
    useEffect(() => {

    },[]);
    const onSubmitReviewTyre = async (data: FormValues) => {
        const newReview = await createTyreReview(
            data, 
            goodsTyre._product.id,
            goodsTyre._product.tyre_brand.id_brand,
            goodsTyre._product.tyre_model.id_model,
            goodsTyre._product.tyre_model.id_season,
            customer._customer.id_customer,
            goodsTyre.ratingList.rating_overall,
            goodsTyre.ratingList.rating_dry_road,
            goodsTyre.ratingList.rating_wet_road,
            goodsTyre.ratingList.rating_snow_road,
            goodsTyre.ratingList.rating_ice_road,
            goodsTyre.ratingList.rating_cross_country,
            goodsTyre.ratingList.rating_treadwear,
            goodsTyre.ratingList.rating_price_quality
        );
        if (newReview) {

        }
        console.log(data);
        console.log(newReview);
        console.log('CLICK_SUBMIT_REVIEW');
    };

    return (
    <div className='reviewTyreCreate'>
        <h4>Залишити відгук</h4>
        <span>Мої оцінки товару</span>
        <form onSubmit={handleSubmit(onSubmitReviewTyre)}>
        <div className='reviewRatingList'>
            <div className='reviewRatingListItems'>
                <RatingOptions 
                    nameRating={'Бренд'} 
                >
                <Rating 
                    numScore={goodsTyre.ratingList.rating_overall}
                    disabled={false}
                    nameRating={'rating_overall'}
                />
                </RatingOptions>      
            </div>
            <div className='reviewRatingListItems'>
                <RatingOptions 
                    nameRating={'Керованість на сухій дорозі'}
                >
                    <Rating 
                        numScore={goodsTyre.ratingList.rating_dry_road}
                        disabled={false}
                        nameRating={'rating_dry_road'}
                    />
                </RatingOptions>    
            </div>
            <div className='reviewRatingListItems'>
                <RatingOptions 
                    nameRating={'Керованість на мокрій дорозі'} 
                >
                    <Rating 
                        numScore={goodsTyre.ratingList.rating_wet_road}
                        disabled={false}
                        nameRating={'rating_wet_road'}
                    />
                </RatingOptions>    
            </div>
            <div className='reviewRatingListItems'>
                <RatingOptions
                    nameRating={'Керованість на снігу'} 
                >
                    <Rating 
                        numScore={goodsTyre.ratingList.rating_snow_road}
                        disabled={false}
                        nameRating={'rating_snow_road'}
                    />
                 </RatingOptions>    
            </div>
            <div className='reviewRatingListItems'>
                <RatingOptions 
                    nameRating={'Керованість на льду'} 
                >
                    <Rating 
                        numScore={goodsTyre.ratingList.rating_ice_road}
                        disabled={false}
                        nameRating={'rating_ice_road'}
                    />
                </RatingOptions>    
            </div>
            <div className='reviewRatingListItems'>
                <RatingOptions 
                    nameRating={'Проходимість'} 
                >
                    <Rating 
                        numScore={goodsTyre.ratingList.rating_cross_country}
                        disabled={false}
                        nameRating={'rating_cross_country'}
                    />
                </RatingOptions>    
            </div>
            <div className='reviewRatingListItems'>
                <RatingOptions 
                    nameRating={'Зносостійкість'} 
                >
                    <Rating 
                        numScore={goodsTyre.ratingList.rating_treadwear}
                        disabled={false}
                        nameRating={'rating_treadwear'}
                    />
                </RatingOptions>    
            </div>
            <div className='reviewRatingListItems'>
                <RatingOptions 
                    nameRating={'Ціна/Якість'} 
                >
                    <Rating 
                        numScore={goodsTyre.ratingList.rating_price_quality}
                        disabled={false}
                        nameRating={'rating_price_quality'}
                    />
                </RatingOptions>    
            </div>
        </div>
        <p/>
        <div className='reviewInputRatingBox'>
        <div className='reviewInputRating'>
            <label htmlFor='reviewTyre'>Відгук</label>
            <textarea 
                id="review"
                rows={5}
                cols={30}
                maxLength={200}
                placeholder='Написати відгук'
                {...register("description", 
                    { required: true, maxLength: 200 })
                }
            />
            <label htmlFor='negativeReview'>Недоліки</label>
            <textarea 
                id="negativeReview" 
                placeholder='Недоліки'
                maxLength={120}
                {...register("negative", 
                { required: false, maxLength: 120 })
            }
            />
            <label  htmlFor='positiveReview'>Переваги</label>
            <textarea 
                id="positiveReview" 
                placeholder='Переваги'
                maxLength={120}
                {...register("positive", 
                { required: false, maxLength: 120 })
            }
            />
            <div className='reviewInputRatingCar'>
                <input 
                    type="text" 
                    placeholder='Марка авто'
                    maxLength={120}
                    {...register("car", 
                    { required: false, maxLength: 120 })
                }
                /> 
                <input 
                    type="text" 
                    placeholder='Водійський стаж'
                    maxLength={3}
                    {...register("driver_experience", 
                    { required: false, maxLength: 3 })
                }
                />
            </div>
            <input 
                type="text" 
                placeholder="Ваше ім'я"
                {...register("name", 
                    { required: true, maxLength: 50 })
                }
            />
            <input 
                type="text" 
                placeholder='Електронная пошта' 
                {...register("email", 
                    { required: false, maxLength: 100 })
                }
            />
        </div>
        </div>
        <p/>
        <ButtonAction 
            type={"submit"}
            props={'Зберегти відгук'}
        />
        </form>
    </div>
  )
});

export default ReviewTyreCreate