import Link from 'next/link'
import { Nav, NavItem, NavLink } from 'reactstrap'

export default (props) => {
    const { token, user, isMobile, navDesktopdark, headerBg } = props
    return (
        <div className="px-0 py-0 m-0">
            <Nav className={"navWrapper position-relative " + (headerBg == 'bg-transparent' && navDesktopdark && !isMobile  ? 'text-dark':'text-white')} navbar>
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


                <div className={isMobile ? "move-up-mobile w-100" : ""}>
                    {
                        token ?
                            <div className="isMobile">
                                {/* <a href={`${process.env.HOST_DOMAIN}/user/profile`}> */}
                                <div className="navUser d-flex flex-row align-items-center text-white profile">
                                    <Link href="/user/profile" as={process.env.HOST_DOMAIN + '/user/profile'}>
                                        <a href="/user/profile">
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
                                        <Link  href="/user/profile" as={process.env.HOST_DOMAIN + '/user/profile'}>
                                            <a className="d-block clearfix text-white text-decoration-none">
                                                <b className="h3">{
                                                    user ? user.fullName : ""
                                                }</b>
                                            </a>
                                        </Link>
                                        <div className="d-inline-flex">
                                            <Link href="/user/profile" as={process.env.HOST_DOMAIN + '/user/profile'}>
                                                <a className="text-gray float-right cursor-pointer text-decoration-none" >Profile</a>
                                            </Link>
                                            <span className="text-gray float-right px-2">|</span>
                                            <div
                                                className="text-gray float-right cursor-pointer"
                                                onClick={props.onLogout}
                                            >Logout</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            :
                            <div className={"d-flex w-100 "+(isMobile ? "justify-content-between" : "")}>
                                <NavItem className={isMobile ? "w-50 d-block text-center" : ""}>
                                    <NavLink className={"h2 m-0 "+ (isMobile ?"btn btn-info rounded p-1" : "")} href={`${process.env.HOST_DOMAIN}/login`}>LOGIN</NavLink>
                                </NavItem>
                                <div className={"p-2 "+(isMobile ? "" : "d-none")} />
                                <NavItem className={isMobile ? "w-50 d-block text-center" : ""}>
                                    <NavLink className={"h2 m-0 "+ (isMobile ?"btn btn-secondary rounded p-1 text-primary" : "")} href={`${process.env.HOST_DOMAIN}/register`}>REGISTER</NavLink>
                                </NavItem>
                            </div>
                    }
                </div>
            </Nav>
            <style jsx global>{`
                .move-up-mobile{
                    position:absolute;
                    top:.8em;
                }

                .text-dark .nav-link{
                    color #333333 !important;
                }
               
            `}</style>
        </div>
    )
}