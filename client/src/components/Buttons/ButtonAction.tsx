import React from 'react';
import '../../css/ButtonsCss/ButtonAction.css';

interface IButtonAction {
    props: string;
    widthBtn?: number;
    eventItem?:(arg0: any)=> void;
    active?: boolean;
    type?: "button" | "submit" | "reset" | undefined;
}

const ButtonAction = (
    {props, widthBtn, active, type, eventItem}: IButtonAction
    ) => {
    return (
        <div >
            <button 
            id='buttonAction' 
            type={type}
            data-style={{"--widthBtn":widthBtn}}
            disabled={active}
            onClick={eventItem}>{props}</button>
        </div>
    );
};

export default ButtonAction;