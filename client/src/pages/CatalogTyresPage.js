import React from 'react';
import '../css/CatalogTyresPage.css';
import CatalogTyres from '../components/Catalogs/CatalogTyres';
import FilterCatalogTyres from '../components/FilterCatalog/FilterCatalogTyres';
import ReviewsMain from '../components/Reviews/ReviewsMain';
import ReviewsGoods from '../components/Reviews/ReviewsGoods';
import ReviewGoodsOverall from '../components/Reviews/ReviewGoodsOverall';
import ReviewsBrandOverall from '../components/Reviews/ReviewsBrandOverall';

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
              <ReviewsGoods reviewExtend={true}/>
          </ReviewsMain>
        </div>
        <div className='e'>
          <ReviewGoodsOverall/>
          <ReviewsBrandOverall/>
        </div>  
      </div>
    );
};

export default CatalogTyresPage;