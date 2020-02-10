import React, { useState } from "react";
import "./HamZzim.scss";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

function HamZzim() {
  //https://felixblog.tistory.com/50

  const responsive = {
    ALL: {
      breakpoint: { max: 4000, min: 0 },
      items: 2
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
      alert(e.target.id); //여기서 클릭
      console.log(e.target);
    }
  };

  return (
    <nav className="HamZzim">
      <p className="zzim_title">심쿵목록</p>
      <p className="zzim_plus">더보기</p>
      <div className="div_Zzim">
        <Carousel arrows={false} infinite={false} responsive={responsive}>
          <div className="zzim_item">
            <img
              id="ff"
              className="img_zzim"
              onMouseDown={mousedown}
              onMouseUp={mouseup}
              alt=""
              src="https://dnvefa72aowie.cloudfront.net/origin/article/202001/3f16c38757e982a14216589bb673fb756d1921ec9378767e91b24e6ae09099c3.webp?q=95&s=1440x1440&t=inside"
            ></img>
            <p id="ff" onMouseDown={mousedown}
              onMouseUp={mouseup} className="zzim_price">10,000,000,000원</p>
            <p id="ff" className="zzim_itemtitle">이영애가 극찬한 영화 CD</p> 
          </div>
          <div className="zzim_item">
            <img
              id="ff"
              className="img_zzim"
              onMouseDown={mousedown}
              onMouseUp={mouseup}
              alt=""
              src="https://dnvefa72aowie.cloudfront.net/origin/article/202001/3f16c38757e982a14216589bb673fb756d1921ec9378767e91b24e6ae09099c3.webp?q=95&s=1440x1440&t=inside"
            ></img>
            <p id="ff" onMouseDown={mousedown}
              onMouseUp={mouseup} className="zzim_price">10,000,000,000원</p>
            <p id="ff" className="zzim_itemtitle">이영애가 극찬한 영화 CD</p> 
          </div>
          <div className="zzim_item">
            <img
              id="ff"
              className="img_zzim"
              onMouseDown={mousedown}
              onMouseUp={mouseup}
              alt=""
              src="https://dnvefa72aowie.cloudfront.net/origin/article/202001/3f16c38757e982a14216589bb673fb756d1921ec9378767e91b24e6ae09099c3.webp?q=95&s=1440x1440&t=inside"
            ></img>
            <p id="ff" onMouseDown={mousedown}
              onMouseUp={mouseup} className="zzim_price">10,000,000,000원</p>
            <p id="ff" className="zzim_itemtitle">이영애가 극찬한 영화 CD</p> 
          </div>
        </Carousel>
      </div>
    </nav>
  );
}

export default HamZzim;

//https://www.npmjs.com/package/react-multi-carousel
