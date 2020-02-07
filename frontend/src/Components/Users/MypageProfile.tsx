import React from "react";
import {Link} from 'react-router-dom';
import "./Profile.scss";

function Profile() {
    const user = JSON.parse(window.sessionStorage.getItem("user") || "{}");

    return (
        <div className="profile">
            <div className="profile-img-wrapper">
                <img
                    className="profile-img"
                    alt="profile"
                    src="https://image.flaticon.com/icons/svg/2471/2471392.svg"
                ></img>
            </div>
            <div className="info">
                <div>
                    {/* link 수정이 필요함 */}
                    <Link to={`/user/${user.email}`}>{user.nickname}님</Link>
                    <br />
                    <Link to="/mypage/update">
                        <button>프로필 수정</button>
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
