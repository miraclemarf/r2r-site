import React from 'react'
import Router from 'next/router'
import { connect } from 'react-redux'
import { Container, Row, Col, FormGroup, Input, Label } from 'reactstrap'
import DatePicker from 'react-datepicker'
import { auth, saveProfile } from '../../utils/user'
import { removeHtmlTag } from '../../components/functions'

const bloodTypes = [
	{ value: "A", label: "A" },
	{ value: "AB", label: "AB" },
	{ value: "B", label: "B" },
	{ value: "O", label: "O" }
]
const idTypes = [
	{ value: "KTP", label: "KTP" },
	{ value: "Paspor", label: "Paspor" }
]

class Profile extends React.Component {
	static async getInitialProps(req) {
		// Inherit standard props from the Page (i.e. with session data)
		auth(req)
		let props = {}
		try {
			props.nav = 'blue'
			props.footer = 'transparent'
			props.scrollHeader = false
		} catch (e) {
			props.error = 'Unable to fetch AsyncData on server'
		}
		return props
	}

	constructor(props) {
		super(props)
		this.state = {
			token: props.token,
			formAgreementchecked: false,
			formUserpicture: props.user.userPicture ? props.user.userPicture : "",
			formFullname: props.user.fullName ? props.user.fullName : "",
			formEmail: props.user.email,
			formBirthday: props.user.birthday,
			formBloodtype: props.user.bloodType,
			formPhoneNumber: props.user.phoneNumber,
			formIdtypes: !props.user.userIdentity || props.user.userIdentity == 'NOTSET' ? '' : props.user.userIdentity,
			formIdnumber: props.user.userIdentityNumber,
			formIdpicture: props.user.useridentityPicture,
			formDriverlicensenumber: props.user.driverLicenseNumber,
			formDriverlicensedpicture: props.user.driverlicensePicture
		}
		this.clickUpload = this.clickUpload.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
	}

	UNSAFE_componentWillReceiveProps(nextProps) {
		this.setState({token: nextProps.token})
	}

	handleChange = (e) => {
		const target = e.target, value = target.value, name = target.name
		this.setState({ [name]: removeHtmlTag(value) })
	}

	handleDatePickerChange = (dates) => this.setState({formBirthday: dates})

	handleFileSelect = (e) => {
		const name = e.target.name
		const files = e.target.files[0]
		const blobs = URL.createObjectURL(files)
		this.setState({ [name]: blobs, [name + '-files']: files })

		/* this.setState({
            logo: e.target.files[0],
            files: URL.createObjectURL(e.target.files[0])
        }) */
	}

	clickUpload(e) {
		let id = e.target.id
		if(id == "inputUserpicture") { this.inputUserpicture.click() }
		if(id == "inputIdpicture") { this.inputIdpicture.click() }
		if(id == "inputDriverlicensedpicture") { this.inputDriverlicensedpicture.click()}
	}

	toogleAgreement = () => this.setState({formAgreementchecked: !this.state.formAgreementchecked})
	
	async handleSubmit(e) {
		e.preventDefault()
		if(this.state.formAgreementchecked) {
			await saveProfile({...this.state})
		}
	}

