import React, { useState } from 'react'
import Link from 'next/link'
import {
    Carousel,
    CarouselItem,
    CarouselControl,
    CarouselIndicators
 } from 'reactstrap';

const TripMainCover = (props) => {
    const Styles = {
        infoWrapper: {
            zIndex: 3,
            paddingTop: 10,
            width: "90%",
            top: "50%",
            left: "50%", 
            transform: "translate(-50%, -50%)",
            WebkitTransform: "translate(-50%, -50%)",
            textAlign: "center"
        },
        imagesCarousel: {
            width: "100%",
            height: "100%",
            objectFit: "cover"
        }
    }
    const [activeIndex, setActiveIndex] = useState(0);
    const [animating, setAnimating] = useState(false);
    const next = () => {
        if (animating) return;
        const nextIndex = activeIndex === props.datas.length - 1 ? 0 : activeIndex + 1;
        setActiveIndex(nextIndex);
    }
    const previous = () => {
        if (animating) return;
        const nextIndex = activeIndex === 0 ? props.datas.length - 1 : activeIndex - 1;
        setActiveIndex(nextIndex);
    }
    const goToIndex = (newIndex) => {
        if (animating) return;
        setActiveIndex(newIndex);
    }

    const slides = props.datas.map((item) => {
        return (
            <CarouselItem
                className={`position-relative custom-height ${props.isMobile ?  '' : 'rounded-lg'}`}
                tag="div"
                key={item.id}
                onExiting={() => setAnimating(true)}
                onExited={() => setAnimating(false)}
            >
                <div className="position-relative w-100 h-100">
                    <div className="position-absolute w-100 h-100 overlay--img__black" style={{top: 0, left: 0, zIndex: 2}} />
                    <img style={Styles.imagesCarousel} src={item.src} alt={item.altText} />
                </div>
                <div className="position-absolute" style={Styles.infoWrapper}>
                    {/* <div className="w-100 d-block text-center">
                        <img width="50" height="auto" src={item.icon} />
                    </div> */}
                    <h1 className="title-section text-white mt-3">{item.header}</h1>
                </div>
                
            </CarouselItem>
        );
    });

    return (
        <div>
            <style>
            {
                `.custom-height {
                    max-width: 100%;
                    height: 40vh;
                    overflow: hidden;
                    background: black;
                }
                @media screen and (min-width: 768px) {
                    .custom-height {
                        height: 50vh;
                    }
                }
                .carousel-control-prev, .carousel-control-next{
                    z-index:5;
                }
                `
            }
            </style>
            <Carousel
                className="mb-5"
                dataInterval="false"
                activeIndex={activeIndex}
                next={next}
                previous={previous}
            >
                <CarouselIndicators items={props.datas} activeIndex={activeIndex} onClickHandler={goToIndex} />
                {slides}
                <CarouselControl direction="prev" directionText="Previous" onClickHandler={previous} />
                <CarouselControl direction="next" directionText="Next" onClickHandler={next} />
            </Carousel>
        </div>
    )
{/* <UncontrolledCarousel items={props.datas} /> */}
}

export default TripMainCover;