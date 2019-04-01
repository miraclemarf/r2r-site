import React from 'react';
import Link from 'next/link';
import TextImgCard from '../components/textImgCard';
import Page from '../components/page';

export default class extends Page {
	static async getInitialProps({ req }) {
		// Inherit standard props from the Page (i.e. with session data)
		let props = await super.getInitialProps({
			req
		});

		if (typeof window === 'undefined') {
			try {
				props.footer = 'transparent';
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
			<div>
				<div>
					<TextImgCard coverLandscape="https://loremflickr.com/720/500/street" title="The Community" isLandscape={true} iconTextPostion="align-items-center" r2rIcon={true} />
				</div>
				<div className="mb-4 pt-4 container">
					<h1 className="title-section">Community</h1>
				</div>
				<div>
					<p className="container mb-0">
						The Bromo Tengger Semeru National Park offers some of the most amazing landscapes in the whole
						of Indonesia. It is especially beautiful at sunrise as the mist rolls over the valley and the
						sun rises behind Bromo Volcano.
					</p>
                    <br />
                    <p className="container mb-0">
						The Bromo Tengger Semeru National Park offers some of the most amazing landscapes in the whole
						of Indonesia. It is especially beautiful at sunrise as the mist rolls over the valley and the
						sun rises behind Bromo Volcano.
					</p>
                    <br />
                    <p className="container mb-0">
						The Bromo Tengger Semeru National Park offers some of the most amazing landscapes in the whole
						of Indonesia. It is especially beautiful at sunrise as the mist rolls over the valley and the
						sun rises behind Bromo Volcano.
					</p>
                    <br />
				</div>
			</div>
		);
	}
}
