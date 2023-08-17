import React from 'react';
import '../../css/Question/QuestionCard.css';
import { IQuestionCard } from './types/QuestionCard.type';
import customerReview from '../../assets/icons/customer64.png';
import QuestionAnswer from './QuestionAnswer';

const QuestionCard = ({questionData}: IQuestionCard) => {

  return (
    <div className='questionCard'>  
    <div className="questionCardContainer">
        <div className="questionCardBox">
            <div className="authorQuestionCard">
                <img className='avatarImgQuestionCard' 
                    src={questionData?.customer_pictures ?? customerReview} 
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
        {/* <ButtonPrevNext prevBtnLeft={-30} nextBtnRight={-30}/> */}
    </div>

    {/* <div className="dotReviewContainerStore">
        <a className='reviewsAllLink' href='/#'>Подивитись всі відгуки</a>
        <DotSite/>
        <button className='btnStoreReview'>Залишити відгук про магазин</button>     
    </div> */}
           
</div>
  )
}

export default QuestionCard