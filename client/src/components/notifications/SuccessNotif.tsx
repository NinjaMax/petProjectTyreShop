import React from 'react';
import '../../css/NotificationCss/Notification.css';

interface INotification {
    active: boolean;
    setActive(arg: any): void;
    children: JSX.Element | JSX.Element [] | string;
}

const SuccessNotif = ({active, setActive, children}: INotification) => {
    return (
        <div className={active ? 'notificationActive': 'notification'}
            onClick={()=>{setActive(false)}}
        >   
            <div
                className= {active ? 'notificationBox active': 'notificationBox'} 
                onClick={(e)=>e.stopPropagation()} >
            {/* <div className="check"> */}
                <i className="far fa-check-circle color"></i> &nbsp; &nbsp;
                <span>{children}</span>
            {/* </div> */}
            </div>
        </div>
    );
};

export default SuccessNotif;