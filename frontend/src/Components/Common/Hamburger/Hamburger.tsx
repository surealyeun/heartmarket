import React, { useState } from "react";
import "./Hamburger.scss";
import Gauge from "../Hamburger/Gauge";
import MainProfile from "../Hamburger/MainProfile";
import HamZzim from "../Hamburger/HamZzim";

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
        <div className={`${visible && "hambuger_sub"}`} onClick={onclick}></div>
        <div className={`${visible && "hambuger_box"}`} id="hambuger_box">
          {!visible ? (
            ""
          ) : (
            <div>
              <hr className="hr_1" />
              <div className="hambuger_profile">
                <MainProfile></MainProfile>
              </div>
              <hr className="hr_2" />
              <div className="hambuger_gauge">
                <Gauge></Gauge>
              </div>
              <hr className="hr_3" />
              <div className="btn1">내정보</div>
              <div className="btn2">채팅</div>
              <div className="hambuger_zzim">
                <HamZzim></HamZzim>
              </div>
              <button type="button" className="bnt_close" onClick={onclick}>
                <img
                  alt="close"
                  src="https://image.flaticon.com/icons/svg/458/458595.svg"
                ></img>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Hamburger;
