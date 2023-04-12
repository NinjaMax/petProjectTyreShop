import React from 'react';
import '../../css/NotificationCss/Notification.css';

const SuccessNotif = ({children}: any) => {
    return (
        <div className="center">
            <div className="check">
                <i className="far fa-check-circle color"></i> &nbsp; &nbsp;
                <span>{children}</span>
            </div>
        </div>
    );
};

export default SuccessNotif;