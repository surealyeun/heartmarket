import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import './Join.scss';

class Join extends Component {
    state = {
        email: '',
        sendemail: false,
        cert: '111',
        certValid: false
    }

    inputemail = (email: string) => {
        this.setState({
            email: email
        })
    }

    sendemail = () => {
        this.setState({
            sendemail: true
        });

        window.localStorage.setItem('joinemail', this.state.email);
        // 이메일 보내기 axios 요청, return data : 인증번호 
        // 이메일 redux 저장
    }

    certValidate = (certification: string) => {
        if(certification.match(this.state.cert)){
            this.setState({
                certValid: true
            });
        }else{
            this.setState({
                certValid: false
            });
        }
    }

    handle = (e: React.FormEvent<HTMLFormElement> ) => {
        e.preventDefault();
    }

    render(){
        return(
            <div className="join">
                <h1>회원가입</h1>
                <form onSubmit={this.handle}>
                    <h3>이메일을 입력하고 두근마켓을 시작하세요.</h3>
                    <input type="email" className="email" placeholder="이메일" 
                        onChange={(e) => {this.inputemail(e.target.value)}}/>
                    <button type="button" className="btn-joinpage" onClick={this.sendemail}>이메일로 시작하기</button>
                </form>
                <div className={this.state.sendemail ? 'send' : 'nope'}>
                <br></br>
                <form>
                    <h3>메일을 확인하고 인증번호를 입력해주세요.</h3>
                    <input type="text" className="certification" placeholder="인증 번호" 
                        onChange={(e) => {this.certValidate(e.target.value)}}/>
                    <Link to={{
                        pathname:"/join/detail",
                        state: {joinemail: this.state.email}}}
                    ><button className="btn-joinpage" disabled={!this.state.certValid}>이메일 인증하기</button></Link>
                </form>
                </div>
            </div>
        );
    };
}

export default Join; 