import React from 'react'
import Link from 'next/link'
// import TextImgCard from '../components/textImgCard'
import Page from '../components/page'
import { Container, Row, Col } from 'reactstrap'

export default class extends Page {
	static async getInitialProps({ req }) {
		// Inherit standard props from the Page (i.e. with session data)
		let props = {}
		try {
			props.footer = 'transparent'
			props.scrollHeader = false
		} catch (e) {}
		return props;
	}
	constructor(props) {
		super(props);
		this.state = {}
	}
	render() {
		return (
			<div role="main">
				<Container fluid className="position-relative m-0 p-0 w-100">
					<div className="mainBanner-lg p-0 w-100 text-white">
						<div className="overlay--img__black d-inline-block w-100">
							<img width="100%" height="auto" className="card-img" src={`${process.env.HOST_URL}/img/assets/15615436185264qcatc0c.jpeg`} />
							<div className="card-img-overlay d-flex align-items-center">
								<div className="mx-auto text-center">
									<span className="d-block icon-logogram_r2r h3 mt-3"></span>
									<h2 style={{"lineHeight":"normal"}} className="title-section text-center text-break m-0">The Community</h2>
								</div>
							</div>
						</div>
					</div>
				</Container>
				<Container className="container-sm">
					<Row>
						<Col xs="12" lg="12" className="p-0">
							<h1 className="p-3 m-0 title-section">Join the Community!</h1>
							<p className="container">
							Freedom and ease is all we could offer to our customer and friends.. the experience that no other travel service could give you, Enjoying Indonesia with our selection Premium Motorcycle. From West To East, Mountains and exotic beaches..come Join us and start your unforgettable adventure today! We know traveling in motorcycle is more than just travelling, We are more like a family and We welcome you to join to our community!
							</p>
							<p className="container">
							Feel free if you want to visit our office to have a chit chat with us!
							</p>
						</Col>
					</Row>
				</Container>
			</div>
		);
	}
}
