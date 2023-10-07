import React, { Fragment, useEffect, useRef } from 'react';
import '../../css/MapDelivery/MapDelivery.css';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Icon } from 'leaflet';

interface IMapDelivery { 
  markerPosition: any,
  centerPosition: any,
  popupInfo?: any,
};

const MapDelivery = ({centerPosition, markerPosition, popupInfo}: IMapDelivery) => {
  //const [positionCenter, setPositionCenter] = useState<any>();
  const markerRef = useRef<any>(null);
  const mapRef = useRef<any>(null);
  useEffect(() => {
    if (popupInfo) {
      const positionData = popupInfo.split(',');
      //setPositionCenter([+positionData[0], +positionData[1]]);
      //markerRef?.current[popupInfo]?.leafletElement.openPopup(popupInfo);
      mapRef.current.setView([+positionData[0], +positionData[1]]);
      markerRef?.current.bindPopup(`<h3>${positionData[2] ?? ''}, ${positionData[3] ?? ''}<br/>${positionData[4] ?? ''}</h3>`).openPopup([+positionData[0], +positionData[1]]);
      console.log([+positionData[0], +positionData[1],positionData[2],positionData[3],positionData[4]]);
    }
  },[popupInfo])  

  const customMarker = new Icon({
    iconUrl: "/mapMarker/mapMarker.png",
    iconSize: [38, 38]
  });
  
  console.log('MARKER_CURRENT: ', markerRef.current)

  return (
      <div className='mapDeliveryContainer'>
        <div id="map">
          <MapContainer 
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
          {markerPosition && markerPosition.map((mark: any) => (
            <Fragment key={mark.SiteKey}>
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
            </Fragment>
            )) 
          }
          </MapContainer>
        </div>
      </div>
  )
}

export default MapDelivery