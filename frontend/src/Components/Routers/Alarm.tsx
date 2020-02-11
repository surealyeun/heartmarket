import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";

import "./Alarm.scss";
import Header from "../common/Header";
import Footer from "../common/Footer";
import TopButton from "../common/TopButton";
import AlarmList from "../alarm/AlarmList";

function Alarm() {
  const alarms = [
    {
      alarmid: 1,
      img:
        "https://dnvefa72aowie.cloudfront.net/origin/article/202001/142e5f439d6d5e28a381afea8ff31c8f065dfc28d44c7c0b1281f2d132b36f26.webp?q=82&s=300x300&t=crop",
      name: "송마음이",
      time: "1분전",
      title: "포트메리온 그릇 20종 미사용",
      text: "상품에 관심있어서 연락드려요~~ 사고 싶어요",
      check: false,
      readcheck: false,
      senddelete: false,
      recievedelete: false
    },
    {
      alarmid: 2,
      img:
        "https://dnvefa72aowie.cloudfront.net/origin/article/202001/142e5f439d6d5e28a381afea8ff31c8f065dfc28d44c7c0b1281f2d132b36f26.webp?q=82&s=300x300&t=crop",
      name: "구목이",
      time: "하루전",
      title: "자동차 구매하실분",
      text:
        "상품에 관심있어서 연락드려요~ㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ~ 사고 싶어요 안전ㅇ민ㅇㅁ;ㄴ암ㄴ;ㅣ암;ㅣ낭;미낭;미낭;ㅣㅁ낭;ㅣㅁ나",
      check: false,
      readcheck: true,
      senddelete: false,
      recievedelete: false
    }
  ];

  const alarms1 = [
    {
      alarmid: 4,
      img:
        "https://dnvefa72aowie.cloudfront.net/origin/article/202001/142e5f439d6d5e28a381afea8ff31c8f065dfc28d44c7c0b1281f2d132b36f26.webp?q=82&s=300x300&t=crop",
      name: "rhrffdslrhrl",
      time: "1분전",
      title: "포트메리온 그릇 20종 미사용",
      text: "상품에 관심있어서 연락드려요~~ 사고 싶어요",
      check: false,
      readcheck: false,
      senddelete: false,
      recievedelete: false
    },
    {
      alarmid: 3,
      img:
        "https://dnvefa72aowie.cloudfront.net/origin/article/202001/142e5f439d6d5e28a381afea8ff31c8f065dfc28d44c7c0b1281f2d132b36f26.webp?q=82&s=300x300&t=crop",
      name: "alsdkjaslkjasl",
      time: "하루전",
      title: "자동차 구매하실분",
      text:
        "상품에 관심있어서 연락드려요~ㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ~ 사고 싶어요 안전ㅇ민ㅇㅁ;ㄴ암ㄴ;ㅣ암;ㅣ낭;미낭;미낭;ㅣㅁ낭;ㅣㅁ나",
      check: false,
      readcheck: true,
      senddelete: false,
      recievedelete: false
    }
  ];

  //let tempdefault = alarms;
  const [alarmList, setAlarmList] = useState(
    alarms.filter(alarm => alarm.readcheck !== true)
  );
  const [checked, setChecked] = useState(false);
  //받은 알림(false), 보낸 알림 (true)
  const [sendStatus, setSendStatus] = useState("false");

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
    alarms.forEach(alarm => (alarm.check = !checked));
    setChecked(!checked);
    setAlarmList(alarms);
  };

  const changeRead = (e: any) => {
    //읽은 상태 변경시 체크 상태 변경
    alarms.forEach(alarm => (alarm.check = false));
    setChecked(false);

    //상태에 따른 이미지 업로드 -> axios 호출된 값으로 변경
    if (sendStatus === "false") {
      if (e.target.value === "notyet")
        setAlarmList(alarms.filter(alarm => alarm.readcheck !== true));
      else if (e.target.value === "all") setAlarmList(alarms);
      else if (e.target.value === "read")
        setAlarmList(alarms.filter(alarm => alarm.readcheck !== false));
    } else if (sendStatus === "true") {
      if (e.target.value === "notyet")
        setAlarmList(alarms1.filter(alarm => alarm.readcheck !== true));
      else if (e.target.value === "all") setAlarmList(alarms1);
      else if (e.target.value === "read")
        setAlarmList(alarms1.filter(alarm => alarm.readcheck !== false));
    }
  };

  const changeSendStatus = (e: any) => {
    //보낸 상태 변경시 체크 상태 변경
    alarms.forEach(alarm => (alarm.check = false));
    setChecked(false);

    //상태에 따른 이미지 업로드 -> axios 호출로 변경
    if (e.target.value === "false") {
      setSendStatus("false");
      setAlarmList(alarms.filter(alarm => alarm.readcheck !== true));
    } else if (e.target.value === "true") {
      setSendStatus("true");
      setAlarmList(alarms1);
    }
  };

  //페이지 들어가고 나가고 표시
  useEffect(() => {
    console.log("들어온다다다다");
    return () => {
      console.log("나간다아아아");
    };
  }, []);

  return (
    <>
      <Header></Header>
      <div className="Alarm">
        <div className={classes.root}>
          <div className="alarm_haeder">
            <select onChange={changeSendStatus}>
              <option value="false">받은 알림</option>
              <option value="true">보낸 알림</option>
            </select>
            <p className="alarm_text">
              {sendStatus !== "false" ? "보낸 " : "받은 "}알림함
            </p>
          </div>
          <div className="alarm_check">
            <input
              className="checkbox"
              checked={checked}
              type="checkbox"
              onClick={CheckedAll}
              readOnly
            ></input>
            <div className="alarm_deleteall">삭제</div>
            <div className="alarm_readall">읽음 표시</div>
            {sendStatus === "false" ? (
              <select onChange={changeRead} defaultValue="notyet">
                <option value="notyet">안읽은 알림</option>
                <option value="read">읽은 알림</option>
                <option value="all">전체 알림</option>
              </select>
            ) : (
              <select onChange={changeRead} defaultValue="all">
                <option value="all">전체 알림</option>
                <option value="notyet">안읽은 알림</option>
                <option value="read">읽은 알림</option>
              </select>
            )}
          </div>
          <div>
            <hr></hr>
            {alarmList.map(alarm => (
              <AlarmList
                key={alarm.alarmid}
                sendStatus={sendStatus}
                {...alarm}
              ></AlarmList>
            ))}
          </div>
        </div>
      </div>
      <TopButton></TopButton>
      <Footer></Footer>
    </>
  );
}

export default Alarm;
