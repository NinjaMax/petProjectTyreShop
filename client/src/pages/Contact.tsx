import React from 'react';
import '../css/Pages/Contact.css';
import { useTranslation } from 'react-i18next';

const Contact = () => {
  const { t } = useTranslation();
    return (
        <div className='contactPageContainer'>
          <h3>Контакти{t("contactPage.contacts")}</h3>
          <div className='contactPageBox'>
            <div className='contactPageAddress'>
                <span>{t('contactPage.addressStoreCity')} </span> 
                <span>info@example.com</span>
            </div>
            <div className='contactPagePhone'>
              <span className='contactPageTitle'>
                {t('contactPage.phonesConnections')}
              </span>
              <span>Kyivstar
              +38 (096) 490-00-55</span>
              <span>Vodafone
              +38 (099) 490-00-55</span>
              <span>{t("contactPage.phonesConnectionsCity")}</span>
            </div>
            <div className='contactPageSocial'>
              <span className='contactPageTitle'>
                {t('contactPage.messendgers')}
              </span>
              <span>Viber
              @.......</span>
              <span>Telegram
              @.......</span>
            </div>
            <div className='contactPageSchedule'>
              <span className='contactPageTitle'>
                {t('contactPage.shedule')}
              </span>
              <span>пн – пт: з 8:00 до 20:00</span>
              <span>сб: з 9:00 до 15:00</span>
            </div>
          </div>
        </div>
    );
};

export default Contact;