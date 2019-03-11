export default ({...props}) => (
    <div className="mb-4">
        <div className="mb-2">
            <img className="img-fluid" src={props.coverLandscape} />
        </div>
        <div className="d-flex justify-content-between text-sm">
                <div style={{"lineHeight":"normal"}}>
                    <span className="d-block font-weight-bold text-black">{props.location}</span>
                    <span className="text-gray80">Start From {props.startPrice}</span>
                </div>
                <div>
                    <span>Text Right</span>
                </div>
        </div>
    </div>
)