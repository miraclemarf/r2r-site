export default ({ ...props }) => {
    const Styles = {
        CoverIconWrapper: {
            backgroundImage: 'url(' + process.env.HOST_URL + props.imgCover + ')'
        },
        CoverIcon: {
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
                            <img className="invisible" style={{marginTop: "10px"}} height="50" src={process.env.HOST_URL+props.iconTrip} />
                            <h1 style={{lineHeight:".8em", fontSize:"3em"}} className="mt-3 title-section text-white">{props.text}</h1>
                        </div>
                        :
                        <div style={Object.assign(Styles.CoverIcon, Styles.VideoIcon)} className="video-icon position-absolute border border-white">
                            <span className="icon icon-icon_play_video text-white" />
                        </div>
                    }
                </div>
                : ''
            }
        </div>
    )
}