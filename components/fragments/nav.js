import React from 'react';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';

export default class extends React.Component {
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
		return (
			<div className={this.props.nav != 'blue' ? 'position-absolute w-100' : ''} style={{ zIndex: 10 }}>
				<Navbar className={this.props.nav != 'blue' ? 'bg-transparent my-1' : 'bg-primary'} dark expand="md">
					<NavbarBrand href="/">
						<span className="h2 icon-logo_ring2ring_full" />
					</NavbarBrand>
					<button className="searchToggle">
						<span className="icon-icon_search text-white h4" />
					</button>
					<NavbarToggler className="p-0" onClick={this.toggle} />
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
										<img onClick={this.toggle} src="/static/slicing/img/icon_close.svg" />
									</div>
									<div className="d-flex justify-content-center my-4">
										<a href="/login" className="d-block w-100 mr-2 btn btn-info ">
											LOG IN
										</a>
										<a href="/register" className="d-block w-100 ml-2 btn btn-secondary">
											REGISTER
										</a>
									</div>
								</div>
							) : (
								''
							)}
							<Nav className="text-white" navbar>
								<NavItem>
									<NavLink className="h2 m-0" href="/">
										Home
									</NavLink>
								</NavItem>
								<NavItem>
									<NavLink className="h2 m-0" href="#">
										My Trips
									</NavLink>
								</NavItem>
								<NavItem>
									<NavLink className="h2 m-0" href="/trips">
										Trips Package
									</NavLink>
								</NavItem>
								<NavItem>
									<NavLink className="h2 m-0" href="/gallery">
										Gallery
									</NavLink>
								</NavItem>
								<NavItem>
									<NavLink className="h2 m-0" href="/community">
										Community
									</NavLink>
								</NavItem>
								<NavItem>
									<NavLink className="h2 m-0  " href="/faq">
										FAQ
									</NavLink>
								</NavItem>
							</Nav>
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
