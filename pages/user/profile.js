import React from 'react';

import Router from 'next/router';
import { Input } from 'reactstrap';
import { auth, saveProfile } from "../../utils/user"

class Profile extends React.Component {
	static async getInitialProps(req) {
		// Inherit standard props from the Page (i.e. with session data)
		auth(req)
		let props = {}

		if (typeof window === 'undefined') {
			try {
				props.nav = 'blue'
				props.footer = 'transparent'
				props.scrollHeader = false
			} catch (e) { }
		}

		return props;
	}
	constructor(props) {
		super(props);

		this.state = {
			...props,
			profilePicture: '',
			identityPersonFile: '',
			identityDriverFile: ''
		};



		this.handleFileSelect = this.handleFileSelect.bind(this)
		this.clickUpload = this.clickUpload.bind(this)
		this.handleChange = this.handleChange.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
	}
	clickUpload(e) {
		//console.log(this.logo.current)
		console.log(e.target)
		let id = e.target.id
		//this.id.click();
		if (id == "userPicture") {
			this.userPicture.click();
		}
		else if (id == "useridentityPicture") {
			this.useridentityPicture.click()
		}
		else {
			this.driverlicensePicture.click()
		}
	}
	handleFileSelect(event) {
		let name = event.target.name;
		let value = URL.createObjectURL(event.target.files[0])
		const currentUser = { ...this.state.user }
		this.setState({
			user: { ...currentUser, [name]: value, [name + 'Obj']: event.target.files[0] }
		})

		/* this.setState({
            logo: event.target.files[0],
            files: URL.createObjectURL(event.target.files[0])
        }) */
	}
	handleChange(e) {
		const target = e.target, value = target.value, name = target.name;

		const currentUser = { ...this.state.user }
		this.setState({ user: { ...currentUser, [name]: value } });
	}
	async handleSubmit(e) {
		e.preventDefault();
		const { user, token } = this.state;
		
		await saveProfile(user, token.access_token);

	}
	render() {
		const { user } = this.state
		console.log(user);

		return (
			<div className="container">
				<div className="py-3" />
				<h1 className="title-section">Profile</h1>
				<form onSubmit={this.handleSubmit}>
					<div className="form-group text-center">
						<div id="userPicture" name="userPicture"
							style={{ width: '100px', height: '100px', background: "url(" + user.userPicture + ") center/cover no-repeat" }}
							className="bg-softgray mx-auto rounded-circle"
							onClick={this.clickUpload}
						/>
						<input
							type="file"
							ref={(input) => (this.userPicture = input)}
							name="userPicture"
							hidden
							onChange={this.handleFileSelect}
						/>
					</div>
					<div className="form-group">
						<label className="text-black text-sm">Full Name</label>
						<input type="text" name="fullName" className="form-control" value={user.fullName} onChange={this.handleChange} placeholder="Your Full Name" />
					</div>
					<div className="form-group">
						<label className="text-black text-sm">Email</label>
						<input type="email" name="email" className="form-control" placeholder="Your Email" value={user.email} readOnly={true} />
					</div>
					<div className="form-row">
						<div className="form-group col">
							<label>Birthday</label>
							<select className="form-control" value={'Day'} onChange={this.dropdownChanged}>
								<option value="Day">Day</option>
								<option value="....">...</option>
							</select>
						</div>
						<div className="form-group col">
							<label className="invisible">Month</label>
							<select className="form-control">
								<option>Month</option>
								<option>...</option>
							</select>
						</div>
						<div className="form-group col">
							<label className="invisible">Year</label>
							<select className="form-control">
								<option>Year</option>
								<option>...</option>
							</select>
						</div>
					</div>
					<div className="form-group">
						<label className="text-black text-sm">Phone Number</label>
						<input type="number" value={user.phoneNumber} name="phoneNumber" className="form-control" placeholder="Your Phone Number" />
					</div>
					<div className="form-group">
						<label className="text-black text-sm">Blood Type</label>
						<select className="form-control">
							<option value="">Choose Blood Type</option>
							<option value="A">A</option>
							<option value="B">B</option>
							<option value="O">O</option>
							<option value="AB">AB</option>
						</select>
					</div>
					<div className="form-group">
						<label className="text-black text-sm">Your ID</label>
						<select className="form-control mb-2">
							<option value="">Choose ID Type</option>
							<option value="KTP">KTP</option>
							<option value="Paspor">Paspor</option>
						</select>
						<input type="number" value={user.userIdentityNumber} name="userIdentityNumber" className="form-control mb-2" placeholder="Your ID Number" />
						<div style={{ borderRadius: '16px', minHeight: '200px', background: "#E6E6E6 url(" + user.useridentityPicture + ") center/cover no-repeat" }}
							className="border border-softgray text-center d-flex"
						>
							<div className="align-self-center mx-auto" >
								<span id="useridentityPicture"
									onClick={this.clickUpload}
									style={{ fontSize: '5em' }}
									className="icon-icon_id_card d-block text-gray80 mb-3"
								/>
								<span className="font-italic text-gray80">Upload your ID</span>
							</div>
							<input
								type="file"
								ref={(input) => (this.useridentityPicture = input)}
								name="useridentityPicture"
								hidden
								onChange={this.handleFileSelect}
							/>
						</div>
					</div>
					<div className="form-group">
						<label className="text-black text-sm">Your Driving License</label>
						<input type="number" className="form-control mb-2" placeholder="Your ID Number" />
						<div
							style={{ borderRadius: '16px', background: "#E6E6E6 url(" + user.driverlicensePicture + ") center/cover no-repeat", minHeight: '200px' }}
							className="border border-softgray text-center d-flex"
						>
							<div className="align-self-center mx-auto">
								<span id="driverlicensePicture"
									onClick={this.clickUpload}
									style={{ fontSize: '5em' }}
									className="icon-icon_id_card d-block text-gray80 mb-3"
								/>
								<span className="font-italic text-gray80">Upload your ID</span>

								<input
									type="file"
									ref={(input) => (this.driverlicensePicture = input)}
									name="driverlicensePicture"
									hidden
									onChange={this.handleFileSelect}
								/>
							</div>
						</div>
					</div>
					<div className="form-check ml-2">
						<input type="checkbox" className="form-check-input" />
						<label className="form-check-label">I have safety riding license</label>
					</div>
					<div className="py-3" />
					<div className="text-center mb-3">
						<button type="submit" className="btn btn-primary mb-4 d-block w-100">
							SAVE CHANGES
						</button>
						<a href="#" className="text-primary">
							<b>Cancel</b>
						</a>
					</div>
				</form>
				<div className="py-3" />
			</div>
		);
	}
}
export default Profile