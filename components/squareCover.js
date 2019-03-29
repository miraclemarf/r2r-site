export default ({...props}) => (
    <div style={{'backgroundImage':'url('+props.imgCover+')'}} className="squareCover overlay--img__blue d-flex align-items-end">
        {props.withIcon?
            <div className="position-absolute align-self-center w-100 text-center">
                <img src="/static/slicing/img/icon_play_video.svg" />
            </div>
            :''}
    </div>
)