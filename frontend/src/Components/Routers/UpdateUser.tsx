import React, { Component } from "react";
import "./UpdateUser.scss";

class UpdateUser extends Component {
    user = JSON.parse(window.localStorage.getItem("user") || "{}");

    componentDidMount() {
        console.log(this.props);
    }

    goback = () => {
        // this.props.history.goback();
    };

    render() {
        // console.log(this.user);
        return (
            <div className="updateuser">
                <h1>프로필 변경</h1>
                <div className="profile-img-wrapper">
                    <img
                        className="profile-img"
                        alt="profile"
                        src="https://image.flaticon.com/icons/svg/2471/2471392.svg"
                    ></img>
                    <br />
                    {/* <label for="profile-img">이미지 선택</label> */}
                    <input type="file" className="profile-img" />
                    {/* <button>이미지 변경</button> */}
                </div>
                <br/>
                <br/>
                <div className='section'>
                    <h3>닉네임</h3>
                    <p>최대 8글자까지 가능해요</p>
                    <input type="text" className="input-nickname" value={this.user.nickname} />
                    <button className="btn-updatenick">수정하기</button>
                </div>
                <div className='section'>
                    <h3>우리 동네</h3>
                    <p>적어도 한개의 동네가 등록돼야해요</p>
                    {/* {this.user.uarea.length === 1 ? (
                        <>
                            <input
                                type="text"
                                className="input-address"
                                value={this.user.uarea[0].address}
                            />
                            <input type="button" className="btn-du" value="x"></input>
                            <input type="text" className="input-address" />
                            <input type="button" className="btn-du" value="+"></input>
                        </>
                    ) : (
                        <>
                            <input
                                type="text"
                                className="input-address"
                                value={this.user.uarea[0].address}
                            />
                            <input type="button" className="btn-du" value="x"></input>
                            <input
                                type="text"
                                className="input-address"
                                value={this.user.uarea[1].address}
                            />
                            <input type="button" className="btn-du" value="x"></input>
                        </>
                    )} */}
                </div>
                {/* 마이페이지로 돌아가도록 */}
                <button className="btn-update" onClick={this.goback}>수정 완료</button>
            </div>
        );
    }
}

export default UpdateUser;
