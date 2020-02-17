import React, { Component } from "react";
import { PostItem } from "../../lib/api";
import "./Card.scss";
import "./LoadingView";
import LoadingView from "./LoadingView";
//import { Link } from "react-router-dom";
import Item from "../common/Item";
import { isCategory } from "../../modules/category";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { RootState } from "../../modules";

interface Item {
  loadingPost: boolean;
  post: PostItem[];
  CategoryAction: typeof isCategory;
  categorystatus: boolean | null;
}

class Card extends Component<Item> {

  state = {
    category: "0"
  };

  componentDidMount() {
    this.setState({
      category: window.sessionStorage.getItem("searchCategory")
    });
  }

  //새로운 Props를 받았을 때 렌더링 다시 해주는 함수
  componentDidUpdate() {
    if (this.props.categorystatus) {
      this.props.CategoryAction();
      this.setState({
        category: window.sessionStorage.getItem("searchCategory")
      });
    }
  }

  render() {
    const { loadingPost, post } = this.props;

    return (
      <div className="SearchResult_items_container">
        {post.map(item => (
          <div key={item.tradeNo}>
            {this.state.category === "0" ? <Item  {...item}></Item> : (
              <>
                {/* "1" 자리에 아이템의 카테고리 번호 넣어주기 */}
                {this.state.category === "1" && <Item  {...item}></Item>}
              </>
            )}
          </div>
        ))}
        {loadingPost && <LoadingView />}
      </div>
    );
  }
}

export default connect(
  ({ categoryStatus }: RootState) => ({
    categorystatus: categoryStatus.status,
  }),
  dispatch => ({
    CategoryAction: bindActionCreators(isCategory, dispatch),
  })
)(Card);
