import React, { Component } from "react";
import "./Hamburger.scss";
import Gauge from "../Hamburger/Gauge";
import MainProfile from "../Hamburger/MainProfile";
import HamZzim from "../Hamburger/HamZzim";

class Hamburger extends Component {

  state = {
    visible: false,
    login: false,
    tab: false
  };

  //로그인 했는지 확인하고 찜 목록이랑 다 받아오기
  constructor(props: any) {
    super(props);

    this.state = {
      visible: false,
      login: window.localStorage.getItem("log") === "true"? true : false,
      //login: true,
      tab: false
    };
  }

  //햄버거 박스 활성화 함수
  onclick = () => {
    this.setState({
      visible: !this.state.visible,
      tab:false
    })
  };

  //tab 클릭시 클릭한 버튼의 id 값을 받아와 변경
  onTabclick = (e: any) => {
    if (e.target.id === "tabmyinfo") {
      this.setState({
        tab:false
      })
    }
    else {
      this.setState({
        tab:true
      })
    }
  }

  render(){
    const{visible,login,tab} = this.state;
  return (
    <div className="Hamburger">
      <button type="button" id="menu" onClick={this.onclick}>
        <span></span>
        <span></span>
        <span></span>
      </button>
      <div>
        <div className={`${visible && "hambuger_sub"}`} onClick={this.onclick}></div>
        <div className={`${visible && "hambuger_box"}`} id="hambuger_box">
          {!visible ? (
            ""
          ) : (
              <div>
                <div className="hambuger_profile">
                  <MainProfile></MainProfile>
                </div>
                {!login ? ( //로그인 했을 때 - 변수 바꾸기
                  ""
                ) : (
                    <div className="hambuger_background">
                      {tab ? ( //채팅을 선택했을때 - 변수 바꾸기
                        <div>
                          <div id="tabmyinfo" className="hambuger_tabbtn hambuger_tapcheck" onClick={e=>this.onTabclick(e)}>내정보</div>
                          <div id="tabchat" className="hambuger_tabbtn hambuger_chat" onClick={e=>this.onTabclick(e)}>채팅</div>
                        </div>
                      ) : (
                          <div>
                            <div id="tabmyinfo" className="hambuger_tabbtn" onClick={e=>this.onTabclick(e)}>내정보</div>
                            <div id="tabchat" className="hambuger_tabbtn hambuger_chat hambuger_tapcheck" onClick={e=>this.onTabclick(e)}>채팅</div>

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

                <button type="button" className="bnt_close" onClick={this.onclick}>
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
}

export default Hamburger;
