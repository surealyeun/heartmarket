import React from "react";
import "./AlarmModal.scss";
import axios from "axios";

interface Props {
    tradeNo: number;
    nickname: string;
    email: string;
    isOpen: boolean;
    close: any;
}

class AlarmModal extends React.Component<Props> {

    state = {
        sendText: "",
        title: ""
    }

    user = JSON.parse(window.sessionStorage.getItem("user") || "{}");

    changeText = (e: any) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = () => {
        if(this.state.title === "") {
            alert("제목을 최소 한 글자 이상 입력해주세요");
            return;
        }
        if(this.state.sendText === ""){
            alert("내용을 최소 한 글자 이상 입력해주세요");
            return;
        }
        axios({
            method: "post",
            url: "http://110.12.73.220:10001/mail/send",
            params: {
                content: this.state.sendText,
                tradeNo: this.props.tradeNo,
                senderMail : this.user.email,
                receiverMail: this.props.email,
                title:this.state.title
            }
        })
            .then(res => {
                this.props.close();
                alert("메시지를 전송했습니다.")
            })
            .catch(error => {
                console.log(error)
                alert("전송에 실패했습니다.");
            });
    }

    closeModal = () => {
        this.setState({
            sendText: "",
            title: ""
        })
        this.props.close();
    }

    render() {
        return (
            <div className="AlarmModal">
                <React.Fragment>
                    {this.props.isOpen ? (
                        <>
                            <div className="Modal-overlay" onClick={this.closeModal} />
                            <div className="Modal">
                                <p className="title">알림 보내기</p>
                                <p className="recieveUser"> To. {this.props.nickname} </p>
                                <div className="content">
                                    
                                    <input name="title" type="text" placeholder="제목을 입력해주세요" value={this.state.title} onChange={e => this.changeText(e)}></input>
                                    <textarea name="sendText" placeholder="전송할 내용을 입력해주세요" value={this.state.sendText} onChange={e => this.changeText(e)}></textarea>
                                </div>
                                <div className="button-wrap">
                                    <button className="btn_send" onClick={this.handleSubmit}> 전송 </button>
                                    <button className="btn_cancel" onClick={this.closeModal}> 취소 </button>
                                </div>
                            </div>
                        </>
                    ) : (
                            ""
                        )}
                </React.Fragment>
            </div>
        );
    }
}

export default AlarmModal;
