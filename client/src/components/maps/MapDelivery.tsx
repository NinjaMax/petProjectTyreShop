import React, { useState } from 'react';
import '../../css/MapDelivery/MapDelivery.css';
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Icon } from 'leaflet';

interface IMapDelivery { 
  markerPosition: any,
  centerPosition: any,
  popupInfo: string[],
};

const MapDelivery = ({centerPosition, markerPosition, popupInfo}: IMapDelivery) => {
  //const [centerLat, setCenterLat] = useState<number[]>(centerPosition);
  const centerLat = centerPosition;
  const customMarker = new Icon({
    iconUrl: "/mapMarker/mapMarker.png",
    iconSize: [38, 38]
  });

  return (
      <div className='mapDeliveryContainer'>
        <div id="map">
          <MapContainer 
            center={centerPosition} 
            zoom={17} 
            scrollWheelZoom={true}
            style={{ 
              width: "95%", 
              height: "calc(60vh - 4rem)",
              display: "block", 
              borderRadius: "10px",
            }}
          >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={markerPosition} icon={customMarker}>
                <Popup>
                <h3>{popupInfo} <br /> {popupInfo}</h3>
                </Popup>
            </Marker>
          </MapContainer>
        </div>
      </div>
  )
}

export default MapDelivery