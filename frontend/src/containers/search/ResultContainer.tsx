import Card from '../../components/common/Card'
import { getPostThunk, statusChange } from '../../modules/post'
import { diffBy } from '../../modules/postPage'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { RootState } from '../../modules'
import React, { Component } from 'react'
import { PostItem } from '../../lib/api'

interface Props {
  loadingPost: any
  isLast: boolean
  filterType: number
  cType: string
  isReload: boolean
  post: PostItem[]
  pageNum: number
  PostActions: typeof getPostThunk
  FilterAction: typeof statusChange
  CountAction: typeof diffBy
}

class ResultContainer extends Component<Props> {
  state = {
    previousFType: 5,
    previousCType: '0'
  }
  componentDidMount() {
    const { PostActions, isReload, filterType, FilterAction, CountAction, cType } = this.props
    // PostActions(0);
    // 새로고침 될때만 실행 (데이터 중복 방지)
    // console.log("DidMount!")
    // if (!isReload) {
    //   PostActions(0, filterType)
    // }
    if (!isReload || cType !== this.state.previousCType) {
      // console.log("category change!")
      this.setState({ previousCType: cType })
      FilterAction()
      CountAction(0)
      PostActions(0, filterType)
    }
    // // console.log(filterType)
    window.addEventListener('scroll', this.handleScroll)
  }

  componentDidUpdate() {
    const { filterType, cType, FilterAction, PostActions, CountAction } = this.props
    if (filterType !== this.state.previousFType) {
      // console.log("filter change!");
      this.setState({ previousFType: filterType })
      FilterAction()
      CountAction(0)
      PostActions(0, filterType)
    }
    if (cType !== this.state.previousCType) {
      // console.log("category change!")
      this.setState({ previousCType: cType })
      FilterAction()
      CountAction(0)
      PostActions(0, filterType)
    }
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
  }
  // 인피니트 스크롤링
  handleScroll = () => {
    const { innerHeight } = window
    const { scrollHeight } = document.body
    const scrollTop = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop
    // 컴포넌트 생명주기를 이해해야 코드 이해 가능
    if (scrollHeight - innerHeight - scrollTop < 100) {
      if (!this.props.loadingPost) {
        const { PostActions, CountAction, isLast, filterType } = this.props
        if (!isLast) {
          const { pageNum } = this.props
          CountAction(pageNum + 1)
          PostActions(pageNum + 1, filterType)
        }
      }
    }
  }
  render() {
    const { loadingPost, post } = this.props
    // const postByPrice = [...post].sort(function(a, b) { return parseInt(a.pprice) - parseInt(b.pprice)})
    return <Card loadingPost={loadingPost} post={post} />
  }
}

export default connect(
  ({ post, postPage, postFilter, categoryStatus }: RootState) => ({
    loadingPost: post.loading.GET_POST,
    isLast: post.isLast,
    isReload: post.isReload,
    post: post.post,
    pageNum: postPage.counter,
    filterType: postFilter.num,
    cType: categoryStatus.type
  }),
  dispatch => ({
    PostActions: bindActionCreators(getPostThunk, dispatch),
    FilterAction: bindActionCreators(statusChange, dispatch),
    CountAction: bindActionCreators(diffBy, dispatch)
  })
)(ResultContainer)
