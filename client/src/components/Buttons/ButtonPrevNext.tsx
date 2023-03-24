import React from 'react';
import '../../css/ButtonsCss/ButtonPrevNext.css';

interface IButtonPrevNext {
    prevBtnLeft: number;
    nextBtnRight: number;
}

const ButtonPrevNext = ({prevBtnLeft, nextBtnRight}: IButtonPrevNext) => {
    return (
        <div>
            <span className="prevButton" data-style={{"--positLeft":prevBtnLeft}} 
            onClick={(e) => console.log(e.currentTarget)}>&#10094;</span>
            <span className="nextButton" data-style={{"--positRight":nextBtnRight}} 
            onClick={(e) => console.log(e.currentTarget)}>&#10095;</span>
        </div>
    );
};

export default ButtonPrevNext;