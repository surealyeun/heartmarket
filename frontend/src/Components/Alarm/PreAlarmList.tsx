import React, { Component } from "react";
import PreAlarm from "../alarm/PreAlarm";
import { Link } from "react-router-dom";
import "./PreAlarmList.scss";
import axios from "axios";
// import { Redirect } from "react-router";

class PreAlarmList extends Component {
  state = {
    mail: {
      total: 0,
      data: [
        {
          mailNo: 0,
          title: "",
          content: "",
          sendDate: "",
          sendDel: 0,
          readDel: 0,
          readDate: "",
          trade: {
            tradeNo: 0,
            tradeTitle: "",
            productInfo: "",
            ttradeImg: [{ imgNo: 0, orgImg: "" }],
          },
          sender: {
            userNo: 0,
            email:"",
            nickname: "",
            profileImg: ""
          },
          receiver:{
            userNo: 0,
            email:"",
            nickname: "",
            profileImg: ""
          }
        }
      ]
    }
  };

  user = JSON.parse(window.sessionStorage.getItem("user") || "{}");

  componentDidMount() {
    axios({
      method: "get",
      url: "http://13.125.55.96:8080/mail/findAllUnReaded",
      params: {
        receiverMail: this.user.email,
        no: 0
      }
    })
      .then(res => {
        const mail = res.data;
        this.setState({
          mail
        });
      })
      .catch(err => {
        // // console.log("err", err);
      });
  }

  render() {
    return (
      <span className="PreAlarmList">
        <p className="prealarm_num">새로운 쪽지 ({this.state.mail.total})</p>
        <Link to={{ pathname: "/alarm" }}>
          <p className="prealarm_plus">더보기</p>
        </Link>
        <div className="prealarm_bundle">
          {this.state.mail.data.map(mails => (
            <div key={mails.mailNo}>
              <Link
                to={{
                  pathname: "/alarm/detail",
                  state: { data: mails }
                }}
              >
                <PreAlarm data={mails}></PreAlarm>
              </Link>
            </div>
          ))}
        </div>
      </span>
    );
  }
}

export default PreAlarmList;