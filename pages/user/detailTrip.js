import React from 'react'
import { withAuthSync } from "../../utils/user"
import Moment from 'react-moment'
import { getDetailUserTransaction } from "../../utils/userTransaction"

class UserDetailTrip extends React.Component {
    static async getInitialProps({ req, query: { id } }) {
        // Inherit standard props from the Page (i.e. with session data)
        let props = {};

        if (typeof window === 'undefined') {
            try {
                props.nav = 'blue';
                props.footer = 'transparent';
                const userTransaction = await getDetailUserTransaction('', id);

                props.userTransaction = userTransaction.object
            } catch (e) {
                props.error = 'Unable to fetch AsyncData on server';
            }
        }
        return props;
    }
    constructor(props) {
        super(props);

        this.state = { ...props, isViewConfirm: false };
        this.handleFileSelect = this.handleFileSelect.bind(this);
        this.clickUpload = this.clickUpload.bind(this);
    }
    clickUpload(e) {
        let id = e.target.id
        //this.id.click();
        if (id == "pictureConfirm") {
            this.pictureConfirm.click();
        }
    }
    handleFileSelect(event) {
        console.log(event.target.files[0]);
        let name = event.target.name;
        let value = URL.createObjectURL(event.target.files[0])
        this.setState({
            [name]: value
        })

		/* this.setState({
            logo: event.target.files[0],
            files: URL.createObjectURL(event.target.files[0])
        }) */
    }
    renderPrice(data, index) {
        return (
            <div className="d-flex justify-content-between align-items-center pt-3">
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
    renderTrip() {
        const { userTransaction } = this.state
        console.log(userTransaction);

        return (
            <div className="mb-4">
                <div className="mb-2 position-relative">
                    <img className="img-fluid" src={process.env.HOST_URL + userTransaction.coverLandscape} />
                    <div className="position-absolute" style={{ top: "0", bottom: "0", left: "0", right: "0", margin: "auto", width: "60%", height: "55%", textAlign: "center" }} >
                        <img height="50" src={process.env.HOST_DOMAIN + "/static/slicing/img/destination/symbol_dieng.svg"} />
                        <h1 style={{ lineHeight: ".8em", fontSize: "3em" }} className="mt-2	 title-section text-white mx-auto">{userTransaction.title}</h1>
                    </div>
                </div>
                <div className="container">
                    <div className="mb-2">
                        {userTransaction.paymentStatus == 'WAITING' ?
                            <div>
                                <span className="badge badge-warning" style={{ fontWeight: "400", fontStyle: "italic" }}>Waiting for payment</span>
                                <div className="mt-1 text-black text-sm">
                                    until <b><Moment unix format="DD MMM YYYY, HH:mm">{userTransaction.expiredDate / 1000}</Moment></b>
                                </div>
                            </div> : ''}

                        {userTransaction.paymentStatus == 'BOOKED' ?
                            <div>
                                <span className="badge badge-warning" style={{ fontWeight: "400", fontStyle: "italic" }}>Waiting for confirmation</span>
                            </div> : ''}

                        {userTransaction.paymentStatus == 'PAID' ?
                            <div>
                                <span className="badge badge-info" style={{ fontWeight: "400", fontStyle: "italic" }}>✓  Paid</span>
                            </div> : ''}

                    </div>
                    <div className="d-flex justify-content-between align-items-center text-sm">
                        <div style={{ lineHeight: 'normal' }}>
                            <span className="d-block font-weight-bold text-black">{userTransaction.location}</span>
                            <span className="text-gray80 pr-3">{userTransaction.duration} Days Trip</span>
                            <span className="text-gray80">Start From ${userTransaction.tripPrice}</span>
                        </div>
                        <div>
                            <span className="icon-logogram_r2r h5 text-black"></span>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    renderDetailConfirm() {
        return (
            <div className="container">
                <div className="position-absolute">
                    <span className="pt-2 d-block text-dark h4 title-section" onClick={() => this.handleViewConfirm(false)} ><span style={{ top: "-1px" }} className="icon-left-arrow text-sm text-primary position-relative"></span> Back</span>
                </div>
                <h2 className="text-center title-section">Confirm</h2>
                <form className="mt-4">
                    <div className="form-group">
                        <label className="text-black text-sm">Transaction Number*</label>
                        <input type="text" style={{ textTransform: "uppercase" }} className="form-control" placeholder="Your Email" value={this.state.userTransaction.code} readOnly />
                    </div>
                    <div className="form-group">
                        <label className="text-black text-sm">Bank Account*</label>
                        <select className="form-control">
                            <option>Choose Bank Account</option>
                            <option>BCA</option>
                            <option>Bank Mandiri</option>
                            <option>BNI</option>
                            <option>CIMB Niaga</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label className="text-black text-sm">Bank Account No.*</label>
                        <input type="number" className="form-control" placeholder="Bank Account Number" />
                    </div>
                    <div className="form-group">
                        <label className="text-black text-sm">Bank Account Name*</label>
                        <input type="number" className="form-control" placeholder="Bank Account Name" />
                    </div>
                    <div className="form-group">
                        <label className="text-black text-sm">Upload Picture</label>
                        <div style={{ borderRadius: '16px', minHeight: '200px', background: "#E6E6E6 url(" + this.state.pictureConfirm + ") center/cover no-repeat" }}
                            className="border border-softgray text-center d-flex"
                        >
                            <div className="align-self-center mx-auto" >
                                <span id="pictureConfirm"
                                    onClick={this.clickUpload}
                                    style={{ fontSize: '5em' }}
                                    className="icon-icon_id_card d-block text-gray80 mb-3"
                                />
                                <span className="font-italic text-gray80">Upload Picture</span>
                            </div>
                            <input
                                type="file"
                                ref={(input) => (this.pictureConfirm = input)}
                                name="pictureConfirm"
                                hidden
                                onChange={this.handleFileSelect}
                            />
                        </div>
                    </div>
                    <div className="text-center mb-3">
                        <button type="button" className="btn btn-primary mb-4 d-block w-100">
                            Confirm Payment
						</button>
                    </div>
                </form>
            </div>
        )
    }
    handleViewConfirm(toogle, transCode, e) {
        this.setState({ isViewConfirm: toogle })
    }
    render() {
        const { userTransaction } = this.state

        return (
            <div>
                <div className={this.state.isViewConfirm ? "collapse" : ""}>
                    <div className="pb-2">
                        {this.renderTrip()}
                    </div>
                    <div className="container">
                        <div className="mb-4">
                            <h4 className="title-section">DATE</h4>
                            <div className="bg-grayF2 p-3" style={{ borderRadius: "8px" }}>
                                <h4 className="title-section text-center m-0">
                                    <Moment unix format="DD MMM YY">{userTransaction.startDate / 1000}</Moment> - <Moment unix format="DD MMM YY">{userTransaction.finishDate / 1000}</Moment> </h4>
                            </div>
                        </div>

                        <div className="mb-4">
                            <h4 className="title-section">MEETING POINT</h4>
                            <div className="bg-grayF2 p-3" style={{ borderRadius: "8px" }} dangerouslySetInnerHTML={{ __html: userTransaction.meetingPoint }}>

                            </div>
                        </div>

                        <div className="mb-4">
                            <h4 className="title-section">Gear</h4>
                            <div className="bg-grayF2 p-3 position-relative" style={{ borderRadius: "8px", minHeight: "150px" }}>
                                <h4 style={{ lineHeight: "normal" }} className="title-section w-75">{userTransaction.motor.brand} {userTransaction.motor.title}</h4>
                                <div className="position-absolute" style={{ right: "0", zIndex: "1", bottom: "-30px" }}>
                                    <img src={process.env.HOST_URL + userTransaction.motor.picture} height="120" />
                                </div>
                            </div>
                        </div>
                        <div className="py-3"></div>
                        <div className="mb-4">
                            <div className="bg-grayF2 p-3 position-relative" style={{ borderRadius: "8px" }}>
                                <div>
                                    <div className="d-flex justify-content-between align-items-center pb-3 border-softgray" style={{ borderBottom: "1px solid" }}>
                                        <div style={{ lineHeight: "14px" }}>
                                            <h5 className="title-section m-0">EXPLORING </h5>
                                            <span style={{ fontSize: "80%" }} className="text-sm">{userTransaction.title}</span>
                                        </div>
                                        <div>
                                            <h3 className="title-section m-0">$ {userTransaction.tripPrice}</h3>
                                        </div>
                                    </div>
                                    <div className="d-flex justify-content-between align-items-center pt-3 pb-3 border-softgray" style={{ borderBottom: "1px solid" }}>
                                        <div style={{ lineHeight: "14px" }}>
                                            <h5 className="title-section m-0">BIKE</h5>
                                            <span style={{ fontSize: "80%" }} className="text-sm">{userTransaction.motor.brand} {userTransaction.motor.title}</span>
                                        </div>
                                        <div>
                                            <h3 className="title-section m-0">$ {userTransaction.motor.price}</h3>
                                        </div>
                                    </div>
                                    {
                                        userTransaction.accessories.map((item, index) => (
                                            this.renderPrice(item, index)
                                        ))
                                    }


                                </div>
                            </div>
                        </div>
                        <div className="mb-4">
                            <div className="d-flex justify-content-between align-items-center">
                                <div><h4 className="title-section">Total</h4></div>
                                <div><h1 className="title-section text-primary">$ {userTransaction.price}</h1></div>
                            </div>
                        </div>

                        {userTransaction.paymentStatus == 'WAITING' ?
                            <div className="mt-3">
                                <a onClick={(e) => this.handleViewConfirm(true, userTransaction.code, e)} className="btn btn-primary d-block text-white">Confirm Payment</a>
                            </div>
                            : ''}
                    </div>
                </div>

                <div>
                    <div className="py-3" />
                    {this.state.isViewConfirm ? this.renderDetailConfirm() : ""}
                </div>
            </div>
        )
    }
}

export default UserDetailTrip