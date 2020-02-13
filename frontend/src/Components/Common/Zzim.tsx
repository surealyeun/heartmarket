import React, { Component } from "react";
import { isZzim } from "../../modules/zzim";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { RootState } from "../../modules";
import axios from "axios";

interface Props {
  status: boolean | false;
  ZzimAction: typeof isZzim;
  num: string;
}

class Zzim extends Component<Props> {
  user = JSON.parse(window.sessionStorage.getItem("user") || "{}");

  clickHeart = () => {
    const { ZzimAction } = this.props;
    axios({
      method: "get",
      url: "http://13.125.55.96:8080/cart/insert",
      params: {
        tradeNo: this.props.num,
        userNo: this.user.userNo
      }
    })
      .then(res => {
        ZzimAction();
        alert("심쿵 상품으로 추가되었습니다.");
      })
      .catch(err => {
        console.log(err);
      });
  };
  render() {
    return <span onClick={this.clickHeart}>♡</span>;
  }
}

export default connect(
  ({ zzimStatus }: RootState) => ({
    status: zzimStatus.status
  }),
  dispatch => ({
    ZzimAction: bindActionCreators(isZzim, dispatch)
  })
)(Zzim);
