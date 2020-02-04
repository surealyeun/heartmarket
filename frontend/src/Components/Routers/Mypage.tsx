import React from "react";
import "./Mypage.scss";

import Header from "../Common/Header";
import Profile from "../users/Profile";
import Sale from "../users/Sale";
import Purchase from "../users/Purchase";
import RManners from "../users/RManners";
import GManners from "../users/GManners";
import Like from '../users/Like';

function Mypage() {

    return (
        <div className="mypage">
            <Header />
            <Profile />
            <hr />
            <div className="like-section">
                <Like />
            </div>
            <hr></hr>
            <div className="products-section">
                <Sale />
                <Purchase />
            </div>
            <hr></hr>
            <div className="manners-section">
                <RManners />
            </div>
        </div>
    );
}

export default Mypage;
