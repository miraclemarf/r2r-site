import React from 'react';
import App, { Container } from 'next/app';
import Nav from '../components/fragments/nav';
import Footer from '../components/fragments/footer';
import '../styles/style.scss';

class MyApp extends App {
	static async getInitialProps({ Component, ctx }) {
		let pageProps = {};

		if (Component.getInitialProps) {
			pageProps = await Component.getInitialProps(ctx);
		}

		return { pageProps };
	}

	constructor(props) {
		super(props);

		this.state = {
			...props.pageProps
		};
	}

	componentDidUpdate(prevProps) {
		if (prevProps.pageProps !== this.props.pageProps) {
			if (this.props.router.asPath == '/gallery') {
				this.setState({
					nav: 'blue',
					footer: 'transparent'
				});
			}
		}
	}

	render() {
		const { Component, pageProps } = this.props;

		return (
			<Container>
				<Nav {...pageProps} {...this.state} />
				<Component {...pageProps} {...this.state} />
				<Footer {...pageProps} {...this.state} />
			</Container>
		);
	}
}

export default MyApp;
