import React from 'react';
import '../../css/Modal/Modal.css';

const Modal = ({active, setActive, children}) => {
    return (
    
            <div className={active? 'modalWindowActive': 'modalWindow'}
            onClick={()=>{setActive(false)}}>
            <div className= {active? 'modalWindowBox active': 'modalWindowBox'} onClick={(e)=>e.stopPropagation()}>
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