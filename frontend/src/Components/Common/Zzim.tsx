import React, { Component } from "react";
import { isZzim } from "../../modules/zzim";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { RootState } from "../../modules";
import axios from "axios";

interface Props {
  zzimstatus: boolean | false;
  ZzimAction: typeof isZzim;
  num: string;
  cno: number;
  uno: number;
  userstatus: string | null;
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

  //새로운 Props를 받았을 때 렌더링 다시 해주는 함수
  componentDidUpdate(prevProps: any) {
    //console.log(this.props.cno);
    if (this.props.cno !== prevProps.cno) {
      this.setState({
        check: this.props.cno
      });
    }
  }

  clickHeart = () => {
    const { ZzimAction } = this.props;
    if (this.props.userstatus === "true") {
      if (this.props.uno === this.user.userNo) {
        alert("본인의 상품은 추가할 수 없습니다.")
      }
      else {
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
              this.setState({
                check: 1
              });
              alert("심쿵 상품으로 추가되었습니다.");
            } else {
              this.setState({
                check: 0
              });
              alert("심쿵 상품을 취소했습니다.");
            }
          })
          .catch(err => {
            console.log(err);
            alert("심쿵 상품으로 추가되지 않았습니다.");
          });
      }
    }
    else {
      alert("로그인을 해야 이용할 수 있는 서비스입니다")
    }
  };
  render() {
    //로그인 되어있을때만 표시
    if (this.state.check === 1 && this.props.userstatus === "true") return <div onClick={this.clickHeart}>♥</div>;
    else return <div onClick={this.clickHeart}>♡</div>;
  }
}

export default connect(
  ({ zzimStatus, userStatus }: RootState) => ({
    zzimstatus: zzimStatus.status,
    userstatus: userStatus.status
  }),
  dispatch => ({
    ZzimAction: bindActionCreators(isZzim, dispatch),
  })
)(Zzim);
