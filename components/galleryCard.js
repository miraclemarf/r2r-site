export default (props) => {
    const Styles = {
        SliderContainer: {
            height: props.height ? `${Number(props.height) + 15}px` : "181px",
            paddingBottom: "15px"
        },
        SliderItems: {
            width: props.width ? `${props.width}px` : "265px",
            height: props.height ? `${props.height}px`: "166px"
        },
        SliderImage: {
            width: "100%",
            height: "auto",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            WebkitTransform: "translate(-50%, -50%)"
        },
        SliderItemsIcon: {
            width: "30px",
            height: "auto"
        },
        videoIcon: {
            top: "10px",
            left: "10px",
            padding: "8px 11px",
            border: "1px solid white",
            zIndex: 2
        },
        infoWrapper: {
            zIndex: 3,
            top: "50%", 
            left: "50%", 
            transform: "translate(-50%, -50%)",
            WebkitTransform: "translate(-50%, -50%)",
            padding: "20px 15px"
        }
    }

    return (
        <div style={Styles.SliderContainer} className="position-relative d-inline-block w-100 overflow-auto">
            <div style={{top: 0, left: 0}} className="position-absolute d-flex">
                {props.sliderData.map((data, key) => (
                    <div key={key} style={Styles.SliderItems} className="position-relative d-inline-flex mx-2">
                        <a href={`${process.env.HOST_DOMAIN}/gallery/${data.id}`} title={data.title} style={{zIndex: 4}} className="position-absolute w-100 h-100" />
                        <div className="position-relative w-100 h-100 overflow-hidden">
                            <div style={{zIndex: 1}} className="position-absolute overlay--img__black w-100 h-100" />
                            <img style={Styles.SliderImage} className="position-absolute" src={process.env.HOST_URL+data.coverLandscape} />
                            <div style={Styles.infoWrapper} className="position-absolute d-inline-block w-100 text-white">
                                <img src={process.env.HOST_URL+data.iconCover} style={Styles.SliderItemsIcon} className="d-block m-auto pb-2" alt={data.title}/>
                                <h2 style={{lineHeight: "normal"}} className="title-section text-center text-break m-0">{data.title}</h2>
                                {
                                    props.subTitle ? 
                                    <span style={{fontSize: "10pt"}} className="d-block text-center">{data.subTitle}</span> : ''
                                }
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}