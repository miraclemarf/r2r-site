import React from 'react'
import cookies from 'next-cookies'
import SquareCover from '../../components/squareCover';
import { getDetailTrip } from '../../utils/trips'
import { requestTrip } from '../../utils/userTransaction'
import { withAuthSync } from "../../utils/user"

class UserRequest extends React.Component {
    static async getInitialProps({ req, query: { id } }) {
        // Inherit standard props from the Page (i.e. with session data)
        let props = {};
        let { token } = cookies({ req })
        let objToken = JSON.parse(token)

        if (typeof window === 'undefined') {
            try {
                const tripData = await getDetailTrip(id);
                props.idTrip = id;
                props.trip = tripData;
                props.nav = 'blue';
                props.reqSent = false;
                props.footer = 'transparent';
            } catch (e) {
                props.error = 'Unable to fetch AsyncData on server';
            }
        }
        return props;
    }
    constructor(props) {
        super(props);

        this.state = { ...props, hari: '', bulan: '', tahun: '', maxRider: '', startTimestamp: '' };
        this.form = React.createRef();
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.validate = this.validate.bind(this)
    }
    validate() {
        this.form.current.reportValidity();
    }
    handleChange(e) {
        const target = e.target, value = target.value, name = target.name;
        this.setState({ [name]: value });
    }
    async handleSubmit(e) {
        e.preventDefault();
        let startTimestamp = 0
        if (this.state.hari && this.state.bulan && this.state.tahun) {
            let dateuser = this.state.tahun + '-' + this.state.bulan + '-' + this.state.hari
            startTimestamp = Math.round(new Date(dateuser + " 00:00:00.000").getTime())
        }

        const postData = { 'tripId': this.state.idTrip, 'maxRider': this.state.maxRider, 'startTimestamp': startTimestamp }
        //console.log(postData);


        const res = await requestTrip(postData, this.state.token.access_token)
        if(res.code==200){
            this.setState({'reqSent':true})
        }



    }

    renderRequestSuccess() {
        return (
            <div className="container" style={{ minHeight: "75vh" }}>
                <div className="py-4"></div>
                <div className="text-center">
                    <h2 className="title-section">YOUR REQUEST SENT!</h2>
                </div>

                <div className="mt-2 mb-3">
                    <div className="p-4 text-sm">
                        <p>We will review it first, and once the request is approved, Road2Ring Team will contact you!</p>

                    </div>
                </div>
                <div className="mb-3">
                    <a href={process.env.HOST_DOMAIN + '/'} className="btn btn-primary w-100">
                        BACK TO HOME
                        </a>
                </div>
            </div>
        )
    }
    render() {
        const range = (start, end, length = end - start) =>
            Array.from({ length }, (_, i) => start + i)

        const hari = range(1, 32)
        const bulan = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
        const tahun = range(2019, 2023)
        let { token, user } = this.props;
        const { id, coverLandscape, title, iconCover, distance, duration, terrain, maxRider } = this.state.trip.object

        return (
            <div className="">
                <div className={this.state.reqSent ? "collapse" : ""}>

                    <form ref={this.form} onSubmit={this.handleSubmit}>
                        <div className="container">
                            <a className="pt-3 pb-2 d-block text-dark h4 title-section" href={process.env.HOST_DOMAIN+'/trip/'+id} ><span style={{ top: "-1px" }} className="icon-left-arrow text-sm text-primary position-relative"></span> Back</a>
                        </div>
                        <div>
                            <SquareCover imgCover={coverLandscape} withIcon={true} iconTrip={iconCover} text={title} />
                        </div>
                        <div className="container">
                            <div className="py-3">
                            </div>
                            <div>
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
                            </div>
                            <div className="pt-2">
                                <h2 className="title-section">REQUEST PRIVATE TOUR</h2>
                                <div className="form-group">
                                    <label className="text-black text-sm">Participant</label>
                                    <input type="number" name="maxRider" className="form-control" placeholder="Number of participant" onChange={this.handleChange} required />
                                </div>
                                <div className="form-row">
                                    <div className="form-group col">
                                        <label className="text-black text-sm">Start Date</label>
                                        <select className="form-control" name="hari" onChange={this.handleChange}>
                                            <option value="">Day</option>
                                            {
                                                hari.map((item, key) => (
                                                    <option key={key} value={item}>{item}</option>
                                                ))
                                            }
                                        </select>
                                    </div>
                                    <div className="form-group col">
                                        <label className="invisible">Month</label>
                                        <select className="form-control" name="bulan" onChange={this.handleChange}>
                                            <option value="">Month</option>
                                            {
                                                bulan.map((item, key) => (
                                                    <option key={key} value={key + 1}>{item}</option>
                                                ))
                                            }
                                        </select>
                                    </div>
                                    <div className="form-group col">
                                        <label className="invisible">Year</label>
                                        <select className="form-control" name="tahun" onChange={this.handleChange}>
                                            <option>Year</option>
                                            {
                                                tahun.map((item, key) => (
                                                    <option key={key} value={item}>{item}</option>
                                                ))
                                            }
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="fixed-bottom">
                                <button type="submit" className="btn btn-primary w-100">
                                    REQUEST THIS TOUR</button>
                            </div>
                        </div>
                    </form>
                </div>

                <div className={this.state.reqSent ? "" : "collapse"}>
                    {this.renderRequestSuccess()}
                </div>
            </div>
        )
    }
}

export default withAuthSync(UserRequest)