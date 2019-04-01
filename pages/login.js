import React from 'react';
import TabMenu from '../components/tabMenu';
import Page from '../components/page';

export default class extends Page {
	static async getInitialProps({ req }) {
		// Inherit standard props from the Page (i.e. with session data)
		let props = await super.getInitialProps({
			req
		});

		if (typeof window === 'undefined') {
			try {
				props.nav = 'blue';
			} catch (e) {}
		}
		return props;
	}
	constructor(props) {
		super(props);

		this.state = {};
	}
	render() {
		const tabMenuData = {
			menu: [ { name: 'Log in' , url:'/login', active:true }, {divider:true}, { name: 'Register',  url:'/register', active:false } ]
		};
		return (
			<div className="container">
				<div className="py-3" />
				<div className="mb-4">
					<TabMenu {...tabMenuData} />
				</div>
				<div className="mb-3">
					<a href="#" className="title-section btn btn-sm btn-primary d-block text-white mb-2">
						<div className="d-flex justify-content-center py-2">
							<span className="icon-facebook" /> <h4 className="mb-0 ml-3">LOG IN WITH FACEBOOK</h4>
						</div>
					</a>
					<a href="#" className="title-section btn btn-sm btn-white d-block text-dark border-dark">
						<div className="d-flex justify-content-center py-2">
							<span
								style={{
									background: 'url(/static/slicing/icon/Google__G__Logo.svg) no-repeat',
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
				</div>
				<div>
					<h2 className="title-section text-center">LOG IN WITH EMAIL</h2>
					<form>
						<div className="form-group">
							<label className="text-black text-sm">Email</label>
							<input type="email" className="form-control" placeholder="Your Email" />
						</div>
						<div className="form-group">
							<label className="text-black text-sm">Password</label>
							<input type="password" className="form-control" placeholder="Your Password" />
						</div>
						<div className="py-3 mx-3 text-center">
							<p>
								<a href="#" className="text-primary">
									<b>Forgot Password ?</b>
								</a>
							</p>
						</div>
						<div>
							<button className="btn btn-secondary w-100">LOG IN</button>
						</div>
					</form>
				</div>
				<div className="py-3" />
			</div>
		);
	}
}
