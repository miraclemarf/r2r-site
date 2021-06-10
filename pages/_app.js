import React from 'react'
import { Provider } from 'react-redux'
import App from 'next/app'
import Router from 'next/router'
import withRedux from 'next-redux-wrapper'
import { makeStore } from '../components/store'

import { myProfile, logout } from "../utils/user"
import cookies from 'next-cookies'

import Head from 'next/head'
import Navigate from '../components/fragments/nav'
import Footer from '../components/fragments/footer'
import FloatNotif from '../components/fragments/floatNotif'
import '../styles/style.scss'
import { throws } from 'assert'
import NProgress from 'nprogress'

Router.onRouteChangeStart = () => NProgress.start()

Router.onRouteChangeComplete = () => {
	// console.log('onRouteChnageComplete triggered');
	NProgress.done()
}

Router.onRouteChangeError = () => {
	// console.log('onRouteChnageError triggered');
	NProgress.done()
}

class MyApp extends App {
	static async getInitialProps({ Component, ctx }) {
		let pageProps = {}
		let user = null
		let { token } = cookies(ctx)
		if (Component.getInitialProps) {
			pageProps = await Component.getInitialProps(ctx)
		}
		if (token) {
			pageProps.token = JSON.parse(token)
			let userObj = await myProfile(pageProps.token.access_token)
			if (userObj) {

				pageProps.user = userObj
			}
			else {
				pageProps.user = null;
			}
		}
		pageProps.isMobileUa = Boolean((ctx.req
			? ctx.req.headers['user-agent']
			: navigator.userAgent).match(
				/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i
			))

		return { pageProps, token, user }
	}
	constructor(props) {
		super(props)
		this.state = { ...props.pageProps }
		/* this.changePrice = this.changePrice.bind(this) */
		this.transactionState = this.transactionState.bind(this)
		this.tripState = this.tripState.bind(this)
		this.checkoutStatusState = this.checkoutStatusState.bind(this)
	}

	/* changePrice(val) {
		this.setState({ selectedPrice: val })
	} */
	transactionState(data) {
		this.setState({ transaction: { ...data } })
	}

	checkoutStatusState(data) {
		this.setState({ checkoutStatus: data })
	}

	tripState(data) {
		this.setState({ trip: { ...data } })
	}

	componentWillReceiveProps(nextProps) {
		//console.log(nextProps);

		/*    this.setState({
			   trip: nextProps.tripDetail,
			   motor: nextProps.MotorData,
		   }) */
	}

	render() {
		const { Component, pageProps, store } = this.props
		const { checkoutStatus, transaction, trip, isMobile } = this.state

		return (
			<div>
				<Head>
					<title>Ranstouring</title>
				</Head>
				<Provider store={store}>
					{/* <FloatNotif message="Thank you for your registration, Please check your email to verify account" /> */}
					<Navigate
						{...pageProps}
						checkoutStatus={checkoutStatus}
					//selectedPrice={pageProps.navTrans ? transaction.price ? transaction.price : "" : ""} 
					//selectedPrice={store.getState().TransactionData} 
					/>
					<Component
						{...pageProps}
						transactionState={this.transactionState}
						tripState={this.tripState}
						checkoutStatusState={this.checkoutStatusState}
						trip={trip}
						transaction={transaction}
						isMobile={isMobile}
					/>
					<Footer {...pageProps} />
				</Provider>
			</div>
		)
	}
}

export default withRedux(makeStore)(MyApp)
