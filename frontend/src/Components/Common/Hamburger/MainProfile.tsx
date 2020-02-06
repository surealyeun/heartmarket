import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./MainProfile.scss";

class MainProfile extends Component {
  state = {
    islog: false
  };

  //로그인 되어 있는지 확인
  constructor(props: any) {
    super(props);

    this.state = {
      islog: window.localStorage.getItem("log") === "true" ? true : false
    };
  }

  render() {
    const {islog} = this.state;
    return (
      <div className="Main_Profile">
        {!islog ? (
          <>
            <p className="profile_infotext">로그인이 필요한 서비스 입니다.</p>
            <Link to={{ pathname: "/login" }}>
              <p className="profile_infotext profile_login">로그인 하기</p>
            </Link>
            <Link to={{ pathname: "/join" }}>
              <p className="profile_infotext profile_signup">회원가입 하기</p>
            </Link>
          </>
        ) : (
          <>
            <img
              className="profile_img"
              alt="프로필 이미지"
              src="https://image.flaticon.com/icons/svg/660/660611.svg"
            ></img>
            <p className="profile_name">
              {window.localStorage.getItem("userid")}
            </p>
            <p className="profile_number">
              {window.localStorage.getItem("usernumber")}
            </p>
            <Link to={{ pathname: "/Mypage" }}>
              <p className="profile_edit">마이페이지</p>
            </Link>
            <Link to={{ pathname: "/" }}>
              <p className="profile_logout">로그아웃</p>
            </Link>
          </>
        )}
      </div>
    );
  }
}

export default MainProfile;
