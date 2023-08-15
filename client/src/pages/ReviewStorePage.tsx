import React from 'react';
import '../css/Pages/ReviewStorePage.css';
import BreadCrumbs from '../components/BreadCrumbs';
import ButtonAction from '../components/buttons/ButtonAction';
import ReviewStore from '../components/reviews/ReviewStore';

const ReviewStorePage = () => {
  return (
    <div className='reviewStorePage'>
      <BreadCrumbs route={['/','/tyres']} hrefTitle={['Home','Tyres']}/>
      <div className='reviewStorePageContainer'>
        <div className='reviewStorePageTitle' >
          <span>Відгуки клієнтів про інтернет магазин</span>
          <ButtonAction props={'Додати відгук'}/> 
        </div>
        <div className='reviewStorePageBox'>
          <ReviewStore/>
        </div>
      </div>
    </div>
  )
}

export default ReviewStorePage