export default ({ ...props }) => (
    <a href={props.linkUrl}>
        <div style={{ 'backgroundImage': 'url(' + process.env.HOST_URL + props.mediaUrl + ')' }} className="mainCover overlay--img__black d-flex align-items-end">
            {props.isVideo ?
                <div className="position-absolute align-self-center w-100 text-center">
                    <img src={process.env.HOST_DOMAIN + "/static/slicing/img/icon_play_video.svg"} />
                </div>
                : ''}
            <div className="text-white text-center m-3" style={{ zIndex: '5' }}>
                <h1 className="title-section">{props.title}</h1>
                
                <p dangerouslySetInnerHTML={{ __html: props.subtitle }}></p>
            </div>
        </div>
    </a>
)