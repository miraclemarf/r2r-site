import React from 'react'
import Link from 'next/link'
import { Container } from 'reactstrap'
import TabNavigation from '../components/tabNavigation'
// import Page from '../components/page';
import Moment from 'react-moment'
import { register } from '../utils/user'

export default class extends React.Component {
	static async getInitialProps({ req }) {
		// Inherit standard props from the Page (i.e. with session data)
		let props = {
			nav: 'blue',
			transaction: {},
			scrollHeader: false
		}
		return props
	}
	constructor(props) {
		super(props);

		this.state = {
			...props,
			email: '',
			password: '',
			birthday: '',
			hari: '',
			bulan: '',
			tahun: '',
			error: '',
			isSubmitted: false
		};
		this.form = React.createRef();
		this.handleChange = this.handleChange.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
		this.validate = this.validate.bind(this)
	}
	validate() {
		this.form.current.reportValidity();
	}
	handleChange(e) {
		const target = e.target, value = target.value, name = target.name;
		this.setState({ [name]: value });
		if (name == 'email') {
			this.setState({ 'error': '' })
		}
	}
	async handleSubmit(e) {
		const { TransactionData, TripData, email, password } = this.state
		e.preventDefault();
		let isHasTransaction = false
		if(TransactionData){
			
			isHasTransaction = Object.keys(TransactionData).length === 0 ? false : true
		}
		let idTrip = isHasTransaction ? TripData.detail.id : ""
		let userBirthday = 0
		if (this.state.hari && this.state.bulan && this.state.tahun) {
			let dateuser = this.state.tahun + '-' + this.state.bulan + '-' + this.state.hari
			userBirthday = Math.round(new Date(dateuser + " 00:00:00.000").getTime())
		}

		const postData = { 'email': this.state.email, 'password': this.state.password, 'userBirthday': userBirthday, 'isHasTransaction': isHasTransaction, 'idTrip': idTrip }
		//console.log(postData);


		const res = await register(postData)
		if (res) {
			this.setState({ 'error': res.message })
		}


	}
	render() {
		const tabMenuData = {
			menu: [
				{ name: 'Login', url: `${process.env.HOST_DOMAIN}/login`, path: '/login', active: false }, 
				{ divider: true }, 
				{ name: 'Register', url: `${process.env.HOST_DOMAIN}/register`, path: '/register', active: true }
			]
		}
		const range = (start, end, length = end - start) => Array.from({ length }, (_, i) => start + i)
		const hari = range(1, 32)
		const bulan = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
		const tahun = range(1930, 2002)
		return (
			<div role="main" className="mt-4 pt-5">
                <Container className="container-sm px-0">
					<div 
						className="position-sticky py-3 mb-1 px-1 bg-white"
						style={{top: "64px", zIndex: 9}}
					>
						<TabNavigation {...tabMenuData} />
					</div>
					{/* <div className="mb-3">
						<a href="#" className="title-section btn btn-sm btn-primary d-block text-white mb-2">
							<div className="d-flex justify-content-center py-2">
								<span className="icon-facebook" /> <h4 className="mb-0 ml-3">CONTINUE WITH FACEBOOK</h4>
							</div>
						</a>
						<a href="#" className="title-section btn btn-sm btn-white d-block text-dark border-dark">
							<div className="d-flex justify-content-center py-2">
								<span style={{ "background": "url(/preview/static/slicing/icon/Google__G__Logo.svg) no-repeat", "width": "25px", "height": "25px" }} /> <h4 className="mb-0 ml-3">CONTINUE WITH Google</h4>
							</div>
						</a>
					</div>
					<div className="mb-3">
						<div className="separatorLine position-relative text-center">
							<span className="position-relative d-block bg-white mx-auto" style={{ width: '10%' }}>
								OR
							</span>
						</div>
					</div> */}
					<Container style={{maxWidth:"480px", padding: "20px"}}>
						{/* <h2 className="title-section text-center">REGISTER WITH EMAIL</h2> */}
						{
							this.state.error != '' ?
								<div className="alert alert-danger" role="alert">
									{this.state.error}
								</div> : ''
						}
						<form ref={this.form} onSubmit={this.handleSubmit}>
							<div className="form-group mb-3">
								<label className="text-black text-sm">Email</label>
								<input type="email" name="email" className="form-control rounded-lg" placeholder="Your Email" onChange={this.handleChange} required />
							</div>
							<div className="form-group mb-3">
								<label className="text-black text-sm">Create Password</label>
								<input type="password" name="password" className="form-control rounded-lg" placeholder="Create your password" minLength={6} onChange={this.handleChange} required />
							</div>
							<div className="form-row">
								<div className="form-group col">
									<label>Birthday</label>
									<select className="form-control" name="hari" onChange={this.handleChange}>
										<option value="">Day</option>
										{
											hari.map((item, key) => (
												<option key={key} value={item}>{item}</option>
											))
										}
									</select>
								</div>
								<div className="form-group col">
									<label className="invisible">Month</label>
									<select className="form-control" name="bulan" onChange={this.handleChange}>
										<option value="">Month</option>
										{
											bulan.map((item, key) => (
												<option key={key} value={key + 1}>{item}</option>
											))
										}
									</select>
								</div>
								<div className="form-group col">
									<label className="invisible">Year</label>
									<select className="form-control" name="tahun" onChange={this.handleChange}>
										<option>Year</option>
										{
											tahun.map((item, key) => (
												<option key={key} value={item}>{item}</option>
											))
										}
									</select>
								</div>
								<div style={{ marginTop: '-10px' }} className="form-group col-12">
									<small className="form-text text-muted font-italic mt-0">
										To Register, you must be 18 or older. Other people won’t see your birthday.
									</small>
								</div>
							</div>
							<div className="text-center">
								<p className="text-sm">
									You are accepting Ranstouring’s
									<Link href="/tnc" as="/term-condition">
										<a 
											href={process.env.HOST_DOMAIN+'/term-condition'} 
											className="text-primary mx-1"
										>
											<b>Term and Condition</b>
										</a>
									</Link>
									<br />by clicking register button.
								</p>
							</div>
							<button className="btn btn-info mb-3 w-100 rounded-lg" onClick={this.validate}>REGISTER</button>
						</form>
					</Container>
				</Container>
			</div>
		);
	}
}
