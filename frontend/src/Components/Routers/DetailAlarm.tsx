import React from "react";

import Header from "../common/Header";
import Nav from "../common/Nav";
import Footer from "../common/Footer";
import "./DetailAlarm.scss";
// import PreAlarm from "../alarm/PreAlarm";

import { makeStyles } from "@material-ui/core/styles";

function DetailAlarm() {

  const useStyles = makeStyles(theme => ({
    root: {
      display: "flex",
      flexDirection: "column",
      minHeight: "65vh"
    }
  }));

  const classes = useStyles();

  return (
    <>
      <Header></Header>
      <Nav></Nav>
      <div className="DetailAlarm">
        <div className={classes.root}>
          <div className="display">
            <p className="alarm_people">보낸 사람</p>
            <p className="background">다니다니</p>
            <p className="alarm_people rec_pos1">받는 사람</p>
            <p className="background rec_pos2">송마음이</p>
          </div>
          <div>
            <br></br><br></br>
            <h2>상품에 관심있어서 연락드렸습니다.</h2>
            <p>2020년 3월 4일 (월) 22시 13분</p>
            <br></br>
            <br></br>
          </div>
          <div className="alarm_content">
            rkskkkealsdmaksdma;smd;alsda;kfmldnflsnlamldkasm;das;ldmaksn
            fldnflknaskldmalskmdasdaksdhaskdhlaksjdlaksj>rkskkkealsdmaksdma;smd;alsda;kfmldnflsnl>amldkasm;das;ldmaksnfldnflknaskldmalskmd>asdaksdhaskdhlaksjdlaksjrkskkkealsdmaksdma;smd;alsda;kfmldnflsnl>amldkasm;das;ldmaksnfldnflknaskldmalskmd>asdaksdhaskdhlaksjdlaksjrkskkkealsdmaksdma;smd;alsda;kfmldnflsnl>amldkasm;das;ldmaksnfldnflknaskldmalskmd/>asdaksdhaskdhlaksjdlaksj
          </div>
          <br></br>
          <div>
            <br></br>
            <div className="detailalarm_btn">답장</div>
            <div className="detailalarm_btn pos_left">삭제</div>
          </div>
          
        </div>
      </div>
      <Footer></Footer>
    </>
  );
}

export default DetailAlarm;
