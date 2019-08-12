import React from 'react';
import TextImgCard from '../components/textImgCard';
import Pagination from '../components/pagination';
import { getLatestGallery } from '../utils/gallery';
import Page from '../components/page';

export default class extends Page {
	static async getInitialProps({ req }) {
		// Inherit standard props from the Page (i.e. with session data)
		let props = await super.getInitialProps({
			req
		});

		if (typeof window === 'undefined') {
			try {
				const galleryData = await getLatestGallery();
                props.gallery = galleryData.object;
                props.nav = 'blue';
                props.footer = 'transparent';
			} catch (e) {
				props.error = 'Unable to fetch AsyncData on server';
			}
		}
		return props;
	}
	constructor(props) {
		super(props);

		this.state = {
			trips: props.trips || null,
			gallery: props.gallery || null
		};
	}
	async componentDidMount() {
		if (process.browser) {
			try {
				const galleryData = await getLatestGallery();
				this.setState({
					gallery: galleryData.object
				});
			} catch (e) {
				console.log(e);
                
			}
		}
	}
	render() {        
		return (
			<div>
				<div className="py-2" />
				<h1 className="h2 title-section mx-3 mb-3">TRIPS GALLERY</h1>
				{this.state.gallery ? (
					<div>
						{this.state.gallery.map((item, key) => (
							<div key={key} className="mb-1">
								<TextImgCard {...item} isLandscape={true} iconTextPostion="align-items-center" section="gallery" />
							</div>
                        ))}
                        <div className="mt-4 mb-4">
							<Pagination />
                        </div>
					</div>
				) : (
					''
				)}
			</div>
		);
	}
}
