import { Nav, NavItem, NavLink } from 'reactstrap';

export default () => (
    <Nav className="text-white" navbar>
        <NavItem>
            <NavLink className="h2 m-0" href={`${process.env.HOST_DOMAIN}/`}>Home</NavLink>
        </NavItem>
        <NavItem>
            <NavLink className="h2 m-0" href={`${process.env.HOST_DOMAIN}/user/trips`}>My Trips</NavLink>
        </NavItem>
        <NavItem>
            <NavLink className="h2 m-0" href={`${process.env.HOST_DOMAIN}/trips`}>Trips Package</NavLink>
        </NavItem>
        <NavItem>
            <NavLink className="h2 m-0" href={process.env.HOST_DOMAIN + "/gallery"}>Gallery</NavLink>
        </NavItem>
        <NavItem>
            <NavLink className="h2 m-0" href={`${process.env.HOST_DOMAIN}/community`}>Community</NavLink>
        </NavItem>
        <NavItem>
            <NavLink className="h2 m-0  " href={`${process.env.HOST_DOMAIN}/faq`}>FAQ</NavLink>
        </NavItem>
    </Nav>
)