import React from "react";
import "./Main.scss";

import "react-multi-carousel/lib/styles.css";

import Header from "../common/Header";
import Nav from "../common/Nav";
import PenButton from "../common/PenButton";
import TopButton from "../common/TopButton";
import Footer from "../common/Footer";
import Ganji from "../main/Ganji";
import Popular from "../main/Popular"
import { makeStyles } from "@material-ui/core/styles";
import SessionDelete from "../common/SessionDelete";

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
      <SessionDelete></SessionDelete>
      <div className="Main">
        <div className={classes.root}>
          <Ganji></Ganji>
          <Popular></Popular>
        </div>
        <PenButton></PenButton>
        <TopButton></TopButton>
      </div>
      <Footer></Footer>
    </>
  );
}

export default Main;