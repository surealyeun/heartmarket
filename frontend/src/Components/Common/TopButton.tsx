import React, { Component } from "react";
import "./TopButton.scss";

//https://velog.io/@killi8n/Dnote-6-1.-React-%EB%AC%B4%ED%95%9C-%EC%8A%A4%ED%81%AC%EB%A1%A4%EB%A7%81-%EA%B8%B0%EB%8A%A5-%EA%B5%AC%ED%98%84.-79jmep7xes
class TopButton extends Component {

    state = {
        scrollActive: false 
    };

    constructor(props:any){
        super(props);
        this.setState({
            scrollActive:false
        });
    }

  componentDidMount() {
    // 스크롤링 이벤트 추가
    window.addEventListener("scroll", this.handleScroll);
  }

  componentWillUnmount() {
    // 언마운트 될때에, 스크롤링 이벤트 제거
    window.removeEventListener("scroll", this.handleScroll);
  }

  handleScroll = () => {
    //const { innerHeight } = window;
    //const { scrollHeight } = document.body;
    // IE에서는 document.documentElement 를 사용.
    const scrollTop =
      (document.documentElement && document.documentElement.scrollTop) ||
      document.body.scrollTop;
    // 스크롤링 했을때, 브라우저의 가장 밑에서 100정도 높이가 남았을때에 실행하기위함.
    //if (scrollHeight - innerHeight - scrollTop < 100) {}
    if(scrollTop > 80) {
        //alert(scrollTop);
        this.setState({
            scrollActive : true
        });
    }
    else {
        this.setState({
            scrollActive : false
        });
    }
  };

  render() {
    const scrolltoTop = () => {
      //alert(window.scrollY); alert(window.pageYOffset);
      window.scrollTo(0, 0);
    };
    const {scrollActive} = this.state;

    return (
      <div className="TopButton">
          {!scrollActive ? "" : (<div onClick={scrolltoTop}>
          <img
            className="img_button"
            alt=""
            src="https://image.flaticon.com/icons/svg/892/892682.svg"
          ></img>
        </div>)}
        
      </div>
    );
  }
}

export default TopButton;
