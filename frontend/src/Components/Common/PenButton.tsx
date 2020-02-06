import React from "react";
import { useHistory } from "react-router-dom";
import "./PenButton.scss";
import Pen from "../img/Pen2.png";

function PenButton() {
  let history = useHistory();
  const GoWritePage = () => {
    if (window.localStorage.getItem("log") === "true") {
      //로그인이 되어있으면
      history.push("/join");
    } else {
      //로그인이 안되어있으면
      history.push("/login");
    }
  };

  return (
    <div className="PenButton">
      <div>
        <img
          className="img_button"
          alt=""
          src={Pen}
          onClick={GoWritePage}
        ></img>
      </div>
    </div>
  );
}

export default PenButton;
