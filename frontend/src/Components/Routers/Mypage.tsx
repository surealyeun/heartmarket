import React from "react";
import "./Mypage.scss";

import Header from "../common/Header";
import Profile from "../users/MypageProfile";
import Sale from "../users/Sale";
import Purchase from "../users/Purchase";
import Like from "../users/Like";
import TopButton from "../common/TopButton";
import Penbutton from "../common/PenButton";
import Footer from "../common/Footer";
import SessionDelete from "../common/SessionDelete";

function Mypage() {
    return (
        <>
            <Header/>
            <SessionDelete></SessionDelete>
            <div className="mypage">
                <Profile />
                <div className="like-section">
                    <Like />
                </div>
                <br />
                <br />
                <div className="products-section">
                    <div className="sale-section">
                        <Sale />
                    </div>
                    <div className="purchase-section">
                        <Purchase />
                    </div>
                </div>
            </div>

            <div>
                <TopButton />
                <Penbutton />
                <Footer />
            </div>
        </>
    );
}

export default Mypage;
