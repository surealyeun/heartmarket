import React, { Component } from "react";
import Header from "../common/Header";
import Footer from "../common/Footer";
import axios from "axios";

import "./UserProfile.scss";
import SessionDelete from "../common/SessionDelete";

class UserProfile extends Component {
  state = {
    isLoad: false
  };

  componentDidMount() {
    axios({
      method: "get",
      url: "http://13.125.55.96:8080/user/"
    })
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    return (
      <>
        <SessionDelete></SessionDelete>
        <Header />
        <div className="user-profile">
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
                누구누구님
                <br />
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
          <hr />
          <div className="user-sale">
            <h3>판매 중인 상품</h3>
            <div className="products">
              <div className="item">
                <img
                  src="https://dnvefa72aowie.cloudfront.net/origin/article/202001/77120318A0EA8BE3F97C131D8758D2B5E452A0D37184FE594F75148386745E8A.jpg?q=82&s=300x300&t=crop"
                  alt="item1"
                />
                {/* <div className="img-back" hidden={this.state.isOver}>
                            <p>모두가 가지고 싶어하는 에어팟</p>
                        </div> */}
              </div>
              <div className="item">
                <img
                  src="https://dnvefa72aowie.cloudfront.net/origin/article/202001/77120318A0EA8BE3F97C131D8758D2B5E452A0D37184FE594F75148386745E8A.jpg?q=82&s=300x300&t=crop"
                  alt="item1"
                />
              </div>
              <div className="item">
                <img
                  src="https://dnvefa72aowie.cloudfront.net/origin/article/202001/77120318A0EA8BE3F97C131D8758D2B5E452A0D37184FE594F75148386745E8A.jpg?q=82&s=300x300&t=crop"
                  alt="item1"
                />
              </div>
              <div className="item">
                <img
                  src="https://dnvefa72aowie.cloudfront.net/origin/article/202001/77120318A0EA8BE3F97C131D8758D2B5E452A0D37184FE594F75148386745E8A.jpg?q=82&s=300x300&t=crop"
                  alt="item1"
                />
              </div>
              <div className="item">
                <img
                  src="https://dnvefa72aowie.cloudfront.net/origin/article/202001/77120318A0EA8BE3F97C131D8758D2B5E452A0D37184FE594F75148386745E8A.jpg?q=82&s=300x300&t=crop"
                  alt="item1"
                />
              </div>
              <div className="item">
                <img
                  src="https://dnvefa72aowie.cloudfront.net/origin/article/202001/77120318A0EA8BE3F97C131D8758D2B5E452A0D37184FE594F75148386745E8A.jpg?q=82&s=300x300&t=crop"
                  alt="item1"
                />
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }
}

export default UserProfile;
