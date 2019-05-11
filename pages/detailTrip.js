import React from 'react'
import Link from 'next/link'
import Page from '../components/page'
import { getDetailTrip } from '../utils/trips';
import { getLatestMotor } from '../utils/motor';
import SquareCover from '../components/squareCover';

export default class extends React.Component {
    static async getInitialProps({ req, query: { idTrip } }) {
        let props = {}
        props.idTrip = idTrip;
        props.footer = 'collapse';
        props.transaction = {
            idTrip:idTrip,
            meetingPoint:"",
            startDate:"",
            endDate:"",
            motor:{},
            accesories:[],
            price:[],
            notes:""
        };

        if (typeof window === 'undefined') {
            try {
                const tripData = await getDetailTrip(idTrip);
                const motorData = await getLatestMotor();
                props.trip = tripData;
                props.motor = motorData;

                props.transaction = {
                    idTrip:idTrip,
                    meetingPoint:tripData.object.meetingPoint,
                    startDate:"",
                    endDate:"",
                    motor:{},
                    accesories:[],
                    price:[],
                    notes:""
                };
            } catch (e) {

            }
        }

        return props

    }
    constructor(props) {
        super(props);

        this.state = { ...props };
        
        this.state = {
            trip: props.trip || null,
            motor: props.motor || null,
            id: props.idTrip || ''
        };
        

        
    }

    async componentDidMount() {
        const { idTrip } = this.state
        console.log(this.props);
        console.log(this.state);
        
        
        if (this.state.trip === null) {
            try {
                const tripData = await getDetailTrip(idTrip);
                const motorData = await getLatestMotor();
                this.setState({
                    trip: tripData,
                    motor: motorData,
                    transaction: this.props.transaction,
                });
            } catch (e) {
                this.setState({
                    error: "Unable to fetch AsyncData on client"
                });
            }
        }
        if(this.props.transaction.meetingPoint){
            this.props.transactionState(this.props.transaction)
        }
    }

    renderItineraries(data, key) {
        return (
            <div key={key} className="mb-2 position-relative">
                <h2 className="title-section text-white mb-3">{data.groupTitle}</h2>
                <div className="verticalLine bg-gray80"></div>
                {data.details.map((item, index) => (
                    <div key={index} className="mb-4 position-relative" style={{ paddingLeft: "2.3em" }}>
                        <div className="rounded-circle bg-secondary position-absolute" style={{ width: "11px", height: "11px", left: "0", zIndex: "4" }}></div>
                        <div>
                            {item.imageItinerary ? <img src={process.env.HOST_URL + item.imageItinerary} className="img-fluid mb-2" /> : ''}
                            <h3 className="title-section text-white m-0">{item.title}</h3>
                            {item.description ? <div className="text-white text-sm">{item.description}</div> : ""}
                        </div>
                        {index == data.details.length - 1 ? <div className="verticalLine bg-dark"></div> : ""}
                    </div>
                ))}
            </div>
        )
    }

    renderFaciltyInclude(data, key) {
        return (
            <div key={key} className="d-flex justify-content-start align-items-center pb-3">
                <div className="mr-3">
                    <img src={process.env.HOST_URL + data.picture} className="img-fluid" width="35" />
                </div>
                <div className="align-self-center">
                    <span>{data.title}</span>
                </div>
            </div>
        )

    }


