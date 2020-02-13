import React from "react";
import "./HamZzim.scss";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import axios from "axios";
import { Redirect } from "react-router";
//import { withRouter } from 'react-router-dom'
import { isZzim } from "../../../modules/zzim";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { RootState } from "../../../modules";

interface Props {
  status: boolean | false;
  ZzimAction: typeof isZzim;
}

export interface like {
  cartNo: number;
  cuser: User;
  ctrade: Ctrade;
}

export interface Ctrade {
  tradeNo: number;
  tradeCategory: string;
  tradeTitle: string;
  productName: string;
  tradeArea: string;
  productInfo: string;
  productPrice: string;
  tradeDate: Date;
  ttradeImg: any[];
  buser: null;
  tuser: User;
  tmanner: null;
}

export interface User {
  userNo: number;
  email: string;
  password: string;
  profileImg: null | string;
  nickname: string;
  userPermission: string;
  uarea: Uarea[];
}

export interface Uarea {
  areaNo: number;
  address: string;
  auser: number;
}

class HamZzim extends React.Component<Props> {
  //https://felixblog.tistory.com/50

  responsive = {
    ALL: {
      breakpoint: { max: 4000, min: 0 },
      items: 2
    }
  };

  state = {
    mouse_x: 0,
    mouse_y: 0,
    Likes: Array<like>(),
    success: ""
  };

  mousedown = (e: React.MouseEvent<HTMLImageElement>) => {
    this.setState({
      mouse_x: e.clientX,
      mouse_y: e.clientY
    });
  };

  mouseup = (e: any) => {
    if (e.clientX === this.state.mouse_x && e.clientY === this.state.mouse_y) {
      //this.props.history.push(`/search/detail/${e.target.id}`)
      this.setState({
        success: "/search/detail/" + e.target.id
      });
    }
  };

  user = JSON.parse(window.sessionStorage.getItem("user") || "{}");

  componentDidMount() {
    this.zzimupdate();
  }

  zzimupdate = () => {
    axios({
      method: "get",
      url: "http://13.125.55.96:8080/cart/searchAll",
      params: {
        userNo: this.user.userNo
      }
    })
      .then(res => {
        this.setState({
          Likes: res.data.data
        });
      })
      .catch(err => {
        alert(err);
        console.log("err", err);
      });
  };

  render() {
    if (this.props.status) {
      this.zzimupdate();
      this.props.ZzimAction();
    }
    if (this.state.success) {
      this.setState({
        success:""
      })
      return <Redirect to={this.state.success}></Redirect>;
    }
    return (
      <div className="HamZzim">
        <div className="zzim_info">
          <p className="zzim_title">심쿵목록</p>
          <p className="zzim_plus">더보기</p>
        </div>
        {this.state.Likes ? (
          <div className="div_Zzim">
            <Carousel
              arrows={true}
              infinite={false}
              responsive={this.responsive}
            >
              {this.state.Likes.map(like => (
                <div
                  className="zzim_item"
                  key={like.ctrade.tradeNo ? like.ctrade.tradeNo + "" : ""}
                >
                  <img
                    id={like.ctrade.tradeNo ? like.ctrade.tradeNo + "" : ""}
                    className="img_zzim"
                    onMouseDown={this.mousedown}
                    onMouseUp={this.mouseup}
                    alt=""
                    src="https://dnvefa72aowie.cloudfront.net/origin/article/202001/3f16c38757e982a14216589bb673fb756d1921ec9378767e91b24e6ae09099c3.webp?q=95&s=1440x1440&t=inside"
                  ></img>
                  <p
                    id={like.ctrade.tradeNo ? like.ctrade.tradeNo + "" : ""}
                    onMouseDown={this.mousedown}
                    onMouseUp={this.mouseup}
                    className="zzim_price"
                  >
                    {like.ctrade.productPrice}
                  </p>
                  <p
                    id={like.ctrade.tradeNo ? like.ctrade.tradeNo + "" : ""}
                    className="zzim_itemtitle"
                  >
                    {like.ctrade.tradeTitle}
                  </p>
                </div>
              ))}
            </Carousel>
          </div>
        ) : (
          <p className="no_item">추가된 상품이 없습니다</p>
        )}
      </div>
    );
  }
}

//https://www.npmjs.com/package/react-multi-carousel
export default connect(
  ({ zzimStatus }: RootState) => ({
    status: zzimStatus.status
  }),
  dispatch => ({
    ZzimAction: bindActionCreators(isZzim, dispatch)
  })
)(HamZzim);
