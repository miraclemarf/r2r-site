import React from 'react'
import Link from 'next/link'
import Moment from 'react-moment'
import { getPriceTrip } from '../../utils/trips'

export default class extends React.Component {
    static async getInitialProps({ req, query: { idTrip } }) {
        let props = {};
        props.nav = 'blue';
        props.navTrans = { step: 1 }
        props.footer = 'transparent';
        props.idTrip = idTrip;
        props.selectedPriceId = '';
        props.transaction = {
				idTrip:idTrip,
				meetingPoint:"",
				startDate:"",
				endDate:"",
				motor:{},
				accesories:[],
				price:[],
				notes:""
			};
        try {
            const data = await getPriceTrip(idTrip);
            props.price = data.object;
        } catch (e) {

        }
        return props;
    }
    constructor(props) {
        super(props);

        this.state = { ...props };
        this.selectedItem = this.selectedItem.bind(this);
    }
    componentDidUpdate(prevProps, prevState) {
        if (this.state.selectedPriceId != prevState.selectedPriceId) {
            this.props.transactionState(this.state.transaction)
        }
    }
    selectedItem(e) {
        
        const {transaction} = this.state
        const priceId = e.currentTarget.getAttribute('data-id');
        const priceObj = this.state.price.find((obj) => obj.id === parseInt(priceId))
        let price =  [...transaction.price]
        price = [priceObj.price]
        
        this.setState(
            {
                selectedPriceId: priceId,
                transaction:{
                ...transaction, 
                startDate:priceObj.startTrip, 
                endDate:priceObj.finishTrip, 
                price: price
                
            }})
    }
    renderCardDate(data, index) {
        return (
            <div onClick={this.selectedItem} key={index} data-id={data.id} data-price={data.price} className={(this.state.selectedPriceId == data.id ? "bg-primary border-primary text-white" : "border-softgray") + " border p-3 d-flex justify-content-between align-items-center mb-3"} style={{ borderRadius: "8px", boxShadow: "0px 3px 6px 0px rgba(0,0,0,0.3)" }}>
                <div className="abs-border">
                    <h3 className="title-section m-0">
                        <Moment unix format="DD MMM YY">{data.startTrip / 1000}</Moment>
                    </h3>
                    <h3 className="title-section m-0">
                        <Moment unix format="DD MMM YY">{data.finishTrip / 1000}</Moment>
                    </h3>
                </div>
                <div className="d-flex align-items-center">
                    <div className="mr-3">
                        <span className={(this.state.selectedPriceId == data.id ? "text-white" : "text-gray80") + " h3 icon-icon_helmet"}></span>
                    </div>
                    <div style={{ lineHeight: "14px" }}>
                        <div>
                            <h5 className="d-inline">{data.personPaid}</h5><span className="text-sm">/10</span>
                        </div>
                        <div><span className={(this.state.selectedPriceId == data.id ? "text-white" : "text-gray80") + " text-sm"}>Riders</span></div>
                    </div>
                </div>
                <div>
                    <div className="text-center"><span style={{ fontSize: "75%" }} className="text-sm">PRICE</span></div>
                    <h4 className="font-weight-bold">$ {data.price}</h4>
                </div>
            </div>
        )
    }
    render() {
        const { idTrip, price,transaction } = this.state
        console.log(this.state);
        
        return (
            <div>
                <div className="py-2"></div>

                <div className="container">
                    <div className="mb-3">
                        <a className="text-dark h4 title-section" href={process.env.HOST_DOMAIN+"/trip/" + idTrip} ><span style={{ top: "-1px" }} className="icon-left-arrow text-sm text-primary position-relative"></span> Back</a>
                    </div>
                    <div className="bg-grayF2 p-4 d-flex justify-content-between" style={{ borderRadius: "12px" }}>
                        <div>
                            <h4 className="title-section text-gray80">MEETING POINT</h4>
                        </div>
                        <div className="pl-3" dangerouslySetInnerHTML={{ __html: transaction.meetingPoint }}>

                        </div>
                    </div>
                    <hr className="border-softgray" />
                    <div>
                        <h2 className="title-section text-center">AVAILABLE DATE</h2>
                        <div className="mt-3">
                            {
                                price.map((item, index) => (
                                    this.renderCardDate(item, index)
                                ))
                            }
                        </div>
                        <button className="btn btn-outline-softgray text-dark mt-2 w-100" style={{ borderRadius: "8px", boxShadow: "0px 3px 6px 0px rgba(0,0,0,0.3)" }}>
                            I NEED PRIVATE TOUR
                        </button>
                    </div>
                </div>
                <div className="fixed-bottom">
                    <Link href={'/transaction/bike?page=bike&idTrip=' + idTrip} as={process.env.HOST_DOMAIN+'/trip/' + idTrip + '/bike'} >
                        <button className="btn btn-primary w-100">
                            Next : choose Bike
                        </button>
                    </Link>
                </div>
                <div className="py-2"></div>
            </div>
        )
    }
}