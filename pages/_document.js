import Document, { Html, Head, Main, NextScript } from 'next/document';
class MyDocument extends Document {
	render() {
		return (
			<Html xmlns="https://www.w3.org/1999/xhtml" lang="en">
				<Head>
					<meta charSet="UTF-8" />
					<meta name="viewport" content="width=device-width, initial-scale=1" />
					<meta name="theme-color" content="#FFFFFF" />
					<link href={`${process.env.HOST_DOMAIN}/static/r2r-icomoon/style.css`} rel="stylesheet" />
					<link href={`${process.env.HOST_DOMAIN}/static/font/font.css`} rel="stylesheet" />
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
