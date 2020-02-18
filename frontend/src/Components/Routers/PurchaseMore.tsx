import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import ItemCard from "../users/ItemCard";
import Header from "../common/Header";
import Nav from "../common/Nav";
import TopButton from "../common/TopButton";
import PenButton from "../common/PenButton";
import Footer from "../common/Footer";
import "./More.scss";
import SessionDelete from "../common/SessionDelete";
import ToLogin from "../users/ToLogin";
import { connect } from "react-redux";
import { RootState } from "../../modules";
import Modal from "../users/MannerModal";
interface Props {
  status: string | null;
}
export interface purchase {
  eval: number;
  btrade: Btrade;
}
export interface Btrade {
  tradeNo: number;
  tradeCategory: string;
  tradeTitle: string;
  tradeArea: string;
  productInfo: string;
  productPrice: number;
  tradeDate: Date;
  tuser: number;
  buser: number;
  ttradeImg: TtradeImg[];
}
export interface TtradeImg {
  imgNo: number;
  tiTrade: TITrade;
  orgImg: string;
}
export interface TITrade {
  tradeNo: number;
  tradeCategory: string;
  tradeTitle: string;
  tradeArea: string;
  productInfo: string;
  productPrice: number;
  tradeDate: Date;
  tTradeImg: TTradeImg[];
  tuser: User;
  buser: User;
}
export interface User {
  userNo: number;
  email: string;
  password: string;
  profileImg: string;
  nickname: string;
  userPermission: string;
  uarea: Uarea[];
}
export interface Uarea {
  areaNo: number;
  address: string;
  auser: number;
}
export interface TTradeImg {
  imgNo: number;
  tiTrade: number;
  orgImg: string;
}
class PurchaseMore extends Component<Props> {
  user = JSON.parse(window.sessionStorage.getItem("user") || "{}");
  state = {
    Purchases: Array<purchase>(),
    isModalOpen: false
  };
  componentDidMount() {
    axios({
      method: "get",
      url: "http://13.125.55.96:8080/mypage/buy",
      params: {
        email: this.user.email
      }
    })
      .then(res => {
        this.setState({
          Purchases: res.data.data
        });
        // console.log(res.data.data);
      })
      .catch(err => {
        console.log(err);
        alert("sale error");
      });
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
  render() {
    return (
      <div>
        {this.props.status === "true" ? (
          <>
            <SessionDelete></SessionDelete>
            <Header />
            <Nav />
            <div className="purchase-more">
              <hr />
              <h2>구매 상품</h2>
              <div className="products">
                {this.state.Purchases ? (
                  <>
                    {this.state.Purchases.map((purchase, i) => {
                      // console.log("map - userno ", purchase.btrade.tuser);
                      return (
                        <>
                          <div className="purchase-modalbtn">
                            <Link
                              to={`/search/detail/${purchase.btrade.tradeNo}`}
                            >
                              <ItemCard
                                image={
                                  purchase.btrade.ttradeImg[0].tiTrade.tTradeImg
                                }
                                tradeTitle={purchase.btrade.tradeTitle}
                                productPrice={purchase.btrade.productPrice.toString()}
                                tradeNo={purchase.btrade.tradeNo}
                              />
                            </Link>
                            {purchase.eval === 0 ? (
                              <>
                                <button
                                  className="btn-manner-modal"
                                  onClick={this.openModal}
                                >
                                  평가하기
                                </button>
                                <Modal
                                  isOpen={this.state.isModalOpen}
                                  close={this.closeModal}
                                  userNo={purchase.btrade.tuser}
                                  tradeNo={purchase.btrade.tradeNo}
                                />
                              </>
                            ) : (
                              <></>
                            )}
                          </div>
                        </>
                      );
                    })}
                  </>
                ) : (
                  <div>
                    <h4>구매 상품이 없습니다.</h4>
                  </div>
                )}
              </div>
            </div>
            <TopButton />
            <PenButton />
            <Footer />
          </>
        ) : (
          <ToLogin />
        )}
      </div>
    );
  }
}
export default connect(({ userStatus }: RootState) => ({
  status: userStatus.status
}))(PurchaseMore);
