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
  isReload: boolean;
  post: PostItem[];
  indexNum: number;
  PostActions: typeof getPostThunk;
  CountAction: typeof diffBy;
}

class ResultContainer extends Component<Props> {
  componentDidMount() {
    const { PostActions, isReload } = this.props;
    PostActions(0);
    // 새로고침 될때만 실행 (데이터 중복 방지)
    // if (!isReload) {
    //   PostActions(0);
    // }
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
    // 컴포넌트 생명주기를 이해해야 코드 이해 가능
    if (scrollHeight - innerHeight - scrollTop < 100) {
      if (!this.props.loadingPost) {
        const { PostActions, CountAction, post, indexNum } = this.props;
        const lastId = post[post.length - 1].tradeNo;
        if (lastId !== indexNum) {
          CountAction(lastId);
          const { indexNum } = this.props;
          PostActions(indexNum);
        }
      }
    }
  };
  render() {
    const { loadingPost, post } = this.props;
    return <Card loadingPost={loadingPost} post={post} />;
  }
}

export default connect(
  ({ post, postPage }: RootState) => ({
    loadingPost: post.loading.GET_POST,
    isReload: post.isReload,
    post: post.post,
    indexNum: postPage.counter
  }),
  dispatch => ({
    PostActions: bindActionCreators(getPostThunk, dispatch),
    CountAction: bindActionCreators(diffBy, dispatch)
  })
)(ResultContainer);
