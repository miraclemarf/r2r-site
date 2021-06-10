import React, { useState } from 'react'
import Link from 'next/link'
import {
    Container,
    Carousel,
    CarouselItem,
    CarouselControl,
    CarouselIndicators
} from 'reactstrap';

const HeadlineCarousel = (props) => {
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
                className={`position-relative ${props.isMobile ? '' : ''}`}
                tag="div"
                key={item.id}
                onExiting={() => setAnimating(true)}
                onExited={() => setAnimating(false)}
            >
                <a className="hover-none d-block" target="_blank" href={item.linkUrl} title={item.title}>
                    <div style={{ 'backgroundImage': 'url(' + item.mediaUrl + ')' }} className="mainCover overlay--img__black position-relative d-flex align-items-end">
                        <Container className="p-0 position-relative d-inline-block w-100 h-100">
                            <div className="coverInfo d-flex align-items-end text-white">
                                <div className="flex-fill mt-auto">
                                    <div>
                                    <h1 className="title-section">{item.title}</h1>
                                    </div>
                                    <div dangerouslySetInnerHTML={{ __html: item.subtitle }}></div>
                                    {
                                        item.isVideo ?
                                            <div className="video-section position-absolute">
                                                <span className="icon icon-icon_play_video text-white" />
                                                <span className="section-info text-white">WATCH VIDEO</span>
                                            </div> : ''
                                    }
                                </div>
                            </div>
                        </Container>
                    </div>
                </a>
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
                className={"mb-4"}
                interval={null}
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
    {/* <UncontrolledCarousel items={props.datas} /> */ }
}

export default HeadlineCarousel;