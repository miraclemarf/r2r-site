import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux' 
// import Link from 'next/link'
// import SquareCover from '../../components/squareCover'
import TripSliderCard from '../../components/tripSlider'
import { Container, Row, Col, Modal, ModalBody } from 'reactstrap'
import { getLatestTrips, getLatestGallery, getDetailTestimonial, getDetailTestimonialAlbum } from "../../utils"

class TestimonialDetail extends React.Component {
	static async getInitialProps({ store, query: { id } }) {
		// Inherit standard props from the Page (i.e. with session data)
		let props = { footer: 'transparent', nav: 'blue', scrollHeader: false }
		let stores = await store.getState()
		try {
			// Detail Scope
			const detailRes = await getDetailTestimonial(id)
			props.testimonialDetail = detailRes
			// Gallery Scope
			if (!stores.GalleryData) await store.dispatch(getLatestGallery(0, 6))
			// Trip Scope
			if (!stores.TripData) await store.dispatch(getLatestTrips(0, 6))
			// Album Scope
			const detailAlbums = await getDetailTestimonialAlbum(id)
			props.testimonialAlbums = detailAlbums
		} catch (e) {
			props.error = 'Unable to fetch AsyncData on server'
		}
		return props
	}

	constructor(props) {
		super(props)
		this.state = {
			trips: props.TripData,
			testimonial: props.testimonialDetail,
			albums: props.testimonialAlbums.medias,
			gallery: props.GalleryData,
			showModal: false,
			pickedImg: "",
			showFullAlbums: false,
			...props
		}
	}
	
	componentWillReceiveProps(nextProps) {
		this.setState({
			trips: nextProps.TripData,
			testimonial: nextProps.testimonialDetail,
			albums: nextProps.testimonialAlbums.medias,
			gallery: nextProps.GalleryData
		})
	}

	zoomAlbumImage = (data) => this.setState({showModal: true, pickedImg: data})
	closeModal = () => this.setState({showModal: false})

	renderAlbumModal = () => {
		const { showModal, pickedImg } = this.state
		return (
			<div>
				<Modal isOpen={showModal} toggle={this.closeModal} size="lg" centered={true}>
					<ModalBody className="p-0">
						<img width="100%" height="auto" src={pickedImg} />
					</ModalBody>
				</Modal>
			</div>
		)
	}

