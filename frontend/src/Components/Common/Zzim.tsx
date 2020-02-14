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
  cno: number;
  uno: number;
}

class Zzim extends Component<Props> {
  user = JSON.parse(window.sessionStorage.getItem("user") || "{}");
  state = {
    check: 0
  };

  componentDidMount() {
    this.setState({
      check: this.props.cno
    });
  }

  clickHeart = () => {
    const { ZzimAction } = this.props;
    if(this.props.uno === this.user.userNo){
      alert("본인의 상품은 추가할 수 없습니다.")
    }
    else{
    axios({
      method: "get",
      url: "http://13.125.55.96:8080/cart",
      params: {
        tradeNo: this.props.num,
        userNo: this.user.userNo
      }
    })
      .then(res => {
        ZzimAction();
        if (this.state.check === 0) {
          alert("심쿵 상품으로 추가되었습니다.");
          this.setState({
            check: 1
          });
        } else {
          alert("심쿵 상품을 취소했습니다.");
          this.setState({
            check: 0
          });
        }
      })
      .catch(err => {
        console.log(err);
        alert("심쿵 상품으로 추가되지 않았습니다.");
      });
    }
  };
  render() {
    if (this.state.check === 1) return <div onClick={this.clickHeart}>♥</div>;
    else return <div onClick={this.clickHeart}>♡</div>;
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
