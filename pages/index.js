import React from 'react';
import fetch from 'isomorphic-unfetch';
import { Container, Alert } from 'reactstrap';
import MainCover from '../components/mainCover';
import TripCard from '../components/tripCard';
import Page from '../components/page';

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
				props.trips = tripsData;
			} catch (e) {
				props.error = 'Unable to fetch AsyncData on server';
			}
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
				<MainCover imgCover="https://loremflickr.com/720/1000/potrait,street" />
				<div>
					<Container className="p-3">
						<div>
							<h1 className="h2 title-section mb-3">Next Trips</h1>
							{this.props.trips.map((item, key) => <TripCard key={key} {...item} />)}
						</div>
					</Container>
				</div>
			</div>
		);
	}
}
