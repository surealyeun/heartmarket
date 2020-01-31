import React from "react";
import "./Main.scss";

import "react-multi-carousel/lib/styles.css";

import Header from "../Common/Header";
import Nav from "../Common/Nav";
import PenButton from "../Common/PenButton";
import Footer from "../Common/Footer";
import Hamburger from "../Common/Hamburger";
import Ganji from "../Main/Ganji";
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
              <div className="div_famous"></div>
              <div className="div_famous"></div>
              <div className="div_famous"></div>
              <div className="div_famous"></div>
            </div>
            <div className="famous_bundle">
              <div className="div_famous"></div>
              <div className="div_famous"></div>
              <div className="div_famous"></div>
              <div className="div_famous"></div>
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
