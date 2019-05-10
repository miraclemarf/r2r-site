export default ({ ...props }) => (
    <div style={{ 'backgroundImage': 'url(' + props.imgCover + ')' }} className="squareCover overlay--img__blue d-flex align-items-end">
        {props.withIcon ?
            <div className="position-absolute align-self-center w-100 text-center">
                {props.iconTrip
                    ?
                    <div style={{paddingTop:"4em"}}>
                        <img height="50" src={process.env.HOST_DOMAIN+"/static/slicing/img/destination/symbol_dieng.svg"} />
                        <h1 style={{lineHeight:".8em", fontSize:"3em"}} className="mt-3 title-section text-white">Hidden<br />Dieng</h1>
                    </div>
                    :
                    <img src={process.env.HOST_DOMAIN+"/static/slicing/img/icon_play_video.svg"} />
                }
            </div>
            : ''}
    </div>
)