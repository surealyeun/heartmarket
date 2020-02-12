import React, { Component } from "react";
import Header from "../common/Header";
import Nav from "../common/Nav";
import "./SearchResult.scss";
import FilterButton from "../common/FilterButton";
import ResultContainer from "../../containers/search/ResultContainer"

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
  componentDidMount() {
    window.sessionStorage.setItem('isText', "true");
  }
  componentWillUnmount() {
    window.sessionStorage.setItem('isText', "false");
  }
  render() {
    return (
      <>
        <Header></Header>
        <Nav></Nav>
        <div className="SearchResult_main">
          <div className="SearchResult_filter_items">
            <div className="SearchResult_filter_container">
              {this.filters.map(filter => {
                return <FilterButton key={filter.id} {...filter} />;
              })}
              <img
                className="SearchResult_filter_container_img"
                src="https://image.flaticon.com/icons/svg/747/747751.svg"
                alt="map"
              ></img>
            </div>
          </div>
          <div className="SearchResult_items">
            <h4 className="SearchResult_items_header">두근 마켓 검색 결과</h4>
            <ResultContainer/>
          </div>
        </div>
      </>
    );
  }
}

export default SearchResult;
