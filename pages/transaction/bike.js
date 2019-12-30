import React from 'react';
import Link from 'next/link';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import StepTransaction from '../../components/stepTransaction';
import { getLatestMotorNonRedux } from '../../utils/motor';
import { getMotorTrip } from '../../utils/trips';
import { selectedMotor } from '../../utils/userTransaction';
import { priceAbbr } from '../../components/functions'

class TripBike extends React.Component {
	static async getInitialProps({ store, req, query: { id }, res }) {
		if (res) {
			res.writeHead(302, {
				Location: process.env.HOST_DOMAIN + '/trip/' + id
			});
			res.end();
		}
		let props = {};
		props.nav = 'blue';
		props.navTrans = { step: 2 };
		props.footer = 'transparent';
		props.idTrip = id;
		props.bringOwnMotor = false;
		props.scrollHeader = false;

		const idSelectedPrice = store.getState().TransactionData.price.id;
		await store.dispatch(getMotorTrip(idSelectedPrice));

		return props;
	}
	constructor(props) {
		super(props);

		this.state = { ...props };
		this.selectedItem = this.selectedItem.bind(this);
		this.selectedBringOwnBike = this.selectedBringOwnBike.bind(this);
	}
	componentDidUpdate(prevProps, prevState) {
		console.log(this.state);
	}
	async selectedBringOwnBike(e) {
		//console.log(this.state);
		const { TripData, TransactionData } = this.state;

		await this.props.selectedMotor({ ...TransactionData, motor: { bringOwnMotor: true } });
		this.setState({ ...this.props });
	}
	async selectedItem(e) {
		const { TripData, TransactionData } = this.state;
		const motorId = e.currentTarget.getAttribute('data-id');
		const motorObj = TripData.motor.find((obj) => obj.id === parseInt(motorId));

		await this.props.selectedMotor({ ...TransactionData, motor: motorObj });
		this.setState({ ...this.props });
	}
	renderCardMotor(data, index) {
		let isSelectedMotor = false;
		if (this.state.TransactionData) {
			if (this.state.TransactionData.motor) {
				if (!this.state.TransactionData.motor.bringOwnMotor) {
					isSelectedMotor = this.state.TransactionData.motor.id == data.id ? true : false;
				}
			}
		}
		return (
			<div
				onClick={this.selectedItem}
				key={index}
				data-id={data.id}
				className={
					(isSelectedMotor ? 'bg-primary border-primary text-white' : 'bg-grayF2 border-grayF2') +
					' p-2 position-relative'
				}
				style={{ borderRadius: '8px', minHeight: '150px', marginBottom: '3em', border: '2px solid' }}
			>
				<div>
					<h4 style={{ lineHeight: 'normal' }} className="title-section w-75">
						{data.title}
					</h4>
					<div
						className={"position-absolute p-1 text-sm " + (isSelectedMotor ? "text-white" : "text-primary")}
						style={{ fontSize: '75%', left: '6px', bottom: '5px', borderRadius: '4px' }}
					>
						<strong dangerouslySetInnerHTML={{ __html: priceAbbr(false, data.price) }}></strong>
					</div>
				</div>
				<div className="position-absolute" style={{ maxWidth: '60%', right: '0', zIndex: '1', bottom: '-30px' }}>
					<img style={{ width: "100%" }} src={process.env.DUMMY + '/motor-r2r-' + index + '.png'} />
				</div>
			</div>
		);
	}
	render() {
		const { idTrip, selectedMotorId, TripData } = this.state;
		console.log(this.state);
		
		let isBringOwnMotor = false;
		if (this.state.TransactionData) {
			if (this.state.TransactionData.motor) {
				if (this.state.TransactionData.motor.bringOwnMotor) {
					isBringOwnMotor = this.state.TransactionData.motor.bringOwnMotor
				}
			}
		}
		return (
			<div>
			<div style={{padding:"40px"}} />
				<div className="container">
					<div className="mb-4 position-relative">
						<a
							className="pt-2 d-block text-dark h4 title-section position-relative"
							href={process.env.HOST_DOMAIN + '/trip/' + idTrip}
							style={{ zIndex: '10' }}
						>
							<span
								style={{ top: '-1px' }}
								className="icon-left-arrow text-sm text-primary position-relative"
							/>{' '}
							Back
						</a>
						<StepTransaction step="1" />
					</div>
					<div>
						<h2 className="title-section text-center">CHOOSE YOUR BIKE</h2>
						<div className="mt-3">
							{TripData.motor.map((item, index) => this.renderCardMotor(item, index))}
						</div>

						<button
							onClick={this.selectedBringOwnBike}
							className={
								(isBringOwnMotor
									? 'bg-primary border-primary text-white'
									: 'btn-outline-softgray text-dark') + ' btn mt-2 w-100'
							}
							style={{ borderRadius: '8px' }}
						>
							I BRING MY OWN BIKE
						</button>
						<div className="mt-2" style={{ lineHeight: '16px' }}>
							<span style={{ fontSize: '80%' }} className="text-sm text-gray80">
								You need to send your bike to our office, if you want to bring your own bike
							</span>
						</div>
					</div>
				</div>

				<div className="fixed-bottom" style={{zIndex:"15"}}>
					<Link
						href={'/transaction/accessories?page=accessories&id=' + idTrip}
						as={process.env.HOST_DOMAIN + '/trip/' + idTrip + '/accessories'}
					>
						<button
							onClick={(e) => {
								if (!this.state.TransactionData.motor) {
									alert('Please Choose an Option');
									e.preventDefault();
								}
							}}
							className="btn btn-primary w-100"
						>
							NEXT : ACCESSORIES
						</button>
					</Link>
				</div>
				<div className="py-2" />
			</div>
		);
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		getMotorTrip: bindActionCreators(getMotorTrip, dispatch),
		selectedMotor: bindActionCreators(selectedMotor, dispatch)
	};
};
export default connect((state) => state, mapDispatchToProps)(TripBike);
