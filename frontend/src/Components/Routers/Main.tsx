import React from "react";
import "./Main.scss";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Categoryimg from "../../Assets/img/그림1.png";

import Header from "../Common/Header";
import Nav from "../Common/Nav";
import Button from "../Common/Button";
import Footer from "../Common/Footer";

function Main() {
  const responsive = {
    Desktop: {
      breakpoint: { max: 4000, min: 767 },
      items: 1
    },
    mobile: {
      breakpoint: { max: 768, min: 0 },
      items: 1
    }
  };

  return (
    <>
      <Header></Header>
      <Nav></Nav>
      <div className="Main">
        <div className="div_carousel">
          <Carousel
            additionalTransfrom={0}
            arrows
            autoPlaySpeed={3000}
            centerMode={false}
            containerClass="container"
            draggable
            infinite
            keyBoardControl
            minimumTouchDrag={80}
            renderButtonGroupOutside={false}
            renderDotsOutside={false}
            showDots
            slidesToSlide={1}
            swipeable
            responsive={responsive}
          >
            <div className="div_ganji">
              <img
                className="ganji"
                alt=""
                src="https://images.unsplash.com/photo-1550133730-695473e544be?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60"
              ></img>
            </div>
            <div className="div_ganji">
              <img
                className="ganji"
                alt=""
                src="https://images.unsplash.com/photo-1550338861-b7cfeaf8ffd8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60"
              ></img>
            </div>
            <div className="div_ganji">
              <img
                className="ganji"
                alt=""
                src="https://images.unsplash.com/photo-1550167164-1b67c2be3973?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60"
              ></img>
            </div>
          </Carousel>
        </div>
        <div className="famous">
          <h4 className="famous_text">두근 마켓 인기 매물</h4>
          <div className="famous_bundle">
            <div className="div_famous"></div>
            <div className="div_famous"></div>
            <div className="div_famous"></div>
            <div className="div_famous"></div>
            <div className="div_famous"></div>
          </div>
        </div>
      </div>
      <Button></Button>
      <Footer></Footer>
    </>
  );
}

export default Main;
