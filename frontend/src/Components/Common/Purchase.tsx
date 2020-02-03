import React from 'react';
import './Items.scss';

function Purchase() {
    return (
        <div className="section">
            <h3>구매 물품</h3>
            <div className="products">
                <div className="item">
                    <img src="https://dnvefa72aowie.cloudfront.net/origin/article/202001/77120318A0EA8BE3F97C131D8758D2B5E452A0D37184FE594F75148386745E8A.jpg?q=82&s=300x300&t=crop" alt="item1" />
                </div>
                <div className="item"><img src="https://dnvefa72aowie.cloudfront.net/origin/article/202001/77120318A0EA8BE3F97C131D8758D2B5E452A0D37184FE594F75148386745E8A.jpg?q=82&s=300x300&t=crop" alt="item1" /></div>
                <div className="item"><img src="https://dnvefa72aowie.cloudfront.net/origin/article/202001/77120318A0EA8BE3F97C131D8758D2B5E452A0D37184FE594F75148386745E8A.jpg?q=82&s=300x300&t=crop" alt="item1" /></div>
                <div className="item"><img src="https://dnvefa72aowie.cloudfront.net/origin/article/202001/77120318A0EA8BE3F97C131D8758D2B5E452A0D37184FE594F75148386745E8A.jpg?q=82&s=300x300&t=crop" alt="item1" /></div>
            </div>
        </div>
    );
}

export default Purchase;