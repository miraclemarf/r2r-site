import React from 'react';
import Link from 'next/link';
import Page from '../components/page';
import SquareCover from '../components/squareCover';
import TextImgCard from '../components/textImgCard';
import { getLatestGallery } from '../utils/gallery';

export default class extends Page {
	static async getInitialProps({ req }) {
		// Inherit standard props from the Page (i.e. with session data)
		let props = await super.getInitialProps({
			req
		});

		if (typeof window === 'undefined') {
			try {
				const galleryData = await getLatestGallery();
                props.nav = 'blue';
				props.gallery = galleryData;
			} catch (e) {}
		}
		return props;
	}
	constructor(props) {
		super(props);

		this.state = {
			gallery: props.gallery || null
		};
	}
	async componentDidMount() {
		if (process.browser) {
			try {
				const galleryData = await getLatestGallery();
				this.setState({
					gallery: galleryData
				});
			} catch (e) {
				console.log(e);
			}
		}
	}
	render() {
		return (
			<div>
				<div>
                    <img src="https://loremflickr.com/720/450/street" className="img-fluid" />
                </div>
				<div className="mb-4 pt-4 container">
						<h1 className="title-section">TOURING WITH US?</h1>
				</div>
				<div>
					<p className="container mb-0">
						The Bromo Tengger Semeru National Park offers some of the most amazing landscapes in the whole
						of Indonesia. It is especially beautiful at sunrise as the mist rolls over the valley and the
						sun rises behind Bromo Volcano.
					</p>
				</div>
				<div className="container my-4 d-flex align-items-center justify-content-between">
					<div>
						<h4 className="title-section text-dark m-0">Share to</h4>
					</div>
					<div className="bg-primary text-white py-1 px-3 d-flex align-items-center justify-content-between">
						<span style={{ top: '4px' }} className="icon-facebook h4 position-relative" />
						<h5 className="title-section mb-0 pl-3">Facebook Friend</h5>
					</div>
				</div>

				<div className="p-3 bg-dark">
					<div className=" d-flex justify-content-between mb-3">
						<h1 className="h2 title-section text-white m-0">Gallery</h1>
							<a
								href="/gallery"
								style={{ top: '5px' }}
								className="text-sm position-relative text-white d-block font-weight-bold"
							>
								View All
							</a>
					</div>
					<div className="sliderMobile d-flex align-items-stretch">
						{this.state.gallery ? this.state.gallery.map((item, key) => (
							<div key={key} className="mr-3">
								<TextImgCard {...item} isLandscape={true} />
							</div>
						)) : ''}
					</div>
				</div>
			</div>
		);
	}
}
