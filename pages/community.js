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
			props.footer = 'transparent';
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
				<Container className="m-auto">
					<Row>
						<Col xs="12" lg="12" className="mainBanner-lg p-0 w-100 text-white">
							<div className="overlay--img__black d-inline-block w-100">
								<img width="100%" height="auto" className="card-img" src={`${process.env.HOST_URL}/img/assets/15615436185264qcatc0c.jpeg`} />
								<div className="card-img-overlay d-flex align-items-center">
									<div className="mx-auto text-center">
										<span className="d-block icon-logogram_r2r h3 mt-3"></span>
										<h2 style={{"lineHeight":"normal"}} className="title-section text-center text-break m-0">The Community</h2>
									</div>
								</div>
							</div>
						</Col>
						<Col xs="12" lg="12" className="p-0">
							<h1 className="p-3 m-0 title-section">Community</h1>
							<p className="container mt-0 mb-5">
								The Bromo Tengger Semeru National Park offers some of the most amazing landscapes in the whole
								of Indonesia. It is especially beautiful at sunrise as the mist rolls over the valley and the
								sun rises behind Bromo Volcano.
							</p>
						</Col>
					</Row>
				</Container>
			</div>
		);
	}
}
