import Card from "../../components/common/Card";
import { getPostThunk } from "../../modules/post";
import { diffBy } from "../../modules/postPage";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { RootState } from "../../modules";
import React, { Component } from "react";

interface Props {
  loadingPost: any;
  post: any;
  text: string;
  indexNum: number;
  PostActions: typeof getPostThunk;
  CountAction: typeof diffBy;
}

class ResultContainer extends Component<Props> {
  state = {
    isLast: false,
  };
  
  componentDidMount() {
    console.log(this.props.text)
    const { PostActions } = this.props;
    PostActions(0);
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
      if (!this.props.loadingPost && !this.state.isLast) {
        CountAction(lastId);
        const { indexNum } = this.props;
        if (lastId === indexNum) {
          this.setState({ isLast: true });
        }
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
