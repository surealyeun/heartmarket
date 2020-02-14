import React from "react";
import { PostItem } from "../../lib/api";
import "./Card.scss";
import "./LoadingView";
import LoadingView from "./LoadingView";
//import { Link } from "react-router-dom";
import Item from "../common/Item";

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
        <Item key={item.tradeNo} {...item}></Item>
      ))}
      {loadingPost && <LoadingView />}
    </div>
  );
}

export default Card;
