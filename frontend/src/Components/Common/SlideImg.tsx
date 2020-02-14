import React from "react";
import "./SlideImg.scss";

import Carousel from "react-multi-carousel";

interface TtradeImg {
    imgNo: number;
    tiTrade: number;
    orgImg: string;
}

interface Props {
    ttradeImg: TtradeImg[];
}

class SlideImg extends React.Component<Props> {
    responsive = {
        Desktop: {
            breakpoint: { max: 4000, min: 767 },
            items: 1
        },
        tablet: {
            breakpoint: { max: 768, min: 0 },
            items: 1
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1
        }
    };

    render() {
        return (
            <div className="slide-img">
                <div className="div_carousel">
                    <Carousel
                        additionalTransfrom={0}
                        arrows
                        customTransition="all .5"
                        transitionDuration={500}
                        containerClass="container"
                        draggable
                        infinite
                        keyBoardControl
                        minimumTouchDrag={80}
                        showDots
                        slidesToSlide={1}
                        swipeable={false}
                        removeArrowOnDeviceType={["mobile"]}
                        responsive={this.responsive}
                    >
                        {this.props.ttradeImg.map(img => {
                            return (
                                <div className="div_ganji">
                                    <img
                                        className="ganji"
                                        alt={img.orgImg}
                                        src={img.orgImg}
                                        key={img.imgNo}
                                    ></img>
                                </div>
                            );
                        })}
                        {/* <div className="div_ganji">
                            <img
                                className="ganji"
                                alt=""
                                src="https://s.ftcdn.net/v2013/pics/all/curated/RKyaEDwp8J7JKeZWQPuOVWvkUjGQfpCx_cover_580.jpg?r=1a0fc22192d0c808b8bb2b9bcfbf4a45b1793687"
                            ></img>
                        </div>
                        <div className="div_ganji">
                            <img
                                className="ganji"
                                alt=""
                                src="https://www.juniper.net/assets/img/hero/case-studies/hero-case-study-cern.jpg"
                            ></img>
                        </div>
                        <div className="div_ganji">
                            <img
                                className="ganji"
                                alt=""
                                src="https://images.unsplash.com/photo-1499084732479-de2c02d45fcc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80"
                            ></img>
                        </div> */}
                    </Carousel>
                </div>
            </div>
        );
    }
}

export default SlideImg;
