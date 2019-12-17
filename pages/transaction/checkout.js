import React from 'react'
import Link from 'next/link'
import { bindActionCreators } from 'redux'
import { priceAbbr, accTotalPrice } from '../../components/functions'
import { getKursUsd } from '../../utils/userTransaction'
import Moment from 'react-moment'
import { connect } from 'react-redux'

class Checkout extends React.Component {
    static async getInitialProps({ store, req, query: { id }, res }) {
        if (res) {
            res.writeHead(302, {
                Location: process.env.HOST_DOMAIN + '/trip/' + id
            })
            res.end()
        }
        let props = {}
        props.nav = 'blue';
        props.navTrans = { step: 3 }
        props.idTrip = id;
        props.kursUsd = '';
        props.notes = '';
        props.token = '';
        return props;
    }
    constructor(props) {
        super(props);
        this.state = { ...props };
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    async componentDidMount() {
        const { TransactionData } = this.state
        const datePrice = TransactionData.price ? TransactionData.price.price : 0;
        const motorPrice = TransactionData.motor ? !TransactionData.motor.bringOwnMotor ? TransactionData.motor.price : 0 : 0;
        const accPrice = "accessories" in TransactionData ? accTotalPrice(TransactionData.accessories) : 0;

        const totalPrice = [datePrice, motorPrice, accPrice];

        if (!this.state.kursUsd) {
            const kursData = await getKursUsd()
            const usdPrice = (totalPrice.reduce((total, amount) => total + amount)) / kursData.jual
            this.setState({ kursUsd: Math.round(usdPrice) })
        }
    }
    handleSubmit(e) {

    }
    handleChange(e) {
        const target = e.target, value = target.value, name = target.name;
        this.setState({ notes: value });
    }

    render() {
        const { idTrip, TransactionData, TripData, token } = this.state
        const datePrice = TransactionData.price ? TransactionData.price.price : 0;
        const motorPrice = TransactionData.motor ? !TransactionData.motor.bringOwnMotor ? TransactionData.motor.price : 0 : 0;
        const accPrice = "accessories" in TransactionData ? accTotalPrice(TransactionData.accessories) : 0;

        const totalPrice = [datePrice, motorPrice, accPrice];
        return (
            <div>
                <div className="py-2" />
                <div className="container position-relative">
                    <div className="mb-4 position-relative">
                        <a className="d-block pt-2 text-dark h4 title-section position-relative" href={process.env.HOST_DOMAIN + "/trip/" + idTrip} style={{ "zIndex": "10" }} ><span style={{ top: "-1px" }} className="icon-left-arrow text-sm text-primary position-relative"></span> Back</a>
                    </div>
                    <div style={{ top: "0", left: "0", right: "0" }} className="position-absolute">
                        <h2 className="title-section text-center mb-4">Checkout</h2>
                    </div>
                    <div className="mb-4">
                        <h4 className="title-section">DATE</h4>
                        <div className="bg-grayF2 p-3" style={{ borderRadius: "8px" }}>
                            <h4 className="title-section text-center m-0">
                                <Moment unix format="DD MMM YY">{TransactionData.price.startTrip / 1000}</Moment> - <Moment unix format="DD MMM YY">{TransactionData.price.finishTrip / 1000}</Moment> </h4>
                        </div>
                    </div>

                    <div className="mb-4">
                        <h4 className="title-section">MEETING POINT</h4>
                        <div className="bg-grayF2 p-3 rm-p" style={{ borderRadius: "8px" }} dangerouslySetInnerHTML={{ __html: TransactionData.meetingPoint }}></div>
                    </div>
                    <div className="mb-4">
                        <h4 className="title-section">DETAIL COST</h4>
                        <div className="bg-grayF2 p-3 rm-p" style={{ borderRadius: "8px" }}>
                            <div className="border-bottom pb-4 mb-3 border-softgray">
                                <div className="d-flex align-items-center justify-content-between">
                                    <div style={{ lineHeight: "16px" }}>
                                        <h3 style={{ lineHeight: "normal" }} className="title-section m-0">{TripData.detail.title}</h3>
                                        <div className="text-sm text-gray80">
                                            <Moment unix format="DD MMM YY">{TransactionData.price.startTrip / 1000}</Moment> - <Moment unix format="DD MMM YY">{TransactionData.price.finishTrip / 1000}</Moment>
                                        </div>
                                    </div>
                                    <div style={{ lineHeight: "16px" }}>
                                        <span className="text-xs text-gray80">Price</span><br />
                                        <span className="align-self-center m-auto text-sm text-primary">
                                            <strong dangerouslySetInnerHTML={{ __html: priceAbbr(false, TransactionData.totalPrice) }}></strong>
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="border-bottom pb-4 mb-3 border-softgray">
                                <div className="d-flex align-items-center justify-content-between">
                                    <div style={{ lineHeight: "16px" }}>
                                        <h3 style={{ lineHeight: "normal" }} className="title-section m-0">{TransactionData.motor.title}</h3>
                                    </div>
                                    <div style={{ width: "30%" }}>
                                        <img src={TransactionData.motor.picture} className="img-fluid my-1" />
                                    </div>
                                </div>
                                <div className="d-flex align-items-center justify-content-between">
                                    <div />
                                    <div style={{ lineHeight: "16px" }}>
                                        <span className="text-xs text-gray80">Price</span><br />
                                        <span className="align-self-center m-auto text-sm text-primary">
                                            <strong dangerouslySetInnerHTML={{ __html: priceAbbr(false, TransactionData.motor.price) }}></strong>
                                        </span>
                                    </div>
                                </div>
                            </div>
                            {
                                "accessories" in TransactionData ?
                                    TransactionData.accessories.length > 0 ?
                                        TransactionData.accessories.map((item, index) => (
                                            <div className="border-bottom pb-4 mb-3 border-softgray" key={index}>
                                                <div className="d-flex align-items-center justify-content-between">
                                                    <div className="mr-auto">
                                                        <div>
                                                            <span className="text-sm text-gray80">Merchant Name</span>
                                                            <h3 style={{ lineHeight: "normal" }} className="title-section">{item.title}</h3>
                                                        </div>
                                                    </div>
                                                    <div style={{ width: "30%" }}>
                                                        <img src={item.picture} className="img-fluid my-1" />
                                                    </div>
                                                </div>
                                                <div className="d-flex align-items-center justify-content-between">
                                                    <div style={{ lineHeight: "16px" }}>
                                                        <span className="text-xs text-gray80">Size</span><br />
                                                        <span className="font-weight-bold align-self-center m-auto text-sm">{item.size}</span>
                                                    </div>
                                                    <div style={{ lineHeight: "16px" }}>
                                                        <span className="text-xs text-gray80">Qty</span><br />
                                                        <span className="align-self-center m-auto text-sm">
                                                            <strong>{item.quantity}</strong>
                                                        </span>
                                                    </div>
                                                    <div style={{ lineHeight: "16px" }}>
                                                        <span className="text-xs text-gray80">Price</span><br />
                                                        <span className="align-self-center m-auto text-sm text-primary">
                                                            <strong dangerouslySetInnerHTML={{ __html: priceAbbr(false, item.price) }}></strong>
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        )) : '' : ''
                            }
                        </div>
                    </div>
                    <div className="mb-4 d-flex justify-content-between align-items-center">
                        <div><h4 className="title-section m-0">Total</h4></div>
                        <div>
                            <h4 className="text-primary m-0 font-weight-bold" dangerouslySetInnerHTML={{ __html: priceAbbr(false, totalPrice.reduce((total, amount) => total + amount)) }}></h4>
                            <i className="text-sm text-primary float-right">approximate <b>${this.state.kursUsd}</b></i>
                        </div>

                    </div>
                </div>
                <div className="container bg-grayF2 py-4">
                    <h4 className="title-section">Notes</h4>
                    <form>
                        <div className="form-group m-0">
                            <textarea onChange={this.handleChange} name="notes" placeholder="Add any notes if you have some request, we will try to make your trip better!" className="form-control" rows="4" style={{ fontSize: "95%", color: "#808080", fontStyle: "italic" }}></textarea>
                        </div>
                    </form>
                </div>
                <div className="container">
                    {
                        !token ?
                            <div className="pb-4 border-softgray" style={{ borderBottom: "1px solid" }}>
                                <div className="py-2"></div>
                                <div className="mb-3">
                                    <span className="text-sm">To continue this process you must log in first!</span>
                                </div>
                                <div>
                                    <Link href={'/login'} as={process.env.HOST_DOMAIN + '/login'} >
                                        <a className="d-block w-100 mb-2  btn btn-info ">LOG IN</a>
                                    </Link>
                                    <Link href={'/register'} as={process.env.HOST_DOMAIN + '/register'} >
                                        <a className="d-block w-100  btn btn-secondary">REGISTER</a>
                                    </Link>
                                </div>
                            </div>
                            : ""}

                    <div className="pb-4 mb-3">
                        <div className="pt-4">
                            <p className="text-center text-sm mx-3">
                                You are accepting Road2ring’s <a href={process.env.HOST_DOMAIN + '/term-condition'} className="text-primary"><b>Term and Condition</b></a> by clicking make payment button.
                            </p>
                        </div>
                        <div className="pt-2">
                            {
                                !token ?
                                    <button className="btn btn-grayF2 w-100 text-softgray" disabled="disabled">Confirm</button>
                                    :
                                    <button className="btn btn-info w-100" onClick={this.handleSubmit}>Confirm</button>
                            }
                        </div>
                    </div>
                </div>
                <style jsx global>{`
                    .rm-p p{
                        margin:0;
                    }
                `}</style>
            </div>
        )

    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        //getAccessories: bindActionCreators(getAccessories, dispatch),
    };
};
export default connect((state) => state, mapDispatchToProps)(Checkout);