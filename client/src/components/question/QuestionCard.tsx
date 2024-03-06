import React from 'react';
import '../../css/Question/QuestionCard.css';
import { IQuestionCard } from './types/QuestionCard.type';
import QuestionAnswer from './QuestionAnswer';

const QuestionCard = ({questionData}: IQuestionCard) => {

  return (
    <div className='questionCard'>  
    <div className="questionCardContainer">
        <div className="questionCardBox">
            <div className="authorQuestionCard">
                <img className='avatarImgQuestionCard' 
                    src={questionData?.customer_pictures ?? './customer64.png'} 
                    alt='avatarUser'
                /> 
                {questionData?.name}
            </div>
            <div className='contentQuestionCard'>
                {questionData?.description}
            </div>
            <div className='dateQuestionCard'>{new Date(questionData?.createdAt).toLocaleDateString()}</div>
            { questionData?.answer?.length !== 0 ?
                questionData?.answer?.map((item: any) =>
                    <div className='answerQuestionCard' 
                        key={item.id_answer}
                    >
                        <QuestionAnswer answer={item}/>
                    </div>  
                ) 
            : null
            }
        </div>
    </div> 
</div>
  )
}

export default QuestionCard