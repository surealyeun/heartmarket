import React, {Component} from 'react';
import Header from '../common/Header';
import Footer from '../common/Footer';
import SessionDelete from "../common/SessionDelete";

class PurchaseMore extends Component {
    render() {
        return (
            <div>
                <SessionDelete></SessionDelete>
                <Header />
                <div>
                    
                </div>
                <Footer />
            </div>
        );
    }
}

export default PurchaseMore;