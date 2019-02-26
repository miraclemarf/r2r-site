import React from 'react'
import Head from "next/head"
import Styles from '../styles/style.scss'


export default class extends React.Component{
    render(){
        return(
            <React.Fragment>
                <Head>                    
                <meta charSet="UTF-8" />
                    <meta name="viewport" content="width=device-width, initial-scale=1"/>
                    <title>{this.props.title + ' - Bolalob Field Survey'}</title>
                    <style dangerouslySetInnerHTML={{__html: Styles}}/>
                    <script src="https://cdn.polyfill.io/v2/polyfill.min.js"/>
                </Head>
                <MainBody>
                    {this.props.children}
                </MainBody>
            </React.Fragment>
        )
    }
}
export class MainBody extends React.Component {
    render() {
        return (
          <React.Fragment>
            {this.props.children}
          </React.Fragment>
        )
      }
  }
