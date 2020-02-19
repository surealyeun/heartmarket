import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import "./Login.scss";
import { isLog } from "../../modules/user";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { RootState } from "../../modules";
import SessionDelete from "../common/SessionDelete";

interface Props {
  status: string | null;
  UserAction: typeof isLog;
}

class Login extends Component<Props> {
  state = {
    email: "",
    password: "",
    islog: false
  };

  constructor(props: any) {
    super(props);

    this.state = {
      email: "",
      password: "",
      islog: window.sessionStorage.getItem("log") === "true" ? true : false
    };
  }

  handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    if (this.state.email && this.state.password) {
      axios({
        method: "get",
        url: "http://13.125.55.96:8080/user/login",
        params: {
          email: this.state.email,
          password: this.state.password
        }
      })
        .then(res => {
          console.log(res.data.data);
          console.log(res.data.token);
          window.sessionStorage.setItem("user", JSON.stringify(res.data.data.tuser));
          window.sessionStorage.setItem("usernickname", res.data.data.tuser.nickname);
          window.sessionStorage.setItem("userHG", res.data.data.heartguage);
          window.sessionStorage.setItem("userJWT", res.data.token);
          window.sessionStorage.setItem("log", "true");
          this.setState({
            islog: true
          });
          this.props.UserAction();
        })
        .catch(error => {
          // console.log(error);
          this.setState({
            islog: false
          });
          alert("아이디와 비밀번호를 확인해주세요.");
        });
      e.preventDefault();
    } else {
      e.preventDefault();
    }
  };

  handleEmail = (email: string) => {
    this.setState({
      email: email
    });
  };

  handlePW = (pw: string) => {
    this.setState({
      password: pw
    });
  };

  logout = () => {
    window.sessionStorage.clear();
    this.setState({
      islog: false
    });
  };

  render() {
    return (
      <div className="big">
        <SessionDelete></SessionDelete>
        <div className="login">
          <h3>
            <span>두</span>리번 <span>두</span>리번 <span>근</span>처에
          </h3>
            <h1>
          <Link to="/">
              두근 마켓
          </Link>
              </h1>
          {this.state.islog ? (
            <div>
              <h2>
                {sessionStorage.getItem("usernickname")}님<br />
                안녕하세요.
              </h2>
              <br/>
              <div className="after-login">
                <Link to="/">
                  <button>main</button>
                </Link>
                <br />
                <Link to="/mypage">
                  <button>my page</button>
                </Link>
                <br />
                <button onClick={this.logout}>로그아웃</button>
              </div>
            </div>
          ) : (
            <form onSubmit={this.handleSubmit}>
              <input
                type="email"
                className="email"
                placeholder="이메일을 입력하세요"
                onChange={e => this.handleEmail(e.target.value)}
              ></input>
              <br></br>
              <input
                type="password"
                className="password"
                placeholder="비밀번호를 입력하세요"
                onChange={e => this.handlePW(e.target.value)}
              ></input>
              <br></br>
              <button type="submit" className="btn-login">
                로그인
              </button>
              <Link to="/join">
                <button className="btn-join">회원가입</button>
              </Link>
            </form>
          )}
        </div>
      </div>
    );
  }
}

export default connect(
  ({ userStatus }: RootState) => ({
    status: userStatus.status
  }),
  dispatch => ({
    UserAction: bindActionCreators(isLog, dispatch)
  })
)(Login);
