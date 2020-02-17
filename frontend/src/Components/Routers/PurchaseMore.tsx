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

interface Props {
  status: string | null;
}

export interface purchase {
  tradeNo: number;
  tradeCategory: string;
  tradeTitle: string;
  tradeArea: string;
  productInfo: string;
  productPrice: string;
  tradeDate: Date;
  tTradeImg: TTradeImg[];
  tuser: Tuser;
  buser: null;
  tmanner: null;
}

export interface TTradeImg {
  imgNo: number;
  tiTrade: number;
  orgImg: string;
}

export interface Tuser {
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

class PurchaseMore extends Component<Props> {
  user = JSON.parse(window.sessionStorage.getItem("user") || "{}");

  state = {
    Purchases: Array<purchase>()
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
      })
      .catch(err => {
        console.log(err);
        alert("sale error");
      });
  }

  render() {
    return (
      <div>
        {this.props.status === "true" ? (
          <>
            <SessionDelete></SessionDelete>
            <Header />
            <Nav />
            <div className="purchase-more">
              {/* 검색 결과 가져다 쓰기 ㅎㅎ*/}
              <hr />
              <h2>구매 상품</h2>
              <div className="products">
                {this.state.Purchases ? (
                  <>
                    {this.state.Purchases.map((purchase, i) => {
                      return (
                        <Link to={`/search/detail/${purchase.tradeNo}`}>
                          <ItemCard
                            image={purchase.tTradeImg}
                            tradeTitle={purchase.tradeTitle}
                            productPrice={purchase.productPrice}
                            tradeNo={purchase.tradeNo}
                          />
                          {/* <div className="item" key={"item" + i}>
                                                <h3>{sale.tradeTitle}</h3>
                                            </div> */}
                        </Link>
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
