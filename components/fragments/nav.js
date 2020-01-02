import React from 'react';
import Link from 'next/link';
import { connect } from 'react-redux';
import MenuItem from './menuItem';
import { bindActionCreators } from 'redux';
import { priceAbbr, accTotalPrice } from '../../components/functions'
import { Collapse, Navbar, NavbarToggler } from 'reactstrap';
import { logout } from '../../utils/user';
import { Container } from 'reactstrap';

class Navigate extends React.Component {
	static async getInitialProps({ req }) {
		let props = await super.getInitialProps({ req });
		return props;
	}

	constructor(props) {
		super(props);
		this.toggle = this.toggle.bind(this);
		this.state = {
			isOpen: false,
			isMobile: false,
			navDesktopdark: props.navDesktopdark,
			txtColor: props.navDesktopdark ? 'text-dark' : 'text-white',
			headerBg: props.nav != 'blue' ? 'bg-transparent' : 'bg-primary'
		}
	}
	componentWillReceiveProps(nextProps) {
		if (this.props !== nextProps) {
			this.setState({ navDesktopdark: nextProps.navDesktopdark, headerBg: nextProps.nav != 'blue' ? 'bg-transparent' : 'bg-primary' })
		}
	}
	componentDidMount() {
		window.addEventListener('load', e => {
			this.setState({ isMobile: window.innerWidth < 768 })
			if (this.props.scrollHeader) {
				if (e.target.scrollingElement.scrollTop > 50) {
					this.setState({ headerBg: 'bg-primary' })
				} else {
					this.setState({ headerBg: this.props.nav != 'blue' ? 'bg-transparent' : 'bg-primary' })
				}
			}
		})
		window.addEventListener('resize', e => {
			this.setState({ isMobile: window.innerWidth < 768 })
			if (this.props.scrollHeader) {
				if (e.target.scrollY > 50) {
					this.setState({ headerBg: 'bg-primary', navDesktopdark: false })
				} else {
					this.setState({ headerBg: this.props.nav != 'blue' ? 'bg-transparent' : 'bg-primary', navDesktopdark: this.props.navDesktopdark})
				}
			}
		})
		window.addEventListener('scroll', e => {
			if (this.props.scrollHeader) {
				if (e.target.scrollingElement.scrollTop > 50) {
					this.setState({ headerBg: 'bg-primary', navDesktopdark: false })
				} else {
					this.setState({ headerBg: this.props.nav != 'blue' ? 'bg-transparent' : 'bg-primary', navDesktopdark: this.props.navDesktopdark })
				}
			}
		})
	}
	toggle() {
		this.setState({ isOpen: !this.state.isOpen })
	}
	logoutUser = () => logout()

