import React from 'react'
import Link from 'next/link'
import StepTransaction from '../../components/stepTransaction'
import TextImgCard from '../../components/textImgCard'

class Accessories extends React.Component {
    static async getInitialProps({ req, query: { id }, res }) {
        if (res) {
            res.writeHead(302, {
                Location: process.env.HOST_DOMAIN + '/trip/' + id
            })
            res.end()
        }

        let props = {};
        props.nav = 'blue';
        props.navTrans = { step: 2 }
        props.footer = 'transparent';
        props.idTrip = id;
        props.isSubAcc = false;

        return props;
    }
    constructor(props) {
        super(props);

        this.state = { ...props };
    }

    renderSubAccessories() {
        const data = ['Helmet', 'Jacket', 'Google', 'T-Shirt']
        const { isSubAcc } = this.state
        return (
            <div className={!isSubAcc ? 'collapse' : 'mb-4'}>
                <h2 className="title-section text-center mb-4">SUB ACCESSORIES</h2>
                {data.map((item, index) =>
                    <div key={index} style={{ 'backgroundImage': 'url(' + process.env.DUMMY + '/acc-' + index + ')', 'backgroundSize': 'cover', 'backgroundPosition': 'center', 'minHeight': '7.5em' }} className="h-100 d-flex justify-content-center flex-column overlay-black position-relative">
                        <h3 className="text-white title-section position-absolute mx-3">{item}</h3>
                    </div>
                )}
                <style jsx>{`
                     .overlay-black::before {
                        content:'';
                        position:absolute;
                        top:0;right:0;
                        bottom:0;left:0;
                        background-color:rgba(0,0,0,.4);
                    }
                `}
                </style>
            </div>
        )
    }

    render() {
        const { idTrip, isSubAcc } = this.state
        return (
            <div>
                <div className="py-2"></div>
                <div className="container">
                    <div className="mb-4 position-relative">
                        <a className="d-block pt-2 text-dark h4 title-section" href={process.env.HOST_DOMAIN + "/trip/" + idTrip} ><span style={{ top: "-1px" }} className="icon-left-arrow text-sm text-primary position-relative"></span> Back</a>
                        <StepTransaction step="3" />
                    </div>
                </div>
                <div className={isSubAcc ? 'collapse' : ''}>
                    <h2 className="title-section text-center mb-4">ACCESSORIES</h2>
                    <div className="container">
                        <div className="mb-4">
                            <span className="text-sm">Buy your accessories or you can just skip to <b>check out</b></span>
                        </div>
                        <div>
                            <div className="row no-gutters">
                                <div className="col-6">
                                    <div onClick={() => this.setState({ isSubAcc: true })} style={{ "backgroundImage": 'url(' + process.env.DUMMY + '/acc-2.jpg)' }} className="bg-radius position-relative inner-border d-flex m-1">
                                        <h3 style={{ 'left': '0', 'right': '0' }} className="position-absolute text-white text-center align-self-center title-section">SAFETY</h3>
                                    </div>
                                </div>
                                <div className="col-6">
                                <div style={{ "backgroundImage": 'url(' + process.env.DUMMY + '/acc-5.jpg)' }} className="bg-radius position-relative inner-border d-flex m-1">
                                    <h3 style={{'left': '0', 'right': '0'}}  className="position-absolute text-white text-center align-self-center title-section">LIFESTYLE</h3>
                                    </div>
                                </div>
                                <div className="col-6">
                                <div style={{ "backgroundImage": 'url(' + process.env.DUMMY + '/acc-5.jpg)' }} className="bg-radius position-relative inner-border d-flex m-1">
                                    <h3 style={{'left': '0', 'right': '0'}}  className="position-absolute text-white text-center align-self-center title-section">LIFESTYLE</h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="container bg-grayF2 py-3 position-relative" style={{ "top": "8px" }}>
                        <div className="d-flex justify-content-between">
                            <div className="align-self-center">
                                <h2 className="title-section m-0">Shopping Cart</h2>
                            </div>
                            <div className="align-self-center">
                                <span className="text-sm bg-softgray px-3 py-1 rounded-pill">0 Item</span>
                            </div>
                        </div>
                        <div className="py-4 text-center">
                            <div className="py-2 mt-3">
                                <i className="text-sm">Your shopping cart still empty</i>
                            </div>
                        </div>
                    </div>
                </div>
                {this.renderSubAccessories()}
                <div className="fixed-bottom">
                    <Link href={'/transaction/checkout?page=checkout&idTrip=' + idTrip} as={process.env.HOST_DOMAIN + '/trip/' + idTrip + '/checkout'} >
                        <button className="btn btn-primary w-100">
                            NEXT : CHECK OUT
                        </button>
                    </Link>
                </div>
                <style jsx>{`
                    .bg-radius{
                        border-radius:10px;
                        background-size:cover;
                        background-position:center;
                    }
                    .inner-border::before {
                        content:'';
                        position:absolute;
                        top:0;right:0;
                        bottom:0;left:0;
                        background-color:rgba(0,0,0,.4);
                        border-radius:10px;
                    }
                    .inner-border::after {
                        display:block;
                        padding-bottom:100%;
                        content:'';
                    }
                `}</style>
            </div>
        )
    }
}
export default Accessories;