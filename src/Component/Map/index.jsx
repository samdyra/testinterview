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
} from "react-map-gl";

const MapScreen = (props) => {
  const {
    handleMapClick = () => {}, markerCoord, baseMap, handleRouteClick = () => {}, routeCoord, trackingMode, route
  } = props;

  const handleClickMap = !trackingMode ? handleMapClick : handleRouteClick;

  const dataOne = {
    type: "Feature",
    properties: {},
    geometry: route[0]?.geometry
  };

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
      </Map>
    </MapProvider>
  );
};

export default memo(MapScreen);
