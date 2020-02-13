import React, { Component } from "react";
import Header from "../common/Header";
import Nav from "../common/Nav";
import Footer from "../common/Footer";
import "./SearchResult.scss";
import FilterButton from "../common/FilterButton";
import ResultContainer from "../../containers/search/ResultContainer";
import PenButton from "../common/PenButton";
import TopButton from "../common/TopButton";

class SearchResult extends Component {
  filters = [
    {
      id: 1,
      title: "강남구"
    },
    {
      id: 2,
      title: "역삼동"
    },
    {
      id: 3,
      title: "최신순"
    },
    {
      id: 4,
      title: "거리순"
    },
    {
      id: 5,
      title: "가격"
    }
  ];

  category = [
    { name: ""},
    { name: "디지털/가전" },
    { name: "가구/인테리어" },
    { name: "유아동/유아도서" },
    { name: "생활가공식품" },
    { name: "여성의류" },
    { name: "여성잡화" },
    { name: "뷰티/미용" },
    { name: "남성패션/잡화" },
    { name: "스포츠/레저" },
    { name: "게임/취미" },
    { name: "도서/티켓/음반" },
    { name: "반려동물용품" },
    { name: "기타중고물품" }
  ];

  componentDidMount() {
    window.sessionStorage.setItem("isText", "true");
  }
  componentWillUnmount() {
    window.sessionStorage.setItem("isText", "false");
  }
  render() {
    return (
      <>
        <Header></Header>
        <Nav></Nav>
        <div className="SearchResult_main">
          <div className="SearchResult_filter">
            {this.filters.map(filter => {
              return <FilterButton key={filter.id} {...filter} />;
            })}
            <img
              className="SearchResult_filter_container_img"
              src="https://image.flaticon.com/icons/svg/854/854878.svg"
              alt="map"
            ></img>
          </div>

          <div className="SearchResult_items">
            <span className="SearchResult_items_header">
              두근 마켓 검색 결과
            </span>
            <span>{this.category[Number(window.sessionStorage.getItem("searchCategory"))||0].name}</span>
            <ResultContainer />
          </div>
        </div>
        <Footer></Footer>
        <PenButton></PenButton>
        <TopButton></TopButton>
      </>
    );
  }
}

export default SearchResult;
