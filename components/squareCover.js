export default ({ ...props }) => {
    const Styles = {
        CoverIconWrapper: {
            backgroundImage: 'url(' + props.imgCover + ')'
        },
        CoverIcon: {
            width: "85%",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            WebkitTransform: "translate(-50%, -50%)",
            zIndex: 2
        },
        VideoIcon: {
            padding: "12px 16px 10px"
        }
    }

    return (
        <div className="squareCover d-inline-block w-100 align-items-end">
            {
                props.withIcon ?
                    <div style={Styles.CoverIconWrapper} className="position-relative d-block w-100 overlay--img__blue text-center">
                        {
                            props.iconTrip ?
                                <div style={Styles.CoverIcon} className="position-absolute">
                                    <img className="invisible" style={{ marginTop: "10px" }} height="50" src={props.iconTrip} />
                                </div>
                                :
                                <div style={Object.assign(Styles.CoverIcon, Styles.VideoIcon)} className="video-icon position-absolute">
                                    <span className="collapse icon icon-icon_play_video text-white" />
                                    <h4 style={{ fontSize: "2.2em" }} className="mt-2 mb-0 title-section substr text-white">{props.text}</h4>
                                    <h1 style={{ fontSize: "3em" }} className="m-0 title-section substr text-white">{props.location}</h1>
                                </div>
                        }
                    </div>
                    : ''
            }
        </div>
    )
}