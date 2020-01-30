import React from 'react';
import {Link} from 'react-router-dom';

function JoinSuccess() {
    return(
        <div>
            <h1>회원가입 완료</h1>
            <Link to="/login"><button>로그인하러 가기</button></Link>
        </div>
    )
}

export default JoinSuccess;