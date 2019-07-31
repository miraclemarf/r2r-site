import React from 'react'
import fetch from 'isomorphic-unfetch'
// import Link from 'next/link'
import { connect } from 'react-redux'
import { Helmet } from 'react-helmet'
import MainCover from '../components/mainCover'
import TripCard from '../components/tripCard'
import TextImgCard from '../components/textImgCard'
import BannerHowItWorks from '../components/fragments/bannerHowItWorks'
import BannerJoinComm from '../components/fragments/bannerJoinComm'
import Page from '../components/page'
import { Container } from 'reactstrap'
import { getUser } from '../utils/user'
import { removeHtmlTag } from '../components/functions'

export default class extends Page {
	static async getInitialProps({ req }) {
		// Inherit standard props from the Page (i.e. with session data)
		let props = await super.getInitialProps({req})

		if (typeof window === 'undefined') {
			try {
				// Trips Scope
				const tripsRes = await fetch(`${process.env.API_URL}/trips/0/4`)
				const tripsData = await tripsRes.json()
				// Headline Scope
				const headlineRes = await fetch(`${process.env.API_URL}/headline`)
				const headlineData = await headlineRes.json()
				// Testimonial Scope
				const testiMonialsRes =await fetch(`${process.env.API_URL}/testimonial/all-testimonials/0/5`)
				const testimonialsData = await testiMonialsRes.json()
				// Gallery Scope
				const galleryRes = await fetch(`${process.env.API_URL}/gallery/all-galleries/0/5`)
				const galleryData = await galleryRes.json()

				props.headline = headlineData.object
				props.trips = tripsData.object
				props.testimonials = testimonialsData.object
				props.gallery = galleryData.object
				
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
			pageTitle: `ROAD2RING`,
			pageDescription: removeHtmlTag(props.headline.subtitle),
			pageAuthor: "ROAD2RING",
			pageUrl: props.headline.linkUrl
		}
	}

	render() {
		// console.log(this.props);
		const { pageTitle, pageDescription, pageAuthor, pageUrl } = this.state
		console.log(this.props.headline)
		return (
			<Container role="main">
				<Helmet>
                    <title>{pageTitle}</title>
                    <meta name="description" content={pageDescription}/>
                    <meta name="keywords" content={pageTitle.replace(/\s/g,',').toLowerCase()} />
                    <link rel="canonical" href={'pageUrl'} />
					<script type="application/ld+json">
					{`
                        {
                            "@context": "http://schema.org",
                            "@type": "WebPage",
                            "name": "${pageTitle}",
                            "author": "${pageAuthor}",
							"description": "${pageDescription}",
							"logo": "/static/icons/icon.png"
                        }
                    `}
					</script>
                </Helmet>
				<MainCover {...this.props.headline} />
				<div>
					<div className="my-4 mx-3">
						<h1 className="h2 title-section mb-3">Next Trips</h1>
						{this.props.trips.map((item, key) => <TripCard key={key} {...item} />)}
							<a href={process.env.HOST_DOMAIN+"/trips"} className="btn btn-primary d-block">
								SEE ALL TRIP
							</a>
					</div>
					<div className="pt-3 my-4 mx-3 border-top">
						<h1 className="h2 title-section mb-3">Testimonial</h1>
						<div className="sliderMobile d-flex align-items-stretch">
							{this.props.testimonials.map((item, key) => (
								<div key={key} className="mr-3">
									<TextImgCard {...item} iconTextPostion="align-items-end" section="testimonial" />
								</div>
							))}
						</div>
					</div>
					<div>
						<BannerHowItWorks />
					</div>
					<div>
						<BannerJoinComm />
					</div>
					<div className="p-3 bg-dark">
						<div className=" d-flex justify-content-between mb-3">
							<h1 className="h2 title-section text-white m-0">Gallery</h1>
								<a href={process.env.HOST_DOMAIN+"/gallery"} style={{"top":"5px"}} className="text-sm position-relative text-white d-block font-weight-bold">
									View All
								</a>
						</div>
						<div className="sliderMobile d-flex align-items-stretch">
							{this.props.gallery.map((item, key) => (
								<div key={key} className="mr-3">
									<TextImgCard {...item} isLandscape={true} iconTextPostion="align-items-center" section="gallery" />
								</div>
							))}
						</div>
					</div>
				</div>
			</Container>
		);
	}
}

// const mapStateToProps = (state) => { return state }
// export default connect(mapStateToProps, {})(Page)
