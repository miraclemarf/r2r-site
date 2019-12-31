import { priceAbbr } from '../functions';
export default (props) => {
    const { item, index } = props
    const isSelectedMotor = false
    return (
        <div data-id={item.id} onClick={() => { props.selectedAccessories(item) }}
            className={
                (isSelectedMotor ? 'bg-primary border-primary text-white' : 'bg-grayF2 border-grayF2') +
                ' p-2 position-relative'
            }
            style={{ borderRadius: '8px', minHeight: '130px', marginBottom: '3em', border: '2px solid' }}
        >
            <div>
                <small className="text-gray80">Merchant Name</small>
                <h4 style={{ lineHeight: 'normal' }} className="title-section w-75">
                    {item.title}
                </h4>
                <div
                    className={"position-absolute p-1 text-sm " + (isSelectedMotor ? "text-white" : "text-primary")}
                    style={{ fontSize: '75%', left: '6px', bottom: '5px', borderRadius: '4px' }}
                >
                    <strong dangerouslySetInnerHTML={{ __html: priceAbbr(false, item.price) }}></strong>
                </div>
            </div>
            <div className="position-absolute" style={{ maxWidth: '40%', right: '17px', zIndex: '1', bottom: '-30px' }}>
                <img style={{ width: "100%" }} src={item.picture} />

            </div>
        </div>
    )
}