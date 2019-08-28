import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Container, Row, Col, Spinner } from 'reactstrap'
// import TextImgCard from '../../components/textImgCard'
import GalleryCard from '../../components/galleryCard'
import Pagination from '../../components/pagination'
// import LandscapeCard from '../../components/cards/landscapeCard'
import { getLatestGallery, getLatestTrips } from '../../utils'

class Gallery extends React.Component {
	static async getInitialProps({ store }) {
		// Inherit standard props from the Page (i.e. with session data)
		let props = { 
			nav: 'blue', footer: 'transparent',
			galleryOptions: { page: 1, max: 6 } 
		}
		let stores = await store.getState()
		try {
			// Gallery Scope
			if (!stores.GalleryData) await store.dispatch(getLatestGallery(0, props.galleryOptions.max))
			// Trip Scope
			if (!stores.TripData) await store.dispatch(getLatestTrips(0, 6))
		} catch (e) {
			props.error = 'Unable to fetch AsyncData on server'
		}
		return props
	}
	constructor(props) {
		super(props)
		this.state = {
			trips: props.TripData,
			gallery: props.GalleryData,
			galleryTotal: props.GalleryTotal,
			galleryPage: props.galleryOptions.page,
			galleryMax: props.galleryOptions.max
		}
	}
	
	componentWillReceiveProps(nextProps) {
		this.setState({
			trips: nextProps.TripData,
			gallery: nextProps.GalleryData,
			galleryTotal: nextProps.GalleryTotal
		})
	}

	render() {
		const { gallery, galleryTotal, galleryMax, galleryPage } = this.state
		return (
			<div role="main">
				<Container className="container-sm">
					<Row>
						<Col lg="12">
							<h1 className="h2 title-section my-3">TRIPS GALLERY</h1>
						</Col>
					</Row>
					<GalleryCard datas={gallery} pathname={"gallery"} />
					{
						gallery.length >= galleryMax ? 
							<Pagination 
								total={galleryTotal} 
								display={galleryMax}
								page={galleryPage} 
							/> : ""
					}
				</Container>
			</div>
		)
	}
}

const mapDispatchToProps = dispatch => {
	return {
		getLatestGallery: bindActionCreators(getLatestGallery, dispatch),
		getLatestTrips: bindActionCreators(getLatestTrips, dispatch)
	}
}
export default connect(state => state, mapDispatchToProps)(Gallery)