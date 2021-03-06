import React from 'react';
import MenuItem from "./menuItem";
import { Collapse, Navbar, NavbarToggler, NavbarBrand } from 'reactstrap';
import { logout } from '../../utils/user'


export default class extends React.Component {

	static async getInitialProps({ req }) {
		let props = await super.getInitialProps({
			req
		});

		return props;
	}

	constructor(props) {
		super(props);
		this.toggle = this.toggle.bind(this);
		this.state = {
			isOpen: false,
			isMobile: true
		};
	}
	async componentDidMount() {
		window.onload = () => {
			this.setState({
				isMobile: window.innerWidth < 768
			});
		};
		window.onresize = () => {
			this.setState({
				isMobile: window.innerWidth < 768
			});
		};
	}
	toggle() {
		this.setState({
			isOpen: !this.state.isOpen
		});
	}
	render() {
		let { token, user } = this.props;
		let isCheckoutSuccess = false;
		if (this.props.checkoutStatus) {
			isCheckoutSuccess = Object.keys(this.props.checkoutStatus).length === 0 ? false : true
		}


		return (
			<div className={this.props.nav != 'blue' ? 'position-absolute w-100' : ''} style={{ zIndex: 10 }}>
				<Navbar className={(this.props.nav != 'blue' ? 'bg-transparent my-1' : 'bg-primary') + " position-relative"} dark expand="md">
					<NavbarBrand href={process.env.HOST_DOMAIN + "/"}>
						{
							this.props.navTrans ? <span className="h2 icon-logogram_r2r" /> : <span className="h2 icon-logo_ring2ring_full" />
						}
					</NavbarBrand>
					{
						this.props.navTrans ?
							<div style={{ right: "0", left: "0" }} className={"m-auto position-absolute " + (isCheckoutSuccess ? "collapse" : "")}>
								<div className="d-flex justify-content-center">
									<div style={{ width: "25px", height: "25px" }} className={(this.props.navTrans.step == 1 ? "border-primary text-primary bg-white" : "border-white text-white") + " border text-sm text-center"}>1</div>
									<div style={{ width: "25px", height: "25px" }} className={(this.props.navTrans.step == 2 ? "border-primary text-primary bg-white" : "border-white text-white") + " border text-sm text-center mx-2"}>2</div>
									<div style={{ width: "25px", height: "25px" }} className={(this.props.navTrans.step == 3 ? "border-primary text-primary bg-white" : "border-white text-white") + " border text-sm text-center"}>3</div>
								</div>
							</div>
							:
							/* {/* <button className="searchToggle">
								<span className="icon-icon_search text-white h4" />
							</button> } */
							''
					}
					{
						this.props.navTrans ?
							this.props.selectedPrice.length ? <div style={{ lineHeight: "18px", marginTop: "-1px" }} className={"text-white " + (isCheckoutSuccess ? "collapse" : "")}>
								<div style={{ fontSize: "70%" }} className="text-sm font-weight-light text-right">TOTAL</div>
								<div className="h5 font-weight-bold">${this.props.selectedPrice.reduce((total, amount) => total + amount)}</div>
							</div> : ""
							:
							<NavbarToggler className="p-0" onClick={this.toggle} />
					}
					<Collapse
						style={{ overflowY: 'auto' }}
						className={this.state.isMobile ? 'fixed-top h-100' : ''}
						isOpen={this.state.isOpen}
						navbar
					>
						<div className={this.state.isMobile ? 'm-3' : 'ml-auto'}>
							{this.state.isMobile ? (
								<div>
									<div className="text-right pt-3">
										<img onClick={this.toggle} src={process.env.HOST_DOMAIN + "/static/slicing/img/icon_close.svg"} />
									</div>
									{
										token ?
											<div className="d-flex flex-row align-items-center text-white profile mb-3 mt-3">
												{/* <a href={process.env.HOST_DOMAIN + '/user/profile'}> */}
												<a>
													<img
														className="rounded-circle border border-white"
														width="40"
														height="40"
														src="https://www.ica.gov.sg/Cwp/assets/ica/images/font-awesome/fa-user-white.png"
													/>
												</a>
												<div>
													{/* <a className="text-white" href={process.env.HOST_DOMAIN + '/user/profile'} > */}
													<a className="text-white">
														<b className="h3 ml-4">{user.fullName ? user.fullName : user.email.substring(0, user.email.indexOf("@"))}</b>
													</a>
												</div>
												<div className="ml-auto text-gray pull-right" onClick={() => logout()}>logout</div>
											</div>
											:
											<div className="d-flex justify-content-center my-4">
												<a href={process.env.HOST_DOMAIN + "/login"} className="d-block w-100 mr-2 btn btn-info ">LOG IN</a>
												<a href={process.env.HOST_DOMAIN + "/register"} className="d-block w-100 ml-2 btn btn-secondary">REGISTER</a>
											</div>
									}

								</div>
							) : (
									''
								)}
							<MenuItem />
							{this.state.isMobile ? (
								<div>
									<div className="d-flex justify-content-between my-4">
										<div className="d-block w-50">
											<h2 className="nav-link m-0 p-0 text-gray">Language</h2>
										</div>
										<div className="d-block" style={{ width: '33%' }}>
											<div className="d-flex justify-content-between">
												<h2 className="nav-link  m-0 p-0 text-secondary">EN</h2>
												<h2 className="text-gray" style={{ marginTop: '-4px' }}>
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
												<a href="https://facebook.com" className="text-white"><span className="icon-facebook" /></a>
												<a href="https://instagram.com" className="text-white"><span className="icon-instagram" /></a>
												<a href="https://youtube.com" className="text-white"><span className="icon-youtube-play" /></a>
											</div>
										</div>
									</div>
								</div>
							) : (
									''
								)}
						</div>
					</Collapse>
				</Navbar>
			</div>
		);
	}
}
