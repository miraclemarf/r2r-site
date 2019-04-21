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
		this.changePrice = this.changePrice.bind(this)
	}

	changePrice(val) {
		this.setState({selectedPrice:val})		
	}


	render() {
		
		const { Component, pageProps } = this.props;
		return (
			<Container>
				<Head>
					<title>Road 2 Ring</title>
				</Head>
				<Nav {...pageProps} selectedPrice={this.state.selectedPrice} />
				<Component {...pageProps} changePrice={this.changePrice} />
				<Footer {...pageProps} />
			</Container>
		);
	}
}

export default MyApp;
