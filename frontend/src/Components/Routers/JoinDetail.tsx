import React, {Component} from 'react';

class JoinDetail extends Component {
    state = {
        isnnValid: false
    }
    
    nicknameValid = (nickname: string) => {
        if(nickname.length < 9){
            this.setState({
              isnnValid: true  
            })
        }else{
            this.setState({
                isnnValid: false
            })
        }
    }

    handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        if(!this.state.isnnValid){
            e.preventDefault();
        }
    }

    render(){
        return(
            <div>
                <h1>회원가입</h1>
                <h3>기본 회원정보를 입력하세요.</h3>
                <form onSubmit={this.handleSubmit}>
                    <input type="string" className="nickname" placeholder="닉네임 최대 8글자" 
                        onChange={(e) => this.nicknameValid(e.target.value)} required/> <br/>
                    <input type="email" className="email" value="" placeholder="email" disabled/> <br/>
                    <input type="password" className="password" placeholder="비밀번호" required/><br/>
                    <input type="string" className="address" placeholder="주소(예시: 역삼동)" /><br/>
                    <button>회원가입</button>
                </form>
            </div>
        );
    }
}

export default JoinDetail;