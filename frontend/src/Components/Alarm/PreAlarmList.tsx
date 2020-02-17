import React, { Component } from "react";
import PreAlarm from "../alarm/PreAlarm"
import { Link } from "react-router-dom";
import "./PreAlarmList.scss";
import axios from "axios";
// import { Redirect } from "react-router";

class PreAlarmList extends Component {

    state = {
        mail: {
            mail_no: 0,
            sender_no: 0,
            receiver_no: 0,
            title:"",
            content:"",
            trade: {
                tradeNo: 0,
                tradeTitle: "",
                tTradeImg: [{ imgNo: 0, tiTrade: 0, orgImg: "" }],
            }
        },
    };

    user = JSON.parse(window.sessionStorage.getItem("user") || "{}");

    componentDidMount() {
        axios({
            method: "get",
            url: "http://13.125.55.96:8080/mail/findAllUnReaded",
            params: {
                receiverMail: this.user.email
            }
        })
            .then(res => {
                const mail = res.data;
                console.log(mail);
                this.setState({
                    mail
                });
            })
            .catch(err => {
                console.log("err", err);
            });
    }

    render() {
        return (
            <span className="PreAlarmList">
                <p className="prealarm_num">새로운 알림 (2)</p>
                <Link to={{ pathname: "/alarm" }}>
                    <p className="prealarm_plus">더보기</p>
                </Link>
                <div className="prealarm_bundle">
                    <PreAlarm
                        {...this.state.mail}
                    ></PreAlarm>
                </div>
            </span>
        );
    }
}

export default PreAlarmList;