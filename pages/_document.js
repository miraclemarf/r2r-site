import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
	render() {
		return (
			<Html xmlns="https://www.w3.org/1999/xhtml" lang="en">
				<Head>
					<meta charSet="UTF-8" />
					<meta name="viewport" content="width=device-width, initial-scale=1" />
					<link rel="apple-touch-icon" sizes="57x57" href={`${process.env.HOST_DOMAIN}/_next/static/icons/icon_57x57.png`} />
					<link rel="apple-touch-icon" sizes="60x60" href={`${process.env.HOST_DOMAIN}/_next/static/icons/icon_60x60.png`} />
					<link rel="apple-touch-icon" sizes="72x72" href={`${process.env.HOST_DOMAIN}/_next/static/icons/icon_72x72.png`} />
					<link rel="apple-touch-icon" sizes="76x76" href={`${process.env.HOST_DOMAIN}/_next/static/icons/icon_76x76.png`} />
					<link rel="apple-touch-icon" sizes="114x114" href={`${process.env.HOST_DOMAIN}/_next/static/icons/icon_114x114.png`} />
					<link rel="apple-touch-icon" sizes="120x120" href={`${process.env.HOST_DOMAIN}/_next/static/icons/icon_120x120.png`} />
					<link rel="apple-touch-icon" sizes="144x144" href={`${process.env.HOST_DOMAIN}/_next/static/icons/icon_144x144.png`} />
					<link rel="apple-touch-icon" sizes="152x152" href={`${process.env.HOST_DOMAIN}/_next/static/icons/icon_152x152.png`} />
					<link rel="apple-touch-icon" sizes="180x180" href={`${process.env.HOST_DOMAIN}/_next/static/icons/icon_180x180.png`} />
					<link rel="icon" type="image/png" sizes="192x192" href={`${process.env.HOST_DOMAIN}/_next/static/icons/icon_192x192.png`} />
					<link rel="icon" type="image/png" sizes="32x32" href={`${process.env.HOST_DOMAIN}/_next/static/icons/icon_32x32.png`} />
					<link rel="icon" type="image/png" sizes="96x96" href={`${process.env.HOST_DOMAIN}/_next/static/icons/icon_96x96.png`} />
					<link rel="icon" type="image/png" sizes="16x16" href={`${process.env.HOST_DOMAIN}/_next/static/icons/icon_16x16.png`} />
					<meta name="msapplication-TileColor" content="#FFFFFF" />
					<meta name="msapplication-TileImage" content={`${process.env.HOST_DOMAIN}/_next/static/icons/icon_144x144.png`} />
					<meta name="theme-color" content="#FFFFFF" />
					<link href={`${process.env.HOST_DOMAIN}/static/r2r-icomoon-010819/style.css`} rel="stylesheet" />
					<link href={`${process.env.HOST_DOMAIN}/static/font/font.css`} rel="stylesheet" />
					<script src="https://cdn.polyfill.io/v2/polyfill.min.js" />
					
				</Head>
				<body className="r2r-custom position-relative">
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}

export default MyDocument;
