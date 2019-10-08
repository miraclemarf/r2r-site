import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import cookies from 'next-cookies'
import { Container, Row } from 'reactstrap'
import TabNavigation from '../../components/tabNavigation'
import InfiniteScroll from 'react-infinite-scroller'
import TripCard from '../../components/tripCard'
import LoaderCard from '../../components/cards/LoaderCard'
import { withAuthSync, getUserTransaction, postConfirmTransaction } from "../../utils";
// import { throws } from 'assert';

class UserTrip extends React.Component {
	static async getInitialProps({ store, req }) {
		// Inherit standard props from the Page (i.e. with session data)
		let props = { 
			nav: 'blue', 
			footer: 'transparent', 
			scrollHeader: false,
			fetchLimit: 5
		}
		let { token } = cookies({ req })
		let objToken = JSON.parse(token)
		let stores = await store.getState()
		try {
			if(!stores.MyTransactions) await store.dispatch(getUserTransaction(objToken.access_token, 0, props.fetchLimit))
		} catch (e) {
			props.error = 'Unable to fetch AsyncData on server'
		}
		return props
	}
	constructor(props) {
		super(props)
		this.state = {
			fetchPage: 1, 
			fetchLimit: props.fetchLimit,
			fetchHasMore: props.MyTransactions && props.MyTransactions.length >= props.fetchLimit,
			fetchStop: props.StopFetchMyTransanctions,
			myTransactions: props.MyTransactions,
			pictureConfirm: '', 
			isViewConfirm: false, 
			selectedTransactionCode: '',
			file: {}
		}
		this.form = React.createRef()
	}

	UNSAFE_componentWillReceiveProps(nextProps) {
		const { MyTransactions, StopFetchMyTransanctions } = nextProps
		const { fetchLimit } = this.state
		const pages = Math.ceil(MyTransactions.length / fetchLimit)
		this.setState({
			myTransactions: MyTransactions,
			fetchHasMore: MyTransactions.length / fetchLimit >= pages,
			fetchStop: StopFetchMyTransanctions,
			fetchPage: pages
		})
	}

	loadMoreMyTransaction = () => {
		const { fetchPage, fetchLimit, fetchStop, fetchHasMore } = this.state
		const { token } = this.props
		if(!fetchStop && fetchHasMore) {
			this.props.getUserTransaction(token.access_token, fetchPage, fetchLimit, true)
		}
	}

	clickUpload = (e) => {
		let id = e.target.id
		//this.id.click();
		if (id == "pictureConfirm") {
			this.pictureConfirm.click();
		}
	}
	handleFileSelect = (event) => {
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

	handleChange = (e) => {
		const target = e.target, value = target.value, name = target.name
		this.setState({ [name]: value })
	}
	handleSubmit = async (e) => {
		e.preventDefault()
		const { selectedTransactionCode, bank, accountNumber, accountName, file, token } = this.state
		const postData = { 
			codeTransaction: selectedTransactionCode, 
			bank: bank, 
			accountNumber: accountNumber, 
			accountName: accountName, 
			file: file 
		}
		await postConfirmTransaction(postData, token.access_token)
	}
	renderDetailConfirm() {
		return (
			<Container>
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
			</Container>
		)
	}
	handleViewConfirm(toogle, transCode, e) {
		this.setState({ isViewConfirm: toogle, selectedTransactionCode: transCode })
		if (toogle) {
			this.setState({ pictureConfirm: '', file: {} })
		}
	}
	render() {
		let { token, user } = this.props
		console.log(user)
		const { myTransactions, isViewConfirm, fetchStop, fetchHasMore } = this.state
		// console.log(token);
		const tabMenuData = {
			menu: [
				{ name: 'Gallery', url: `${process.env.HOST_DOMAIN}/user/gallery`, path: '/user/gallery', active: false }, 
				{ divider: true }, 
				{ name: 'Next Trips', url: `${process.env.HOST_DOMAIN}/user/trips`, path: '/user/trips', active: true }
			]
		}

		return (
			<div role="main" className="mt-5 pt-5">
				<Container className="container-sm px-0">
					<div className={isViewConfirm ? "collapse" : ""}>
						<div className="container p-0">
							<div className="d-flex justify-content-between mb-4 px-3">
								<div className="d-flex justify-content-start">
									<div className="mt-1">
										<img
											className="rounded-circle border border-white"
											width="40"
											height="40"
											src={user.userPicture ? userPicture : `http://kampus-stikespanakkukang.ac.id/assets/images/photo_empty.png`}
										/>
									</div>

									<div className="ml-2" style={{ lineHeight: "2px" }}>
										{/* <b className="h3 ml-4">{user.fullName ? user.fullName : user.email.substring(0, user.email.indexOf("@"))}</b> */}

										<b className="h3 title-section">{user.fullName ? user.fullName : user.email.substring(0, user.email.indexOf("@"))}</b><br />
										<span className="text-sm">{user.email}</span>
									</div>
								</div>
								<div>{/* <a href={process.env.HOST_DOMAIN + '/user/profile'} className="text-primary text-sm"><b>EDIT</b></a> */}</div>
							</div>
							<div 
								className="position-sticky py-3 mb-1 px-1 bg-white"
								style={{top: "64px", zIndex: 9}}
							>
								<TabNavigation {...tabMenuData} />
							</div>
							{
								myTransactions ?
									<InfiniteScroll
										pageStart={0}
										loadMore={this.loadMoreMyTransaction}
										hasMore={!fetchStop && fetchHasMore}
										loader={
											<LoaderCard 
												key={0}
												loaderColor="primary"
												loaderSize="md"
												loaderType="spinner"
											/>
										}
									>
										{
											<Row className="px-3">{
												myTransactions.map((item, key) => (
													<TripCard 
														key={key}  
														{...item} 
														isTransaction={true} 
														index={key} 
														clickConfirm={(e) => this.handleViewConfirm(true, item.code, e)} 
													/>
												))
											}</Row>
										} 
									</InfiniteScroll>
									:
									<div className="pt-4" style={{ minHeight: "50vh" }}>
										<div className="alert alert-danger" role="alert">
											<h5 className="text-center font-italic title-section m-0">Sorry, You don't Have Any Trips!</h5>
										</div>
									</div>
							}
						</div>
					</div>
					<div>{ isViewConfirm ? this.renderDetailConfirm() : "" }</div>
				</Container>
			</div>
		)
	}
}

const mapDispatchToProps = dispatch => {
	return {
		getUserTransaction: bindActionCreators(getUserTransaction, dispatch)
	}
}
export default connect(state => state, mapDispatchToProps)(withAuthSync(UserTrip))