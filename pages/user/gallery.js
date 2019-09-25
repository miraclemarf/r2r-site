import React from 'react'
import cookies from 'next-cookies'
import TabNavigation from '../../components/tabNavigation'
import { withAuthSync } from "../../utils/user"

class UserGallery extends React.Component {
    static async getInitialProps({ req }) {
        // Inherit standard props from the Page (i.e. with session data)
        let props = {};
        let { token } = cookies({ req })
		let objToken = JSON.parse(token)

        if (typeof window === 'undefined') {
            try {
                props.nav = 'blue'
                props.footer = 'transparent'
                props.scrollHeader = false
            } catch (e) {
                props.error = 'Unable to fetch AsyncData on server';
            }
        }
        return props;
    }
    constructor(props) {
        super(props);

        this.state = {};
    }
    render() {
        const tabMenuData = {
            menu: [
                { name: 'Gallery', url: process.env.HOST_DOMAIN + '/user/gallery', path: '/user/gallery', active: true }, 
                { divider: true }, 
                { name: 'Next Trips', url: process.env.HOST_DOMAIN + '/user/trips', path: '/user/trips', active: false }
            ]
        };
        let { token, user } = this.props;
        return (
            <div className="mt-5 pt-5 pb-4">
                <div className="container">
                    <div className="d-flex justify-content-between mb-4 pb-2">
                        <div className="d-flex justify-content-start">
                            <div className="">
                                <img
                                    className="rounded-circle border border-white"
                                    width="40"
                                    height="40"
                                    src="http://kampus-stikespanakkukang.ac.id/assets/images/photo_empty.png"
                                />
                            </div>

                            <div className="ml-3" style={{ lineHeight: "2px" }}>
                                {/* <b className="h3 ml-4">{user.fullName ? user.fullName : user.email.substring(0, user.email.indexOf("@"))}</b> */}

                                <b className="h3 title-section">{user.fullName ? user.fullName : user.email.substring(0, user.email.indexOf("@"))}</b><br />
									<span className="text-sm">{user.email}</span>
                            </div>
                        </div>
                        <div>{/* <a href={process.env.HOST_DOMAIN + '/user/profile'} className="text-primary text-sm"><b>EDIT</b></a> */}</div>
                    </div>
                    <div className="mb-4">
                        <TabNavigation {...tabMenuData} />
                    </div>
                    <div className="pt-4" style={{ minHeight: "50vh" }}>
                        <div className="alert alert-danger" role="alert">
                        <h5 className="text-center font-italic title-section m-0">Sorry, You don't Have Any Trips!</h5>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default withAuthSync(UserGallery)