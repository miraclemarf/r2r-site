import React from 'react'
import fetch from 'isomorphic-unfetch'
import { Helmet } from 'react-helmet'
import MainCover from '../components/mainCover'
import TripCard from '../components/tripCard'
import TestimonialCard from '../components/testimonialCard'
import GalleryCard from '../components/galleryCard'
import BannerHowItWorks from '../components/fragments/bannerHowItWorks'
import BannerJoinComm from '../components/fragments/bannerJoinComm'
import Page from '../components/page'
import { getUser } from '../utils/user'
import { Container, Row, Col } from 'reactstrap'

export default class Home extends Page {
	static async getInitialProps({ req }) {
		// Inherit standard props from the Page (i.e. with session data)
		let props = await super.getInitialProps({req})
		console.log(props.stateProps)
		if (typeof window === 'undefined') {
			try {
				// Trips Scope
				const tripsRes = await fetch(`${process.env.API_URL}/trips/0/4`)
				const tripsData = await tripsRes.json()
				// Headline Scope
				const headlineRes = await fetch(`${process.env.API_URL}/headline`)
				const headlineData = await headlineRes.json()
				// Testimonial Scope
				const testiMonialsRes = await fetch(`${process.env.API_URL}/testimonial/all-testimonials/0/5`)
				const testimonialsData = await testiMonialsRes.json()
				// Gallery Scope
				const galleryRes = await fetch(`${process.env.API_URL}/gallery/all-galleries/0/5`)
				const galleryData = await galleryRes.json()
				// Initial Props Scope
				props.headline = headlineData.object
				props.trips = tripsData.object
				props.testimonials = testimonialsData.object
				props.gallery = galleryData.object,
				props.pageUrl = process.env.HOST_DOMAIN
			} catch (e) {
				props.error = 'Unable to fetch AsyncData on server'
			}
		}
		return props;
	}
	constructor(props) {
		super(props)
		getUser()

		this.state = {
			pageTitle: "Road 2 Ring",
			pageKeywords: "road2ring,traveling,touring,journey,adventure,trip,community",
			pageDescription: "ROAD2RING - UNFORGETABLE JOURNEY OF A LIFETIME",
			pageAuthor: "ROAD2RING",
			pageUrl: props.pageUrl
		}
	}

	render() {
		const { pageTitle, pageDescription, pageAuthor, pageUrl, pageKeywords } = this.state
		const { headline, trips, testimonials, gallery } = this.props
		return (
			<div role="main">
				<Helmet>
                    <title>{pageTitle}</title>
                    <meta name="description" content={pageDescription}/>
                    <meta name="keywords" content={pageKeywords}/>
                    <link rel="canonical" href={pageUrl} />
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
				<Container>
					<Row>
						<Col xs="12" lg="12">
							<h1 className="h2 title-section mb-3">Next Trips</h1>
						</Col>
						{trips.map((item, key) => <TripCard key={key} {...item} />)}
						<Col xs="12" lg="12">
							<a href={`${pageUrl}/trips`} className="btn btn-primary d-block">SEE ALL TRIP</a>
							<hr/>
						</Col>
						<Col xs="12" lg="12">
							<h1 className="h2 title-section mb-3">Testimonial</h1>
						</Col>
						<Col xs="12" lg="12" className="mb-2 px-2 overflow-hidden">
							<TestimonialCard sliderData={testimonials} />
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
					<Container>
						<div className=" d-flex justify-content-between mb-3">
							<h1 className="h2 title-section text-white m-0">Gallery</h1>
							<a href={`${pageUrl}/gallery`} style={{"top":"8px"}} className="text-sm position-relative text-white d-block font-weight-bold">View All</a>
						</div>
						<Row>
							<Col xs="12" lg="12" className="mb-2 px-2 overflow-hidden">
								<GalleryCard sliderData={gallery} />
							</Col>
						</Row>
					</Container>
				</div>
			</div>
		)
	}
}
