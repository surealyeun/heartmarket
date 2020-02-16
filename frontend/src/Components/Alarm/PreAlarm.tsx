import React, { Component } from "react";
//import { Link } from "react-router-dom";
import "./PreAlarm.scss";

interface Mail {
    mail_no: number;
    sender_no: number;
    receiver_no: number;
    title: string;
    content: string;
    trade: {
        tradeNo: number;
        tradeTitle: String;
        tTradeImg: Array<TtradeImg>;
    }
}

interface TtradeImg {
    imgNo: number;
    tiTrade: number;
    orgImg: string;
}


class PreAlarm extends Component<Mail> {

    state = {
        isModalOpen: false
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

    render() {
        return (
            <div className="PreAlarm">
                <div className="prealarm_div" onClick={this.openModal}>
                    <img className="prealarm_img" alt="profile" src="https://image.flaticon.com/icons/svg/660/660611.svg"></img>
                    <p className="mainTitle">송마으미</p>
                    <div className="subTitle">상품관심있상품관심있어 연략 드려요 사고상품관심있어 연략 드려요 사고상품관심있어 연략 드려요 사고상품관심있어 연략 드려요 사고상품관심있어 연략 드려요 사고상품관심있어 연략 드려요 사고상품관심있어 연략 드려요 사고어 연략 드려요 사고 ddasdas</div>
                </div>
            </div>
        );
    }
}

export default PreAlarm;