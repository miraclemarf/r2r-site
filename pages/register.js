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
	dropdownChanged(e) {}
	render() {
		const tabMenuData = {
			menu: [ { name: 'Log in' , url:'/login', active:false }, {divider:true}, { name: 'Register',  url:'/register', active:true } ]
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
							<span className="icon-facebook" /> <h4 className="mb-0 ml-3">CONTINUE WITH FACEBOOK</h4>
						</div>
					</a>
					<a href="#" className="title-section btn btn-sm btn-white d-block text-dark border-dark">
						<div className="d-flex justify-content-center py-2">
							<span style={{"background":"url(/static/slicing/icon/Google__G__Logo.svg) no-repeat", "width":"25px", "height":"25px"}} /> <h4 className="mb-0 ml-3">CONTINUE WITH Google</h4>
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
					<h2 className="title-section text-center">REGISTER WITH EMAIL</h2>
					<form>
						<div className="form-group">
							<label className="text-black text-sm">Email</label>
							<input type="email" className="form-control" placeholder="Your Email" />
						</div>
						<div className="form-group">
							<label className="text-black text-sm">Create Password</label>
							<input type="password" className="form-control" placeholder="Create your password" />
						</div>
						<div className="form-row">
							<div className="form-group col">
								<label>Birthday</label>
								<select className="form-control" value={'Day'} onChange={this.dropdownChanged}>
									<option value="Day">Day</option>
									<option value="....">...</option>
								</select>
							</div>
							<div className="form-group col">
								<label className="invisible">Month</label>
								<select className="form-control">
									<option>Month</option>
									<option>...</option>
								</select>
							</div>
							<div className="form-group col">
								<label className="invisible">Year</label>
								<select className="form-control">
									<option>Year</option>
									<option>...</option>
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
								<a href="#" className="text-primary">
									<b>Term and Condition</b>
								</a>{' '}
								by clicking register button.
							</p>
						</div>
						<div>
							<button className="btn btn-secondary w-100">REGISTER</button>
						</div>
					</form>
				</div>
				<div className="py-3" />
			</div>
		);
	}
}
