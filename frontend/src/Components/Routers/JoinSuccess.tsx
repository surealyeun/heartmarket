import React from 'react';
import {Link} from 'react-router-dom';

function JoinSuccess() {
    return(
        <div className="big">
        <div className="join">
            <h2 className="join-dg">두근 마켓</h2>
            <h1>회원가입 완료</h1>
            <h3>로그인하고 두근 마켓을 시작하세요!</h3>
            <Link to="/login"><button className="btn-joinpage">로그인하러 가기</button></Link>
        </div>
        </div>
    )
}

export default JoinSuccess;