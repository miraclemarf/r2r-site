import React from 'react';
import Page from '../components/page';

export default class extends Page {
    static async getInitialProps({ req }) {
        // Inherit standard props from the Page (i.e. with session data)
        let props = await super.getInitialProps({
            req
        });

        if (typeof window === 'undefined') {
            try {
                props.nav = 'blue';
                props.footer = 'transparent';
            } catch (e) { }
        }
        return props;
    }
    constructor(props) {
        super(props);

        this.state = {};
    }
    render() {
        return (
            <div style={{ "minHeight": "77.5vh" }} className="container">
                <div className="mb-4">
                            <a className="pt-4 d-block text-dark h4 title-section" onClick={()=>window.history.back()} ><span style={{ top: "-1px" }} className="icon-left-arrow text-sm text-primary position-relative"></span> Back</a>
                </div>
                <div>
                    <div className="mb-3">
                        <h3 className="title-section m-0">TERM AND CONDITION</h3>
                    </div>
                    <div className="mb-3 pb-2 ">
                        when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                    </div>

                </div>
                <div className="py-3" />
            </div>
        );
    }
}
