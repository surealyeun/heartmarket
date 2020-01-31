import React from "react";
import Header from "../Common/Header";
import Nav from "../Common/Nav";
import "./SearchResult.scss";
import Card from "../Common/Card";

function SearchResult() {
  return (
    <>
      <Header></Header>
      <Nav></Nav>
      <div className="Main">
        <div className="filter_items">
          <div className="container_filter">
            <button className="filter_area">역삼</button>
            <button className="filter_area">강남구</button>
            <button className="filter_area">최신순</button>
            <button className="filter_area">거리순</button>
            <button className="filter_area">가격</button>
            <button className="filter_area">완료</button>
            <button className="filter_area">지도</button>
          </div>
        </div>
        <div className="items">
          <h4 className="items_header">두근 마켓 검색 결과</h4>
          <div className="container_items">
            <Card/>
            <Card/>
            <Card/>
            <Card/>
            <Card/>
          </div>
        </div>
      </div>
    </>
  );
}

export default SearchResult;