	render() {
		const { testimonial, trips, albums, showFullAlbums, isMobileUa } = this.state
		return (
			<div role="main" className="position-relative">
				<div 
					className={`w-100 position-absolute bg-primary ${isMobileUa ? 'invisible' : ''}`}
					style={{height: 200, top: 0, left: 0, zIndex: -1}}
				/>
				<div className="position-relative">
					<div className={isMobileUa ? 'position-relative' : 'position-sticky'} style={{height: "600px", top: isMobileUa ? 0 : 100}}>
						<Container className={`container-sm h-100 ${isMobileUa ? 'p-0' : ''}`}>
							<Row>
								<Col xs="12" lg="4">
									<Col xs="12" className="position-relative mb-5 px-0" style={{height: "470px", overflow: "hidden"}}>
										<img width="100%" src={testimonial.coverPotrait} alt={testimonial.title} className={isMobileUa ? '' : 'rounded-lg'} />
									</Col>
									{
										!isMobileUa ?
											<Col xs="12" className="mb-5">
												<div className="d-flex align-items-center justify-content-between">
													<h4 className="title-section text-dark m-0">Share to</h4>
													<div className="bg-primary text-white py-1 px-3 d-flex align-items-center justify-content-between rounded-lg">
														<span style={{ top: '4px' }} className="icon-facebook h4 position-relative" />
														<h5 className="title-section mb-0 pl-3">Facebook Friend</h5>
													</div>
												</div>
											</Col> : ""
									}
								</Col>
							</Row>
						</Container>
					</div>
					<Container className="container-sm" style={{marginTop: isMobileUa ? "-330px" : "-600px"}}>
						<Row className="pt-5 bg-grey">
							<Col xs="12" lg="4" />
							<Col xs="12" lg="8" className="pt-5 mt-2">
								<Row>
									<Col xs="12">
										<div className="text-center mb-4" style={{ marginTop: '50px' }}>
											<img
												className="rounded-circle border border-white"
												width="80" height="80"
												src={testimonial.captainPicture}
											/>
											<div className="pt-2">
												<strong>{testimonial.captainName}</strong>
												<span>on</span>
											</div>
											<div className="pt-3">
												<img height="120" src={testimonial.iconCover} />
											</div>
											<div className="pt-3 d-flex justify-content-center">
												<div className="text-center mr-3">
													<span className="h1 icon-icon_distance text-gray80" />
													<br />
													<span className="text-sm">Distance</span>
													<br />
													<b>{testimonial.distance} Km</b>
												</div>
												<div className="text-center ml-3">
													<span className="h1 icon-icon_duration text-gray80" />
													<br />
													<span className="text-sm">Duration</span>
													<br />
													<b>{testimonial.duration} Days</b>
												</div>
											</div>
										</div>
									</Col>
									<Col xs="12">
										<p className="container mb-0" dangerouslySetInnerHTML={{ __html: testimonial.description }} />
										<div className="article-img__fluid" dangerouslySetInnerHTML={{__html: testimonial.article}} />
									</Col>
									{
										isMobileUa ?
											<Col xs="12" className="mt-5 mb-3">
												<div className="d-flex align-items-center justify-content-between">
													<h4 className="title-section text-dark m-0">Share to</h4>
													<div className="bg-primary text-white py-1 px-3 d-flex align-items-center justify-content-between rounded-lg">
														<span style={{ top: '4px' }} className="icon-facebook h4 position-relative" />
														<h5 className="title-section mb-0 pl-3">Facebook Friend</h5>
													</div>
												</div>
											</Col> : ''
									}
								</Row>
							</Col>
						</Row>
					</Container>
					{
						albums ?
							<div className="w-100 mt-4 bg-softgray">
								<Container className={`container-sm pt-3 pb-4 ${isMobileUa ? 'px-0' : ''}`}>
									<Row>
										<Col xs="12" lg="4" />
										<Col xs="12" lg="8" className="text-center">
											<Col xs="12">
												<h4 className="h5 text-dark">_____</h4>
												<h1 className="h2 title-section text-dark mb-3">GALLERY</h1>
											</Col>
											<Col xs="12" className="d-inline-block">
												<div style={{
													height: showFullAlbums ? "auto" : isMobileUa ? "232px" : "405px",
													overflow: showFullAlbums ? "auto" : "hidden"
												}}>
												{
													albums.map((data, key) => (
														<div 
															key={key}
															className="d-block px-2"
															onClick={() => this.zoomAlbumImage(data.picture)}
															style={{
																width: "50%", 
																float: "left"
															}}
														>
															<div 
																className="m-2"
																style={{
																	width: "100%", 
																	paddingBottom: "60%",
																	backgroundImage: `url(${data.picture})`,
																	backgroundSize: "cover"
																}}
															/>
														</div>
													))
												}
												</div>
											</Col>
											{
												albums && albums.length > 4 ?
													<Col xs="12" className="mb-3 pt-0">
														<div className="btn btn-primary d-block rounded-lg" onClick={() => this.setState({showFullAlbums: true})}>SEE ALL</div>
													</Col> : ""
											}
										</Col>
									</Row>
								</Container>
							</div> : ''
					}
				</div>
				{
					trips.list ? 
					<Container className="container-sm pt-3">
						<h1 className="h2 title-section text-primary my-3">MAKE YOUR OWN TRIP!</h1>
						<Row>
							<Col xs="12" lg="12" className="mb-2 px-2 overflow-hidden">
								<TripSliderCard sliderData={trips} maxLength={5} portrait={true} infoPrice={true} />
							</Col>
						</Row>
					</Container> : ''
				}
				{ this.renderAlbumModal() }
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
export default connect(state => state, mapDispatchToProps)(TestimonialDetail)
