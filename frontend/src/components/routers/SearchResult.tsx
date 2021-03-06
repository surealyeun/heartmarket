import React, { Component } from 'react'
import Header from '../common/Header'
import Nav from '../common/Nav'
import Footer from '../common/Footer'
import './SearchResult.scss'
import FilterButton from '../common/FilterButton'
import ResultContainer from '../../containers/search/ResultContainer'
import PenButton from '../common/PenButton'
import TopButton from '../common/TopButton'
import { isCategory, setCategory } from '../../modules/category'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { RootState } from '../../modules'
import { Link } from 'react-router-dom'

interface Props {
  CategoryAction: typeof isCategory
  CategorySetAction: typeof setCategory
}

class SearchResult extends Component<Props> {
  state = {
    area: window.sessionStorage.getItem('user')
  }
  filters = [
    {
      id: 1,
      title: '강남구'
    },
    {
      id: 2,
      title: this.state.area ? JSON.parse(this.state.area).uarea[0].address : '강남구 전체'
    },
    {
      id: 3,
      title: '최신순'
    },
    {
      id: 4,
      title: '가격순'
    },
    {
      id: 5,
      title: '판매 중'
    },
    {
      id: 6,
      title: '판매 완료'
    }
  ]

  category = [
    { name: '' },
    { name: '디지털/가전 X' },
    { name: '가구/인테리어 X' },
    { name: '유아동/유아도서 X' },
    { name: '생활가공식품 X' },
    { name: '여성의류 X' },
    { name: '여성잡화 X' },
    { name: '뷰티/미용 X' },
    { name: '남성패션/잡화 X' },
    { name: '스포츠/레저 X' },
    { name: '게임/취미 X' },
    { name: '도서/티켓/음반 X' },
    { name: '반려동물용품 X' },
    { name: '기타중고물품 X' }
  ]

  componentDidMount() {
    window.sessionStorage.setItem('isText', 'true')
  }
  componentWillUnmount() {
    window.sessionStorage.setItem('isText', 'false')
  }

  categoryDelete = () => {
    window.sessionStorage.setItem('searchCategory', '0')
    this.props.CategoryAction()
    this.props.CategorySetAction('0')
  }

  openMap = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    if (sessionStorage.getItem('user')) {
    } else {
      alert('로그인 후에 이용 가능한 서비스입니다.')
      e.preventDefault()
    }
  }

  render() {
    return (
      <>
        <Header></Header>
        <Nav></Nav>
        <div className="SearchResult_main">
          <div className="SearchResult_filter">
            {this.filters.map(filter => {
              if (sessionStorage.getItem('user')) {
                return <FilterButton key={filter.id} {...filter} />
              } else {
                if (filter.id !== 1) return <FilterButton key={filter.id} {...filter} />
              }
            })}
            <Link to="/map" onClick={e => this.openMap(e)}>
              <img className="SearchResult_filter_container_img" src="https://image.flaticon.com/icons/svg/854/854878.svg" alt="map"></img>
            </Link>
          </div>

          <div className="SearchResult_items">
            <span className="SearchResult_items_header">두근 마켓 검색 결과</span>
            <span className="category_text" onClick={this.categoryDelete}>
              {this.category[Number(window.sessionStorage.getItem('searchCategory')) || 0].name}
            </span>
            <ResultContainer />
          </div>
        </div>
        <Footer></Footer>
        <PenButton></PenButton>
        <TopButton></TopButton>
      </>
    )
  }
}

export default connect(
  ({ categoryStatus }: RootState) => ({
    status: categoryStatus.status
  }),
  dispatch => ({
    CategoryAction: bindActionCreators(isCategory, dispatch),
    CategorySetAction: bindActionCreators(setCategory, dispatch)
  })
)(SearchResult)
