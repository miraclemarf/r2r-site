import React from 'react'

export default class extends React.Component {
  static async getInitialProps() {
    let props = {
      env: {
        HOST_DOMAIN: process.env.HOST_DOMAIN,
        HOST_URL: process.env.HOST_URL
      }
    }
    return props
  }
}

