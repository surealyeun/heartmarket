import React from "react";
import "./Hamburger.scss";
import Moveable from "react-moveable";

function Hamburger(){

    const ss = () => {
        
    };

    return(
        <div className="Hamburger">
            {/* <div className="box_hambuger" onClick={ss}></div> */}
            <Moveable></Moveable>
        </div>
    );
}

export default Hamburger;
