import React from "react";
import axios from 'axios';
import "./MannerModal.scss";

interface Props {
    isOpen: boolean;
    close: any;
    userNo: number;
    tradeNo: number;
}

class MannerModal extends React.Component<Props> {
    state = {
        rate: '',
        val: 0,
        isRate: false
    }

    good = () => {
        console.log('modal userno',this.props.userNo);
        console.log('modal tradeno',this.props.tradeNo);

        this.setState({
            rate: '좋았어요',
            val: 3,
            isRate: true
        })
    }
    soso = () => {
        this.setState({
            rate: '보통이에요',
            val: 0,
            isRate: true
        })
    }
    bad = () => {
        this.setState({
            rate: '별로예요',
            val: -3,
            isRate: true
        })
    }

    rating = () => {
        // isRate === true 때 axios 평가 추가
        console.log('modal userno',this.props.userNo);

        if(this.state.isRate){
            axios({
                method: "post",
                url: "http://13.125.55.96:8080/mypage/evalue/"+this.props.tradeNo,
                params: {
                    userNo: this.props.userNo,
                    val: this.state.val,
                }
            }).then(res => {
                console.log(res);
                this.props.close();
                
            }).catch(err => {
                console.log(err);
            })
        }else{
            this.setState({
                rate: "평가 점수를 누르고 완료해주세요"
            })
        }
    }

    modalClose = () => {
        this.setState({
            rate: '',
            val: 0,
            isRate: false
        })
        this.props.close();
    }
    componentDidMount() {
        console.log('modal userno',this.props.userNo);
    }

    render() {
        return (
            <div className="manner-modal">
                <React.Fragment>
                    {this.props.isOpen ? (
                        <>
                            <div className="Modal-overlay" onClick={this.modalClose} />
                            <div className="Modal">
                                <p className="title">판매자는 어땠나요?</p>
                                <div className="content">
                                    <p className="select">
                                        <span onClick={this.good}>좋았어요</span> / <span onClick={this.soso}>보통이에요</span> / <span onClick={this.bad}>별로예요</span>
                                    </p>
                                    <p className="result">{this.state.rate}</p>
                                </div>
                                <div className="button-wrap">
                                    <button onClick={this.rating}> 평가하기 </button>
                                </div>
                            </div>
                        </>
                    ) : (
                        <></>
                    )}
                </React.Fragment>
            </div>
        );
    }
}

export default MannerModal;
