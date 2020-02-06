import React, { Component } from "react";
import Header from "../Common/Header";
import Nav from "../Common/Nav";
import "./SearchResult.scss";
import Card from "../Common/Card";
import FilterButton from "../Common/FilterButton";
import axios from "axios";

interface Props {}

interface InnerItems {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

interface State {
  start: number;
  end: number;
  allItems: InnerItems[];
  viewItems: InnerItems[];
}

class SearchResult extends Component<Props, State> {
  state: State = {
    start: 0,
    end: 5,
    allItems: [],
    viewItems: []
  };
  constructor(props: any) {
    super(props);
    const url = "https://jsonplaceholder.typicode.com/photos";
    const { start, end } = this.state;
    axios.get(url).then(result => {
      const res = result.data.slice(0, 20);
      const sliceRes = res.slice(start, end);
      this.setState(
        ({ allItems, viewItems }) => ({
          allItems: allItems.concat(res),
          viewItems: viewItems.concat(sliceRes)
        }),
        () => {
          // console.log(this.state);
        }
      );
    });
  }
  componentDidMount() {
    // this.getNotes();
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
      const { start, end } = this.state;
      console.log("almost bottom of this browser");
      this.setState({ start: start + 5, end: end + 5 });
      this.setState(
        prevState => {
          const addItems = prevState.allItems.slice(
            prevState.start,
            prevState.end
          );
          return {
            viewItems: prevState.viewItems.concat(addItems)
          };
        },
        () => {
          console.log(this.state);
        }
      );
    }
  };
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
    const { viewItems } = this.state;
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
            <div className="SearchResult_items_container">
              {viewItems.map(item => {
                return <Card key={item.id} {...item} />;
              })}
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default SearchResult;
