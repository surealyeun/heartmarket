import React from "react";
import "./Header.scss";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header>
      <div className="Header">
        <div className="div">
          <button type="button" id="menu">
            <span></span>
            <span></span>
            <span></span>
          </button>
          <Link to={{ pathname: "/" }}>
            <img
              className="Logo"
              alt="logo"
              src="https://image.flaticon.com/icons/svg/1142/1142131.svg"
            ></img>
          </Link>
          <input className="input_search" id="input_search" type="text"></input>
          <input className="btn_search" type="button"></input>
        </div>
      </div>
      <div className="hambuger">
        <button type="button" className="bnt_close">X</button>
      </div>
    </header>
  );
}

export default Header;
