import React from 'react'
import Link from 'next/link'
import { throws } from 'assert';
import Moment from 'react-moment'
import { checkout } from '../../utils/trips'

export default class extends React.Component {
    static async getInitialProps({ req, query: { idTrip }, res }) {
        if (res) {
            res.writeHead(302, {
                Location: process.env.HOST_DOMAIN + '/trip/' + idTrip
            })
            res.end()
        }
        let props = {};
        props.nav = 'blue';
        props.navTrans = { step: 3 }
        props.footer = 'transparent';
        props.idTrip = idTrip;
        props.transaction = {};
        props.checkoutStatus = null;
        props.notes = ''

        return props;
    }
    constructor(props) {
        super(props);

        this.state = { ...props };
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }
    handleChange(e) {
        const target = e.target, value = target.value, name = target.name;
        this.setState({ notes: value });
    }
    async handleSubmit(e) {
        e.preventDefault();

        const postData = {
            'tripId': this.state.transaction.idTrip,
            'notes': this.state.notes,
            'price': this.state.transaction.price.reduce((total, amount) => total + amount),
            'startDate': this.state.transaction.startDate,
            'motor': !this.state.transaction.bringOwnMotor ? this.state.transaction.motor.id : "",
            'accessories': !this.state.transaction.bringOwnHelm ? this.state.transaction.accesories : [],
            'bringOwnMotor': this.state.transaction.bringOwnMotor,
            'bringOwnHelm': this.state.transaction.bringOwnHelm,
            'accessToken': this.state.token ? this.state.token.access_token : ""
        }
        // login(postData)
        let trans = await checkout(postData);

        if (trans) {
            this.setState({ 'checkoutStatus': { ...trans.object } })
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.checkoutStatus != prevState.checkoutStatus) {
            this.props.checkoutStatusState(this.state.checkoutStatus)
        }
    }

    renderPrice(data, index) {
        return (
            <div key={index} className="d-flex justify-content-between align-items-center pt-3">
                <div style={{ lineHeight: "14px" }}>
                    <h5 className="title-section m-0">ADDITIONAL COST</h5>
                    <span style={{ fontSize: "80%" }} className="text-sm">{data.title}</span>
                </div>
                <div>
                    <h3 className="title-section m-0">$ {data.price}</h3>
                </div>
            </div>
        )
    }

    renderCheckoutSuccess() {
        const { totalPrice, lastPayment, transactionCodeId } = this.state.checkoutStatus
        return (
            <div className="container">
                <div className="py-3"></div>
                <div className="text-center">
                    <div><span className="icon-check1 h2 text-white p-3 bg-info rounded-circle"></span></div>
                    <div className="py-3" />
                    <h2 className="title-section">CHECK OUT SUCCESS!</h2>
                </div>
                <div>
                    <div className="d-flex justify-content-between align-items-center pt-3 pb-2" style={{ borderBottom: "1px solid" }}>
                        <div style={{ lineHeight: "14px" }}>
                            <h5 className="title-section m-0">TRANSACTION NO.</h5>
                        </div>
                        <div>
                            {/* <h4 className="title-section m-0">{this.state.checkoutStatus.transactionCodeId}</h4> */}
                            <h5 className="title-section m-0 text-primary">{transactionCodeId}</h5>
                        </div>
                    </div>
                    <div className="d-flex justify-content-between align-items-center pt-2 pb-3">
                        <div style={{ lineHeight: "12px" }}>
                            <h5 className="title-section m-0">TOTAL<br />INVOICE</h5>
                        </div>
                        <div>
                            {/* <h4 className="title-section m-0">{this.state.checkoutStatus.transactionCodeId}</h4> */}
                            <h2 className="title-section m-0 text-primary">$ {totalPrice}</h2>
                        </div>
                    </div>
                </div>
                <div className="mt-3 mb-4">
                    <div className="p-4 text-sm" style={{ backgroundColor: "#FFF3D9" }}>
                        <p>Make sure you make your payment before <b><Moment unix format="DD MMM YYYY, HH:mm">{lastPayment / 1000}</Moment></b>, or your booking will be canceled</p>
                        <p>Please make your payment to <b><br />BCA - Road2ring<br />000 000 0001</b></p>
                        <hr className="border-black" />
                        <p className="mb-0">
                            If you want to ask something, please contact our customer service via<br />WhatsApp on +62 0800 000 000
                        </p>
                    </div>
                </div>
                <div className="mb-3">
                    <div className="p-3 text-sm text-center d-flex justify-content-between align-items-center" style={{ backgroundColor: "#FFF3D9", lineHeight: "16px" }}>
                        <div><img src={process.env.HOST_DOMAIN + "/static/slicing/icon/icon_warning.svg"} /></div>
                        <div><b>MAKE SURE YOU ALREADY<br />COMPLETE YOUR PROFILE</b></div>
                        <div><img src={process.env.HOST_DOMAIN + "/static/slicing/icon/icon_warning.svg"} /></div>
                    </div>
                </div>

                <div className="mb-4 pb-2">
                    {/* <a href={process.env.HOST_DOMAIN + "/user/profile"} className="d-block w-100 mb-3  btn btn-primary ">COMPLETE PROFILE</a> */}
                    <a href={process.env.HOST_DOMAIN + "/user/trips"} className="d-block w-100  btn btn-info">SEE PAYMENT STATUS</a>
                </div>
                <div className="text-center">
                    <a href={process.env.HOST_DOMAIN + "/"} className="text-primary"><b>Back to Home</b></a>
                </div>
            </div>
        )
    }

