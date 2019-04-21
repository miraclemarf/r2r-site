import React from 'react'
import Link from 'next/link'
import StepTransaction from '../../components/stepTransaction'
import TextImgCard from '../../components/textImgCard'

export default class extends React.Component {
    static async getInitialProps({ req, query: { idTrip } }) {
        let props = {};
        props.nav = 'blue';
        props.navTrans = {step:2}
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
                    <div className="mb-4 position-relative">
                        <a className="d-block pt-2 text-dark h4 title-section" href={"/trip/" + idTrip} ><span style={{top:"-1px"}} className="icon-left-arrow text-sm text-primary position-relative"></span> Back</a>                        
                        <StepTransaction step="3" />
                    </div>
                </div>
                <div>
                    <h2 className="title-section text-center mb-4">ADDITIONAL GEAR</h2>
                    <div>
                        <TextImgCard coverLandscape="https://loremflickr.com/480/153/street" title="Jacket" isLandscape={true} iconTextPostion="align-items-center" r2rIcon={false} />
                    </div>
                    <div>
                        <TextImgCard coverLandscape="https://loremflickr.com/480/153/motor" title="T-Shirt" isLandscape={true} iconTextPostion="align-items-center" r2rIcon={false} />
                    </div>
                    <div>
                        <TextImgCard coverLandscape="https://loremflickr.com/480/153/gear" title="Others" isLandscape={true} iconTextPostion="align-items-center" r2rIcon={false} />
                    </div>
                </div>
                <div className="fixed-bottom">
                    <Link href={'/transaction/checkout?page=checkout&idTrip=' + idTrip} as={'/trip/' + idTrip + '/checkout'} >
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