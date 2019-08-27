import PortraitCard from './cards/portraitCard'

export default (props) => (
    <div className="sliderPortraitWrapper position-relative d-inline-block w-100 overflow-auto">
        <div className="mobileSlider">
            {props.sliderData.map((data, key) => (
                <PortraitCard 
                    key={key}
                    slides={data}
                    pathname={"testimonial"}
                    iconPlay={true}
                    overlay={true}
                    withTitle={true}
                    withSubTitle={false}
                />
            ))}
        </div>
    </div>
)