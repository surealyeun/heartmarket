import React, { Component } from "react";
import "./UpdateUser.scss";
import axios from "axios";

class UpdateUser extends Component {
    user = JSON.parse(window.localStorage.getItem("user") || "{}");
    state = {
        profile: ''
    };

    goback = () => {
        // this.props.history.goback();
        window.history.back();
    };

    fileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // console.log(e.target.files);
        if(e.target.files){
            this.setState({
                profile: e.target.files[0]
            })
        }
    };

    changeProfile = () => {
        const file = new FormData();
        // console.log(this.state.profile);
        file.append('profile', this.state.profile);

        axios({
            method: "post",
            url: "http://70.12.246.87:8080/img/upload",
            data: file,
            headers : {
                'Content-Type': 'multipart/form-data'
            }
        }).then(res => {
            alert('upload image');
        }).catch(err => {
            console.log(err);
            alert('upload fail');
        })
    }

    render() {
        // console.log(this.user);
        return (
            <div className="big">
                <div className="updateuser">
                    <h1>프로필 수정</h1>
                    <div className="profile-img-wrapper">
                        <img
                            className="profile-img"
                            alt="profile"
                            src="https://image.flaticon.com/icons/svg/2471/2471392.svg"
                        />
                        <br />
                        {/* <label for="profile-img">이미지 선택</label> */}
                        <input type="file" name="profile" className="profile"
                            onChange={(e) => this.fileChange(e)} />
                        <button type="button" onClick={this.changeProfile}>이미지 변경</button>
                    </div>
                    <br />
                    <br />
                    <div className="section">
                        <h3>닉네임</h3>
                        <p>최대 8글자까지 가능해요</p>
                        <input type="text" className="input-nickname" value={this.user.nickname} />
                        <button className="btn-updatenick">수정하기</button>
                    </div>
                    <div className="section">
                        <h3>우리 동네</h3>
                        <p>적어도 한개의 동네가 등록돼야해요</p>
                        {/* <>
                            <input
                                type="text"
                                className="input-address"
                                value="1"
                            />
                            <input type="button" className="btn-du" value="x"></input>
                            <input type="text" className="input-address" />
                            <input type="button" className="btn-du" value="+"></input>
                        </> */}
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
                    <button className="btn-update" onClick={this.goback}>
                        수정 완료
                    </button>
                </div>
            </div>
        );
    }
}

export default UpdateUser;
