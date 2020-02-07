import React from "react";
import {Link} from 'react-router-dom';
import "./Items.scss";

function Sale() {
    //
    return (
        <div className="sale">
            <h3>판매 상품</h3>
            <div className="products">
                <div className="item">
                    <div className="item-manners">
                        <h3>♥♥♥♥♥</h3>
                    </div>
                    <div className="item-img">
                        <img
                            src="https://dnvefa72aowie.cloudfront.net/origin/article/202001/89A4F5AE96E72336F6CAF9D290982BBDD9617D44B5B99B6E2F43189AD7CF549E.jpg?q=82&s=300x300&t=crop"
                            alt="item1"
                        />
                    </div>
                </div>
                <div className="item">
                    <img
                        src="https://dnvefa72aowie.cloudfront.net/origin/article/202001/89A4F5AE96E72336F6CAF9D290982BBDD9617D44B5B99B6E2F43189AD7CF549E.jpg?q=82&s=300x300&t=crop"
                        alt="item1"
                    />
                </div>
                <div className="item">
                    <img
                        src="https://dnvefa72aowie.cloudfront.net/origin/article/202001/89A4F5AE96E72336F6CAF9D290982BBDD9617D44B5B99B6E2F43189AD7CF549E.jpg?q=82&s=300x300&t=crop"
                        alt="item1"
                    />
                </div>
                <div className="item">
                    <img
                        src="https://dnvefa72aowie.cloudfront.net/origin/article/202001/89A4F5AE96E72336F6CAF9D290982BBDD9617D44B5B99B6E2F43189AD7CF549E.jpg?q=82&s=300x300&t=crop"
                        alt="item1"
                    />
                </div>
                {/* <div className="item">
                    <button className="btn-more"><h3>더보기</h3></button>
                </div> */}
            </div>
            <div className="product-more-wrapper">
                <Link to="/sale"><button className="sale-more">
                    <h3>+ 판매 상품 더보기</h3>
                </button>
                </Link>
            </div>
        </div>
    );
}

export default Sale;
