import React from "react";
import "./Footer.scss";
import Logo from "../img/두근마켓3.png";

function Footer() {
  return (
    <footer className="Footer">
      <div className="text_footer">
          <div>
          <img className="sns" alt="두근마켓" src="https://image.flaticon.com/icons/svg/2111/2111463.svg"></img>
          <img className="sns" alt="두근마켓" src="https://image.flaticon.com/icons/svg/1384/1384053.svg"></img>
        <img className="sns" alt="두근마켓" src="https://image.flaticon.com/icons/svg/733/733579.svg"></img>
        </div>
    <p>위 사이트는 학습용으로 제작된 페이지입니다</p>
        <p>해당 사이트는 당근마켓을 참조하고 데이터는 자체 제작했습니다.</p>
        <p>Frontend : 송다은 이현빈 한수연 | Backend : 이민우 이학진</p>
        <br></br>
        <img className="footer_logo" alt="두근마켓" src={Logo}></img>
      </div>
    </footer>
  );
}

export default Footer;

//https://react-component.github.io/footer/?selectedKind=rc-footer&selectedStory=readMe&full=0&addons=1&stories=1&panelRight=0&addonPanel=storybook%2Factions%2Factions-panel
