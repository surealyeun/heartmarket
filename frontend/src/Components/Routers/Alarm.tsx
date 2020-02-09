import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";

import './Alarm.scss';
import Header from "../Common/Header";
import Footer from "../Common/Footer";
import AlarmList from "../Alarm/AlarmList";

function Alarm() {

    const alarms = [
        {
            alarmid: 1,
            img: "https://dnvefa72aowie.cloudfront.net/origin/article/202001/142e5f439d6d5e28a381afea8ff31c8f065dfc28d44c7c0b1281f2d132b36f26.webp?q=82&s=300x300&t=crop",
            name: "송마음이",
            time: "1분전",
            title: "포트메리온 그릇 20종 미사용",
            text: "상품에 관심있어서 연락드려요~~ 사고 싶어요",
            check: false,
            readcheck: false
        },
        {
            alarmid: 2,
            img: "https://dnvefa72aowie.cloudfront.net/origin/article/202001/142e5f439d6d5e28a381afea8ff31c8f065dfc28d44c7c0b1281f2d132b36f26.webp?q=82&s=300x300&t=crop",
            name: "구목이",
            time: "하루전",
            title: "자동차 구매하실분",
            text: "상품에 관심있어서 연락드려요~~ 사고 싶어요 안전ㅇ민ㅇㅁ;ㄴ암ㄴ;ㅣ암;ㅣ낭;미낭;미낭;ㅣㅁ낭;ㅣㅁ나",
            check: false,
            readcheck: true
        }
    ];

    let tempdefault = alarms;
    const [alarmList, setAlarmList] = useState(tempdefault.filter(alarm => alarm.readcheck !== true));
    const [checked, setChecked] = useState(false);

    const useStyles = makeStyles(theme => ({
        root: {
            display: "flex",
            flexDirection: "column",
            minHeight: "75vh"
        }
    }));

    const classes = useStyles();

    const CheckedAll = () => {
        let alarms = alarmList;
        alarms.forEach(alarm => alarm.check = !checked);
        setChecked(!checked);
        setAlarmList(alarms);
    }

    const changeRead = (e: any) => {
        console.log(e.target.value); //notyet all
        let temp = alarms;
        if (e.target.value === "notyet")
            setAlarmList(temp.filter(alarm => alarm.readcheck !== true));
        else if (e.target.value === "all")
            setAlarmList(temp);
        else if (e.target.value === "read")
            setAlarmList(temp.filter(alarm => alarm.readcheck !== false));
    }

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
                        <input className="checkbox" type="checkbox" onClick={CheckedAll}></input>
                        <div className='alarm_deleteall'>삭제</div>
                        <div className="alarm_readall">읽음 표시</div>
                        <select onChange={changeRead}>
                            <option value="notyet">안읽은 알림</option>
                            <option value="read">읽은 알림</option>
                            <option value="all">전체 알림</option>
                        </select>
                    </div>
                    <div>
                        <hr></hr>
                        {alarmList.map(alarm => (
                            <AlarmList
                                key={alarm.alarmid}
                                {...alarm}
                            ></AlarmList>
                        ))}
                        {/* <AlarmList></AlarmList>
                        <AlarmList></AlarmList> */}
                    </div>
                </div>
            </div>
            <Footer></Footer>
        </>
    );

}

export default Alarm;