import React from 'react';
import Profile from '../Common/Profile';
import Sale from '../Common/Sale';
import Purchase from '../Common/Purchase';

function Mypage() {
    return (
        <div>
            <Profile/>
            <hr></hr>
            <Sale />
            <hr></hr>
            <Purchase />
            <hr></hr>
        </div>
    )
}

export default Mypage;