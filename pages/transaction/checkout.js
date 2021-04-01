import React from 'react'
import Link from 'next/link'
import { bindActionCreators } from 'redux'
import SquareCover from '../../components/squareCover'
import { priceAbbr, accTotalPrice } from '../../components/functions'
import { getKursUsd } from '../../utils/userTransaction'
import { checkout } from '../../utils/trips'
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
        const { TransactionData } = store.getState()
        const datePrice = TransactionData.price ? TransactionData.price.price : 0;
        const motorPrice = TransactionData.motor ? !TransactionData.motor.bringOwnMotor ? TransactionData.motor.price : 0 : 0;
        const accPrice = "accessories" in TransactionData ? accTotalPrice(TransactionData.accessories) : 0;

        const totalPrice = [datePrice, motorPrice, accPrice];


        let props = {}
        props.nav = 'blue';
        props.navTrans = { step: 3 }
        props.scrollHeader = false;
        props.idTrip = id;
        props.kursUsd = '';
        props.notes = '';
        props.token = '';
        props.checkoutStatus = null;
        props.grandTotal = totalPrice ? totalPrice.reduce((total, amount) => total + amount) : '';

        return props;
    }
    constructor(props) {
        super(props);
        this.state = { ...props };
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleMidtrans = this.handleMidtrans.bind(this)
    }
    async componentDidMount() {
        const { grandTotal } = this.state

        if (!this.state.kursUsd) {
            const kursData = await getKursUsd()
            const usdPrice = grandTotal / kursData.jual
            this.setState({ kursUsd: Math.round(usdPrice) })
        }
    }
    async handleSubmit(e) {
        e.preventDefault();
        const { TripData, TransactionData, grandTotal } = this.state

        const postData = {
            'tripId': TripData.detail.id,
            'notes': this.state.notes,
            'price': grandTotal,
            'startDate': TransactionData.price.startTrip,
            'motor': !TransactionData.motor.bringOwnMotor ? TransactionData.motor.id : "",
            'accessories': TransactionData.accessories,
            'bringOwnMotor': TransactionData.motor.bringOwnMotor,
            'accessToken': this.state.token ? this.state.token.access_token : ""
        }
        // login(postData)
        let trans = await checkout(postData);

        if (trans) {
            this.setState({ 'checkoutStatus': { ...trans.object } })
        }
    }
    handleMidtrans(e){
        const { midtransToken } = this.state.checkoutStatus;

        snap.pay(midtransToken);
    }
    handleChange(e) {
        const target = e.target, value = target.value, name = target.name;
        this.setState({ notes: value });
    }
    renderCheckoutSuccess() {

        const { totalPrice, lastPayment, transactionCodeId } = this.state.checkoutStatus
        const { kursUsd, isMobileUa } = this.state
        console.log(this.state.checkoutStatus);
        
        return (
            <div className="container">
                <div className="py-3"></div>
                <div className="text-center">
                    <div><span className="icon-check1 h2 text-white p-3 bg-info rounded-circle"></span></div>
                    <div className="py-3" />
                    <h2 className="title-section">CHECK OUT SUCCESS!</h2>
                </div>
                <div className={!isMobileUa ? "d-flex justify-content-center mx-auto" : ""} style={{maxWidth:!isMobileUa ? "768px" : ""}}>
                    <div className={!isMobileUa ? "mr-4 w-50" : ""}>
                        <div>
                            <div className="d-flex justify-content-between align-items-center pt-3 pb-2" style={{ borderBottom: "1px solid" }}>
                                <div style={{ lineHeight: "14px" }}>
                                    <h5 className="title-section m-0">TRANSACTION NO.</h5>
                                </div>
                                <div>
                                    {/* <h4 className="title-section m-0">{this.state.checkoutStatus.transactionCodeId}</h4> */}
                                    <h6 className="text-uppercase m-0 text-primary font-weight-bold">{transactionCodeId}</h6>
                                </div>
                            </div>
                            <div className="d-flex justify-content-between align-items-center pt-2 pb-3">
                                <div style={{ lineHeight: "12px" }}>
                                    <h5 className="title-section m-0">TOTAL<br />INVOICE</h5>
                                </div>
                                <div>
                                    {/* <h4 className="title-section m-0">{this.state.checkoutStatus.transactionCodeId}</h4> */}
                                    <h4 className="m-0 text-primary font-weight-bold" dangerouslySetInnerHTML={{ __html: priceAbbr(false, totalPrice) }}></h4>
                                    <i className="text-sm text-primary float-right">approximate <b>${kursUsd}</b></i>
                                </div>
                            </div>
                        </div>
                        <div className="mt-3 mb-4">
                            <div className="p-4 text-sm rounded" style={{ backgroundColor: "#FFF3D9" }}>
                                <p className="m-0">Make sure you make your payment before <b><Moment unix format="DD MMM YYYY, HH:mm">{lastPayment / 1000}</Moment></b>, or your booking will be canceled</p>
                            </div>
                        </div>
                        <div className="mb-3">
                            <div className="p-3 text-sm text-center d-flex justify-content-between align-items-center rounded" style={{ backgroundColor: "#FFF3D9", lineHeight: "16px" }}>
                                <div><img src={process.env.HOST_DOMAIN + "/static/slicing/icon/icon_warning.svg"} /></div>
                                <div><b>MAKE SURE YOU ALREADY<br />COMPLETE YOUR PROFILE</b></div>
                                <div><img src={process.env.HOST_DOMAIN + "/static/slicing/icon/icon_warning.svg"} /></div>
                            </div>
                        </div>

                        <div className="mb-3">
                            {/* <a href={process.env.HOST_DOMAIN + "/user/profile"} className="d-block w-100 mb-3  btn btn-primary ">COMPLETE PROFILE</a> */}
                            <a href={process.env.HOST_DOMAIN + "/user/profile"} className="d-block w-100 btn btn-outline-dark rounded">Complete Profile</a>
                        </div>
                        <div className="mb-4">
                            <p className="mb-0 text-sm">
                                If you want to ask something, please contact our customer service via<br />WhatsApp on +62 0800 000 000
                        </p>
                        </div>
                    </div>
                    <div className={!isMobileUa ? "ml-4 w-50 pt-3" : ""}>
                        <div>
                            <div><span className="text-sm">Choose your payment Method</span></div>
                            <div className="mt-2">
                                <div className="d-flex justify-content-between align-items-center px-3 border rounded mb-3" style={{ height: "45px" }} onClick={this.handleMidtrans}>
                                    <div>
                                        <img src={process.env.HOST_DOMAIN + "/static/slicing/img/bca.png"} height="25" alt="BCA" />
                                    </div>
                                    <div>
                                        <span className="text-sm">Bank Transfer </span> <span className="text-sm icon-right-arrow text-primary position-relative" style={{ top: "1px", left: "5px" }} />
                                    </div>
                                </div>
                                {/* <div className="d-flex justify-content-between align-items-center px-3 border rounded" style={{ height: "45px" }} onClick={this.handleMidtrans}>
                                    <div className="d-flex justify-content-between align-items-center">
                                        <div className="mr-3"><img src={process.env.HOST_DOMAIN + "/static/slicing/img/visa.png"} alt="Visa" height="20" /></div>
                                        <div><img src={process.env.HOST_DOMAIN + "/static/slicing/img/mc.png"} alt="Master Card" height="25" /></div>
                                    </div>
                                    <div><span className="text-sm">Credit Card</span> <span className="text-sm icon-right-arrow text-primary position-relative" style={{ top: "1px", left: "5px" }} /></div>
                                </div> */}
                            </div>
                        </div>
                    </div>
                </div>


                <div style={{ padding: "40px" }}></div>
            </div>
        )
    }

    render() {
        const { idTrip, TransactionData, TripData, token, grandTotal, kursUsd, checkoutStatus, isMobileUa } = this.state
        const { coverLandscape, iconCover, title, location } = TripData.detail

        return (
            <div>
                <div style={{ padding: isMobileUa ? "40px" : "50px" }} />

                <div className={checkoutStatus != null ? "collapse" : ""}>
                    <div className="container position-relative">
                        {
                            !isMobileUa ?
                                <div className={"position-fixed cover-scroll"}>
                                    <SquareCover imgCover={coverLandscape} withIcon={true} iconTrip={iconCover} text={title} location={location} />
                                </div>
                                : ''
                        }
                        <div className={!isMobileUa ? "sidebar-container position-relative" : ""}>
                            <div className="mb-4 position-relative">
                                <a className="d-block pt-2 text-dark h4 title-section position-relative" href={process.env.HOST_DOMAIN + "/trip/" + idTrip} style={{ "zIndex": "10" }} ><span style={{ top: "-1px" }} className="icon-left-arrow text-sm text-primary position-relative"></span> Back</a>
                            </div>
                            <div style={{ top: "0", left: "0", right: "0" }} className="position-absolute">
                                <h2 className="title-section text-center mb-4">Checkout</h2>
                            </div>
                            <div className="mb-4">
                                <h4 className="title-section">DATE</h4>
                                <div className="bg-grayF2 p-3" style={{ borderRadius: "8px" }}>
                                    <h4 className={"title-section m-0 " + (isMobileUa ? "text-center" : "")}>
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
                                        <div className={"d-flex justify-content-between " + (isMobileUa ? "align-items-center" : "")}>
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
                                        <div className={"d-flex justify-content-between " + (isMobileUa ? "align-items-center" : "")}>
                                            <div style={{ lineHeight: "16px" }}>
                                                <h3 style={{ lineHeight: "normal" }} className="title-section m-0">{TransactionData.motor.title}</h3>
                                            </div>
                                            <div style={{ width: !isMobileUa ? "15%" : "30%" }}>
                                                <img src={TransactionData.motor.picture} className="img-fluid my-1" />
                                            </div>
                                        </div>
                                        <div className={"d-flex justify-content-between " + (isMobileUa ? "align-items-center" : "")}>
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
                                                        <div className={"d-flex justify-content-between " + (isMobileUa ? "align-items-center" : "")}>
                                                            <div className="mr-auto">
                                                                <div>
                                                                    <span className="text-sm text-gray80">Merchant Name</span>
                                                                    <h3 style={{ lineHeight: "normal" }} className="title-section">{item.title}</h3>
                                                                </div>
                                                            </div>
                                                            <div style={{ width: !isMobileUa ? "12%" : "30%" }}>
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
                                    <h4 className="text-primary m-0 font-weight-bold" dangerouslySetInnerHTML={{ __html: priceAbbr(false, grandTotal) }}></h4>
                                    <i className="text-sm text-primary float-right">approximate <b>${kursUsd}</b></i>
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
                                            <div className={!isMobileUa ? "d-flex align-items-center justify-content-between" : ""}>
                                                <div className={isMobileUa ? "mb-3" : ""}>
                                                    <span className="text-sm">To continue this process you must log in first!</span>
                                                </div>
                                                <div className={!isMobileUa ? "d-flex justify-content-between w-50" : ""}>
                                                    <Link href={'/login'} as={process.env.HOST_DOMAIN + '/login'} >
                                                        <a className={"d-block w-100 btn btn-info rounded " + (isMobileUa ? "mb-2" : "mr-2")}>LOG IN</a>
                                                    </Link>
                                                    <Link href={'/register'} as={process.env.HOST_DOMAIN + '/register'} >
                                                        <a className="d-block w-100  btn btn-secondary rounded">REGISTER</a>
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                        : ""}

                                <div className="pb-4 mb-3">
                                    <div className={!isMobileUa ? "d-flex justify-content-between mt-3" : ""}>
                                        <div className={(!isMobileUa ? "w-75 pt-2" : "pt-4")}>
                                            <p className={"text-sm mx-3 " + (isMobileUa ? "text-center" : "")}>You are accepting Ranstouring’s <a href={process.env.HOST_DOMAIN + '/term-condition'} className="text-primary"><b>Term and Condition</b></a> by clicking make payment button.</p>
                                        </div>
                                        <div className="pt-2" style={{ width: !isMobileUa ? "17%" : "" }}>
                                            {
                                                !token ?
                                                    <button className="btn btn-sm rounded btn-grayF2 w-100 text-softgray" disabled="disabled">Confirm</button>
                                                    :
                                                    <button className="btn btn-sm rounded btn-info w-100" onClick={this.handleSubmit}>Confirm</button>
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {checkoutStatus != null ? this.renderCheckoutSuccess() : ""}
                <style jsx global>{`
                    .rm-p p{
                        margin:0;
                    }
                    .cover-scroll{
                        width:27%;
                        z-index:100;
                    }
                    .cover-scroll .squareCover > div.overlay--img__blue{
                        padding-top:125%;
                        border-radius:6px;
                    }
                    .cover-scroll .squareCover > div.overlay--img__blue::before{
                        border-radius:6px;
                    }
                    .sidebar-container{
                        max-width:65%;
                        margin-left:auto;
                        position:relative;
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