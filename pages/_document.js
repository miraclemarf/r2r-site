import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
	static async getInitialProps(ctx) {
		const initialProps = await Document.getInitialProps(ctx);
		return { ...initialProps };
	}

	render() {
		return (
			<Html>
				<Head>
					<meta charSet="UTF-8" />
					<meta name="viewport" content="width=device-width, initial-scale=1" />
					<script src="https://cdn.polyfill.io/v2/polyfill.min.js" />
				</Head>
				<body className="r2r-custom">
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}

export default MyDocument;
