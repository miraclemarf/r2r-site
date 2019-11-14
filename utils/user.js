import { Component } from 'react';
import Router from 'next/router';
import fetch from 'isomorphic-unfetch';
import nextCookie from 'next-cookies';
import cookie from 'js-cookie';

export const login = async (data) => {
	var dataForm = new FormData();
	dataForm.append('email', data.email);
	dataForm.append('password', data.password);
	try {
		const response = await fetch(process.env.API_URL + '/user/auth/basic', {
			method: 'POST',
			body: dataForm
		});
		if (response.ok) {
			const token = await response.json();
			if (token.object) {
				cookie.set('token', token.object, { expires: token.object.expires_in });
				if (data.isHasTransaction) {
					Router.push('/transaction/checkout?page=checkout&idTrip=' + data.idTrip, process.env.HOST_DOMAIN + '/trip/' + data.idTrip + '/checkout');
				}
				else {
					window.location.href = process.env.HOST_DOMAIN + '/';
					//Router.push('/',  process.env.HOST_DOMAIN+'/')
				}
			}
		} else {
			console.log('Login failed.');
			// https://github.com/developit/unfetch#caveats
			let error = new Error(response.statusText);
			error.response = response;
			return Promise.reject(error);
		}
	} catch (error) {
		console.error('You have an error in your code or there are Network issues.', error);
		throw new Error(error);
	}
};

export const myProfile = async (access_token) => {
	//static async myProfile(access_token) {
	const url = process.env.API_URL + '/user/profile'
	const res = await fetch(url,
		{
			headers: {
				Authorization: 'Bearer ' + access_token
			}
		})
	const data = await res.json()
	return data.object
}

export const register = async (data) => {
	var dataForm = new FormData();
	dataForm.append('email', data.email);
	dataForm.append('password', data.password);
	dataForm.append('userBirthday', data.userBirthday);

	try {
		const response = await fetch(process.env.API_URL + '/user/registration', {
			method: 'POST',
			body: dataForm
		});
		if (response.ok) {
			login(data)

		} else {
			console.log('register failed.');
			const res = await response.json();

			// https://github.com/developit/unfetch#caveats
			//let error = new Error(res.message);
			//error.response = response;
			return res;
		}
	} catch (error) {
		console.error('You have an error in your code or there are Network issues.', error);
		throw new Error(error);
	}
};

export const saveProfile = async (props) => {
	console.log(props)

	// const postData = {
	// 	'email': props.formEmail, 
	// 	'fullName': props.formFullname, 
	// 	'userPicture': JSON.stringify(props.formUserpicture_files),
	// 	'userIdentity': props.formIdtypes, 
	// 	'userIdentitiyNumber': props.formIdnumber, 
	// 	'useridentityPicture': JSON.stringify(props.formIdpicture_files),
	// 	'driverLicenseNumber': props.formDriverlicensenumber, 
	// 	'driverlicensePicture': JSON.stringify(props.formDriverlicensedpicture_files),
	// 	'bloodType': props.formBloodtype,
	// 	'phoneNumber': props.formPhoneNumber,
	// 	'userBirthday': props.formBirthday
	// }
	let formData = new FormData()
	formData.append("email", props.formEmail)
	formData.append("fullName", props.formFullname)
	formData.append("userPicture", props.formUserpicture_files)
	formData.append("userIdentity", props.formIdtypes)
	formData.append("userIdentitiyNumber", props.formIdnumber)
	formData.append("useridentityPicture", props.formIdpicture_files)
	formData.append("driverLicenseNumber", props.formDriverlicensenumber)
	formData.append("driverlicensePicture", props.formDriverlicensedpicture_files)
	formData.append("bloodType", props.formBloodtype)
	formData.append("phoneNumber", props.formPhoneNumber)
	formData.append("userBirthday", props.formBirthday)
	console.log(formData)

	// console.log(dataForm)
	const url = `${process.env.API_URL}/user/profile` 
	const options = {
		method: 'POST', 
		headers: { 'Authorization': 'Bearer ' + props.token.access_token },
		body: formData
	}
	const response = await fetch(url, options)
	if (response.ok) {
		return true
	} else {
		return false
	}
	
	//dataForm = postData
	// for (var pair of dataForm.entries()) {
	// 	console.log(pair[0] + ', ' + pair[1]);
	// }

	// console.log(postData)''

}

export const getUser = () => {
	const token = cookie.get('token')
	console.log(token)
}

export const logout = () => {
	cookie.remove('token')
	window.localStorage.setItem('logout', Date.now())
	Router.push(process.env.HOST_DOMAIN + '/login')
}

export const withAuthSync = (WrappedComponent) => class extends Component {
	//static displayName = `withAuthSync(${getDisplayName(WrappedComponent)})`;
	static async getInitialProps(ctx) {
		const token = auth(ctx)
		const componentProps = WrappedComponent.getInitialProps && (await WrappedComponent.getInitialProps(ctx))
		return { ...componentProps, token }
	}

	constructor(props) {
		super(props)
		this.syncLogout = this.syncLogout.bind(this)
	}

	componentDidMount() {
		window.addEventListener('storage', this.syncLogout)
	}

	componentWillUnmount() {
		window.removeEventListener('storage', this.syncLogout)
		window.localStorage.removeItem('logout')
	}

	syncLogout(event) {
		if (event.key === 'logout') {
			// console.log('logged out from storage!')
			Router.push('/login')
		}
	}

	render() {
		return <WrappedComponent {...this.props} />;
	}
}

export const auth = (ctx) => {
	const { token } = nextCookie(ctx)
	if (ctx.req && !token) {
		ctx.res.writeHead(302, { Location: process.env.HOST_DOMAIN + '/login' })
		ctx.res.end()
		return
	}
	if (!token) Router.push(process.env.HOST_DOMAIN + '/login')
	return token
}
