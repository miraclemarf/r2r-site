import React from 'react'
import App, { Container } from 'next/app'
import Nav from '../components/fragments/nav'
import Footer from '../components/fragments/footer'
import '../styles/style.scss'

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {}

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    return { pageProps }
  }

  render () {
    const { Component, pageProps } = this.props

    return (
      <Container>
        <Nav />
        <Component {...pageProps} {...this.state} />
        <Footer />
      </Container>
    )
  }
}

export default MyApp