import React from "react";
import { Link } from "react-router-dom";
import "./AlarmList.scss";
//import PreAlarm from "./PreAlarm";

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
      tTradeImg: Array<TtradeImg>;
      tuser: {
        userNo: number;
        nickname: string;
      };
    };
    sender: {
      userNo: number;
      nickname: string;
      profileImg: string;
    };
    check: boolean;
  };
  check: boolean;
}

interface TtradeImg {
  imgNo: number;
  tiTrade: number;
  orgImg: string;
}

class AlarmList extends React.Component<Mail> {
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
        tTradeImg: [{ imgNo: 0, tiTrade: 0, orgImg: "" }],
      },
      sender: {
        userNo: 0,
        nickname: "",
        profileImg: ""
      },
      check: false
    },
    check: false
  };

  user = JSON.parse(window.sessionStorage.getItem("user") || "{}");

  constructor(props: any) {
    super(props);
    this.state = {
      ...props
    };
    console.log(this.state.data.readDate);
  }

  componentDidUpdate(preProps: any, preStates: any) {
    if (this.props.check !== preProps.check) {
      this.setState({
        check: this.props.check
      });
    }
    if (this.state.check !== preStates.check) {
      // console.log(this.state.data. + " " + this.state.check);
    }
    //여기서 삭제하기
    // if(this.state.check && this.props.deleteAlarm){

    // }
  }

  componentWillUnmount() {
    this.setState({
      check: false
    });
  }

  Checkbox = () => {
    this.setState({
      check: !this.state.check
    });
  };

  render() {
    return (
      <div className="AlarmList" key={this.state.data.mailNo}>
        <input
          type="checkbox"
          checked={this.state.check}
          onClick={this.Checkbox}
          readOnly
        ></input>
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
              {this.user.userNo !== this.state.data.sender.userNo? (<p className="nickname">{this.state.data.sender.nickname}</p>) : (<p className="nickname">{this.state.data.sender.userNo}</p>)}
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

export default AlarmList;
