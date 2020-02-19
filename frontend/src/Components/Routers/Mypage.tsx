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
import ToLogin from "../users/ToLogin";
import { connect } from "react-redux";
import { RootState } from "../../modules";

interface Props {
  status: string | null;
}

class Mypage extends React.Component<Props> {
  componentDidMount() {
    window.scrollTo(0,0);
  }

  render() {
    return (
      <>
        {this.props.status === "true" ? (
          <>
            <Header />
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
        ) : (
          <ToLogin />
        )}
      </>
    );
  }
}

export default connect(({ userStatus }: RootState) => ({
  status: userStatus.status
}))(Mypage);
