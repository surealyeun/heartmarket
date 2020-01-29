import React from "react";
import "./Nav.scss";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Categoryimg from 'C:/Users/multicampus/HeartMarket/frontend/src/Assets/img/그림1.png';

export default class Nav extends React.Component {
  render() {
    const responsive = {
      Desktop: {
        breakpoint: { max: 4000, min: 767 },
        items: 10,
      },
      mobile: {
        breakpoint: { max: 768, min: 0 },
        items: 8,
      }
    };

    return (
      <nav className="Nav">
        <div className="div">
          <Carousel arrows={false} infinite={true} responsive={responsive}>
            <div className="category"><img className="img_category" alt=""src={Categoryimg}></img></div>
            <div className="category"><img className="img_category" alt=""src={Categoryimg}></img></div>
            <div className="category"><img className="img_category" alt=""src={Categoryimg}></img></div>
            <div className="category"><img className="img_category" alt=""src={Categoryimg}></img></div>
            <div className="category"><img className="img_category" alt=""src={Categoryimg}></img></div>
            <div className="category"><img className="img_category" alt=""src={Categoryimg}></img></div>
            <div className="category"><img className="img_category" alt=""src={Categoryimg}></img></div>
            <div className="category"><img className="img_category" alt=""src={Categoryimg}></img></div>
            <div className="category"><img className="img_category" alt=""src={Categoryimg}></img></div>
            <div className="category"><img className="img_category" alt=""src={Categoryimg}></img></div>
            <div className="category"><img className="img_category" alt=""src={Categoryimg}></img></div>
            <div className="category"><img className="img_category" alt=""src={Categoryimg}></img></div>
            <div className="category"><img className="img_category" alt=""src={Categoryimg}></img></div>
            <div className="category"><img className="img_category" alt=""src={Categoryimg}></img></div>
          </Carousel>
        </div>
      </nav>
    );
  }
}

//https://www.npmjs.com/package/react-multi-carousel