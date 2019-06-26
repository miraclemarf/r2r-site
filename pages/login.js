import React from 'react';
import TabMenu from '../components/tabMenu';
import Page from '../components/page';
import { login } from '../utils/user'

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
	}
	async handleSubmit(e) {
		e.preventDefault();
		let isHasTransaction = Object.keys(this.state.transaction).length === 0 ? false : true
		let idTrip = isHasTransaction ? this.state.transaction.idTrip : ""
		const postData = { 'email': this.state.email, 'password': this.state.password, 'isHasTransaction': isHasTransaction, 'idTrip': idTrip }
		login(postData)

	}
	render() {

		const tabMenuData = {
			menu: [{ name: 'Log in', url: process.env.HOST_DOMAIN + '/login', active: true }, { divider: true }, { name: 'Register', url: process.env.HOST_DOMAIN + '/register', active: false }]
		};
		return (
			<div className="container" style={{minHeight:"80vh"}}>
				<div className="py-3" />
				<div className="mb-4">
					<TabMenu {...tabMenuData} />
				</div>
				{/* <div className="mb-3">
					<a href="#" className="title-section btn btn-sm btn-primary d-block text-white mb-2">
						<div className="d-flex justify-content-center py-2">
							<span className="icon-facebook" /> <h4 className="mb-0 ml-3">LOG IN WITH FACEBOOK</h4>
						</div>
					</a>
					<a href="#" className="title-section btn btn-sm btn-white d-block text-dark border-dark">
						<div className="d-flex justify-content-center py-2">
							<span
								style={{
									background: 'url(/preview/static/slicing/icon/Google__G__Logo.svg) no-repeat',
									width: '25px',
									height: '25px'
								}}
							/>{' '}
							<h4 className="mb-0 ml-3">LOG IN WITH Google</h4>
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
					{/* <h2 className="title-section text-center">LOG IN WITH EMAIL</h2> */}
					<form ref={this.form} onSubmit={this.handleSubmit}>
						<div className="form-group">
							<label className="text-black text-sm">Email</label>
							<input type="email" name="email" className="form-control" placeholder="Your Email" onChange={this.handleChange} required />
						</div>
						<div className="form-group">
							<label className="text-black text-sm">Password</label>
							<input type="password" name="password" className="form-control" placeholder="Your Password" minLength={6} onChange={this.handleChange} required />
						</div>
						<div className="py-2"></div>
						{/* <div className="py-3 mx-3 text-center">
							<p>
								<a href="#" className="text-primary">
									<b>Forgot Password ?</b>
								</a>
							</p>
						</div> */}
						<div>
							<button className="btn btn-info w-100" onClick={this.validate}>LOG IN</button>
						</div>
					</form>
				</div>
				<div className="py-3" />
			</div>
		);
	}
}
