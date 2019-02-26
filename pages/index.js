import React from "react"
import { Container, Alert } from "reactstrap"
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
                    <Container className="p-5">
                        <h1 className="text-custom-color">Home</h1>
                        <Alert color="primary">
                            This is a primary alert — check it out!
                        </Alert>
                    </Container>
                </div>
            </Layout>
        )
    }
}