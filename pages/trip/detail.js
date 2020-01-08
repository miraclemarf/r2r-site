import React from 'react';
import Link from 'next/link';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { priceAbbr } from '../../components/functions';
import TripSliderCard from '../../components/tripSlider'
import SimpleBar from 'simplebar-react';
import { Container, Row, Col} from 'reactstrap'
import 'simplebar/dist/simplebar.min.css';
import { getLatestMotor, getDetailTrip, getLatestTrips } from '../../utils';
import SquareCover from '../../components/squareCover';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee, faStar, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons'
import {
	FacebookShareButton, FacebookIcon, WhatsappShareButton, WhatsappIcon
} from 'react-share';

class TripDetail extends React.Component {
	static async getInitialProps({ req, store, query: { id } }) {

		let props = {
			idTrip: id,
			footer: 'collapse',
			scrollHeader: true,
			navDesktopdark: true,
			shareUrl: req ? req.headers ? req.headers.host : location.host : location.host
		}

		await store.dispatch(getLatestMotor());
		await store.dispatch(getLatestTrips(0, 6));
		await store.dispatch(getDetailTrip(id));
		return props;
	}
	constructor(props) {
		super(props);
		this.state = {
			...props
		};
	}

	async componentDidMount() {
		var itinerariesListEl = document.querySelectorAll('#itinerary .list-element');
		var itinerariesEl = document.querySelector('#itinerary');
		if (itinerariesListEl.length > 1) {

			var collapseHight = itinerariesListEl[0].clientHeight + 225;
			itinerariesEl.setAttribute(
				'style',
				itinerariesEl.getAttribute('style') + '; max-height:' + collapseHight + 'px'
			);
		}
	}
	toggleItinerary(e) {
		var itinerariesEl = document.querySelector('#itinerary');
		var collapseEl = document.querySelector('#collapseTransparent');
		if (itinerariesEl.style.overflowY == 'hidden') {
			itinerariesEl.setAttribute('style', '');
			collapseEl.style.display = 'none';
		}
	}
	renderItineraries(data, key) {
		return (
			<div key={key} className="mb-2 position-relative list-element">
				<h2 className="title-section text-white mb-3">{data.groupTitle}</h2>
				<div className="verticalLine bg-gray80 collapse show" />
				{data.details.map((item, index) => (
					<div key={index} className="mb-4 position-relative" style={{ paddingLeft: '2.3em' }}>
						<div
							className="rounded-circle bg-secondary position-absolute collapse show"
							style={{ width: '11px', height: '11px', left: '0', zIndex: '4' }}
						/>
						<div>
							{
								item.imageItinerary ?
									<img src={item.imageItinerary} className="img-fluid mb-2" />
									: ''
							}
							<h3 className="title-section text-white m-0">{item.title}</h3>
							{item.description ? (
								<div
									className="text-white text-sm text-justify"
									dangerouslySetInnerHTML={{ __html: item.description }}
								/>
							) : (
									''
								)}
						</div>
						{index == data.details.length - 1 ? <div className="verticalLine bg-dark" /> : ''}
					</div>
				))}
			</div>
		);
	}
	renderHotel() {
		const dummyHotelData = ['Santika Residence', 'Sahid Inn', 'Holiday Inn', 'Hotel Indonesia']
		const { isMobileUa } = this.state
		return (
			<div>
				{
					!isMobileUa ?
						<SimpleBar>
							<div id="hotel" className="sliderMobile d-flex flex-nowrap flex-wrap pb-4" style={{ marginRight: '-15px' }}>
								{dummyHotelData.map((item, index) => (
									<div style={{ "flex": "0 0 30%", "maxWidth": "30%" }} key={index} className="pr-3">
										<div className="mb-3">
											{<img className="img-fluid rounded" src={process.env.DUMMY + '/hotel-r2r-' + index + '.jpg'} />}
										</div>
										<div className="mb-1">
											<FontAwesomeIcon style={{ "color": "#FBB040" }} icon={faStar} />
											<FontAwesomeIcon style={{ "color": "#FBB040" }} icon={faStar} />
											<FontAwesomeIcon style={{ "color": "#FBB040" }} icon={faStar} />
										</div>
										<div><strong>{item}</strong></div>
										<div>
											<span className="text-sm">Jl. Ipda Tut Harsono No.11, Muja Muju, Kec. Umbulharjo, Kota Yogyakarta</span>
										</div>
									</div>
								))}
							</div>
						</SimpleBar>
						:
						<div id="hotel" className="sliderMobile d-flex flex-nowrap flex-wrap pb-4" style={{ marginRight: '-15px' }}>
							{dummyHotelData.map((item, index) => (
								<div style={{ "flex": "0 0 90%", "maxWidth": "90%" }} key={index} className="pr-3">
									<div className="mb-3">
										{<img className="img-fluid rounded" src={process.env.DUMMY + '/hotel-r2r-' + index + '.jpg'} />}
									</div>
									<div className="mb-1">
										<FontAwesomeIcon style={{ "color": "#FBB040" }} icon={faStar} />
										<FontAwesomeIcon style={{ "color": "#FBB040" }} icon={faStar} />
										<FontAwesomeIcon style={{ "color": "#FBB040" }} icon={faStar} />
									</div>
									<div><strong>{item}</strong></div>
									<div>
										<span className="text-sm">Jl. Ipda Tut Harsono No.11, Muja Muju, Kec. Umbulharjo, Kota Yogyakarta</span>
									</div>
								</div>
							))}
						</div>
				}
			</div>

		)
	}
	renderFaciltyInclude(data, key) {
		return (
			<div key={key} className="d-flex justify-content-start align-items-center pb-3">
				<div className="mr-3">
					<img src={data.picture} className="img-fluid" width="35" />
				</div>
				<div className="align-self-center">
					<span>{data.title}</span>
				</div>
			</div>
		);
	}

