import React from 'react';
import './Profile.scss';

function Profile() {
    return (
        <div className="wrapper">
            <div>
                <img className="profile-img" alt="profile" src="https://cdn2.iconfinder.com/data/icons/facebook-51/32/FACEBOOK_LINE-01-512.png"></img>
            </div>
            <div>
                <div>..님</div>
                <div>동네 설정</div>
            </div>
            <div></div>
            <div>
                <div>심쿵</div>
                <div><img className="heart-img" alt="heart" src="https://imageog.flaticon.com/icons/png/512/30/30767.png?size=1200x630f&pad=10,10,10,10&ext=png&bg=FFFFFFFF"></img></div>
                <div>88 BPM</div>
            </div>
        </div>
    )
}

export default Profile;