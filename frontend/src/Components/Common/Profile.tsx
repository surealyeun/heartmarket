import React from 'react';
import './Profile.scss';

function Profile() {
    return (
        <div className="profile">
            <div className="profile-img-wrapper">
                <img className="profile-img" alt="profile" 
                src="https://image.flaticon.com/icons/svg/2471/2471392.svg"></img>
            </div>
            <div className="info">
                <div>{window.localStorage.getItem('useremail')}님<br/>동네 설정</div>
            </div>
            <div></div>
            <div className="attack">
                <div>심쿵 BPM</div>
                <div>
                    <img className="heart-img" alt="heart" 
                    src="https://image.flaticon.com/icons/svg/1584/1584687.svg"></img>
                </div>
                <div>88 BPM</div>
            </div>
        </div>
    )
}

export default Profile;