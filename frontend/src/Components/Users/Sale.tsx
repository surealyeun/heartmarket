/* eslint-disable array-callback-return */
import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import ItemCard from "./ItemCard";
import "./Items.scss";
import SessionDelete from "../common/SessionDelete";

export interface sale {
    tradeNo: number;
    tradeCategory: string;
    tradeTitle: string;
    productName: string;
    tradeArea: string;
    productInfo: string;
    productPrice: string;
    tradeDate: Date;
    ttradeImg: TtradeImg[];
    buser: null;
    tuser: Tuser;
    tmanner: null;
}

export interface TtradeImg {
    imgNo:   number;
    tiTrade: number;
    orgImg:  string;
}

export interface Tuser {
    userNo: number;
    email: string;
    password: string;
    profileImg: null;
    nickname: string;
    userPermission: string;
    uarea: Uarea[];
}

export interface Uarea {
    areaNo: number;
    address: string;
    auser: number;
}

class Sale extends React.Component {
    user = JSON.parse(window.sessionStorage.getItem("user") || "{}");

    state = {
        Sales: Array<sale>()
    };

    componentDidMount() {
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
            <div className="sale">
                <SessionDelete></SessionDelete>
                <h3>판매 상품</h3>
                <div className="products">
                    {/* <div className="item">
                        <div className="item-manners">
                            <h3>♥♥♥♥♥</h3>
                        </div>
                        <div className="item-img">
                            <img
                                src="https://dnvefa72aowie.cloudfront.net/origin/article/202001/89A4F5AE96E72336F6CAF9D290982BBDD9617D44B5B99B6E2F43189AD7CF549E.jpg?q=82&s=300x300&t=crop"
                                alt="item1"
                            />
                        </div>
                    </div> */}
                    {this.state.Sales ? (
                        <>
                            {this.state.Sales.map((sale, i) => {
                                if (i < 4) {
                                    return (
                                        <Link to={`/search/detail/${sale.tradeNo}`}>
                                            <ItemCard image={sale.ttradeImg} tradeTitle={sale.tradeTitle} productPrice={sale.productPrice} />
                                            {/* <div className="item" key={"item" + i}>
                                                <h3>{sale.tradeTitle}</h3>
                                            </div> */}
                                        </Link>
                                    );
                                }
                            })}
                        </>
                    ) : (
                        <div>
                            <h4>판매 상품이 없습니다.</h4>
                        </div>
                    )}
                    {/* <div className="item">
                        <button className="btn-more"><h3>더보기</h3></button>
                    </div> */}
                </div>
                <div className="product-more-wrapper">
                    <button className="btn-sale-more">
                        <Link to="/sale">
                            <h3>+ 판매 상품 더보기</h3>
                        </Link>
                    </button>
                </div>
            </div>
        );
    }
}

export default Sale;
