import Item from "../Components/Search/Item";
import { getPostThunk } from "../modules/post";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { RootState } from "../modules";

import React, { Component } from "react";

interface Props {
  loadingPost: any;
  post: any;
  PostActions: typeof getPostThunk;
}

class ItemContainer extends Component<Props> {
  componentDidMount() {
    const { PostActions } = this.props
    PostActions(1)
  }
  render() {
    const { loadingPost, post } = this.props
    return (
      <div>
        <Item
          post={post}
          loadingPost={loadingPost}
        ></Item>
      </div>
    );
  }
}

export default connect(
  ({ post }: RootState) => ({
    loadingPost: post.loading.GET_POST,
    post: post.post
  }),
  dispatch => ({
    PostActions: bindActionCreators(getPostThunk, dispatch)
  })
)(ItemContainer);
