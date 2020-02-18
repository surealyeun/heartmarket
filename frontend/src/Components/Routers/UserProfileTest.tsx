import React, { Component } from "react";
import Header from "../common/Header";
import Footer from "../common/Footer";
import axios from "axios";
import ItemCard_simple from "../users/ItemCardSimple";
import { Link } from "react-router-dom";

import "./UserProfile.scss";
import SessionDelete from "../common/SessionDelete";

import { userPostItem } from "../../lib/api";
import { userDiffBy } from "../../modules/postPage";
import { getUserPostThunk } from "../../modules/userPost";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { RootState } from "../../modules";

interface Props {
  loadingPost: boolean;
  isLast: boolean;
  isReload: boolean;
  sales: userPostItem[];
  pageNum: number;
  CountAction: typeof userDiffBy
  PostActions: typeof getUserPostThunk;
}

class UserProfileTest extends Component<Props> {
  state = {
    isLoad: false,
    user: { otherNo: 0, otherImg: "", otherNickname: "", otherHg: "" }
  };

  url = window.location.href.split("/");
  userNo = this.url[this.url.length - 1];

  componentDidMount() {
    console.log("component did mount");
    axios({
      method: "get",
      url: "http://13.125.55.96:8080/mypage/{userno}",
      params: {
        userno: this.userNo
      }
    })
      .then(res => {
        console.log(res.data.data);
        this.setState({
          user: res.data.data
        });
      })
      .catch(err => {
        console.log(err);
        alert("user error");
      });
    const { PostActions, isReload } = this.props;
    if (!isReload) {
      PostActions(this.userNo, 0)
    }
    window.addEventListener("scroll", this.handleScroll);
  }
  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }
    // 인피니트 스크롤링
    handleScroll = () => {
      const { innerHeight } = window;
      const { scrollHeight } = document.body;
      const scrollTop =
        (document.documentElement && document.documentElement.scrollTop) ||
        document.body.scrollTop;
      // 컴포넌트 생명주기를 이해해야 코드 이해 가능
      if (scrollHeight - innerHeight - scrollTop < 100) {
        if (!this.props.loadingPost) {
          const { PostActions, CountAction, isLast } = this.props;
          if (!isLast) {
            const { pageNum } = this.props;
            CountAction(pageNum+1);
            PostActions(this.userNo, pageNum+1);
          }
        }
      }
    };
  render() {
    const { sales } = this.props;
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
                src={this.state.user.otherImg}
              ></img>
            </div>
            <div className="info">
              <div>
                {/* link 수정이 필요함 */}
                {this.state.user.otherNickname}님
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
              <div>{this.state.user.otherHg} BPM</div>
            </div>
          </div>
          <hr className="tophr" />
          <div className="user-sale">
            <h3>판매 상품</h3>
            <div className="products">
              {sales.map(sale => {
                return (
                  <Link key={sale.tradeNo} to={`/search/detail/${sale.tradeNo}`}>
                    <ItemCard_simple
                      image={sale.uimg}
                      tradeTitle={sale.ttitle}
                      productPrice={sale.pprice}
                    />
                  </Link>
                );
              })}
              {sales.length === 0 && (
                <div>
                  <h4>판매 상품이 없습니다.</h4>
                </div>
              )}
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }
}

export default connect(
  ({ userP, userPostPage }: RootState) => ({
    loadingPost: userP.loading.GET_POST,
    isLast: userP.isLast,
    isReload: userP.isReload,
    sales: userP.post,
    pageNum: userPostPage.counter
  }),
  dispatch => ({
    PostActions: bindActionCreators(getUserPostThunk, dispatch),
    CountAction: bindActionCreators(userDiffBy, dispatch)
  })
)(UserProfileTest);
