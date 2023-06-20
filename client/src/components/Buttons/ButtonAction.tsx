import React from 'react';
import '../../css/ButtonsCss/ButtonAction.css';

interface IButtonAction {
    props: string;
    widthBtn?: number;
    eventItem?:(arg0: any)=> void;
}

const ButtonAction = (
    {props, widthBtn, eventItem}: IButtonAction
    ) => {
    return (
        <div >
            <button id='buttonAction' 
            data-style={{"--widthBtn":widthBtn}}
            onClick={eventItem}>{props}</button>
        </div>
    );
};

export default ButtonAction;