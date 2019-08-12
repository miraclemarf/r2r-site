import Link from 'next/link'

export default (props) => {
    const Styles = {
        SliderContainer: {
            height: props.height ? `${Number(props.height) + 15}px` : "265px",
            paddingBottom: "15px"
        },
        SliderItems: {
            width: props.width ? `${props.width}px` : "180px",
            height: props.height ? `${props.height}px`: "250px"
        },
        SliderImage: {
            width: "100%",
            height: "auto",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            WebkitTransform: "translate(-50%, -50%)"
        },
        videoIcon: {
            top: "10px",
            left: "10px",
            padding: "10px 13px 8px",
            border: "1px solid white",
            zIndex: 2
        },
        infoWrapper: {
            zIndex: 3,
            bottom: 0, 
            left: 0, 
            padding: "20px 15px"
        }
    }

    return (
        <div style={Styles.SliderContainer} className="position-relative d-inline-block w-100 overflow-auto">
            <div style={{top: 0, left: 0}} className="position-absolute d-flex">
                {props.sliderData.map((data, key) => (
                    <div key={key} style={Styles.SliderItems} className="position-relative d-inline-flex mx-2">
                        <Link href={`/testimonial/detail?id=${data.id}`} as={`${process.env.HOST_DOMAIN}/testimonial/${data.id}`} >
                            <a title={data.title} style={{zIndex: 4}} className="position-absolute w-100 h-100" />
                        </Link>
                        <div className="position-relative w-100 h-100 overflow-hidden">
                            <div style={Styles.videoIcon} className="position-absolute">
                                <span className="icon icon-icon_play_video text-white" />
                            </div>
                            <div style={{zIndex: 1}} className="position-absolute overlay--img__black w-100 h-100"/>
                            <img style={Styles.SliderImage} className="position-absolute" src={process.env.HOST_URL+data.coverPotrait} alt={data.title} />
                            <div style={Styles.infoWrapper} className="position-absolute d-inline-block w-100 text-white">
                                <h2 style={{lineHeight: "normal"}} className="title-section text-center text-break m-0">{data.title}</h2>
                                {
                                    props.subTitle ? 
                                    <span className="d-block text-center">{data.subTitle}</span> : ''
                                }
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}