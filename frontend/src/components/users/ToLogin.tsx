import React from 'react';
import {Link} from 'react-router-dom';
import './ToLogin.scss';

class ToLogin extends React.Component {
    render() {
        return (
            <div className="big">
              <div className="my-login">
                <h3>
                  <span>두</span>리번 <span>두</span>리번 <span>근</span>처에
                </h3>
                <Link to="/">
                  <h1>두근 마켓</h1>
                </Link>
                <h3>로그인 후에 이용해주세요.</h3>
                <Link to="/login">
                  <button>로그인</button>
                </Link>
                <Link to="/">
                  <button>main</button>
                </Link>
              </div>
            </div>
        );
    }
}

export default ToLogin;