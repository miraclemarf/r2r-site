import React from 'react'
import Link from 'next/link'
import StepTransaction from '../../components/stepTransaction'
import { priceAbbr } from '../../components/functions';

class AccessoriesDetail extends React.Component {
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
    render() {
        return (
            <div>
                <div className="p-3 bg-grayF2 position-relative text-center" style={{ borderRadius: "8px" }}>
                    <img style={{ width: "80%" }} src={process.env.DUMMY + '/helmet-r2r-4.png'} className="img-fluid my-3" />
                    <h3 style={{ lineHeight: "normal" }} className="title-section">{'MDS HELMET'}</h3>
                    <div className="position-absolute p-1 text-sm bg-gray text-white" style={{ fontSize: "75%", right: "20px", top: "20px", borderRadius: "4px", zIndex: "2" }}>
                        <span className="text-info">+ </span><strong dangerouslySetInnerHTML={{ __html: priceAbbr(false, '650000') }}></strong>
                    </div>
                </div>
                <div className="mt-3 text-center">
                    <span className="text-sm text-gray80">Choose your size</span>
                    <div className="d-flex justify-content-center mt-2">
                        <div onClick={this.selectedSize} data-size="M" style={{ width: "60px", height: "60px" }} className={(this.state.selectedHelmetSize == "M" ? "bg-white border-secondary" : "bg-grayF2 border-grayF2") + " border d-flex"}>
                            <h3 className="title-section align-self-center m-auto">M</h3>
                        </div>
                        <div onClick={this.selectedSize} data-size="L" style={{ width: "60px", height: "60px" }} className={(this.state.selectedHelmetSize == "L" ? "bg-white border-secondary" : "bg-grayF2 border-grayF2") + "  border d-flex mx-3"}>
                            <h3 className="title-section align-self-center m-auto">L</h3>
                        </div>
                        <div onClick={this.selectedSize} data-size="XL" style={{ width: "60px", height: "60px" }} className={(this.state.selectedHelmetSize == "XL" ? "bg-white border-secondary" : "bg-grayF2 border-grayF2") + "  border d-flex"}>
                            <h3 className="title-section align-self-center m-auto">XL</h3>
                        </div>
                    </div>
                </div>
                <div className="fixed-bottom">
                    {
                        <Link href={'/transaction/accesories?page=accesories&idTrip=' + idTrip} as={process.env.HOST_DOMAIN + '/trip/' + idTrip + '/accesories'} >
                            <button className="btn btn-primary w-100">ADD TO CART</button>
                        </Link>
                    }
                </div>
            </div>
        )
    }
}
export default AccessoriesDetail