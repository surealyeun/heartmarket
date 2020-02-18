import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import Header from "../common/Header";
import Nav from "../common/Nav";
import Footer from "../common/Footer";
import "./DetailAlarm.scss";
import axios from "axios";
import Modal from "../alarm/AlarmModal";

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
      }
    },
    isModalOpen: false,
    delete:false
  };

  user = JSON.parse(window.sessionStorage.getItem("user") || "{}");

  constructor(props: any) {
    super(props);
    this.state = {
      ...props.location.state
    };
  }

  componentDidMount() {
    //읽은 알림 처리해주는 부분
    if (this.user.userNo !== this.state.data.sender.userNo) {
      if (this.state.data.readDate === null) {
        axios({
          method: "get",
          url: "http://13.125.55.96:8080/mail/readReceiver",
          params: {
            mailNo: this.state.data.mailNo,
            receiverMail: this.user.email
          }
        })
          .then(res => {
            //alert("알림이 삭제되었습니다.")
          })
          .catch(err => {
            console.log("err", err);
            alert("error");
          });
      }
    }
  }

  //새로운 Props를 받았을 때 렌더링 다시 해주는 함수
  componentWillReceiveProps(preProps: any) {
    if (preProps.location.state.data.mailNo !== this.state.data.mailNo) {
      this.setState = {
        ...preProps.location.state
      };
      window.location.reload();
    }
  }

  openModal = () => {
    this.setState({
      isModalOpen: true
    });
  };

  closeModal = () => {
    this.setState({
      isModalOpen: false
    });
  };

  deleteMail = () => {
    //내가 받은 메일 삭제
    var url =
      "http://13.125.55.96:8080/mail/delSender?senderMail=" +
      this.state.data.sender.email;
    //내가 보낸 메일 삭제
    if (this.state.data.sender.userNo !== this.user.userNo) {
      url =
        "http://13.125.55.96:8080/mail/delReceiver?receiverMail=" +
        this.state.data.receiver.email;
    }
    axios({
      method: "get",
      url: url,
      params: {
        mailNo: this.state.data.mailNo
      }
    })
      .then(res => {
        //삭제하면 메일목록으로 가기
        console.log(res.data);
        this.setState({
          delete:true
        })
      })
      .catch(err => {
        console.log("err", err);
        alert("error");
      });
  };

  render() {
    //받은 보낸 메일에 따라 다르게 보내기
    var Memail = this.state.data.sender.email;
    var Mnickname = this.state.data.sender.nickname;
    if (this.state.data.sender.userNo === this.user.userNo) {
      Memail = this.state.data.receiver.email;
      Mnickname = this.state.data.receiver.nickname;
    }
    if(this.state.delete) return (<Redirect to="/alarm"></Redirect>)
    return (
      <>
        <Header></Header>
        <Nav></Nav>
        <div key={this.state.data.mailNo} className="DetailAlarm">
          <div className="display">
            <p className="alarm_people">보낸 사람</p>
            <Link to={`/user/${this.state.data.sender.userNo}`}>
              <p className="background">{this.state.data.sender.nickname}</p>
            </Link>
            <p className="alarm_people rec_pos1">받는 사람</p>
            <Link to={`/user/${this.state.data.receiver.userNo}`}>
              <p className="background rec_pos2">
                {this.state.data.receiver.nickname}
              </p>
            </Link>
          </div>
          <div>
            <div className="alarm_content title">{this.state.data.title}</div>
            <p>보낸 시간 : {this.state.data.sendDate.substring(0, 16)}</p>
            <br></br>
          </div>

          {/* 거래에 대한 정보 표시 */}
          {this.state.data.trade.tradeNo !== undefined && (
            <Link
              to={{
                pathname: `/search/detail/${this.state.data.trade.tradeNo}`
              }}
            >
              <div className="trade_div">
                <img
                  className="trade_img"
                  alt="profile"
                  src={this.state.data.trade.ttradeImg[0].orgImg}
                ></img>
                <p className="mainTitle">{this.state.data.trade.tradeTitle}</p>
                <div className="subTitle">
                  {this.state.data.trade.productInfo}
                </div>
              </div>
            </Link>
          )}

          <br></br>
          <div className="alarm_content">{this.state.data.content}</div>
          <br></br>
          <div>
            <br></br>
            <div className="detailalarm_btn" onClick={this.openModal}>
              답장
            </div>
            <div className="detailalarm_btn pos_left" onClick={this.deleteMail}>
              삭제
            </div>

            <Modal
              tradeNo={this.state.data.trade.tradeNo}
              email={Memail}
              nickname={Mnickname}
              isOpen={this.state.isModalOpen}
              close={this.closeModal}
            />
            <br></br>
          </div>
        </div>
        <Footer></Footer>
      </>
    );
  }
}

export default DetailAlarm;
