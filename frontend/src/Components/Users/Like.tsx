import React from "react";

class Like extends React.Component {
    state = {
        isOver: true
    }
    mouseOver = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        // console.log(e.target);
        this.setState({
            isOver: false
        })
    }

    mouseOut = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        // console.log(e.target);
        this.setState({
            isOver: true
        })
    }

    render() {
        return (
            <div className="like">
                <h3>심쿵 상품</h3>
                <div className="products">
                    <div className="item"
                        onMouseOver={this.mouseOver}
                        onMouseOut={this.mouseOut}>
                        <img
                            src="https://dnvefa72aowie.cloudfront.net/origin/article/202001/77120318A0EA8BE3F97C131D8758D2B5E452A0D37184FE594F75148386745E8A.jpg?q=82&s=300x300&t=crop"
                            alt="item1"
                        />
                        <div className="img-back" hidden={this.state.isOver}>
                            <p>모두가 가지고 싶어하는 에어팟</p>
                        </div>
                    </div>
                    <div className="item">
                        <img
                            src="https://dnvefa72aowie.cloudfront.net/origin/article/202001/77120318A0EA8BE3F97C131D8758D2B5E452A0D37184FE594F75148386745E8A.jpg?q=82&s=300x300&t=crop"
                            alt="item1"
                        />
                    </div>
                    <div className="item">
                        <img
                            src="https://dnvefa72aowie.cloudfront.net/origin/article/202001/77120318A0EA8BE3F97C131D8758D2B5E452A0D37184FE594F75148386745E8A.jpg?q=82&s=300x300&t=crop"
                            alt="item1"
                        />
                    </div>
                    <div className="item">
                        <img
                            src="https://dnvefa72aowie.cloudfront.net/origin/article/202001/77120318A0EA8BE3F97C131D8758D2B5E452A0D37184FE594F75148386745E8A.jpg?q=82&s=300x300&t=crop"
                            alt="item1"
                        />
                    </div>
                    {/* <div className="item">
                        <button className="btn-more"><img src="https://image.flaticon.com/icons/svg/1836/1836226.svg" alt=""></img></button>
                    </div> */}
                </div>
                <div className="like-more-wrapper">
                    <button className="like-more">
                        <h3>+ 심쿵 상품 더보기</h3>
                    </button>
                </div>
                <br />
            </div>
        );
    }
}

export default Like;
