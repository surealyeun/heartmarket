import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

class JoinDetail extends Component {
    state = {
        email: "",
        isnnValid: false,
        nickname: "",
        password: "",
        address: "",
        confirm: false
    };

    constructor(props: any) {
        super(props);
        this.state = {
            ...this.state,
            isnnValid: false,
            email: props.history.location.state.joinemail
            // email: window.sessionStorage.getItem('joinemail')
        };
    }

    nicknameValid = (nickname: string) => {
        if (nickname.length < 9) {
            this.setState({
                isnnValid: true,
                nickname: nickname
            });
        } else {
            this.setState({
                isnnValid: false
            });
        }

        if (this.state.isnnValid && this.state.password && this.state.address) {
            this.setState({
                confirm: true
            });
        }
    };

    handlePW = (password: string) => {
        this.setState({
            password: password
        });
        if (this.state.isnnValid && this.state.password && this.state.address) {
            this.setState({
                confirm: true
            });
        }
    };

    handleaddress = (address: string) => {
        this.setState({
            address: address
        });
        if (this.state.isnnValid && this.state.password && this.state.address) {
            this.setState({
                confirm: true
            });
        }
    };

    handleOnClick = () => {
        axios({
            method: "post",
            url: "http://13.125.55.96:8080/user/signUp",
            params: {
                address: this.state.address,
                email: this.state.email,
                nickname: this.state.nickname,
                password: this.state.password,
                
            }
        })
            .then(res => {
                console.log("res", res.data);
            })
            .catch(err => {
                console.log("err", err);
                alert("회원가입에 문제가 생겼습니다. 다시 시도해주세요.");
            });
    };

    render() {
        return (
            <div className="big">
            <div className="join-detail">
                <h1>회원가입</h1>
                <h3>기본 회원정보를 입력하세요.</h3>
                <br />
                <form>
                    <input
                        type="text"
                        className="nickname"
                        placeholder="닉네임 최대 8글자"
                        onChange={e => this.nicknameValid(e.target.value)}
                        required
                    />{" "}
                    <br />
                    <input
                        type="email"
                        className="email"
                        value={this.state.email}
                        placeholder="email"
                        disabled
                    />
                    <br />
                    <input
                        type="password"
                        className="password"
                        placeholder="비밀번호"
                        required
                        onChange={e => this.handlePW(e.target.value)}
                    />
                    <br />
                    <input
                        type="text"
                        className="address"
                        placeholder="주소(예시: 역삼동)"
                        onChange={e => this.handleaddress(e.target.value)}
                    />
                    <br />
                    <Link to="/joinsuc">
                        <button
                            type="button"
                            className="btn-joinpage"
                            disabled={!this.state.confirm}
                            onClick={this.handleOnClick}
                        >
                            회원가입
                        </button>
                    </Link>
                </form>
            </div>
            </div>
        );
    }
}

export default JoinDetail;
