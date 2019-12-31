import LandscapeCard from './cards/landscapeCard'

export default (props) => (
    <div className="sliderLandscapeWrapper position-relative d-inline-block w-100 overflow-auto">
        <div className="mobileSlider">
            {props.sliderData.list.map((data, key) => (
                <LandscapeCard 
                    key={key}
                    slides={data}
                    textPosition={"center"}
                    pathname={"trip"}
                    iconPlay={false}
                    overlay={true}
                    withTitle={true}
                    withSubTitle={false}
                />
            ))}
        </div>
    </div>
)