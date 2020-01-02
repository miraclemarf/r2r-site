import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Link from 'next/link'
import TripCard from '../../components/tripCard'
import TripMainCover from '../../components/tripMainCover'
// import TextImgCard from '../../components/textImgCard'
import Pagination from '../../components/pagination'
import GallerySliderCard from '../../components/gallerySlider'
import { Container, Row, Col } from 'reactstrap'
import { getLatestTrips, getLatestGallery, getFeaturedTrip } from '../../utils'

class Trips extends React.Component {
	static async getInitialProps({ store }) {
		// Inherit standard props from the Page (i.e. with session data)
		let props = {
			scrollHeader: true, navDesktopdark: true,
			page: 0, max: 6
		}
		let stores = await store.getState()
		try {
			// Trip Featured Scope
			if (!stores.TripFeatured) await store.dispatch(getFeaturedTrip())
			// Trip Scope
			if (!stores.TripData) await store.dispatch(getLatestTrips(props.page, props.max))
			// Gallery Scope
			if (!stores.GalleryData) await store.dispatch(getLatestGallery(props.page, props.max))			
		} catch (e) {
			props.error = 'Unable to fetch AsyncData on server';
		}
		return props
	}
	constructor(props) {
		super(props)
		this.state = {
			trips: props.TripData,
			tripsTotal: props.TripsTotal,
			tripsPage: props.page,
			tripsMax: props.max,
			featured: props.TripFeatured.map(({ id, title, icon, cover }) => ({ id: id, src: cover, icon: icon, caption: title, header: title })),
			gallery: props.GalleryData
		}
	}

	componentWillReceiveProps(nextProps) {
		this.setState({
			trips: nextProps.TripData,
			tripsTotal: nextProps.TripsTotal,
			featured: nextProps.TripFeatured.map(({ id, title, icon, cover }) => ({ id: id, src: cover, icon: icon, caption: title, header: title })),
			gallery: nextProps.GalleryData
		})
	}

	onPaginationClick = (page) => {
		this.props.getLatestTrips(page, this.state.tripsMax)
		this.setState({tripsPage: page})
	}

	render() {
		const { trips, tripsTotal, tripsPage, gallery, featured } = this.state
		return (
			<div role="main">
				<Container className="container-sm mb-5">
					<Row className="pt-5 mb-3">
						<Col xs="12" lg="12" className="pt-5">
							<TripMainCover datas={featured} />
							<h1 className="h2 title-section my-3">Trips Package</h1>
						</Col>
						{trips.list.map((item, key) => <TripCard key={key} {...item} />)}
					</Row>
					{
						trips.list.length > 0 ? 
							<Pagination 
								totalPage={tripsTotal} 
								currentPage={tripsPage}
								onClick={this.onPaginationClick}
							/>
							:
							<div className="text-secondary font-14 w-100 text-center py-5 my-5">No Result Found!</div> 
					}
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
								<GallerySliderCard sliderData={gallery} />
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
