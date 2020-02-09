import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";

import './Alarm.scss';
import Header from "../Common/Header";
import Footer from "../Common/Footer";
import AlarmList from "../Alarm/AlarmList";

function Alarm() {

    const useStyles = makeStyles(theme => ({
        root: {
            display: "flex",
            flexDirection: "column",
            minHeight: "75vh"
        }
    }));

    const classes = useStyles();

    return (
        <>
            <Header></Header>
            <div className="Alarm">
                <div className={classes.root}>
                    <div className="alarm_haeder">
                        <select>
                            <option value="받은">받은 알림</option>
                            <option value="보낸">보낸 알림</option>
                        </select>
                        <p className="alarm_text">받은 알림함</p>
                        <div className="alarm_send">알림 보내기</div>
                    </div>
                    <div className="alarm_check">
                        <input className="checkbox" type="checkbox"></input>
                        <div className='alarm_deleteall'>삭제</div>
                        <div>읽음 표시</div>
                    </div>
                    <div>
                        <hr></hr>
                        <AlarmList></AlarmList>
                        <AlarmList></AlarmList>
                    </div>
                </div>
            </div>
            <Footer></Footer>
        </>
    );

}

export default Alarm;