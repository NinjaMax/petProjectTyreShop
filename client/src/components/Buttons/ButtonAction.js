import React from 'react';
import '../../css/ButtonsCss/ButtonAction.css';

const ButtonAction = ({props, widthBtn}) => {
    return (
        <div >
            <button id='buttonAction' 
            style={{"--widthBtn":widthBtn}}>{props}</button>
        </div>
    );
};

export default ButtonAction;