import React from 'react';
import '../css/Pages/DeliveryPage.css';
import MapDelivery from '../components/maps/MapDelivery';

const DeliveryPage = () => {
  return (
    <div className='deliveryPageContainer'>
        
        <div className='deliveryPageBox'>
            MAPS
            <MapDelivery/>
        </div>
    </div>
  )
}

export default DeliveryPage