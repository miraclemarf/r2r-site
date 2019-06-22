import React from 'react'
import Link from 'next/link'
import StepTransaction from '../../components/stepTransaction'
import { getLatestMotor } from '../../utils/motor'

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
        props.selectedMotorId = "";
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
        try {
            const data = await getLatestMotor();
            props.motor = data.object;
        } catch (e) {

        }
        return props;
    }
    constructor(props) {
        super(props);

        this.state = { ...props };
        this.selectedItem = this.selectedItem.bind(this);
        this.selectedBringOwnBike = this.selectedBringOwnBike.bind(this);
    }
    componentDidUpdate(prevProps, prevState) {
        if (this.state.selectedMotorId != prevState.selectedMotorId || this.state.transaction.bringOwnMotor != prevState.transaction.bringOwnMotor) {
            this.props.transactionState(this.state.transaction)

        }
    }
    selectedBringOwnBike(e) {
        //console.log(this.state);

        const { transaction } = this.state
        let value = this.state.transaction.bringOwnMotor ? false : true;
        if (value) {
            let price = [...transaction.price]
            price[1] = 0
            this.setState({
                selectedMotorId: "", transaction: {
                    ...transaction, bringOwnMotor: value,
                    price: price
                }
            })
        }
    }
    selectedItem(e) {
        const { transaction } = this.state
        const motorId = e.currentTarget.getAttribute('data-id');
        const motorObj = this.state.motor.find((obj) => obj.id === parseInt(motorId))
        let price = [...transaction.price]
        price[1] = motorObj.price
        this.setState(
            {
                selectedMotorId: motorId,
                transaction: {
                    ...transaction,
                    motor: motorObj,
                    bringOwnMotor: false,
                    price: price
                }
            })
    }
    renderCardMotor(data, index) {
        return (
            <div onClick={this.selectedItem} key={index} data-id={data.id} className={(this.state.selectedMotorId == data.id && !this.state.transaction.bringOwnMotor ? "bg-primary border-primary text-white" : "bg-grayF2 border-grayF2") + " p-3 position-relative"} style={{ borderRadius: "8px", minHeight: "150px", marginBottom: "3em", border: "2px solid" }}>
                <div className="position-relative">
                    <h4 style={{ lineHeight: "normal" }} className="title-section w-75">{data.title}</h4>
                    <div className="position-absolute p-1 text-sm bg-gray text-white" style={{ fontSize: "75%", right: "0", top: "0", borderRadius: "4px" }}>
                        <span className="text-info">+ </span><strong>{'$' + data.price}</strong>
                    </div>
                </div>
                <div className="position-absolute" style={{ right: "0", zIndex: "1", bottom: "-30px" }}>
                    <img src={process.env.HOST_URL + data.picture} height="120" />
                </div>
            </div>
        )

    }
    render() {

        const { idTrip, motor, selectedMotorId } = this.state
        console.log(this.state);

        return (
            <div>
                <div className="py-2"></div>
                <div className="container">
                    <div className="mb-4 position-relative">
                        <a className="pt-2 d-block text-dark h4 title-section position-relative" href={process.env.HOST_DOMAIN + "/trip/" + idTrip} style={{zIndex:"10"}}><span style={{ top: "-1px" }} className="icon-left-arrow text-sm text-primary position-relative"></span> Back</a>
                        <StepTransaction step="1" />
                    </div>
                    <div>
                        <h2 className="title-section text-center">CHOOSE YOUR BIKE</h2>
                        <div className="mt-3">
                            {
                                motor.map((item, index) => (
                                    this.renderCardMotor(item, index)
                                ))
                            }
                        </div>

                        <button onClick={this.selectedBringOwnBike} className={(this.state.transaction.bringOwnMotor ? "bg-primary border-primary text-white" : "btn-outline-softgray text-dark") + " btn mt-2 w-100"} style={{ borderRadius: "8px" }}>
                            I BRING MY OWN BIKE
                        </button>
                        <div className="mt-2" style={{ lineHeight: "16px" }}>
                            <span style={{ fontSize: "80%" }} className="text-sm text-gray80">You need to send your bike to our office, if you want to bring your own bike</span>
                        </div>
                    </div>
                </div>

                <div className="fixed-bottom">
                    <Link href={'/transaction/helm?page=helm&idTrip=' + idTrip} as={process.env.HOST_DOMAIN + '/trip/' + idTrip + '/helm'} >
                        <button onClick={(e) => { if (selectedMotorId == '' && !this.state.transaction.bringOwnMotor) { alert('Please Choose an Option'); e.preventDefault(); } }} className="btn btn-primary w-100">
                            NEXT : ACCESORIES
                        </button>
                    </Link>
                </div>
                <div className="py-2"></div>
            </div>
        )
    }
}