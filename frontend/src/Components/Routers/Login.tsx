import React, { Component } from "react";
import { Link } from "react-router-dom";

import "./Login.scss";

class Login extends Component {
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
            islog: window.localStorage.getItem("log") === "true" ? true : false
        };
        console.log(window.localStorage.getItem("log"));
    }

    handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        window.localStorage.setItem("useremail", this.state.email);
        window.localStorage.setItem("userpw", this.state.password);
        window.localStorage.setItem("log", "true");
        console.log(window.localStorage.getItem("useremail"));
        this.setState({
            islog: true
        });
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
        window.localStorage.clear();
        this.setState({
            islog: false
        });
    };

    render() {
        return (
            <div className="login">
                <h3><span>근</span>처를 <span>두</span>리번 <span>두</span>리번</h3>
                <h1>두근 마켓</h1>
                <h2 className={this.state.islog ? "" : "log"}>
                    {window.localStorage.getItem("useremail")}님<br/>안녕하세요.
                </h2>
                <div className={this.state.islog ? "" : "log"}>
                  <button onClick={this.logout}>
                      로그아웃
                  </button>
                  <Link to="/mypage"><button>my page</button></Link>

                </div>
                <form className={this.state.islog ? "log" : ""} onSubmit={this.handleSubmit}>
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
                    <button className="btn-login">로그인</button>
                    <Link to="/join">
                        <button className="btn-join">회원가입</button>
                    </Link>
                </form>
            </div>
        );
    }
}

export default Login;
