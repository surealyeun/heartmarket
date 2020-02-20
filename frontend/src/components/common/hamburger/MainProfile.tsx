import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import './MainProfile.scss'
import { isLog } from '../../../modules/user'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { RootState } from '../../../modules'

interface Props {
  status: string | null
  UserAction: typeof isLog
}

class MainProfile extends Component<Props> {
  state = {
    islog: false,
    logout: false
  }

  //로그인 되어 있는지 확인
  constructor(props: any) {
    super(props)

    this.state = {
      ...this.state,
      islog: window.sessionStorage.getItem('log') === 'true' ? true : false
    }
  }

  logout = () => {
    const { UserAction } = this.props
    window.sessionStorage.clear()
    window.sessionStorage.setItem('searchCategory', '0')
    UserAction()
    this.setState({
      islog: false,
      logout: true
    })
  }

  user = JSON.parse(window.sessionStorage.getItem('user') || '{}')

  render() {
    const { islog } = this.state
    if (this.state.logout === true) {
      this.setState({
        logout: false
      })
      return <Redirect to="/"></Redirect>
    }

    return (
      <div className="Main_Profile">
        {!islog ? (
          <>
            <p className="profile_infotext">로그인이 필요한 서비스 입니다.</p>
            <Link to={{ pathname: '/login' }}>
              <div className="profile_infotext profile_login">로그인</div>
            </Link>
            <Link to={{ pathname: '/join' }}>
              <div className="profile_infotext profile_signup">회원가입</div>
            </Link>
          </>
        ) : (
          <>
            <img className="profile_img" alt="프로필 이미지" src={this.user.profileImg}></img>
            <p className="profile_name">{this.user.nickname}</p>
            <p className="profile_number">#{this.user.userNo}</p>
            <Link to={{ pathname: '/Mypage' }}>
              <p className="profile_edit">마이페이지</p>
            </Link>
            <p className="profile_logout" onClick={this.logout}>
              로그아웃
            </p>
          </>
        )}
      </div>
    )
  }
}

export default connect(
  ({ userStatus }: RootState) => ({
    status: userStatus.status
  }),
  dispatch => ({
    UserAction: bindActionCreators(isLog, dispatch)
  })
)(MainProfile)
