import React from 'react';
import Header from '../Common/Header';
import Footer from '../Common/Footer';

class Detail extends React.Component {
    state = {
        trade: '',
        isLoading: false
    }
    constructor(props: any) {
        super(props);
        this.state = {
            isLoading: false,
            trade: props.history.location.state.trade
            // email: window.sessionStorage.getItem('joinemail')
        };
    }

    componentDidMount() {
        console.log(JSON.parse(this.state.trade));
        this.setState({
            isLoading: true
        })
        
    }

    render() {
        return (
            <div>
                <Header />
                <div className="product-detail">
                    {this.state.isLoading ? 
                    <h3>{this.state.trade}</h3>
                :
                <></>    
                }
                </div>
                <Footer />
            </div>
        );
    }
}

export default Detail