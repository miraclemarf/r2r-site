import React from 'react';
import TabMenu from '../components/tabMenu';
import Page from '../components/page';
import Moment from 'react-moment'
import { register } from '../utils/user'

export default class extends React.Component {
	static async getInitialProps({ req }) {
		// Inherit standard props from the Page (i.e. with session data)
		let props = {};
		props.nav = 'blue';
		props.transaction = {};
		return props;
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
		e.preventDefault();
		let isHasTransaction = Object.keys(this.state.transaction).length === 0 ? false : true
		let idTrip = isHasTransaction ? this.state.transaction.idTrip : ""
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
		console.log(this.state);
		const tabMenuData = {
			menu: [{ name: 'Log in', url: process.env.HOST_DOMAIN + '/login', active: false }, { divider: true }, { name: 'Register', url: process.env.HOST_DOMAIN + '/register', active: true }]
		};
		const range = (start, end, length = end - start) =>
			Array.from({ length }, (_, i) => start + i)

		const hari = range(1, 32)
		const bulan = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
		const tahun = range(1930, 2002)

		return (
			<div className="container">
				<div className="py-3" />
				<div className="mb-4">
					<TabMenu {...tabMenuData} />
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
				<div>
					{/* <h2 className="title-section text-center">REGISTER WITH EMAIL</h2> */}
					{
						this.state.error != '' ?
							<div className="alert alert-danger" role="alert">
								{this.state.error}
							</div>
							:
							''
					}
					<form ref={this.form} onSubmit={this.handleSubmit}>
						<div className="form-group">
							<label className="text-black text-sm">Email</label>
							<input type="email" name="email" className="form-control" placeholder="Your Email" onChange={this.handleChange} required />
						</div>
						<div className="form-group">
							<label className="text-black text-sm">Create Password</label>
							<input type="password" name="password" className="form-control" placeholder="Create your password" minLength={6} onChange={this.handleChange} required />
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
								<small className="form-text text-muted font-italic">
									To Register, you must be 18 or older. Other people won’t see your birthday.
								</small>
							</div>
						</div>
						<div className="py-3 mx-3 text-center">
							<p className="text-sm">
								You are accepting Road2ring’s{' '}
								<a href={process.env.HOST_DOMAIN+'/term-condition'} className="text-primary">
									<b>Term and Condition</b>
								</a>{' '}
								by clicking register button.
							</p>
						</div>
						<div>
							<button className="btn btn-secondary w-100" onClick={this.validate}>REGISTER</button>
						</div>
					</form>
				</div>
				<div className="py-3" />
			</div>
		);
	}
}
