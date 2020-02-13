import React from "react";
import {Link} from 'react-router-dom';
import Gauge from '../common/hamburger/Gauge';
import "./Profile.scss";
import SessionDelete from "../common/SessionDelete";

function Profile() {
    const user = JSON.parse(window.sessionStorage.getItem("user") || "{}");
    console.log(user);
    return (
        <div className="profile">
            <SessionDelete></SessionDelete>
            <div className="profile-img-wrapper">
                <img
                    className="profile-img"
                    alt="profile"
                    src={user.profileImg}
                ></img>
            </div>
            <div className="info">
                <div>
                    {/* link 수정이 필요함 */}
                    <Link to={`/user/${user.userNo}`}>
                        <h3>{user.nickname}님</h3>
                    </Link>
                    {/* <br /> */}
                    <Link to="/mypage/update">
                        <button className="btn-updateprofile">프로필 수정</button>
                    </Link>
                </div>
            </div>
            <div></div>
            <div className="attack">
                <div>심쿵 BPM</div>
                <div>
                    <img
                        className="heart-img"
                        alt="heart"
                        src="https://image.flaticon.com/icons/svg/1584/1584687.svg"
                    ></img>
                </div>
                <div>88 BPM</div>
            </div>
        </div>
    );
}

export default Profile;
