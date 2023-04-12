import React from 'react';
import '../../css/NotificationCss/Notification.css';

const ErrorsNotif = ({children}: any) => {
    return (
        <div className="center">
            <div className="danger">
                <i className="far fa-times-circle shine"></i>
                &nbsp; &nbsp;
                <span>{children}</span>
            </div>
        </div>
    );
};

export default ErrorsNotif;