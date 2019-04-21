import React from 'react'
import Link from 'next/link'

export default class extends React.Component {
    static async getInitialProps({ req, query: { idTrip } }) {
        let props = {};
        props.nav = 'blue';
        props.navTrans = {step:3}
        props.footer = 'transparent';
        props.idTrip = idTrip;

        return props;
    }
    constructor(props) {
        super(props);

        this.state = { ...props };
    }
    render() {
        const { idTrip } = this.state
        return (
            <div>
                <div className="py-2"></div>
                <div className="container">
                    <div className="mb-3">
                        <a className="text-dark h4 title-section" href={"/trip/" + idTrip} ><span style={{top:"-1px"}} className="icon-left-arrow text-sm text-primary position-relative"></span> Back</a>
                    </div>
                    <div>
                        <h2 className="title-section text-center mb-4">Check Out</h2>
                    </div>
                    <div className="mb-4">
                        <h4 className="title-section">DATE</h4>
                        <div className="bg-grayF2 p-3" style={{ borderRadius: "8px" }}>
                            <h4 className="title-section text-center m-0">12 OCT 18 - 15 OCT 18</h4>
                        </div>
                    </div>

                    <div className="mb-4">
                        <h4 className="title-section">MEETING POINT</h4>
                        <div className="bg-grayF2 p-3" style={{ borderRadius: "8px" }}>
                            <h5 className="title-section m-0">Stasiun YOGYAKARTA</h5>
                            <p className="text-sm text-gray80 m-0 w-75">
                                Jl. Pringgokusuman, Pringgokusuman, Gedong Tengen
                            </p>
                        </div>
                    </div>

                    <div className="mb-4">
                        <h4 className="title-section">Gear</h4>
                        <div className="bg-grayF2 p-3 position-relative" style={{ borderRadius: "8px", minHeight: "150px" }}>
                            <h4 style={{ lineHeight: "normal" }} className="title-section w-75">2018 - Harley Davidson STEET 750</h4>
                            <div className="position-absolute" style={{ right: "0", zIndex: "1", bottom: "-30px" }}>
                                <img src={process.env.HOST_URL + '/img/assets/harley.png'} height="120" />
                            </div>
                        </div>
                    </div>
                    <div className="py-3"></div>
                    <div className="mb-4">
                        <div className="bg-grayF2 p-3 position-relative" style={{ borderRadius: "8px" }}>
                            <div>
                                <div className="d-flex justify-content-between align-items-center pb-3 border-softgray" style={{ borderBottom: "1px solid" }}>
                                    <div style={{ lineHeight: "14px" }}>
                                        <h5 className="title-section m-0">EXPLORING BROMO</h5>
                                        <span style={{ fontSize: "80%" }} className="text-sm">Basic Package</span>
                                    </div>
                                    <div>
                                        <h3 className="title-section m-0">$ 120</h3>
                                    </div>
                                </div>
                                <div className="d-flex justify-content-between align-items-center pt-3">
                                    <div style={{ lineHeight: "14px" }}>
                                        <h5 className="title-section m-0">ADDITIONAL COST</h5>
                                        <span style={{ fontSize: "80%" }} className="text-sm">Simpson M50 Helmet</span>
                                    </div>
                                    <div>
                                        <h3 className="title-section m-0">$ 20</h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mb-4">
                        <div className="d-flex justify-content-between align-items-center">
                            <div><h4 className="title-section">Total</h4></div>
                            <div><h1 className="title-section text-primary">$ 140</h1></div>
                        </div>
                    </div>
                </div>
                <div className="container bg-grayF2 py-4">
                    <h4 className="title-section">Notes</h4>
                    <form>
                        <div className="form-group m-0">
                            <textarea className="form-control" rows="4" style={{ fontSize: "95%", color: "#808080", fontStyle: "italic" }}>
                                Add any notes if you have some request, we will try to make your trip better!
                            </textarea>
                        </div>
                    </form>
                </div>
                <div className="container">
                    <div className="py-2"></div>
                    <div className="pb-4 border-softgray" style={{ borderBottom: "1px solid" }}>
                        <div className="mb-3">
                            <span className="text-sm">To continue this process you must log in first!</span>
                        </div>
                        <div>
                            <a href="/login" className="d-block w-100 mb-2  btn btn-info ">LOG IN</a>
                            <a href="/register" className="d-block w-100  btn btn-secondary">REGISTER</a>
                        </div>
                    </div>
                    <div>
                        <div className="pt-4">
                            <p className="text-center text-sm mx-3">
                                You are accepting Road2ring’s <b className="text-primary">Term and Condition</b> by clicking make payment button.
                            </p>
                        </div>
                        <div className="pt-2">
                            <button disabled="disabled" className="btn btn-grayF2 w-100 text-softgray">Confirm</button>
                        </div>
                    </div>
                </div>
                <div className="py-2"></div>
            </div>
        )
    }
}