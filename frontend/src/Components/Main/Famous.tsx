import React from "react";
import "./Famous.scss";

interface sale {
    key:number;
    img:string;
    title:string;
    money:string;
    address:string;
}

function Famous({key,img,title,money,address}:sale) {
  return (
    <div className="Famous">
      <div className="div_famous">
        <img
          className="img_famous"
          alt=""
          src={img}
        ></img>
        <div className="p_famous">
          <p className="title_famous">{title}</p>
          <p className="money_famous">#{money}원</p>
          <p className="address_famous">#{address}</p>
        </div>
      </div>
    </div>
  );
}

export default Famous;
