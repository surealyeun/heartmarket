import React from "react";
import "./HamZzim.scss";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import axios from "axios";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import { isZzim } from "../../../modules/zzim";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { RootState } from "../../../modules";
import ItemCard from "../../users/ItemCard"

interface Props {
  status: boolean | false;
  ZzimAction: typeof isZzim;
}

export interface like {
  cTrade: Trade;
  cartNo: number;
  ctrade: Trade;
  cuser: User;
}

export interface Trade {
  buser: User;
  productInfo: string;
  productPrice: string;
  tTradeImg: TTradeImg[];
  tmanner: Tmanner;
  tradeArea: string;
  tradeCategory: string;
  tradeDate: string;
  tradeNo: number;
  tradeTitle: string;
  tuser: User;
}

export interface User {
  email: string;
  nickname: string;
  password: string;
  profileImg: string;
  uarea: Uarea[];
  userNo: number;
  userPermission: string;
}

export interface Uarea {
  address: string;
  areaNo: number;
}

export interface TTradeImg {
  imgNo: number;
  orgImg: string;
  tiTrade: number;
}

export interface Tmanner {
  heartGauge: number;
  mannerNo: number;
  minusGauge: number;
  muser: User;
  normalGauge: number;
  plusGauge: number;
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
      console.log(e.target)
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
        success: ""
      })
      return <Redirect to={this.state.success}></Redirect>;
    }
    return (
      <div className="HamZzim">
        <div className="zzim_info">
          <p className="zzim_title">심쿵목록</p>
          <Link to="/like"><p className="zzim_plus">더보기</p></Link>
        </div>
        {this.state.Likes ? (
          <div className="div_Zzim">
            <Carousel
              arrows={true}
              infinite={false}
              responsive={this.responsive}
            >
              {this.state.Likes.map(like => (
                <div className="zzim_items" key={like.ctrade.tradeNo} onMouseDown={this.mousedown}
                  onMouseUp={this.mouseup}>
                  <ItemCard image={like.ctrade.tTradeImg} tradeTitle={like.ctrade.tradeTitle}
                    productPrice={like.ctrade.productPrice} tradeNo={like.ctrade.tradeNo} />
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
