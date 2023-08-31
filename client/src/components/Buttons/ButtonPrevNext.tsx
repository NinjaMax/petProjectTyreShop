import React from 'react';
import '../../css/ButtonsCss/ButtonPrevNext.css';

interface IButtonPrevNext {
    prevBtnLeft: number;
    prevTop: number;
    nextBtnRight: number;
    nextTop: number;
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
            <span className="prevButton" style={
                {'--positLeft': prevBtnLeft, '--positTopLeft':prevTop} as React.CSSProperties} 
            onClick={leftClickActive}>&#10094;</span>
            <span className="nextButton" style={
                {"--positRight":nextBtnRight, "--positTopRight":nextTop} as React.CSSProperties} 
            onClick={rightClickActive}>&#10095;</span>
        </div>
    );
};

export default ButtonPrevNext;