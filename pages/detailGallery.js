import React from 'react';
import Link from 'next/link';
import Page from '../components/page';
import SquareCover from '../components/squareCover';
import TextImgCardTrip from '../components/textImgCardTrip';
import { getLatestTrips } from '../utils/trips';
import { getLatestGallery, getDetailGallery } from '../utils/gallery';

export default class extends Page {
	static async getInitialProps({ req , query: { id } }) {
		// Inherit standard props from the Page (i.e. with session data)
		let props = await super.getInitialProps({
			req
		});	
		
		if (typeof window === 'undefined') {
			try {
				const tripsData = await getLatestTrips();
				const galleryData = await getLatestGallery();
				const detailGallery = await getDetailGallery(id);
				props.trips = tripsData.object;
				props.gallery = galleryData.object;
				props.detailGallery = detailGallery.object
				props.footer = 'transparent';
			} catch (e) { }
		}
		return props;
	}
	constructor(props) {
		super(props);

		this.state = {
			trips: props.trips || null,
			gallery: props.gallery || null,
			detailGallery:props.detailGallery||null
		};
	}
	async componentDidMount() {
		if (process.browser) {
			try {
				const tripsData = await getLatestTrips();
				const galleryData = await getLatestGallery();
				const detailGallery = await getDetailGallery(id);
				this.setState({
					trips: tripsData.object,
					gallery: galleryData.object,
					detailGallery: detailGallery.object
				});
			} catch (e) {
				console.log(e);
			}
		}
	}

	renderTimeline() {
		return (
			<div className="pt-4 mt-4">
				<div className="text-center mb-4">
					<span className="h2 title-section title-section__with-border">13 OCT 18</span>
				</div>
				<div className="body-desc">
					<img src="https://loremflickr.com/600/680/potrait,street" className="img-fluid d-block" />
					<br />
					<p className="container mb-0">
						when an unknown printer took a galley of type and scrambled it to make a type specimen book. It
						has survived not only five centuries, but also the leap into electronic typesetting, remaining
						essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets
						containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus
						PageMaker including versions of Lorem Ipsum.
					</p>
					<br />
					<img src="https://loremflickr.com/600/375/potrait,street" className="img-fluid d-block" />
					<br />
					<p className="container mb-0">
						There are many variations of passages of Lorem Ipsum available, but the majority have suffered
						alteration in some form
					</p>
				</div>
			</div>
		);
	}
	renderGalleryCol() {
		return (
			<div style={{ margin: '0 -4px' }} className="row no-gutters">
				{this.state.gallery.map((item, key) => (
					<div key={key} className={key == 2 ? 'col-12' : 'col-6'}>
						<img src={process.env.HOST_URL+item.coverLandscape} className="img-fluid" />
					</div>
				))}
			</div>
		);
	}
	render() {
		const { detailGallery } = this.state		
		return (
			<div>
				<SquareCover imgCover={detailGallery.coverLandscape} withIcon={true} />
				<div className="text-center position-relative mb-4">
					<div className="pt-4">
						<img height="120" src={process.env.HOST_URL + detailGallery.iconCover} />
					</div>
					<div className="pt-3 d-flex justify-content-center">
						<div className="text-center mr-3">
							<span className="h1 icon-icon_distance text-gray80" />
							<br />
							<span className="text-sm">Distance</span>
							<br />
							<b>{detailGallery.distance} Km</b>
						</div>
						<div className="text-center ml-3">
							<span className="h1 icon-icon_duration text-gray80" />
							<br />
							<span className="text-sm">Duration</span>
							<br />
							<b>{detailGallery.duration} Days</b>
						</div>
					</div>
				</div>
				<div>
					<p className="container mb-0" dangerouslySetInnerHTML={{ __html: detailGallery.description }}>

					</p>
				</div>
				<div>
					<div className="article-img__fluid" dangerouslySetInnerHTML={{ __html: detailGallery.article }}>

					</div>
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
				<div className="tiles container bg-grayF2 py-4">
					<div className="py-2" />
					<h2 className="title-section text-center title-section__with-border pb-2">Gallery</h2>
					{this.renderGalleryCol()}
					<a href={process.env.HOST_DOMAIN + "/gallery"} className="mt-2 btn btn-primary d-block">
						SEE ALL
						</a>
				</div>
				<div className="container py-4">
					<h1 className="h3 title-section mb-3 text-primary">MAKE YOUR OWN TRIP!</h1>
					{this.state.trips ? (
						<div className="sliderMobile d-flex align-items-stretch">
							{this.state.trips.map((item, key) => (
								<div key={key} className="mr-3">
									<TextImgCardTrip {...item} isLandscape={false} iconTextPostion="align-items-end" />
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
