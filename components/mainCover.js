export default ({...props}) => (
    <div style={{'backgroundImage':'url('+props.imgCover+')'}} className="mainCover overlay--img__black d-flex align-items-end">
        {props.withIcon?
            <div className="position-absolute align-self-center w-100 text-center">
                <img src="/static/slicing/img/icon_play_video.svg" />
            </div>
            :''}
        <div className="text-white text-center m-3" style={{zIndex:'5'}}>
            <h1 className="title-section">TRAVELLING X TOURING</h1>
            <p>For you who is always hungry with <b>traveling</b> and <b>motorcycle touring</b></p>
        </div>
    </div>
)