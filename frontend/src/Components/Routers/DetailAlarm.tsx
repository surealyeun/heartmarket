import React, { useState } from "react";

import Header from "../Common/Header";
import Nav from "../Common/Nav";
import Footer from "../Common/Footer";

function DetailAlarm() {
  return (
    <>
      <Header></Header>
      <Nav></Nav>
      <div className="DetailAlarm">
        <h1>보낸 사람</h1>
        <h1>받는 사람</h1>
      </div>
      <Footer></Footer>
    </>
  );
}

export default DetailAlarm;
