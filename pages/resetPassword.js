import React from 'react'
import { connect } from 'react-redux';
import { Container, Label } from 'reactstrap'
import { resetPassword } from '../utils/user'
import Router from 'next/router'

class ResetPassword extends React.Component {
	static async getInitialProps({ store, req, query: { code }, res }) {
		let submitPage = req.query.hasOwnProperty('success') || req.query.hasOwnProperty('error') ? true : false
		if ((!req.query.hasOwnProperty('code') || !req.query.code) && !submitPage) {
			res.writeHead(302, {
				Location: process.env.HOST_DOMAIN
			});
			res.end();
		}

		let props = {
			submitPageStatus: submitPage ? Object.keys(req.query)[0] : false,
			resetCode: req.query.code,
			nav: 'blue',
			scrollHeader: false
		}
		return props;
	}
	constructor(props) {
		super(props);

		this.state = {
			...props,
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
		if (this.state.newpassword !== this.state.password) {
			alert('Password not match!!')
		}
	}
	handleChange(e) {
		const target = e.target, value = target.value, name = target.name;
		this.setState({ [name]: value });
	}
	async handleSubmit(e) {
		const { password, resetCode } = this.state
		e.preventDefault();

		let result = await resetPassword(resetCode, password)
		if (result.status) {
			Router.push('/reset-password?success')
		}
		else {
			Router.push('/reset-password?error')
		}
	}
	render() {
		console.log(this.state);
		return (
			<div role="main" className="mt-4 pt-5">
				<Container className="container-sm px-0">
					<Container style={{ maxWidth: "480px", padding: "20px" }}>
						{
							this.state.submitPageStatus ?
								<div>
									<div className="text-center">
										<div>
											{
												this.state.submitPageStatus === 'success' ?
													<span className="icon-check1 h2 text-white p-3 bg-info rounded-circle"></span> :
													<span className="icon-icon_warning h1 text-white p-3 rounded-circle">
														<span class="path1"></span><span class="path2"></span></span>
											}
										</div>
										{
											this.state.submitPageStatus === 'success' ?
												<div>
													<div className="py-3" />
													<h3 className="title-section">Reset Password Success</h3>
												</div>
												:
												<div>
													<div className="py-2" />
													<h3 className="title-section">Reset Password Failed!</h3>
												</div>
										}
									</div>
									<div className="mt-4 mb-4">
										<div className="text-center">
											{
												this.state.submitPageStatus === 'success' ? 
												<p className="m-0">Please using your new password to sign in.</p>
												:
												<p className="m-0">Please check your email and follow the instruction to reset new password.</p>
											}
										</div>
									</div>
									<div className="mb-3">
										<a href={process.env.HOST_DOMAIN} className="d-block w-100 btn btn-primary rounded">Back to Home</a>
									</div>
								</div>
								:
								<div>
									<h2 className="title-section mb-4">Reset Password</h2>
									<form ref={this.form} onSubmit={this.handleSubmit}>
										<input type="hidden" name="code" value={this.state.resetCode} />
										<div className={`form-group ${this.state.invalidEmail ? 'mb-1' : 'mb-3'}`}>
											<label className="text-black text-sm">New Password</label>
											<input
												type="password"
												className="form-control rounded-lg"
												name="newpassword"
												placeholder="New Password"
												minLength={6}
												autoComplete="off"
												onChange={this.handleChange}
												required
											/>
										</div>
										<div className="form-group mb-2">
											<label className="text-black text-sm">Confirm New Password</label>
											<input
												type="password"
												name="password"
												className="form-control rounded-lg"
												placeholder="Confirm New Password"
												minLength={6}
												autoComplete="off"
												onChange={this.handleChange}
												required
											/>
										</div>
										{/* <div className="py-3 mx-3 text-center">
								<p>
									<a href="#" className="text-primary">
										<b>Forgot Password ?</b>
									</a>
								</p>
							</div> */}
										<button
											className="btn btn-primary w-100 my-3 rounded-lg"
											onClick={this.validate}
										>Reset Password</button>
									</form>
								</div>
						}
					</Container>
				</Container>
			</div>
		);
	}
}
export default connect((state) => state)(ResetPassword);
