import React from 'react';
import '../../css/ButtonsCss/ButtonAction.css';

interface IButtonAction {
    props: string;
    widthBtn?: number;
    eventItem?:(arg0: any)=> void;
    active?: boolean;
}

const ButtonAction = (
    {props, widthBtn, active, eventItem}: IButtonAction
    ) => {
    return (
        <div >
            <button id='buttonAction' 
            data-style={{"--widthBtn":widthBtn}}
            disabled={active}
            onClick={eventItem}>{props}</button>
        </div>
    );
};

export default ButtonAction;