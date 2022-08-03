import React from 'react';
import CatalogTyres from '../components/Catalogs/CatalogTyres';
import FilterCatalogTyres from '../components/FilterCatalog/FilterCatalogTyres';
import '../css/CatalogTyresPage.css'

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
        <div className='d'>D</div>
        <div className='e'>E</div>  
      </div>
    );
};

export default CatalogTyresPage;