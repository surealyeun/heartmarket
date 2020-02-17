import React from "react";
import "./MannerModal.scss";

interface Props {
    isOpen: boolean;
    close: any;
}

class MannerModal extends React.Component<Props> {
    state = {
        rate: '',
        isRate: false
    }

    good = () => {
        this.setState({
            rate: '좋았어요',
            isRate: true
        })
    }
    soso = () => {
        this.setState({
            rate: '보통이에요',
            isRate: true
        })
    }
    bad = () => {
        this.setState({
            rate: '별로예요',
            isRate: true
        })
    }

    rating = () => {
        // isRate === true 때 axios 평가 추가

        this.props.close();
    }

    modalClose = () => {
        this.setState({
            rate: '',
            isRate: false
        })
        this.props.close();
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
