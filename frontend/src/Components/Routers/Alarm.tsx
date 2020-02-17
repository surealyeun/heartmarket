import React, { Component } from "react";
import { Redirect } from "react-router-dom";

import "./Alarm.scss";
import Header from "../common/Header";
import Footer from "../common/Footer";
import TopButton from "../common/TopButton";
import AlarmList from "../alarm/AlarmList";
import axios from "axios";

class Alarm extends Component {

  state = {
    alarms: [{
      alarmid: 1,
      img:
        "https://dnvefa72aowie.cloudfront.net/origin/article/202001/142e5f439d6d5e28a381afea8ff31c8f065dfc28d44c7c0b1281f2d132b36f26.webp?q=82&s=300x300&t=crop",
      name: "송마음이",
      time: "1분전",
      title: "포트메리온 그릇 20종 미사용",
      text: "상품에 관심있어서 연락드려요~~ 사고 싶어요",
      check: false,
      readcheck: false,
      senddelete: false,
      recievedelete: false
    }],
    //받은 알림(false), 보낸 알림 (true)
    sendStatus: false,
    deleteAlarm: false,
    //전체 선택 여부 확인 변수
    check: false,
    readcheck: "notyet"
  }

  user = JSON.parse(window.sessionStorage.getItem('user') || '{}');

  //전체 선택하는 부분
  CheckedAll = () => {
    this.state.alarms.forEach(alarm => (alarm.check = !this.state.check));
    this.setState({
      check: !this.state.check
    })
  };

  changeRead = (e: any) => {
    //읽은 상태 변경시 체크 상태 변경
    this.state.alarms.forEach(alarm => (alarm.check = false));
    this.setState({
      readcheck: e.target.value
    })
    window.sessionStorage.setItem("readcheck", e.target.value);

    this.callAxios();
  };

  changeSendStatus = (e: any) => {
    //보낸 상태 변경시 체크 상태 변경
    this.state.alarms.forEach(alarm => (alarm.check = false));
    this.setState({ check: false });
    //상태에 따른 이미지 업로드 -> axios 호출로 변경
    if (e.target.value === "false") {
      this.sendStatusFalse();
    } else if (e.target.value === "true") {
      this.sendStatusTrue();
    }

    this.callAxios();
  };

  //세션 스토리지의 값 기본 값 받아오기
  componentDidMount() {
    window.sessionStorage.setItem("searchCategory", "0");
    var read = window.sessionStorage.getItem("readcheck");
    if (window.sessionStorage.getItem("sendStatus") === "true") {
      this.sendStatusTrue();
    } else {
      this.sendStatusFalse();
    }
    this.setState({
      readcheck: read
    })
    window.sessionStorage.setItem("readcheck", read||"notyet");

    this.callAxios();
  }

  //보낸
  sendStatusTrue = () => {
    this.setState({
      sendStatus: true,
      readcheck: "all"
    })
    window.sessionStorage.setItem("sendStatus", "true");
    window.sessionStorage.setItem("readcheck", "all");
  }

  //받은
  sendStatusFalse = () => {
    this.setState({
      sendStatus: false,
      readcheck: "notyet"
    })
    window.sessionStorage.setItem("sendStatus", "false");
    window.sessionStorage.setItem("readcheck", "notyet");
  }

  //Axois 호출하기
  callAxios = () => {
    var url = ""
    //받은
    if (window.sessionStorage.getItem("sendStatus") === "false") {
      //안 읽은 전체 읽은
      if (window.sessionStorage.getItem("readcheck") === "notyet") url="/mail/findAllUnReaded";
      else if (window.sessionStorage.getItem("readcheck") === "all") url="/mail/findAllReceive";
      else if (window.sessionStorage.getItem("readcheck") === "read") url ="/mail/findAllReaded"
    }
    // 보낸
    else {
      //안 읽은 전체 읽은
      if (window.sessionStorage.getItem("readcheck") === "notyet") url = ""
      else if (window.sessionStorage.getItem("readcheck") === "all") url="/mail/findAllSend"
      else if (window.sessionStorage.getItem("readcheck") === "read") url = ""
    }
    axios({
      method: "get",
      url: url,
      params: {
        receiverMail: this.user.email
      }
    })
      .then(res => {
        const alarms = res.data;
        console.log(alarms);
        this.setState({
          alarms
        });
      })
      .catch(err => {
        console.log("err", err);
      });
  }

  render() {
    if (this.user.email === undefined) {
      alert("로그인을 해야 가능한 서비스 입니다.")
      return <Redirect to="/"></Redirect>
    }
    return (
      <>
        <Header></Header>
        <div className="Alarm">
          <div className="alarm_haeder">
            <select onChange={this.changeSendStatus} value={this.state.sendStatus + ""}>
              <option value="false">받은 알림</option>
              <option value="true">보낸 알림</option>
            </select>
            <p className="alarm_text">
              {this.state.sendStatus !== false ? "보낸 " : "받은 "}알림함
            </p>
          </div>
          <div className="alarm_check">
            <input
              className="checkbox"
              checked={this.state.check}
              type="checkbox"
              onClick={this.CheckedAll}
              readOnly
            ></input>
            <div className="alarm_deleteall">삭제</div>
            <div className="alarm_readall">읽음 표시</div>
            {this.state.sendStatus === false ? (
              <select onChange={this.changeRead} value={this.state.readcheck}>
                <option value="notyet">안읽은 알림</option>
                <option value="read">읽은 알림</option>
                <option value="all">전체 알림</option>
              </select>
            ) : (
                <select onChange={this.changeRead} value={this.state.readcheck}>
                  <option value="all">전체 알림</option>
                  <option value="notyet">안읽은 알림</option>
                  <option value="read">읽은 알림</option>
                </select>
              )}
          </div>
          <div>
            <hr></hr>
            {this.state.alarms.map(alarm => (
              <AlarmList
                key={alarm.alarmid}
                sendStatus={this.state.sendStatus}
                deleteAlarm={this.state.deleteAlarm}
                check={this.state.check}
                {...alarm}
              ></AlarmList>
            ))}
          </div>
        </div>
        <TopButton></TopButton>
        <Footer></Footer>
      </>
    );
  }
}

export default Alarm;
