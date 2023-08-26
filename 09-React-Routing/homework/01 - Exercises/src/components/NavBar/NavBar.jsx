import React from "react";
import logoHenry from "../../assets/logo-henry.png";
import styleNav from "./NavBar.module.css";
import { NavLink } from "react-router-dom";

export default function NavBar() {

  function styleNavBar({isActive}) {
    if (isActive) {
      return styleNav.active;
    } else {
      return styleNav.disable;
    };
  };

  return (
    <div className={styleNav.container}>
      <ul className={styleNav.menu}>
        <li>
          <NavLink to="/">
            <img src={logoHenry} alt="logo-henry" />
          </NavLink>
        </li>
        <li>
          <h1>Central de Cruceros</h1>
        </li>
        <div className={styleNav.options}>
          <li>
            <NavLink to="/shipping" className={styleNavBar}>
              <span>Navieras</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/discounts" className={styleNavBar}>
              <span>Promociones</span>
            </NavLink>
          </li>
        </div>
      </ul>
    </div>
  );
}
