import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

import './Alarm.scss'
import Header from '../common/Header'
import Footer from '../common/Footer'
import TopButton from '../common/TopButton'
import AlarmList from '../alarm/AlarmListItem'
import Nav from '../common/Nav'
import axios from 'axios'

interface Mail {
  mail: any
  sendStatus: false
  deleteAlarm: false
  readAlarm: false
  final_num: number
  //전체 선택 여부 확인 변수
  check: false
  readcheck: string
}

interface TtradeImg {
  imgNo: number
  orgImg: string
}

interface Props {}
class Alarm extends Component {
  state = {
    mail: {
      total: 0,
      data: [
        {
          mailNo: 0,
          title: '',
          content: '',
          sendDate: '',
          sendDel: 0,
          readDel: 0,
          readDate: '',
          trade: {
            tradeNo: 0,
            tradeTitle: '',
            productInfo: '',
            ttradeImg: [{ imgNo: 0, orgImg: '' }]
          },
          sender: {
            userNo: 0,
            email: '',
            nickname: '',
            profileImg: ''
          },
          receiver: {
            userNo: 0,
            email: '',
            nickname: '',
            profileImg: ''
          }
        }
      ]
    },
    //받은 쪽지(false), 보낸 쪽지 (true)
    sendStatus: false,
    final_num: 0,
    //전체 선택 여부 확인 변수
    readcheck: 'notyet'
  }

  user = JSON.parse(window.sessionStorage.getItem('user') || '{}')

  changeRead = (e: any) => {
    //읽은 상태 변경시 체크 상태 변경
    this.setState({
      readcheck: e.target.value
    })
    window.sessionStorage.setItem('readcheck', e.target.value)

    this.callAxios(0)
  }

  changeSendStatus = (e: any) => {
    //보낸 상태 변경시 체크 상태 변경
    this.setState({ check: false })
    //상태에 따른 이미지 업로드 -> axios 호출로 변경
    if (e.target.value === 'false') {
      this.sendStatusFalse()
    } else if (e.target.value === 'true') {
      this.sendStatusTrue()
    }

    this.callAxios(0)
  }

  //세션 스토리지의 값 기본 값 받아오기
  componentDidMount() {
    window.sessionStorage.setItem('searchCategory', '0')
    var read = window.sessionStorage.getItem('readcheck')
    if (window.sessionStorage.getItem('sendStatus') === 'true') {
      this.sendStatusTrue()
    } else {
      this.sendStatusFalse()
    }
    this.setState({
      readcheck: read
    })
    window.sessionStorage.setItem('readcheck', read || 'notyet')

    this.callAxios(0)
  }

  //보낸
  sendStatusTrue = () => {
    this.setState({
      sendStatus: true,
      readcheck: 'all'
    })
    window.sessionStorage.setItem('sendStatus', 'true')
    window.sessionStorage.setItem('readcheck', 'all')
  }

  //받은
  sendStatusFalse = () => {
    this.setState({
      sendStatus: false,
      readcheck: 'notyet'
    })
    window.sessionStorage.setItem('sendStatus', 'false')
    window.sessionStorage.setItem('readcheck', 'notyet')
  }

  //Axois 호출하기
  callAxios = (No: number) => {
    var url = ''
    //받은
    if (window.sessionStorage.getItem('sendStatus') === 'false' || undefined) {
      //안 읽은 전체 읽은
      if (window.sessionStorage.getItem('readcheck') === 'notyet' || undefined) url = '/mail/findAllUnReaded?receiverMail=' + this.user.email
      else if (window.sessionStorage.getItem('readcheck') === 'all') url = '/mail/findAllReceive?receiverMail=' + this.user.email
      else if (window.sessionStorage.getItem('readcheck') === 'read') url = '/mail/findAllReaded?receiverMail=' + this.user.email
    }
    // 보낸 전체
    else {
      url = '/mail/findAllSend?senderMail=' + this.user.email
    }

    axios({
      method: 'get',
      url: 'http://13.125.55.96:8080' + url,
      params: {
        no: No
      }
    })
      .then(res => {
        const mail = res.data
        if (No !== 0 && No < this.state.final_num) No = this.state.final_num - 2

        // // console.log(No)
        this.setState({
          mail,
          final_num: No + 1
        })
      })
      .catch(err => {
        // // console.log("err", err);
      })
  }

  //더 많은 알람 받아오기
  getPlusAlarm = () => {
    window.scrollTo(0, 0)
    this.callAxios(this.state.final_num)
  }

  getMinusAlarm = () => {
    window.scrollTo(0, 0)
    this.callAxios(this.state.final_num - 2)
  }

  render() {
    if (this.user.email === undefined) {
      alert('로그인을 해야 가능한 서비스 입니다.')
      return <Redirect to="/"></Redirect>
    }
    return (
      <>
        <Header></Header>
        <Nav></Nav>
        <div className="Alarm">
          <div className="alarm_haeder">
            <select onChange={this.changeSendStatus} value={this.state.sendStatus + ''}>
              <option value="false">받은 쪽지</option>
              <option value="true">보낸 쪽지</option>
            </select>
            <p className="alarm_text">{this.state.sendStatus !== false ? '보낸 ' : '받은 '}쪽지함</p>
          </div>
          <div className="alarm_check">
            <div className="total_num">총 쪽지 수 ({this.state.mail.total})</div>
            {this.state.sendStatus === false ? (
              <select onChange={this.changeRead} value={this.state.readcheck}>
                <option value="notyet">안읽은 쪽지</option>
                <option value="read">읽은 쪽지</option>
                <option value="all">전체 쪽지</option>
              </select>
            ) : (
              <select onChange={this.changeRead} value={this.state.readcheck}>
                <option value="all">전체 쪽지</option>
              </select>
            )}
          </div>
          <div>
            <hr></hr>
            {this.state.mail.data.map(alarm => (
              <AlarmList key={alarm.mailNo} data={alarm}></AlarmList>
            ))}
          </div>
          {/* 토탈보다 받아온 메일의 수가 적을때만 더보기 표시 */}
          {this.state.final_num !== 1 && (
            <div className="page_btn minus_btn" onClick={this.getMinusAlarm}>
              이전 페이지
            </div>
          )}
          {this.state.mail.total > this.state.final_num * 15 && (
            <div className="page_btn plus_btn" onClick={this.getPlusAlarm}>
              다음 페이지
            </div>
          )}

          <br></br>
          <br></br>
          <br></br>
          <br></br>
        </div>
        <TopButton></TopButton>
        <Footer></Footer>
      </>
    )
  }
}

export default Alarm
