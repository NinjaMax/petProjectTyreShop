import React, { useEffect, useRef } from 'react';
import '../../css/MapDelivery/MapDelivery.css';
import 'leaflet/dist/leaflet.css';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import { Icon } from 'leaflet';

interface IMapDelivery { 
  markerPositionDel: any,
  markerPositionNP: any,
  centerPosition: any,
  popupInfo?: any,
};

const MapDelivery = ({
  centerPosition, 
  markerPositionNP, 
  markerPositionDel,
  popupInfo,
}: IMapDelivery) => {
  const markerRef = useRef<any>(null);
  const mapRef = useRef<any>(null);

  useEffect(() => {
    if (popupInfo && markerPositionNP) {
      
      const positionData = popupInfo.split(',');
      
      if (markerRef?.current.isPopupOpen()) {

        markerRef?.current.closePopup();
        markerRef?.current.unbindPopup();
        
        mapRef.current.setView([+positionData[0], +positionData[1]]);
        markerRef?.current.bindPopup(`<h3>${positionData[2] ?? ''}, ${positionData[3] ?? ''}<br/>${positionData[4] ?? ''}</h3>`).openPopup([+positionData[0], +positionData[1]]);

      } else {
      markerRef?.current.closePopup();   
      markerRef?.current.unbindPopup(); 
      
      mapRef.current.setView([+positionData[0], +positionData[1]]);
      markerRef?.current.bindPopup(`<h3>${positionData[2] ?? ''}, ${positionData[3] ?? ''}<br/>${positionData[4] ?? ''}</h3>`).openPopup([+positionData[0], +positionData[1]]);
      
      };
    } 
    if (popupInfo && markerPositionDel) {
      
      const positionData = popupInfo.split(',');
      
      if (markerRef?.current.isPopupOpen()) {

        markerRef?.current.closePopup();
        markerRef?.current.unbindPopup();
        
        mapRef.current.setView([+positionData[0], +positionData[1]]);
        markerRef?.current.bindPopup(`<h3>${positionData[2] ?? ''}, ${positionData[3] ?? ''}<br/>${positionData[4] ?? ''}</h3>`).openPopup([+positionData[0], +positionData[1]]);
        
      } else {
      markerRef?.current.closePopup();   
      markerRef?.current.unbindPopup(); 
      
      mapRef.current.setView([+positionData[0], +positionData[1]]);
      markerRef?.current.bindPopup(`<h3>${positionData[2] ?? ''}, ${positionData[3] ?? ''}<br/>${positionData[4] ?? ''}</h3>`).openPopup([+positionData[0], +positionData[1]]);
      };
    } 
     
  },[markerPositionDel, markerPositionNP, popupInfo]);
  
  const customMarker = new Icon({
    iconUrl: "/mapMarker/mapMarker.png",
    iconSize: [38, 38]
  });
  
  return (
    <div className='mapDeliveryContainer'>
      <div >
        <MapContainer 
          id="map"
          ref={mapRef}
          center={centerPosition} 
          zoom={13} 
          scrollWheelZoom={true}
          style={{ 
            width: "95%", 
            height: "calc(60vh - 4rem)",
            display: "block", 
            borderRadius: "10px",
          }}
        >
          <div id='childMap'> 
          {markerPositionNP ? markerPositionNP.map((mark: any) => (
            <div id='mapChildNP' key={mark.SiteKey + '-map'}>
              
            <TileLayer 
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker 
              position={[mark.Latitude, mark.Longitude]} 
              icon={customMarker}
              ref={markerRef}
            >
                <Popup>
                <h3>{mark.Description} <br/> тел: {mark.Phone}</h3>
                </Popup>
            </Marker>
            </div>
            )) : null
          }
          {markerPositionDel ? markerPositionDel.map((mark: any) => (
            <div id='mapParents' key={mark.id + '-map'}>
              
            <TileLayer 
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker 
              position={[mark.latitudeCorrect, mark.longitudeCorrect]} 
              icon={customMarker}
              ref={markerRef}
            >
              <Popup>
                <h3>{mark.name + ' ' + mark.address} <br/> тел: {'38 0800-509-609'}</h3>
              </Popup>
            </Marker>
            </div>
            )) : null
          }
          </div>
        </MapContainer>
      </div>
    </div>
  )
}

export default MapDelivery;
