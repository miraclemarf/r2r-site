import React from 'react'
import { connect } from 'react-redux'
import Link from 'next/link'
import Page from '../components/page'
import SquareCover from '../components/squareCover'
import GalleryCard from '../components/galleryCard'
import GalleryApi from '../utils/gallery'
import { Container, Row, Col } from 'reactstrap'

class HowItWorks extends Page {
	static async getInitialProps({ store, req }) {
		let props = await super.getInitialProps({ req });
		const initialState = store.getState()
		console.log(initialState)
		try {
			// const galleryRes = await GalleryApi.getLatestGallery()
			props.nav = 'blue'
			props.gallery = await galleryRes
		} catch (e) {}
		return props
	}

	constructor(props) {
		super(props)
		this.state = {
			// gallery: props.gallery
		}
	}

	componentWillReceiveProps(nextProps) {
		// this.setState({gallery: nextProps.gallery})
	}
	
	render() {
		console.log(this.props)
		return (
			<div role="main">
				<Container className="m-auto">
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
					</Row>
					<div className="container my-4 d-flex align-items-center justify-content-between">
						<h4 className="title-section text-dark m-0">Share to</h4>
						<div className="bg-primary text-white py-1 px-3 d-flex align-items-center justify-content-between">
							<span style={{ top: '4px' }} className="icon-facebook h4 position-relative" />
							<h5 className="title-section mb-0 pl-3">Facebook Friend</h5>
						</div>
					</div>
				</Container>
				<div className="bg-dark pt-4">
					<Container>
						<div className=" d-flex justify-content-between mb-3">
							<h1 className="h2 title-section text-white m-0">Gallery</h1>
							<a href={`${process.env.HOST_DOMAIN}/gallery`} style={{"top":"8px"}} className="text-sm position-relative text-white d-block font-weight-bold">View All</a>
						</div>
						<Row>
							<Col xs="12" lg="12" className="mb-2 px-2 overflow-hidden">
								{/* <GalleryCard sliderData={this.state.gallery} /> */}
							</Col>
						</Row>
					</Container>
				</div>
			</div>
		);
	}
}

export default connect(state => state)(HowItWorks)
