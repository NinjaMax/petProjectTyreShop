import React from 'react';
import '../../css/NotificationCss/Notification.css';

const InfoNotif = ({children}: any) => {
    return (
        <div className="center">
            <div className="info">
                <i className="fa fa-info-circle spin"></i>
                    &nbsp; &nbsp;
                <span>{children}</span>
            </div>
        </div>
    );
};

export default InfoNotif;