import React from 'react';
import './ItemCard.scss';

interface TtradeImg {
    imgNo: number;
    tiTrade: number;
    orgImg: string;
}

interface Props{
    image: Array<TtradeImg>;
    tradeTitle: string;
    productPrice: string;
}

class ItemCard extends React.Component<Props> {
    state = {
        isOver: true
    }

    mouseOver = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        // console.log(e.target);
        this.setState({
            isOver: false
        });
    };

    mouseOut = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        // console.log(e.target);
        this.setState({
            isOver: true
        });
    };

    render(){
        return (
            <div className="itemCard" onMouseOver={this.mouseOver} onMouseOut={this.mouseOut}>
                <div className="img-back" hidden={this.state.isOver}>
                    <div className="item-info">
                        <h4 className="title">{this.props.tradeTitle}</h4>
                        <hr/>
                        <h4 className="price">{this.props.productPrice}원</h4>
                    </div>
                </div>
                <img src={this.props.image[0].orgImg.toString()} alt={this.props.tradeTitle} /> 
            </div>
        );
    }
}

export default ItemCard