import React from 'react';
import '../../css/Goods/AllAboutProduct.css';
import productImage from '../../assets/autotyrespilotspotps2.png';

const AllAboutProduct = () => {

    return (
        <div className='allAboutProduct'>
            <img src={productImage} alt='productImg'/>
        </div>
    );
};

export default AllAboutProduct;