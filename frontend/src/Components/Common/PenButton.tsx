import React from "react";
import "./PenButton.scss";
import Pen from "../img/Pen2.png";

function PenButton(){

    return(
        <div className="PenButton">
            <div>
                <img className="img_button" alt=""src={Pen}></img>
            </div>
        </div>
    );
}

export default PenButton;
