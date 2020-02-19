import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import ItemCard from "../users/ItemCard";
import Header from "../common/Header";
import Nav from "../common/Nav";
import TopButton from "../common/TopButton";
import Penbutton from "../common/PenButton";
import Footer from "../common/Footer";
import "./More.scss";
import SessionDelete from "../common/SessionDelete";
import ToLogin from "../users/ToLogin";
import { connect } from "react-redux";
import { RootState } from "../../modules";

interface Props {
  status: string | null;
}

export interface sale{
  complete: number;
  strade: Strade;
}

export interface Strade {
  tradeNo:       number;
  tradeCategory: string;
  tradeTitle:    string;
  tradeArea:     string;
  productInfo:   string;
  productPrice:  string;
  tradeDate:     Date;
  tTradeImg:     TTradeImg[];
  tuser:         Tuser;
  buser:         null;
  tmanner:       null;
}

export interface TTradeImg {
  imgNo:   number;
  tiTrade: number;
  orgImg:  string;
}

export interface Tuser {
  userNo:         number;
  email:          string;
  password:       string;
  profileImg:     string;
  nickname:       string;
  userPermission: string;
  uarea:          Uarea[];
}

export interface Uarea {
  areaNo:  number;
  address: string;
  auser:   number;
}

class SaleMore extends Component<Props> {
  user = JSON.parse(window.sessionStorage.getItem("user") || "{}");

  state = {
    Sales: Array<sale>()
  };

  componentDidMount() {
    window.scrollTo(0,0);

    axios({
      method: "get",
      url: "http://13.125.55.96:8080/mypage/sell",
      params: {
        email: this.user.email
      }
    })
      .then(res => {
        this.setState({
          Sales: res.data.data
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
        <SessionDelete></SessionDelete>
        {this.props.status === "true" ? (
          <>
            <Header />
            <Nav />
            <div className="sale-more">
              {/* 검색 결과 가져다 쓰기 ㅎㅎ*/}
              <hr />
              <h2>판매 상품</h2>
              <div className="products">
                {this.state.Sales ? (
                  <>
                    {this.state.Sales.map((sale, i) => {
                      return (
                        <div className="purchase-modalbtn">
                        <Link to={`/search/detail/${sale.strade.tradeNo}`}>
                          <ItemCard
                            image={sale.strade.tTradeImg}
                            tradeTitle={sale.strade.tradeTitle}
                            productPrice={sale.strade.productPrice}
                            tradeNo={sale.strade.tradeNo}
                          />
                          {/* <div className="item" key={"item" + i}>
                                                <h3>{sale.tradeTitle}</h3>
                                            </div> */}
                        </Link>
                        {sale.complete === 1 ? (
                                                    <button
                                                        className="btn-manner-modal" disabled
                                                    >
                                                        거래 완료
                                                    </button>
                                                ) : (
                                                    <></>
                                                )}
                        </div>
                      );
                    })}
                  </>
                ) : (
                  <div>
                    <h4>판매 상품이 없습니다.</h4>
                  </div>
                )}
              </div>
            </div>
            <TopButton />
            <Penbutton />
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
}))(SaleMore);
