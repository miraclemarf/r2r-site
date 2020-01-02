import LandscapeCard from './cards/landscapeCard'
import PortraitWithPriceCard from './cards/portraitWithPriceCard'

export default (props) => {
    const datas = props.maxLength ? props.sliderData.list.slice(0, props.maxLength) : props.sliderData.list
    return (
        <div 
            className={`${props.portrait ? 'sliderPortraitWrapper' : 'sliderLandscapeWrapper'} position-relative d-inline-block w-100 overflow-auto ${props.infoPrice ? 'withInfo' : ''}`}
        >
            <div className="mobileSlider">
                {datas.map((data, key) => (
                    props.portrait ?
                        <PortraitWithPriceCard 
                            key={key}
                            slides={data}
                            textPosition="center"
                            pathname="trip"
                            iconPlay={false}
                            overlay={true}
                            withTitle={true}
                            withSubTitle={false}
                            infoPrice={props.infoPrice}
                        />
                        :
                        <LandscapeCard 
                            key={key}
                            slides={data}
                            textPosition="center"
                            pathname="trip"
                            iconPlay={false}
                            overlay={true}
                            withTitle={true}
                            withSubTitle={false}
                        />
                ))}
            </div>
        </div>
    )
}