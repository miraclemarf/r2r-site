import React from 'react';
import TextImgCard from '../components/textImgCard';
import Pagination from '../components/pagination';
import { getLatestTestimonial } from '../utils/testimonial';
import Page from '../components/page';

export default class extends Page {
	static async getInitialProps({ req }) {
		// Inherit standard props from the Page (i.e. with session data)
		let props = await super.getInitialProps({
			req
		});

		if (typeof window === 'undefined') {
			try {
				const testimonialData = await getLatestTestimonial();
                props.testimonial = testimonialData.object;
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
			testimonial: props.testimonial || null
		};
	}
	async componentDidMount() {
		if (process.browser) {
			try {
				const testimonialData = await getLatestTestimonial();
				this.setState({
					testimonial: testimonialData.object
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
				<h1 className="h2 title-section mx-3 mb-3">TRIPS Testimonial</h1>
				{this.state.testimonial ? (
					<div>
						{this.state.testimonial.map((item, key) => (
							<div key={key} className="mb-1">
								<TextImgCard {...item} isLandscape={true} iconTextPostion="align-items-center" section="testimonial" />
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
