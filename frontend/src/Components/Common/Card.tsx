import React, { Component } from "react";
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

class Card extends Component<Item> {
  render() {
    const { loadingPost, post } = this.props;
    return (
      <div className="SearchResult_items_container">
        {post.map(item => {
          return <Item key={item.tradeNo} {...item} />;
        })}
        {loadingPost && <LoadingView />}
      </div>
    );
  }
}

export default Card;
