export default ({...props}) => (
    <div>
        <div>
            <img className="img-fluid" src={props.coverLandscape} />
        </div>
        <div className="d-flex justify-content-between">
                <div>
                    <span className="d-block">{props.location}</span>
                    <span>Start from {props.startPrice}</span>
                </div>
                <div>
                    <span>Text Right</span>
                </div>
        </div>
    </div>
)