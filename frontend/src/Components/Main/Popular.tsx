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
  cno:number;
}

function Popular() {
  const [items, setItems] = useState(Array<PostItem>());
  //axios 호출
  useEffect(() => {
    var user = JSON.parse(window.sessionStorage.getItem("user") || "{}");
    if (user.email) {
      axios({
        method: "get",
        url: "http://13.125.55.96:8080/trade/search/area",
        params: {
          email: user.email,
          no: 0
        }
      })
        .then(res => {
          setItems(res.data.data);
        })
        .catch(err => {
          //console.log(err);
          //alert("심쿵 상품으로 추가되지 않았습니다.");
        });
    } else {
      axios({
        method: "get",
        url: "http://13.125.55.96:8080/trade/search",
        params: {
          no: 0
        }
      })
        .then(res => {
          //alert("logout");
          setItems(res.data.data);
        })
        .catch(err => {
          console.log(err);
          alert("심쿵 상품으로 추가되지 않았습니다.");
        });
    }
  }, []);

  return (
    <div className="famous">
      <h4 className="famous_text">두근 마켓 인기 매물</h4>
      <div className="famous_bundle">
        {items.map(item => (
          <Item
          key={item.tradeNo} 
          {...item}></Item>
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
