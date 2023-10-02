import React from 'react';
import '../../css/MapDelivery/MapDelivery.css';
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet';

const MapDelivery = () => {
  return (
    <div className='mapDeliveryContainer'>
        <div id="map">
        <MapContainer center={[51.505, -0.09]} zoom={5} scrollWheelZoom={false}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[51.505, -0.09]}>
                <Popup>
                A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
            </Marker>
        </MapContainer>
        </div>
    </div>
  )
}

export default MapDelivery