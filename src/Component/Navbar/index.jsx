import React, { memo } from "react";
import s from "./Navbar.module.scss";


const NavBar = () => (
  <div className={s.wrapper}>
    <div className={s.container}>
      <a href="/">Mapbox API Playground</a>
      {/* <a href="/map">Map</a>/ */}
    </div>
  </div>
)

export default memo(NavBar);
