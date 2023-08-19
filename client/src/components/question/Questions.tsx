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
import { createQuestion, getAllQuestions } from '../../restAPI/restGoodsApi';

const Question = observer(() => {
  const [createQuestions, setCreateQuestions] = useState<boolean>(false);  
  const { goodsTyre, page, customer} = useContext<any | null>(Context);
  const [activeQuestion, setActiveQuestion] = useState<boolean>(false);
  const [dataQuestion, setDataQuestion] = useState<{} | null>(null);
  const [dataQuestionsList, setDataQuestionsList] = useState<any[] | null>(null);

  useEffect(() => {
    let isMounted = false;
    const getProduct = async () => {
      const taskQuestion: any[] = [
        createQuestion,
        getAllQuestions
      ]
    let i: number = 0; 
    while (taskQuestion.length > i) {
      if (!isMounted && taskQuestion[i] === createQuestion && dataQuestion) {
        console.log('QUESTION_DATA: ', dataQuestion);
        if (dataQuestion) {
          const createQuestionOne: any = await taskQuestion[i](
          dataQuestion,
          goodsTyre._product.id,
          goodsTyre._product.tyre_brand.id_brand,
          goodsTyre._product.tyre_model.id_model,
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
      if (!isMounted && taskQuestion[i] === getAllQuestions) {
        const getAllQuestions: any = await taskQuestion[i]();
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
  [
    createQuestions,
    customer._customer.id_customer,
    customer._customer.picture,
    customer._customer.profile_image_url,
    dataQuestion,
    goodsTyre._product.id,
    goodsTyre._product.tyre_brand.id_brand,
    goodsTyre._product.tyre_model.id_model,
    page
  ]);
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
          <span>Питання клієнтів </span>
          <ButtonAction props={'Задати питання'}
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
        : <span className='questionNo'>Не має покищо жодного питання</span>
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