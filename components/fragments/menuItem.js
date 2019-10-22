import Link from 'next/link'
import { Nav, NavItem, NavLink } from 'reactstrap'

export default (props) => {
    const { token, user } = props
    return (
        <div className="px-0 py-0 m-0">
            <Nav className="navWrapper position-relative text-white" navbar>
                <NavItem>
                    <NavLink className="h2 m-0" href={`${process.env.HOST_DOMAIN}/`}>Home</NavLink>
                </NavItem>
                {
                    token ?
                        <NavItem>
                            <NavLink className="h2 m-0" href={`${process.env.HOST_DOMAIN}/user/trips`}>My Trips</NavLink>
                        </NavItem> : ""
                }
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
                    <NavLink className="h2 m-0" href={`${process.env.HOST_DOMAIN}/faq`}>FAQ</NavLink>
                </NavItem>
                {
                    token ?
                        <NavItem className="isDesktop mr-1">
                            <NavLink className="h2 m-0" href={`${process.env.HOST_DOMAIN}/user/profile`}>Profile</NavLink>
                        </NavItem> : ""
                }
                {
                    token ?
                        <NavItem className="isDesktop cursor-pointer bg-white rounded-lg">
                            <div className="h2 m-0 nav-link text-primary" href={`${process.env.HOST_DOMAIN}/logout`}>Logout</div>
                        </NavItem> : ""
                }
                {
                    token ?
                        <div className="isMobile">
                            {/* <a href={`${process.env.HOST_DOMAIN}/user/profile`}> */}
                            <div className="navUser d-flex flex-row align-items-center text-white profile">
                                <Link href="/user/profile">
                                    <a>
                                        <img
                                            className="rounded-circle border border-white"
                                            src={
                                                user.userPicture ? 
                                                    user.userPicture 
                                                    : 
                                                    "https://www.ica.gov.sg/Cwp/assets/ica/images/font-awesome/fa-user-white.png"
                                            }
                                        />
                                    </a>
                                </Link>
                                <div className="ml-3">
                                    {/* <a className="text-white" href={process.env.HOST_DOMAIN + '/user/profile'} > */}
                                    <Link href="/user/profile">
                                        <a className="d-block clearfix text-white text-decoration-none">
                                            <b className="h3">{
                                                user.fullName ?
                                                    user.fullName 
                                                    : 
                                                    user.email.substring(0, user.email.indexOf('@'))
                                            }</b>
                                        </a>
                                    </Link>
                                    <div className="d-inline-flex">
                                        <Link href="/user/profile">
                                            <a className="text-gray float-right cursor-pointer text-decoration-none" >Profile</a>
                                        </Link>
                                        <span className="text-gray float-right px-2">|</span>
                                        <div 
                                            className="text-gray float-right cursor-pointer" 
                                            onClick={() => logout()}
                                        >Logout</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        :
                        <div className="d-inline-flex">
                            <NavItem>
                                <NavLink className="h2 m-0" href={`${process.env.HOST_DOMAIN}/login`}>LOGIN</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink className="h2 m-0" href={`${process.env.HOST_DOMAIN}/register`}>REGISTER</NavLink>
                            </NavItem>
                        </div>
                }
            </Nav>
        </div>
    )   
}