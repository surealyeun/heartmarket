import React from "react";
import "./MainProfile.scss";

function MainProfile() {
  return (
    <div className="Main_Profile">
      <img
        className="profile_img"
        alt="프로필 이미지"
        src="https://image.flaticon.com/icons/svg/660/660611.svg"
      ></img>
      <p className="profile_name">다니다니</p>
      <p className="profile_number">#14332</p>
      <p className="profile_edit">프로필 수정</p>
      <p className="profile_logout">로그아웃</p>
    </div>
  );
}

export default MainProfile;
