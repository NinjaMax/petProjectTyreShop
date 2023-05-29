import React from 'react';
import '../css/CatalogTyresPage.css';
import CatalogTyres from '../components/catalogs/CatalogTyres';
import FilterCatalogTyres from '../components/filterCatalog/FilterCatalogTyres';
import ReviewsMain from '../components/reviews/ReviewsMain';
import ReviewsGoods from '../components/reviews/ReviewsGoods';
import BreadCrumbs from '../components/BreadCrumbs';

const CatalogTyresPage = ({crumbsItem}: any) => {
  const crumbs ={ 
    crumbs: '/season', 
    title: 'Season'
  }

    return (
      <div className='catalogTyres'>
        <div className='a'>
          <BreadCrumbs 
            route={['/','/tyres', `${crumbs.crumbs ?? null}`]} 
            hrefTitle={['Home','Tyres',`${crumbs.title ?? null}`]}
          />
        </div>
        <div className='b'>
          <FilterCatalogTyres/>
        </div>
        <div className='c'>
          <CatalogTyres/>
        </div>
        <div className='d'>
          <ReviewsMain props={'Відгуки клієнтів'}>
            <ReviewsGoods reviewExtend={true} btnLeft={undefined} btnRight={undefined}/>
          </ReviewsMain>
        </div>
        <div className='e'>
          
        </div>  
      </div>
    );
};

export default CatalogTyresPage;