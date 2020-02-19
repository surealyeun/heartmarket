import React, { useState } from "react";
import "./Nav.scss";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Categoryimg1 from "../img/cate1-2.png";
import Categoryimg2 from "../img/cate2-2.png";
import Categoryimg3 from "../img/cate3-2.png";
import Categoryimg4 from "../img/cate4-2.png";
import Categoryimg5 from "../img/cate5-5.png";
import Categoryimg6 from "../img/cate6-2.png";
import Categoryimg7 from "../img/cate7-1.png";
import Categoryimg8 from "../img/cate8-1.png";
import Categoryimg9 from "../img/cate9-4.png";
import Categoryimg10 from "../img/cate10-1.png";
import Categoryimg11 from "../img/cate11-1.png";
import Categoryimg12 from "../img/cate12-1.png";
import Categoryimg13 from "../img/cate13-1.png";

import Categorytxt1 from "../img/cate1-txt.png";
import Categorytxt2 from "../img/cate2-txt.png";
import Categorytxt3 from "../img/cate3-1-txt.png";
import Categorytxt4 from "../img/cate4-txt.png";
import Categorytxt5 from "../img/cate5-txt.png";
import Categorytxt6 from "../img/cate6-1-txt.png";
import Categorytxt7 from "../img/cate7-txt.png";
import Categorytxt8 from "../img/cate8-txt.png";
import Categorytxt9 from "../img/cate9-txt.png";
import Categorytxt10 from "../img/cate10-txt.png";
import Categorytxt11 from "../img/cate11-txt.png";
import Categorytxt12 from "../img/cate12-txt.png";
import Categorytxt13 from "../img/cate13-txt.png";

import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";
import { isCategory, setCategory } from "../../modules/category";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { RootState } from "../../modules";

interface Props {
  CategoryAction: typeof isCategory;
  CategorySetAction: typeof setCategory;
}

