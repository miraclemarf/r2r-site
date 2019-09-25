import React from 'react';

export default class extends React.Component {
	static async getInitialProps({ req }) {
		// Inherit standard props from the Page (i.e. with session data)
		let props = {};

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
			<div style={{ minHeight: '77.5vh' }} className="container">
				<div className="mb-4">
					<a className="pt-4 d-block text-dark h4 title-section" onClick={() => window.history.back()}>
						<span
							style={{ top: '-1px' }}
							className="icon-left-arrow text-sm text-primary position-relative"
						/>{' '}
						Back
					</a>
				</div>
				<div>
					<div className="mb-3">
						<h3 className="title-section m-0">WHAT TO BE PREPARED?</h3>
					</div>
					<div className="mb-3 pb-2 ">
						<p>
							You have to prepare your own cloth on a suitcase. A car will carry your suitcase, if we move
							to other city.
						</p>
						<p>Stuffs are recommended to bring with you :</p>
						<ol>
							<li>Jacket</li>
							<li>Boots</li>
							<li>Rain Coat</li>
							<li>Your own special medicine</li>
							<li>Amount of cash</li>
						</ol>
					</div>
				</div>
				<div className="py-3" />
			</div>
		);
	}
}
