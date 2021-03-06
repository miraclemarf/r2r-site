export default ({ ...props }) => (
    <div style={ !props.isLandscape ? {"minWidth":"180px"} : {"minWidth":"250px"}} className="card overlay--img__black border-0 text-white w-100">
    <a href={props.id ? process.env.HOST_DOMAIN+"/trip/"+props.id : "#"} className="text-white">
        <img className="card-img rounded-0" src={process.env.HOST_URL + props.coverPortrait}  />
        <div className={"card-img-overlay d-flex "+ props.iconTextPostion}>
            {!props.isLandscape ? 
            <div className="position-absolute align-self-start">
                <img src={process.env.HOST_DOMAIN+"static/slicing/img/icon_play_video.svg"} />
            </div> : ''}
            <div className="mx-auto text-center">
            {props.r2rIcon ? <span className="d-block icon-logogram_r2r h3 mt-3"></span> : ""}
            <h2 style={{"lineHeight":"normal"}} className="title-section text-center text-break m-0">{props.title}</h2>
            {props.subTitle ?  <span className="d-block text-center">{props.subTitle}</span> : ''}
            </div>
        </div>
        </a> 
    </div>

    
);
