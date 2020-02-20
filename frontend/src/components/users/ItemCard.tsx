import React from 'react'
import './ItemCard.scss'

interface TtradeImg {
  imgNo: number
  tiTrade: number
  orgImg: string
}

interface Props {
  image: Array<TtradeImg>
  tradeTitle: string
  productPrice: string
  tradeNo: number
}

class ItemCard extends React.Component<Props> {
  state = {
    isOver: true
  }

  mouseOver = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    // // console.log(e.target);
    this.setState({
      isOver: false
    })
  }

  mouseOut = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    // // console.log(e.target);
    this.setState({
      isOver: true
    })
  }

  render() {
    return (
      <div id={this.props.tradeNo + ''} className="itemCard" onMouseOver={this.mouseOver} onMouseOut={this.mouseOut}>
        <div id={this.props.tradeNo + ''} className="img-back" hidden={this.state.isOver}>
          <div id={this.props.tradeNo + ''} className="item-info">
            <h4 id={this.props.tradeNo + ''} className="title">
              {this.props.tradeTitle}
            </h4>
            <hr />
            <h4 id={this.props.tradeNo + ''} className="price">
              {this.props.productPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원
            </h4>
          </div>
        </div>
        <img id={this.props.tradeNo + ''} src={this.props.image[0].orgImg.toString()} alt={this.props.tradeTitle} />
      </div>
    )
  }
}

export default ItemCard
