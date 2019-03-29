export default ({ ...props }) => (
    <div style={ !props.isLandscape ? {"minWidth":"180px"} : {"minWidth":"250px"}} className="card overlay--img__black border-0 text-white w-100">

        <img className="card-img rounded-0" src={!props.isLandscape ? props.coverPotrait : props.coverLandscape}  />
        <div className="card-img-overlay d-flex align-items-end">
            {!props.isLandscape ? 
            <div className="position-absolute align-self-start">
                <img src="/static/slicing/img/icon_play_video.svg" />
            </div> : ''}
            <div className="mx-auto">
            <h2 style={{"lineHeight":"normal"}} className="title-section text-center text-break m-0">{props.title}</h2>
            {props.subTitle ?  <span className="d-block text-center">{props.subTitle}</span> : ''}
            </div>
        </div>
    </div>

    
);
