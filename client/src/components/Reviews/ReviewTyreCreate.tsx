import React from 'react';
import '../../css/Reviews/ReviewCreateTyre.css';
import RatingOptions from '../ux/RatingOptions';
import ButtonAction from '../buttons/ButtonAction';
import { useForm } from 'react-hook-form';

type FormValues = {
    id: number;
    id_model: number;
    id_brand: number;
    id_customer: number;
    firstName: string;
    lastName: string;
    email: string;
    description: string;
    positive: string;
    negative: string;
    driver_experience: string;
    car: string;
    name: string;
    id_review: number;
    rating_overall: number;
    rating_dry_road: number;
    rating_wet_road: number;
    rating_snow_road: number;
    rating_ice_road: number;
    rating_cross_country: number;
    rating_treadwear: number;
    rating_price_quality: number;
}

const ReviewTyreCreate = () => {
    const {register, handleSubmit, formState: {errors}
      } = useForm<FormValues>({
        criteriaMode: 'all',
      });

    const onSubmitReviewTyre = (data:any) => {
        console.log(data);
    };

    return (
    <div className='reviewTyreCreate'>
        <h4>Залишити відгук</h4>
        <span>Мої оцінки товару</span>
        <p/>
        <form onSubmit={handleSubmit(onSubmitReviewTyre)}>
        <div className='reviewRatingList'>
            <div className='reviewRatingListItems'>
                <RatingOptions 
                    nameRating={'Бренд'} 
                    numScore={4.5}/>
            </div>
            <div className='reviewRatingListItems'>
                <RatingOptions 
                    nameRating={'Керованість на сухій дорозі'} 
                    numScore={4.5}/>
            </div>
            <div className='reviewRatingListItems'>
                <RatingOptions 
                    nameRating={'Керованість на мокрій дорозі'} 
                    numScore={4.5}/>
            </div>
            <div className='reviewRatingListItems'>
                <RatingOptions 
                    nameRating={'Керованість на снігу'} 
                    numScore={4.5}/>
            </div>
            <div className='reviewRatingListItems'>
                <RatingOptions 
                    nameRating={'Керованість на льду'} 
                    numScore={4.5}/>
            </div>
            <div className='reviewRatingListItems'>
                <RatingOptions 
                    nameRating={'Проходимість'} 
                    numScore={4.5}/>
            </div>
            <div className='reviewRatingListItems'>
                <RatingOptions 
                    nameRating={'Зносостійкість'} 
                    numScore={4.5}/>
            </div>
            <div className='reviewRatingListItems'>
                <RatingOptions 
                    nameRating={'Ціна/Якість'} 
                    numScore={4.5}/>
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
                //name="reviewTyre" 
                placeholder='Написати відгук'
                {...register("description", 
                    { required: true, maxLength: 1 })
                }
            />
            <label htmlFor='negativeReview'>Недоліки</label>
            <textarea 
                id="negativeReview" 
                placeholder='Недоліки'
                {...register("negative", 
                { required: false, maxLength: 12 })
            }
            />
            <label  htmlFor='positiveReview'>Переваги</label>
            <textarea 
                id="positiveReview" 
                placeholder='Переваги'
                {...register("positive", 
                { required: false, maxLength: 12 })
            }
            />
            <div className='reviewInputRatingCar'>
                <input 
                    type="text" 
                    placeholder='Марка авто'
                    {...register("car", 
                    { required: false, maxLength: 12 })
                }
                /> 
                <input 
                    type="text" 
                    placeholder='Водійський стаж'
                    {...register("driver_experience", 
                    { required: false, maxLength: 12 })
                }
                />
            </div>
            <input 
                type="text" 
                placeholder="Ваше ім'я"
                {...register("name", 
                    { required: true, maxLength: 1 })
                }
            />
            <input 
                type="text" 
                placeholder='Електронная пошта' 
                {...register("email", 
                    { required: false, maxLength: 1 })
                }
            />
        </div>
        </div>
        </form>
        <p/>
        <ButtonAction 
            props={'Зберегти відгук'}
            eventItem={onSubmitReviewTyre}
        />
    </div>
  )
}

export default ReviewTyreCreate