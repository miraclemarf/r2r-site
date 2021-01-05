import Link from 'next/link'
import { priceAbbr } from '../functions';

export default (props) => {
    const Styles = {
        SliderImage: {
            width: "100%",
            height: props.slides.coverPortrait ? "auto" : "100%",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            WebkitTransform: "translate(-50%, -50%)",
            objectFit: props.slides.coverPortrait ? "unset" : "cover"
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
        },
        oneLineText: {
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            width: "100%",
            display: "inline-block"
        }
    }

    return (
        <div
            className="objectItem position-relative d-inline-block mx-2 overflow-hidden"
            style={{
                paddingBottom: props.infoPrice ? 60 : 0,
                height: props.infoPrice ? 310 : 255
            }}
        >
            <Link href={`/${props.pathname}/detail?id=${props.slides.id}`} as={`${process.env.HOST_DOMAIN}/${props.pathname}/${props.slides.id}`} >
                <a title={props.slides.title} style={{ zIndex: 4 }} className="position-absolute w-100 h-100" />
            </Link>
            <div className="position-relative w-100 h-100 rounded-lg overflow-hidden">
                {
                    props.iconPlay ?
                        <div style={Styles.videoIcon} className="position-absolute">
                            <span className="icon icon-icon_play_video text-white" />
                        </div> : ""
                }
                {props.overlay ? <div style={{ zIndex: 1 }} className="position-absolute overlay--img__black w-100 h-100" /> : ""}
                <img
                    style={Styles.SliderImage}
                    className="position-absolute"
                    src={props.slides.coverPortrait ? props.slides.coverPortrait : props.slides.coverLandscape}
                    alt={props.slides.title}
                />
                <div style={Styles.infoWrapper} className="position-absolute d-inline-block w-100 text-white">
                    {props.withTitle ? <h2 style={{ lineHeight: "normal" }} className="title-section text-center text-break m-0">{props.slides.title}</h2> : ""}
                    {props.slides.subTitle ? <span className="d-block text-center">{props.slides.subTitle}</span> : ''}
                </div>
            </div>
            {
                props.infoPrice ?
                    <div className="absolute-bottom-left d-block w-100" style={{ height: 50, paddingTop: 10 }}>
                        <div className="d-block" style={{ float: 'left', width: "48%", color: "#999", fontSize: 12, lineHeight: 1.35 }}>
                            <div style={Styles.oneLineText}>{props.slides.title}</div>
                            <div style={Styles.oneLineText}>{props.slides.location}</div>
                        </div>
                        <div className="d-block" style={{ float: 'right', width: "48%", lineHeight: 1.3 }}>
                            <div className="d-block w-100 text-right" style={{ color: "#999", fontSize: 10 }}>Start from</div>
                            <div className="d-block w-100 text-right font-weight-bold" dangerouslySetInnerHTML={{ __html: priceAbbr(true, props.slides.tripPrice) }}></div>
                        </div>
                    </div>
                    : ""
            }
        </div>
    )
}