import LandscapeCard from './cards/landscapeCard'

export default (props) => (
    <div className="sliderLandscapeWrapper position-relative d-inline-block w-100 overflow-auto">
        <div className="mobileSlider">
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