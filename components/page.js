import React from 'react'

export default class extends React.Component {
  
  static async getInitialProps({req}) {
    let stateProps = {
      test: 1
    }
    return { stateProps }
  }
}

