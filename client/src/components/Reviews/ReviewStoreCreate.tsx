import React, { useContext, useEffect, useState } from 'react';
import '../../css/Reviews/ReviewStoreCreate.css';
import RatingOptions from '../ux/RatingOptions';
import ButtonAction from '../buttons/ButtonAction';
import { useForm } from 'react-hook-form';
import { observer } from 'mobx-react-lite';
import { Context } from '../../context/Context';
import Rating from '../ux/Rating';
import { FormValuesStore } from './types/ReviewStoreCreate.type';
// import { FormValues } from './types/ReviewStoreCreate.type';

interface IReviewTyreCreate {
    onSubmitReviewStore(arg0: any): void;
}

const ReviewStoreCreate = observer(({
    onSubmitReviewStore,
}: IReviewTyreCreate) => {
    const {goodsTyre, customer} = useContext<any | null>(Context);
    const {
        register, 
        handleSubmit,
        setValue,  
        formState: {errors}
      } = useForm<FormValuesStore>({
        criteriaMode: 'all',
    });
    
    useEffect(() => {
        register("rating_overall", { required: "Обов'язково вкажіть рейтинг",
            valueAsNumber: true,
        });
        if (goodsTyre.ratingList.rating_overall) {
            setValue('rating_overall', goodsTyre.ratingList.rating_overall)  
        }
    },[goodsTyre.ratingList.rating_overall, register, setValue]);

    return (
    <div className='reviewStoreCreate'>
        <h4>Залишити відгук про магазин</h4>
        <span>Моя загальна оцінка магазину та обслуговуванню</span>
        <form onSubmit={handleSubmit(onSubmitReviewStore)}>
        <div className='reviewStoreRatingList'>
            <div className='reviewStoreRatingListItems'>
                <RatingOptions 
                    nameRating={'Оцінка'} 
                >
                <Rating 
                    numScore={goodsTyre.ratingList.rating_overall}
                    disabled={false}
                    nameRating={'rating_overall'}
                />
                </RatingOptions>      
            </div>
        </div>
        <p/>
        <div className='reviewStoreInputRatingBox'>
        <div className='reviewStoreInputRating'>
            <label htmlFor='reviewStore'>Відгук</label>
            <textarea 
                id="reviewStore"
                rows={5}
                cols={30}
                maxLength={200}
                placeholder='Написати відгук'
                {...register("description", 
                    { required: "Напишіть відгук", 
                    maxLength: 200 })
                }
            />
            <input 
                type="text" 
                placeholder="Ваше ім'я"
                defaultValue={customer._customer?.name ?? customer._customer?.sub?.name ?? ''}
                {...register("name", 
                    { required: "Треба заповнити ім'я", maxLength: 50,
                    minLength: 2
                })
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
        {errors?.name && 
            <span className='reviewStoreErrors'>
                {errors.name?.message}
            </span>
        }
        {errors?.description && 
            <span className='reviewStoreErrors'>
                {errors.description?.message}
            </span>
        }
        {errors?.rating_overall && 
            <span className='reviewStoreErrors'>
                {errors.rating_overall?.message}
            </span>
        }
        </form>
    </div>
  )
});

export default ReviewStoreCreate;