function Nav(props:Props) {
  //https://felixblog.tistory.com/50

  let history = useHistory();

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

  const [mouse, setMouse] = useState({
    mouse_x: 0,
    mouse_y: 0
  });

  const { mouse_x, mouse_y } = mouse;

  const mousedown = (e: React.MouseEvent<HTMLImageElement>) => {
    setMouse({
      ...mouse,
      mouse_x: e.clientX,
      mouse_y: e.clientY
    });
  };

  const mouseup = (e: any) => {
    if (e.clientX === mouse_x && e.clientY === mouse_y) {
      //alert(e.target.id); //여기서 클릭
      window.sessionStorage.setItem("searchCategory", e.target.id);
      props.CategoryAction();
      props.CategorySetAction(e.target.id);
      if(window.sessionStorage.getItem("searchText")!=="false") history.push("/search");
    }
  };

  return (
    <nav className="Nav">
      <div className="div">
        <Carousel arrows={true} infinite={false} responsive={responsive} swipeable={false}
          draggable
          slidesToSlide={1}>
          <Button className="category">
            <img id='1'
              className="img_category"
              onMouseDown={mousedown} onMouseUp={mouseup}
              alt=""
              src={Categoryimg1}
            ></img>
            <img id='1'
              className="img_category1"
              onMouseDown={mousedown} onMouseUp={mouseup}
              alt=""
              src={Categorytxt1}
            ></img>
          </Button>
          <Button className="category">
            <img id='2'
              className="img_category"
              onMouseDown={mousedown} onMouseUp={mouseup}
              alt=""
              src={Categoryimg2}
            ></img>
            <img id='2'
              className="img_category1"
              onMouseDown={mousedown} onMouseUp={mouseup}
              alt=""
              src={Categorytxt2}
            ></img>
          </Button>
          <Button className="category">
            <img id='3'
              className="img_category"
              onMouseDown={mousedown} onMouseUp={mouseup}
              alt=""
              src={Categoryimg3}
            ></img>
            <img id='3'
              className="img_category1"
              onMouseDown={mousedown} onMouseUp={mouseup}
              alt=""
              src={Categorytxt3}
            ></img>
          </Button>
          <Button className="category">
            <img id='4'
              className="img_category"
              onMouseDown={mousedown} onMouseUp={mouseup}
              alt=""
              src={Categoryimg4}
            ></img>
            <img id='4'
              className="img_category1"
              onMouseDown={mousedown} onMouseUp={mouseup}
              alt=""
              src={Categorytxt4}
            ></img>
          </Button>
          <Button className="category">
            <img id='5'
              className="img_category"
              onMouseDown={mousedown} onMouseUp={mouseup}
              alt=""
              src={Categoryimg5}
            ></img>
            <img id='5'
              className="img_category1"
              onMouseDown={mousedown} onMouseUp={mouseup}
              alt=""
              src={Categorytxt5}
            ></img>
          </Button>
          <Button className="category">
            <img id='6'
              className="img_category"
              onMouseDown={mousedown} onMouseUp={mouseup}
              alt=""
              src={Categoryimg6}
            ></img>
            <img id='6'
              className="img_category1"
              onMouseDown={mousedown} onMouseUp={mouseup}
              alt=""
              src={Categorytxt6}
            ></img>
          </Button>
          <Button className="category">
            <img id='7'
              className="img_category"
              onMouseDown={mousedown} onMouseUp={mouseup}
              alt=""
              src={Categoryimg7}
            ></img>
            <img id='7'
              className="img_category1"
              onMouseDown={mousedown} onMouseUp={mouseup}
              alt=""
              src={Categorytxt7}
            ></img>
          </Button>
          <Button className="category">
            <img id='8'
              className="img_category"
              onMouseDown={mousedown} onMouseUp={mouseup}
              alt=""
              src={Categoryimg8}
            ></img>
            <img id='8'
              className="img_category1"
              onMouseDown={mousedown} onMouseUp={mouseup}
              alt=""
              src={Categorytxt8}
            ></img>
          </Button>
          <Button className="category">
            <img id='9'
              className="img_category"
              onMouseDown={mousedown} onMouseUp={mouseup}
              alt=""
              src={Categoryimg9}
            ></img>
            <img id='9'
              className="img_category1"
              onMouseDown={mousedown} onMouseUp={mouseup}
              alt=""
              src={Categorytxt9}
            ></img>
          </Button>
          <Button className="category">
            <img id='10'
              className="img_category"
              onMouseDown={mousedown} onMouseUp={mouseup}
              alt=""
              src={Categoryimg10}
            ></img>
            <img id='10'
              className="img_category1"
              onMouseDown={mousedown} onMouseUp={mouseup}
              alt=""
              src={Categorytxt10}
            ></img>
          </Button>
          <Button className="category">
            <img id='11'
              className="img_category"
              onMouseDown={mousedown} onMouseUp={mouseup}
              alt=""
              src={Categoryimg11}
            ></img>
            <img id='11'
              className="img_category1"
              onMouseDown={mousedown} onMouseUp={mouseup}
              alt=""
              src={Categorytxt11}
            ></img>
          </Button>
          <Button className="category">
            <img id='12'
              className="img_category"
              onMouseDown={mousedown} onMouseUp={mouseup}
              alt=""
              src={Categoryimg12}
            ></img>
            <img id='12'
              className="img_category1"
              onMouseDown={mousedown} onMouseUp={mouseup}
              alt=""
              src={Categorytxt12}
            ></img>
          </Button>
          <Button className="category">
            <img id='13'
              className="img_category"
              onMouseDown={mousedown} onMouseUp={mouseup}
              alt=""
              src={Categoryimg13}
            ></img>
            <img id='13'
              className="img_category1"
              onMouseDown={mousedown} onMouseUp={mouseup}
              alt=""
              src={Categorytxt13}
            ></img>
          </Button>
        </Carousel>
      </div>
    </nav>
  );
}

export default connect(
  ({ categoryStatus }: RootState) => ({
    status: categoryStatus.status
  }),
  dispatch => ({
    CategoryAction: bindActionCreators(isCategory, dispatch),
    CategorySetAction: bindActionCreators(setCategory, dispatch)
  })
)(Nav);


//https://www.npmjs.com/package/react-multi-carousel
