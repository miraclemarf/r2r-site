export default ({ ...props }) => (
    <div style={{ 'backgroundImage': 'url(' + process.env.HOST_URL + props.imgCover + ')' }} className="squareCover overlay--img__blue d-flex align-items-end">
        {props.withIcon ?
            <div className="position-absolute align-self-center w-100 text-center">
                {props.iconTrip
                    ?
                    <div className="mx-3" style={{paddingTop:"3em"}}>
                        <img height="50" src={process.env.HOST_URL+props.iconTrip} />
                        <h1 style={{lineHeight:".8em", fontSize:"3em"}} className="mt-3 title-section text-white">{props.text}</h1>
                    </div>
                    :
                    <img src={process.env.HOST_DOMAIN+"/static/slicing/img/icon_play_video.svg"} />
                }
            </div>
            : ''}
    </div>
)