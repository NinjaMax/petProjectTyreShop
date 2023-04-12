import React from 'react';
import '../../css/NotificationCss/Notification.css';

const WarningNotif = ({children}: any) => {
    return (
        <div className="center">
            <div className="warning">
                <i className="fa fa-exclamation-triangle rotate"></i>
                    &nbsp; &nbsp;
                <span>{children}</span>
            </div>
        </div>
    );
};

export default WarningNotif;