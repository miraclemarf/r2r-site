import React from 'react'
import Link from 'next/link'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Helmet } from 'react-helmet'
import MainCover from '../components/mainCover'
import TripCard from '../components/tripCard'
import TestimonialSliderCard from '../components/testimonialSlider'
import GallerySliderCard from '../components/gallerySlider'
import BannerHowItWorks from '../components/fragments/bannerHowItWorks'
import BannerJoinComm from '../components/fragments/bannerJoinComm'
import { getUser } from '../utils/user'
import { Container, Row, Col } from 'reactstrap'
import { getHeadline, getLatestGallery, getLatestTestimonial, getLatestTrips } from '../utils'

class Home extends React.Component {
	static async getInitialProps({ store }) {
		let props = {}
		try {
			let stores = await store.getState()
			// Headline Scope
			await store.dispatch(getHeadline()) 
			// Trips Scope
			await store.dispatch(getLatestTrips(0, 10))
			// Testimonial Scope
			await store.dispatch(getLatestTestimonial(0, 5)) 
			// Gallery Scope
			if (!stores.GalleryData) await store.dispatch(getLatestGallery(0, 6))
			props.scrollHeader = true
		} catch (e) {
			props.error = 'Unable to fetch AsyncData on server'
		}
		

		return props
	}
	constructor(props) {
		super(props)
		getUser()


		this.state = {
			pageTitle: "Road 2 Ring",
			pageKeywords: "road2ring,traveling,touring,journey,adventure,trip,community",
			pageDescription: "ROAD2RING - UNFORGETABLE JOURNEY OF A LIFETIME",
			pageAuthor: "ROAD2RING",
			trips: props.TripData.list,
			headline: props.HeadlineData,
			testimonials: props.TestimonialsData,
			gallery: props.GalleryData
		}
	}

	componentWillReceiveProps(nextProps) {
		this.setState({
			trips: nextProps.TripData.list,
			headline: nextProps.HeadlineData,
			testimonials: nextProps.TestimonialsData,
			gallery: nextProps.GalleryData
		})
	}

	render() {
		const { 
			pageTitle, pageDescription, pageAuthor, pageKeywords, trips, headline, testimonials, gallery 
		} = this.state
		console.log(testimonials)
		return (
			<div role="main">
				<Helmet>
                    <title>{pageTitle}</title>
                    <meta name="description" content={pageDescription}/>
                    <meta name="keywords" content={pageKeywords}/>
                    <link rel="canonical" href={process.env.HOST_DOMAIN} />
					<script type="application/ld+json">
					{`{
						"@context": "http://schema.org",
						"@type": "WebPage",
						"name": "${pageTitle}",
						"author": "${pageAuthor}",
						"description": "${pageDescription}"
                    }`}
					</script>
                </Helmet>
				<MainCover {...headline} />
				<Container className="container-sm">
					<Row>
						<Col xs="12" lg="12">
							<h1 className="h2 title-section mb-3">Next Trips</h1>
						</Col>
						<Row className="m-auto w-100">
							{trips.map((item, key) => <TripCard key={key} {...item} />)}
						</Row>
						<Col xs="12" lg="12">
							<Link href="/trips" as={`${process.env.HOST_DOMAIN}/trips`}>
								<a className="btn btn-primary d-block rounded-lg">SEE ALL TRIP</a>
							</Link>
							<hr/>
						</Col>
						<Col xs="12" lg="12">
							<h1 className="h2 title-section mb-3">Testimonial</h1>
						</Col>
						<Col xs="12" lg="12" className="mb-2 px-2 overflow-hidden">
							<TestimonialSliderCard sliderData={testimonials.slice(0, 5)} />
						</Col>
						<Col sm="12" md="6" className="px-0">
							<BannerHowItWorks />
						</Col>
						<Col sm="12" md="6" className="px-0">
							<BannerJoinComm />
						</Col>
					</Row>
				</Container>
				<div className="bg-dark pt-4">
					<Container className="container-sm">
						<div className=" d-flex justify-content-between mb-3">
							<h1 className="h2 title-section text-white m-0">Gallery</h1>
							<Link href="/gallery" as={`${process.env.HOST_DOMAIN}/gallery`}>
								<a style={{top: "8px"}} className="text-sm position-relative text-white d-block font-weight-bold">View All</a>
							</Link>
						</div>
						<Row>
							<Col xs="12" lg="12" className="mb-0 px-2 overflow-hidden">
								<GallerySliderCard sliderData={gallery.slice(0, 6)} />
							</Col>
						</Row>
					</Container>
				</div>
			</div>
		)
	}
}

const mapDispatchToProps = dispatch => {
	return {
		getLatestGallery: bindActionCreators(getLatestGallery, dispatch),
		getLatestTestimonial: bindActionCreators(getLatestTestimonial, dispatch),
		getLatestTrips: bindActionCreators(getLatestTrips, dispatch),
		getHeadline: bindActionCreators(getHeadline, dispatch)
	}
}
export default connect(state => state, mapDispatchToProps)(Home)