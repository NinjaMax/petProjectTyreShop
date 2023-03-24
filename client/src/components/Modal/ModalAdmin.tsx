import React from 'react';
import '../../css/Modal/ModalAdmin.css';

interface IModalAmin {
    active: boolean;
    setActive(arg0: any): void;
    children?: JSX.Element | JSX.Element[];
}

const ModalAdmin = ({active, setActive, children}: IModalAmin) => {
    return (
        <div className={active? 'modalAdmWindowActive': 'modalAdmWindow'}
            >
            <div className= {active? 'modalAdmWindowBox active': 'modalAdmWindowBox'} onClick={(e)=>e.stopPropagation()}>
                <button className='closeAdmModalBtn' 
                    onClick={()=>{setActive(false)}}>
                    <span>&#10006;</span>
                </button>
                {children}   
            </div>       
        </div>
    );
};

export default ModalAdmin;