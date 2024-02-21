import React from 'react'
import '../../css/UXcss/LoadMoreGoods.css';
import { observer } from 'mobx-react-lite';
import { useTranslation } from 'react-i18next';

const LoadMoreGoods = observer(({loadMore}: any) => {
  const { t, i18n } = useTranslation();

  return (
    <div className='loadMoreGoods'
        onClick={loadMore}>
        <i className="fas fa-redo-alt"></i>
            <span>{t('loadMore.title')}</span>
    </div>
  )
});

export default LoadMoreGoods