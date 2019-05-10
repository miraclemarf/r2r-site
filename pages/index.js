import React from 'react';
import fetch from 'isomorphic-unfetch';
import Link from 'next/link';
import MainCover from '../components/mainCover';
import TripCard from '../components/tripCard';
import TextImgCard from '../components/textImgCard';
import BannerHowItWorks from '../components/fragments/bannerHowItWorks';
import BannerJoinComm from '../components/fragments/bannerJoinComm';
import Page from '../components/page';
import {getUser} from '../utils/user'

export default class extends Page {
	static async getInitialProps({ req }) {
		// Inherit standard props from the Page (i.e. with session data)
		let props = await super.getInitialProps({
			req
		});

		if (typeof window === 'undefined') {
			try {
				const tripsRes = await fetch('http://localhost:3000/api/trips?_start=0&_limit=4');
				const tripsData = await tripsRes.json();

				const testiMonialsRes = await fetch('http://localhost:3000/api/testimonials?_start=10&_limit=5');
				const testimonialsData = await testiMonialsRes.json();

				const galleryRes = await fetch('http://localhost:3000/api/gallerys?_start=10&_limit=5');
				const galleryData = await galleryRes.json();

				props.trips = tripsData;
				props.testimonials = testimonialsData;
				props.gallery = galleryData;
				
			} catch (e) {
				props.error = 'Unable to fetch AsyncData on server';
			}
		}
		return props;
	}
	constructor(props) {
		super(props);
		getUser();

		this.state = {};
	}
	render() {
		return (
			<div>
				<MainCover imgCover="https://loremflickr.com/720/1000/potrait,street" withIcon={true} />
				<div>
					<div className="my-4 mx-3">
						<h1 className="h2 title-section mb-3">Next Trips</h1>
						{this.props.trips.map((item, key) => <TripCard key={key} {...item} />)}
							<a href="/trips" className="btn btn-primary d-block">
								SEE ALL TRIP
							</a>
					</div>
					<div className="pt-3 my-4 mx-3 border-top">
						<h1 className="h2 title-section mb-3">Testimonial</h1>
						<div className="sliderMobile d-flex align-items-stretch">
							{this.props.testimonials.map((item, key) => (
								<div key={key} className="mr-3">
									<TextImgCard {...item} iconTextPostion="align-items-end" section="testimonial" />
								</div>
							))}
						</div>
					</div>
					<div>
						<BannerHowItWorks />
					</div>
					<div>
						<BannerJoinComm />
					</div>
					<div className="p-3 bg-dark">
						<div className=" d-flex justify-content-between mb-3">
							<h1 className="h2 title-section text-white m-0">Gallery</h1>
								<a href="/gallery" style={{"top":"5px"}} className="text-sm position-relative text-white d-block font-weight-bold">
									View All
								</a>
						</div>
						<div className="sliderMobile d-flex align-items-stretch">
							{this.props.gallery.map((item, key) => (
								<div key={key} className="mr-3">
									<TextImgCard {...item} isLandscape={true} iconTextPostion="align-items-center" section="gallery" />
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		);
	}
}
