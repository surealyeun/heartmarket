import React, { Component } from "react";
import "./Hamburger.scss";
import Gauge from "./Gauge";
import MainProfile from "./MainProfile";
import HamZzim from "./HamZzim";
import PreAlarmList from "../../alarm/PreAlarmList";
import { Link } from "react-router-dom";

import { connect } from "react-redux";
import { RootState } from "../../../modules";

interface Props {
  status: string | null;
}

class Hamburger extends Component<Props> {

  state = {
    visible: false,
    tab: false
  };

  //로그인 했는지 확인하고 찜 목록이랑 다 받아오기
  constructor(props: any) {
    super(props);

    this.state = {
      visible: false,
      tab: false
    };
  }

  //햄버거 박스 활성화 함수
  onclick = () => {
    this.setState({
      visible: !this.state.visible,
      tab: false
    })
  };

  //tab 클릭시 클릭한 버튼의 id 값을 받아와 변경
  onTabclick = (e: any) => {
    if (e.target.id === "tabmyinfo") {
      this.setState({
        tab: false
      })
    }
    else {
      this.setState({
        tab: true
      })
    }
  }

  render() {
    const { visible, tab } = this.state;
    //console.log(this.props.status)
    return (
      <div className="Hamburger">
        <button type="button" id="menu" onClick={this.onclick}>
          <span></span> <span></span> <span></span>
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
                  {(this.props.status !== 'true') ? ( //로그인 했을 때 - 변수 바꾸기
                    ""
                  ) : (
                      <div className="hambuger_background">
                        {tab ? ( //채팅을 선택했을때 - 변수 바꾸기
                          <div>
                            <div id="tabmyinfo" className="hambuger_tabbtn hambuger_tapcheck" onClick={e => this.onTabclick(e)}>내정보</div>
                            <div id="tabalarm" className="hambuger_tabbtn hambuger_alarm" onClick={e => this.onTabclick(e)}>알림</div>
                            <div className="hambuger_prealarm">
                              <PreAlarmList></PreAlarmList>
                            </div>
                          </div>
                        ) : (
                            <div>
                              <div id="tabmyinfo" className="hambuger_tabbtn" onClick={e => this.onTabclick(e)}>내정보</div>
                              <div id="tabalarm" className="hambuger_tabbtn hambuger_alarm hambuger_tapcheck" onClick={e => this.onTabclick(e)}>알림</div>

                              <div className="hambuger_myinfo">
                                <div className="hambuger_gauge">
                                  <Gauge></Gauge>
                                </div>
                                <div className="hambuger_zzim">
                                  <HamZzim></HamZzim>
                                </div>
                                <div className="hambuger_godetail">
                                  <div></div> <Link to="/sale"><p>판매상품</p></Link>
                                  <div></div> <Link to="/purchase"><p>구매상품</p></Link>
                                  {/* <div></div> <p>공지하기</p>
                                  <div></div> <p>건의하기</p> */}
                                  <div></div>
                                </div>
                              </div>
                            </div>
                          )}
                      </div>
                    )}

                  <button type="button" className="bnt_close" onClick={this.onclick}>
                    <img alt="close" src="https://image.flaticon.com/icons/svg/458/458595.svg" ></img>
                  </button>
                </div>
              )}
          </div>
        </div>
      </div>
    );
  }
}

//export default Hamburger;
export default connect(
  ({ userStatus }: RootState) => ({
    status: userStatus.status
  })
)(Hamburger);
