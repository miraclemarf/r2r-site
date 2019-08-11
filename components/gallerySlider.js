import LandscapeCard from './cards/landscapeCard'

export default (props) => {
    return (
        <div 
            style={{height: "181px", paddingBottom: "15px"}} 
            className="position-relative d-inline-block w-100 overflow-auto"
        >
            <div 
                style={{top: 0, left: 0}} 
                className="position-absolute d-flex"
            >
                {props.sliderData.map((data, key) => (
                    <LandscapeCard 
                        key={key}
                        slides={data}
                        textPosition={"center"}
                        pathname={"gallery"}
                        iconPlay={false}
                        overlay={true}
                        withTitle={true}
                        withSubTitle={true}
                    />
                ))}
            </div>
        </div>
    )
}