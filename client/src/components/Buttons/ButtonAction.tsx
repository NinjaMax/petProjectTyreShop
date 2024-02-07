import React from 'react';
import '../../css/ButtonsCss/ButtonAction.css';

interface IButtonAction {
    props: string;
    widthBtn?: number;
    eventItem?:(arg0: any)=> void;
    active?: boolean;
    type?: "button" | "submit" | "reset" | undefined;
    id?: string;
}

const ButtonAction = (
    {props, widthBtn, active, type, id, eventItem}: IButtonAction
    ) => {
    return (
        <div >
            <button 
            id={id} 
            className='buttonAction'
            type={type}
            style={{["--widthBtn" as any]: widthBtn}}
            disabled={active}
            onClick={eventItem}>{props}</button>
        </div>
    );
};

export default ButtonAction;