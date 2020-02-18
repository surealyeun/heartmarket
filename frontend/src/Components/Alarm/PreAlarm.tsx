import React, { Component } from "react";
//import { Link } from "react-router-dom";
import "./PreAlarm.scss";

interface Mail {
  data: {
    mailNo: number;
    title: string;
    content: string;
    sendDate: string;
    readDate: string;
    sendDel: number;
    readDel: number;
    trade: {
      tradeNo: number;
      tradeTitle: string;
      productInfo: string;
      ttradeImg: Array<TtradeImg>;
    };
    sender: {
      userNo: number;
      email:string;
      nickname: string;
      profileImg: string;
    };
    receiver:{
        userNo: number;
        email:string;
        nickname: string;
        profileImg: string;
    }
  };
}

interface TtradeImg {
  imgNo: number;
  orgImg: string;
}

class PreAlarm extends Component<Mail> {

  render() {
    return (
      <div className="PreAlarm">
        <div className="prealarm_div">
          <img
            className="prealarm_img"
            alt="profile"
            src={this.props.data.sender.profileImg}
          ></img>
          <p className="mainTitle">{this.props.data.sender.nickname}</p>
          <div className="subTitle">
            {this.props.data.content}
          </div>
        </div>
      </div>
    );
  }
}

export default PreAlarm;