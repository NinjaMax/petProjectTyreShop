import React from 'react';
import '../css/ButtonUp.css';


type ButtonUpType = {
    actionBtnUp(arg0: any): void;
};

const ButtonUp = ({actionBtnUp}:ButtonUpType) => {
  return (
    <div>
        <span className="buttonUpBtn"
            onClick={actionBtnUp}>
                &#10094;
        </span>
    </div>
  )
}

export default ButtonUp