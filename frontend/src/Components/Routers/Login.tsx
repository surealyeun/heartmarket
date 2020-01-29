import React from 'react';
import {Link} from 'react-router-dom';

function Login() {
    return(
        <div>
            <h1>로그인</h1>
            <form>
                <input type="email" className="email" placeholder="이메일을 입력하세요" ></input><br></br>
                <input type="password" className="password" placeholder="비밀번호를 입력하세요"></input><br></br>
                <button>로그인하기</button>
                <Link to="/join"><button>회원가입하기</button></Link>
            </form>
        </div>
    );    
}

export default Login;