import React from 'react';
import '../../css/Question/QuestionAnswer.css';
// import storeLogo from '';
import { IAnswerData } from './types/AnswerData.type';

const QuestionAnswer = ({answer}:IAnswerData) => {
    return (
        <div className='answerBox'>     
            <div className='answerShopName'>
                <img id='answerLogo' src='logoSky180.png' alt='storeLogo'/>
                Представник SKYPARTS
            </div> 
            <div className='answerDate'>
                {new Date(answer?.createdAt).toLocaleDateString()}
            </div>
            <div className='answerContent'>
                {answer?.description}              
            </div>               
        </div>
    );
};

export default QuestionAnswer;