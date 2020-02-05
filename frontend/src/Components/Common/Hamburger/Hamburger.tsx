import React, { useState } from "react";
import "./Hamburger.scss";
import Gauge from "../Hamburger/Gauge";
import MainProfile from "../Hamburger/MainProfile";
import HamZzim from "../Hamburger/HamZzim";

function Hamburger() {
  const [visible, setVisible] = useState(false);
  const [login, setLogin] = useState(false);
  const [tab, setTab] = useState(false);

  const onclick = () => {
    setVisible(!visible);
    setTab(false);
  };

  const onTabclick = (e: any) => {
    //alert(e.target.id);
    if (e.target.id === "tabmyinfo") setTab(false);
    else setTab(true);
  }

  return (
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
                <div className="hambuger_profile">
                  <MainProfile></MainProfile>
                </div>
                {login ? ( //로그인 했을 때 - 변수 바꾸기
                  ""
                ) : (
                    <div className="hambuger_background">
                      {tab ? ( //채팅을 선택했을때 - 변수 바꾸기
                        <div>
                          <div id="tabmyinfo" className="hambuger_tabbtn hambuger_tapcheck" onClick={onTabclick}>내정보</div>
                          <div id="tabchat" className="hambuger_tabbtn hambuger_chat" onClick={onTabclick}>채팅</div>
                        </div>
                      ) : (
                          <div>
                            <div id="tabmyinfo" className="hambuger_tabbtn" onClick={onTabclick}>내정보</div>
                            <div id="tabchat" className="hambuger_tabbtn hambuger_chat hambuger_tapcheck" onClick={onTabclick}>채팅</div>

                            <div className="hambuger_myinfo">
                              <div className="hambuger_gauge">
                                <Gauge></Gauge>
                              </div>
                              <div className="hambuger_zzim">
                                <HamZzim></HamZzim>
                              </div>
                              <div className="hambuger_godetail">
                                <p>판매상품</p>
                                <p>구매상품</p>
                                <p>공지하기</p>
                                <p>건의하기</p>
                              </div>
                              <div>
                                <hr className="hr_1"></hr>
                                <hr className="hr_2"></hr>
                              </div>
                            </div>
                          </div>
                        )}
                    </div>
                  )}

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
