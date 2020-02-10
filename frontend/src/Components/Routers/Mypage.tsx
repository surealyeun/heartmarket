import React from "react";
import "./Mypage.scss";

import Header from "../Common/Header";
import Profile from "../users/MypageProfile";
import Sale from "../users/Sale";
import Purchase from "../users/Purchase";
import Like from "../users/Like";
import Footer from "../Common/Footer";

function Mypage() {
    return (
        <>
            <Header />
            <div className="mypage">
                <Profile />
                <hr />
                <div className="like-section">
                    <Like />
                </div>
                <hr></hr>
                <div className="products-section">
                    <div className="sale-section">
                        <Sale />
                    </div>
                    <div className="purchase-section">
                        <Purchase />
                    </div>
                </div>
                <br />
                <br />
            </div>
            <Footer />
        </>
    );
}

export default Mypage;
