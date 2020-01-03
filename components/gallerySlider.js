import LandscapeCard from './cards/landscapeCard'
import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';

export default (props) => (
    <div>
        {
            props.isMobileUa ?
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
                :
                <SimpleBar>
                    <div className="sliderLandscapeWrapper position-relative d-inline-block w-100">
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
                </SimpleBar>
        }

    </div>
)