	render() {
		const { 
			formUserpicture, formFullname, formBirthday, formEmail, formBloodtype, formPhoneNumber,
			formIdtypes, formIdnumber, formIdpicture, formDriverlicensenumber, formDriverlicensedpicture,
			formAgreementchecked
		} = this.state
		return (
			<div role="main" className="mt-4 pt-5">
				<Container className="container-sm px-3" style={{maxWidth: "768px"}}>
					<h1 className="title-section mt-2">Profile</h1>
					<form onSubmit={this.handleSubmit}>
						<Row>
							<Col xs="12" sm="12">
								<div className="form-group text-center">
									<div 
										id="inputUserpicture" 
										style={{ 
											width: '100px', 
											height: '100px', 
											backgroundImage: `url(${formUserpicture ? formUserpicture : "https://www.ica.gov.sg/Cwp/assets/ica/images/font-awesome/fa-user-white.png"})`,
											backgroundSize: `${formUserpicture ? "cover" : "70%" }`,
											backgroundPosition: "center center",
											backgroundRepeat: "no-repeat"
										}}
										className="bg-softgray mx-auto mt-4 rounded-circle cursor-pointer"
										onClick={this.clickUpload}
									/>
									<input
										type="file"
										ref={(input) => (this.inputUserpicture = input)}
										accept=".jpg, .png, .jpeg"
										name="formUserpicture"
										hidden
										onChange={this.handleFileSelect}
									/>
								</div>
							</Col>
							<Col lg="12">
								<FormGroup>
									<Label className="text-black text-sm">Full Name</Label>
									<Input 
										type="text" 
										name="formFullname" 
										className="form-control rounded-lg" 
										value={formFullname} 
										onChange={this.handleChange} 
										placeholder="Your Full Name" 
										maxLength="50"
									/>
								</FormGroup>
							</Col>
							<Col xs="12" sm="6">
								<FormGroup>
									<Label className="text-black text-sm">Email</Label>
									<Input 
										type="email" 
										name="email" 
										className="form-control rounded-lg" 
										placeholder="Your Email" 
										value={formEmail} 
										readOnly={true} 
									/>
								</FormGroup>
							</Col>
							<Col xs="12" sm="6">
								<FormGroup>
									<Label className="text-black text-sm">Birthday</Label>
									<DatePicker
										selected={formBirthday}
										onChange={this.handleDatePickerChange}
										dateFormat="dd/MM/yyyy"
										className="form-control rounded-lg"
										placeholderText="Your Birthday"
									/>
								</FormGroup>
							</Col>
							<Col xs="12" sm="6">
								<FormGroup>
									<Label className="text-black text-sm">Phone Number</Label>
									<Input 
										type="number" 
										value={formPhoneNumber} 
										name="formPhoneNumber" 
										className="form-control rounded-lg" 
										placeholder="Your Phone Number" 
										onChange={this.handleChange}
										maxLength="30"
									/>
								</FormGroup>
							</Col>
							<Col xs="12" sm="6">
								<FormGroup>
									<Label className="text-black text-sm">Blood Type</Label>
									<Input 
										type="select"
										className="form-control rounded-lg"
										name="formBloodtype"  
										value={formBloodtype}
										onChange={this.handleChange}
									>
										<option key="0" value="" readOnly hidden>Choose Blood Type</option>
										{
											bloodTypes.map((data, key) => <option key={key+1} value={data.value}>{data.label}</option>)
										}
									</Input>
								</FormGroup>
							</Col>
							<Col xs="12" sm="6">
								<FormGroup>
									<Label className="text-black text-sm">Your ID</Label>
									<Input 
										type="select"
										className="form-control rounded-lg mb-1"
										name="formIdtypes"  
										value={formIdtypes}
										onChange={this.handleChange}
									>
										<option key="0" value="" readOnly hidden>Choose ID Type</option>
										{
											idTypes.map((data, key) => <option key={key+1} value={data.value}>{data.label}</option>)
										}
									</Input>
									<Input 
										type="number" 
										value={formIdnumber} 
										name="formIdnumber" 
										className="form-control rounded-lg mb-1" 
										placeholder="Your ID Number"
										onChange={this.handleChange} 
										maxLength="30"
									/>
									<div 
										style={{ 
											minHeight: "180px", 
											background: `#E6E6E6 url(${formIdpicture}) center/cover no-repeat`
										}}
										className="border border-softgray rounded-lg text-center d-flex cursor-pointer"
										
									>
										<div className="align-self-center mx-auto w-100 py-5">
											<span 
												id="inputIdpicture"
												style={{fontSize: "5em"}}
												className={`${formIdpicture ? "": "icon-icon_id_card"} d-block text-gray80 my-2`}
												onClick={this.clickUpload}
											/>
											<span className={`font-italic text-gray80 ${formIdpicture ? "d-none": ""}`}>Upload your ID</span>
										</div>
										<input
											type="file"
											ref={(input) => (this.inputIdpicture = input)}
											name="formIdpicture"
											accept=".jpg, .png, .jpeg"
											hidden
											onChange={this.handleFileSelect}
										/>
									</div>
								</FormGroup>
							</Col>
							<Col xs="12" sm="6" className="mb-4">
								<FormGroup>
									<Label className="text-black text-sm">Your Driving License</Label>
									<Input 
										type="number" 
										value={formDriverlicensenumber}
										name="formDriverlicensenumber"
										className="form-control rounded-lg mb-1" 
										placeholder="Your Driving License Number" 
										onChange={this.handleChange} 
										maxLength="30"
									/>
									<div 
										style={{ 
											minHeight: "180px", 
											background: `#E6E6E6 url(${formDriverlicensedpicture}) center/cover no-repeat`
										}}
										className="border border-softgray rounded-lg text-center d-flex cursor-pointer"
										
									>
										<div className="align-self-center mx-auto w-100 py-5">
											<span 
												id="inputDriverlicensedpicture"
												style={{fontSize: "5em"}}
												className={`${formDriverlicensedpicture ? "": "icon-icon_id_card"} d-block text-gray80 my-2`}
												onClick={this.clickUpload}
											/>
											<span className={`font-italic text-gray80 ${formDriverlicensedpicture ? "d-none": ""}`}>Upload your ID</span>
										</div>
										<input
											type="file"
											ref={(input) => (this.inputDriverlicensedpicture = input)}
											name="formDriverlicensedpicture"
											accept=".jpg, .png, .jpeg"
											hidden
											onChange={this.handleFileSelect}
										/>
									</div>
								</FormGroup>
								<div className="form-check ml-2">
									<Input 
										type="checkbox" 
										className="form-check-input"
										checked={formAgreementchecked}
										onChange={this.toogleAgreement}
									/>
									<Label 
										className="form-check-label"
										onClick={this.toogleAgreement}
									>I have safety riding license</Label>
								</div>
							</Col>
							<Col xs="12" sm="6" className="my-1">
								<button type="submit" className="btn btn-primary mb-1 d-block w-100 rounded-lg">SAVE CHANGES</button>
							</Col>
							<Col xs="12" sm="6" className="my-1">
								<button 
									className="btn btn-light w-100 mb-3 text-primary rounded-lg"
									onClick={() => console.log('Batal')}
								>CANCEL</button>
							</Col>
						</Row>
					</form>
				</Container>
			</div>
		);
	}
}
export default connect(state => state, {})(Profile)