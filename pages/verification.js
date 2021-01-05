import React from 'react'
import { verification } from '../utils/user'

export default class extends React.Component {
    static async getInitialProps({ store, query: { code } }) {

        // Inherit standard props from the Page (i.e. with session data)
        let props = {
            vCode: code,
            nav: 'blue',
            scrollHeader: false,
            vStatus: false
        }
        return props;
    }
    constructor(props) {
        super(props);

        this.state = {
            ...props,

        };
    }
    async componentDidMount() {
        const res = await verification(this.state.vCode);
        this.setState({ vStatus: res.status });
    }
    render() {
        const { vStatus } = this.state;
        return (
            <div>

                <div style={{ minHeight: '77.5vh' }} className="container pt-5">
                    <div className="py-4"></div>
                    {
                        vStatus ?
                            <div>
                                <div className="text-center">
                                    <div><span className="icon-check1 h2 text-white p-3 bg-info rounded-circle"></span></div>
                                    <div className="py-3" />
                                    <h2 className="title-section">YOUR ACCOUNT VERIFIED!</h2>
                                </div>
                                <div className="mt-4 mb-4">
                                    <div className="text-center">
                                        <p className="m-0">Thank you of the verification and start your journey with Ranstouring.</p>
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <a href={process.env.HOST_DOMAIN} className="d-block w-100 btn btn-primary rounded">Back to Home</a>
                                </div>
                            </div>

                            :
                            <div>
                                <div className="text-center">
                                    <div><img style={{width:"15%"}} src={process.env.HOST_DOMAIN + "/static/slicing/icon/icon_warning.svg"} /></div>
                                    <div className="py-2" />
                                    <h2 className="title-section">VERIFICATION INVALID!</h2>
                                </div>
                                <div className="mt-4 mb-4">
                                    <div className="text-center">
                                        <p className="m-0">Your link verification is invalid, please read your email carefully and click verification link.</p>
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <a href={process.env.HOST_DOMAIN} className="d-block w-100 btn btn-primary rounded">Back to Home</a>
                                </div>
                            </div>
                    }

                </div>

            </div>
        )
    }
}
