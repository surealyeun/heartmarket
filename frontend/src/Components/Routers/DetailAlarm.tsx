import React, { Component } from "react";

import Header from "../common/Header";
import Nav from "../common/Nav";
import Footer from "../common/Footer";
import "./DetailAlarm.scss";
import axios from "axios";
// import PreAlarm from "../alarm/PreAlarm";

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
  };
}

interface TtradeImg {
  imgNo: number;
  tiTrade: number;
  orgImg: string;
}

class DetailAlarm extends Component<Mail> {
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
        tuser: {
          userNo: 0,
          nickname: ""
        },
      },
      sender: {
        userNo: 0,
        nickname: "",
        profileImg: ""
      }
    }
  };

  user = JSON.parse(window.sessionStorage.getItem("user") || "{}");

  constructor(props: any) {
    super(props);
    this.state = {
      ...props.location.state
    };
  }
  
  componentDidMount(){
    if(this.user.userNo !== this.state.data.sender.userNo){
      if(this.state.data.readDate === null){
        axios({
          method: "get",
          url: "http://13.125.55.96:8080/mail/readReceiver",
          params: {
            mailNo :this.state.data.mailNo,
            receiverMail : this.user.email
          }
        })
          .then(res => {
          })
          .catch(err => {
            console.log("err", err);
            alert("error");
          });
      }
    }
  }

   //새로운 Props를 받았을 때 렌더링 다시 해주는 함수
   componentDidUpdate (preProps:any) {
    //if (preProps.location.state.data.mailNo !== this.state.data.mailNo) {
      this.setState = ({
        ...preProps.location.state
      })
      window.location.reload();
  }

  render() {
    //console.log(this.state);
    return (
      <>
        <Header></Header>
        <Nav></Nav>
        <div key={this.state.data.mailNo} className="DetailAlarm">
          <div className="display">
            <p className="alarm_people">보낸 사람</p>
            <p className="background">{this.state.data.sender.nickname}</p>
            <p className="alarm_people rec_pos1">받는 사람</p>
            <p className="background rec_pos2">송마음이</p>
          </div>
          <div>
            <br></br>
            <br></br>
            <h2>{this.state.data.title}</h2>
            <p>보낸 시간 : {this.state.data.sendDate.substring(0, 16)}</p>
            <br></br>
            <br></br>
          </div>
          <div className="alarm_content">{this.state.data.content}</div>
          <br></br>
          <div>
            <br></br>
            <div className="detailalarm_btn">답장</div>
            <div className="detailalarm_btn pos_left">삭제</div>
          </div>
        </div>
        <Footer></Footer>
      </>
    );
  }
}

export default DetailAlarm;
