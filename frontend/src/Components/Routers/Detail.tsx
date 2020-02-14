import React from "react";
import Header from "../common/Header";
import Nav from "../common/Nav";
import SlideImg from "../common/SlideImg";
import Footer from "../common/Footer";
import axios from "axios";
// import Ganji from "../main/Ganji";
// import Gauge from "../common/hamburger/Gauge";
import "./Detail.scss";
import Zzim from "../common/Zzim"

class Detail extends React.Component {
    user = JSON.parse(window.sessionStorage.getItem("user") || "{}");

    state = {
        trade: {
            tradeTitle: "",
            tradeCategory: "",
            tradeArea: "",
            tTradeImg: [{imgNo: 0, tiTrade: 0, orgImg: ""}],
            productInfo: "",
            productPrice: "",
            tuser: { nickname: "", profileImg: "", email: "" },
            buser: ""
        },
        num:""
    };

    updateUrl = () => {
        const  url = window.location.href.split("/");
        const num = url[url.length - 1]
        this.setState({
            num : num
        });

        axios({
            method: "get",
            url: "http://13.125.55.96:8080/trade/" + num
        })
            .then(res => {
                console.log(res.data);
                const trade = res.data;
                this.setState({
                    trade
                });
                //console.log("trade", this.state.trade);
            })
            .catch(err => {
                console.log("err", err);
                alert("error");
            });
    }

    componentDidMount() {
        this.updateUrl();
    }

    componentWillReceiveProps() {
        this.updateUrl();
    }
    

    render() {
        return (
            <div>
                <Header />
                <Nav />
                <div className="product-detail">
                    {/* <hr /> */}
                    <br />
                    <div className="detail-grid">
                        <div className="detail-l">
                            {/* <img src={this.state.trade.ttradeImg[0].orgImg} alt="" /> */}
                            <SlideImg ttradeImg={this.state.trade.tTradeImg} />
                        </div>
                        <div className="detail-r">
                            <div className="tuser-info">
                                <div className="tuser-profile">
                                    <img
                                        src={this.user.profileImg}
                                        alt="profile"
                                    />
                                </div>
                                <div className="tuser-id">
                                    <h3>{this.state.trade.tuser.nickname}</h3>
                                    <h4>{this.state.trade.tradeArea}</h4>
                                </div>
                                <div className="tuser-manners">
                                    <h3>매너</h3>
                                    <h3>지수</h3>
                                </div>
                            </div>
                            <div className="trade">
                                <h4>카테고리 > {this.state.trade.tradeCategory}</h4>
                                <h2>{this.state.trade.tradeTitle}</h2>
                                <br />
                                <h3>{this.state.trade.productPrice}원</h3>
                            </div>
                            <br />
                            <br />
                            <br />
                            {this.user.email === this.state.trade.tuser.email
                                ?
                                <div className="tuser-btn">
                                    <button className="btn-complete">거래완료</button>
                                    <button className="btn-delete">삭제</button>
                                    <button className="btn-update">수정</button>
                                </div>
                                :
                                <div className="bottom">
                                    {/* <button className="btn-heart" onClick={this.clickHeart}>♥</button> */}
                                    <button className="btn-heart"><Zzim num={this.state.num}></Zzim></button>
                                    <button className="btn-contact">댓글? 쪽지? 알림? 거래하기</button>
                                </div>}
                            {/* <div className="tuser-manners">
                                <h3>매너 지수</h3>
                                <Gauge />
                            </div> */}

                        </div>
                    </div>
                    <div className="product-info">
                        <h3>
                            <span>상품 상세 설명</span>
                        </h3>
                        <h3>{this.state.trade.productInfo}</h3>
                    </div>
                </div>
                
                <Footer />
            </div>
        );
    }
}

export default Detail;
