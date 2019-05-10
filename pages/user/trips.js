import React from 'react'
import { withAuthSync  } from "../../utils/user"

class UserTrip extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};
    }
    render(){
        return(<div className="py-4">
            <h1>My Trips</h1>
        </div>)
    }
}

export default withAuthSync(UserTrip)