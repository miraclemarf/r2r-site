import React from 'react';
import TripCard from '../components/tripCard';
import TripMainCover from '../components/tripMainCover';
import TextImgCard from '../components/textImgCard';
import Pagination from '../components/pagination';
import { getLatestTrips } from '../utils/trips';
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
				const tripsData = await getLatestTrips();
				const galleryData = await getLatestGallery();
				props.trips = tripsData;
				props.gallery = galleryData;
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
				const tripsData = await getLatestTrips();
				const galleryData = await getLatestGallery();
				this.setState({
					trips: tripsData,
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
					<TripMainCover />
				</div>
				<div className="my-4 mx-3">
					<h1 className="h2 title-section mb-3">Trips Package</h1>
					{this.state.trips ? (
						<div>
							{this.state.trips.map((item, key) => <TripCard key={key} {...item} />)}
							<Pagination />
						</div>
					) : (
						''
					)}
				</div>
				<div className="p-3 bg-dark">
					<h1 className="h2 title-section text-white mb-3">Gallery</h1>
					{this.state.gallery ? (
						<div className="sliderMobile d-flex align-items-stretch">
							{this.state.gallery.map((item, key) => (
								<div key={key} className="mr-3">
									<TextImgCard {...item} isLandscape={true} iconTextPostion="align-items-center" section="gallery" />
								</div>
							))}
						</div>
					) : (
						''
					)}
				</div>
			</div>
		);
	}
}
