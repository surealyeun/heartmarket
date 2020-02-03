import React from "react";
import "./Ganji.scss";

import Carousel from "react-multi-carousel";
import Ganji1 from "../img/Ganji1-1.png";
import Ganji2 from "../img/Ganji2-4.png";
import Ganji3 from "../img/Ganji3-5.png";

function Ganji() {

    const responsive = {
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

    return (
        <div className="Ganji">
            <div className="div_carousel">
                <Carousel
                    additionalTransfrom={0}
                    arrows
                    autoPlay={true}
                    autoPlaySpeed={3000}
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
                    responsive={responsive}
                >
                    <div className="div_ganji">
                        <img
                            className="ganji"
                            alt=""
                            src={Ganji1}
                        ></img>
                    </div>
                    <div className="div_ganji">
                        <img
                            className="ganji"
                            alt=""
                            src={Ganji2}
                        ></img>
                    </div>
                    <div className="div_ganji">
                        <img
                            className="ganji"
                            alt=""
                            src={Ganji3}
                        ></img>
                    </div>
                </Carousel>
            </div>
        </div>
    );
}

export default Ganji;