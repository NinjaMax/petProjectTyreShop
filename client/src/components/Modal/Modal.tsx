import React from 'react';
import '../../css/Modal/Modal.css';

interface IModal {
    active: boolean;
    setActive(arg: any): void;
    children: JSX.Element | JSX.Element [];
}

const Modal = (
        {active, setActive, children}: IModal
    ) => {
    return (
    
            <div className={active? 'modalWindowActive': 'modalWindow'}
                onClick={()=>{setActive(false)}}>
            <div className= {active? 'modalWindowBox active': 'modalWindowBox'} 
                onClick={(e)=>e.stopPropagation()}>
                <button className='closeModalBtn' 
                    onClick={()=>{setActive(false)}}>
                    <span>&#10006;</span>
                </button>
                {children}   
            </div>       
        </div> 
    );

}
export default Modal;