import React from "react";
import { PostItem } from "../../lib/api";
import "./Card.scss";
import "./LoadingView";
import LoadingView from "./LoadingView";
import { Link } from "react-router-dom";

interface Item {
  loadingPost: boolean;
  post: PostItem[];
}

function Card(props: Item) {
  // console.log(props);
  const { loadingPost, post } = props;
  return (
    <div className="SearchResult_items_container">
      {post.map(item => (
        <Link to={{ pathname: `/search/detail/${item.tradeNo}` }}>
          <div key={item.tradeNo} className="Card">
            <div className="Card_header">
              <img className="avatar" 
              src={item.uimg}
              //src="https://dnvefa72aowie.cloudfront.net/origin/article/202001/3f16c38757e982a14216589bb673fb756d1921ec9378767e91b24e6ae09099c3.webp?q=95&s=1440x1440&t=inside"
               alt=""></img>
              <p className="Card_nick">{item.unicname}</p>
            </div>
            <hr className="line"></hr>
            <div className="Card_img">
              <img className="img_body" 
              src={item.tlist||""}
              //src="https://image.flaticon.com/icons/svg/1063/1063738.svg"
               alt=""></img>
              {sessionStorage.getItem("user") && (
                <img
                  className="img_heart"
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Coraz%C3%B3n.svg/220px-Coraz%C3%B3n.svg.png"
                  alt="heart_icon"
                ></img>
              )}
            </div>
            <hr className="line"></hr>

            <div className="Card_container">
              <p className="title">{item.ttitle}</p>
              <p className="money">#{item.pprice}원</p>
              <p className="address">#{item.tarea}</p>
            </div>
          </div>
        </Link>
      ))}
      {loadingPost && <LoadingView />}
    </div>
  );
}

export default Card;
