import React, {Component} from 'react';
import Header from '../Common/Header';
import Footer from '../Common/Footer';
import './More.scss';

class SaleMore extends Component {
    render() {
        return (
            <div className="sale-more">
                <Header />
                <div>
                    {/* 검색 결과 가져다 쓰기 ㅎㅎ*/}
                    <h2>판매 상품</h2>
                </div>
                <Footer />
            </div>
        );
    }
}

export default SaleMore;