import React from "react"
import { Container } from "reactstrap"
import Layout from "../components/layout"
import Page from "../components/page"

export default class extends Page{
    static async getInitialProps({ req }) {
        // Inherit standard props from the Page (i.e. with session data)
        let props = await super.getInitialProps({
            req
        });
        return props;
    }
    render(){
        return(
            <Layout title="Home">
                <div>
                    <Container className="p-5 example">
                        <h1>Home</h1>
                    </Container>
                </div>
            </Layout>
        )
    }
}