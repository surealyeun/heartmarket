import React, { Component } from "react";
//import { Link } from "react-router-dom";
import "./AlarmList.scss";
//import PreAlarm from "./PreAlarm";

class AlarmList extends Component {

    render() {
        return (
            <div className="AlarmList">
                <input type="checkbox"></input>
                <div className="alarm_item">
                    <img className="alarmlist_img" alt="profile" src="https://image.flaticon.com/icons/svg/660/660611.svg"></img>
                    <p className="">송마으미</p>
                    <p className="">1분전</p>
                    <div className="">상품관심있상품관심있어 연략 드려요 사고상품관심있어 연략 드려요 사고상품관심있어 연략 드려요 사고상품관심있어 연략 드려요 사고상품관심있어 연략 드려요 사고상품관심있어 연략 드려요 사고상품관심있어 연략 드려요 사고어 연략 드려요 사고 ddasdas</div>
                </div>
                <hr></hr>
            </div>
        );
    }
}

export default AlarmList;