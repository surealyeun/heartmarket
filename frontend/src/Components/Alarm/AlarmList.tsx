import React from "react";
import { Link } from "react-router-dom";
import "./AlarmList.scss";
//import PreAlarm from "./PreAlarm";

interface alarm {
  alarmid: number;
  img: string;
  name: string;
  time: string;
  title: string;
  text: string;
  check: boolean;
  readcheck: boolean;
  sendStatus: string;
}

class AlarmList extends React.Component<alarm> {
  state = {
    alarmid: 0,
    img: "",
    name: "",
    time: "",
    title: "",
    text: "",
    check: false,
    readcheck: false,
    sendStatus: false
  };

  constructor(props: any) {
    super(props);
    this.state = {
      ...props
    };
  }

  componentDidUpdate(preProps: any, preStates: any) {
    if (this.props.check !== preProps.check) {
      this.setState({
        check: this.props.check
      });
    }
    if (this.state.check !== preStates.check) {
      console.log(this.state.alarmid + " " + this.state.check);
    }
  }

  componentWillUnmount() {
    this.setState({
      check: false
    });
    console.log(this.state.alarmid + " " + this.state.check);
  }

  Checkbox = () => {
    this.setState({
      check: !this.state.check
    });
  };

  // <div className={`${visible && "hambuger_sub"}`} onClick={this.onclick}></div>
  render() {
    return (
      <div className="AlarmList" key={this.state.alarmid}>
        <input
          type="checkbox"
          checked={this.state.check}
          onClick={this.Checkbox}
          readOnly
        ></input>
        <div className="alarm_item">
          <div className="send_btn">답장하기</div>
          <Link to={{
              pathname: "/alarm/detail",
              state: { alarmid: this.state.alarmid }
            }}
          >
            <img
              className="alarmlist_img"
              alt="profile"
              src={this.state.img}
            ></img>
            <div className={`${this.state.readcheck && "readcheck"}`}>
              <p className="">{this.state.name}</p>
              <p className="">{this.state.time}</p>
              <div className="aaa">{this.state.title}</div>
              <div className="bbb">{this.state.text}</div>
            </div>
          </Link>
        </div>
        <hr></hr>
      </div>
    );
  }
}

export default AlarmList;
