import React, { Component } from "react";
import "./Gauge.scss";
import axios from "axios";
import { Progress } from "antd";

class Gauge extends Component {
  user = JSON.parse(window.sessionStorage.getItem("user") || "{}");

  state = {
    BPM:0
  };

  componentDidMount() {
    axios({
      method: "get",
      url: "http://13.125.55.96:8080/mypage/manner",
      params: {
        email: this.user.email
      }
    })
      .then(res => {
        console.log(res.data)
        this.setState({
          BPM:res.data.data.heartgauge
        })
      })
      .catch(err => {
        console.log("err", err);
      });
  }

  render() {
    return (
      <div className="Gauge">
        <p className="heart_title">심쿵지수</p>
    <p className="heart_index">{this.state.BPM}BPM</p>
        <img
          className="heart_img"
          alt="하트"
          src="https://image.flaticon.com/icons/svg/1142/1142172.svg"
        ></img>
        <div className="progress">
        <Progress
          strokeColor={{
            from: "#108ee9",
            to: "#f494ab"
          }}
          percent={this.state.BPM}
          showInfo={false}
          status="active"
        />
        </div>
      </div>
    );
  }
}

export default Gauge;