    render() {
        const motor = this.state.motor.object;
        console.log(this.state);
        

        const { id, coverLandscape, iconCover, location, distance, duration, terrain, maxRider, description, facilityNotIncluded,roadCaptainName, imageRoadCaptain, roadCaptainDescription, facilities, itineraries } = this.state.trip.object
        return (
            <div style={{ "paddingBottom": "4em" }}>
                <SquareCover imgCover={process.env.HOST_URL + coverLandscape} withIcon={true} iconTrip={process.env.HOST_URL + iconCover} />
                <div className="container">
                    <div className="py-3">
                        <span className="text-primary text-sm"><b>{location}</b></span>
                    </div>
                    <div>
                        <h2 className="title-section">About the tour</h2>
                        <div className="d-flex justify-content-around mb-3">
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
                        <div dangerouslySetInnerHTML={{ __html: description }}>
                        </div>
                    </div>
                </div>
                <div className="container bg-dark py-4">
                    <h2 className="title-section text-white pb-3">itinerary</h2>
                    <div>
                        {itineraries.map((data, key) => (
                            this.renderItineraries(data, key)
                        ))}
                    </div>
                </div>
                <div className="container my-4">
                    <h2 className="title-section mb-2">THE ROUTE</h2>
                    <img src="http://www.outdoorblueprint.com/outdoors-101/plan-a-road-trip-route-with-google-maps/step6.png" className="img-fluid" />
                </div>
                <div className="container mb-4 pb-4">
                    <div className=" d-flex justify-content-between mb-3">
                        <h2 className="title-section">MOTORCYCLE CHOICES</h2>
                        <a href={process.env.HOST_DOMAIN+"/gallery"} style={{ "top": "7px" }} className="text-sm position-relative text-primary d-block font-weight-bold">
                            View All</a>
                    </div>
                    <div className="sliderMobile d-flex align-items-stretch" style={{ marginRight: "-15px" }}>
                        {motor.map((item, key) => (
                            <div key={key} className="mr-3">
                                <img src={process.env.HOST_URL + item.picture} height="110" />
                            </div>
                        ))}
                    </div>
                </div>

                <div className="container">
                    <h2 className="title-section">INCLUDED</h2>
                    <div className="py-2">
                        {facilities.map((item, key) => (
                            this.renderFaciltyInclude(item, key)
                        ))}
                    </div>
                    <h2 className="title-section">NOT INCLUDED</h2>
                    <div className="pb-4">
                        {facilityNotIncluded}
                    </div>
                </div>
                <div className="container">
                    <div className="border-bottom border-top mb-3 pb-2 pt-3 d-flex justify-content-between align-items-center">
                        <h2 className="title-section m-0">TERM AND CONDITION</h2>
                        <span className="icon-right-arrow text-primary"></span>
                    </div>
                    <div className="border-bottom mb-3 pb-2 d-flex justify-content-between align-items-center">
                        <h2 className="title-section m-0">WHAT TO BE PREPARED?</h2>
                        <span className="icon-right-arrow text-primary"></span>
                    </div>
                    <div className="border-bottom mb-3 pb-2 d-flex justify-content-between align-items-center">
                        <h2 className="title-section m-0">FAQ</h2>
                        <span className="icon-right-arrow text-primary"></span>
                    </div>
                </div>
                <div className="container">
                    <h2 className="title-section  mb-3 pt-3">MEET THE RC</h2>
                    <div className="text-center">
                        <img
                            className="rounded-circle border border-white"
                            width="80"
                            height="80"
                            src={process.env.HOST_URL + imageRoadCaptain}
                        />
                        <div className="pt-3">
                        <h3 className="title-section">{roadCaptainName} </h3>
                        </div>
                    </div>
                    <div>
                        <p>{roadCaptainDescription}</p>
                    </div>
                </div>
                <div className="fixed-bottom">
                    <Link href={process.env.HOST_DOMAIN+'/transaction/price?page=price&idTrip=' + id} as={process.env.HOST_DOMAIN+'/trip/' + id + '/price'} >
                        <button className="btn btn-primary w-100">
                            <div className="d-flex justify-content-between">
                                <div className="invisible" style={{ fontFamily: '"Open Sans", sans-serif', lineHeight: "18px" }}>
                                    <div style={{ fontSize: "40%" }} className="font-weight-light">Start From</div>
                                    <div style={{ fontSize: "70%" }} className="font-weight-bold">$120</div>
                                </div>
                                <div>Check Date</div>
                                <div style={{ fontFamily: '"Open Sans", sans-serif', lineHeight: "18px", marginTop: "-1px" }}>
                                    <div style={{ fontSize: "40%" }} className="font-weight-light">Start From</div>
                                    <div style={{ fontSize: "70%" }} className="font-weight-bold">$120</div>
                                </div>
                            </div>
                        </button>
                    </Link>
                </div>
            </div>
        )
    }

}