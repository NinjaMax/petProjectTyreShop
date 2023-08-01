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
            {/* <div className="danger">  */}
                <i className="far fa-times-circle shine"></i>
                &nbsp; &nbsp;
                {children}
            {/* </div> */}
            </div>
        </div>
    );
};

export default ErrorsNotif;