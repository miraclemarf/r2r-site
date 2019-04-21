export default ({ ...props }) => (
    <div className="d-flex justify-content-center align-items-center position-absolute m-auto" style={{top:"0", left:"0", right:"0"}}>
        <div style={{ width: "40px", height: "40px" }} className={(props.step=="1" ? "bg-primary text-white":"bg-grayF2 text-gray80") +" rounded-circle text-sm text-center"}>
        <span style={{fontSize:"115%", padding:"9px 0"}} className="icon-icon_bike h5 d-block"></span>
        </div>
        <div style={{ width: "40px", height: "40px" }} className={(props.step=="2" ? "bg-primary text-white":"bg-grayF2 text-gray80") +" rounded-circle text-sm text-center mx-4"}>
        <span className="icon-icon_helmet h5 py-2 d-block"></span>
        </div>
        <div style={{ width: "40px", height: "40px" }} className={(props.step=="3" ? "bg-primary text-white":"bg-grayF2 text-gray80") +" rounded-circle text-sm text-center"}>
            <span className="icon-icon_accesories h5 py-2 d-block"></span>
        </div>
    </div>
)