import React from "react";
import {Link} from 'react-router-dom';
import Gauge from '../common/hamburger/Gauge';
import "./Profile.scss";
import SessionDelete from "../common/SessionDelete";

class Profile extends React.Component {
    user = JSON.parse(window.sessionStorage.getItem("user") || "{}");

    render() {return (
        <div className="profile">
            <SessionDelete></SessionDelete>
            <div className="profile-img-wrapper">
                <img
                    className="profile-img"
                    alt="profile"
                    src={this.user.profileImg}
                ></img>
            </div>
            <div className="info">
                <div>
                    {/* link 수정이 필요함 */}
                    <Link to={`/user/${this.user.userNo}`}>
                        <h3>{this.user.nickname}님</h3>
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
}

export default Profile;
