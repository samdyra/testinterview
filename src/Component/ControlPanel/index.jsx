import React from 'react'
import s from "./styles.module.scss"
import { MAPBOX_ROUTING_PROFILES } from "../../constants"

const ControlPanel = ({
  routeCoord, clearMap, 
  route 
}) => {
  
  const [ shownRoute, setShownRoute ] = React.useState(routeCoord)
  const [shownDuration, setShowDuration] = React.useState(0)
  const [shownDistance, setShowDistance] = React.useState(0)
  const [shownRouteShown, setShowRouteShown] = React.useState([])

  const routeShown = route && route[0]?.legs[0]?.steps
  const distance = route && route[0]?.distance
  const duration = route && route[0]?.duration
  const minutes = Math.floor(duration / 60);
  console.log(route)

  const showData = () => {
    setShownRoute(routeCoord)
    setShowDuration(minutes)
    setShowDistance(distance)
    setShowRouteShown(routeShown)
  }

  React.useEffect(() => {
    if (routeCoord.length === 0) {
      setShownRoute([ { lng: 0, lat:0 }, { lng: 0, lat:0 } ])
      setShowDuration(0)
      setShowDistance(0)
      setShowRouteShown([])
    }
    else {
      showData()
    }
  }, [ routeCoord, distance, duration, minutes, routeShown ])


  return (
    <div className={s.wrapper}>
      <div className={s.title}>Control Panel</div>
      <div className={s.coorSrc}>Source Coordinate</div>
      <div className={s.coord}>X: {shownRoute[0]?.lng} | Y: {shownRoute[0]?.lat}</div>
      <div className={s.coorSrc}>Destiny Coordinate</div>
      {shownRoute.length !== 2 && <div className={s.coord}>X: 0 | Y: 0</div>}
      {shownRoute.length !== 1 && <div className={s.coord}>X: {shownRoute[1]?.lng} | Y: {shownRoute[1]?.lat}</div>}
      <div className={s.saveClear}>
        <div className={s.saveCoord}>Save Coordinate</div>
        <div>|</div>
        <div onClick={clearMap} className={s.saveCoord}>Clear Coordinate</div>
      </div>
      <div className={s.routingProfile}>Routing Profile</div>
      <div className={s.routingContent}> 
        {MAPBOX_ROUTING_PROFILES.map((profile, index) => {
          return (
            <div className={s.routingContainer}>
              <div key={index} className={s.routingEl}>{profile.name}</div>
            </div>
          )
        })}
      </div>
      <div className={s.estDuration}>
        <div>Estimaded Distance</div>
        <div className={s.value}>{shownDistance || 0} meter</div>
      </div>
      <div className={s.estDuration}>
        <div>Estimated Duration</div>
        <div className={s.value}>{shownDuration} minutes</div>
      </div>
      {shownRouteShown.length !== 0 && <div className={s.steps}>Steps</div>}
      {shownRouteShown && shownRouteShown.map((step, index) => {
        return (
          <div className={s.stepsContainer}>
            <div key={index}>- {step?.maneuver?.instruction}</div>
            <div className={s.value} key={index}>in around {step?.distance} m </div>
          </div>
        )
      })}
    </div>
  )
}

export default ControlPanel