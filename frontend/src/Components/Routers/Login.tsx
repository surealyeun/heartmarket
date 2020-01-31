import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';

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
    }

    handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        if(this.state.email && this.state.password){
            
            axios({
                method: 'get',
                url: 'http://70.12.247.48:8080/login',
                params: {
                    email: this.state.email,
                    password: this.state.password
                }
            }).then(res => {
                // console.log(res.data);
                window.localStorage.setItem("useremail", this.state.email);
                window.localStorage.setItem("userpw", this.state.password);
                window.localStorage.setItem("log", "true");
                this.setState({
                    islog: true
                });    
            }).catch(error => {
                // console.log(error);
                this.setState({
                    islog: false
                });
                alert('아이디와 비밀번호를 확인해주세요.');
            })
            e.preventDefault();
        }else{
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
        window.localStorage.clear();
        this.setState({
            islog: false
        });
    };

    render() {
        return (
            <div className="login">
                <h3><span>두</span>리번 <span>두</span>리번 <span>근</span>처에</h3>
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
                    <button type="submit" className="btn-login">로그인</button>
                    <Link to="/join">
                        <button className="btn-join">회원가입</button>
                    </Link>
                </form>
            </div>
        );
    }
}

export default Login;
