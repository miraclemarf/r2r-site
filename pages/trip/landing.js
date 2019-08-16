import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Link from 'next/link'
import TripCard from '../../components/tripCard'
import TripMainCover from '../../components/tripMainCover'
// import TextImgCard from '../../components/textImgCard'
// import Pagination from '../../components/pagination'
import GallerySliderCard from '../../components/gallerySlider'
import { Container, Row, Col } from 'reactstrap'
import { getLatestTrips, getLatestGallery } from '../../utils'

class Trips extends React.Component {
	static async getInitialProps({ store }) {
		// Inherit standard props from the Page (i.e. with session data)
		let props = {}
		let stores = await store.getState()
		try {
			// Gallery Scope
			if (!stores.GalleryData) await store.dispatch(getLatestGallery(0, 6))
			// Trip Scope
			if (!stores.TripData) await store.dispatch(getLatestTrips(0, 6))
		} catch (e) {
			props.error = 'Unable to fetch AsyncData on server';
		}
		return props
	}
	constructor(props) {
		super(props)
		this.state = {
			trips: props.TripData,
			gallery: props.GalleryData
		}
	}

	componentWillReceiveProps(nextProps) {
		this.setState({
			trips: nextProps.TripData,
			gallery: nextProps.GalleryData
		})
	}

	render() {
		return (
			<div role="main">
				<TripMainCover />
				<Container className="container-sm">
					<Row>
						<Col xs="12" lg="12">
							<h1 className="h2 title-section my-3">Trips Package</h1>
						</Col>
						{this.state.trips.map((item, key) => <TripCard key={key} {...item} />)}
					</Row>
				</Container>
				<div className="bg-dark pt-4">
					<Container className="container-sm">
						<div className=" d-flex justify-content-between mb-3">
							<h1 className="h2 title-section text-white m-0">Gallery</h1>
							<Link href="/gallery" as={`${process.env.HOST_DOMAIN}/gallery`}>
								<a style={{"top":"8px"}} className="text-sm position-relative text-white d-block font-weight-bold">View All</a>
							</Link>
						</div>
						<Row>
							<Col xs="12" lg="12" className="mb-2 px-2 overflow-hidden">
								<GallerySliderCard sliderData={this.state.gallery} />
							</Col>
						</Row>
					</Container>
				</div>
			</div>
		);
	}
}

const mapDispatchToProps = dispatch => {
	return {
		getLatestGallery: bindActionCreators(getLatestGallery, dispatch),
		getLatestTrips: bindActionCreators(getLatestTrips, dispatch)
	}
}
export default connect(state => state, mapDispatchToProps)(Trips)