    render() {


        const { idTrip, transaction, trip, token, checkoutStatus } = this.state
        console.log(this.state);

        return (
            <div>
                <div className="py-2"></div>
                <div className={checkoutStatus != null ? "collapse" : ""}>
                    <div className="container">
                        <div className="mb-3">
                            <a className="text-dark h4 title-section" href={process.env.HOST_DOMAIN + "/trip/" + idTrip} ><span style={{ top: "-1px" }} className="icon-left-arrow text-sm text-primary position-relative"></span> Back</a>
                        </div>
                        <div>
                            <h2 className="title-section text-center mb-4">Check Out</h2>
                        </div>
                        <div className="mb-4">
                            <h4 className="title-section">DATE</h4>
                            <div className="bg-grayF2 p-3" style={{ borderRadius: "8px" }}>
                                <h4 className="title-section text-center m-0">
                                    <Moment unix format="DD MMM YY">{this.state.transaction.startDate / 1000}</Moment> - <Moment unix format="DD MMM YY">{this.state.transaction.endDate / 1000}</Moment> </h4>
                            </div>
                        </div>

                        <div className="mb-4">
                            <h4 className="title-section">MEETING POINT</h4>
                            <div className="bg-grayF2 p-3" style={{ borderRadius: "8px" }} dangerouslySetInnerHTML={{ __html: transaction.meetingPoint }}>

                            </div>
                        </div>

                        {
                            !transaction.bringOwnMotor ?
                                <div className="mb-4">
                                    <h4 className="title-section">Gear</h4>
                                    <div className="bg-grayF2 p-3 position-relative" style={{ borderRadius: "8px", minHeight: "150px" }}>
                                        <h4 style={{ lineHeight: "normal" }} className="title-section w-75">{transaction.motor.brand} {transaction.motor.title}</h4>
                                        <div className="position-absolute" style={{ right: "0", zIndex: "1", bottom: "-30px" }}>
                                            <img src={transaction.motor.picture} height="120" />
                                        </div>
                                    </div>
                                    <div className="py-3"></div>
                                </div>
                                : ''
                        }

                        <div className="mb-4">
                            <div className="bg-grayF2 p-3 position-relative" style={{ borderRadius: "8px" }}>
                                <div>
                                    <div className="d-flex justify-content-between align-items-center pb-3 border-softgray" style={{ borderBottom: "1px solid" }}>
                                        <div style={{ lineHeight: "14px" }}>
                                            <h5 className="title-section m-0">EXPLORING </h5>
                                            <span style={{ fontSize: "80%" }} className="text-sm">{transaction.tripTitle}</span>
                                        </div>
                                        <div>
                                            <h3 className="title-section m-0">$ {transaction.price[0]}</h3>
                                        </div>
                                    </div>
                                    <div className="d-flex justify-content-between align-items-center pt-3 pb-3 border-softgray" style={{ borderBottom: "1px solid" }}>
                                        <div style={{ lineHeight: "14px" }}>
                                            <h5 className="title-section m-0">BIKE</h5>
                                            <span style={{ fontSize: "80%" }} className="text-sm">{!transaction.bringOwnMotor ? transaction.motor.brand + transaction.motor.title : '-'}</span>
                                        </div>
                                        <div>
                                            <h3 className="title-section m-0">$ {!transaction.bringOwnMotor ? transaction.motor.price : '0'}</h3>
                                        </div>
                                    </div>
                                    {
                                        !transaction.bringOwnHelm ?
                                            transaction.accesories.map((item, index) => (
                                                this.renderPrice(item, index)
                                            ))
                                            :
                                            <div className="d-flex justify-content-between align-items-center pt-3">
                                                <div style={{ lineHeight: "14px" }}>
                                                    <h5 className="title-section m-0">ADDITIONAL COST</h5>
                                                    <span style={{ fontSize: "80%" }} className="text-sm">-</span>
                                                </div>
                                                <div>
                                                    <h3 className="title-section m-0">$ 0</h3>
                                                </div>
                                            </div>

                                    }


                                </div>
                            </div>
                        </div>
                        <div className="mb-4">
                            <div className="d-flex justify-content-between align-items-center">
                                <div><h4 className="title-section">Total</h4></div>
                                <div><h1 className="title-section text-primary">$ {this.state.transaction.price.reduce((total, amount) => total + amount)}</h1></div>
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

                        <div>
                            <div className="pt-4">
                                <p className="text-center text-sm mx-3">
                                    You are accepting Road2ring’s <a href={process.env.HOST_DOMAIN+'/term-condition'} className="text-primary"><b>Term and Condition</b></a> by clicking make payment button.
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
                </div>
                {checkoutStatus != null ? this.renderCheckoutSuccess() : ""}
                <div className="py-2"></div>
            </div>
        )
    }
}