	render() {
		let { token, user, TransactionData, isMobileUa } = this.props;
		let isCheckoutSuccess = false;
		let totalPrice = [];
		if (this.props.checkoutStatus) {
			isCheckoutSuccess = Object.keys(this.props.checkoutStatus).length === 0 ? false : true;
		}
		if (TransactionData) {
			const datePrice = TransactionData.price ? TransactionData.price.price : 0;
			const motorPrice = TransactionData.motor ? !TransactionData.motor.bringOwnMotor ? TransactionData.motor.price : 0 : 0;
			const accPrice = "accessories" in TransactionData ? accTotalPrice(TransactionData.accessories) : 0;
			totalPrice = [datePrice, motorPrice, accPrice];
		}

		return (
			<div>
				<div
					className={`position-fixed w-100 ${this.state.headerBg} ${this.props.nav != 'blue' ? '' : ''}`}
					style={{ zIndex: 30, top: 0 }}
				>
					<Navbar className={`position-relative ${this.state.headerBg == 'bg-transparent' && this.state.navDesktopdark && !this.state.isMobile ? 'navbar-light' : 'navbar-dark'}`} expand="md">
						<Container className="container-nav position-relative d-flex align-items-center m-auto">
							<Link href="/index" as={process.env.HOST_DOMAIN}>
								<div className="navbar-brand py-1 px-0" style={{ zIndex: 1 }}>
									{this.props.navTrans ? isMobileUa ? (
										<span className="h2 icon-logogram_r2r" />
									) : (<span className={`h2 icon-logo_ring2ring_full`} />) : (
											<span className={"h2 icon-logo_ring2ring_full "+ (this.state.headerBg == 'bg-transparent' && this.state.navDesktopdark && !this.state.isMobile ? 'text-dark' : 'text-white')} />
										)}
								</div>
							</Link>
							{this.props.navTrans ? (
								<div
									style={{ right: '0', left: '0' }}
									className={'m-auto position-absolute ' + (isCheckoutSuccess ? 'collapse' : '')}
								>
									<div className="d-flex justify-content-center">
										<div
											style={{ width: '25px', height: '25px' }}
											className={
												(this.props.navTrans.step == 1
													? 'border-primary text-primary bg-white'
													: 'border-white text-white') + ' border text-sm text-center'
											}
										>1</div>
										<div
											style={{ width: '25px', height: '25px' }}
											className={
												(this.props.navTrans.step == 2
													? 'border-primary text-primary bg-white'
													: 'border-white text-white') + ' border text-sm text-center mx-2'
											}
										>
											2
									</div>
										<div
											style={{ width: '25px', height: '25px' }}
											className={
												(this.props.navTrans.step == 3
													? 'border-primary text-primary bg-white'
													: 'border-white text-white') + ' border text-sm text-center'
											}
										>
											3
									</div>
									</div>
								</div>
							) : (
									/* {/* <button className="searchToggle">
											<span className="icon-icon_search text-white h4" />
										</button> } */
									''
								)}
							{this.props.navTrans ? totalPrice.length ? (
								<div
									style={{ lineHeight: '18px', marginTop: '-1px' }}
									className={'text-white ' + (isCheckoutSuccess ? 'collapse' : '')}
								>
									<div style={{ fontSize: '70%' }} className="text-sm font-weight-light text-right">
										TOTAL
								</div>
									<div className="h5 font-weight-bold" dangerouslySetInnerHTML={{ __html: priceAbbr(true, totalPrice.reduce((total, amount) => total + amount)) }}>
									</div>
								</div>
							) : (
									''
								) : (
									<NavbarToggler style={{ top: "10px", right: "5px" }} className={`position-absolute p-0 ${this.state.txtColor}`} onClick={this.toggle} />
								)}
							<Collapse
								style={{ overflowY: 'auto' }}
								id={!isMobileUa && this.props.navTrans ? "hide-step" : ""}
								className={(this.state.isMobile ? 'fixed-top h-100 ' : '')}
								isOpen={this.state.isOpen}
								navbar
							>
								<div className={this.state.isMobile ? 'm-3' : 'ml-auto'}>
									{
										this.state.isMobile ?
											<div>
												<div className="text-right text-white pt-0">
													<span onClick={this.toggle} className="h2 icon-close" />
												</div>
											</div> : ''
									}
									<MenuItem token={token} user={user} isMobile={this.state.isMobile} onClickLogout={this.logoutUser} navDesktopdark={this.state.navDesktopdark} headerBg={this.state.headerBg} />
									{
										this.state.isMobile ?
											<div className="fixed-bottom mx-3">
												<div className="d-flex justify-content-between my-4">
													<div className="d-block w-50">
														<h2 className="nav-link m-0 p-0 text-gray">Language</h2>
													</div>
													<div className="d-block" style={{ width: '33%' }}>
														<div className="d-flex justify-content-between">
															<h2 className="nav-link  m-0 p-0 text-secondary">EN</h2>
															<h2 className="text-gray" style={{ marginTop: '-8px' }}>
																|
														</h2>
															<h2 className="nav-link  m-0 p-0 text-gray">ID</h2>
														</div>
													</div>
												</div>
												<div className="d-flex justify-content-between mt-4 mb-3">
													<div className="d-block w-50">
														<span className="h4 text-white icon-logo_ring2ring_full" />
													</div>
													<div className="d-block" style={{ width: '33%' }}>
														<div className="d-flex justify-content-between text-white h4">
															<a href="https://facebook.com" className="text-white">
																<span className="icon-facebook" />
															</a>
															<a href="https://instagram.com" className="text-white">
																<span className="icon-instagram" />
															</a>
															<a href="https://youtube.com" className="text-white">
																<span className="icon-youtube-play" />
															</a>
														</div>
													</div>
												</div>
											</div> : ''
									}
								</div>
							</Collapse>
						</Container>
					</Navbar>
				</div>
				<style jsx global>{`
					#hide-step{display:none !important}
				`}</style>
			</div>
		);
	}
}

export default connect(state => state, {})(Navigate);
