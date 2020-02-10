import React, { Component } from "react";
import Header from "../Common/Header";
import Nav from "../Common/Nav";
import "./SearchResult.scss";
import FilterButton from "../Common/FilterButton";
import SearchResultContainer from "../../containers/Search/SearchResultContainer";

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
            <SearchResultContainer />
          </div>
        </div>
      </>
    );
  }
}

export default SearchResult;
