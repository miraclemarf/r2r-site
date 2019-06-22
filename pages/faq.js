import React from 'react';
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
				props.footer = 'transparent';
			} catch (e) { }
		}
		return props;
	}
	constructor(props) {
		super(props);

		this.state = {};
	}
	render() {
		return (
			<div style={{ "minHeight": "77.5vh" }} className="container">
				<div className="py-3" />
				<div className="mb-4">
					<h1 className="title-section">FAQ</h1>
				</div>
				<div>
					<a className="d-block text-black" href={process.env.HOST_DOMAIN + '/term-condition'}>
						<div className="border-bottom mb-3 pb-2 d-flex justify-content-between align-items-center">
							<h3 className="title-section m-0">TERM AND CONDITION</h3>
							<span className="icon-right-arrow text-primary"></span>
						</div>
					</a>
					<div className="border-bottom mb-3 pb-2 d-flex justify-content-between align-items-center">
						<h3 className="title-section m-0">WHAT TO BE PREPARED?</h3>
						<span className="icon-right-arrow text-primary"></span>
					</div>
					<div className="border-bottom mb-3 pb-2 d-flex justify-content-between align-items-center">
						<h3 className="title-section m-0">Do We NEED DRIVING LICENSES?</h3>
						<span className="icon-right-arrow text-primary"></span>
					</div>
				</div>
				<div className="py-3" />
			</div>
		);
	}
}
