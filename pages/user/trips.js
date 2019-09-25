import React from 'react'
import cookies from 'next-cookies'
import TabNavigation from '../../components/tabNavigation'
import TripCard from '../../components/tripCard'
import { withAuthSync } from "../../utils/user"
import { getUserTransaction, postConfirmTransaction } from "../../utils/userTransaction";

class UserTrip extends React.Component {
	static async getInitialProps({ req }) {
		// Inherit standard props from the Page (i.e. with session data)

		let props = {}
		let { token } = cookies({ req })
		let objToken = JSON.parse(token)

		if (typeof window === 'undefined') {
			try {

				const userTransactionData = await getUserTransaction(objToken.access_token)

				props.trips = userTransactionData.object
				props.nav = 'blue'
				props.footer = 'transparent'
				props.scrollHeader = false
			} catch (e) {
				props.error = 'Unable to fetch AsyncData on server';
			}
		}
		return props;
	}
	constructor(props) {
		super(props);

		this.state = {
			...props,
			pictureConfirm: '', isViewConfirm: false, selectedTransactionCode: '',

			file: {},
		};

		this.handleFileSelect = this.handleFileSelect.bind(this);
		this.clickUpload = this.clickUpload.bind(this);
		this.form = React.createRef();
		this.handleChange = this.handleChange.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
	}
	clickUpload(e) {
		let id = e.target.id
		//this.id.click();
		if (id == "pictureConfirm") {
			this.pictureConfirm.click();
		}
	}
	handleFileSelect(event) {
		let name = event.target.name;
		let value = URL.createObjectURL(event.target.files[0])
		this.setState({
			[name]: value,
			file: event.target.files[0]
		})

		/* this.setState({
            logo: event.target.files[0],
            files: URL.createObjectURL(event.target.files[0])
		}) */

	}

	handleChange(e) {
		const target = e.target, value = target.value, name = target.name;
		this.setState({ [name]: value });
	}
	async handleSubmit(e) {
		e.preventDefault();

		const postData = { 'codeTransaction': this.state.selectedTransactionCode, 'bank': this.state.bank, 'accountNumber': this.state.accountNumber, 'accountName': this.state.accountName, 'file': this.state.file }
		await postConfirmTransaction(postData, this.state.token.access_token)

	}
	renderDetailConfirm() {
		return (
			<div className="container">
				<div className="position-absolute">
					<span className="pt-2 d-block text-dark h4 title-section" onClick={() => this.handleViewConfirm(false)} ><span style={{ top: "-1px" }} className="icon-left-arrow text-sm text-primary position-relative"></span> Back</span>
				</div>
				<h2 className="text-center title-section">Confirm</h2>
				<form className="mt-4" ref={this.form} onSubmit={this.handleSubmit}>
					<div className="form-group">
						<label className="text-black text-sm">Transaction Number*</label>
						<input type="text" style={{ textTransform: "uppercase" }} className="form-control" placeholder="Kode Transaksi" name="codeTransaction" value={this.state.selectedTransactionCode} readOnly />
					</div>
					<div className="form-group">
						<label className="text-black text-sm">Bank Account*</label>
						<select name="bank" className="form-control" onChange={this.handleChange}>
							<option value="">Choose Bank Account</option>
							<option value="BCA">BCA</option>
							<option value="Bank Mandiri">Bank Mandiri</option>
							<option value="BNI">BNI</option>
							<option value="CIMB Niaga">CIMB Niaga</option>
						</select>
					</div>
					<div className="form-group">
						<label className="text-black text-sm">Bank Account No.*</label>
						<input type="number" name="accountNumber" className="form-control" placeholder="Bank Account Number" onChange={this.handleChange} />
					</div>
					<div className="form-group">
						<label className="text-black text-sm">Bank Account Name*</label>
						<input type="text" name="accountName" className="form-control" placeholder="Bank Account Name" onChange={this.handleChange} />
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
						<button type="submit" className="btn btn-primary mb-4 d-block w-100">
							Confirm Payment
						</button>
					</div>
				</form>
			</div>
		)
	}
	handleViewConfirm(toogle, transCode, e) {
		this.setState({ isViewConfirm: toogle, selectedTransactionCode: transCode })
		if (toogle) {
			this.setState({ pictureConfirm: '', file: {} })
		}
	}
	render() {
		let { token, user } = this.props;
		console.log(token);
		
		const tabMenuData = {
			menu: [
				{ name: 'Gallery', url: process.env.HOST_DOMAIN + '/user/gallery', path: '/user/gallery', active: false }, 
				{ divider: true }, 
				{ name: 'Next Trips', url: process.env.HOST_DOMAIN + '/user/trips', path: '/user/trips', active: true }
			]
		};

		return (
			<div className="mt-5 pt-5 pb-4">
				<div className={this.state.isViewConfirm ? "collapse" : ""}>
					<div className="container">
						<div className="d-flex justify-content-between mb-4 pb-2">
							<div className="d-flex justify-content-start">
								<div className="">
									<img
										className="rounded-circle border border-white"
										width="40"
										height="40"
										src="http://kampus-stikespanakkukang.ac.id/assets/images/photo_empty.png"
									/>
								</div>

								<div className="ml-3" style={{ lineHeight: "2px" }}>
									{/* <b className="h3 ml-4">{user.fullName ? user.fullName : user.email.substring(0, user.email.indexOf("@"))}</b> */}

									<b className="h3 title-section">{user.fullName ? user.fullName : user.email.substring(0, user.email.indexOf("@"))}</b><br />
									<span className="text-sm">{user.email}</span>
								</div>
							</div>
							<div>{/* <a href={process.env.HOST_DOMAIN + '/user/profile'} className="text-primary text-sm"><b>EDIT</b></a> */}</div>
						</div>
						<div className="mb-4">
							<TabNavigation {...tabMenuData} />
						</div>
						{this.props.trips ?
							<div>
								{this.props.trips.map((item, key) => <TripCard key={key}  {...item} isTransaction={true} index={key} clickConfirm={(e) => this.handleViewConfirm(true, item.code, e)} />)}
							</div>
							:
							<div className="pt-4" style={{ minHeight: "50vh" }}>
								<div className="alert alert-danger" role="alert">
									<h5 className="text-center font-italic title-section m-0">Sorry, You don't Have Any Trips!</h5>
								</div>
							</div>
						}
					</div>
				</div>
				<div>
					{this.state.isViewConfirm ? this.renderDetailConfirm() : ""}
				</div>
			</div>
		)
	}
}

export default withAuthSync(UserTrip)