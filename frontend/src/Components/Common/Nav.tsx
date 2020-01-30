import React, { useState } from "react";
import "./Nav.scss";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Categoryimg1 from "../img/cate1.png";
import Categoryimg2 from "../img/cate2.png";
import Categoryimg3 from "../img/cate3.png";
import Categoryimg4 from "../img/cate4.png";
import Categoryimg5 from "../img/cate5.png";
import Categoryimg6 from "../img/cate6.png";
import Categoryimg7 from "../img/cate7.png";
import Categoryimg8 from "../img/cate8.png";
import Categoryimg9 from "../img/cate9.png";
import Categoryimg10 from "../img/cate10.png";
import Categoryimg11 from "../img/cate11.png";
import Categoryimg12 from "../img/cate12.png";
import Categoryimg13 from "../img/cate13.png";


import Button from "@material-ui/core/Button";

function Nav() {
  //https://felixblog.tistory.com/50

  const responsive = {
    Desktop: {
      breakpoint: { max: 4000, min: 767 },
      items: 10
    },
    mobile: {
      breakpoint: { max: 768, min: 0 },
      items: 8
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
    if(e.clientX === mouse_x && e.clientY === mouse_y){
      alert(e.target.id); //여기서 클릭
    }
  };

  return (
    <nav className="Nav">
      <div className="div">
        <Carousel arrows={false} infinite={false} responsive={responsive}>
          <Button className="category">
            <img id='1'
              className="img_category"
              onMouseDown={mousedown} onMouseUp={mouseup}
              alt=""
              src={Categoryimg1}
            ></img>
          </Button>
          <Button className="category">
            <img id='2'
              className="img_category"
              onMouseDown={mousedown} onMouseUp={mouseup}
              alt=""
              src={Categoryimg2}
            ></img>
          </Button>
          <Button className="category">
            <img id='3'
              className="img_category"
              onMouseDown={mousedown} onMouseUp={mouseup}
              alt=""
              src={Categoryimg3}
            ></img>
          </Button>
          <Button className="category">
            <img id='4'
              className="img_category"
              onMouseDown={mousedown} onMouseUp={mouseup}
              alt=""
              src={Categoryimg4}
            ></img>
          </Button>
          <Button className="category">
            <img id='5'
              className="img_category"
              onMouseDown={mousedown} onMouseUp={mouseup}
              alt=""
              src={Categoryimg5}
            ></img>
          </Button>
          <Button className="category">
            <img id='6'
              className="img_category"
              onMouseDown={mousedown} onMouseUp={mouseup}
              alt=""
              src={Categoryimg6}
            ></img>
          </Button>
          <Button className="category">
            <img id='7'
              className="img_category"
              onMouseDown={mousedown} onMouseUp={mouseup}
              alt=""
              src={Categoryimg7}
            ></img>
          </Button>
          <Button className="category">
            <img id='8'
              className="img_category"
              onMouseDown={mousedown} onMouseUp={mouseup}
              alt=""
              src={Categoryimg8}
            ></img>
          </Button>
          <Button className="category">
            <img id='9'
              className="img_category"
              onMouseDown={mousedown} onMouseUp={mouseup}
              alt=""
              src={Categoryimg9}
            ></img>
          </Button>
          <Button className="category">
            <img id='10'
              className="img_category"
              onMouseDown={mousedown} onMouseUp={mouseup}
              alt=""
              src={Categoryimg10}
            ></img>
          </Button>
          <Button className="category">
            <img id='11'
              className="img_category"
              onMouseDown={mousedown} onMouseUp={mouseup}
              alt=""
              src={Categoryimg11}
            ></img>
          </Button>
          <Button className="category">
            <img id='12'
              className="img_category"
              onMouseDown={mousedown} onMouseUp={mouseup}
              alt=""
              src={Categoryimg12}
            ></img>
          </Button>
          <Button className="category">
            <img id='13'
              className="img_category"
              onMouseDown={mousedown} onMouseUp={mouseup}
              alt=""
              src={Categoryimg13}
            ></img>
          </Button>
        </Carousel>
      </div>
    </nav>
  );
}

export default Nav;

//https://www.npmjs.com/package/react-multi-carousel
