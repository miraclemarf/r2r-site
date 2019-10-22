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

	// const postData = {
	// 	'email': user.email, 
	// 	'fullName': user.fullName, 
	// 	'userIdentity': user.userIdentity, 
	// 	'userIdentityNumber': user.userIdentityNumber, 
	// 	'driverLicenseNumber': user.driverLicenseNumber, 
	// 	'bloodType': user.bloodType,
	// 	'phoneNumber': user.phoneNumber,
	// 	'userPicture': user.userPictureObj,
	// 	'useridentityPicture': user.useridentityPictureObj,
	// 	'driverlicensePicture': user.driverlicensePictureObj
	// }
	console.log(props)
	// const dataForm = new FormData()

	// for (var key in postData) {
	// 	dataForm.append(key, postData[key]);
	// }

/* 
	console.log(user);
	
	//dataForm = postData
	for (var pair of dataForm.entries()) {
		console.log(pair[0] + ', ' + pair[1]);
	}

	console.log(postData); */

	// try {
	// 	const response = await fetch(process.env.API_URL + '/user/profile', {
	// 		method: 'POST', 
	// 		headers: {
	// 			'Authorization': 'Bearer ' + access_token,
	// 		},
	// 		body: dataForm
	// 	});
	// 	if (response.ok) {
	// 		window.location.href = process.env.HOST_DOMAIN + '/user/profile';
	// 	} else {
	// 		console.log('Login failed.');
	// 		// https://github.com/developit/unfetch#caveats
	// 		let error = new Error(response.statusText);
	// 		error.response = response;
	// 		return Promise.reject(error);
	// 	}
	// } catch (error) {
	// 	console.error('You have an error in your code or there are Network issues.', error);
	// 	throw new Error(error);
	// }
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
