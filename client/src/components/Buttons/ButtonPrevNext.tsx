import React from 'react';
import '../../css/ButtonsCss/ButtonPrevNext.css';

interface IButtonPrevNext {
    prevBtnLeft?: number;
    prevTop?: number;
    nextBtnRight?: number | null;
    nextTop?: number | null;
    leftClickActive?(arg0:any):void;
    rightClickActive?(arg0:any):void;
}

const ButtonPrevNext = ({
        prevBtnLeft,
        nextBtnRight,
        nextTop,
        prevTop,
        leftClickActive,
        rightClickActive
    }: IButtonPrevNext) => {
    return (
        <div>
            {prevBtnLeft && prevTop ?
                <span className="prevButton" style={
                    {'--positLeft': prevBtnLeft, '--positTopLeft':prevTop} as React.CSSProperties} 
                onClick={leftClickActive}>
                    &#10094;
                </span>
            : null
            }
            {nextBtnRight && nextTop ?
                <span className="nextButton" style={
                    {"--positRight":nextBtnRight, "--positTopRight":nextTop} as React.CSSProperties} 
                onClick={rightClickActive}>
                    &#10095;
                </span>  

            : null
            }
        </div>
    );
};

export default ButtonPrevNext;