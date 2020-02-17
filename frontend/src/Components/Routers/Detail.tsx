import React from "react";
import Header from "../common/Header";
import Nav from "../common/Nav";
import SlideImg from "../common/SlideImg";
import Footer from "../common/Footer";
import axios from "axios";
import "./Detail.scss";
import Zzim from "../common/Zzim";
import { Link } from "react-router-dom";
import Modal from "../alarm/AlarmModal";
import { connect } from "react-redux";
import { RootState } from "../../modules";

interface Props {
  status: string | null;
}

class Detail extends React.Component<Props> {
  user = JSON.parse(window.sessionStorage.getItem("user") || "{}");

  state = {
    all:{
      trade: {
        tradeNo:0,
        tradeTitle: "",
        tradeCategory: "",
        tradeArea: "",
        tTradeImg: [{ imgNo: 0, tiTrade: 0, orgImg: "" }],
        productInfo: "",
        productPrice: "",
        tuser: { uno: 0, nickname: "", profileImg: "", email: "" },
        buser: "",
      },
      cno: 0,
      complete: 0
    },
    num: "",
    isModalOpen: false
  };

  category = [
    { name: ""},
    { name: "디지털/가전" },
    { name: "가구/인테리어" },
    { name: "유아동/유아도서" },
    { name: "생활가공식품" },
    { name: "여성의류" },
    { name: "여성잡화" },
    { name: "뷰티/미용" },
    { name: "남성패션/잡화" },
    { name: "스포츠/레저" },
    { name: "게임/취미" },
    { name: "도서/티켓/음반" },
    { name: "반려동물용품" },
    { name: "기타중고물품" }
  ];

  updateUrl = () => {
    const url = window.location.href.split("/");
    const num = url[url.length - 1];
    var email = "none";
    if (this.user.email !== undefined && this.user.email !== "") email = this.user.email;
    //if(email === undefined) email = "none";
    this.setState({
      num: num,
    });

    axios({
      method: "get",
      url: "http://13.125.55.96:8080/trade/" + num,
      params: {
        email:email
      }
    })
      .then(res => {
        console.log(res.data);
        const all = res.data;
        //alert("받아는 옴")
        this.setState({
          all
        });
        
        console.log("trade", this.state.all);
      })
      .catch(err => {
        console.log("err", err);
        alert("error");
      });
  };

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

  componentDidMount() {
    this.updateUrl();
    window.sessionStorage.setItem("isText", "true");
  }
  componentWillUnmount() {
    window.sessionStorage.setItem("isText", "false");
  }
  componentWillReceiveProps() {
    this.updateUrl();
  }

  render() {
    return (
      <div>
        <Header />
        <Nav></Nav>
        <div className="product-detail">
          {/* <hr /> */}
          <br />
          <div className="detail-grid">
            <div className="detail-l">
              {/* <img src={this.state.trade.ttradeImg[0].orgImg} alt="" /> */}
              <SlideImg ttradeImg={this.state.all.trade.tTradeImg} />
            </div>
            <div className="detail-r">
              <div className="tuser-info">
                <div className="tuser-profile">
                  <img src={this.user.profileImg} alt="profile" />
                </div>
                <div className="tuser-id">
                  <h3>{this.state.all.trade.tuser.nickname}</h3>
                  <h4>{this.state.all.trade.tradeArea}</h4>
                </div>
                <div className="tuser-manners">
                  <h3>매너</h3>
                  <h3>지수</h3>
                </div>
              </div>
              {this.state.all.complete === 1 ? 
              <div className="complete-trade">
                <h1>거래 완료!</h1>
              </div>
              :
              <></>
              }
              <div className="trade">
                <h4>카테고리 > {this.category[Number(this.state.all.trade.tradeCategory)].name}</h4>
                <h2>{this.state.all.trade.tradeTitle}</h2>
                <br />
                <h3>{this.state.all.trade.productPrice}원</h3>
              </div>
              <br />
              <br />
              <br />
              {this.user.email === this.state.all.trade.tuser.email ? (
                <div className="tuser-btn">
                  <button className="btn-complete">거래완료</button>
                  <button className="btn-delete">삭제</button>
                  <Link
                    to={{
                      pathname: "/write/update",
                      state: { props: this.state.all.trade }
                    }}
                  >
                    <button className="btn-update">수정</button>
                  </Link>
                </div>
              ) : (
                  <div className="bottom">
                    <button className="btn-heart">
                      <Zzim
                        num={this.state.num}
                        cno={this.state.all.cno}
                        uno={this.state.all.trade.tuser.uno}
                      ></Zzim>
                    </button>

                    <button className="btn-contact" onClick={this.openModal}>
                      댓글? 쪽지? 알림? 거래하기
                    </button>
                    <Modal
                      tradeNo={this.state.all.trade.tradeNo}
                      email={this.state.all.trade.tuser.email}
                      nickname={this.state.all.trade.tuser.nickname}
                      isOpen={this.state.isModalOpen}
                      close={this.closeModal}
                    />
                  </div>
                )}
            </div>
          </div>
          <div className="product-info">
            <h3>
              <span>상품 상세 설명</span>
            </h3>
            <h3>{this.state.all.trade.productInfo}</h3>
          </div>
        </div>

        <Footer />
      </div>
    );
  }
}

// export default Detail;
export default connect(
  ({ userStatus }: RootState) => ({
    status: userStatus.status
  })
)(Detail);

