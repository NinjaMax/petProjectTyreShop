import React from 'react';
import '../css/CatalogTyresPage.css';
import CatalogTyres from '../components/Catalogs/CatalogTyres';
import FilterCatalogTyres from '../components/FilterCatalog/FilterCatalogTyres';
import ReviewsMain from '../components/Reviews/ReviewsMain';
import ReviewsGoods from '../components/Reviews/ReviewsGoods';
import ReviewGoodsOverall from '../components/Reviews/ReviewGoodsOverall';


const CatalogTyresPage = () => {
    return (
      <div className='catalogTyres'>
        <div className='a'>bread crumbs</div>
        <div className='b'>
          <FilterCatalogTyres/>
        </div>
        <div className='c'>
          <CatalogTyres/>
        </div>
        <div className='d'>
          <ReviewsMain props={'Відгуки клієнтів'}>
              <ReviewsGoods/>
          </ReviewsMain>
        </div>
        <div className='e'>
          <ReviewGoodsOverall/>
        </div>  
      </div>
    );
};

export default CatalogTyresPage;