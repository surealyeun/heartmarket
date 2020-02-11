import Card from "../../components/common/Card";
import { getPostThunk } from "../../modules/post";
import { diffBy } from "../../modules/postPage";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { RootState } from "../../modules";
import React, { Component } from "react";
import { PostItem } from "../../lib/api";


interface Props {
  loadingPost: any;
  post: PostItem[];
  text: string;
  indexNum: number;
  PostActions: typeof getPostThunk;
  CountAction: typeof diffBy;
}

class ResultContainer extends Component<Props> {
  state = {
    scrollActive: false
  };
  componentDidMount() {
    const { PostActions, indexNum } = this.props;
    PostActions(indexNum);
    window.addEventListener("scroll", this.handleScroll);
  }
  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }
  handleScroll = () => {
    const { innerHeight } = window;
    const { scrollHeight } = document.body;
    const scrollTop =
      (document.documentElement && document.documentElement.scrollTop) ||
      document.body.scrollTop;
    if (scrollHeight - innerHeight - scrollTop < 100) {
      const { PostActions, CountAction, post } = this.props;
      const lastId = post[post.length - 1].tradeNo;
      if (!this.props.loadingPost) {
        CountAction(lastId);
        const { indexNum } = this.props;
        PostActions(indexNum);
      }
    }
  };
  render() {
    const { loadingPost, post } = this.props;
    return <Card loadingPost={loadingPost} post={post} />;
  }
}

export default connect(
  ({ post, postPage, search }: RootState) => ({
    loadingPost: post.loading.GET_POST,
    text: search.text,
    post: post.post,
    indexNum: postPage.counter
  }),
  dispatch => ({
    PostActions: bindActionCreators(getPostThunk, dispatch),
    CountAction: bindActionCreators(diffBy, dispatch)
  })
)(ResultContainer);
