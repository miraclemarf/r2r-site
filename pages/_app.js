import React from 'react';
import App, { Container } from 'next/app';

import Head from 'next/head';
import Nav from '../components/fragments/nav';
import Footer from '../components/fragments/footer';
import '../styles/style.scss';


class MyApp extends App {
	constructor(props) {
		super(props);

		this.state = {
			...props.pageProps
		};
		/* this.changePrice = this.changePrice.bind(this) */
		this.transactionState = this.transactionState.bind(this)
		this.tripState = this.tripState.bind(this)
	}

	/* changePrice(val) {
		this.setState({ selectedPrice: val })
	} */
	transactionState(data) {
		
		this.setState({ transaction: {...data} })

	}

	tripState(data){
		this.setState({trip: {...data}})
	}


	render() {

		const { Component, pageProps } = this.props;
		
		return (
			<Container>
				<Head>
					<title>Road 2 Ring</title>
				</Head>
				<Nav {...pageProps} selectedPrice={this.props.pageProps.navTrans ? this.state.transaction.price ? this.state.transaction.price : "" : ""} />
				<Component {...pageProps}  transactionState={this.transactionState} transaction={this.state.transaction} />
				<Footer {...pageProps} />
			</Container>
		);
	}
}

export default MyApp;
