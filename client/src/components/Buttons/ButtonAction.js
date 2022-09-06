import React from 'react';
import '../../css/ButtonsCss/ButtonAction.css';

const ButtonAction = ({props, widthBtn, eventItem}) => {
    return (
        <div >
            <button id='buttonAction' 
            style={{"--widthBtn":widthBtn}}
            onClick={eventItem}>{props}</button>
        </div>
    );
};

export default ButtonAction;