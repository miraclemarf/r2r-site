import PortraitCard from './cards/portraitCard'
import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';

export default (props) => (
    <div>
        {
            props.isMobileUa ?
                <div className="sliderPortraitWrapper position-relative d-inline-block w-100 overflow-auto">
                    <div className="mobileSlider">
                        {props.sliderData.map((data, key) => (
                            <PortraitCard
                                key={key}
                                slides={data}
                                textPosition="bottom"
                                pathname="testimonial"
                                iconPlay={true}
                                overlay={true}
                                withTitle={true}
                                withSubTitle={false}
                            />
                        ))}
                    </div>
                </div>
                :
                <SimpleBar>
                    <div className="sliderPortraitWrapper position-relative d-inline-block w-100">
                        <div className="mobileSlider">
                            {props.sliderData.map((data, key) => (
                                <PortraitCard
                                    key={key}
                                    slides={data}
                                    textPosition="bottom"
                                    pathname="testimonial"
                                    iconPlay={true}
                                    overlay={true}
                                    withTitle={true}
                                    withSubTitle={false}
                                />
                            ))}
                        </div>
                    </div>
                </SimpleBar>
        }

    </div>
)