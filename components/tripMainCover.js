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
            height: "auto"
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
        console.log(item)
        return (
            <CarouselItem
                className="position-relative custom-height rounded-lg"
                tag="div"
                key={item.id}
                onExiting={() => setAnimating(true)}
                onExited={() => setAnimating(false)}
            >
                <Link href={`/trip/detail?id=${item.id}`} as={`${process.env.HOST_DOMAIN}/trip/${item.id}`} >
                    <a title={item.title} style={{zIndex: 3}} className="position-absolute w-100 h-100" />
                </Link>
                <div className="position-relative w-100 h-100">
                    <div className="position-absolute w-100 h-100 overlay--img__black" style={{top: 0, left: 0, zIndex: 2}} />
                    <img style={Styles.imagesCarousel} src={item.src} alt={item.altText} />
                </div>
                <div className="position-absolute" style={Styles.infoWrapper}>
                    {/* <div className="w-100 d-block text-center">
                        <img width="50" height="auto" src={item.icon} />
                    </div> */}
                    <h4 className="title-section text-white mt-3 mb-0">{item.caption}</h4>
                    <h1 className="title-section text-white mt-0">{item.header}</h1>
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
                    height: auto;
                    max-height: 450px;
                    overflow: hidden;
                    background: black;
                }`
            }
            </style>
            <Carousel
                className="mb-5"
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