import { Component } from 'react';
import { actionTypes } from '../components/types'
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

export const loginSocial = async (token) => {
	var dataForm = new FormData();
	dataForm.append('socialToken', token);
	try {
		const response = await fetch(process.env.API_URL + '/user/auth/social', {
			method: 'POST',
			body: dataForm
		});
		if (response.ok) {
			const token = await response.json();
			if (token.object) {
				cookie.set('token', token.object, { expires: token.object.expires_in });
				/*if (data.isHasTransaction) {
					Router.push('/transaction/checkout?page=checkout&idTrip=' + data.idTrip, process.env.HOST_DOMAIN + '/trip/' + data.idTrip + '/checkout');
				}*/
				//else {
					window.location.href = process.env.HOST_DOMAIN + '/';
					//Router.push('/',  process.env.HOST_DOMAIN+'/')
				//}
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
}

export const myProfile = async (access_token) => {
	//static async myProfile(access_token) {
		//console.log(access_token);
		
	const url = process.env.API_URL + '/user/profile'
	const res = await fetch(url,
		{
			headers: {
				Authorization: 'Bearer ' + access_token
			}
		})
	const data = await res.json()
	//console.log(data);
	
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
export const verification = async(code) => {
	var dataForm = new FormData();
	dataForm.append('verificationCode', code);
	const url = `${process.env.API_URL}/user/verification/code` 
	const options = {
		method: 'POST', 
		body: dataForm
	}
	const response = await fetch(url, options)
	if (!response.ok) {
		return { status: false, message: response.message }
	}
	return { status: true, message: 'Success!' }
}

export const saveProfile = async (props) => {
	let formData = new FormData()
	formData.append("email", props.formEmail)
	formData.append("fullName", props.formFullname)
	if(props.formUserpicture_files) {
		formData.append("userPicture", props.formUserpicture_files)
	}
	formData.append("userIdentity", props.formIdtypes)
	formData.append("userIdentitiyNumber", props.formIdnumber)
	if(props.formIdpicture_files) {
		formData.append("useridentityPicture", props.formIdpicture_files)
	}
	formData.append("driverLicenseNumber", props.formDriverlicensenumber)
	if(props.formDriverlicensedpicture_files) {
		formData.append("driverlicensePicture", props.formDriverlicensedpicture_files)
	}
	formData.append("bloodType", props.formBloodtype)
	formData.append("phoneNumber", props.formPhoneNumber)
	formData.append("userBirthday", new Date(props.formBirthday).getTime())

	const url = `${process.env.API_URL}/user/profile` 
	const options = {
		method: 'POST', 
		headers: { 'Authorization': 'Bearer ' + props.token.access_token },
		body: formData
	}
	const response = await fetch(url, options)
	if (!response.ok) {
		return { status: false, message: response.message }
	}
	return { status: true, message: 'Success!' }
}

export const getUser = () => {
	const token = cookie.get('token')
	console.log(token)
}

export const logout = async () => {
	cookie.remove('token')
	window.localStorage.setItem('logout', Date.now())
	Router.push('/login')
}

const getDisplayName = Component =>
  Component.displayName || Component.name || "Component";
export const withAuthSync = WrappedComponent => class extends Component {
	static displayName = `withAuthSync(${getDisplayName(WrappedComponent)})`;
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
		console.log('mount');
		window.addEventListener('storage', this.syncLogout)
	}

	componentWillUnmount() {
		window.removeEventListener('storage', this.syncLogout)
		window.localStorage.removeItem('logout')
	}

	syncLogout(event) {
		console.log('synclog');
		console.log(event);
		if (event.key === 'logout') {
			// console.log('logged out from storage!')
			Router.push('/login')
		}
	}

	render() {
		console.log('asdqwe');
		console.log(this.props);
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
