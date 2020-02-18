import React, { useEffect, useState } from "react";
import axios from "axios";
import Item from "../common/Item";

interface PostItem {
  tradeNo: number;
  tlist: null;
  unicname: string;
  pprice: string;
  ttitle: string;
  tarea: string;
  uno: number;
  uimg: string;
  cno: number;
  category:string;
}

function Popular() {
  const [items, setItems] = useState(Array<PostItem>());
  //axios 호출
  useEffect(() => {
    var user = JSON.parse(window.sessionStorage.getItem("user") || "{}");
    var email = "none";
    if(user.email !== undefined) email = user.email;

    axios({
      method: "get",
      url: "http://13.125.55.96:8080/trade/popular",
      params: {
        email: email,
      }
    })
      .then(res => {
        //alert("login");
        setItems(res.data.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  return (
    <div className="famous">
      <h4 className="famous_text">두근 마켓 인기 매물</h4>
      <div className="famous_bundle">
        {items.map(item => (
          <Item key={item.tradeNo} {...item}></Item>
        ))}
        {/* {sales.map(sale => (
                <Famous
                  key={sale.id}
                  id={sale.id}
                  img={sale.img}
                  title={sale.title}
                  address={sale.address}
                  money={sale.money}
                ></Famous>
              ))} */}
      </div>
    </div>
  );
}

export default Popular;
