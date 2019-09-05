import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Container, Row, Col } from 'reactstrap'
import GalleryCard from '../../components/galleryCard'
import Pagination from '../../components/pagination'
import { getLatestGallery, getLatestTrips } from '../../utils'

class Gallery extends React.Component {
	static async getInitialProps({ store }) {
		// Inherit standard props from the Page (i.e. with session data)
		let props = { 
			nav: 'blue', footer: 'transparent',
			page: 0, max: 6
		}
		let stores = await store.getState()
		try {
			// Gallery Scope
			if (!stores.GalleryData) await store.dispatch(getLatestGallery(props.page, props.max))
			// Trip Scope
			if (!stores.TripData) await store.dispatch(getLatestTrips(props.page, props.max))
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
			galleryPage: props.page,
			galleryMax: props.max
		}
	}
	
	componentWillReceiveProps(nextProps) {
		this.setState({
			trips: nextProps.TripData,
			gallery: nextProps.GalleryData,
			galleryTotal: nextProps.GalleryTotal
		})
	}

	onPaginationClick = (page) => {
		this.props.getLatestGallery(page, this.state.galleryMax)
		this.setState({galleryPage: page})
	}

	render() {
		const { gallery, galleryTotal, galleryPage } = this.state
		return (
			<div role="main">
				<Container className="container-sm">
					<Row className="pt-5">
						<Col lg="12">
							<h1 className="h2 title-section my-3 pt-3">TRIPS GALLERY</h1>
						</Col>
					</Row>
					<GalleryCard datas={gallery} pathname={"gallery"} withDate={true} className="galleryLists" />
					{
						gallery.length > 0 ? 
							<Pagination 
								totalPage={galleryTotal} 
								currentPage={galleryPage}
								onClick={this.onPaginationClick}
							/>
							:
							<div className="text-secondary font-14 w-100 text-center py-5 my-5">No Result Found!</div> 
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