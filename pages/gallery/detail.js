import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Link from 'next/link'
import SquareCover from '../../components/squareCover'
import TripSliderCard from '../../components/tripSlider'
import { Container, Row, Col } from 'reactstrap'
import { getDetailGallery, getLatestGallery, getLatestTrips } from '../../utils'

class GalleryDetail extends React.Component {
	static async getInitialProps({ store , query: { id } }) {
		// Inherit standard props from the Page (i.e. with session data)
		let props = { footer: 'transparent', scrollHeader: true }
        let stores = await store.getState()
        try {
            // Detail Scope
			const detailRes = await getDetailGallery(id)
			props.galleryDetail = detailRes
			// Gallery Scope
            if (!stores.GalleryData) await store.dispatch(getLatestGallery(0, 6))
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
			galleryDetail: props.galleryDetail
		}
	}

    componentWillReceiveProps(nextProps) {
		this.setState({
			trips: nextProps.TripData,
			galleryDetail: nextProps.galleryDetail,
			gallery: nextProps.GalleryData
		})
	}

	render() {
        const { galleryDetail, gallery, trips } = this.state
		return (
			<div role="main">
				<SquareCover imgCover={galleryDetail.coverLandscape} withIcon={true} />
                <Container className="container-sm">
                    <div className="text-center position-relative mb-4">
                        <div className="pt-4">
                            <img height="120" src={galleryDetail.iconCover} />
                        </div>
                        <div className="pt-3 d-flex justify-content-center">
                            <div className="text-center mr-3">
                                <span className="h1 icon-icon_distance text-gray80" />
                                <br />
                                <span className="text-sm">Distance</span>
                                <br />
                                <b>{galleryDetail.distance} Km</b>
                            </div>
                            <div className="text-center ml-3">
                                <span className="h1 icon-icon_duration text-gray80" />
                                <br />
                                <span className="text-sm">Duration</span>
                                <br />
                                <b>{galleryDetail.duration} Days</b>
                            </div>
                        </div>
                    </div>
                    <Row>
                        <p className="container mb-0" dangerouslySetInnerHTML={{ __html: galleryDetail.description }} />
                        <div className="article-img__fluid" dangerouslySetInnerHTML={{ __html: galleryDetail.article }} />
                        <Col xs="12" lg="12">
                            <div className="my-4 d-flex align-items-center justify-content-between">
								<h4 className="title-section text-dark m-0">Share to</h4>
								<div className="bg-primary text-white py-1 px-3 d-flex align-items-center justify-content-between rounded-lg">
									<span style={{ top: '4px' }} className="icon-facebook h4 position-relative" />
									<h5 className="title-section mb-0 pl-3">Facebook Friend</h5>
								</div>
							</div>
                        </Col>
                    </Row>
                </Container>
				<div className="tiles bg-grayF2 py-4">
					<Container className="container-sm">
						<div className="py-2" />
						<h2 className="title-section text-center title-section__with-border pb-2">Gallery</h2>
						<div style={{ margin: '0 -4px' }} className="row no-gutters">
							{gallery.slice(0, 2).map((item, key) => (
								<div key={key} className={`p-2 ${key == 2 ? 'col-12' : 'col-6'}`}>
									<img src={item.coverLandscape} className="img-fluid border-0 rounded-lg" />
								</div>
							))}
						</div>
						<Link href={"/gallery"} href={`${process.env.HOST_DOMAIN}/gallery`}>
							<a className="mt-2 btn btn-primary d-block rounded-lg">SEE ALL</a>
						</Link>
					</Container>
				</div>
				{
					trips ? 
					<Container className="container-sm pt-2">
						<h1 className="h2 title-section text-primary my-3">MAKE YOUR OWN TRIP!</h1>
						<Row>
							<Col xs="12" lg="12" className="mb-2 px-2 overflow-hidden">
								<TripSliderCard sliderData={trips} />
							</Col>
						</Row>
					</Container> : ''
				}
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
export default connect(state => state, mapDispatchToProps)(GalleryDetail)