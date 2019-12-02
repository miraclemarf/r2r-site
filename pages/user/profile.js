import React from 'react'
import Router from 'next/router'
import { connect } from 'react-redux'
import { Container, Row, Col, FormGroup, Input, Label } from 'reactstrap'
import DatePicker from 'react-datepicker'
import { auth, saveProfile } from '../../utils/user'
import { removeHtmlTag, addDays } from '../../components/functions'
import LoaderCard from '../../components/cards/LoaderCard'

const bloodTypes = [
	{ value: "A", label: "A" },
	{ value: "AB", label: "AB" },
	{ value: "B", label: "B" },
	{ value: "O", label: "O" }
]
const idTypes = [
	{ value: "KTP", label: "KTP" },
	{ value: "PASPOR", label: "Paspor" }
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
			formUserpicture_files: null,
			formFullname: props.user.fullName ? props.user.fullName : "",
			formEmail: props.user.email,
			formBirthday: props.user.birthday,
			formBloodtype: props.user.bloodType,
			formPhoneNumber: props.user.phoneNumber,
			formIdtypes: !props.user.userIdentity || props.user.userIdentity == 'NOTSET' ? '' : props.user.userIdentity,
			formIdnumber: props.user.userIdentityNumber,
			formIdpicture: props.user.useridentityPicture,
			formIdpicture_files: null,
			formDriverlicensenumber: props.user.driverLicenseNumber,
			formDriverlicensedpicture: props.user.driverlicensePicture,
			formDriverlicensedpicture_files: null,
			showFullNameWarningLabel: false,
			showAgreementWarningLabel: false,
			showPhoneWarningLabel: false,
			showBirthdayWarningLabel: false,
			showLicenseWarningLabel: false,
			onSaveEditProfile: false
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
		this.setState({ [name]: blobs, [name + '_files']: files })

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

	clickCancel = () => {
		window.location = process.env.HOST_DOMAIN
	}

	toogleAgreement = () => this.setState({formAgreementchecked: !this.state.formAgreementchecked})
	
	async handleSubmit(e) {
		const { 
			token, formAgreementchecked, formFullname, formEmail, formPhoneNumber, formBirthday, formDriverlicensenumber, formDriverlicensedpicture, formIdtypes,
			formIdnumber, formIdpicture, formBloodtype, formUserpicture
		} = this.state
		e.preventDefault()

		// Checl Full Name
		if(!formFullname) {this.setState({showFullNameWarningLabel: true})} else {this.setState({showFullNameWarningLabel: false})}
		// Check Agreement
		if(!formAgreementchecked) {this.setState({showAgreementWarningLabel: true})} else {this.setState({showAgreementWarningLabel: false})}
		// Check Phone Number
		if(!formPhoneNumber) {this.setState({showPhoneWarningLabel: true})} else {this.setState({showPhoneWarningLabel: false})}
		// Check Birthday
		if(!formBirthday) {this.setState({showBirthdayWarningLabel: true})} else {this.setState({showBirthdayWarningLabel: false})}
		// Check Driving License
		if(!formDriverlicensenumber || !formDriverlicensedpicture) {this.setState({showLicenseWarningLabel: true})} else { this.setState({showLicenseWarningLabel: false})}
		// Check ID Card
		if(!formIdtypes || !formIdnumber || !formIdpicture) { this.setState({showIdCardWarningLabel: true})} else { this.setState({showIdCardWarningLabel: false}) }
		// Check Blood Type
		if(!formBloodtype) {this.setState({showBloodTypeWarningLabel: true})} else {this.setState({showBloodTypeWarningLabel: false})}
		// Check User Picture
		if(!formUserpicture) {this.setState({showUserPictureWarningLabel: true})} else {this.setState({showUserPictureWarningLabel: false})}

		if(token && formAgreementchecked && formFullname && formEmail && formPhoneNumber && formBirthday && formDriverlicensenumber && formDriverlicensedpicture && formIdtypes && formIdnumber && formIdpicture && formBloodtype && formUserpicture) {
			this.setState({
				showFullNameWarningLabel: false,
				showPhoneWarningLabel: false,
				showAgreementWarningLabel: false,
				showLicenseWarningLabel: false,
				showBirthdayWarningLabel: false,
				showIdCardWarningLabel: false,
				showBloodTypeWarningLabel: false,
				showUserPictureWarningLabel: false,
				onSaveEditProfile: true
			})
		}
		const submitProfle = await saveProfile({...this.state})
		if(submitProfle) {
			window.location.reload()
		}
	}

	render() {
		const { 
			formUserpicture, formFullname, formBirthday, formEmail, formBloodtype, formPhoneNumber, formIdtypes, 
			formIdnumber, formIdpicture, formDriverlicensenumber, formDriverlicensedpicture, formAgreementchecked, 
			showFullNameWarningLabel, showAgreementWarningLabel, showPhoneWarningLabel, showBirthdayWarningLabel,
			showLicenseWarningLabel, showIdCardWarningLabel, showBloodTypeWarningLabel, showUserPictureWarningLabel,
			onSaveEditProfile
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
								<Label className={`text-danger font-italic w-100 text-center text-sm mt-0 mb-3 ${showUserPictureWarningLabel ? '' : 'd-none'}`}>Profile Photo Cannot Be Empty.</Label>
							</Col>
							<Col lg="12">
								<FormGroup>
									<Label className="text-black text-sm">Full Name<span className="ml-1 text-danger font-weight-bold">*</span></Label>
									<Input 
										type="text" 
										name="formFullname" 
										className="form-control rounded-lg" 
										value={formFullname} 
										onChange={this.handleChange} 
										placeholder="Your Full Name" 
										maxLength="50"
									/>
									<Label className={`text-danger font-italic text-sm mt-1 mb-0 ${showFullNameWarningLabel ? '' : 'd-none'}`}>Full Name Cannot Be Empty.</Label>
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
									<Label className="text-black text-sm">Birthday<span className="ml-1 text-danger font-weight-bold">*</span></Label>
									<DatePicker
										selected={formBirthday}
										onChange={this.handleDatePickerChange}
										maxDate={addDays(new Date(), -6205)}
										dateFormat="dd/MM/yyyy"
										className="form-control rounded-lg"
										placeholderText="Your Birthday"
									/>
									<Label className={`text-danger font-italic text-sm mt-1 mb-0 ${showBirthdayWarningLabel ? '' : 'd-none'}`}>Birthday Cannot Be Empty.</Label>
								</FormGroup>
							</Col>
							<Col xs="12" sm="6">
								<FormGroup>
									<Label className="text-black text-sm">Phone Number<span className="ml-1 text-danger font-weight-bold">*</span></Label>
									<Input 
										type="number" 
										value={formPhoneNumber} 
										name="formPhoneNumber" 
										className="form-control rounded-lg" 
										placeholder="Your Phone Number" 
										onChange={this.handleChange}
										maxLength="30"
									/>
									<Label className={`text-danger font-italic text-sm mt-1 mb-0 ${showPhoneWarningLabel ? '' : 'd-none'}`}>Phone Number Cannot Be Empty.</Label>
								</FormGroup>
							</Col>
							<Col xs="12" sm="6">
								<FormGroup>
									<Label className="text-black text-sm">Blood Type<span className="ml-1 text-danger font-weight-bold">*</span></Label>
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
									<Label className={`text-danger font-italic text-sm mt-1 mb-0 ${showBloodTypeWarningLabel ? '' : 'd-none'}`}>Blood Type Cannot Be Empty.</Label>
								</FormGroup>
							</Col>
							<Col xs="12" sm="6">
								<FormGroup>
									<Label className="text-black text-sm">Your ID<span className="ml-1 text-danger font-weight-bold">*</span></Label>
									<Input 
										type="select"
										className="form-control rounded-lg mb-1"
										name="formIdtypes"  
										value={formIdtypes}
										onChange={this.handleChange}
									>
										<option key="0" value="" readOnly hidden>Choose ID Type</option>
										{idTypes.map((data, key) => <option key={key+1} value={data.value}>{data.label}</option>)}
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
											minHeight: "216px", 
											background: `#E6E6E6 url(${formIdpicture}) center/cover no-repeat`
										}}
										className="border border-softgray rounded-lg text-center position-relative d-inline-block w-100 cursor-pointer"
										
									>
										<div className="position-absolute w-100 h-100 py-5" style={{top: 0, left: 0}}>
											<span 
												id="inputIdpicture"
												style={{fontSize: "5em"}}
												className={`${formIdpicture ? "": "icon-icon_id_card"} d-block w-100 h-100 text-gray80 my-2`}
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
									<Label className={`text-danger font-italic text-sm mt-1 mb-0 ${showIdCardWarningLabel ? '' : 'd-none'}`}>ID Card Cannot Be Empty.</Label>
								</FormGroup>
							</Col>
							<Col xs="12" sm="6" className="mb-4">
								<FormGroup>
									<Label className="text-black text-sm">Your Driving License<span className="ml-1 text-danger font-weight-bold">*</span></Label>
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
											minHeight: "216px", 
											background: `#E6E6E6 url(${formDriverlicensedpicture}) center/cover no-repeat`
										}}
										className="border border-softgray rounded-lg text-center position-relative d-inline-block w-100 cursor-pointer"
										
									>
										<div className="position-absolute w-100 h-100 py-5" style={{top: 0, left: 0}}>
											<span 
												id="inputDriverlicensedpicture"
												style={{fontSize: "5em"}}
												className={`${formDriverlicensedpicture ? "": "icon-icon_id_card"} d-block w-100 h-100 text-gray80 my-2`}
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
									<Label className={`text-danger font-italic text-sm mt-1 mb-0 ${showLicenseWarningLabel ? '' : 'd-none'}`}>Driving License Cannot Be Empty.</Label>
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
									>I have Safety Riding License</Label>
								</div>
								<Label className={`text-danger font-italic text-sm mt-1 mb-0 ${showAgreementWarningLabel ? '' : 'd-none'}`}>Do You Have Safety Riding License?</Label>
							</Col>
							<Col xs="12" sm="6" className="my-1">
								<button type="submit" className="btn btn-primary mb-1 d-block w-100 rounded-lg">SAVE CHANGES</button>
							</Col>
							<Col xs="12" sm="6" className="my-1">
								<button 
									className="btn btn-light w-100 mb-3 text-primary rounded-lg"
									onClick={this.clickCancel}
								>CANCEL</button>
							</Col>
						</Row>
					</form>
				</Container>
				{
					onSaveEditProfile ? 
					 	<LoaderCard
							className="position-fixed d-block"
							loaderColor="primary"
							style={{
								top: 0,
								left: 0,
								backgroundColor: "rgba(255,255,255,0.75)",
								width: "100vw",
								height: "100vh",
								zIndex: 1100
							}}
					 	/> : ""
				}
			</div>
		);
	}
}
export default connect(state => state, {})(Profile)