import React, { useContext } from 'react';
import '../../css/Question/QuestionCreate.css';
import ButtonAction from '../buttons/ButtonAction';
import { useForm } from 'react-hook-form';
import { FormValuesQuestion } from './types/QuestionCreate.type';
import { Context } from '../../context/Context';
import { observer } from 'mobx-react-lite';
import { useTranslation } from 'react-i18next';

interface IQuestionCreate {
    onSubmitQuestion(arg0: any): void;
}

const QuestionCreate = observer(({onSubmitQuestion}: IQuestionCreate) => {
    const { customer} = useContext<any | null>(Context);
    const { t } = useTranslation();
    const {
        register, 
        handleSubmit,
        formState: {errors}
      } = useForm<FormValuesQuestion>({
        criteriaMode: 'all',
    });

    return (
    <div className='questionCreate'>
        <h4>{t('questionsCreate.add_questions')}</h4>
        <form onSubmit={handleSubmit(onSubmitQuestion)}>
        <p/>
        <div className='questionCreateBox'>
        <div className='questionCreateInput'>
            <label htmlFor='questionCreate'>{t('questionsCreate.questions')}</label>
            <textarea 
                id="questionCreate"
                rows={5}
                cols={30}
                maxLength={200}
                placeholder={t('questionsCreate.write_questions')}
                {...register("description", 
                    { required: t('questionsCreate.write_questions_required'), 
                    maxLength: 200 })
                }
            />
            <input 
                type="text" 
                placeholder={t('questionsCreate.name')}
                defaultValue={customer._customer?.name ?? customer._customer?.sub?.name ?? ''}
                {...register("name", 
                    { required: t('questionsCreate.name_required'), maxLength: 50,
                    minLength: 2
                })
                }
            />
            <input 
                type="text" 
                placeholder={t('questionsCreate.email')} 
                {...register("email", 
                    { required: false, maxLength: 100 })
                }
            />
        </div>
        </div>
        <p/>
        <ButtonAction 
            type={"submit"}
            props={t('questionsCreate.save_questions')}
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