import React, { useState } from "react";
import "./Hamburger.scss";

function Hamburger() {
  const [visible, setVisible] = useState(false);

  const onclick = () => {
    setVisible(!visible);
  };

  return (
    //const {visible} = this.useState;
    <div className="Hamburger">
      <button type="button" id="menu" onClick={onclick}>
        <span></span>
        <span></span>
        <span></span>
      </button>
      <div>
        <div className={`${visible && "hambuger_box"}`} id="hambuger_box">
          {!visible ? (
            ""
          ) : (
            <button type="button" className="bnt_close" onClick={onclick}>
              <img
                alt="close"
                src="https://image.flaticon.com/icons/svg/458/458595.svg"
              ></img>
            </button>
          )}
        </div>
        <div className={`${visible && "hambuger_sub"}`} onClick={onclick}> </div>
      </div>
    </div>
  );
}

export default Hamburger;
