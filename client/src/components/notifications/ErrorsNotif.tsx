import React from 'react';
import '../../css/NotificationCss/Notification.css';

interface INotification {
    active: boolean;
    setActive(arg: any): void;
    children: JSX.Element | JSX.Element [] | string;
}

const ErrorsNotif = ({active, setActive, children}: INotification) => {
    return (
        <div className={active ? 'notificationActive': 'notification'}
            onClick={()=>{setActive(false)}}
        >   
            <div 
                className= {active ? 'notificationBox active': 'notificationBox'} 
                onClick={(e)=>e.stopPropagation()} >
                <i className="far fa-times-circle shine"></i>
                <div className='notificationTextError'>
                    {children}   
                </div>
            </div>
        </div>
    );
};

export default ErrorsNotif;