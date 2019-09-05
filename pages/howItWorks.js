import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Link from 'next/link';
// import SquareCover from '../components/squareCover'
import GallerySliderCard from '../components/gallerySlider';
import { Container, Row, Col } from 'reactstrap';
import { getLatestGallery } from '../utils';

class HowItWorks extends React.Component {
	static async getInitialProps({ store }) {
		let props = { nav: 'blue' };
		try {
			// Gallery Scope
			let GalleryList = await store.getState().GalleryData;
			if (!GalleryList) await store.dispatch(getLatestGallery(0, 6));
		} catch (e) {
			props.error = 'Unable to fetch AsyncData on server';
		}
		return props;
	}

	constructor(props) {
		super(props);
		this.state = {
			gallery: props.GalleryData
		};
	}

	componentWillReceiveProps(nextProps) {
		this.setState({ gallery: nextProps.GalleryData });
	}

	render() {
		return (
			<div role="main">
				<Container className="container-sm">
					<Row>
						<Col xs="12" lg="12" className="mainBanner-lg p-0 w-100">
							<img
								width="100%"
								height="auto"
								src={`${process.env.HOST_URL}/img/assets/1561543693901iw4tqw74.jpeg`}
								className="img-fluid"
								alt="TOURING WITH US?"
							/>
						</Col>
						<Col xs="12" lg="12" className="p-0">
							<h1 className="p-3 m-0 title-section">
								Ride WITH US? <br />Here’s How?
							</h1>
							<h2 className="px-3 m-0 title-section">Step 1</h2>
							<p className="container mt-0 mb-2">
								<b>
									Choose Destination<br />
								</b>
								We offer you many packages you can explore that have great scenery all around Indonesia.
								Imagine all the beautiful landscape the mountainous roads the beaches that you could
								only found here in Indonesia.
							</p>
							<p className="container mt-0 mb-2">
								All destination we offer is a range of terrain, so choose the terrain that is suites
								your needs and skills set to start adventure in Indonesia. Lastly Choose your
								destination with your available date, makes sure everything is settle set to go! Don’t
								forget to have fun and enjoy the ride!
							</p>
							<br />
							<h2 className="px-3 m-0 title-section">Step 2</h2>
							<p className="container mt-0 mb-2">
								<b>
								Choose Your Bike and Gear<br />
								</b>
								Within the tour itself  We offer you many selection premium brands of motorcycle that you can rent from us, just pick the one that you love the most and we will prepare it for you to the destination you choose. Make sure that at least you have experienced before with high capacity engines, then of course If you want to bring your own motorcycle, you can just simply drop it to our gathering point and we’ll take care the rest!
							</p>
							<p className="container mt-0 mb-2">
							Need some new gears? Make sure you check out our wide range gear section before you check out! We offer Helmets, Riding Apparel and Intercom for your ease of travel.
							</p>
							<br />
							<h2 className="px-3 m-0 title-section">Step 3</h2>
							<p className="container mt-0 mb-2">
								<b>
								Enjoy The Ride<br />
								</b>
								After finishing your booking, make sure everything’s is what you wanted for and last for the payment you could use Credit Card,Bank Transfer even Paypal! Enjoy the ride! Indonesia Welcomes your with warmth!
							</p>
							<p className="container mt-0 mb-2">
							Don’t forget that we will meet up at the meeting point!
							<br />
							<i>*Plane ticket is not included on our package.</i>
							
							<br />
							<br />
							<br />
							</p>
						</Col>
						<Col xs="12" lg="12">
							{/* <div className="my-4 d-flex align-items-center justify-content-between">
								<h4 className="title-section text-dark m-0">Share to</h4>
								<div className="bg-primary text-white py-1 px-3 d-flex align-items-center justify-content-between rounded-lg">
									<span style={{ top: '4px' }} className="icon-facebook h4 position-relative" />
									<h5 className="title-section mb-0 pl-3">Facebook Friend</h5>
								</div>
							</div> */}
						</Col>
					</Row>
				</Container>
				<div className="bg-dark pt-4">
					<Container className="container-sm">
						<div className=" d-flex justify-content-between mb-3">
							<h1 className="h2 title-section text-white m-0">Gallery</h1>
							<Link href="/gallery" as={`${process.env.HOST_DOMAIN}/gallery`}>
								<a
									style={{ top: '8px' }}
									className="text-sm position-relative text-white d-block font-weight-bold"
								>
									View All
								</a>
							</Link>
						</div>
						<Row>
							<Col xs="12" lg="12" className="mb-2 px-2 overflow-hidden">
								<GallerySliderCard sliderData={this.state.gallery.slice(0, 6)} />
							</Col>
						</Row>
					</Container>
				</div>
			</div>
		);
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		getLatestGallery: bindActionCreators(getLatestGallery, dispatch)
	};
};
export default connect((state) => state, mapDispatchToProps)(HowItWorks);
