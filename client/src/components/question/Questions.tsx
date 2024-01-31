import React, { useContext, useEffect, useState } from 'react';
import '../../css/Question/Questions.css';
import ButtonAction from '../buttons/ButtonAction';
import Modal from '../modal/Modal';
import { Context } from '../../context/Context';
import { observer } from 'mobx-react-lite';
import { yieldToMain } from '../../restAPI/postTaskAdmin';
import { FormValuesQuestion } from './types/QuestionCreate.type';
import QuestionCreate from './QuestionCreate';
import QuestionCard from './QuestionCard';
import { createQuestion, getAllQuestionsModel } from '../../restAPI/restGoodsApi';
import { useTranslation } from 'react-i18next';

const Question = observer(() => {
  const [createQuestions, setCreateQuestions] = useState<boolean>(false);  
  const { goodsTyre, goodsWheel, page, customer} = useContext<any | null>(Context);
  const [dataQuestion, setDataQuestion] = useState<{} | null>(null);
  const [dataQuestionsList, setDataQuestionsList] = useState<any[] | null>(null);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    let isMounted = false;
    const getProduct = async () => {
      const taskQuestion: any[] = [
        createQuestion,
        getAllQuestionsModel
      ]
    let i: number = 0; 
    while (taskQuestion.length > i) {
      if (!isMounted && taskQuestion[i] === createQuestion && dataQuestion) {
        if (dataQuestion) {
          const createQuestionOne: any = await taskQuestion[i](
          dataQuestion,
          goodsTyre?._product?.id ?? goodsWheel?._product?.id,
          goodsTyre?._product?.id_brand ?? 
          goodsWheel?._product?.id_brand,
          goodsTyre?._product?.id_model ?? 
          goodsWheel?._product?.id_model,
          customer._customer.id_customer,
          customer._customer.picture ?? customer._customer.profile_image_url,
          );
          console.log('CREATE_QUESTION: ', createQuestionOne);
          if (createQuestionOne?.status === 201) {
            setDataQuestion(null);
            setCreateQuestions(!createQuestions);
          }
        } 
      }
      if (!isMounted && taskQuestion[i] === getAllQuestionsModel
        && (goodsTyre?._product?.id_model ||
          goodsWheel?._product?.id_model)
        ) {
        const getAllQuestions: any = await taskQuestion[i](
          goodsTyre?._product?.id_model ?? 
          goodsWheel?._product?.id_model,
        );
        if (getAllQuestions) {
          setDataQuestionsList(getAllQuestions);
          page.setQuestionsCount(getAllQuestions.length);
        }
      }
      const task = taskQuestion.shift();
      task();
      await yieldToMain();
    }
    };
    getProduct();
    return () => {
      isMounted = true;
    };
  },
  [createQuestions, customer._customer.id_customer, customer._customer.picture, customer._customer.profile_image_url, dataQuestion, goodsTyre?._product?.id, goodsTyre?._product?.id_brand, goodsTyre?._product?.id_model, goodsWheel?._product?.id, goodsWheel?._product?.id_brand, goodsWheel?._product?.id_model, page]);
  const onSubmitQuestion = (data: FormValuesQuestion) => {
    setDataQuestion(data); 
  };

  const onCreateQuestions =() => {
    setCreateQuestions(!createQuestions);
  };
    
  return (
<div className='question'>
      <div className='questionContainer'>
        <div className='questionTitle' >
          <span>{t('questions.customers_questions')} </span>
          <ButtonAction props={t('questions.ask_questions')}
            eventItem={onCreateQuestions}
          /> 
        </div>
        {dataQuestionsList?.length !== 0 ? 
          dataQuestionsList?.map((item : any) =>
          <div className='questionBox'
            key={item.id_question}
          >
            <QuestionCard 
            questionData={item} 
            />
          </div>
          )
        : <span className='questionNo'>{t('questions.no_questions')}</span>
        } 
        <div className=
          'questionCreateModalActive'>
          <Modal active={createQuestions} setActive={setCreateQuestions}>
            <QuestionCreate onSubmitQuestion={onSubmitQuestion}/>
          </Modal>
        </div>
      </div>
    </div>
  )
});

export default Question;