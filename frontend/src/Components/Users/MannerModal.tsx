import React from "react";
import "./MannerModal.scss";

interface Props {
    isOpen: boolean;
    close: any;
}

class MannerModal extends React.Component<Props> {
    render() {
        return (
            <div className="manner-modal">
                <React.Fragment>
                    {this.props.isOpen ? (
                        <>
                            <div className="Modal-overlay" onClick={this.props.close} />
                            <div className="Modal">
                                <p className="title">판매자는 어땠나요?</p>
                                <div className="content">
                                    <p>
                                        좋았어요 / 보통이에요 / 별로에요
                                    </p>
                                </div>
                                <div className="button-wrap">
                                    <button onClick={this.props.close}> 평가하기 </button>
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
