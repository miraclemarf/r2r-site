import React from 'react'
import { connect } from 'react-redux';
import { Container, Label } from 'reactstrap'
import { validateEmailAddress } from '../components/functions'
import { forgotPassword } from '../utils/user'
import Router from 'next/router'

class ForgotPassword extends React.Component {
	static async getInitialProps({ store, req }) {

		// Inherit standard props from the Page (i.e. with session data)
		let props = {
			submitStatus: req.query.hasOwnProperty('success'),
			nav: 'blue',
			scrollHeader: false
		}
		return props;
	}
	constructor(props) {
		super(props);

		this.state = {
			...props,
			email: '',
			isSubmitted: false,
			invalidEmail: false
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
		const { email } = this.state
		e.preventDefault();
		if (validateEmailAddress(email)) {
			this.setState({ invalidEmail: false })
			let result = await forgotPassword(email)

			console.log(result);
			if (result.status) {
				Router.push('/forgot-password?success')
			}
		} else {
			this.setState({ invalidEmail: true })
		}
	}
	render() {

		console.log(this.state);

		return (
			<div role="main" className="mt-4 pt-5">
				<Container className="container-sm px-0">
					<Container style={{ maxWidth: "480px", padding: "20px" }}>

						{
							this.state.submitStatus ?
								<div>
									<div className="text-center">
										<div><span className="icon-check1 h2 text-white p-3 bg-info rounded-circle"></span></div>
										<div className="py-3" />
										<h2 className="title-section">Link Sent!</h2>
									</div>
									<div className="mt-4 mb-4">
										<div className="text-center">
											<p className="m-0">Please check your email and follow the instruction to reset new password.</p>
										</div>
									</div>
									<div className="mb-3">
										<a href={process.env.HOST_DOMAIN} className="d-block w-100 btn btn-primary rounded">Back to Home</a>
									</div>
								</div>

								:
								<div>
									<h2 className="title-section mb-4">Forgot Password</h2>
									<form ref={this.form} onSubmit={this.handleSubmit}>
										<div className={`form-group ${this.state.invalidEmail ? 'mb-1' : 'mb-3'}`}>
											<label className="text-black text-sm">Email</label>
											<input
												type="email"
												name="email"
												className="form-control rounded-lg"
												placeholder="Your Email"
												autoComplete="off"
												onChange={this.handleChange}
												required
											/>
										</div>
										{this.state.invalidEmail ? <Label className="text-sm text-danger mb-3">Invalid Email Address</Label> : ""}
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
										>Submit</button>
									</form>
								</div>
						}
					</Container>
				</Container>
			</div>
		);
	}
}
export default connect((state) => state)(ForgotPassword);
