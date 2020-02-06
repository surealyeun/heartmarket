import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import "./Join.scss";

class Join extends Component {
    state = {
        email: "",
        isSendemail: false,
        isNew: false,
        cert: "111",
        certValid: false
    };

    inputemail = (email: string) => {
        this.setState({
            email: email,
            isNew: false
        });
    };

    sendemail = () => {
        axios({
            method: "get",
            url: "http://13.125.55.96:8080/user/"+this.state.email,
            // params: {
            //     email: this.state.email
            // }
        })
            .then(res => {
                if(res.data.state === 'Fail'){
                    this.setState({
                        isNew: true,
                        isSendemail: false
                    })
                }else{
                    this.setState({
                        isSendemail: true
                    });
    
                    axios({
                        method: "get",
                        url: "http://13.125.55.96:8080/user/mail",
                        params: {
                            email: this.state.email
                        }
                    })
                        .then(res => {
                            console.log(res.data.data);
                            this.setState({
                                isSendemail: true,
                                cert: res.data.data
                            });
                        })
                        .catch(err => {
                            alert("인증메일 전송에 실패했습니다. 이메일을 확인해주세요.");
                        });
                }

            })
            .catch(err => {
               
            });

        // 이메일 보내기 axios 요청, return data : 인증번호
        // 이메일 redux 저장 -> props로 전달
    };

    keysendmail = (e: React.KeyboardEvent<HTMLButtonElement>) => {
        if (e.key === 'Enter') {
            this.sendemail();
          }
    }

    certValidate = (certification: string) => {
        if (this.state.cert == certification) {
            this.setState({
                certValid: true
            });
        } else {
            this.setState({
                certValid: false
            });
        }
    };

    render() {
        return (
            <div className="big">
                <div className="join">
                    <h1>회원가입</h1>
                    <div>
                        <h3>이메일을 입력하고 두근마켓을 시작하세요.</h3>
                        {this.state.isNew ? <p>이미 가입된 이메일입니다.</p> : <></>}
                        <input
                            type="email"
                            className="email"
                            placeholder="이메일"
                            onChange={e => {
                                this.inputemail(e.target.value);
                            }}
                        />
                        <button type="button" className="btn-joinpage" onClick={this.sendemail}
                            onKeyPress={this.keysendmail}>
                            이메일로 시작하기
                        </button>
                    </div>
                    {this.state.isSendemail ? (
                        <div>
                            <br></br>
                            <form>
                                <h3>메일을 확인하고 인증번호를 입력해주세요.</h3>
                                <input
                                    type="text"
                                    className="certification"
                                    placeholder="인증 번호"
                                    onChange={e => {
                                        this.certValidate(e.target.value);
                                    }}
                                />
                                <Link
                                    to={{
                                        pathname: "/join/detail",
                                        state: { joinemail: this.state.email }
                                    }}
                                >
                                    <button
                                        type="button"
                                        className="btn-joinpage"
                                        disabled={!this.state.certValid}
                                    >
                                        이메일 인증하기
                                    </button>
                                </Link>
                            </form>
                        </div>
                    ) : (
                        <div></div>
                    )}
                </div>
            </div>
        );
    }
}

export default Join;
