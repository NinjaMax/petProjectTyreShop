import React, { useContext, useEffect } from 'react';
import '../../css/Question/QuestionCreate.css';
import ButtonAction from '../buttons/ButtonAction';
import { useForm } from 'react-hook-form';
import { FormValuesQuestion } from './types/QuestionCreate.type';
import { Context } from '../../context/Context';
import { observer } from 'mobx-react-lite';

interface IQuestionCreate {
    onSubmitQuestion(arg0: any): void;
}

const QuestionCreate = observer(({onSubmitQuestion}: IQuestionCreate) => {
    const { customer} = useContext<any | null>(Context);
    const {
        register, 
        handleSubmit,
        //setValue,  
        formState: {errors}
      } = useForm<FormValuesQuestion>({
        criteriaMode: 'all',
    });
    
    // useEffect(() => {
    //     register("rating_overall", { required: "Обов'язково вкажіть рейтинг",
    //         valueAsNumber: true,
    //     });
        // if (goodsTyre.ratingList.rating_overall) {
        //     setValue('rating_overall', goodsTyre.ratingList.rating_overall)  
        // }
    // },[goodsTyre.ratingList.rating_overall, register, setValue]);

  return (
    <div className='questionCreate'>
        <h4>Залишити питання</h4>
        <form onSubmit={handleSubmit(onSubmitQuestion)}>
        <p/>
        <div className='questionCreateBox'>
        <div className='questionCreateInput'>
            <label htmlFor='questionCreate'>Питання</label>
            <textarea 
                id="questionCreate"
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
            props={'Зберегти питання'}
        /> 
        {errors?.name && 
            <span className='questionCreateErrors'>
                {errors.name?.message}
            </span>
        }
        {errors?.description && 
            <span className='questionCreateErrors'>
                {errors.description?.message}
            </span>
        }
        </form>
    </div>
  )
});

export default QuestionCreate