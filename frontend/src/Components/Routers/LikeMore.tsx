import React, { Component } from "react";
import axios from 'axios';
import {Link} from 'react-router-dom';
import ItemCard from '../users/ItemCard';
import Header from "../common/Header";
import Nav from "../common/Nav";
import TopButton from "../common/TopButton";
import PenButton from "../common/PenButton";
import Footer from "../common/Footer";
import "./More.scss";
import ToLogin from '../users/ToLogin';
import { connect } from "react-redux";
import { RootState } from "../../modules";

interface Props {
  status: string | null;
}

export interface like {
    cartNo: number;
    cuser:  User;
    ctrade: Ctrade;
}

export interface Ctrade {
    tradeNo:                  number;
    tradeCategory:            string;
    tradeTitle:               string;
    tradeArea:                string;
    productInfo:              string;
    productPrice:             string;
    tradeDate:                Date;
    tuser:                    User;
    tTradeImg:                TtradeImg[];
    buser:                    null;
    hibernateLazyInitializer: HibernateLazyInitializer;
    tmanner:                  null;
}

export interface HibernateLazyInitializer {
}

export interface TtradeImg {
    imgNo:   number;
    tiTrade: number;
    orgImg:  string;
}

export interface User {
    userNo:         number;
    email:          string;
    password:       string;
    profileImg:     null | string;
    nickname:       string;
    userPermission: string;
    uarea:          Uarea[];
}

export interface Uarea {
    areaNo:  number;
    address: string;
    auser:   number;
}

class LikeMore extends Component<Props> {
    user = JSON.parse(window.sessionStorage.getItem("user") || "{}");

    state = {
        Likes: Array<like>()
    };

    componentDidMount() {
        axios({
            method: "get",
            url: "http://13.125.55.96:8080/cart/searchAll",
            params: {
                userNo: this.user.userNo
            }
        }).then(res => {
            this.setState({
                Likes: res.data.data
            });
            console.log(res.data.data);
        }).catch(err => {
            console.log(err);
                alert("like error");
        })
    }

    render() {
        return (
            <div>
                {this.props.status === 'true' ? 
                <>
                <Header />
                <Nav />
                <div className="like-more">
                    {/* 검색 결과 가져다 쓰기 ㅎㅎ*/}
                        <hr/>
                    <h2>심쿵 상품</h2>
                    <div className="products">
                    {this.state.Likes ? (
                        <>
                            {this.state.Likes.map((like, i) => {
                                    return (
                                        <Link to={`/search/detail/${like.ctrade.tradeNo}`}>
                                            <ItemCard image={like.ctrade.tTradeImg} tradeTitle={like.ctrade.tradeTitle}
                                             productPrice={like.ctrade.productPrice} />
                                            {/* <div className="item" key={"item" + i}>
                                                <h3>{sale.tradeTitle}</h3>
                                            </div> */}
                                        </Link>
                                    );
                            })}
                        </>
                    ) : (
                        <div>
                            <h4>심쿵 상품이 없습니다.</h4>
                        </div>
                    )}

                    </div>
                </div>
                <TopButton />
                <PenButton />
                <Footer />
                </>
                :
                <ToLogin />
                }
            </div>
        );
    }
}

export default connect(({ userStatus }: RootState) => ({
    status: userStatus.status
  }))(LikeMore);
  