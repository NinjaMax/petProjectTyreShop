import React from 'react';
import '../../css/ButtonsCss/ButtonAction.css';

const ButtonAction = ({props}) => {
    return (
        <div >
            <button id='buttonAction'>{props}</button>
        </div>
    );
};

export default ButtonAction;