import React, { useState } from 'react';
import '../../css/Question/Questions.css';
import ButtonAction from '../buttons/ButtonAction';
import Modal from '../modal/Modal';

const Question = () => {
  const [createQuestion, setCreateQuestion] = useState<boolean>(false);  


  const onCreateQuestions =() => {
    setCreateQuestion(!createQuestion);
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
        {/* {dataQuestionList?.length !== 0 ? 
          //dataQuestionList?.map((item) =>
          <div className='reviewStorePageBox'
            //key={item.id_review_store}
          >
            
          </div>
          )
        : null
        } */}
          <Modal active={createQuestion} setActive={setCreateQuestion}>
            <span>Задати питання</span>
          </Modal>
      </div>
    </div>
  )
}

export default Question;