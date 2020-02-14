/* eslint-disable array-callback-return */
import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import ItemCard from './ItemCard';
import SessionDelete from "../common/SessionDelete";

export interface like {
    cTrade: Trade;
    cartNo: number;
    ctrade: Trade;
    cuser:  User;
}

export interface Trade {
    buser:         User;
    productInfo:   string;
    productPrice:  string;
    tTradeImg:     TTradeImg[];
    tmanner:       Tmanner;
    tradeArea:     string;
    tradeCategory: string;
    tradeDate:     string;
    tradeNo:       number;
    tradeTitle:    string;
    tuser:         User;
}

export interface User {
    email:          string;
    nickname:       string;
    password:       string;
    profileImg:     string;
    uarea:          Uarea[];
    userNo:         number;
    userPermission: string;
}

export interface Uarea {
    address: string;
    areaNo:  number;
}

export interface TTradeImg {
    imgNo:  number;
    orgImg: string;
    tiTrade: number;
}

export interface Tmanner {
    heartGauge:  number;
    mannerNo:    number;
    minusGauge:  number;
    muser:       User;
    normalGauge: number;
    plusGauge:   number;
}


class Like extends React.Component {
    state = {
        isOver: true,
        isLoading: false,
        Likes: Array<like>()
    };

    user = JSON.parse(window.sessionStorage.getItem("user") || "{}");

    mouseOver = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        console.log(e.target);
        this.setState({
            isOver: false
        });
        document.getElementsByClassName('img-back')
    };

    mouseOut = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        // console.log(e.target);
        this.setState({
            isOver: true
        });
    };

    componentDidMount() {

        axios({
            method: "get",
            url: "http://13.125.55.96:8080/cart/searchAll",
            params: {
                userNo: this.user.userNo
            }
        })
            .then(res => {
                this.setState({
                    Likes: res.data.data
                });
                console.log('like 다 가져옴',res.data.data);
            })
            .catch(err => {
                alert(err);
                console.log("err", err);
            });
    }

    render() {
        return (
            <div className="like">
                <SessionDelete></SessionDelete>
                <h3>심쿵 상품</h3>
                <div className="products">
                    {this.state.Likes ? (
                        <>
                            {this.state.Likes.map((like, i) => {
                                // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                                if (i < 4) {
                                    return (
                                        <Link to={`/search/detail/${like.ctrade.tradeNo}`}>
                                            <ItemCard image={like.ctrade.tTradeImg} tradeTitle={like.ctrade.tradeTitle} 
                                            productPrice={like.ctrade.productPrice} />
                                        </Link>
                                    );
                                }
                            })}
                        </>
                    ) : (
                        <div>
                            <h4>심쿵 상품이 없습니다.</h4>
                        </div>
                    )}

                    {/* <div className="item" onMouseOver={this.mouseOver} onMouseOut={this.mouseOut}>
                        <img
                            src="https://dnvefa72aowie.cloudfront.net/origin/article/202001/77120318A0EA8BE3F97C131D8758D2B5E452A0D37184FE594F75148386745E8A.jpg?q=82&s=300x300&t=crop"
                            alt="item1"
                        />
                        <div className="img-back" hidden={this.state.isOver}>
                            <p>모두가 가지고 싶어하는 에어팟</p>
                        </div>
                    </div> */}

                    {/* <div className="item">
                        <button className="btn-more"><img src="https://image.flaticon.com/icons/svg/1836/1836226.svg" alt=""></img></button>
                    </div> */}
                </div>
                <div className="like-more-wrapper">
                    <button className="btn-like-more">
                        <Link to="/like">
                            <h3>+ 심쿵 상품 더보기</h3>
                        </Link>
                    </button>
                </div>
                <br />
            </div>
        );
    }
}

export default Like;
