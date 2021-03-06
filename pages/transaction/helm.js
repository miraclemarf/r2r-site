import React from 'react'
import Link from 'next/link'
import StepTransaction from '../../components/stepTransaction'
import { getHelmList } from '../../utils/accessories'

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
        props.navTrans = { step: 2 };
        props.footer = 'transparent';
        props.idTrip = idTrip;
        props.transaction = {
            idTrip: idTrip,
            meetingPoint: "",
            startDate: "",
            endDate: "",
            motor: {},
            accesories: [],
            price: "",
            bringOwnMotor: false,
            bringOwnHelm: false,
            notes: ""
        };
        props.selectedHelmet = { id: null };
        props.selectedHelmetSize = "";
        props.isViewHelm = false
        try {
            const data = await getHelmList();
            props.helm = data.object;
        } catch (e) {

        }
        return props;
    }
    constructor(props) {
        super(props);

        this.state = { ...props };
        this.selectedItem = this.selectedItem.bind(this);
        this.selectedSize = this.selectedSize.bind(this);
        this.selectedBringOwnHelm = this.selectedBringOwnHelm.bind(this);
    }
    componentDidUpdate(prevProps, prevState) {
        if (this.state.selectedHelmet.id != prevState.selectedHelmet.id || this.state.transaction.bringOwnHelm != prevState.transaction.bringOwnHelm) {
            this.props.transactionState(this.state.transaction)

        }
    }


    selectedBringOwnHelm(e) {
        const { transaction } = this.state
        let value = transaction.bringOwnHelm ? false : true;
        if (value) {
            let price = [...transaction.price]
            price[2] = 0
            this.setState({
                selectedHelmet: { id: null }, transaction: {
                    ...transaction, bringOwnHelm: value,
                    price: price, accesories:[]
                },
                isViewHelm: true
            })
        }
    }
    selectedItem(e) {
        const { helm, transaction } = this.state
        const helmId = e.currentTarget.getAttribute('data-id');
        const selectedHelm = helm.find((obj) => obj.id === parseInt(helmId))
        let accesories = [...transaction.accesories]
        accesories[0] = selectedHelm
        let price = [...transaction.price]
        price[2] = selectedHelm.price
        this.setState(
            {
                selectedHelmet: selectedHelm,
                transaction: {
                    ...transaction,
                    accesories: accesories,
                    bringOwnHelm: false,
                    price: price
                },
                isViewHelm: false
            })
    }
    selectedSize(e) {

        const { helm, transaction } = this.state
        const size = e.currentTarget.getAttribute('data-size');
        let accesories = [...transaction.accesories]
        accesories[0].size = size
        this.setState({ selectedHelmetSize: size, accesories: accesories, })

    }
    handleViewHelm(toogle, e) {
        if (this.state.selectedHelmet.id == null) { alert('Please Choose an Option'); e.preventDefault(); }
        else {
            this.setState({ isViewHelm: toogle })
        }
    }
    renderCardHelm(data, index) {

        const { selectedHelmet } = this.state
        return (
            <div data-id={data.id} onClick={this.selectedItem} key={index} className={(selectedHelmet.id === data.id && !this.state.transaction.bringOwnHelm ? "bg-primary border-primary text-white" : "bg-grayF2 border-grayF2") + " p-3 position-relative"} style={{ borderRadius: "8px", minHeight: "110px", marginBottom: "3em", border: "2px solid" }}>
                <div className="position-relative">
                    <h4 style={{ lineHeight: "normal" }} className="title-section w-75">{data.title}</h4>
                    <div className="position-absolute p-1 text-sm bg-gray text-white" style={{ fontSize: "75%", right: "0", top: "0", borderRadius: "4px", zIndex: "2" }}>
                        <span className="text-info">+ </span><strong>{'$' + data.price}</strong>
                    </div>
                </div>
                <div className="position-absolute" style={{ right: "20px", zIndex: "1", bottom: "-40px" }}>
                    <img src={process.env.HOST_URL + data.picture} height="130" />
                </div>
                <div style={{ bottom: "10px" }} className="position-absolute">
                    <div style={{ fontSize: "80%" }} className="text-sm text-gray80">Size</div>
                    <div className="text-sm"><strong>M, L, XL</strong></div>
                </div>
            </div>
        )

    }
    renderDetailHelm() {
        const data = this.state.selectedHelmet;
        return (
            <div>
                <div className="p-3 bg-grayF2 position-relative text-center" style={{ borderRadius: "8px" }}>
                    <img style={{ width: "80%" }} src={process.env.HOST_URL + data.picture} className="img-fluid my-3" />
                    <h3 style={{ lineHeight: "normal" }} className="title-section">{data.title}</h3>
                    <div className="position-absolute p-1 text-sm bg-gray text-white" style={{ fontSize: "75%", right: "20px", top: "20px", borderRadius: "4px", zIndex: "2" }}>
                        <span className="text-info">+ </span><strong>{'$' + data.price}</strong>
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
            </div>
        )
    }
    render() {
        console.log(this.state);

        const { idTrip, helm, selectedHelmet, isViewHelm, selectedHelmetSize } = this.state
        return (
            <div>
                <div className="py-2"></div>
                <div className="container">
                    <div className="mb-4 position-relative">
                        {
                            isViewHelm  ?
                                <span style={{zIndex:"10"}} className="pt-2 d-block text-dark h4 title-section position-relative" onClick={() => this.handleViewHelm(false)} ><span style={{ top: "-1px", zIndex:"10" }} className="icon-left-arrow text-sm text-primary position-relative"></span> Back</span> :
                                <a className="pt-2 d-block text-dark h4 title-section  position-relative" href={process.env.HOST_DOMAIN + "/trip/" + idTrip} style={{zIndex:"10"}} ><span style={{ top: "-1px"}} className="icon-left-arrow text-sm text-primary position-relative"></span> Back</a>
                        }

                        <StepTransaction step="2" />
                    </div>
                    <div className={isViewHelm && !this.state.transaction.bringOwnHelm ? "collapse" : ""}>
                        <h2 className="title-section text-center">CHOOSE ACCESSORIES</h2>
                        <div className="mt-3">
                            {
                                helm.map((item, index) => (
                                    this.renderCardHelm(item, index)
                                ))
                            }
                        </div>
                        <button onClick={this.selectedBringOwnHelm} className={(this.state.transaction.bringOwnHelm ? "bg-primary border-primary text-white" : "btn-outline-softgray text-dark") + " btn mt-2 w-100"} style={{ borderRadius: "8px" }}>
                            I BRING MY OWN HELMET
                        </button>
                        <div className="mt-2" style={{ lineHeight: "16px" }}>
                            <span style={{ fontSize: "80%" }} className="text-sm text-gray80">You need to send your bike to our office, if you want to bring your own bike</span>
                        </div>
                    </div>
                    {selectedHelmet.id && isViewHelm ? this.renderDetailHelm() : ""}
                </div>
                <div className="fixed-bottom">
                    {
                        isViewHelm  ?
                            <Link href={'/transaction/accesories?page=accesories&idTrip=' + idTrip} as={process.env.HOST_DOMAIN + '/trip/' + idTrip + '/accesories'} >
                                <button onClick={(e) => { if (selectedHelmetSize == '' && !this.state.transaction.bringOwnHelm) { alert('Please Choose an Option'); e.preventDefault(); } }} className="btn btn-primary w-100">NEXT : ACCESORIES</button>
                            </Link>
                            :
                            <button onClick={(e) => this.handleViewHelm(true, e)} className="btn btn-primary w-100">NEXT : CHOOSE SIZE</button>


                    }
                </div>
                <div className="py-2"></div>
            </div>
        )
    }
}