	render() {


		const motor = this.state.MotorData;
		const {
			id,
			coverLandscape,
			title,
			iconCover,
			location,
			distance,
			duration,
			terrain,
			maxRider,
			description,
			map,
			facilityNotIncluded,
			roadCaptainName,
			imageRoadCaptain,
			roadCaptainDescription,
			facilities,
			itineraries,
			tripPrice
		} = this.state.TripData.detail;
		const { isMobileUa, shareUrl } = this.state
		const otherTrips = this.state.TripData.list
		return (
			<div role="main" style={{paddingTop: !isMobileUa ? '6em' : '0' }}>
				<div className={!isMobileUa ? "container" : ""}>
					<div className={!isMobileUa ? "position-fixed cover-scroll" : ""}>
						<SquareCover imgCover={coverLandscape} withIcon={true} iconTrip={iconCover} text={title} />
					</div>
					<div className={!isMobileUa ? "sidebar-container" : ""}>
						<div className="mx-3 position-relative">
							<div className="py-3">
								<span className="text-primary text-sm">
									<FontAwesomeIcon className="text-gray80" icon={faMapMarkerAlt} width="10.5" />
									<b className="pl-2">{location}</b>
								</span>
							</div>
							<div className="mb-4 pb-2">
								<h2 className="title-section">About the tour</h2>
								<div className={"d-flex justify-content-around mb-3 " + (!isMobileUa ? "w-50" : "")}>
									<div className="text-center">
										<span className="h3 icon-icon_distance text-gray80" />
										<br />
										<span className="text-sm">Distance</span>
										<br />
										<b className="text-sm">{distance} Km</b>
									</div>
									<div className="text-center">
										<span className="h3 icon-icon_duration text-gray80" />
										<br />
										<span className="text-sm">Duration</span>
										<br />
										<b className="text-sm">{duration} Days</b>
									</div>
									<div className="text-center">
										<span className="h3 icon-icon_terrain text-gray80" />
										<br />
										<span className="text-sm">Terrain</span>
										<br />
										<b className="text-sm">{terrain}</b>
									</div>
									<div className="text-center">
										<span className="h3 icon-icon_bike text-gray80" />
										<br />
										<span className="text-sm">Max Rider</span>
										<br />
										<b className="text-sm">{maxRider}</b>
									</div>
								</div>
								<div dangerouslySetInnerHTML={{ __html: description }} />
								<div className={isMobileUa ? "d-flex justify-content-between align-items-center pt-3" : ""}>
									<div><h4 className={"title-section " + (isMobileUa ? "m-0" : "")}>Share to</h4></div>

									<div className="d-flex justify-content-start socshare">
										<FacebookShareButton
											url={shareUrl}
											quote={title}>
											<FacebookIcon
												size={40}
												round={false} />
										</FacebookShareButton>
										<div className="px-1"></div>
										<WhatsappShareButton
											url={shareUrl}
											title={title}>
											<WhatsappIcon
												size={40}
												round={false} />
										</WhatsappShareButton>
									</div>
								</div>
								{!isMobileUa ?
									<div>
										<div className="position-absolute" style={{ bottom: "0", right: "0", width: "35%" }}>
											<div className="d-flex align-items-center justify-content-between pb-2">
												<div style={{ fontSize: '80%' }} className="font-weight-light">
													Start From</div>
												<div
													className="font-weight-bold"
													dangerouslySetInnerHTML={{ __html: priceAbbr(false, tripPrice) }}
												/>
											</div>
											<Link
												href={'/transaction/price?page=price&id=' + id}
												as={process.env.HOST_DOMAIN + '/trip/' + id + '/price'}
											>
												<button className="btn btn-sm btn-primary w-100 rounded">
													<div className="text-center">
														<div>Check Date</div>
													</div>
												</button>
											</Link>
										</div>
									</div> : ''
								}
							</div>
						</div>
						<div
							id="itinerary"
							style={{ overflowY: 'hidden' }}
							className="bg-dark py-4 position-relative"
						>
							<div className="inner">
								<div className="mx-3 ">
									<h2 className="title-section text-white pb-3">itinerary</h2>
									<div>
										{itineraries.map((data, key) => this.renderItineraries(data, key))}
										{itineraries.length > 1 ? (
											<div
												id="collapseTransparent"
												className="position-absolute w-100 pb-2"
												style={{ bottom: '0', margin: '0 -15px', paddingTop: '6em', zIndex: '99' }}
											>
												<h3
													onClick={(e) => this.toggleItinerary(e)}
													className="title-section text-center text-secondary position-relative py-1 mx-auto rounded"
													style={{ zIndex: '100', border: '1px solid', width: '160px', top: '-10px' }}
												>
													Show All
													</h3>
												<div />
											</div>
										) : (

												''
											)}
									</div>
								</div>
							</div>
						</div>
						<div className="container my-4">
							<h2 className="title-section mb-2">THE ROUTE</h2>
							<div className="embed-responsive embed-responsive-4by3" dangerouslySetInnerHTML={{ __html: map }}>
							</div>
						</div>
						<div id="bikeslide" className="container mb-4 pb-4">
							<div className=" d-flex justify-content-between mb-3">
								<h2 className="title-section">MOTORCYCLE CHOICES</h2>
								{/* <a href={process.env.HOST_DOMAIN + "/gallery"} style={{ "top": "7px" }} className="text-sm position-relative text-primary d-block font-weight-bold">
                            View All</a> */}
							</div>
							{
								!isMobileUa ?
									<SimpleBar>
										<div className={"sliderMobile d-flex align-items-stretch"} style={{ marginRight: '-15px' }}>
											{motor.map((item, key) => (
												<div key={key} className="mr-3">
													{/*<img src={item.picture} height="110" />*/}
													{<img height="110" src={process.env.DUMMY + '/motor-r2r-' + key + '.png'} />}
												</div>
											))}
										</div>
									</SimpleBar>
									:
									<div className={"sliderMobile d-flex align-items-stretch"} style={{ marginRight: '-15px' }}>
										{motor.map((item, key) => (
											<div key={key} className="mr-3">
												{/*<img src={item.picture} height="110" />*/}
												{<img height="110" src={process.env.DUMMY + '/motor-r2r-' + key + '.png'} />}
											</div>
										))}
									</div>

							}

						</div>
						<div className="container">
							<h2 className="title-section mb-3">WHERE TO STAY</h2>
							{this.renderHotel()}
						</div>
						<div className="container">
							<h2 className="title-section">INCLUDED</h2>
							<div className="py-2">{facilities.map((item, key) => this.renderFaciltyInclude(item, key))}</div>
							<h2 className="title-section">NOT INCLUDED</h2>
							<div className="pb-4">
								<div dangerouslySetInnerHTML={{ __html: facilityNotIncluded }} />
							</div>
						</div>
						<div className="container">
							<a className="d-block text-black" href={process.env.HOST_DOMAIN + '/term-condition'}>
								<div className="border-bottom border-top mb-3 pb-2 pt-3 d-flex justify-content-between align-items-center">
									<h2 className="title-section m-0">TERM AND CONDITION</h2>
									<span className="icon-right-arrow text-primary" />
								</div>
							</a>
							<div className="border-bottom mb-3 pb-2 d-flex justify-content-between align-items-center">
								<h2 className="title-section m-0">WHAT TO BE PREPARED?</h2>
								<span className="icon-right-arrow text-primary" />
							</div>
							<a className="d-block text-black" href={process.env.HOST_DOMAIN + '/faq'}>
								<div className="border-bottom mb-3 pb-2 d-flex justify-content-between align-items-center">
									<h2 className="title-section m-0">FAQ</h2>
									<span className="icon-right-arrow text-primary" />
								</div>
							</a>
						</div>
						<div className="container">
							<h2 className="title-section  mb-3 pt-3">MEET THE RC</h2>
							<div className="text-center">
								<img
									className="rounded-circle border border-white float-left"
									style={{ marginRight: 20 }}
									width="80"
									height="80"
									src={imageRoadCaptain}
								/>
								<div className="pt-2 float-left text-left" style={{ width: 'calc(100% - 100px)' }}>
									<h3 className="title-section">{roadCaptainName} </h3>
								</div>
							</div>
							<div>
								<p>{roadCaptainDescription}</p>
							</div>
						</div>
						{
							otherTrips ?
								<Container className="container-sm pt-2 pb-4 bg-grayF2" style={{marginBottom:"-1em"}}>
									<h1 className="h2 title-section text-primary my-3">Other Trips</h1>
									<Row>
										<Col xs="12" lg="12" className="px-2 overflow-hidden">
											<TripSliderCard sliderData={this.state.TripData} maxLength={5} portrait={true} infoPrice={true} />
										</Col>
									</Row>
								</Container> : ''
						}
						{isMobileUa ?
							<div className="fixed-bottom" style={{ zIndex: "15" }}>
								<Link
									href={'/transaction/price?page=price&id=' + id}
									as={process.env.HOST_DOMAIN + '/trip/' + id + '/price'}
								>
									<button className="btn btn-primary w-100">
										<div className="d-flex justify-content-between">
											<div
												className="invisible"
												style={{ fontFamily: '"Open Sans", sans-serif', lineHeight: '18px' }}
											>
												<div style={{ fontSize: '40%' }} className="font-weight-light">
													Start From
									</div>
												<div style={{ fontSize: '70%' }} className="font-weight-bold">
													$120
									</div>
											</div>
											<div>Check Date</div>
											<div
												style={{
													fontFamily: '"Open Sans", sans-serif',
													lineHeight: '18px',
													marginTop: '-1px'
												}}
											>
												<div style={{ fontSize: '40%' }} className="font-weight-light">
													Start From
									</div>
												<div
													style={{ fontSize: '70%' }}
													className="font-weight-bold"
													dangerouslySetInnerHTML={{ __html: priceAbbr(true, tripPrice) }}
												/>
											</div>
										</div>
									</button>
								</Link>
							</div> : ''
						}

					</div>
				</div>
				<style jsx global>{`
				.cover-scroll{
					width:27%;
					z-index:100;
				}
				.cover-scroll .squareCover > div.overlay--img__blue{
					padding-top:125%;
					border-radius:6px;
				}
				.cover-scroll .squareCover > div.overlay--img__blue::before{
					border-radius:6px;
				}
				.sidebar-container{
					max-width:63%;
					margin-left:auto;
					position:relative;
					top:-1em;
				}
				.sidebar-container #itinerary .inner{
					max-width:52%;
					margin-left:auto;
					margin-right:5%;
				}
				.sidebar-container #itinerary{
					width: 100vw;
					left: calc(-50vw + 20.8%);
					overflow-x:hidden
				}
				.sidebar-container #itinerary #collapseTransparent{
					width: 100vw;
					left: calc(-49vw + 50%);
				}
				.sidebar-container #itinerary #collapseTransparent h3{
					left:8.5em;
				}
				.socshare .social-icon{
					border-radius:4px;
				}
               
            `}</style>
			</div>
		);
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		getLatestMotor: bindActionCreators(getLatestMotor, dispatch),
		getDetailTrip: bindActionCreators(getDetailTrip, dispatch),
		getLatestTrips: bindActionCreators(getLatestTrips, dispatch)
	};
};
export default connect((state) => state, mapDispatchToProps)(TripDetail);
