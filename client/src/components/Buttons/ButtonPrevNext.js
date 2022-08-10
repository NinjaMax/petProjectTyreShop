import React from 'react';
import '../../css/ButtonsCss/ButtonPrevNext.css';

const ButtonPrevNext = ({prevBtnLeft, nextBtnRight}) => {
    return (
        <div>
            <span className="prevButton" style={{"--positLeft":prevBtnLeft}} onClick={{}}>&#10094;</span>
            <span className="nextButton" style={{"--positRight":nextBtnRight}} onClick={{}}>&#10095;</span>
        </div>
    );
};

export default ButtonPrevNext;