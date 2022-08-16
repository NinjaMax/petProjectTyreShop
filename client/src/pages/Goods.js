import React from 'react';
import '../css/Goods.css';
import BreadCrumbs from '../components/BreadCrumbs';

                      
const GoodsPage = () => {
    return (
    
    <div className='goodsCard'>
        <div>
          <BreadCrumbs/>
        </div>
        <div>
          Card foto
        </div>
        <div>
          character Card
        </div>
    </div>
    );
};

export default GoodsPage;