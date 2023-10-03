import React from 'react';
import '../../css/MapDelivery/MapDelivery.css';
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Icon } from 'leaflet';

const MapDelivery = () => {

  const customMarker = new Icon({
    iconUrl: "/mapMarker/mapMarker.png",
    iconSize: [38, 38]
  });

  return (
      <div className='mapDeliveryContainer'>
        <div id="map">
          <MapContainer 
            center={[51.505, -0.09]} 
            zoom={17} 
            scrollWheelZoom={false}
            style={{ 
              width: "50%", 
              height: "calc(50vh - 4rem)",
              display: "block", 
            }}
          >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[51.505, -0.09]} icon={customMarker}>
                <Popup>
                <h3>A pretty CSS3 popup. <br /> Easily customizable.</h3>
                </Popup>
            </Marker>
          </MapContainer>
        </div>
      </div>
  )
}

export default MapDelivery