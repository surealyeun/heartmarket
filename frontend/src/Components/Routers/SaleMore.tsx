import React, {Component} from 'react';
import Header from '../Common/Header';
import Footer from '../Common/Footer';
import './More.scss';

class SaleMore extends Component {
    render() {
        return (
            <div>
                <Header />
                <div className="sale-more">
                    {/* 검색 결과 가져다 쓰기 ㅎㅎ*/}
                    <h3>내가 판매 중인 상품</h3>
                    <div className="products">
                            <div className="item">
                                <img
                                    src="https://dnvefa72aowie.cloudfront.net/origin/article/202001/77120318A0EA8BE3F97C131D8758D2B5E452A0D37184FE594F75148386745E8A.jpg?q=82&s=300x300&t=crop"
                                    alt="item1"
                                />
                                {/* <div className="img-back" hidden={this.state.isOver}>
                            <p>모두가 가지고 싶어하는 에어팟</p>
                        </div> */}
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
                        </div>
                </div>
                <Footer />
            </div>
        );
    }
}

export default SaleMore;