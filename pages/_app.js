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
	}

	/* changePrice(val) {
		this.setState({ selectedPrice: val })
	} */
	transactionState(data) {
		this.setState({ transaction: {...data} })

	}


	render() {

		const { Component, pageProps } = this.props;
		console.log(this.state.transaction);
		
		return (
			<Container>
				<Head>
					<title>Road 2 Ring</title>
				</Head>
				<Nav {...pageProps} selectedPrice={this.state.transaction ? this.state.transaction.price : ""} />
				<Component {...pageProps}  transactionState={this.transactionState} transaction={this.state.transaction} />
				<Footer {...pageProps} />
			</Container>
		);
	}
}

export default MyApp;
