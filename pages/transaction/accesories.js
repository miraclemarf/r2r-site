import React from 'react'
import Link from 'next/link'
import StepTransaction from '../../components/stepTransaction'
import TextImgCard from '../../components/textImgCard'

export default class extends React.Component {
    static async getInitialProps({ req, query: { idTrip }, res }) {
        if (res) {
            res.writeHead(302, {
                Location: process.env.HOST_DOMAIN + '/trip/' + idTrip
            })
            res.end()
        }

        let props = {};
        props.nav = 'blue';
        props.navTrans = { step: 2 }
        props.footer = 'transparent';
        props.idTrip = idTrip;
        props.transaction = {};

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
                    <div className="mb-4 position-relative">
                        <a className="d-block pt-2 text-dark h4 title-section" href={process.env.HOST_DOMAIN + "/trip/" + idTrip} ><span style={{ top: "-1px" }} className="icon-left-arrow text-sm text-primary position-relative"></span> Back</a>
                        <StepTransaction step="3" />
                    </div>
                </div>
                <div>
                    <h2 className="title-section text-center mb-4">ADDITIONAL GEAR</h2>
                    <div className="pt-4" style={{minHeight:"50vh"}}>
                        <div className="mx-auto text-center" style={{ maxWidth: "75%" }}>
                            <div style={{ width: "80px", height: "80px" }} className={"bg-info text-white rounded-circle text-sm text-center mx-auto"}>
                                <span className="icon-icon_accesories h1 py-3 d-block"></span>
                            </div>
                            <div className="mt-4">
                                Sorry, no available accessories. Please go to next step, check out.
                            </div>
                        </div>
                    </div>
                </div>
                <div className="fixed-bottom">
                    <Link href={'/transaction/checkout?page=checkout&idTrip=' + idTrip} as={process.env.HOST_DOMAIN + '/trip/' + idTrip + '/checkout'} >
                        <button className="btn btn-primary w-100">
                            NEXT : CHECK OUT
                        </button>
                    </Link>
                </div>
                <div className="py-2"></div>
            </div>
        )
    }
}