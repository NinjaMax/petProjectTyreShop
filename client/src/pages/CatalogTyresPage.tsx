import React from 'react';
import '../css/CatalogTyresPage.css';
import CatalogTyres from '../components/catalogs/CatalogTyres';
import FilterCatalogTyres from '../components/filterCatalog/FilterCatalogTyres';
import ReviewsMain from '../components/reviews/ReviewsMain';
import ReviewsGoods from '../components/reviews/ReviewsGoods';
import BreadCrumbs from '../components/BreadCrumbs';
//import CyrillicToTranslit from 'cyrillic-to-translit-js';
import { useLocation, useParams } from 'react-router-dom';

const CatalogTyresPage = ({crumbsItem}: any) => {
  const params = useParams<any>();
  const location = useLocation();
  //const cyrillicToTranslit = new CyrillicToTranslit<any>();
  
  // const crumbs ={ 
  //   crumbs: '/season', 
  //   title: 'Season'
  // }
  console.log('PARAMS: ', params.category);
  console.log('LOCATION: ', location.pathname);

    return (
      <div className='catalogTyres'>
        <div className='a'>
        {location.pathname.includes('tyres') ?
          <BreadCrumbs 
            route={['/','/tyres', `${params ?? null}`]} 
            hrefTitle={
              ['Головна','Шини',
            `${(params.category) ?? null}`]}
          />
        : null  
        }
        </div>
        <div className='b'>
        {location.pathname.includes('tyres') ?
          <FilterCatalogTyres/>
          : null
        }
        </div>
        <div className='c'>
          {location.pathname.includes('tyres') ?
            <CatalogTyres/>
            : null
          }

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