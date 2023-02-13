import React, { memo } from "react";
import Map, {
  MapProvider,
  NavigationControl,
  FullscreenControl,
  GeolocateControl,
  Marker,
  AttributionControl,
  Source,
  Layer,
  Popup
} from "react-map-gl";

const MapScreen = (props) => {
  const {
    handleMapClick = () => {}, markerCoord, baseMap, handleRouteClick = () => {}, routeCoord, trackingMode, route, savedPoint, savedTrack
  } = props;

  const handleClickMap = !trackingMode ? handleMapClick : handleRouteClick;
  const [ popupInfo, setPopupInfo ] = React.useState(null);



  const dataOne = {
    type: "Feature",
    properties: {},
    geometry: route[0]?.geometry
  };

  const geoJsonTrack = savedTrack && savedTrack?.data?.map((el) => {
    const arrayedCoordinateTrack = savedTrack ? Object.values(el?.track || {}) : null
    return {
      "type": "Feature",
      "properties": {},
      "geometry": { coordinates: arrayedCoordinateTrack, type: "LineString" }
    }

  })



  return (
    <MapProvider>
      <Map
        initialViewState={{
          longitude:0.1276 ,
          latitude: 51.5072,
          zoom: 15,
        }}
        mapboxAccessToken={baseMap.apiKey}
        style={{
          width: "100vw",
          height: "92vh",
          marginTop: "8vh",
        }}
        mapStyle={baseMap.url}
        attributionControl={false}
        onClick={(e) => handleClickMap(e)}
      >
        <AttributionControl customAttribution="Made with love by Sam X Datasintesa" style={{ color: "black" }}/>
        <NavigationControl position="bottom-right" />
        <FullscreenControl />
        <Marker latitude={markerCoord.lat} longitude={markerCoord.lng}/>
        <GeolocateControl />
        {routeCoord && routeCoord.map((el) => {
          return (
            <Marker latitude={el?.lat} longitude={el.lng} offsetLeft={-20} offsetTop={-10} color="red"/>
          )
        })}
        {savedPoint && savedPoint?.data ? savedPoint?.data?.map((el) => {
          return (
            <Marker latitude={el?.latitude || 0} longitude={el?.longitude || 0} offsetLeft={-20} offsetTop={-10} color="yellow" onClick={(e) => {
              e.originalEvent.stopPropagation();
              setPopupInfo(el);
            }} />
          )
        }): null}
        {route && (
          <Source id="polylineLayer" type="geojson" data={dataOne}>
            <Layer
              id="lineLayer"
              type="line"
              source="my-data"
              layout={{
                "line-join": "round",
                "line-cap": "round"
              }}
              paint={{
                "line-color": "rgba(230, 0, 0, 1)",
                "line-width": 2
              }}
            />
          </Source>
        )}
        {/* {savedTrack && (
          <Source id="polylineLayer" type="geojson" data={dataTwo}>
            <Layer
              id="lineLayer"
              type="line"
              source="my-data"
              layout={{
                "line-join": "round",
                "line-cap": "round"
              }}
              paint={{
                "line-color": "rgba(0, 230, 0, 1)",
                "line-width": 2
              }}
            />
          </Source>
        )} */}
        {/* {geoJsonTrack && geoJsonTrack.map((el) => {
          return (
            <Source id="polylineLayer" type="geojson" data={el}>
              <Layer
                id="lineLayer"
                type="line"
                source="my-data"
                layout={{
                  "line-join": "round",
                  "line-cap": "round"
                }}
                paint={{
                  "line-color": "rgba(0, 230, 0, 1)",
                  "line-width": 2
                }}
              />
            </Source>
          )
        })} */}
        {popupInfo && (
          <Popup
            anchor="top"
            longitude={Number(popupInfo.longitude)}
            latitude={Number(popupInfo.latitude)}
            onClose={() => setPopupInfo(null)}
          >
            <a>
              {popupInfo?.nama}   &nbsp;
              {popupInfo?.namaTempat} 
            </a>
            <img width="100%" height="50%" src={popupInfo.image} />
          </Popup>
        )}
      </Map>
    </MapProvider>
  );
};

export default memo(MapScreen);
