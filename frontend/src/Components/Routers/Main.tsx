import React from "react";
import "./Main.scss";

import "react-multi-carousel/lib/styles.css";

import Header from "../Common/Header";
import Nav from "../Common/Nav";
import PenButton from "../Common/PenButton";
import Footer from "../Common/Footer";
import Hamburger from "../Common/Hamburger";
import Ganji from "../Main/Ganji";
import Famous from "../Main/Famous";
import { makeStyles } from "@material-ui/core/styles";


function Main() {

  const useStyles = makeStyles(theme => ({
    root: {
      display: "flex",
      flexDirection: "column",
      minHeight: "70vh"
    }
  }));

  const classes = useStyles();
  const sales = [
    {
      id:1,
      img : "https://dnvefa72aowie.cloudfront.net/origin/article/202001/142e5f439d6d5e28a381afea8ff31c8f065dfc28d44c7c0b1281f2d132b36f26.webp?q=82&s=300x300&t=crop",
      title : "포트메리온 그릇 20종 미사용",
      address : "의왕시",
      money : "200,000"
    },
    {
      id:2,
      img : "https://dnvefa72aowie.cloudfront.net/origin/article/202001/3f16c38757e982a14216589bb673fb756d1921ec9378767e91b24e6ae09099c3.webp?q=95&s=1440x1440&t=inside",
      title : "엔탁 테이블 의자 세트",
      address : "상무2동",
      money : "150,000"
    },
    {
      id:3,
      img : "https://dnvefa72aowie.cloudfront.net/origin/article/202001/fbf804d90fedc4631379cb9d6a53f1ed43ad30093cdaeb7e5afbe536d9bc5b38.webp?q=95&s=1440x1440&t=inside",
      title : "바비숑ㆍ강아지가방",
      address : "서초동",
      money : "25,000"
    },
    {
      id:4,
      img : "https://dnvefa72aowie.cloudfront.net/origin/article/202001/ed4fd1ddd63ce0015f1eb5d6fc98a7a49878f5a4c9f1ac0be19a27eb6712e535.webp?q=95&s=1440x1440&t=inside",
      title : "아일랜드 식탁 가져가실분",
      address : "작전2동",
      money : "무료나눔"
    },
    {
      id:5,
      img : "https://dnvefa72aowie.cloudfront.net/origin/article/202001/b3002f5afe4e9aaa28089b1fbff9847f36cce89ad88925185b8361d389ea8ca0.webp?q=95&s=1440x1440&t=inside",
      title : "에어팟 뜨개 케이스",
      address : "송내1동",
      money : "5,000"
    },
    {
      id:6,
      img : "https://dnvefa72aowie.cloudfront.net/origin/article/202001/0C07322437CA9D321674BB070A2ABD144EF1AFAE70B61AE2E5D33217D9B1B997.jpg?q=95&s=1440x1440&t=inside",
      title : "머니건",
      address : "풍납 1동",
      money : "8,000"
    },
    {
      id:7,
      img : "https://dnvefa72aowie.cloudfront.net/origin/article/202001/75CFFBFEBFA479F799558B13849DB99C6C4C84BDEC8768505689FC921E2FFE31.jpg?q=95&s=1440x1440&t=inside",
      title : "톰톰 유아&어린이 자전거",
      address : "용전동",
      money : "100,000"
    },
    {
      id:8,
      img : "https://dnvefa72aowie.cloudfront.net/origin/article/202001/1EDB5A7A470DB841AD037D13F68E841369E9C88B3A877ABD376D533361A444F0.jpg?q=95&s=1440x1440&t=inside",
      title : "아이폰11pro 케이스",
      address : "동구동",
      money : "15,000"
    }
  ]

  return (
    <>
      <Header></Header>
      <Nav></Nav>
      <div className={classes.root}>
      <div className="Main">
        <Ganji></Ganji>
        <div className="famous">
          <h4 className="famous_text">두근 마켓 인기 매물</h4>
          <div className="famous_bundle">
            {sales.map(sale => (<Famous key={sale.id} img={sale.img} title={sale.title} address={sale.address} money={sale.money}></Famous>))}
          </div>
        </div>
      </div>
      </div>
      <Hamburger></Hamburger>
      <PenButton></PenButton>
      <Footer></Footer>
    </>
  );
}

export default Main;
