import React, { Component } from "react";
import axios from 'axios';
import {Link} from 'react-router-dom';
import ItemCard from '../users/ItemCard';
import Header from "../common/Header";
import Nav from "../common/Nav";
import TopButton from "../common/TopButton";
import Penbutton from "../common/PenButton";
import Footer from "../common/Footer";
import "./More.scss";
import SessionDelete from "../common/SessionDelete";
// import "./SaleMore.scss";

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

class SaleMore extends Component {
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
        }).then(res => {
            this.setState({
                Sales: res.data.data
            });
        }).catch(err => {
            console.log(err);
                alert("sale error");
        })
    }

    render() {
        return (
            <div>
                <SessionDelete></SessionDelete>
                <Header />
                <Nav />
                <div className="sale-more">
                    {/* 검색 결과 가져다 쓰기 ㅎㅎ*/}
                    <hr/>
                    <h2>판매 상품</h2>
                    <div className="products">
                    {this.state.Sales ? (
                        <>
                            {this.state.Sales.map((sale, i) => {
                                
                                    return (
                                        <Link to={`/search/detail/${sale.tradeNo}`}>
                                            <ItemCard image={sale.ttradeImg} tradeTitle={sale.tradeTitle}
                                             productPrice={sale.productPrice} />
                                            {/* <div className="item" key={"item" + i}>
                                                <h3>{sale.tradeTitle}</h3>
                                            </div> */}
                                        </Link>
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
            </div>
        );
    }
}

export default SaleMore;
