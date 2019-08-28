import Link from 'next/link'

export default (props) => {
    const Styles = {
        SliderImage: {
            width: "100%",
            height: "auto",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            WebkitTransform: "translate(-50%, -50%)"
        },
        SliderItemsIcon: {
            width: "30px",
            height: "auto"
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
            top: props.textPosition === "center" ? "50%" : "auto",
            bottom: props.textPosition === "bottom" ? 0 : "auto", 
            left: "50%", 
            transform: props.textPosition === "bottom" ? "translateX(-50%)" : "translate(-50%, -50%)",
            WebkitTransform: props.textPosition === "bottom" ? "translateX(-50%)" : "translate(-50%, -50%)",
            padding: "20px 10px"
        }
    }

    return (
        <div className="objectItem position-relative d-inline-flex mx-2 rounded-lg overflow-hidden">
            <Link href={`/${props.pathname}?id=${props.slides.id}`} as={`${process.env.HOST_DOMAIN}/${props.pathname}/${props.slides.id}`} >
                <a title={props.slides.title} style={{zIndex: 4}} className="position-absolute w-100 h-100" />
            </Link>
            <div className="position-relative w-100 h-100 overflow-hidden">
                { 
                    props.iconPlay ?
                    <div style={Styles.videoIcon} className="position-absolute invisible">
                        <span className="icon icon-icon_play_video text-white" />
                    </div> : ""
                }
                {
                    props.overlay ?
                    <div style={{zIndex: 1}} className="position-absolute overlay--img__black w-100 h-100" /> : ""
                }
                <img style={Styles.SliderImage} className="position-absolute" src={process.env.HOST_URL+props.slides.coverLandscape} />
                <div style={Styles.infoWrapper} className="position-absolute d-inline-block w-100 text-white">
                    {
                        !props.iconPlay ?
                        <img src={process.env.HOST_URL+props.slides.iconCover} style={Styles.SliderItemsIcon} className="d-block m-auto pb-2 invisible" alt={props.slides.title}/> : ""
                    }
                    {
                        props.withTitle ?
                        <h2 style={{lineHeight: "normal"}} className="title-section text-center text-break m-0">{props.slides.title}</h2> : ""
                    }
                    {
                        props.withSubTitle ? 
                        <span style={{fontSize: "10pt"}} className="d-block text-center">{props.slides.subTitle}</span> : ''
                    }
                </div>
            </div>
        </div>
    )
}