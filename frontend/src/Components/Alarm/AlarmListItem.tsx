import React from "react";
import { Link } from "react-router-dom";
import "./AlarmListItem.scss";

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
      email: string;
      nickname: string;
      profileImg: string;
    };
    receiver: {
      userNo: number;
      email: string;
      nickname: string;
      profileImg: string;
    };
  };
}

interface TtradeImg {
  imgNo: number;
  orgImg: string;
}

class AlarmListItem extends React.Component<Mail> {
  state = {
    data: {
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
        ttradeImg: [{ imgNo: 0, orgImg: "" }]
      },
      sender: {
        userNo: 0,
        email: "",
        nickname: "",
        profileImg: ""
      },
      receiver: {
        userNo: 0,
        email: "",
        nickname: "",
        profileImg: ""
      },
    },
  };

  user = JSON.parse(window.sessionStorage.getItem("user") || "{}");

  constructor(props: any) {
    super(props);
    this.state = {
      ...props
    };
  }

  render() {
    return (
      <div className="AlarmList" key={this.state.data.mailNo}>
        <div className="alarm_item">
          {this.state.data.readDate === null ? (
            <div className="btn new_btn">new</div>
          ) : (
            <div className="btn read_btn">Read</div>
          )}

          <span className="time">
            {this.state.data.sendDate.substring(0, 16)}
          </span>
          <Link
            to={{
              pathname: "/alarm/detail",
              state: { data: this.state.data }
            }}
          >
            <img
              className="alarmlist_img"
              alt="사진"
              src={this.state.data.sender.profileImg}
            ></img>
            <div>
              {this.user.userNo !== this.state.data.sender.userNo ? (
                <p className="nickname">{this.state.data.sender.nickname}</p>
              ) : (
                <p className="nickname">{this.state.data.receiver.nickname}</p>
              )}
              <div className="title">{this.state.data.title}</div>
              <div className="content">{this.state.data.content}</div>
            </div>
          </Link>
        </div>
        <hr></hr>
      </div>
    );
  }
}

export default AlarmListItem;
