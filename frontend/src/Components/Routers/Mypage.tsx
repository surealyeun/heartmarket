import React from 'react';
import './Mypage.scss';

import Header from '../Common/Header';
import Profile from '../Common/Profile';
import Sale from '../Common/Sale';
import Purchase from '../Common/Purchase';
import RManners from '../Common/RManners';
import GManners from '../Common/GManners';

function Mypage() {
    return (
        <div className="mypage">
            <Header />
            <Profile/>
            <hr></hr>
            <div className="products-section">
            <Sale />
            <Purchase />
            </div>
            <div className="manners-section">
            <hr></hr>
            <RManners />
            <GManners />
            </div>
        </div>
    )
}

export default Mypage;