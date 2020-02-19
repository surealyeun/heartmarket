import React from "react";
import { Link } from "react-router-dom";
import "./Item.scss";
import Zzim from "../common/Zzim";

interface PostItem {
  tradeNo: number;
  tlist: null;
  unicname: string;
  pprice: string;
  ttitle: string;
  tarea: string;
  uno: number;
  uimg: string;
  cno: number;
}

function Item(props: PostItem) {
  const item = props;
  const num = item.tradeNo + "";
  return (
    <div className="Item">
      <div className="zzim_item">
        {/* {sessionStorage.getItem("user") && <Zzim num={num}></Zzim>} */}
        <Zzim cno={item.cno} num={num} uno={item.uno}></Zzim>
      </div>
      <Link to={{ pathname: `/search/detail/${item.tradeNo}` }}>
        <div className="Card">
          <div className="Card_header">
            <img
              className="avatar"
              src={item.uimg}
              //src="https://dnvefa72aowie.cloudfront.net/origin/article/202001/3f16c38757e982a14216589bb673fb756d1921ec9378767e91b24e6ae09099c3.webp?q=95&s=1440x1440&t=inside"
              alt=""
            ></img>
            <p className="Card_nick">{item.unicname}</p>
          </div>
          <hr className="line"></hr>
          <div className="Card_img">
            <img
              className="img_body"
              src={item.tlist || ""}
              //src="https://dnvefa72aowie.cloudfront.net/origin/article/202002/59CF77DBCA567CD7F48CE8DF791EB9E6278E3EA4499D1FE89144CB3E706B5B78.jpg?q=95&s=1440x1440&t=inside"
              alt=""
            ></img>
          </div>
          <hr className="line"></hr>

          <div className="Card_container">
            {/* <p>{item.tradeNo}</p> */}
            <p className="title">{item.ttitle}</p>
            <p className="money">#{item.pprice}원</p>
            <p className="address">#{item.tarea}</p>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default Item;
