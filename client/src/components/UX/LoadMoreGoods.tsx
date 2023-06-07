import React from 'react'
import '../../css/UXcss/LoadMoreGoods.css';
import { observer } from 'mobx-react-lite';

const LoadMoreGoods = observer(({loadMore}: any) => {

  return (
    <div className='loadMoreGoods'
        onClick={loadMore}>
        <i className='fa fa-refresh'></i>
            <span>Показати ще товари</span>
    </div>
  )
});

export default LoadMoreGoods