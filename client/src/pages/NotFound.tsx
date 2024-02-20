import React from 'react';
import '../css/Pages/NotFound.css';
import { useTranslation } from 'react-i18next';

const NotFound = () => {
  const { t } = useTranslation();

  return (
    <div className='notFoundBox'>
        <img src={'/iconsError/404_error_2.webp'} height={150} width={150} alt="not found"/>
        <h4>{t('notFoundPage.pageNotFound')}</h4>
        <p/>
        <a href='/'>{t('notFoundPage.linkToMainPage')}</a>
        <p/>
    </div>
  )
}

export default NotFound
