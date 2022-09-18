import React from "react";
import { menu } from "../../Assets";
import "./styles.css";

export const MenuButton = ({ type, colour, height, width }) => {
  return (
    <div id="menuButton" style={{ width: width, height: height }}>
      <button id="menu" style={{ background: colour }}>
        <img src={menu[type] || menu["placeholder"]} alt={type} />
      </button>
    </div>
  );
};
