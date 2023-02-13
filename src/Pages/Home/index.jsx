import React, { useState } from "react";
import useGetCurrentLocation from "../../hooks/useGetCurrentLocation";
import {
  Sidebar, PressComponent, ControlPanel, Modal, MapScreen, BaseMapPicker
} from "../../Component";
import { MAPBOX_API_KEY_STREET } from "../../constants";
import useGetRoute from "../../hooks/useGetRoute";


export default function HomeScreen() {

  // ---------- HOOKS ----------
  const [ trackingMode, setTrackingMode ] = useState(true)
  const [ routeCoord, setRouteCoord ] = useState([ ])
  const { route } = useGetRoute( "mapbox/driving", routeCoord)
  const [ shownRoute, setShownRoute ] = useState(route)
  const [ coord ] = useGetCurrentLocation();
  const [ baseMap, setBaseMap ] = useState({
    url: "mapbox://styles/mapbox/streets-v11",
    apiKey: MAPBOX_API_KEY_STREET,
  });

  const [ isModalShown, setIsModalShown ] = useState(false);
  const [ markerCoord, setMarkerCoord ] = useState({
    lng: 0,
    lat: 0
  })

  const [ coordClick, setCoordClick ] = useState({
    lng: coord.longitude,
    lat: coord.latitude,
  });

  // ---------- EFFECTS ----------
  React.useEffect(() => {
    setShownRoute(route)
  }, [ route ])

  // ---------- INTIAL FUNCTION ----------
  const handleMapClick = (e) => {
    setCoordClick(e.lngLat);
    setMarkerCoord(e.lngLat)

    setTimeout(() => {
      setIsModalShown(true)
    }, 700)
  };

  const clearMap = () => {
    setRouteCoord([])
    setShownRoute([])
  }

  const handleRouteClick = (e) => {
    if (routeCoord.length === 0) {
      return setRouteCoord([ e.lngLat ])
    }
    if (routeCoord.length === 2) {
      return clearMap()
    }
    return setRouteCoord([ ...routeCoord, e.lngLat ])
  }

  const handleTrackingMode = () => {
    setTrackingMode(!trackingMode)
  }

  // ---------- RENDER FUNCTION ----------
  return (
    <>
      <Modal
        open={isModalShown}
        coord={coordClick}
        onClose={() => setIsModalShown(false)}
      />
      <Sidebar>
        <ControlPanel routeCoord={routeCoord}/>
      </Sidebar>
      <MapScreen
        coord={coord}
        handleMapClick={handleMapClick}
        markerCoord={markerCoord}
        baseMap={baseMap}
        handleRouteClick={handleRouteClick}
        routeCoord={routeCoord}
        trackingMode={trackingMode}
        route={shownRoute}
      />
      <PressComponent handleTrackingMode={handleTrackingMode} trackingMode={trackingMode}/>
      <BaseMapPicker setBaseMap={setBaseMap}/>
    </>
  );
}
