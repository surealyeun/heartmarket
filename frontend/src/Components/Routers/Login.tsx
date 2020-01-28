import React from 'react';
import {Link} from 'react-router-dom';

function Login() {
    return(
        <div>
            <h1>로그인</h1>
            <form>
                <input type="text" className="id" placeholder="..." ></input><br></br>
                <input type="password" className="password" placeholder="비밀번호를 입력하세요"></input><br></br>
                <button>로그인하기</button>
                <button><Link to="/signup">회원가입하기</Link></button>
            </form>
        </div>
    );    
}

export default Login;