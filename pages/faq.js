import React from 'react';
import Page from '../components/page';
import { UncontrolledCollapse } from 'reactstrap';

export default class extends Page {
	static async getInitialProps({ req }) {
		// Inherit standard props from the Page (i.e. with session data)
		let props = await super.getInitialProps({
			req
		});

		if (typeof window === 'undefined') {
			try {
				props.nav = 'blue'
				props.footer = 'transparent'
				props.scrollHeader = false
			} catch (e) {}
		}
		return props;
	}
	constructor(props) {
		super(props);

		this.state = {};
	}
	render() {
		return (
			<div style={{ minHeight: '77.5vh' }} className="container pt-5">
				<div className="py-3" />
				<div className="mb-4">
					<h1 className="title-section">FAQ</h1>
				</div>
				<div>
					<div className="border-bottom mb-3 pb-2">
						<div className="d-flex justify-content-between align-items-center" id="acc1" style={{cursor:"pointer"}}>
							<h3 className="title-section m-0">
								Do i have to have driving licenses?
							</h3>
							<span className="icon-right-arrow text-primary" />
						</div>
						<UncontrolledCollapse toggler="#acc1">
							<div>
							Yes, you must have motorcycle driving license at least 3 years active.
							</div>
						</UncontrolledCollapse>
					</div>
					<div className="border-bottom mb-3 pb-2">
						<div className="d-flex justify-content-between align-items-center"  id="acc2" style={{cursor:"pointer"}}>
							<h3 className="title-section m-0">What if i never experience to ride 250cc motorcycle?</h3>
							<span className="icon-right-arrow text-primary" />
						</div>
						<UncontrolledCollapse toggler="#acc2">
							<div>
							We are sorry, at the moment  road2ring trips is only for those that experienced 250cc up motorcycle before and if you haven’t experience to ride 250 cc motorcycle. Feel free to reach us and simply you can join our community.
							</div>
						</UncontrolledCollapse>
					</div>
					<div className="border-bottom mb-3 pb-2">
						<div className="d-flex justify-content-between align-items-center" id="acc3" style={{cursor:"pointer"}}>
							<h3 className="title-section m-0">Can I bring my a pillion?</h3>
							<span className="icon-right-arrow text-primary" />
						</div>
						<UncontrolledCollapse toggler="#acc3">
							<div>
							Sure you can bring your pillion, but all pillion’s cost is not included on trip package, like meals, and tickets to some attractions.
							</div>
						</UncontrolledCollapse>
					</div>
					<div className="border-bottom mb-3 pb-2">
						<div className="d-flex justify-content-between align-items-center" id="acc4" style={{cursor:"pointer"}}>
							<h3 className="title-section m-0">Can I choose my roommate?</h3>
							<span className="icon-right-arrow text-primary" />
						</div>
						<UncontrolledCollapse toggler="#acc4">
							<div>
							No, you cannot choose your roommate, because all of our trips is a single room. We want to make all our guest have a comfortable sleep.
							</div>
						</UncontrolledCollapse>
					</div>
				</div>
				<div className="py-3" />
			</div>
		);
	}
}
