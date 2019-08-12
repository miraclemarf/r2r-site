import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Link from 'next/link'
// import SquareCover from '../components/squareCover'
import GallerySliderCard from '../components/gallerySlider'
import { Container, Row, Col } from 'reactstrap'
import { getLatestGallery } from '../utils'

class HowItWorks extends React.Component {
	static async getInitialProps({ store }) {
		let props = { nav: 'blue' }
		try {
			// Gallery Scope
			let GalleryList = await store.getState().GalleryData
			if (!GalleryList) await store.dispatch(getLatestGallery(0, 5))
		} catch (e) {
			props.error = 'Unable to fetch AsyncData on server'
		}
		return props
	}

	constructor(props) {
		super(props)
		this.state = {
			gallery: props.GalleryData
		}
	}

	componentWillReceiveProps(nextProps) {
		this.setState({gallery: nextProps.GalleryData})
	}
	
	render() {
		return (
			<div role="main">
				<Container className="container-sm">
					<Row>
						<Col xs="12" lg="12" className="mainBanner-lg p-0 w-100">
							<img width="100%" height="auto" src={`${process.env.HOST_URL}/img/assets/1561543693901iw4tqw74.jpeg`} className="img-fluid" alt="TOURING WITH US?" />
						</Col>
						<Col xs="12" lg="12" className="p-0">
							<h1 className="p-3 m-0 title-section">TOURING WITH US?</h1>
							<p className="container mt-0 mb-2">
								The Bromo Tengger Semeru National Park offers some of the most amazing landscapes in the whole
								of Indonesia. It is especially beautiful at sunrise as the mist rolls over the valley and the
								sun rises behind Bromo Volcano.
							</p>
						</Col>
						<Col xs="12" lg="12">
							<div className="my-4 d-flex align-items-center justify-content-between">
								<h4 className="title-section text-dark m-0">Share to</h4>
								<div className="bg-primary text-white py-1 px-3 d-flex align-items-center justify-content-between">
									<span style={{ top: '4px' }} className="icon-facebook h4 position-relative" />
									<h5 className="title-section mb-0 pl-3">Facebook Friend</h5>
								</div>
							</div>
						</Col>
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
		getLatestGallery: bindActionCreators(getLatestGallery, dispatch)
	}
}
export default connect(state => state, mapDispatchToProps)(HowItWorks)
