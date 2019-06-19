import React from 'react'
import cookies from 'next-cookies'
import TabMenu from '../../components/tabMenu';
import { withAuthSync } from "../../utils/user"

class UserRequest extends React.Component {
    static async getInitialProps({ req }) {
        // Inherit standard props from the Page (i.e. with session data)
        let props = {};
        let { token } = cookies({ req })
		let objToken = JSON.parse(token)

        if (typeof window === 'undefined') {
            try {
                props.nav = 'blue';
                props.footer = 'transparent';
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
        let { token, user } = this.props;
        return (
            <div className="py-4">
                <div className="container">
                    
                </div>
            </div>
        )
    }
}

export default withAuthSync(UserRequest)